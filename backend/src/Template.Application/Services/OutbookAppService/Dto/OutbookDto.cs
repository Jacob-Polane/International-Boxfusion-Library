using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Enum;
using Template.Domain.Model;

namespace Template.Services.OutbookAppService.Dto
{
    [AutoMapFrom(typeof(OutBook))]
    public class OutbookDto:EntityDto<Guid>
    {

        public virtual Guid BookId { get; set; }
        public virtual Guid BorrowerId { get; set; }
        public virtual Status Status { get; set; }
    }
}
