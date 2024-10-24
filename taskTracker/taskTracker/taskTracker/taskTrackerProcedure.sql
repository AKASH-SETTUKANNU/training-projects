CREATE OR ALTER PROCEDURE taskTracker.AddUser
    @UserName VARCHAR(100),
    @UserEmail VARCHAR(100),
    @UserBirthDate VARCHAR(100),
    @UserPassword VARCHAR(100)
AS
BEGIN
    INSERT INTO taskTracker.Users (UserName, UserEmail, UserBirthDate, UserPassword)
    VALUES (@UserName, @UserEmail, @UserBirthDate, @UserPassword);
END;

exec taskTracker.AddUser
 @UserName='akash',
 @UserEmail='Akash1@gmail.com',
 @UserBirthDate='1',
 @UserPassword='1'

 -- Users Table Procedures

-- Add a new user
CREATE PROCEDURE taskTracker.AddUser
    @UserName VARCHAR(100),
    @UserEmail VARCHAR(100),
    @UserBirthDate VARCHAR(100),
    @UserPassword VARCHAR(100)
AS
BEGIN
    INSERT INTO taskTracker.Users (UserName, UserEmail, UserBirthDate, UserPassword)
    VALUES (@UserName, @UserEmail, @UserBirthDate, @UserPassword);
END
GO

-- Update an existing user
CREATE PROCEDURE taskTracker.UpdateUser
    @UserID INT,
    @UserName VARCHAR(100),
    @UserEmail VARCHAR(100),
    @UserBirthDate VARCHAR(100),
    @UserPassword VARCHAR(100)
AS
BEGIN
    UPDATE taskTracker.Users
    SET UserName = @UserName,
        UserEmail = @UserEmail,
        UserBirthDate = @UserBirthDate,
        UserPassword = @UserPassword
    WHERE UserID = @UserID;
END
GO

-- Clients Table Procedures
exec  taskTracker.AddClient
  @ClientName='claysys'
-- Add a new client
CREATE PROCEDURE taskTracker.AddClient
    @ClientName VARCHAR(100)
AS
BEGIN
    INSERT INTO taskTracker.Clients (ClientName)
    VALUES (@ClientName);
END
GO

-- Update an existing client
CREATE PROCEDURE taskTracker.UpdateClient
    @CID INT,
    @ClientName VARCHAR(100)
AS
BEGIN
    UPDATE taskTracker.Clients
    SET ClientName = @ClientName
    WHERE CID = @CID;
END
GO

-- Tasks Table Procedures

-- Add a new task
drop procedure taskTracker.AddTask
DECLARE @TaskID INT;
EXEC taskTracker.AddTask 
    @taskclientName = 'claysys',
    @taskProjectName = 'Example Project',
    @taskTitle = 'Example Task',
    @taskHours = 8,
    @taskDate = '2024-10-24',
    @taskAssignedTo = 'Akash',
    @taskAssignedBy = 'Akash',
    @tasksupportType = 'Support Type',
    @taskPriority = 'High',
    @taskDescription = 'This is an example task description',
    @TaskID = @TaskID OUTPUT;  -- Using a variable for OUTPUT
SELECT @TaskID;
CREATE OR ALTER PROCEDURE taskTracker.AddTask
    @UserID INT,
    @taskclientName VARCHAR(100),
    @taskProjectName VARCHAR(100),
    @taskTitle VARCHAR(100),
    @taskHours INT,
    @taskDate DATE,
    @taskAssignedTo VARCHAR(100),
    @taskAssignedBy VARCHAR(100),
    @tasksupportType VARCHAR(100),
    @taskPriority VARCHAR(100),
    @taskDescription VARCHAR(200),
    @TaskID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;  -- Prevents extra result sets from interfering with SELECT statements.

    -- Insert the new task
    INSERT INTO taskTracker.Tasks (
	   UserID,
        taskclientName,
        taskProjectName,
        taskTitle,
        taskHours,
        taskDate,
        taskAssignedTo,
        taskAssignedBy,
        tasksupportType,
        taskPriority,
        taskDescription
    )
    VALUES (
	@UserID,
        @taskclientName,
        @taskProjectName,
        @taskTitle,
        @taskHours,
        @taskDate,
        @taskAssignedTo,
        @taskAssignedBy,
        @tasksupportType,
        @taskPriority,
        @taskDescription
    );

    -- Retrieve the ID of the newly inserted task
    SET @TaskID = SCOPE_IDENTITY();
END

GO

-- Update an existing task
CREATE PROCEDURE taskTracker.UpdateTask
    @TaskID INT,
    @ClientID INT,
    @ProjectName VARCHAR(100),
    @TaskTitle VARCHAR(100),
    @TaskHours INT,
    @TaskDate DATE,
    @AssignedTo INT,
    @AssignedBy INT,
    @SupportType VARCHAR(100),
    @TaskPriority VARCHAR(100),
    @TaskDescription VARCHAR(200)
AS
BEGIN
    UPDATE taskTracker.Tasks
    SET ClientID = @ClientID,
        ProjectName = @ProjectName,
        TaskTitle = @TaskTitle,
        TaskHours = @TaskHours,
        TaskDate = @TaskDate,
        AssignedTo = @AssignedTo,
        AssignedBy = @AssignedBy,
        SupportType = @SupportType,
        TaskPriority = @TaskPriority,
        TaskDescription = @TaskDescription
    WHERE TaskID = @TaskID;
END
GO
CREATE PROCEDURE taskTracker.DeleteActivity
    @ActivityID INT
AS
BEGIN
    DECLARE @DeletedActivity TABLE (
        ActivityID INT,
        TaskID INT,
        ActivityDescription VARCHAR(200),
        ActivityHour INT
    );



CREATE OR ALTER PROCEDURE taskTracker.AddActivity
    @TaskID INT,
	@ActivityTitle VARCHAR(100),
    @ActivityDescription VARCHAR(200),
    @ActivityHour INT
AS
BEGIN
    INSERT INTO taskTracker.Activity (TaskID,ActivityTitle, ActivityDescription, ActivityHour)
    VALUES (@TaskID,@ActivityTitle, @ActivityDescription, @ActivityHour);
END;


CREATE PROCEDURE taskTracker.GetActivitiesByTaskID
    @TaskID INT
AS
BEGIN
    SELECT ActivityID, TaskID, ActivityDescription, ActivityHour
    FROM taskTracker.Activity
    WHERE TaskID = @TaskID;
END;


CREATE PROCEDURE taskTracker.UpdateActivity
    @ActivityID INT,
    @ActivityDescription VARCHAR(200),
    @ActivityHour INT
AS
BEGIN
    UPDATE taskTracker.Activity
    SET ActivityDescription = @ActivityDescription,
        ActivityHour = @ActivityHour
    WHERE ActivityID = @ActivityID;
END;


CREATE PROCEDURE taskTracker.GetTasksByDateAndUserId
    @UserId INT,
    @Date DATE
AS
BEGIN
    SELECT * FROM taskTracker.Tasks
    WHERE taskDate = @Date AND taskAssignedTo = (SELECT UserName FROM taskTracker.Users WHERE UserID = @UserId);
END

CREATE PROCEDURE taskTracker.GetTasksByDateAndUserId
    @UserId INT,
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        TaskID,
        UserID,
        taskclientName,
        taskProjectName,
        taskTitle,
        taskHours,
        taskDate,
        taskAssignedTo,
        taskAssignedBy,
        tasksupportType,
        taskPriority,
        taskDescription
    FROM 
        Tasks
    WHERE 
        UserID = @UserId
        AND CAST(taskDate AS DATE) = @Date;
END

DROP PROCEDURE IF EXISTS taskTracker.GetTasksByDateAndUserId;

CREATE PROCEDURE taskTracker.GetActivitiesByDateAndUserId
    @UserId INT,
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ActivityID,
        TaskID,
        ActivityTitle,
        ActivityDescription,
        ActivityHour
    FROM 
        Activities
    WHERE 
        TaskID IN (SELECT TaskID FROM Tasks WHERE UserID = @UserId)
        AND CAST(ActivityDate AS DATE) = @Date;
END
