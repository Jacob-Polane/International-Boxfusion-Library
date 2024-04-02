using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Model
{
    public class Borrower:Person
    {
        public virtual List<String>? InterestCategory { get; set; } // can be set initially 
        public virtual List<String>? History { get; set; }//save memory save catelogue rather than entire book
    }
}
