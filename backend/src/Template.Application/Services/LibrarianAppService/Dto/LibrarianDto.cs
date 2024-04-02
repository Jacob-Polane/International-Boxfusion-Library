using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Enum;
using Template.Domain.Model;

namespace Template.Services.LibrarianAppService.Dto
{
    [AutoMapFrom(typeof(Librarian))]
    public class LibrarianDto:EntityDto<Guid>
    {
        public String Username { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Password { get; set; }
        public String Email { get; set; }
        public Gender? Gender { get; set; }
        public String PhoneNumber { get; set; }

        public long userId { get; set; }
        public virtual string Department { get; set; }
        public virtual string ?Rating { get; set; }
    }
}
