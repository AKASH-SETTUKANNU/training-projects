EXEC Event_Management.AddUser 
    @UserName='Akash',
    @Email='akash123@gmail.com',
    @BirthDate='2003-09-10',
    @UserPassword='12345678',
    @UserRole='User';

EXEC Event_Management.AddEvent 
    @EventName='Annual Meetup', 
    @EventDate='2024-11-01', 
    @EventDescription='Yearly gathering of all members.', 
    @EventStatus='Upcoming', 
    @EventCategory='Networking', 
    @UserId=1;

EXEC Event_Management.AddNotification 
    @UserId=2, 
    @SenderEmail='akah@gmail.com', 
    @SenderName='Akash', 
    @GuestEmail='koushik@gmail.com', 
    @EventId=4,  
    @RespondSent=0;

EXEC Event_Management.AddAgenda 
    @EventID=9,  
    @AgendaLocation='Conference Room', 
    @AgendaDate='2024-11-01', 
    @AgendaStartTime='09:00', 
    @AgendaEndTime='12:00', 
    @AgendaDescription='Discuss annual goals and objectives.';
--	{
--  "agendaID": 0,
--  "eventID": 9,
--  "agendaLocation": "Conference Room",
--  "agendaDate": "2024-10-18T06:28:20.552Z",
--  "agendaStartTime": "09:00:00", 
--  "agendaEndTime": "09:00:00",    
--  "agendaDescription": "Discuss annual goals and objectives."
--}

EXEC Event_Management.AddGuest 
    @EventID=4,
    @GuestName='Koushik', 
    @GuestEmail='Koushik@gmail.com', 
    @GuestBirthDate='2003-05-15', 
    @GuestLocation='Bangalore';

EXEC Event_Management.AddInvitation 
    @UserID=2, 
    @EventID=4,
    @EventName='Annual Meetup',
    @EventLocation='Headquarters',
    @EventDate='2024-11-01',
    @EventDescription='Yearly gathering of all members.',
    @AgendaLocation='Conference Room',
    @AgendaDate='2024-11-01',
    @AgendaStartTime='09:00',
    @AgendaEndTime='12:00',
    @AgendaDescription='Discuss annual goals and objectives.',
    @InvitationSent=1,
    @Response='Pending';
