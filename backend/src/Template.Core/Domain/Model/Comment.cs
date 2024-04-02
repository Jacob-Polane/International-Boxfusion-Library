using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Model
{
    public class Comment: FullAuditedEntity<Guid>
    {
        [MaxLength(1000,ErrorMessage ="Comment can not be longer than 1000 characters")]
        public virtual string Message { get; set; }
        
        [Range(0,5,ErrorMessage ="Rating has to be between 0 and 5")]
        public virtual int rating { get; set; }
       /* public virtual Guid BookId { get; set; }
        public virtual  Book Book { get; set; }*/
       public virtual Book Book { get; set; }

    }
}
