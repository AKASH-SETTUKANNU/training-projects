-- Create the database and schema
CREATE DATABASE taskTracker;
USE taskTracker;
CREATE SCHEMA taskTracker;

DROP TABLE IF EXISTS taskTracker.Users;
select * from taskTracker.Users;
select * from taskTracker.Tasks;
select * from taskTracker.Clients;
select * from taskTracker.Activity;
CREATE TABLE taskTracker.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) UNIQUE NOT NULL,
    UserEmail VARCHAR(100) NOT NULL,
    UserBirthDate VARCHAR(100),
    UserPassword VARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
select * from taskTracker.Users;
-- Drop and recreate Clients table
DROP TABLE IF EXISTS taskTracker.Clients;
CREATE TABLE taskTracker.Clients (
    CID INT IDENTITY(1,1) PRIMARY KEY,
    ClientName VARCHAR(100) UNIQUE NOT NULL
);

-- Drop and recreate Tasks table
DROP TABLE IF EXISTS taskTracker.Tasks;
CREATE TABLE taskTracker.Tasks (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
   taskclientName VARCHAR(100) FOREIGN KEY REFERENCES taskTracker.Clients(ClientName),
   taskProjectName VARCHAR(100),
    taskTitle VARCHAR(100),
    taskHours INT,
    taskDate DATE,
    taskAssignedTo VARCHAR(100) FOREIGN KEY REFERENCES taskTracker.Users(UserName),
    taskAssignedBy VARCHAR(100) FOREIGN KEY REFERENCES taskTracker.Users(UserName),
    tasksupportType VARCHAR(100),
    taskPriority VARCHAR(100),
    taskDescription VARCHAR(200)
);

CREATE TABLE taskTracker.Activity(
  ActivityID INT IDENTITY(1,1) PRIMARY KEY,
  TaskID INT FOREIGN KEY REFERENCES  taskTracker.Tasks(TaskID) ON DELETE CASCADE,
  ActivityDescription VARCHAR(200),
  ActivityHour INT

);
-- Example query to check if a user exists
SELECT COUNT(*) FROM taskTracker.Users WHERE UserEmail = 'Akash@gmail.com';
