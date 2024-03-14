using System.Threading.Tasks;
using Template.Configuration.Dto;

namespace Template.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
