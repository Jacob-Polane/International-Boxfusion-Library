using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Template.Domain.Enum
{
    public enum Status : int
    {
        [Description("Pending")]
        Pending=1,
        [Description("Ready To Be Collected")]
        Ready = 2,

        [Description("Collected")]
        Collected = 3,

        [Description("Returned")]
        Returned = 4
    }
}
