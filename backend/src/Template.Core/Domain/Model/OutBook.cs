using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Enum;

namespace Template.Domain.Model
{
    public class OutBook:FullAuditedEntity<Guid>
    {
        public virtual Guid BookId { get; set; }
        public virtual Book Book { get; set; }
        public virtual Guid BorrowerId { get; set; }
        public virtual Borrower Borrower { get; set; }
        public virtual Status Status { get; set; }
    }
}

