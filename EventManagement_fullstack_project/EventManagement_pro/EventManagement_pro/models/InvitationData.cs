using EventManagementPro.Models;

namespace EventManagementPro.models
{
    public class InvitationData
    {
        public int InvitationID { get; set; }
        public int UserID { get; set; }
        public int EventID { get; set; }
        public string EventName { get; set; }
        public string EventLocation { get; set; }
        public DateTime EventDate { get; set; }
        public string EventDescription { get; set; }
        public string AgendaLocation { get; set; }
        public DateTime AgendaDate { get; set; }
        public TimeSpan AgendaStartTime { get; set; }
        public TimeSpan AgendaEndTime { get; set; }
        public string AgendaDescription { get; set; }
        public bool InvitationSent { get; set; }
        public string Response { get; set; }
        public UserData User { get; set; } // Navigation property
        public EventData Event { get; set; } // Navigation property
    }
}
