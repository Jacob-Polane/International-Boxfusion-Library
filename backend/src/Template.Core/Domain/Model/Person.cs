using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Template.Authorization.Users;
using Template.Domain.Enum;

namespace Template.Domain.Model
{
    public abstract class Person : FullAuditedEntity<Guid>
    {
        public virtual String Username { get; set; }
        public virtual String Name { get; set; }
        public virtual String Surname { get; set; }
        public virtual String Password { get; set; }
        public virtual String Email { get; set; }
        public virtual Gender? Gender { get; set; }

        public virtual String PhoneNumber { get; set; }

        public User User { get; set; }
    }
}
