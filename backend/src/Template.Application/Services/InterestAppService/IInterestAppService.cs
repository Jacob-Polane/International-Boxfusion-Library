using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Services.InterestAppService.Dto;

namespace Template.Services.InterestAppService
{
    public interface IInterestAppService: IApplicationService
    {
        Task<List<InterestDto>> GetAll(Guid id);
        Task<InterestDto> create(Guid id, [FromBody] string interest);
    }
}
