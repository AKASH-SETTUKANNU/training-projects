
create database Users;
use Users;
select * from Users;
select * from Agendas;
select * from Events;
select * from Guests;
select * from Invitations;
select * from Notifications;
select * from UserDeletionLog;
select * from EventDeletionLog;

SELECT * FROM dbo.getAllUsersAndData();


CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    BirthDate DATE NOT NULL,
    UserPassword VARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UserRole VARCHAR(50) NOT NULL DEFAULT 'User'
);

 
CREATE TABLE Events (
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    EventName VARCHAR(100) NOT NULL,
    EventDate DATETIME NOT NULL,
    EventDescription VARCHAR(100) NOT NULL,
    EventStatus VARCHAR(100) NOT NULL,
    EventCategory VARCHAR(50) NOT NULL,
    AcceptCount INT DEFAULT 0,
    PendingCount INT DEFAULT 0,
    RejectCount INT DEFAULT 0,
    ImageUrl VARCHAR(255),
    UserID INT FOREIGN KEY REFERENCES Users(UserID)
);

CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    SenderEmail VARCHAR(100) NOT NULL,
    SenderName VARCHAR(100) NOT NULL,
    GuestEmail VARCHAR(100) NOT NULL,
    EventID INT FOREIGN KEY REFERENCES Events(EventID),
    RespondSent BIT NOT NULL
);

CREATE TABLE Agendas (
    AgendaID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT FOREIGN KEY REFERENCES Events(EventID),
    AgendaLocation VARCHAR(100),
    AgendaDate DATE NOT NULL,
    AgendaStartTime TIME NOT NULL,
    AgendaEndTime TIME NOT NULL,
    AgendaDescription VARCHAR(100) NOT NULL
);

CREATE TABLE Guests (
    GuestID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT FOREIGN KEY REFERENCES Events(EventID),
    GuestName VARCHAR(100),
    GuestEmail VARCHAR(100),
    GuestBirthDate DATE,
    GuestLocation VARCHAR(100)
);

CREATE TABLE Invitations (
    InvitationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    EventID INT FOREIGN KEY REFERENCES Events(EventID),
    EventName VARCHAR(100),
    EventLocation VARCHAR(100),
    EventDate DATETIME NOT NULL,
    EventDescription VARCHAR(255),
    AgendaLocation VARCHAR(100),
    AgendaDate DATE NOT NULL,
    AgendaStartTime TIME NOT NULL,
    AgendaEndTime TIME NOT NULL,
    AgendaDescription VARCHAR(255),
    InvitationSent BIT NOT NULL,
    Response VARCHAR(20)
);

CREATE TABLE UserDeletionLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    DeletionDate DATETIME NOT NULL
);
 
CREATE TABLE EventDeletionLog(
     LogID int identity(1,1) primary key,
	 EventID int not null,
	 DeletionDate datetime not null
	 );
