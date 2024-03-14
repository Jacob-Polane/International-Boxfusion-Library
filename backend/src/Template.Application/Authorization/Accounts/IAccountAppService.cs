using System.Threading.Tasks;
using Abp.Application.Services;
using Template.Authorization.Accounts.Dto;

namespace Template.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
