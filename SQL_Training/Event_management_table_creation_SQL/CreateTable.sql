
create database Users;
use Users;
select * from Event_Management.Users ;
select * from Event_Management.Agendas;
select * from Event_Management.Events;
select * from Event_Management.Guests;
select * from Event_Management.Invitations;
select * from Event_Management.Notifications;


SELECT * FROM dbo.getAllUsersAndData();


CREATE TABLE Event_Management.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    BirthDate DATE NOT NULL,
    UserPassword VARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UserRole VARCHAR(50) NOT NULL DEFAULT 'User'
);

CREATE TABLE Event_Management.Events (
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
    UserID INT FOREIGN KEY REFERENCES Event_Management.Users(UserID)
);

CREATE TABLE Event_Management.Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    ReciverID INT FOREIGN KEY REFERENCES Users(UserID),       
    SenderID INT FOREIGN KEY REFERENCES Users(UserID),         
    SenderName VARCHAR(100) NOT NULL,                         
    GuestID INT FOREIGN KEY REFERENCES Users(UserID),          
    EventID INT FOREIGN KEY REFERENCES Events(EventID),       
    RespondSent BIT NOT NULL                                 
);


CREATE TABLE Event_Management.Agendas (
    AgendaID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT FOREIGN KEY REFERENCES Event_Management.Events(EventID),
    AgendaLocation VARCHAR(100),
    AgendaDate DATE NOT NULL,
    AgendaStartTime TIME NOT NULL,
    AgendaEndTime TIME NOT NULL,
    AgendaDescription VARCHAR(100) NOT NULL
);

CREATE TABLE Event_Management.Guests (
    GuestID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT FOREIGN KEY REFERENCES Event_Management.Events(EventID),
    GuestName VARCHAR(100),
    GuestEmail VARCHAR(100),
    GuestBirthDate DATE,
    GuestLocation VARCHAR(100)
);

CREATE TABLE Event_Management.Invitations (
    InvitationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),  
    EventID INT FOREIGN KEY REFERENCES Events(EventID), 
    AgendaID INT FOREIGN KEY REFERENCES Agendas(AgendaID),  
    InvitationSent BIT NOT NULL,
    Response VARCHAR(20)
);
