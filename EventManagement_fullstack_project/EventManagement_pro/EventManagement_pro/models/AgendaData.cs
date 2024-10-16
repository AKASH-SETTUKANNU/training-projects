using EventManagementPro.Models;
namespace EventManagement_pro.models
{
    public class AgendaData
    {
        public int AgendaID { get; set; }
        public int EventID { get; set; }
        public string AgendaLocation { get; set; }
        public DateTime AgendaDate { get; set; }
        public TimeSpan AgendaStartTime { get; set; }
        public TimeSpan AgendaEndTime { get; set; }
        public string AgendaDescription { get; set; }
    }
}
