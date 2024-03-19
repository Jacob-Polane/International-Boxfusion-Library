using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Template.Configuration.Dto;

namespace Template.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : TemplateAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
