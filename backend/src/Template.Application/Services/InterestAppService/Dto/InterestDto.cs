using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;

namespace Template.Services.InterestAppService.Dto
{
    [AutoMapFrom(typeof(Borrower))]
    public class InterestDto
    {
          public List<string> InterestCategory { get; set; }
    }
}
