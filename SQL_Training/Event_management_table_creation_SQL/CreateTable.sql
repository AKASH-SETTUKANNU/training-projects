
create table Users(UserID int identity(1,1) primary key,
                   UserName varchar(100) not null,
				   Email varchar(100) not null unique,
				   BirthDate date not null,
				  UserPassword varchar(100) not null,
				  createdAt Datetime default getdate(),
				  UserRole varchar(50) not null default 'User'
);

create table Events(
    EventId int identity(1,1) primary key,
	EventName varchar(100) not null,
	EventDate datetime not null,
	EventDescription varchar(100) not null,
	EventStatus varchar(100) not null,
	EventCategory varchar(50) not null,
	AcceptCount int default 0,
	PendingCount int default 0,
	RejectCount int default 0,
	ImageUrl varchar(255),
	UserId int foreign key references Users(UserId)
	);

create table Notifications(
     NotificationID int identity(1,1) primary key,
	 UserID INT FOREIGN KEY REFERENCES Users(UserID),
	 SenderEmail varchar(100) not null,
	 SenderName varchar(100) not null,
	 GuestEmail varchar(100) not Null,
	 EventId int foreign key references Events(EventID),
	 RespondSent bit not null
	 );

create table Agendas(
      AgendaID int identity(1,1) primary key,
	  EventID int foreign key references Events(EventID),
	  AgendaLocation varchar(100),
	  AgendaDate date not null,
	  AgendaStartTime time not null,
	  AgendaEndTime time not null,
	  AgendaDescription varchar(100) not null
	  );

create table Guests(
     GuestID int identity(1,1) primary key,
	 EventID int foreign key references Events(EventID),
	 GuestName varchar(100),
	 GuestEmail varchar(100),
	 GuestBirthDate date,
	 GuestLocation varchar(100)
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
