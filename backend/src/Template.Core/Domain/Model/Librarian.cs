using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Model
{
    public class Librarian : Person
    {
       public virtual string Department { get; set; }
       public virtual string? Rating { get; set; }
    }
}
