using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Enum;

namespace Template.Domain.Model
{
    public class Person : FullAuditedEntity<Guid>
    {
        public virtual String Name { get; set; }
        public virtual String Surname { get; set; }
        public virtual String Password { get; set; }
        public virtual String Email { get; set; }
        public virtual Gender? Gender { get; set; }
    }
}
