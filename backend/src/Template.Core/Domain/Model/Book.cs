using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Model
{
    public class Book : FullAuditedEntity<Guid>
    {
        public virtual string Title { get; set; }
        public virtual string Author { get; set; }
        public virtual string? Isbn10{ get; set; }
        public virtual string? Isbn13 { get; set; }
        public virtual string? Description { get; set; }
        public virtual string? ImageUrl { get; set; }
        public virtual DateTime? PublishedDate { get; set; }
        public virtual string uniqueId { get; set; }
        public virtual int ?Frequency {  get; set; }
        public virtual string Category { get; set; }
        public virtual int ?Number_Avaliable { get; set; }
        public ICollection<Comment> Comments { get; set; } = [];

    }
}
