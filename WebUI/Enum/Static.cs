using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Enum
{
    public enum Nationality
    {
        [Display(Name = "Egypt", ResourceType = typeof(Resources.SystemResource))]
        Egypt = 1,

        [Display(Name = "Libya", ResourceType = typeof(Resources.SystemResource))]
        Libya = 2,

        [Display(Name = "Japan", ResourceType = typeof(Resources.SystemResource))]
        Japan = 3,

        [Display(Name = "India", ResourceType = typeof(Resources.SystemResource))]
        India = 4,
    }

    public enum Religion
    {
        [Display(Name = "Muslim", ResourceType = typeof(Resources.SystemResource))]
        Egypt = 1,

        [Display(Name = "Christian", ResourceType = typeof(Resources.SystemResource))]
        Libya = 2,

        [Display(Name = "Other", ResourceType = typeof(Resources.SystemResource))]
        Japan = 3,
    }
    public enum EtaxCustType
    {
        //[Display(Name = "Person", ResourceType = typeof(Resources.SystemResource))]
        Person = 1,

        //[Display(Name = "Business", ResourceType = typeof(Resources.SystemResource))]
        Business = 2,

        //[Display(Name = "Foreigner", ResourceType = typeof(Resources.SystemResource))]
        Foreigner = 3,
    }
}
