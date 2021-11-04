export let gradesI18n = `
app.title = Gradebook

format.date = MM/dd/yyyy
label.date = mm/dd/yyyy
format.datetime = MM/dd/yyyy HH:mm

link.gradebook = Grades
link.gradebook.tooltip = Grades

link.settings = Settings
link.settings.tooltip = Settings

link.importexport = Import / Export
link.importexport.tooltip = Import /  Export

link.permissions = Permissions
link.permissions.tooltip = Permissions

link.screenreader.tabnotselected = tab
link.screenreader.tabselected = tab selected


label.avg=Avg:
label.total=Total:
label.relativeweight=Relative weight:
label.due=Due:
label.category=Cat:
label.noduedate=-
label.percentage.valued={0}%
label.percentage.plain=%

label.category.drophighest=Drop Highest: {0}
label.category.droplowest=Drop Lowest: {0}
label.category.keephighest=Keep Highest: {0}
label.category.dropSeparator=&

label.coursegrade.released=Course grade has been released to students.
label.coursegrade.notreleased=Course grade has not been released to students.
label.coursegrade.nopermission=-
label.coursegrade.editsettings=Edit Release Settings
label.coursegrade.studentnotreleased=Not Yet Released

label.gradeitem.externalapplabel=Gradebook Item coming from {0}
label.gradeitem.released=Gradebook Item has been released and is visible to students.
label.gradeitem.notreleased=Gradebook item is not visible to students.
label.gradeitem.counted=Gradebook Item is included in the course grade calculation.
label.gradeitem.notcounted=Gradebook Item not included in course grade calculation.
label.gradeitem.extracredit=This is an Extra Credit Gradebook Item
label.gradeitem.extracreditcategory=This is an Extra Credit Category
label.gradeitem.equalweightcategory=This is an Equal Weight Category
label.gradeitem.categoryaverage={0} Weighted Average
label.gradeitem.categoryaveragelabel=Weighted Average
label.gradeitem.categoryheadertooltip=Category: {0}
label.gradeitem.categoryweight=Category weight
label.gradeitem.categoryandweightheadertooltip=Category: {0}, Weight: {1}
label.toolbar.toggleitems=View Columns
label.toolbar.togglecategories=Group By Category
label.toolbar.sortgradeitems=Item Order
label.toolbar.gradeitemsummary=Showing <span class='gb-item-summary-counts'><span class='visible'>{0}</span> of <span class='total'>{1}</span></span> columns
label.toolbar.gradeitemsummary-tooltip=Showing {0} of {1} columns ({2} of {3} items, {4} of {5} category averages)
label.toolbar.studentsummarypaginated=Showing {0} to {1} of {2} students
label.toolbar.studentsummary=Showing <span class='gb-student-summary-counts'><span class="visible">{0}</span></span> students
label.toolbar.gradeitemshowall=Show All
label.toolbar.gradeitemhideall=Hide All
label.toolbar.gradeitemshowthiscategory=Show this category
label.toolbar.gradeitemhidethiscategory=Hide this category
label.toolbar.gradeitemshowonlythiscategory=Show only this category
label.toolbar.gradeitemshowthisitem=Show this item
label.toolbar.gradeitemhidethisitem=Hide this item
label.toolbar.gradeitemshowonlythisitem=Show only this item
label.toolbar.categoryscorelabel={0} Score
label.toolbar.gradeitemshowonlythiscategoryscore=Show only this column
label.toolbar.gradeitemshowthiscategoryscore=Show this column
label.toolbar.gradeitemhidethiscategoryscore=Hide this column
label.toolbar.categorygroup.menulabel=Open menu for this category column
label.toolbar.gradeitem.menulabel=Open menu for this Gradebook Item column
label.toolbar.categoryaverage.menulabel=Open menu for this category score column
label.toolbar.togglehelp=Toggle grade table and keyboard navigation help
label.toolbar.bulkedit=Bulk Edit

label.concurrentuserwarning=Please be aware a colleague has just made some changes to this Gradebook.<br>Refresh your page often to ensure you have the latest values.
error.concurrentedit=Concurrent edits have been detected. Refresh the tool to see the latest scores.

column.header.section = Section
column.header.students = Students
column.header.studentNumber = Number
column.header.sections = Sections
column.header.coursegrade = Course Grade

filter.students = Filter students
filter.studentsclear = Clear student filter
filter.groups = Filter by group/section

button.addgradeitem = Add Gradebook Item
button.savechanges = Save Changes
button.cancel = Cancel
button.done = Done
button.update = Update
button.savecomment = Save Comment
button.saverubricgrading = Save Rubric Grading
button.deleteitem = Delete
button.create = Create
button.clear = Clear Changes
button.defaults = Revert to Default
button.remove = Remove
button.settingsexpandall = Expand All
button.settingscollapseall = Collapse All
button.saveoverride = Save Course Grade Override
button.print = Print

heading.addgradeitem = Add Gradebook Item
heading.editgradeitem = Edit Gradebook Item
heading.studentsummary = Grade Summary for {0} ({1})
heading.updateungradeditems = Set Score for Empty Cells
heading.gradelog = Grade Log for {0} ({1})
heading.editcomment = Comment for {0} ({1}) - {2}
heading.studentpage = Grade Report for {0}
heading.coursegrade = Course Grade Override for {0} ({1})
heading.coursegradelog = Course Grade Override Log for {0} ({1})
heading.zeroungradeditems = Set zero score for empty cells

# note these are not standard wicket style properties as we format this one slightly differently
formatter.studentname.LAST_NAME = %s, %s
formatter.studentname.FIRST_NAME = %s %s

label.addgradeitem.title = Title
label.addgradeitem.points = Point value
label.addgradeitem.percentage = Relative weight
label.addgradeitem.extracredit = Extra credit
label.addgradeitem.due = Due date
label.addgradeitem.due.help = Select a date
label.addgradeitem.category = Category
label.addgradeitem.nocategoryassigned = Items not assigned to a category will not count toward the course grade.
label.addgradeitem.toggle.all = Toggle all
label.addgradeitem.delete.toggle.all = Toggle all the items to be deleted.
label.addgradeitem.release = Release item to students?
label.addgradeitem.release.toggle.all = Toggle all the items to be released.
label.addgradeitem.include = Include item in course grade calculations?
label.addgradeitem.include.toggle.all = Toggle all the items to be included.
label.addgradeitem.nocategories = Categories have not been configured.
label.addgradeitem.categorywithweight = {0} ({1})
label.addgradeitem.createanother = Create Another
label.addgradeitem.scalegrades = Scale existing grades?
label.addgradeitem.highlight.title=This is your new gradebook item
label.addgradeitem.highlight.message=To start grading, click here, or select this grade box and hit Enter on your keyboard.
error.addgradeitem.points = Points required and must be a number greater than zero.
error.addgradeitem.title = Title required and must be unique.
error.addgradeitem.title.duplicate = The title ''{0}'' is a duplicate. Titles must be unique.
duedate.sakaidatetimefield.error.dateformat = The Due Date is not in the correct format, please use the date picker.
error.addgradeitem.exception = Error creating Assignment.
notification.addgradeitem.success = Gradebook item ''{0}'' has been created.
info.edit_assignment_external_items=Please go to {0} to edit the title, points, and due date, or to remove the item from the Gradebook.

label.editgradeitem.title = Title
label.editgradeitem.points = Point value
label.editgradeitem.extracredit = Extra credit
label.editgradeitem.due = Due date
label.editgradeitem.due.help = Select a date
label.editgradeitem.category = Category
label.editgradeitem.release = Release item to students?
label.editgradeitem.include = Include item in course grade calculations?

#Rubrics
rubrics.dont_associate_label = Do not use a rubric to grade this assignment
rubrics.associate_label = Use the following rubric to grade this assignment
rubrics.option_pointsoverride = Adjust individual student scores
rubrics.option_hidepoints = Hide point values (feedback only)
rubrics.option_studentpreview = Hide Rubric from student
rubrics.grading_rubric = Grading Rubric 
rubrics.option.graderubric = Grade Rubric
rubrics.option.graderubric.for = Grade Rubric for {0} ({1})
rubrics.browse_grading_criteria = Browse grading criteria
rubrics.grading_criteria = Grading criteria
rubrics.question_use_rubric = This question could be graded using a Rubric

label.updateungradeditems.instructions.1 = Provide a value below to override all currently ungraded (i.e., empty) cells.
#label.updateungradeditems.instructions.1 = Provide a value below to override all currently ungraded (i.e., empty) cells within {0}.

label.updateungradeditems.instructions.2 = <b>Note:</b> The value below will only apply to <b>ungraded scores</b> within this Gradebook Item, and will not affect existing scores that have been entered. <b>This can not be undone!</b>

label.updateungradeditems.grade = Grade Override

label.updateungradeditems.confirmation.title=Set Score Confirmation
label.updateungradeditems.confirmation.general=This action will apply the score <strong>{0}</strong> to students in <strong>{1}</strong>.
label.updateungradeditems.confirmation.extracredit=The supplied score is in excess of the maximum point value for this Gradebook item. Do you want to continue?
label.updateungradeditems.confirmation.continue=Continue
label.updateungradeditems.confirmation.cancel=Cancel
label.updateungradeditems.groups=Group / Section

label.studentsummary.coursegrade = Course Grade:
label.studentsummary.gradeitems = Gradebook Items
label.studentsummary.outof = /{0}
label.studentsummary.coursegrade.display = {0} ({1})
label.studentsummary.coursegrade.none = Not yet available
label.studentsummary.noduedate = -
label.studentsummary.instructorviewtab = Grade Summary
label.studentsummary.studentviewtab = Student Review Mode
label.studentsummary.expandall = Expand All
label.studentsummary.collapseall = Collapse All
label.studentsummary.previous = Previous Student
label.studentsummary.next = Next Student
label.studentsummary.coursegradenotreleased = Not Yet Released
label.studentsummary.coursegradenotreleasedflag = Not released to students*
label.studentsummary.coursegradenotreleasedmessage = * To release final course grade to students, go to Settings and select "Display Final Course Grades to Students".
label.studentsummary.categoryweight=({0})
label.studentsummary.closeconfirmation.title=You are about to leave Student Review mode.
label.studentsummary.closeconfirmation.content=Unreleased grades and other students' data will become visible.
label.studentsummary.closeconfirmation.continue=Continue
label.studentsummary.closeconfirmation.cancel=Cancel
column.header.studentsummary.gradebookitem = Gradebook Item
column.header.studentsummary.duedate = Due Date
column.header.studentsummary.grade = Grade
column.header.studentsummary.weight = Weight
column.header.studentsummary.comments = Comments
column.header.studentsummary.category = Category
studentsummary.caption = Rows of gradebook items.  Columns of gradebook item information including your score.
studentsummary.categoryrow = This row signifies a category. Rows directly after are gradebook items within this category.
studentsummary.categoryaverage = The calculated average based on your scores within this category.
studentsummary.categoryweight = This weight denotes the percentage the scores within this category will apply to your final course grade.
studentsummary.categorytoggle = Show / hide the gradebook items within this category
studentsummary.gradebookitem.score = The score you received for this gradebook item.
studentsummary.gradebookitem.outof = The gradebook item's total points from which your score was marked out of.
studentsummary.gradebookitem.assignmentstats = Display the statistics for this assignment.
studentsummary.gradebookitem.gradebookstats = Display course grade statistics.

importExport.export.heading = Export
importExport.export.description = Export your Gradebook as a .csv file in order to enter grades/structure your Gradebook in the spreadsheet application of your choice.
importExport.instructions.title = Conventions used
importExport.instructions.summary = The Gradebook exports grades in CSV format only. For importing grades, CSV is recommended, but XLS, and XLSX files are also supported. The following conventions are used in the Import/Export process:
importExport.instructions.1 = Student ID and Name are the first two columns and must be retained for any future imports.
importExport.instructions.2 = Gradebook Items may include points by wrapping the points in [ ] after the title, e.g. "Assignment 1 [50]".
importExport.instructions.3 = Comments can be imported by prefixing the column with a *, e.g. "* Assignment 1".
importExport.instructions.4 = Columns that cannot be re-imported are prefixed with #.
importExport.download.filenameprefix = gradebook_export
importExport.download.filenameallsuffix = ALL

importExport.import.heading = Import
importExport.import.description = Selectively import new grades or gradebook items by uploading a spreadsheet (.csv, .xls, and .xlsx formats) below.
importExport.template.description = <strong>Note:</strong> The formatting of the uploaded spreadsheet must match the conventions detailed below.
importExport.template.button.fullGradebook = Export Gradebook
importExport.template.button.customGradebook = Download Custom Export
importExport.template.button.advancedOptions = Custom Export

importExport.selection.heading = Gradebook Item Import Selection
importExport.selection.description = The system has analyzed the contents of your file upload and has identified new/updated information where applicable. Please select from the desired items below.
importExport.selection.note = <strong>Note:</strong> Selecting "Update" items will override existing values for that item.

importExport.selection.details = If selecting new items, you will need to confirm the settings on the following screen(s).
importExport.selection.pointValue.na = 
importExport.selection.checkall = Check/uncheck all
importExport.selection.title = Title
importExport.selection.points = Points
importExport.selection.status = Status
importExport.selection.noneselected = You must select at least one item.

importExport.selection.omissions.missingUsers.header.plural = {0} students in the site were missing from the import file
importExport.selection.omissions.missingUsers.header.singular = {0} student in the site was missing from the import file
importExport.selection.omissions.unknownUsers.header.plural = {0} students in the import file could not be found in the site
importExport.selection.omissions.unknownUsers.header.singular = {0} student in the import file could not be found in the site
importExport.selection.omissions.unknownUsers.info.plural = Grade entries for these students will not be imported.
importExport.selection.omissions.unknownUsers.info.singular = Grade entries for this student will not be imported.
importExport.selection.previewGrades.header = Preview Grades for '{0}'
importExport.selection.previewGrades.studentID.heading = Student ID
importExport.selection.previewGrades.studentName.heading = Student Name
importExport.selection.previewGrades.grade.heading = Grade

importExport.error.grade = An error occurred importing a grade. Please check the file.
importExport.commentname = + comments
importExport.error.incorrecttype = The file you uploaded is not recognised as a CSV or Excel file.
importExport.error.nullFile = The file you have selected is empty or invalid. Please try selecting a different file.
importExport.error.pointsmodification = There was an error updating the points for gradebook item "{0}".
importExport.error.unknown = There was an error importing the file. Please try again or contact your local IT Support.
importExport.error.duplicateColumns = The following columns are duplicated in the uploaded file: {0}. Please remove all duplicate columns and try again.
importExport.error.invalidColumns = The following columns are invalid or are not formatted properly: {0}. Please review the uploaded file.
importExport.error.blankHeadings = The uploaded file contains {0} blank column headings. Please ensure each column has a valid heading and try again.
importExport.error.invalidGradeData = The uploaded file contains invalid grades. {0} Please remove or correct the invalid data and re-upload the file. The following student/grade pairs in the file are invalid: {1}
importExport.error.invalidComments = The uploaded file contains invalid comments. Comments cannot be longer than {0} characters. Please remove or correct the invalid data and re-upload the file. The following gradebook item:student pairs in the file have invalid comments: {1}
importExport.error.noValidStudents = The uploaded file contains no students that are enrolled in this site. Importing requires at least one valid student entry in the file.
importExport.error.duplicateStudents = The following students appear multiple times in the uploaded file: {0}. Please ensure that each student appears only once.
importExport.error.orphanedComments = The uploaded file contains the following orphaned comment columns: {0}. Please review the file and ensure all comment columns have a corresponding gradebook item.
importExport.error.noFileSelected = You have not yet selected a file to upload. Please select the file you wish to import and click the 'Continue' button.
importExport.error.noValidGrades = The uploaded file contains no grade columns. Please review the file and ensure it contains at least one importable column with valid grades.
importExport.error.noChanges = The uploaded file contains no changes compared to the existing Gradebook data. Please review the file and ensure it contains at least one change to column or grade data.

importExport.selection.hideitems = Hide items with no changes
importExport.selection.hideitemsallhidden = There are no imported items that have any changes.

importExport.createItem.heading = New Item Creation ({0} of {1})

importExport.confirmation.heading = Confirmation
importExport.confirmation.description = Upon clicking <strong>Finish</strong>, you will be completing the following actions:
importExport.confirmation.update.heading = Updating data for existing Gradebook Item(s):
importExport.confirmation.create.heading = Creating new Gradebook Item(s):
importExport.confirmation.modify.heading = Modifying existing Gradebook Item(s):

importExport.confirmation.title = Title
importExport.confirmation.points = Points
importExport.confirmation.extraCredit = Extra Credit
importExport.confirmation.dueDate = Due date
importExport.confirmation.releaseToStudents = Release item to students
importExport.confirmation.includeInCourseGrades = Include item in course grade calculations
importExport.confirmation.yes = Yes
importExport.confirmation.no = No

importExport.confirmation.commentsdisplay = {0} (Comments)

importExport.confirmation.success = Gradebook items imported successfully!
importExport.confirmation.failure = Errors during gradebook item import.

#ProcessedGradeItem.Status map
importExport.status.UPDATE = Update
importExport.status.NEW = New
importExport.status.SKIP = No changes
importExport.status.EXTERNAL = External
importExport.status.MODIFIED = Update

importExport.button.continue = Continue
importExport.button.cancel = Cancel
importExport.button.back = Back
importExport.button.next = Next
importExport.button.finish = Finish

importExport.export.format.csv = CSV
importExport.export.format.pdf = PDF
importExport.export.format.excel = Excel
importExport.export.advancedOption.description = Select from the options below to customize your Gradebook export.
importExport.export.advancedOption.warning = Customized exports can only be imported back into the system if Student ID and Student Name are retained in the first and second columns and all other formatting conventions are followed.
importExport.export.advancedOption.exportFormat = Export File Format
importExport.export.advancedOption.includeStudentName = Student Name
importExport.export.advancedOption.includeStudentNumber = Student Number
importExport.export.advancedOption.includeSectionMembership = Section Membership
importExport.export.advancedOption.includePoints = Total Points
importExport.export.advancedOption.includeLastLogDate = Course Grade Override Date
importExport.export.advancedOption.includeCourseGrade = Course Grade
importExport.export.advancedOption.includeStudentId = Student ID
importExport.export.advancedOption.includeStudentDisplayId = Student Display ID
importExport.export.advancedOption.includeCalculatedGrade = Calculated Course Grade
importExport.export.advancedOption.includeGradeOverride = Grade Override
importExport.export.advancedOption.includeGradeItemScores = Gradebook Item Scores
importExport.export.advancedOption.includeGradeItemComments = Gradebook Item Comments
importExport.export.advancedOption.includeCategoryAverages = Category Averages
importExport.export.csv.headers.studentId = Student ID
importExport.export.csv.headers.studentDisplayId = Student Display ID
importExport.export.csv.headers.studentName = Name
importExport.export.csv.headers.points = Total Points
importExport.export.csv.headers.courseGrade = Course Grade
importExport.export.csv.headers.calculatedGrade = Calculated Grade
importExport.export.csv.headers.gradeOverride = Grade Override
importExport.export.csv.headers.lastLogDate = Course Grade Override Date
importExport.export.csv.headers.example.points = Example Assignment With Points
importExport.export.csv.headers.example.nopoints = Example Assignment With No Points
importExport.export.csv.headers.example.pointscomments = Example Assignment With Points And Comments
importExport.export.csv.headers.example.ignore = This column will be ignored
# Student ID and Student Name are not here because they are a special string. 
# To i18n these, the import helper would need to be made to look for columns by position instead of by column title

assignment.option.edit = Edit Item Details
assignment.option.viewgradestatistics = View Grade Statistics
assignment.option.moveleft = Move Left
assignment.option.moveright = Move Right
assignment.option.hide = Hide Item
assignment.option.setungraded = Set Score for Empty Cells
assignment.menulabel = Open menu for {0} column


message.edititem.success=Gradebook item ''{0}'' has been updated.
message.edititem.error=An error occurred updating the Gradebook item.
message.editcomment.error=An error occurred editing the comment.
message.addcoursegradeoverride.success = The course grade was updated.
message.addcoursegradeoverride.error = An error occurred updating the course grade.
message.addcoursegradeoverride.invalid = The course grade entered is invalid according to the grading schema currently in use by this gradebook.


message.updateungradeditems.success=The ungraded items were updated.

gradetable.wrapper.tooltip = This is the wrapper of the grades table data. Hit 'return' to enter the table data and 'escape' to return to this point.
gradetable.caption.summaryheader = Table Summary
gradetable.caption.summary = Rows of students. First column is student name. Second column is course grade. Other columns are gradebook items and category averages (if enabled). Press enter key in a cell to add or edit a grade. Filter list with accesskey F.
gradetable.caption.keyboardnavigationheader = Keyboard Navigation
gradetable.caption.keyboardnavigation = <p>Use the access key 'g' skip to the grades table and hit 'return' to enter table mode and begin navigating the grades data. Once in table mode, the tab key and arrow keys allow you to navigate the table cells. To edit a grade, hit the 'return' key or begin entering the student's score.  When editing a score, hit 'escape' to cancel your changes and 'return' to save your changes. When you have finished, hit 'escape' to exit table mode.<p> 
gradetable.caption.keyboardshortcutsheader = Keyboard Shortcuts
gradetable.caption.keyboardshortcuts = <p>Accesskey shortcuts (note: your AccessKeyShortcut this will depend on your browser and operating system - <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey" target="_blank" tabindex="-1">more information</a>)</p><dl class="dl-horizontal"><dt>Jump to the Grades Table</dt><dd>AccessKeyShortcut + g</dd><dt>Jump to Student Filter</dt><dd>AccessKeyShortcut + f</dd></dl><p>When the grades table is focused:</p><dl class="dl-horizontal"><dt>Enter table mode</dt><dd>Return</dd></dl>
gradetable.caption.keyboardtablemodeshortcuts = <p>When in table mode:</p><dl class="dl-horizontal"><dt>Navigate cells</dt><dd>Arrow keys or Tab</dd><dt>Open cell menu</dt><dd>Space</dd><dt>Open cell header menu</dt><dd>Control + Space</dd><dt>Toggle cell summary</dt><dd>s</dd><dt>Exit table mode</dt><dd>ESC</dd></dl>
gradetable.caption.keyboardeditingshortcuts = <p>When editing a score:</p><dl class="dl-horizontal"><dt>Cancel changes</dt><dd>ESC</dd><dt>Save changes</dt><dd>Return</dd></dl>

grade.option.viewlog = Grade Log
grade.log.entry = {0} - Score set to <b>{1}</b> by {2}
grade.log.none = No grades have been entered for this cell.
grade.outof = /{0}
grade.menulabel = Open menu for student {0} and assignment {1} cell

grade.notifications.hascomment = Gradebook item has comments
grade.notifications.commentloading = Loading comment...
grade.notifications.editcomment = Edit Comment
grade.notifications.haserror = An error occurred saving this item score.
grade.notifications.overlimit = Score is over item's maximum point value and is providing extra credit.
grade.notifications.concurrentedit = A concurrent edit has been detected. Please refresh the tool to view the latest scores.
grade.notifications.concurrentedituser = Edited by:
grade.notifications.concurrentedittime = At time:
grade.notifications.isexternal = Go to {0} tool to edit scores for this item.
grade.notifications.externalinvalid = External tool has provided an invalid score which may affect the student's final grade.
grade.notifications.invalid = Item score must be a non-negative number with a maximum of 10 digits before and 2 digits after the decimal.
grade.notifications.readonly = Item score is read only
grade.notifications.privileges = Insufficient privileges to edit this Gradebook item score
grade.notifications.revert = Revert to Previous Score
grade.notifications.saved = All changes saved.
grade.notifications.error = Errors were detected. See cell notifications below.
grade.notifications.excused = Grade has been excused from grade calculations.

comment.option.edit = Add/Edit Comment
comment.option.external = Editable in {0} tool

delete.label = Delete Item
delete.warning = Are you sure you want to delete <strong>''{0}''</strong>? Please be aware that deleting this Gradebook item cannot be undone and scores entered will be removed from the gradebook.
delete.success = Gradebook item ''{0}'' has been deleted.

excuse.grade = Excuse/Include Grade
sortbyname.option.first = Order By First Name
sortbyname.option.last = Order By Last Name
students.menulabel = Open menu for the students column

groups.all = All Sections/Groups
groups.available = Available Sections/Groups
categories.all = All Categories

label.nocategoryscore = -

errorpage.heading = Something went wrong
errorpage.text = You should refresh and try again. If you end up back here, quote the following error number to your local IT Support: <b>{0}</b>.

settingspage.main.heading = Settings

settingspage.gradeentry.heading = Grade Entry
settingspage.graderelease.heading = Grade Release Rules
settingspage.statistics.heading = Statistics
settingspage.categories.heading = Categories & Weighting
settingspage.gradingschema.heading = Grading Schema
settingspage.gradingschema.chart.heading = Course Grade Distribution
settingspage.gradingschema.chart.xaxis = Number of Students
settingspage.gradingschema.chart.yaxis = Course Grade
settingspage.gradingschema.overrides = Course grade overrides exist for the following students which may affect the chart distribution:
settingspage.gradingschema.modified.note = This grading schema has been modified from the default.
settingspage.gradingschema.modified.warning = There are unsaved changes.
settingspage.gradingschema.duplicates.warning = There are duplicate entries. Correct this before saving your changes.
settingspage.gradingschema.removecolhead=Remove

settingspage.gradeentry.instructions = How will graders enter grades into this gradebook?
settingspage.gradeentry.points = Points
settingspage.gradeentry.percentages = Percentages

settingspage.graderelease.label = Display released Gradebook items to students
settingspage.graderelease.instructions = You can release a Gradebook item when creating or editing the Gradebook item. 

settingspage.statistics.assignment.label = Display assignment statistics to students
settingspage.statistics.coursegrade.label = Display course grade statistics to students

settingspage.displaycoursegrade.label = Display final course grade to students
settingspage.displaycoursegrade.lettergrade = Letter Grade
settingspage.displaycoursegrade.percentage = Percentage
settingspage.displaycoursegrade.points = Points
settingspage.displaycoursegrade.preview = Preview
settingspage.displaycoursegrade.preview-none = -
settingspage.displaycoursegrade.preview-letter = B+
settingspage.displaycoursegrade.preview-percentage-first = 88%
settingspage.displaycoursegrade.preview-percentage-second = (88%)
settingspage.displaycoursegrade.preview-points-first = 176/200
settingspage.displaycoursegrade.preview-points-second = [176/200]
settingspage.displaycoursegrade.instructions.1 = Choose the options for formatting the course grade. You must choose at least one option.
settingspage.displaycoursegrade.instructions.2 = Note that you cannot choose 'Points' if the gradebook is setup with 'Categories & weighting'.
settingspage.displaycoursegrade.notenough = Display course grade is selected but you haven't selected any formatting options.
settingspage.displaycoursegrade.incompatible = Points can not be displayed as a course grade when weighted categories are enabled. Please select different course grade display options.

settingspage.categories.none = No categories
settingspage.categories.categoriesonly = Categories only
settingspage.categories.categoriesweighting = Categories & weighting
settingspage.categories.drophighest = Drop highest
settingspage.categories.droplowest = Drop lowest
settingspage.categories.keephighest = Keep highest
settingspage.categories.equalweight = Equal weight
settingspage.categories.add = Add a category
settingspage.categories.items = {0} items(s)

settingspage.categories.categorycolhead = Category
settingspage.categories.weightcolhead = %
settingspage.categories.extracreditcolhead = Extra Credit
settingspage.categories.equalweighthead = Equal Weight
settingspage.categories.itemscolhead = Gradebook Items
settingspage.categories.drophighestcolhead = Drop Highest
settingspage.categories.droplowestcolhead = Drop Lowest
settingspage.categories.keephighestcolhead = Keep Highest
settingspage.categories.removecolhead = Remove
settingspage.categories.total = Total:

# these used to be numbered but were changed significantly in #3877 so removed and replaced
settingspage.categories.instructions.categoryvisibility = A category will only be visible if there is at least one Gradebook item assigned to it.
settingspage.categories.instructions.uncounteditems = If 'Categories & weighting' is enabled, uncategorized items will not be counted toward the course grade.
settingspage.categories.instructions.applydropkeep = To apply drop highest, drop lowest, or keep highest, all items in the category must have the same score value.
settingspage.categories.hover.dropkeepusage = 'Drop highest' / 'Drop lowest' cannot be used in the same category with 'Keep Highest'.
settingspage.categories.hover.categoriesweightingpoints = 'Categories & weighting' is not compatible with the 'Points' final course grade display option.

settingspage.categories.runningtotalerror=Weighting for the categories must equal 100%

settingspage.gradingschema.type = Grade Type
settingspage.gradingschema.grade = Grade
settingspage.gradingschema.minpercent = Minimum %
settingspage.gradingschema.emptychart = There are no students with course grades.
settingspage.gradingschema.add = Add a mapping


settingspage.update.success = The settings were successfully updated
settingspage.update.failure.categorymissingweight = No weight specified for a category, but weightings enabled
settingspage.update.failure.categoryweightzero = Weightings for the categories must be greater than 0
settingspage.update.failure.categoryweightnegative = Weightings for the categories must be a non-negative number
settingspage.update.failure.categoryweightonehundred = Weight for a category can't be greater than 100%
settingspage.update.failure.categorysamename = You can not save multiple categories in a gradebook with the same name
settingspage.update.failure.categoryweighttotals = Weightings for the categories must equal 100%
weight.settingspage.update.failure.categoryweightnumber = The category % entered is not a valid number.
categoryDropHighest.IConverter.Integer = Drop Highest must be an integer
categoryDropLowest.IConverter.Integer = Drop Lowest must be an integer
categoryKeepHighest.IConverter.Integer = Keep Highest must be an integer
settingspage.update.failure.categorynameconflict = Category names must be unique.
settingspage.update.failure.categorydropkeepenabled = The combination of drop highest, drop lowest and keep highest was invalid.
settingspage.update.failure.gradingschemamapping = The grading schema could not be updated as it would leave some course grade overrides in an unmappable state.

permissionspage.main.heading = Grader Permissions
permissionspage.instructions.noteachingassistants = There are currently no teaching assistants defined in your site. Teaching assistants must be defined to set special grader permissions.
permissionspage.instructions.nocategoriesorsections = There are currently no categories in your gradebook and no sections/groups defined for your site. Categories and/or sections/groups must be defined to set special grader permissions.
permissionspage.instructions.ok = Grading permissions can be restricted for each teaching assistant in this site. To restrict permissions for a TA, select from the rules below. Multiple rules may be applied. <b>Adding or modifying these rules overrides the default permission and restricts their capabilities within your specifications below.</b>
permissionspage.instructions.choose = Select a grader to edit
permissionspage.instructions.norules = There are currently no rules defined for this grader.
permissionspage.instructions.coursegrade = Allow grader to see course grade for selected section(s) below.
permissionspage.item.can = Can
permissionspage.item.in = in
permissionspage.addrule = Add Rule

permissionspage.label.tausername={0} ({1})

permissionspage.function.view = View
permissionspage.function.grade = Grade

permissionspage.allgradeitems = All Gradebook items

permissionspage.update.success=The permissions were successfully updated.
permissionspage.update.dupes=Note: One or more duplicate permissions were detected and were removed.


no-assignments.label = There are no Gradebook items
no-students.label = There are no students to display

gradebookpage.uncategorised = Uncategorized

label.statistics.title.assignment = Grade Statistics for {0}
label.statistics.title.coursegrade = Course Grade Statistics
label.statistics.average = Average (mean) grade
label.statistics.graded = Total graded
label.statistics.median = Median grade
label.statistics.lowest = Lowest grade
label.statistics.highest = Highest grade
label.statistics.deviation = Standard deviation
label.statistics.averagegpa = Course Average GPA
label.statistics.chart.extracredit = EC
label.statistics.chart.xaxis = Percentage Scored
label.statistics.chart.yaxis = Number of Students
label.statistics.chart.tooltip = {2} score(s) in {1} range
label.statistics.chart.range={0}-{1}
label.statistics.chart.title=Grade Distribution
chart.students.grade.message={0} student(s): {1}
chart.yourgrade.message=Your grade

coursegrade.option.override = Course Grade Override
coursegrade.option.overridelog = Course Grade Override Log
coursegrade.option.setungraded = Set Zero Score For Empty Cells
coursegrade.option.viewcoursegradestatistics = View Course Grade Statistics
coursegrade.header.menulabel = Open menu for Course Grade column
coursegrade.cell.menulabel = Open menu for Course Grade cell

label.zeroungradeditems.instructions.1 = The Gradebook automatically calculates the course grade for students as items are graded. To accurately calculate the course grades, all gradable items must be assigned a grade. Continuing will assign zero to any grade items that do not have a grade. Not zeroing may result in higher course grades than intended.
label.zeroungradeditems.instructions.2 = <b>Note:</b> Clicking Update will assign a grade of zero to all ungraded items in this gradebook. <b>This can not be undone!</b>

coursegrade.option.viewlog = Course Grade Override Log
coursegrade.log.entry.set = {0} - Course Grade set to <b>{1}</b> by {2}
coursegrade.log.entry.unset = {0} - Course Grade Override removed by {1}
coursegrade.log.none = No course grade overrides have been entered.

coursegrade.override.instructions.1 = To provide a final course grade override, enter the desired letter grade into the field below. You may enter both + and - grades.

column.header.coursegradeoverride.studentname = Student Name
column.header.coursegradeoverride.studentid = Student ID
column.header.coursegradeoverride.points = Points
column.header.coursegradeoverride.calculated = Calculated Grade
column.header.coursegradeoverride.gradeoverride = Grade Override

coursegrade.display.percentage-first = {0}
coursegrade.display.percentage-second = ({0})
coursegrade.display.points-first = {0}/{1}
coursegrade.display.points-second = [{0}/{1}]
coursegrade.display.points-none = -
coursegrade.display.none = -
coursegrade.option.showpoints = Show Points
coursegrade.option.hidepoints = Hide Points

link.coursegradeoverride.revert.tooltip = Removes the course grade override and reverts to the calculated course grade
link.coursegradeoverride.reverttocalculated = Revert to calculated course grade

feedback.saving = Saving...
feedback.saved = All changes saved.
feedback.error = Errors were detected. See cell notifications below.
feedback.connectiontimeout = Unable to connect. Changes cannot be saved while offline.
feedback.reordercolumnsfailed = An error occurred while reordering columns.

ta.nopermission = You do not have permission to view the gradebook. Please contact your instructor.
ta.roleswapped = TA view of gradebook cannot be displayed.

error.addeditgradeitem.categorypoints = This gradebook item is configured with a category that has drop highest/drop lowest/keep highest enabled. The points for this gradebook item must match the current maximum of {0}.
error.addeditgradeitem.titlecharacters = Gradebook item names cannot contain characters '*', '[', ']' or start with a '#' as they are reserved.

error.role=Your role in this site is improperly configured. You must have one of the section.role.x permissions assigned before you can view this page.

ta.null=Select a grader

sortgradeitems.heading=Sort Grade Items
sortgradeitems.bycategory=By Category
sortgradeitems.bygradeitem=By Grade Item
sortgradeitems.submit=Update Sort Order
sortgradeitems.submitbycategory=Update Categorized Sort Order
sortgradeitems.success.byitem=Sort Order Updated
sortgradeitems.success.bycategory=Categorized Sort Order Updated
sortgradeitems.error=Unable to update sort order. Please contact your System Administrator.

metadata.header=Current Cell Metadata
metadata.student=Student:
metadata.assignment=Assignment:
metadata.score=Score:
metadata.courseGrade=Course Grade:
metadata.category=Category:
metadata.categoryAverage=Category Average:
metadata.flags=This score has the following flags:
metadata.noflags=No notifications

AutoLabel.CSS.required=required

bulkedit.heading=Bulk Edit Items
bulkedit.column.header.gradebookitem=Gradebook Item
bulkedit.column.header.release=Release to students
bulkedit.column.header.include=Include in course grade calculations
bulkedit.column.header.delete=Delete
bulkedit.update.success = The gradebook items were successfully updated
bulkedit.update.error = Some gradebook items could not be updated. Please try again. If the problem persists, contact your System Administrator.

sections.label.none = None
label.submission-messager.title=Message Students

## Grades widget
sort_new_low_to_high=New: Lowest first
sort_new_high_to_low=New: Highest first
sort_average_low_to_high=Average: Lowest first
sort_average_high_to_low=Average: Highest first
sort_assignment_a_to_z=Assignment: A-Z
sort_assignment_z_to_a=Assignment: Z-A
sort_course_a_to_z=Course: A-Z
sort_course_z_to_a=Course: Z-A
course_average=Course Avg.
submissions=submissions
new_submissions=new submissions
view=View
widget_title=Grades
`;
