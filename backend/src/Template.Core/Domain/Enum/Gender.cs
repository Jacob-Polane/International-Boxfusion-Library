using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Enum
{
    public enum Gender:int
    {
        [Description("Male")]
        Male=1,

        [Description("Female")]
        Female = 2,

        [Description("Other")]
        Other = 3,
    }
}
