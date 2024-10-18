using EventManagementPro.Models;

namespace EventManagementPro.models
{
    public class NotificationData
    {
        public int NotificationID { get; set; }
        public int ReciverUserID { get; set; }  
        public int SenderUserID { get; set; }  
        public string SenderName { get; set; }
        public int GuestID { get; set; }      
        public int EventID { get; set; }
        public int AgendaID { get; set; }      
        public bool RespondSent { get; set; }

        //public EventData Event { get; set; }
        //public UserData Reciver { get; set; }    
        //public UserData Sender { get; set; }     
        //public UserData Guest { get; set; }     
    }
}
