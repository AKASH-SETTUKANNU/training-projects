

EXEC AddUser 
    @UserName="Akash",
    @Email="akash123@gmail.com",
    @BirthDate="2003-09-10",
    @UserPassword="12345678",
    @UserRole ='User'

EXEC AddEvent 
    @EventName = 'Annual Meetup', 
    @EventDate = '2024-11-01', 
    @EventDescription = 'Yearly gathering of all members.', 
    @EventStatus = 'Upcoming', 
    @EventCategory = 'Networking', 
    @UserId = 1;  


EXEC AddNotification 
    @UserId = 1, 
    @SenderEmail = 'akah@gmail.com', 
    @SenderName = 'Akash', 
    @GuestEmail = 'koushik@gmail.com', 
    @EventId = 2,  
    @RespondSent = 0; 


EXEC AddAgenda 
    @EventID = 2,  
    @AgendaLocation = 'Conference Room ', 
    @AgendaDate = '2024-11-01', 
    @AgendaStartTime = '09:00', 
    @AgendaEndTime = '12:00', 
    @AgendaDescription = 'Discuss annual goals and objectives.';


EXEC AddGuest 
    @EventID = 2,
    @GuestName = 'Koushik', 
    @GuestEmail = 'Koushik@gmail.com', 
    @GuestBirthDate = '2003-05-15', 
    @GuestLocation = 'coimbatore';


EXEC AddInvitation 
    @UserID = 1,  
    @EventID = 2, 
    @EventName = 'Annual Meetup', 
    @EventLocation = 'Conference Center', 
    @EventDate = '2024-11-01', 
    @EventDescription = 'Yearly gathering of all members.', 
    @AgendaLocation = 'Conference ', 
    @AgendaDate = '2024-11-01', 
    @AgendaStartTime = '09:00', 
    @AgendaEndTime = '12:00', 
    @AgendaDescription = 'Discuss annual goals and objectives.', 
    @InvitationSent = 1, 
    @Response = 'Pending'; 
