using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Authorization.Users;
using Template.Domain.Enum;

namespace Template.Services.BorrowerAppService.Dto
{
    public class BorrowerDto:EntityDto<Guid>
    {
        public  String Username { get; set; }
        public  String Name { get; set; }
        public  String Surname { get; set; }
        public  String Password { get; set; }
        public  String Email { get; set; }
        public  Gender? Gender { get; set; }
        public  String PhoneNumber { get; set; }

        public long userId { get; set; }
        public  List<String>? InterestCategory { get; set; } // can be set initially 
        public  List<String>? History { get; set; }//save memory save catelogue rather than entire book
    }
}
