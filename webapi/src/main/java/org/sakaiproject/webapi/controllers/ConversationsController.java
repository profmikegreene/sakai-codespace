/******************************************************************************
 * Copyright 2015 sakaiproject.org Licensed under the Educational
 * Community License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/ECL-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
package org.sakaiproject.webapi.controllers;

import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.conversations.api.ConversationsService;
import org.sakaiproject.conversations.api.ConversationsPermissionsException;
import org.sakaiproject.conversations.api.Permissions;
import org.sakaiproject.conversations.api.Reaction;
import org.sakaiproject.conversations.api.beans.CommentTransferBean;
import org.sakaiproject.conversations.api.beans.PostTransferBean;
import org.sakaiproject.conversations.api.beans.TopicTransferBean;
import org.sakaiproject.conversations.api.model.ConvStatus;
import org.sakaiproject.conversations.api.model.Settings;
import org.sakaiproject.conversations.api.model.Tag;
import org.sakaiproject.entity.api.EntityManager;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.sakaiproject.webapi.beans.ConversationsRestBean;
import org.sakaiproject.webapi.beans.SimpleGroup;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.swagger.annotations.ApiOperation;

import lombok.extern.slf4j.Slf4j;

/**
 */
@Slf4j
@RestController
public class ConversationsController extends AbstractSakaiApiController {

	@Resource
	private ConversationsService conversationsService;

	@Resource
	private EntityManager entityManager;

	@Resource
	private SecurityService securityService;

	@Resource(name = "org.sakaiproject.component.api.ServerConfigurationService")
	private ServerConfigurationService serverConfigurationService;

	@Resource
	private SiteService siteService;

	@Resource
	private UserDirectoryService userDirectoryService;

    @ApiOperation(value = "Get the top level conversations data for a site")
	@GetMapping(value = "/sites/{siteId}/conversations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ConversationsRestBean getSiteConversations(@PathVariable String siteId) throws ConversationsPermissionsException {

		String currentUserId = checkSakaiSession().getUserId();

        Site site;
        try {
            site = siteService.getSite(siteId);
            String siteRef = "/site/" + siteId;
            ConversationsRestBean bean = new ConversationsRestBean();
            bean.userId = currentUserId;
            bean.siteId = siteId;
            bean.groups = site.getGroups().stream().map(SimpleGroup::new).collect(Collectors.toList());
            bean.topics = conversationsService.getTopicsForSite(siteId).stream()
                .map(tb -> entityModelForTopicBean(tb)).collect(Collectors.toList());
            Settings settings = conversationsService.getSettingsForSite(siteId);
            bean.canUpdatePermissions = securityService.unlock(SiteService.SECURE_UPDATE_SITE, siteRef);

            if (!settings.getSiteLocked()
                || securityService.unlock(Permissions.MODERATE.label, siteRef)) {
                bean.canEditTags = securityService.unlock(Permissions.TAG_CREATE.label, siteRef);
                bean.canCreateTopic = securityService.unlock(Permissions.TOPIC_CREATE.label, siteRef);
            }
            bean.canViewSiteStatistics = securityService.unlock(Permissions.VIEW_STATISTICS.label, siteRef);
            bean.canPin = settings.getAllowPinning() && securityService.unlock(Permissions.TOPIC_PIN.label, siteRef);
            bean.isInstructor = securityService.unlock(Permissions.ROLETYPE_INSTRUCTOR.label, siteRef);
            bean.canViewAnonymous = securityService.unlock(Permissions.VIEW_ANONYMOUS.label, siteRef);
            bean.settings = settings;

            ConvStatus convStatus = conversationsService.getConvStatusForSiteAndUser(siteId, currentUserId);
            bean.showGuidelines = settings.getRequireGuidelinesAgreement() && !convStatus.getGuidelinesAgreed();
            bean.tags = conversationsService.getTagsForSite(siteId);

            List<Map<String, String>> links = new ArrayList<>();
            if (bean.canViewSiteStatistics) {
                Map<String, String> stats = new HashMap<>();
                stats.put("rel", "stats");
                stats.put("href", "/api/sites/" + siteId + "/conversations/stats");
                links.add(stats);
            }
            bean.links = links;
            return bean;

        } catch (Exception e) {
            log.error("Failed to load data fully", e);
        }

        return null;
    }

    @ApiOperation(value = "Get the top level conversations stats for a site")
	@PostMapping(value = "/sites/{siteId}/conversations/stats", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> getSiteStats(@PathVariable String siteId, @RequestBody Map<String, Object> options) throws ConversationsPermissionsException {

		checkSakaiSession();

        String interval = (String) options.get("interval");
        Instant from = interval.equals("WEEK") ? Instant.now().minus(7, ChronoUnit.DAYS) : null;
        Instant to = interval.equals("THIS_WEEK") ? Instant.now(): null;

        return conversationsService.getSiteStats(siteId, from, to, (Integer) options.get("page"), (String) options.get("sort"));
    }

    @ApiOperation(value = "Create a topic")
	@PostMapping(value = "/sites/{siteId}/topics", produces = MediaType.APPLICATION_JSON_VALUE)
    public TopicTransferBean createTopic(@PathVariable String siteId, @RequestBody TopicTransferBean topicBean) throws ConversationsPermissionsException {

		checkSakaiSession();

        topicBean.siteId = siteId;
        return entityModelForTopicBean(conversationsService.saveTopic(topicBean));
    }

    @ApiOperation(value = "Update a topic")
	@PutMapping(value = "/sites/{siteId}/topics/{topicId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public TopicTransferBean updateTopic(@PathVariable String siteId, @PathVariable String topicId, @RequestBody TopicTransferBean topicBean) throws ConversationsPermissionsException {

		checkSakaiSession();

        System.out.println(topicBean.groups);

        topicBean.id = topicId;
        topicBean.siteId = siteId;
        return entityModelForTopicBean(conversationsService.saveTopic(topicBean));
    }

    @ApiOperation(value = "Delete a topic")
	@DeleteMapping(value = "/sites/{siteId}/topics/{topicId}")
    public ResponseEntity deleteTopic(@PathVariable String topicId) throws ConversationsPermissionsException, UserNotDefinedException {

		checkSakaiSession();
        if (conversationsService.deleteTopic(topicId)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}

    @ApiOperation(value = "Pin a topic")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/pinned")
    public ResponseEntity pinTopic(@PathVariable String siteId, @PathVariable String topicId, @RequestBody Boolean pinned) throws ConversationsPermissionsException {

		checkSakaiSession();

        conversationsService.pinTopic(topicId, pinned);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Bookmark a topic")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/bookmarked")
    public ResponseEntity bookmarkTopic(@PathVariable String siteId, @PathVariable String topicId, @RequestBody Boolean bookmarked) throws ConversationsPermissionsException {

		checkSakaiSession();

        conversationsService.bookmarkTopic(topicId, bookmarked);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Hide a topic")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/hidden")
    public ResponseEntity hideTopic(@PathVariable String siteId, @PathVariable String topicId, @RequestBody Boolean hidden) throws ConversationsPermissionsException {

		checkSakaiSession();

        conversationsService.hideTopic(topicId, hidden);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Lock a topic")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/locked", produces = MediaType.APPLICATION_JSON_VALUE)
    public TopicTransferBean lockTopic(@PathVariable String siteId, @PathVariable String topicId, @RequestBody Boolean locked) throws ConversationsPermissionsException {

		checkSakaiSession();

        return entityModelForTopicBean(conversationsService.lockTopic(topicId, locked));
    }

    @ApiOperation(value = "Post your reactions to a topic")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/reactions", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<Reaction, Integer> postTopicReactions(@PathVariable String topicId, @RequestBody Map<Reaction, Boolean> reactions) throws ConversationsPermissionsException {

		checkSakaiSession();

        return conversationsService.saveTopicReactions(topicId, reactions);
    }

    @ApiOperation(value = "Mark a topic as viewed")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts/markpostsviewed")
    public ResponseEntity markPostsViewed(@PathVariable String topicId, @RequestBody Set<String> postIds) throws ConversationsPermissionsException {

		checkSakaiSession();

        conversationsService.markPostsViewed(postIds, topicId);
        return new ResponseEntity(HttpStatus.OK);
    }


    private TopicTransferBean entityModelForTopicBean(TopicTransferBean topicBean) {

        List<Map<String, String>> links = new ArrayList<>();

        Map<String, String> self = new HashMap<>();
        self.put("rel", "self");
        self.put("href", topicBean.url);
        links.add(self);

        Map<String, String> bookmark = new HashMap<>();
        bookmark.put("rel", "bookmark");
        bookmark.put("href", topicBean.url + "/bookmarked");
        links.add(bookmark);

        Map<String, String> markpostsviewed = new HashMap<>();
        markpostsviewed.put("rel", "markpostsviewed");
        markpostsviewed.put("href", topicBean.url + "/posts/markpostsviewed");
        links.add(markpostsviewed);

        if (topicBean.canPin) {
            Map<String, String> pin = new HashMap<>();
            pin.put("rel", "pin");
            pin.put("href", topicBean.url + "/pinned");
            links.add(pin);
        }

        if (topicBean.canPost) {
            Map<String, String> post = new HashMap<>();
            post.put("rel", "post");
            post.put("href", topicBean.url + "/posts");
            links.add(post);
        }

        if (topicBean.canDelete) {
            Map<String, String> delete = new HashMap<>();
            delete.put("rel", "delete");
            delete.put("href", topicBean.url);
            links.add(delete);
        }

        if (topicBean.canReact) {
            Map<String, String> react = new HashMap<>();
            react.put("rel", "react");
            react.put("href", topicBean.url + "/reactions");
            links.add(react);
        }

        if (topicBean.canModerate) {
            Map<String, String> lock = new HashMap<>();
            lock.put("rel", "lock");
            lock.put("href", topicBean.url + "/locked");
            links.add(lock);
        }

        if (topicBean.canModerate) {
            Map<String, String> hide = new HashMap<>();
            hide.put("rel", "hide");
            hide.put("href", topicBean.url + "/hidden");
            links.add(hide);
        }

        topicBean.links = links;
        return topicBean;
    }

    @ApiOperation(value = "Create a post")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostTransferBean createPost(@PathVariable String siteId, @PathVariable String topicId, @RequestBody PostTransferBean postBean) throws ConversationsPermissionsException {

		checkSakaiSession();
        postBean.siteId = siteId;
        postBean.topic = topicId;
        return entityModelForPostBean(conversationsService.savePost(postBean));
    }

    @ApiOperation(value = "Get the posts for a topic")
	@GetMapping(value = "/sites/{siteId}/topics/{topicId}/posts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PostTransferBean> getTopicPosts(@PathVariable String siteId, @PathVariable String topicId) throws ConversationsPermissionsException {

		checkSakaiSession();
        return conversationsService.getPostsByTopicId(siteId, topicId).stream()
            .map(pb -> entityModelForPostBean(pb)).collect(Collectors.toList());
    }

    @ApiOperation(value = "Update a post")
	@PutMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostTransferBean updatePost(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId, @RequestBody PostTransferBean postBean) throws ConversationsPermissionsException {

		checkSakaiSession();

        postBean.siteId = siteId;
        postBean.id = postId;
        return entityModelForPostBean(conversationsService.savePost(postBean));
    }

    @ApiOperation(value = "Delete a post")
	@DeleteMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}")
    public ResponseEntity deletePost(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId) throws ConversationsPermissionsException {

		checkSakaiSession();

        if (conversationsService.deletePost(siteId, topicId, postId, true)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "Upvote a post")
	@GetMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/upvote")
    public ResponseEntity upvotePost(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId) throws ConversationsPermissionsException {

		checkSakaiSession();
        conversationsService.upvotePost(siteId, topicId, postId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Unupvote a post")
	@GetMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/unupvote")
    public ResponseEntity unUpvotePost(@PathVariable String siteId, @PathVariable String postId) throws ConversationsPermissionsException {

		checkSakaiSession();
        conversationsService.unUpvotePost(siteId, postId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Post your reactions to a post")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/reactions", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<Reaction, Integer> postPostReactions(@PathVariable String postId, @RequestBody Map<Reaction, Boolean> reactions) throws ConversationsPermissionsException {

		checkSakaiSession();

        return conversationsService.savePostReactions(postId, reactions);
    }

    @ApiOperation(value = "Lock a post")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/locked", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostTransferBean lockPost(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId, @RequestBody Boolean locked) throws ConversationsPermissionsException {

		checkSakaiSession();

        return entityModelForPostBean(conversationsService.lockPost(siteId, topicId, postId, locked));
    }

    @ApiOperation(value = "Hide a post")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/hidden")
    public ResponseEntity hidePost(@PathVariable String siteId, @PathVariable String postId, @RequestBody Boolean hidden) throws ConversationsPermissionsException {

		checkSakaiSession();

        conversationsService.hidePost(postId, hidden, siteId);
        return new ResponseEntity(HttpStatus.OK);
    }

    private PostTransferBean entityModelForPostBean(PostTransferBean postBean) {

        List<Map<String, String>> links = new ArrayList<>();

        Map<String, String> self = new HashMap<>();
        self.put("rel", "self");
        self.put("href", postBean.url);
        links.add(self);

        if (postBean.canDelete) {
            Map<String, String> delete = new HashMap<>();
            delete.put("rel", "delete");
            delete.put("href", postBean.url);
            links.add(delete);
        }

        if (postBean.canReact) {
            Map<String, String> react = new HashMap<>();
            react.put("rel", "react");
            react.put("href", postBean.url + "/reactions");
            links.add(react);
        }

        if (postBean.canModerate) {
            Map<String, String> lock = new HashMap<>();
            lock.put("rel", "lock");
            lock.put("href", postBean.url + "/locked");
            links.add(lock);
        }

        if (postBean.canModerate) {
            Map<String, String> hide = new HashMap<>();
            hide.put("rel", "hide");
            hide.put("href", postBean.url + "/hidden");
            links.add(hide);
        }

        postBean.links = links;
        return postBean;
    }

    @ApiOperation(value = "Create a comment")
	@PostMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/comments", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommentTransferBean createComment(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId, @RequestBody CommentTransferBean commentBean) throws ConversationsPermissionsException  {

		checkSakaiSession();
        commentBean.post = postId;
        commentBean.siteId = siteId;
        return conversationsService.saveComment(commentBean);
    }

    @ApiOperation(value = "Update a comment")
	@PutMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/comments/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommentTransferBean updateComment(@PathVariable String siteId, @PathVariable String topicId, @PathVariable String postId, @PathVariable String commentId, @RequestBody CommentTransferBean commentBean) throws ConversationsPermissionsException  {

		checkSakaiSession();

        commentBean.id = commentId;
        commentBean.post = postId;
        commentBean.siteId = siteId;
        return conversationsService.saveComment(commentBean);
    }

    @ApiOperation(value = "Delete a comment")
	@DeleteMapping(value = "/sites/{siteId}/topics/{topicId}/posts/{postId}/comments/{commentId}")
    public ResponseEntity deleteComment(@PathVariable String siteId, @PathVariable String commentId) throws ConversationsPermissionsException  {

		checkSakaiSession();

        if (conversationsService.deleteComment(siteId, commentId)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "Create some tags")
	@PostMapping(value = "/sites/{siteId}/conversations/tags", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tag> createTags(@PathVariable String siteId, @RequestBody List<Tag> tags) throws ConversationsPermissionsException {

		checkSakaiSession();
        return conversationsService.createTags(tags);
    }

    @ApiOperation(value = "Get the tags")
	@GetMapping(value = "/sites/{siteId}/conversations/tags", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tag> getTagsForSite(@PathVariable String siteId) throws ConversationsPermissionsException {

		checkSakaiSession();
        return conversationsService.getTagsForSite(siteId);
    }

    @ApiOperation(value = "Update a tag")
	@PutMapping(value = "/sites/{siteId}/conversations/tags/{tagId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateTag(@PathVariable String siteId, @PathVariable Long tagId, @RequestBody Tag tag) throws ConversationsPermissionsException {

		checkSakaiSession();

        tag.setId(tagId);
        conversationsService.saveTag(tag);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Delete a tag")
	@DeleteMapping(value = "/sites/{siteId}/conversations/tags/{tagId}")
    public ResponseEntity deleteTag(@PathVariable Long tagId) throws ConversationsPermissionsException  {

		checkSakaiSession();

        conversationsService.deleteTag(tagId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Save the guidelines")
	@PostMapping(value = "/sites/{siteId}/conversations/settings/guidelines")
    public ResponseEntity saveSetting(@PathVariable String siteId, @RequestBody String guidelines) throws ConversationsPermissionsException {

		checkSakaiSession();

        Settings settings = conversationsService.getSettingsForSite(siteId);
        settings.setGuidelines(guidelines);
        conversationsService.saveSettings(settings);

        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Save a setting")
	@PostMapping(value = "/sites/{siteId}/conversations/settings/{setting}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity saveSetting(@PathVariable String siteId, @PathVariable String setting, @RequestBody Boolean on) throws ConversationsPermissionsException {

		checkSakaiSession();

        Settings settings = conversationsService.getSettingsForSite(siteId);

        switch (setting) {
            case "allowPinning":
                settings.setAllowPinning(on);
                break;
            case "allowUpvoting":
                settings.setAllowUpvoting(on);
                break;
            case "allowAnonPosting":
                settings.setAllowAnonPosting(on);
                break;
            case "allowReactions":
                settings.setAllowReactions(on);
                break;
            case "allowBookmarking":
                settings.setAllowBookmarking(on);
                break;
            case "requireGuidelinesAgreement":
                settings.setRequireGuidelinesAgreement(on);
                break;
            case "siteLocked":
                settings.setSiteLocked(on);
                break;
            default:
        }

        conversationsService.saveSettings(settings);

        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "Agree to the guidelines")
	@GetMapping(value = "/sites/{siteId}/conversations/agree")
    public ResponseEntity agreeToGuidelines(@PathVariable String siteId) throws ConversationsPermissionsException {

		String currentUserId = checkSakaiSession().getUserId();
        ConvStatus convStatus = conversationsService.getConvStatusForSiteAndUser(siteId, currentUserId);
        convStatus.setGuidelinesAgreed(true);
        conversationsService.saveConvStatus(convStatus);
        return new ResponseEntity(HttpStatus.OK);
    }
}
