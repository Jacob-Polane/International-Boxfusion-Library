using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;

namespace Template.Services.CommentAppService.Dto { 

    [AutoMapFrom(typeof(Comment))]
    public class CommentDto : EntityDto<Guid>
    {
        public virtual string Message { get; set; }

        [Range(0, 5, ErrorMessage = "Rating has to be between 0 and 5")]
        public virtual int rating { get; set; }
        //public virtual Guid BookId { get; set; }
    }
}
