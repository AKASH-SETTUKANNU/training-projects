CREATE PROCEDURE Event_Management.AddUser
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

drop procedure Event_Management.AddEvent;
CREATE PROCEDURE Event_Management.AddEvent
    @EventName VARCHAR(100),
    @EventDate DATETIME,
    @EventDescription VARCHAR(100),
    @EventStatus VARCHAR(100),
    @EventCategory VARCHAR(50),
    @UserId INT,
    @AcceptCount INT = 0,  -- Default value if not provided
    @RejectCount INT = 0,  -- Default value if not provided
    @PendingCount INT = 0,  -- Default value if not provided
    @ImageUrl VARCHAR(255) = NULL  -- Default value if not provided
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Event_Management.Users WHERE UserID = @UserId)
    BEGIN
        RAISERROR('User does not exist.', 16, 1);
        RETURN;
    END

    INSERT INTO Event_Management.Events 
    (
        EventName, EventDate, EventDescription, EventStatus, EventCategory, 
        UserId, AcceptCount, RejectCount, PendingCount, ImageUrl
    )
    VALUES 
    (
        @EventName, @EventDate, @EventDescription, @EventStatus, @EventCategory, 
        @UserId, @AcceptCount, @RejectCount, @PendingCount, @ImageUrl
    );
END;

go


CREATE PROCEDURE Event_Management.AddNotification
    @ReciverUserID INT,
    @SenderUserID INT,
    @SenderName VARCHAR(100),
    @GuestID INT,
    @EventID INT,
    @AgendaID INT,
    @RespondSent BIT
AS
BEGIN
    INSERT INTO Event_Management.Notifications 
    (
        ReciverUserID, 
        SenderUserID, 
        SenderName, 
        GuestID, 
        EventID, 
        AgendaID, 
        RespondSent
    )
    VALUES 
    (
        @ReciverUserID, 
        @SenderUserID, 
        @SenderName, 
        @GuestID, 
        @EventID, 
        @AgendaID, 
        @RespondSent
    );
END;

go

drop procedure Event_Management.AddAgenda

CREATE PROCEDURE Event_Management.AddAgenda
    @EventID INT,
    @AgendaLocation VARCHAR(100),
    @AgendaDate DATE,
    @AgendaStartTime TIME,
    @AgendaEndTime TIME,
    @AgendaDescription VARCHAR(100)
AS
BEGIN
    INSERT INTO Event_Management.Agendas (EventID, AgendaLocation, AgendaDate, AgendaStartTime, AgendaEndTime, AgendaDescription)
    VALUES (@EventID, @AgendaLocation, @AgendaDate, @AgendaStartTime, @AgendaEndTime, @AgendaDescription);
END;
go



CREATE PROCEDURE Event_Management.AddGuest
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


CREATE PROCEDURE Event_Management.AddInvitation
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



CREATE PROCEDURE Event_Management.DeleteUser
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

CREATE PROCEDURE Event_Management.DeleteEvent
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


CREATE PROCEDURE Event_Management.DeleteNotification
    @NotificationID INT
AS
BEGIN
    DELETE FROM Notifications WHERE NotificationID = @NotificationID;
END;
go


CREATE PROCEDURE Event_Management.DeleteAgenda
    @AgendaID INT
AS
BEGIN
    DELETE FROM Agendas WHERE AgendaID = @AgendaID;
END;
go



CREATE PROCEDURE Event_Management.DeleteGuest
    @GuestID INT
AS
BEGIN
    DELETE FROM Guests WHERE GuestID = @GuestID;
END;
go




CREATE PROCEDURE Event_Management.DeleteInvitation
    @InvitationID INT
AS
BEGIN
    DELETE FROM Invitations WHERE InvitationID = @InvitationID;
END;

CREATE PROCEDURE Event_Management.UpdateEvent
    @EventID INT,
    @EventName VARCHAR(100),
    @EventDate DATETIME,
    @EventDescription VARCHAR(100),
    @EventStatus VARCHAR(100),
    @EventCategory VARCHAR(50),
    @UserID INT
AS
BEGIN
    UPDATE Event_Management.Events
    SET 
        EventName = @EventName,
        EventDate = @EventDate,
        EventDescription = @EventDescription,
        EventStatus = @EventStatus,
        EventCategory = @EventCategory,
        UserID = @UserID
    WHERE EventID = @EventID;
END;
go
drop procedure Event_Management.UpdateAgenda
CREATE PROCEDURE Event_Management.UpdateAgenda
    @AgendaID INT,
    @EventID INT,
    @AgendaLocation VARCHAR(100),
    @AgendaDate DATE,
    @AgendaStartTime TIME,
    @AgendaEndTime TIME,
    @AgendaDescription VARCHAR(100)
AS
BEGIN
    
    IF EXISTS (SELECT 1 FROM Event_Management.Agendas WHERE AgendaID = @AgendaID)
    BEGIN
        UPDATE Event_Management.Agendas
        SET 
            EventID = @EventID,
            AgendaLocation = @AgendaLocation,
            AgendaDate = @AgendaDate,
            AgendaStartTime = @AgendaStartTime,
            AgendaEndTime = @AgendaEndTime,
            AgendaDescription = @AgendaDescription
        WHERE AgendaID = @AgendaID;
    END
    ELSE
    BEGIN
        THROW 50000, 'Agenda not found.', 1;
    END
END;


CREATE PROCEDURE Event_Management.UpdateGuest
    @GuestID INT,
    @EventID INT,
    @GuestName VARCHAR(100),
    @GuestEmail VARCHAR(100),
    @GuestBirthDate DATE,
    @GuestLocation VARCHAR(100)
AS
BEGIN
    UPDATE Event_Management.Guests
    SET 
        EventID = @EventID,
        GuestName = @GuestName,
        GuestEmail = @GuestEmail,
        GuestBirthDate = @GuestBirthDate,
        GuestLocation = @GuestLocation
    WHERE GuestID = @GuestID;
    
    
    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Guest not found or no changes made.', 16, 1);
    END
END;
EXEC Event_Management.UpdateGuest
    @GuestID = 1,
    @EventID = 9,
    @GuestName = 'John Doe',
    @GuestEmail = 'johndoe@example.com',
    @GuestBirthDate = '1985-10-15',
    @GuestLocation = 'New York';
