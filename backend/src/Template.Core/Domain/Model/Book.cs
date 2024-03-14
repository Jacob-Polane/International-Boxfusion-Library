using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Model
{
    internal class Book : FullAuditedEntity<Guid>
    {
        public virtual string Title { get; set; }
        public virtual string Author { get; set; }
        public virtual string Isbn{ get; set; }
    }
}
