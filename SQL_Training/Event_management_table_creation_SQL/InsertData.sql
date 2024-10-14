EXEC AddUser 
    @UserName='Akash',
    @Email='akash123@gmail.com',
    @BirthDate='2003-09-10',
    @UserPassword='12345678',
    @UserRole='User';

EXEC AddEvent 
    @EventName='Annual Meetup', 
    @EventDate='2024-11-01', 
    @EventDescription='Yearly gathering of all members.', 
    @EventStatus='Upcoming', 
    @EventCategory='Networking', 
    @UserId=2;

EXEC AddNotification 
    @UserId=2, 
    @SenderEmail='akah@gmail.com', 
    @SenderName='Akash', 
    @GuestEmail='koushik@gmail.com', 
    @EventId=4,  
    @RespondSent=0;

EXEC AddAgenda 
    @EventID=4,  
    @AgendaLocation='Conference Room', 
    @AgendaDate='2024-11-01', 
    @AgendaStartTime='09:00', 
    @AgendaEndTime='12:00', 
    @AgendaDescription='Discuss annual goals and objectives.';

EXEC AddGuest 
    @EventID=4,
    @GuestName='Koushik', 
    @GuestEmail='Koushik@gmail.com', 
    @GuestBirthDate='2003-05-15', 
    @GuestLocation='Bangalore';

EXEC AddInvitation 
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
