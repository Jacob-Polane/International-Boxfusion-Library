using Abp.Authorization;
using Template.Authorization.Roles;
using Template.Authorization.Users;

namespace Template.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
