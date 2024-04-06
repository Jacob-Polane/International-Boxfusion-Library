using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;

namespace Template.Services.PersonAppService.Dto
{
    [AutoMapFrom(typeof(Person))]
    public class PersonDto: EntityDto<Guid>
    {
    }
}
