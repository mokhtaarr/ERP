namespace Inv.Static.Config
{
    public partial class ApiConnection
    {
        public int ConnectionNumber { get; set; } = 0;
        public string ServerName { get; set; } = "";
        public string singleDb { get; set; } = "";
        public string InitialCatalog { get; set; } = "";
        public bool IntegratedSecurity { get; set; } = false;
        public string DbUserName { get; set; } = "";
        public string DbPassword { get; set; } = "";
        public string providerName { get; set; } = "System.Data.SqlClient";
    }
}
