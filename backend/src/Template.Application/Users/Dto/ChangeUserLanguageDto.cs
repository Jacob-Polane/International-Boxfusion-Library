using System.ComponentModel.DataAnnotations;

namespace Template.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}