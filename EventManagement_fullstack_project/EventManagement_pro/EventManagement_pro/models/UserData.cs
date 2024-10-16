using System.ComponentModel.DataAnnotations;

namespace EventManagementPro.Models
{
    public class UserData
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string UserPassword { get; set; }
        public string UserRole { get; set; }
    }
}
