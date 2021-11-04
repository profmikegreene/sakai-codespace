-- SQL for delayed invokation.
-- This has been moved out of the main quartz file so it's easier to upgrade the quartz file and
-- see what has changed between releases.

CREATE TABLE SCHEDULER_DELAYED_INVOCATION (
	INVOCATION_ID VARCHAR2(36) NOT NULL,
	INVOCATION_TIME TIMESTAMP NOT NULL,
	COMPONENT VARCHAR2(2000) NOT NULL,
	CONTEXT VARCHAR2(2000) NULL,
	PRIMARY KEY (INVOCATION_ID)
);

CREATE INDEX SCHEDULER_DI_TIME_INDEX ON SCHEDULER_DELAYED_INVOCATION (INVOCATION_TIME);
