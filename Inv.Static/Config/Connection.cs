using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.Static.Config
{
    public static class Connection
    {
        public static int ConnectionNumber { get; set; }
        public static string ServerName { get; set; }
        public static bool IntegratedSecurity { get; set; }
        public static string UserName { get; set; }
        public static string Password { get; set; }
        public static string Database { get; set; }
        public static bool singleDb { get; set; } = true;
        public static string Url { get; set; }
    }
}
