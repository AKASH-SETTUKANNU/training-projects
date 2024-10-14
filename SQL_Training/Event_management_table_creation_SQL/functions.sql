CREATE FUNCTION dbo.getAllUsersAndData()
RETURNS TABLE
AS
RETURN
(
    SELECT 
        u.UserID, u.UserName, u.Email, u.BirthDate, u.UserPassword, u.CreatedAt, u.UserRole,
        e.EventID, e.EventName, e.EventDate, e.EventDescription, e.EventStatus, e.EventCategory,
        e.AcceptCount, e.PendingCount, e.RejectCount, e.ImageUrl,
        g.GuestID, g.GuestName, g.GuestEmail, g.GuestBirthDate, g.GuestLocation,
        a.AgendaID, a.AgendaLocation, a.AgendaDate, a.AgendaStartTime, a.AgendaEndTime, a.AgendaDescription,
        i.InvitationID, i.EventName AS InvitationEventName, i.EventLocation, i.EventDate AS InvitationEventDate,
        i.EventDescription AS InvitationEventDescription, i.AgendaLocation AS InvitationAgendaLocation,
        i.AgendaDate AS InvitationAgendaDate, i.AgendaStartTime AS InvitationAgendaStartTime,
        i.AgendaEndTime AS InvitationAgendaEndTime, i.AgendaDescription AS InvitationAgendaDescription,
        i.InvitationSent, i.Response,
        n.NotificationID, n.SenderEmail, n.SenderName, n.GuestEmail AS NotificationGuestEmail, 
        n.RespondSent
    FROM Users u
    LEFT JOIN Events e ON u.UserID = e.UserID
    LEFT JOIN Guests g ON e.EventID = g.EventID
    LEFT JOIN Agendas a ON e.EventID = a.EventID
    LEFT JOIN Invitations i ON e.EventID = i.EventID AND u.UserID = i.UserID
    LEFT JOIN Notifications n ON e.EventID = n.EventID AND u.UserID = n.UserID
);
drop function getAllUsersAndData;

