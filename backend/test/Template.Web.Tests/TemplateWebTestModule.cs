using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Template.EntityFrameworkCore;
using Template.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Template.Web.Tests
{
    [DependsOn(
        typeof(TemplateWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class TemplateWebTestModule : AbpModule
    {
        public TemplateWebTestModule(TemplateEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(TemplateWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(TemplateWebMvcModule).Assembly);
        }
    }
}