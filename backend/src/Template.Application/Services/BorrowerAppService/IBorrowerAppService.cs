using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Services.BorrowerAppService.Dto;
using Template.Services.InterestAppService.Dto;

namespace Template.Services.BorrowerAppService
{
    public interface IBorrowerAppService:IApplicationService
    {
        Task<BorrowerDto> CreateAsync(BorrowerDto input);
        Task<BorrowerDto> GetAsync(Guid id);
        Task<List<BorrowerDto>> GetAllAsync();
        Task<BorrowerDto> UpdateAsync(BorrowerDto input);
        Task Delete(Guid id);
        Task<InterestDto> CreateInterest(InterestDto input);
        Task<InterestDto> GetInterests();
    }
}
