/**
 * Copyright (c) 2003-2017 The Apereo Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *             http://opensource.org/licenses/ecl2
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.sakaiproject.calendar.entityproviders;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

import org.sakaiproject.calendar.api.CalendarEvent;
import org.sakaiproject.entity.api.Reference;
import org.sakaiproject.time.api.Time;

@Data
public class CalendarEventDetails extends CalendarEventSummary {

	private String location;
	private Time lastTime;
	private String description;
	private String descriptionFormatted;
	private String eventReference;
	protected List<AttachmentSummary> attachments;

	public CalendarEventDetails(CalendarEvent event) {
		super(event);

		location = event.getLocation();
		lastTime = event.getRange().lastTime();
		description = event.getDescription();
		descriptionFormatted = event.getDescriptionFormatted();
		eventReference = event.getReference();

		attachments = new ArrayList<AttachmentSummary>();
		//for externally subscribed calendar events attachments can be null
		if(event.getAttachments() != null){
			for (Reference r : event.getAttachments()) {
				attachments.add(new AttachmentSummary(r));
			}
		}
	}

	@Data
	public static class AttachmentSummary implements
			Comparable<AttachmentSummary> {
		private String url;

		public AttachmentSummary(Reference r) {
			url = r.getUrl();
		}

		public int compareTo(AttachmentSummary other) {
			return url.compareTo(other.url);
		}
	}

}
