using EventManagementPro.Models;

namespace EventManagementPro.models
{
    public class NotificationData
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string GuestEmail { get; set; }
        public int EventID { get; set; }
        public bool RespondSent { get; set; }
        public EventData Event { get; set; } // Navigation property
        public UserData User { get; set; } // Navigation property
    }
}
