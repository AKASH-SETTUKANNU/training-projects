namespace taskTracker.models
{
    public class TaskData
    {
        public int UserID { get; set; }
        public int ? TaskID { get; set; }

        public string taskclientName {  get; set; }

        public string taskProjectName { get; set; }
        public string taskTitle {  get; set; }

        public int taskHours {  get; set; }

        public DateTime taskDate {  get; set; }

        public string taskAssignedTo { get; set; }

        public string taskAssignedBy { get; set; }

        public string tasksupportType {  get; set; }

        public string taskPriority { get; set; }
        public string taskDescription { get; set; }
    }
}
