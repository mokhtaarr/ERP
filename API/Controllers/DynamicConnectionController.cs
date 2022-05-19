using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using Inv.Static.Config;
using Newtonsoft.Json.Linq;

using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Win32;
using System.Data;
using System.Data.Sql;
using Microsoft.SqlServer.Management.Smo;
using System.Web;

namespace Inv.API.Controllers
{
    [AllowAnonymous]
    public class DynamicConnectionController : ApiController
    {
        private string url = WebConfigurationManager.AppSettings["ServiceUrl"];

        [HttpGet, AllowAnonymous]
        public object GetServersName()
        {
            List<string> serverNames = new List<string>();
            try
            {
                string ServerName = Environment.MachineName;
                RegistryView registryView = Environment.Is64BitOperatingSystem ? RegistryView.Registry64 : RegistryView.Registry32;
                using (RegistryKey hklm = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, registryView))
                {
                    RegistryKey instanceKey = hklm.OpenSubKey(@"SOFTWARE\Microsoft\Microsoft SQL Server\Instance Names\SQL", false);
                    if (instanceKey != null)
                    {
                        string def = "MSSQLSERVER";
                        foreach (var instanceName in instanceKey.GetValueNames())
                        {
                            if(instanceName.ToLower() == def.ToLower())
                                serverNames.Add(ServerName);
                            else
                                serverNames.Add(ServerName + "\\" + instanceName);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                serverNames = null;
                return Json(new { data = serverNames, ms = ex.Message, status = false });
            }

            return Json(new { data = serverNames, ms = "", status = true });
        }

        [HttpGet, AllowAnonymous]
        public object GetDatabasesName(string serverName)
        {
            var server = new Server();
        //    int tryCount = 1;
        //Loop:
            List<string> Databases = new List<string>();
            try
            {
                //var ser = new Microsoft.SqlServer.Management.Smo.Server(serverName);
                //foreach (Database db in ser.Databases)
                //{
                //    if (!db.IsSystemObject && !db.IsDatabaseSnapshot)
                //        Databases.Add(db.Name);
                //}

                server = new Server(serverName);
                Databases = (from Database database in server.Databases
                             where !database.IsSystemObject && !database.IsDatabaseSnapshot
                             select database.Name).ToList();
            }
            catch (Exception ex)
            {
                //if (tryCount == 1)
                //{
                //    serverName = serverName.Split('\\')[0];
                //    goto Loop;
                //}

                //tryCount++;
                Databases = null;
                return Json(new { data = Databases, ms = ex.Message, status = false });
            }
            return Json(new { data = Databases, ms = "", status = true });
        }

        [HttpGet, AllowAnonymous]
        public bool TestConnectionString(string connectionString)
        {
            bool flag = true;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                }
                catch (SqlException)
                {
                    return flag = false;
                }
            }
            return flag;
        }

        [HttpGet, AllowAnonymous]
        public string SaveConnection(string data, string mode)
        {
            string files = string.Empty;
            try
            {
                JObject json = JObject.Parse(data);
                if (json != null)
                {

                    if (!Directory.Exists(HttpContext.Current.Server.MapPath("/JsonData")))
                    {
                        Directory.CreateDirectory(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData"));
                    }
                }

                List<ApiConnection> OldFile = GetDatabses();

                if (OldFile == null)
                {
                    files = "[" + json.ToString() + "]";
                    System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData/ApiConnection.json"), files);
                }
                else if (OldFile.Count <= 0)
                {
                    files = "[" + json.ToString() + "]";
                    System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData/ApiConnection.json"), files);
                }
                else
                {
                    int newNum = OldFile.Select(x => x.ConnectionNumber).Max() + 1;
                    JObject NewRow = JObject.Parse(data);

                    ApiConnection connections = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiConnection>(NewRow.ToString());

                    ApiConnection checkifExist = new ApiConnection();
                    if (mode == "add")
                        checkifExist = null;
                    else
                        checkifExist = OldFile.Where(x => x.ConnectionNumber == connections.ConnectionNumber).FirstOrDefault();

                    string NewFile = "";
                    if (mode == "edit" && checkifExist != null)
                    {
                        checkifExist.DbPassword = connections.DbPassword;
                        checkifExist.DbUserName = connections.DbUserName;
                        checkifExist.singleDb = connections.singleDb;
                        checkifExist.ServerName = connections.ServerName;
                        checkifExist.InitialCatalog = connections.InitialCatalog;
                        checkifExist.IntegratedSecurity = connections.IntegratedSecurity;
                        connections = checkifExist;
                    }

                    if (mode == "add")
                    {
                        connections.ConnectionNumber = newNum;
                        OldFile.Add(connections);
                    }


                    NewFile = JsonSerializer.Serialize(OldFile);

                    files = NewFile.ToString();
                    System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData/ApiConnection.json"), files);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return files;
        }

        [HttpGet, AllowAnonymous]
        public List<ApiConnection> GetDatabses()
        {
            List<ApiConnection> connections = new List<ApiConnection>();
            try
            {
                var file = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData/ApiConnection.json"));
                string json = JsonSerializer.Serialize(file);
                connections = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ApiConnection>>(file);
            }
            catch (Exception ex)
            {
                connections = null;
            }
            return connections;
        }

        [HttpGet, AllowAnonymous]
        public object GetDatabsesJson()
        {
            try
            {
                string json = JsonSerializer.Serialize(GetDatabses());
                return Json(json);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet, AllowAnonymous]
        public object RemoveConection(int ConnectionNumber)
        {
            try
            {
                List<ApiConnection> connections = GetDatabses();
                ApiConnection connection = connections.Where(x => x.ConnectionNumber == ConnectionNumber).FirstOrDefault();
                connections.Remove(connection);

                var newConnections = JsonSerializer.Serialize(connections);
                var files = newConnections.ToString();
                System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath("/JsonData/ApiConnection.json"), files);

                string json = JsonSerializer.Serialize(GetDatabses());
                return Json(json);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet, AllowAnonymous]
        public bool LoginWithConnection(string data, string url)
        {
            try
            {
                JObject connectionStr = JObject.Parse(data);
                ApiConnection connection = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiConnection>(connectionStr.ToString());

                Connection.ServerName = connection.ServerName;
                Connection.Database = connection.InitialCatalog;
                Connection.UserName = connection.DbUserName;
                Connection.Password = connection.DbPassword;
                Connection.IntegratedSecurity = connection.IntegratedSecurity;
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
