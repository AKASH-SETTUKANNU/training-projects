
CREATE PROCEDURE AddUser
    @UserName VARCHAR(100),
    @Email VARCHAR(100),
    @BirthDate DATE,
    @UserPassword VARCHAR(100),
    @UserRole VARCHAR(50) = 'User'
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        RAISERROR('Email already exists.', 16, 1);
        RETURN;
    END

    INSERT INTO Users (UserName, Email, BirthDate, UserPassword, UserRole)
    VALUES (@UserName, @Email, @BirthDate, @UserPassword, @UserRole);
END;

create procedure AddEvent
 @EventName VARCHAR(100),
    @EventDate DATETIME,
    @EventDescription VARCHAR(100),
    @EventStatus VARCHAR(100),
    @EventCategory VARCHAR(50),
    @UserId INT
	as
	begin

	insert into Events(EventName,EventDate,EventDescription,EventStatus,EventCategory,UserId)
	values (@EventName,@EventDate,@EventDescription,@EventStatus,@EventCategory,@UserId);

	end;

create procedure AddNotification
     @UserId int,
	 @SenderEmail varchar(100),
	 @SenderName varchar(100),
	 @GuestEmail varchar(100),
	 @EventId int,
	 @RespondSent BIT

 as
 begin
  
  insert into Notifications(UserID,SenderEmail,SenderName,GuestEmail,EventId,RespondSent)
  values (@UserId,@SenderEmail,@SenderName,@GuestEmail,@EventId,@RespondSent);
  end;

create procedure AddAgenda
        @EventID int,
		@AgendaLocation varchar(100),
		@AgendaDate date,
		@AgendaStartTime time,
		@AgendaEndTime time,
		@AgendaDescription varchar(100)

	as
	begin 

	insert into Agendas(EventID,AgendaLocation,AgendaDate,AgendaStartTime,AgendaEndTime,AgendaDescription)
	values (@EventID,@AgendaLocation,@AgendaDate,@AgendaStartTime,@AgendaEndTime,@AgendaDescription);

	end;

create procedure AddGuest
      @EventID int,
	  @GuestName varchar(100),
	  @GuestEmail varchar(100),
	  @GuestBirthDate date,
	  @GuestLocation varchar(100)

as
 begin
	 INSERT INTO Guests (EventID, GuestName, GuestEmail, GuestBirthDate, GuestLocation)
    VALUES (@EventID, @GuestName, @GuestEmail, @GuestBirthDate, @GuestLocation);
END;
CREATE PROCEDURE AddInvitation
    @UserID INT,
    @EventID INT,
    @EventName VARCHAR(100),
    @EventLocation VARCHAR(100),
    @EventDate DATETIME,
    @EventDescription VARCHAR(255),
    @AgendaLocation VARCHAR(100),
    @AgendaDate DATE,
    @AgendaStartTime TIME,
    @AgendaEndTime TIME,
    @AgendaDescription VARCHAR(255),
    @InvitationSent BIT,
    @Response VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Invitations (UserID, EventID, EventName, EventLocation, EventDate, EventDescription, 
                             AgendaLocation, AgendaDate, AgendaStartTime, AgendaEndTime, 
                             AgendaDescription, InvitationSent, Response)
    VALUES (@UserID, @EventID, @EventName, @EventLocation, @EventDate, @EventDescription, 
            @AgendaLocation, @AgendaDate, @AgendaStartTime, @AgendaEndTime, 
            @AgendaDescription, @InvitationSent, @Response);
END;