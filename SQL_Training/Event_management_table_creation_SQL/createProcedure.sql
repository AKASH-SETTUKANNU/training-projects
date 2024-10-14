CREATE PROCEDURE AddUser
    @UserName VARCHAR(100),
    @Email VARCHAR(100),
    @BirthDate DATE,
    @UserPassword VARCHAR(100),
    @UserRole VARCHAR(50) = 'User'
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        RAISERROR('Email already exists.', 16, 1);
        RETURN;
    END

    INSERT INTO Users (UserName, Email, BirthDate, UserPassword, UserRole)
    VALUES (@UserName, @Email, @BirthDate, @UserPassword, @UserRole);
END;
go


CREATE PROCEDURE AddEvent
    @EventName VARCHAR(100),
    @EventDate DATETIME,
    @EventDescription VARCHAR(100),
    @EventStatus VARCHAR(100),
    @EventCategory VARCHAR(50),
    @UserId INT
AS
BEGIN
    INSERT INTO Events (EventName, EventDate, EventDescription, EventStatus, EventCategory, UserId)
    VALUES (@EventName, @EventDate, @EventDescription, @EventStatus, @EventCategory, @UserId);
END;
go


CREATE PROCEDURE AddNotification
    @UserId INT,
    @SenderEmail VARCHAR(100),
    @SenderName VARCHAR(100),
    @GuestEmail VARCHAR(100),
    @EventId INT,
    @RespondSent BIT
AS
BEGIN
    INSERT INTO Notifications (UserID, SenderEmail, SenderName, GuestEmail, EventId, RespondSent)
    VALUES (@UserId, @SenderEmail, @SenderName, @GuestEmail, @EventId, @RespondSent);
END;
go



CREATE PROCEDURE AddAgenda
    @EventID INT,
    @AgendaLocation VARCHAR(100),
    @AgendaDate DATE,
    @AgendaStartTime TIME,
    @AgendaEndTime TIME,
    @AgendaDescription VARCHAR(100)
AS
BEGIN
    INSERT INTO Agendas (EventID, AgendaLocation, AgendaDate, AgendaStartTime, AgendaEndTime, AgendaDescription)
    VALUES (@EventID, @AgendaLocation, @AgendaDate, @AgendaStartTime, @AgendaEndTime, @AgendaDescription);
END;
go



CREATE PROCEDURE AddGuest
    @EventID INT,
    @GuestName VARCHAR(100),
    @GuestEmail VARCHAR(100),
    @GuestBirthDate DATE,
    @GuestLocation VARCHAR(100)
AS
BEGIN
    INSERT INTO Guests (EventID, GuestName, GuestEmail, GuestBirthDate, GuestLocation)
    VALUES (@EventID, @GuestName, @GuestEmail, @GuestBirthDate, @GuestLocation);
END;
go


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
    INSERT INTO Invitations (UserID, EventID, EventName, EventLocation, EventDate, EventDescription, 
                             AgendaLocation, AgendaDate, AgendaStartTime, AgendaEndTime, 
                             AgendaDescription, InvitationSent, Response)
    VALUES (@UserID, @EventID, @EventName, @EventLocation, @EventDate, @EventDescription, 
            @AgendaLocation, @AgendaDate, @AgendaStartTime, @AgendaEndTime, 
            @AgendaDescription, @InvitationSent, @Response);
END;
go



CREATE PROCEDURE DeleteUser
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Invitations WHERE UserID = @UserID;
    DELETE FROM Notifications WHERE UserID = @UserID;
    DELETE FROM Guests WHERE EventID IN (SELECT EventID FROM Events WHERE UserId = @UserID);
    DELETE FROM Agendas WHERE EventID IN (SELECT EventID FROM Events WHERE UserId = @UserID);
    DELETE FROM Events WHERE UserId = @UserID;
    DELETE FROM Users WHERE UserID = @UserID;
END;
go

CREATE PROCEDURE DeleteEvent
     @EventID int
as
begin
   delete from  Notifications where EventID = @EventID;
   delete from Events where EventID=@EventID;
   delete from Agendas where EventID=@EventID;
   delete from Guests where EventID=@EventID;
   delete from Invitations where  EventID=@EventID;
end;

go


CREATE PROCEDURE DeleteNotification
    @NotificationID INT
AS
BEGIN
    DELETE FROM Notifications WHERE NotificationID = @NotificationID;
END;
go


CREATE PROCEDURE DeleteAgenda
    @AgendaID INT
AS
BEGIN
    DELETE FROM Agendas WHERE AgendaID = @AgendaID;
END;
go



CREATE PROCEDURE DeleteGuest
    @GuestID INT
AS
BEGIN
    DELETE FROM Guests WHERE GuestID = @GuestID;
END;
go



CREATE PROCEDURE DeleteInvitation
    @InvitationID INT
AS
BEGIN
    DELETE FROM Invitations WHERE InvitationID = @InvitationID;
END;
