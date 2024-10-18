

namespace EventManagementPro.Models
{
    public class EventData
    {
        public int? EventID { get; set; }
        public string EventName { get; set; }
        public DateTime EventDate { get; set; }

        public string EventCategory { get; set; }
        public string EventDescription { get; set; }
        public string EventStatus { get; set; }
      
        public int? AcceptCount { get; set; }

        public int ?RejectCount { get; set; }
        public int? PendingCount { get; set; }
       
        public string ?ImageUrl { get; set; }
        public int UserID { get; set; }
        public UserData? User { get; set; } 
    }
}
