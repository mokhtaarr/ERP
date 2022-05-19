using Inv.DAL.Domain;
using Inv.DAL.Repository;
using Inv.Static.Enums;
using Inv.Static.VM;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.DAL.RedisCache
{
    public class RedisCache
    {
        private static RedisCache redis;
        private ConnectionMultiplexer conn;
        
        private InvEntities context;
        private UnitOfWork unitOfWork;

        private RedisCache() { }

        public static RedisCache GetInstance()
        {
            if (redis == null)
            {
                redis = new RedisCache();
                redis.SetConnection();
                redis.SetContext();

            }
            return redis;
        }
        public void SetConnection()
        {
            conn = ConnectionMultiplexer.Connect(new ConfigurationOptions { AllowAdmin = true, EndPoints = { { "localhost", 6379 } } });
        }
        public void SetContext()
        {
            context = new InvEntities();
            unitOfWork = new UnitOfWork(context);
        }
        public ConnectionMultiplexer GetConnection()
        {
            return conn;
        }
        
        public void ReloadCache()
        {
            var endpoint = conn.GetEndPoints(true).FirstOrDefault();
            //delete all keys
            conn.GetServer(endpoint).FlushDatabase();

            GetOrSetSettings();

            GetOrSetLocalCurrency();
        }

        #region MS_Settings Funcations
        public MS_Settings GetOrSetSettings()
        {
            var db = conn.GetDatabase();
            if (db.KeyExists("settings"))
            {
                MS_Settings settings = JsonConvert.DeserializeObject<MS_Settings>(db.StringGet("settings"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });
                return settings;
            }
            else
            {
                MS_Settings settings = unitOfWork.Repository<MS_Settings>().GetAll().FirstOrDefault();
                db.StringSet("settings", JsonConvert.SerializeObject(settings, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                    Formatting = Formatting.None
                }));

                return settings;
            }
        }

        public void AddOrUpdateSetting(MS_Settings model)
        {
            var db = redis.conn.GetDatabase();
            MS_Settings settings;
            if (db.KeyExists("settings"))
            {
                settings = JsonConvert.DeserializeObject<MS_Settings>(db.StringGet("settings"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });

                settings = model;
            }
            else
            {
                settings = model;
            }
            db.StringSet("settings", JsonConvert.SerializeObject(settings, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.None
            }));
        }
        
        public void SettingOperation(DBOperationType dbOperationType, MS_Settings settings)
        {
            if (dbOperationType == DBOperationType.Add || dbOperationType == DBOperationType.Update)
            {
                AddOrUpdateSetting(settings);
            }
            else
            {
                DeleteSetting(settings.SettingId);
            }
        }

        public void DeleteSetting(int settingId)
        {
            var db = redis.conn.GetDatabase();
            if (db.KeyExists("settings"))
            {
                List<MS_Settings> Settings = JsonConvert.DeserializeObject<List<MS_Settings>>(db.StringGet("settings"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });
                Settings.RemoveAll(x => x.SettingId == settingId);
                db.StringSet("settings", JsonConvert.SerializeObject(Settings, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                    Formatting = Formatting.None
                }));
            }
        }
        #endregion

        #region LocalCurrency
        public MS_Currency GetOrSetLocalCurrency()
        {
            var db = conn.GetDatabase();
            MS_Currency currency;
            if (db.KeyExists("LocalCurrency"))
            {
                currency = JsonConvert.DeserializeObject<MS_Currency>(db.StringGet("LocalCurrency"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });

                return currency;
            }
            else
            {
                currency = unitOfWork.Repository<MS_Currency>().Get(x=>x.DefualtCurrency == true).FirstOrDefault();
                db.StringSet("LocalCurrency", JsonConvert.SerializeObject(currency, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                    Formatting = Formatting.None
                }));

                return currency;
            }
        }

        public void AddOrUpdateLocalCurrency(MS_Currency model)
        {
            var db = redis.conn.GetDatabase();
            MS_Currency settings;
            if (db.KeyExists("LocalCurrency"))
            {
                settings = JsonConvert.DeserializeObject<MS_Currency>(db.StringGet("LocalCurrency"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });

                settings = model;
            }
            else
            {
                settings = model;
            }
            db.StringSet("LocalCurrency", JsonConvert.SerializeObject(settings, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.None
            }));
        }

        public void LocalCurrencyOperation(DBOperationType dbOperationType, MS_Currency model)
        {
            if (dbOperationType == DBOperationType.Add || dbOperationType == DBOperationType.Update)
            {
                AddOrUpdateLocalCurrency(model);
            }
            else
            {
                DeleteLocalCurrency(model.CurrencyId);
            }
        }

        public void DeleteLocalCurrency(int id)
        {
            var db = redis.conn.GetDatabase();
            if (db.KeyExists("LocalCurrency"))
            {
                List<MS_Currency> currency = JsonConvert.DeserializeObject<List<MS_Currency>>(db.StringGet("LocalCurrency"), new JsonSerializerSettings()
                {
                    MaxDepth = null
                });
                currency.RemoveAll(x => x.CurrencyId == id);
                db.StringSet("LocalCurrency", JsonConvert.SerializeObject(currency, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                    Formatting = Formatting.None
                }));
            }
        }
        #endregion
    }
}
