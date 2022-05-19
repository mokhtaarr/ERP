using Inv.API.Tools;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace Inv.API.Mobile
{
    public class LnguageController : BaseController
    {
        public void ChangeLanguage(string lang)
        {
            SetLanguage(lang);
        }

        public static List<Languages> AvailableLanguages = new List<Languages> {
            new Languages {
                LanguageFullName = "arabic", LanguageCultureName = "ar"
            },
            new Languages {
                LanguageFullName = "English", LanguageCultureName = "en"
            },
        };

        public static bool IsLanguageAvailable(string lang)
        {
            return AvailableLanguages.Where(a => a.LanguageCultureName.Equals(lang)).FirstOrDefault() != null ? true : false;
        }

        public static string GetDefaultLanguage()
        {
            return AvailableLanguages[0].LanguageCultureName;
        }

        public string GetLanguage()
        {
            try
            {
                string languages = "ar";
                HttpCookie culture = HttpContext.Current.Request.Cookies["culture"];

                if (culture != null)
                    languages = culture.Value;

                else { 
                    SetLanguage(languages);
                }

                return languages;
            }
            catch (Exception) {
                return null;
            }
        }

        [HttpPost]
        public bool SetLanguage(string lang)
        {
            try
            {
                if (!IsLanguageAvailable(lang)) lang = GetDefaultLanguage();
                var cultureInfo = new CultureInfo(lang);
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureInfo.Name);

                HttpCookie langCookie = new HttpCookie("culture", lang);
                langCookie.Expires = DateTime.Now.AddYears(1);
                HttpContext.Current.Response.Cookies.Add(langCookie);
                return true;
            }
            catch (Exception) {
                return false;
            }
        }
    }

    public class Languages
    {
        public string LanguageFullName { get;  set; }
        public string LanguageCultureName { get; set; }
    }
}
