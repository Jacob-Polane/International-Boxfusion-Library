using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Enum;

namespace Template.Services.OutbookAppService.Dto
{
     public class OutbookUpdateDto
    {
        public Guid Id { get; set; }
        public Status status { get; set; }
    }
}
