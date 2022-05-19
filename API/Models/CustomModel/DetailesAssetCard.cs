using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class Asset_AssetCardDetailes
    {
        public Asset_AssetCard Model { get; set; }
        public List<Cal_AssetAccounts> accounts { get; set; }
    }
}