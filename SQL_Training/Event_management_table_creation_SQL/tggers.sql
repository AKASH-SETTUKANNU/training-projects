CREATE TRIGGER trg_LogUserDeletion
ON Users
AFTER DELETE
AS
BEGIN
    INSERT INTO UserDeletionLog (UserID, DeletionDate)
    SELECT d.UserID, GETDATE()
    FROM deleted d;
END;
go

CREATE TRIGGER trg_DeleteGuestsOnEventDelete
ON Events
AFTER DELETE
AS
BEGIN
    DELETE FROM Guests WHERE EventID IN (SELECT EventID FROM deleted);
END;
go

CREATE TRIGGER trg_DeleteNotificationsOnInvitationDelete
ON Invitations
AFTER DELETE
AS
BEGIN
    DELETE FROM Notifications WHERE UserID IN (SELECT UserID FROM deleted);
END;
