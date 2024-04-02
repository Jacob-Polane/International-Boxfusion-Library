using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Services.BorrowerAppService.Dto;

namespace Template.Services.LibrarianAppService
{
    public interface ILibrarianAppService: IApplicationService
    {
        Task<BorrowerDto> CreateAsync(BorrowerDto input);
        Task<BorrowerDto> GetAsync(Guid id);
        Task<List<BorrowerDto>> GetAllAsync();
        Task<BorrowerDto> UpdateAsync(BorrowerDto input);
        Task Delete(Guid id);
    }
}
