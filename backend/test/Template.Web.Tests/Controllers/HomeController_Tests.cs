using System.Threading.Tasks;
using Template.Models.TokenAuth;
using Template.Web.Controllers;
using Shouldly;
using Xunit;

namespace Template.Web.Tests.Controllers
{
    public class HomeController_Tests: TemplateWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}