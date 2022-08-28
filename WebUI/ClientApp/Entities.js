var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SecurityClass = /** @class */ (function () {
    function SecurityClass() {
    }
    return SecurityClass;
}());
var FavModules = /** @class */ (function () {
    function FavModules() {
    }
    return FavModules;
}());
var SystemParameters = /** @class */ (function () {
    function SystemParameters() {
    }
    return SystemParameters;
}());
var APISessionRecord = /** @class */ (function () {
    function APISessionRecord() {
    }
    APISessionRecord.prototype.SetAPISession = function (key, value) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });
    };
    APISessionRecord.prototype.GetAPISession = function (key) {
        var value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        return value;
    };
    Object.defineProperty(APISessionRecord.prototype, "SystemCode", {
        get: function () {
            return this.GetAPISession("SystemCode");
        },
        set: function (value) {
            this.SetAPISession("SystemCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "SubSystemCode", {
        get: function () {
            return this.GetAPISession("SubSystemCode");
        },
        set: function (value) {
            this.SetAPISession("SubSystemCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "Modulecode", {
        get: function () {
            return this.GetAPISession("Modulecode");
        },
        set: function (value) {
            this.SetAPISession("Modulecode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "UserCode", {
        get: function () {
            return this.GetAPISession("UserCode");
        },
        set: function (value) {
            this.SetAPISession("UserCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "Token", {
        get: function () {
            return this.GetAPISession("Token");
        },
        set: function (value) {
            this.SetAPISession("Token", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "CompCode", {
        get: function () {
            return this.GetAPISession("CompCode");
        },
        set: function (value) {
            this.SetAPISession("CompCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "BranchCode", {
        get: function () {
            return this.GetAPISession("BranchCode");
        },
        set: function (value) {
            this.SetAPISession("BranchCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "CurrentYear", {
        get: function () {
            return this.GetAPISession("CurrentYear");
        },
        set: function (value) {
            this.SetAPISession("CurrentYear", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(APISessionRecord.prototype, "ScreenLanguage", {
        get: function () {
            return this.GetAPISession("ScreenLanguage");
        },
        set: function (value) {
            this.SetAPISession("ScreenLanguage", value);
        },
        enumerable: false,
        configurable: true
    });
    return APISessionRecord;
}());
var EntityContext = /** @class */ (function () {
    function EntityContext() {
    }
    return EntityContext;
}());
var ResponseResult = /** @class */ (function () {
    function ResponseResult() {
    }
    return ResponseResult;
}());
var BaseResponse = /** @class */ (function () {
    function BaseResponse() {
    }
    return BaseResponse;
}());
var MS_BoxBank = /** @class */ (function () {
    function MS_BoxBank() {
        this.BoxId = 0;
        this.BoxCode = "";
        this.DESCA = "";
        this.DESCE = "";
        this.AccountId = 0;
        this.StoreId = 0;
        this.KeeperName = "";
        this.BankResposableName = "";
        this.BankTel = "";
        this.BankMobile = "";
        this.BankFax = "";
        this.IsActive = false;
        this.IsBank = false;
        this.CheckPrintID = 0;
        this.ForAdjustOnly = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_BoxBank;
}());
var MS_Stores = /** @class */ (function () {
    function MS_Stores() {
        this.StoreId = 0;
        this.UserId = 0;
        this.UserGroupId = 0;
        this.StoreCode = "";
        this.StoreDescA = "";
        this.StoreDescE = "";
        this.StoreType = false;
        this.StorePosition = "";
        this.StoreKeeper = "";
        this.Tel = "";
        this.Fax = "";
        this.Remarks = "";
        this.PrintField1Font = "";
        this.PrintField2Font = "";
        this.PrintField3Font = "";
        this.PrintField4Font = "";
        this.PrintField5Font = "";
        this.PrintField1FontColor = "";
        this.PrintField2FontColor = "";
        this.PrintField3FontColor = "";
        this.PrintField4FontColor = "";
        this.PrintField5FontColor = "";
        this.PrintField1FontSize = 0;
        this.PrintField2FontSize = 0;
        this.PrintField3FontSize = 0;
        this.PrintField4FontSize = 0;
        this.PrintField5FontSize = 0;
        this.PrintField1FontStyle = 0;
        this.PrintField2FontStyle = 0;
        this.PrintField3FontStyle = 0;
        this.PrintField4FontStyle = 0;
        this.PrintField5FontStyle = 0;
        this.BoxId = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.CityID = 0;
        this.BranchLogo = "";
    }
    return MS_Stores;
}());
var MS_Partition = /** @class */ (function () {
    function MS_Partition() {
        this.StorePartId = 0;
        this.StoreId = 0;
        this.PartCode = "";
        this.PartDescA = "";
        this.PartDescE = "";
        this.Remarks = "";
        this.StoreKeeper = "";
        this.Tel = "";
        this.Address = "";
        this.Fax = "";
        this.strCustm2 = "";
        this.strCustm3 = "";
        this.strCustm4 = "";
        this.strCustm5 = "";
        this.strCustm6 = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
        this.CityID = 0;
        this.SharedPartition = 0;
        this.StatusFlag = "";
    }
    return MS_Partition;
}());
var ReportParameters = /** @class */ (function () {
    function ReportParameters() {
    }
    return ReportParameters;
}());
var G_BRANCH = /** @class */ (function (_super) {
    __extends(G_BRANCH, _super);
    function G_BRANCH() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.BRA_DESC = "";
        _this.BRA_TYPE = 0;
        _this.BRA_DESCL = "";
        _this.BRA_SHORTA = "";
        _this.BRA_SHORTL = "";
        _this.REGION_CODE = "";
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Email = "";
        _this.WebSite = "";
        _this.BranchManager = "";
        _this.HRResponsible = "";
        _this.FinanceResponsible = "";
        _this.SalesManager = "";
        _this.CUSTOM1 = "";
        _this.CUSTOM2 = "";
        _this.CUSTOM3 = "";
        _this.CUSTOM4 = "";
        _this.CUSTOM5 = "";
        _this.CUSTOMFLAG1 = false;
        _this.CUSTOMFLAG2 = false;
        _this.CUSTOMNUM1 = 0;
        _this.CUSTOMNUM2 = 0;
        _this.CUSTOMDATE = "";
        _this.BRA_DESCE = "";
        _this.GroupVatNo = "";
        _this.VndIDTypeCode = 0;
        _this.IDNo;
        _this.Address_Street = "";
        _this.Address_Str_Additional = "";
        _this.Address_BuildingNo = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_Postal = "";
        _this.Address_Province = "";
        _this.Address_District = "";
        _this.NationalityID = 0;
        _this.Currencyid = 0;
        return _this;
    }
    return G_BRANCH;
}(SecurityClass));
var G_LnkVarBranch = /** @class */ (function (_super) {
    __extends(G_LnkVarBranch, _super);
    function G_LnkVarBranch() {
        var _this = _super.call(this) || this;
        _this.CompCode = 0;
        _this.BraCode = 0;
        _this.Lnktype = "";
        _this.Ser = 0;
        _this.LnkCode = "";
        _this.GLAccountCode = "";
        _this.CC_Code = "";
        return _this;
    }
    return G_LnkVarBranch;
}(SecurityClass));
var GQ_GetLnkVarBranch = /** @class */ (function (_super) {
    __extends(GQ_GetLnkVarBranch, _super);
    function GQ_GetLnkVarBranch() {
        var _this = _super.call(this) || this;
        _this.CompCode = 0;
        _this.BraCode = 0;
        _this.Lnktype = "";
        _this.Ser = 0;
        _this.LnkCode = "";
        _this.GLAccountCode = "";
        _this.Acc_DescA = "";
        _this.Acc_DescE = "";
        _this.CC_Code = "";
        _this.GSt_DescA = "";
        _this.GSt_DescE = "";
        _this.GLAcc_DescA = "";
        _this.GLAcc_DescE = "";
        return _this;
    }
    return GQ_GetLnkVarBranch;
}(SecurityClass));
var IGetunitprice = /** @class */ (function () {
    function IGetunitprice() {
        this.unitprice = 0;
        this.unitpricewithvat = 0;
    }
    return IGetunitprice;
}());
var IQ_GetOperationSalesmanItem = /** @class */ (function (_super) {
    __extends(IQ_GetOperationSalesmanItem, _super);
    function IQ_GetOperationSalesmanItem() {
        var _this = _super.call(this) || this;
        _this.OperationSalesmanItemID = 0;
        _this.OperationSalesmanID = 0;
        _this.OperationItemID = 0;
        _this.OperationID = 0;
        _this.ItemID = 0;
        _this.ReceivedQty = 0;
        _this.SoldQty = 0;
        _this.ScrapQty = 0;
        _this.OnhandQty = 0;
        _this.ItemCode = "";
        _this.IT_DescA = "";
        _this.IT_DescE = "";
        _this.FamilyCode = "";
        _this.FamDescA = "";
        _this.Fam_DescE = "";
        _this.SalesmanId = 0;
        _this.Min_SalesPrice = 0;
        _this.Est_SalesPrice = 0;
        _this.Est_CostPrice = 0;
        _this.VatNatID = 0;
        _this.VatPrc = 0;
        return _this;
    }
    return IQ_GetOperationSalesmanItem;
}(SecurityClass));
var IQ_GetOperationSalesman = /** @class */ (function (_super) {
    __extends(IQ_GetOperationSalesman, _super);
    function IQ_GetOperationSalesman() {
        var _this = _super.call(this) || this;
        _this.OperationSalesmanID = 0;
        _this.OperationID = 0;
        _this.SalesmanId = 0;
        _this.Close_TotalSalesCash = 0;
        _this.Close_TotalSalesCashVAT = 0;
        _this.Close_TotalSalesCredit = 0;
        _this.Close_TotalSalesCreditVAT = 0;
        _this.Close_CashOnhand = 0;
        _this.Close_CashOnBank = 0;
        _this.Close_TotalSales = 0;
        _this.SalesmanCode = "";
        _this.NameA = "";
        _this.NameE = "";
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.TruckNo = "";
        _this.TrDate = "";
        _this.Status = 0;
        return _this;
    }
    return IQ_GetOperationSalesman;
}(SecurityClass));
var I_TR_OperationSalesman = /** @class */ (function (_super) {
    __extends(I_TR_OperationSalesman, _super);
    function I_TR_OperationSalesman() {
        var _this = _super.call(this) || this;
        _this.OperationSalesmanID = 0;
        _this.OperationID = 0;
        _this.SalesmanId = 0;
        _this.Close_TotalSalesCash = 0;
        _this.Close_TotalSalesCashVAT = 0;
        _this.Close_TotalSalesCredit = 0;
        _this.Close_TotalSalesCreditVAT = 0;
        _this.Close_CashOnhand = 0;
        _this.Close_CashOnBank = 0;
        _this.Close_TotalSales = 0;
        return _this;
    }
    return I_TR_OperationSalesman;
}(SecurityClass));
var I_TR_OperationSalesmanItem = /** @class */ (function (_super) {
    __extends(I_TR_OperationSalesmanItem, _super);
    function I_TR_OperationSalesmanItem() {
        var _this = _super.call(this) || this;
        _this.OperationSalesmanItemID = 0;
        _this.OperationSalesmanID = 0;
        _this.OperationItemID = 0;
        _this.OperationID = 0;
        _this.ItemID = 0;
        _this.ReceivedQty = 0;
        _this.SoldQty = 0;
        _this.ScrapQty = 0;
        _this.OnhandQty = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_TR_OperationSalesmanItem;
}(SecurityClass));
var I_TR_OperationTFDetail = /** @class */ (function (_super) {
    __extends(I_TR_OperationTFDetail, _super);
    function I_TR_OperationTFDetail() {
        var _this = _super.call(this) || this;
        _this.OperationTFDetailID = 0;
        _this.OperationTFID = 0;
        _this.OperationItemID = 0;
        _this.ItemID = 0;
        _this.SendQty = 0;
        _this.RecQty = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_TR_OperationTFDetail;
}(SecurityClass));
var I_VW_GetCompStatus = /** @class */ (function (_super) {
    __extends(I_VW_GetCompStatus, _super);
    function I_VW_GetCompStatus() {
        var _this = _super.call(this) || this;
        _this.CompCode = 0;
        _this.AddAble = false;
        _this.Editable = false;
        _this.CompStatus = 0;
        _this.LoginMsg;
        _this.LastDate = "";
        _this.FirstDate = "";
        _this.INV_STATUS = 0;
        _this.ACC_STATUS = 0;
        _this.ProfitAcc_Code = "";
        _this.OpenAccVoucheNo = 0;
        _this.OpenInvAdjNo = 0;
        return _this;
    }
    return I_VW_GetCompStatus;
}(SecurityClass));
var G_COMPANY = /** @class */ (function (_super) {
    __extends(G_COMPANY, _super);
    function G_COMPANY() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.NameA = "";
        _this.NameE = "";
        _this.Systems = "";
        _this.MOI_ID;
        _this.CRT_NO;
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Email = "";
        _this.WebSite = "";
        _this.GMName = "";
        _this.HRResponsible = "";
        _this.FinanceResponsible = "";
        _this.SalesManager = "";
        _this.CUSTOM1 = "";
        _this.CUSTOM2 = "";
        _this.CUSTOM3 = "";
        _this.CUSTOM4 = "";
        _this.CUSTOM5 = "";
        _this.CUSTOMFLAG1 = false;
        _this.CUSTOMFLAG2 = false;
        _this.CUSTOMNUM1 = 0;
        _this.CUSTOMNUM2 = 0;
        _this.CUSTOMDATE = "";
        _this.NameActive = "";
        _this.IsActive = false;
        _this.IsReadOnly = false;
        _this.LogoIcon = "";
        _this.BkImage1 = "";
        _this.BkImage2 = "";
        _this.GroupVatNo = "";
        _this.VATNO = "";
        _this.VndIDTypeCode = 0;
        _this.IDNo;
        _this.Address_Street = "";
        _this.Address_Str_Additional = "";
        _this.Address_BuildingNo = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_Postal = "";
        _this.Address_Province = "";
        _this.Address_District = "";
        _this.NationalityID = 0;
        _this.Currencyid = 0;
        return _this;
    }
    return G_COMPANY;
}(SecurityClass));
var G_MODULES = /** @class */ (function (_super) {
    __extends(G_MODULES, _super);
    function G_MODULES() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.MENU_NO = "";
        _this.MENU_NAME = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM1_DESC = "";
        _this.CUSTOM2_DESC = "";
        _this.CUSTOM3_DESC = "";
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM4_DESC = "";
        _this.CUSTOM5_DESC = "";
        _this.CUSTOM6_DESC = "";
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.CUSTOM7_DESC = "";
        _this.CUSTOM8_DESC = "";
        _this.CUSTOM9_DESC = "";
        _this.AVAILABLE = false;
        _this.MODULE_TYPE;
        _this.Images_Enabled = false;
        _this.SYSTEM_CODE_Desc = "";
        _this.SUB_SYSTEM_CODE_Desc = "";
        return _this;
    }
    return G_MODULES;
}(SecurityClass));
var G_Nationality = /** @class */ (function (_super) {
    __extends(G_Nationality, _super);
    function G_Nationality() {
        var _this = _super.call(this) || this;
        _this.NationalityID = 0;
        _this.NationalityCode = "";
        _this.DescA = "";
        _this.DescL = "";
        _this.Remarks = "";
        _this.StatusFlag = "";
        return _this;
    }
    return G_Nationality;
}(SecurityClass));
var A_RecPay_D_CashBox = /** @class */ (function (_super) {
    __extends(A_RecPay_D_CashBox, _super);
    function A_RecPay_D_CashBox() {
        var _this = _super.call(this) || this;
        _this.CashBoxID = 0;
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CashBox_DescA = "";
        _this.CashBox_DescE = "";
        _this.IsActive = false;
        _this.AccountCode = "";
        _this.CardAccountCode = "";
        _this.User_Code = "";
        _this.StatusFlag = "";
        _this.IsRecPayAccount = false;
        return _this;
    }
    return A_RecPay_D_CashBox;
}(SecurityClass));
var AVAT_D_SrvCategory = /** @class */ (function (_super) {
    __extends(AVAT_D_SrvCategory, _super);
    function AVAT_D_SrvCategory() {
        var _this = _super.call(this) || this;
        _this.SrvCategoryID = 0;
        _this.COMP_CODE = 0;
        _this.CAT_CODE = "";
        _this.DescA = "";
        _this.DescE = "";
        _this.SALES_ACC_CODE = "";
        _this.RETURN_ACC_CODE = "";
        _this.DISC_ACC_CODE = "";
        _this.ACTUAL_DATE = "";
        _this.Nature = 0;
        _this.IsPurchase = false;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.VatNatID = 0;
        _this.ItemFormatFix = "";
        _this.ItemFormatSerial = "";
        return _this;
    }
    return AVAT_D_SrvCategory;
}(SecurityClass));
var AQVAT_GetSrvCategory = /** @class */ (function (_super) {
    __extends(AQVAT_GetSrvCategory, _super);
    function AQVAT_GetSrvCategory() {
        var _this = _super.call(this) || this;
        _this.DescA = "";
        _this.ItemFormatFix = "";
        _this.ItemFormatSerial = "";
        _this.IsPurchase = false;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.VatNatID = 0;
        _this.SrvCategoryID = 0;
        _this.COMP_CODE = 0;
        _this.CAT_CODE = "";
        _this.DescE = "";
        _this.SALES_ACC_CODE = "";
        _this.RETURN_ACC_CODE = "";
        _this.DISC_ACC_CODE = "";
        _this.ACTUAL_DATE = "";
        _this.Nature = 0;
        _this.VatNatureCode = "";
        _this.VatNatureDescA = "";
        _this.VatNatureDescE = "";
        _this.VatPrc = 0;
        _this.sls_Acc_DescA = "";
        _this.sls_Acc_DescE = "";
        _this.Ret_Acc_DescA = "";
        _this.Ret_Acc_DescE = "";
        _this.Dis_Acc_DescA = "";
        _this.Dis_Acc_DescE = "";
        return _this;
    }
    return AQVAT_GetSrvCategory;
}(SecurityClass));
var GQ_GetStore = /** @class */ (function (_super) {
    __extends(GQ_GetStore, _super);
    function GQ_GetStore() {
        var _this = _super.call(this) || this;
        _this.StoreId = 0;
        _this.BranchId = 0;
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.STORE_CODE = 0;
        _this.DescA = "";
        _this.DescL = "";
        _this.IsActive = false;
        _this.NameIsActive = '';
        _this.StockAccCode = "";
        _this.Tel1 = "";
        _this.Tel2 = "";
        _this.Fax = "";
        _this.Address = "";
        _this.STORE_TYPE = 0;
        _this.TYPE_CODE = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.BRA_DESC = "";
        _this.BRA_DESCL = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.StatusFlag = "";
        return _this;
    }
    return GQ_GetStore;
}(SecurityClass));
var IQ_GetSalesMan = /** @class */ (function (_super) {
    __extends(IQ_GetSalesMan, _super);
    function IQ_GetSalesMan() {
        var _this = _super.call(this) || this;
        _this.SalesmanId = 0;
        _this.CompCode = 0;
        _this.BraCode = 0;
        _this.SalesmanCode = "";
        _this.NameA = "";
        _this.NameE = "";
        _this.ShortNameA = "";
        _this.ShortNameE = "";
        _this.ADDRESS = "";
        _this.IDNo = "";
        _this.MOBILE = "";
        _this.EMAIL = "";
        _this.Isactive = false;
        _this.REMARKS = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.GLAccCode = "";
        _this.IsSalesEnable = false;
        _this.IsPurchaseEnable = false;
        _this.ISOperationEnable = false;
        _this.PurchaseLimit = 0;
        _this.SalesCreditLimit = 0;
        _this.NationalityID = 0;
        _this.NationalityCode = "";
        _this.Nat_DescA = "";
        _this.Nat_DescE = "";
        _this.CC_Code = "";
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        _this.text_IsSalesEnable = "";
        _this.text_IsPurchaseEnable = "";
        _this.text_ISOperationEnable = "";
        return _this;
    }
    return IQ_GetSalesMan;
}(SecurityClass));
var I_Sls_D_Salesman = /** @class */ (function (_super) {
    __extends(I_Sls_D_Salesman, _super);
    function I_Sls_D_Salesman() {
        var _this = _super.call(this) || this;
        _this.SalesmanId = 0;
        _this.CompCode = 0;
        _this.BraCode = 0;
        _this.SalesmanCode = "";
        _this.NameA = "";
        _this.NameE = "";
        _this.ShortNameA = "";
        _this.ShortNameE = "";
        _this.ADDRESS = "";
        _this.IDNo = "";
        _this.MOBILE = "";
        _this.EMAIL = "";
        _this.Isactive = false;
        _this.REMARKS = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.GLAccCode = "";
        _this.IsSalesEnable = false;
        _this.IsPurchaseEnable = false;
        _this.ISOperationEnable = false;
        _this.PurchaseLimit = 0;
        _this.SalesCreditLimit = 0;
        _this.NationalityID = 0;
        _this.CC_Code = "";
        return _this;
    }
    return I_Sls_D_Salesman;
}(SecurityClass));
var A_D_VAT_TYPE = /** @class */ (function (_super) {
    __extends(A_D_VAT_TYPE, _super);
    function A_D_VAT_TYPE() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.TYPE = 0;
        _this.CODE = 0;
        _this.DESCRIPTION = "";
        _this.VatType = 0;
        _this.VatPerc = 0;
        _this.LineOrder = 0;
        return _this;
    }
    return A_D_VAT_TYPE;
}(SecurityClass));
var I_D_Category = /** @class */ (function (_super) {
    __extends(I_D_Category, _super);
    function I_D_Category() {
        var _this = _super.call(this) || this;
        _this.CatID = 0;
        _this.CompCode = 0;
        _this.CatCode = "";
        _this.DescA = "";
        _this.DescL = "";
        _this.ParentCatId = 0;
        _this.CatLevel = 0;
        _this.IsDetail = false;
        _this.UnitGrpID = 0;
        _this.IsAutoGenerateItem = false;
        _this.ItemFormatFix = "";
        _this.ItemFormatSerial = "";
        _this.ItemTypeID = 0;
        _this.CostMethodID = 0;
        _this.StockMethodID = 0;
        _this.IssueFromCenteralStore = false;
        _this.CenteralStoreCode = 0;
        _this.IsAdditionalSpecs = false;
        _this.AdditionalspcsDescA = "";
        _this.AdditionalspcsDescL = "";
        _this.ISSales = false;
        _this.IsStock = false;
        _this.IsProduct = false;
        _this.IsIssuetoCC = false;
        _this.IsIssueToProd = false;
        _this.IsPurchase = false;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.VatNatID = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_D_Category;
}(SecurityClass));
var A_RecPay_D_Category = /** @class */ (function (_super) {
    __extends(A_RecPay_D_Category, _super);
    function A_RecPay_D_Category() {
        var _this = _super.call(this) || this;
        _this.CatID = 0;
        _this.AccountType = 0;
        _this.CatCode = "";
        _this.Cat_DescA = "";
        _this.Cat_DescE = "";
        _this.REMARKS = "";
        _this.AccountCode = "";
        _this.CompCode = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_RecPay_D_Category;
}(SecurityClass));
var A_RecPay_D_Group = /** @class */ (function (_super) {
    __extends(A_RecPay_D_Group, _super);
    function A_RecPay_D_Group() {
        var _this = _super.call(this) || this;
        _this.GroupID = 0;
        _this.AccountType = 0;
        _this.CompCode = 0;
        _this.GroupCode = "";
        _this.Group_DescA = "";
        _this.Group_DescE = "";
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_RecPay_D_Group;
}(SecurityClass));
var I_Item = /** @class */ (function (_super) {
    __extends(I_Item, _super);
    function I_Item() {
        var _this = _super.call(this) || this;
        _this.ItemID = 0;
        _this.ItemCode = "";
        _this.CompCode = 0;
        _this.DescA = "";
        _this.DescL = "";
        _this.TechDescA = "";
        _this.TechDescL = "";
        _this.UnitGrpID = 0;
        _this.UomID = 0;
        _this.ItemFamilyID = 0;
        _this.RefItemCode = "";
        _this.OldItemCode = "";
        _this.VndItemCode = "";
        _this.BarCode1 = "";
        _this.BarCode2 = "";
        _this.FirstEntryDate = "";
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.LastBarCodeSeq = 0;
        _this.BarCodePrefix = "";
        _this.StatusFlag = "";
        _this.OnhandQty = 0;
        return _this;
    }
    return I_Item;
}(SecurityClass));
var G_LnkTransVoucher = /** @class */ (function (_super) {
    __extends(G_LnkTransVoucher, _super);
    function G_LnkTransVoucher() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.TR_CODE = "";
        _this.SERIAL = 0;
        _this.VarCode = "";
        _this.ISDebit = false;
        _this.AccType = 0;
        _this.AccFixedCode = "";
        _this.AccVarCode = "";
        _this.AccBraCode = "";
        _this.CCType = 0;
        _this.CCFixedCode = "";
        _this.CCVarCode = "";
        _this.CCBraCode = "";
        _this.IsCollective = false;
        _this.LineRemarkA = '';
        _this.LineRemarkE = '';
        _this.StatusFlag = '';
        _this.serial_num = '';
        return _this;
    }
    return G_LnkTransVoucher;
}(SecurityClass));
var I_ItemYear = /** @class */ (function () {
    function I_ItemYear() {
        this.ItemYearID = 0;
        this.ItemID = 0;
        this.FinYear = 0;
        this.MinUnitPrice = 0;
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.UnitWholePrice = 0;
        this.MinUnitWholePrice = 0;
        this.StatusFlag = "";
    }
    return I_ItemYear;
}());
var I_D_UOM = /** @class */ (function (_super) {
    __extends(I_D_UOM, _super);
    function I_D_UOM() {
        var _this = _super.call(this) || this;
        _this.UomID = 0;
        _this.UomCode = "";
        _this.DescA = "";
        _this.DescE = "";
        _this.CompCode = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.StatusFlag = "";
        return _this;
    }
    return I_D_UOM;
}(SecurityClass));
var Tax_Type = /** @class */ (function () {
    function Tax_Type() {
        this.Nature = 0;
        this.Prc = 0;
        this.VatType = 0;
    }
    return Tax_Type;
}());
var I_ItemFamily = /** @class */ (function (_super) {
    __extends(I_ItemFamily, _super);
    function I_ItemFamily() {
        var _this = _super.call(this) || this;
        _this.ItemFamilyID = 0;
        _this.FamilyCode = "";
        _this.CompCode = 0;
        _this.DescA = "";
        _this.DescL = "";
        _this.TechDescA = "";
        _this.TechDescL = "";
        _this.CatID = 0;
        _this.ItemTypeID = 0;
        _this.RefItemCode = "";
        _this.BarCode1 = "";
        _this.FirstEntryDate = "";
        _this.UnitPrice = 0;
        _this.StarGlobalCost = 0;
        _this.GlobalCost = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.LastBarCodeSeq = 0;
        _this.BarCodePrefix = "";
        _this.StatusFlag = "";
        return _this;
    }
    return I_ItemFamily;
}(SecurityClass));
var G_STORE = /** @class */ (function (_super) {
    __extends(G_STORE, _super);
    function G_STORE() {
        var _this = _super.call(this) || this;
        _this.StoreId = 0;
        _this.BranchId = 0;
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.STORE_CODE = 0;
        _this.DescA = "";
        _this.DescL = "";
        _this.IsActive = false;
        _this.StockAccCode = "";
        _this.Tel1 = "";
        _this.Tel2 = "";
        _this.Fax = "";
        _this.Address = "";
        _this.STORE_TYPE = 0;
        _this.TYPE_CODE = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        return _this;
    }
    return G_STORE;
}(SecurityClass));
var IQ_GetItemStoreInfo_New = /** @class */ (function () {
    function IQ_GetItemStoreInfo_New() {
        this.ItemID = 0;
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.ItemFamilyID = 0;
        this.StoreId = 0;
        this.UnitPrice = 0;
        this.MinUnitPrice = 0;
        this.OnhandQty = 0;
        this.UomID = 0;
    }
    return IQ_GetItemStoreInfo_New;
}());
var IQ_GetItemStoreInfo = /** @class */ (function () {
    function IQ_GetItemStoreInfo() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.UomID = 0;
        this.ItemFamilyID = 0;
        this.CompCode = 0;
        this.RefItemCode = "";
        this.FirstEntryDate = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
        this.StoreCode = 0;
        this.BraCode = 0;
        this.LOCATION = "";
        this.OnhandQty = 0;
        this.MinQty = 0;
        this.MaxQty = 0;
        this.StartQty = 0;
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.FamilyCode = "";
        this.Family_DescA = "";
        this.Family_DescE = "";
        this.StoreId = 0;
        this.CatID = 0;
        this.FinYear = 0;
        this.MinUnitPrice = 0;
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.UnitWholePrice = 0;
        this.MinUnitWholePrice = 0;
        this.ItemYearID = 0;
        this.ItemStoreID = 0;
        this.VatPrc = 0;
        this.VatNatID = 0;
        this.Cat_Desc = '';
    }
    return IQ_GetItemStoreInfo;
}());
var I_ItemStore = /** @class */ (function () {
    function I_ItemStore() {
        this.ItemStoreID = 0;
        this.ItemID = 0;
        this.FinYear = 0;
        this.StoreCode = 0;
        this.BraCode = 0;
        this.CompCode = 0;
        this.LOCATION = "";
        this.LOCATION2 = "";
        this.OnhandQty = 0;
        this.BookQty = 0;
        this.OnRoadQty = 0;
        this.OnOrderQty = 0;
        this.ReOrderQty = 0;
        this.MinQty = 0;
        this.MaxQty = 0;
        this.StartQty = 0;
        this.StartLocalCost = 0;
        this.LocalCost = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StoreId = 0;
    }
    return I_ItemStore;
}());
//class G_SearchForm extends SecurityClass {
//    constructor() {
//        super();
//        this.SearchFormCode = "";
//        this.ReturnDataPropertyName = "";
//        this.Description = "";
//        this.SerachFormTitle = "";
//        this.IsFullScreen = false;
//        this.Left = 0;
//        this.Top = 0;
//        this.Height = 0;
//        this.Width = 0;
//        this.PageSize = 0;
//        this.DataSourceName = "";
//        this.SearchInterval = 0;
//        this.SerachFormTitleA = "";
//    }
//    public SearchFormCode: string;
//    public ReturnDataPropertyName: string;
//    public Description: string;
//    public SerachFormTitle: string;
//    public IsFullScreen: boolean;
//    public Left: number;
//    public Top: number;
//    public Height: number;
//    public Width: number;
//    public PageSize: number;
//    public DataSourceName: string;
//    public SearchInterval: number;
//    public SerachFormTitleA: string;
//}
//class G_SearchFormModule extends SecurityClass {
//    constructor() {
//        super();
//        this.SystemCode = "";
//        this.SubSystemCode = "";
//        this.ModuleCode = "";
//        this.ControlCode = "";
//        this.SearchFormCode = "";
//    }
//    public SystemCode: string;
//    public SubSystemCode: string;
//    public ModuleCode: string;
//    public ControlCode: string;
//    public SearchFormCode: string;
//}
//class G_SearchFormSetting extends SecurityClass {
//    constructor() {
//        super();
//        this.SearchFormSettingID = 0;
//        this.SearchFormCode = "";
//        this.FieldSequence = 0;
//        this.DataMember = "";
//        this.AlternateDataMember = "";
//        this.FieldTitle = "";
//        this.IsReadOnly = false;
//        this.Datatype = 0;
//        this.FieldWidth = 0;
//        this.UseSelectionOperator = false;
//        this.Language = 0;
//        this.FieldTitleA = "";
//    }
//    public SearchFormSettingID: number;
//    public SearchFormCode: string;
//    public FieldSequence: number;
//    public DataMember: string;
//    public AlternateDataMember: string;
//    public FieldTitle: string;
//    public IsReadOnly: boolean;
//    public Datatype: number;
//    public FieldWidth: number;
//    public UseSelectionOperator: boolean;
//    public Language: number;
//    public FieldTitleA: string;
//}
var G_STANDARD = /** @class */ (function (_super) {
    __extends(G_STANDARD, _super);
    function G_STANDARD() {
        var _this = _super.call(this) || this;
        _this.BACKUP_PATH = "";
        _this.BACKUP_DB = "";
        _this.BACKUP_COPIES = 0;
        return _this;
    }
    return G_STANDARD;
}(SecurityClass));
var G_SUB_SYSTEMS = /** @class */ (function (_super) {
    __extends(G_SUB_SYSTEMS, _super);
    function G_SUB_SYSTEMS() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.SUB_SYSTEM_DESCA = "";
        _this.SUB_SYSTEM_DESCE = "";
        _this.ICON_PATH = "";
        _this.APPNAME = "";
        _this.APPVERSION = "";
        return _this;
    }
    return G_SUB_SYSTEMS;
}(SecurityClass));
var G_SYSTEM = /** @class */ (function (_super) {
    __extends(G_SYSTEM, _super);
    function G_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SYSTEM_DESCE = "";
        _this.SYSTEM_DESCA = "";
        _this.DB_NAME = "";
        _this.ICON_PATH = "";
        _this.INIT_ORDER = 0;
        _this.VER_PATH = "";
        return _this;
    }
    return G_SYSTEM;
}(SecurityClass));
var G_USER_BRANCH = /** @class */ (function (_super) {
    __extends(G_USER_BRANCH, _super);
    function G_USER_BRANCH() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.StatusFlag = "";
        return _this;
    }
    return G_USER_BRANCH;
}(SecurityClass));
var G_USER_COMPANY = /** @class */ (function (_super) {
    __extends(G_USER_COMPANY, _super);
    function G_USER_COMPANY() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.COMP_CODE = 0;
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        return _this;
    }
    return G_USER_COMPANY;
}(SecurityClass));
var G_USER_LOG = /** @class */ (function (_super) {
    __extends(G_USER_LOG, _super);
    function G_USER_LOG() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE;
        _this.SYSTEM_YEAR = 0;
        _this.MODULE_CODE = "";
        _this.COMP_CODE = 0;
        _this.LOG_DATE = "";
        return _this;
    }
    return G_USER_LOG;
}(SecurityClass));
var G_USER_MODULE = /** @class */ (function (_super) {
    __extends(G_USER_MODULE, _super);
    function G_USER_MODULE() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.ViewImages = false;
        _this.EditImages = false;
        return _this;
    }
    return G_USER_MODULE;
}(SecurityClass));
var G_USER_SUB_SYSTEM = /** @class */ (function (_super) {
    __extends(G_USER_SUB_SYSTEM, _super);
    function G_USER_SUB_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.EXECUTE = false;
        _this.FILTER_STRING = "";
        return _this;
    }
    return G_USER_SUB_SYSTEM;
}(SecurityClass));
var G_USER_SYSTEM = /** @class */ (function (_super) {
    __extends(G_USER_SYSTEM, _super);
    function G_USER_SYSTEM() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.EXECUTE = false;
        _this.FILTER_STRING = "";
        return _this;
    }
    return G_USER_SYSTEM;
}(SecurityClass));
var I_Control = /** @class */ (function () {
    function I_Control() {
        this.CompCode = 0;
        this.DefSlsVatType = 0;
        this.DefPurVatType = 0;
        this.IsVat = false;
        this.MobileLength = 0;
        this.IDLength = 0;
        this.SendSMS = false;
        this.SendPublicSMS = false;
        this.NotePeriodinSec = 0;
        this.DashBoardPeriodinSec = 0;
        this.MaxYearlyMSGs = 0;
        this.UsedMSGs = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.SaudiNationID = 0;
        this.WebCustomerWebsite = false;
        this.MembeshiptStartDate = "";
        this.MembeshipEndDate = "";
        this.MembershipAllanceDays = 0;
        this.MembershipreadOnlyDays = 0;
        this.IsFreePurchaseReturn = false;
        this.IsFreeSalesReturn = false;
        this.ExceedMinPricePassword = "";
        this.GL_VoucherCCType = 0;
        this.Gl_JournalOpenType = 0;
        this.GL_JournalMonthlyNo = false;
        this.GL_JournalMonthlyNoWidth = 0;
        this.GL_JournalSaveUnbalanced = false;
        this.IsLocalBranchCustomer = false;
        this.SysTimeOut = 0;
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GL_VoucherCCDT_Type = 0;
        this.InvoiceWithoutCust = false;
        this.IvoiceDateEditable = false;
        this.InvoiceLineDiscount = false;
        this.InvoiceLineAllowance = false;
        this.InvoiceTotalAllowance = false;
        this.InvoiceTotalCharge = false;
        this.OperationPriceWithVAT = false;
        this.SalesPriceWithVAT = false;
    }
    return I_Control;
}());
var G_VatNature = /** @class */ (function (_super) {
    __extends(G_VatNature, _super);
    function G_VatNature() {
        var _this = _super.call(this) || this;
        _this.VatNatID = 0;
        _this.VatNatureCode = "";
        _this.VatNatureDescA = "";
        _this.VatNatureDescE = "";
        _this.VatPrc = 0;
        return _this;
    }
    return G_VatNature;
}(SecurityClass));
var A_TmpVoucherProcess = /** @class */ (function (_super) {
    __extends(A_TmpVoucherProcess, _super);
    function A_TmpVoucherProcess() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.CurrentUserCode = "";
        _this.Selected = false;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_DATE = "";
        _this.VOUCHER_DESC = "";
        _this.VOUCHER_STATUS = 0;
        _this.TYPE_CODE = 0;
        _this.REF_CODE = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.POSTED_BY = "";
        _this.POSTED_AT = "";
        _this.SOURCE_TYPE = 0;
        _this.VOUCHER_DATEH = "";
        _this.AUTHORISED_BY = "";
        _this.AUTHORISED_AT = "";
        _this.TYPE_DESCA = "";
        _this.TYPE_DESCE = "";
        _this.St_DescE = "";
        _this.St_DescA = "";
        _this.Src_DescE = "";
        _this.Src_DescA = "";
        _this.OpCode = 0;
        return _this;
    }
    return A_TmpVoucherProcess;
}(SecurityClass));
var G_AlertLog = /** @class */ (function (_super) {
    __extends(G_AlertLog, _super);
    function G_AlertLog() {
        var _this = _super.call(this) || this;
        _this.AlertID = 0;
        _this.AlertTypeID = 0;
        _this.AlertSubTypeID = 0;
        _this.MemberID = 0;
        _this.MsgType = 0;
        _this.MsgDate = "";
        _this.MsgHeader = "";
        _this.MsgBody = "";
        _this.IsSent = false;
        _this.SendDate = "";
        _this.MobileNo = "";
        _this.Email = "";
        _this.SystemCode = "";
        _this.CompCode = 0;
        _this.TrID = 0;
        _this.AlertType = "";
        return _this;
    }
    return G_AlertLog;
}(SecurityClass));
var G_AlertControl = /** @class */ (function (_super) {
    __extends(G_AlertControl, _super);
    function G_AlertControl() {
        var _this = _super.call(this) || this;
        _this.Compcode = 0;
        _this.SystemCode = "";
        _this.EMAIL_SSL = false;
        _this.EMAIL_Authentication = false;
        _this.EMAIL_SenderName = "";
        _this.EMAIL_Sender = "";
        _this.EMAIL_SenderPassword = "";
        _this.EMAIL_SendorPort = 0;
        _this.EMAIL_SenderSMTP = "";
        _this.SMS_UserName = "";
        _this.SMS_SenderName = "";
        _this.SMS_Password = "";
        _this.MobileNoPreFex = "";
        _this.EmailMaxDaily = 0;
        _this.DefPurVatType = 0;
        _this.SMS_Provider = "";
        return _this;
    }
    return G_AlertControl;
}(SecurityClass));
var G_ModuleHelp = /** @class */ (function (_super) {
    __extends(G_ModuleHelp, _super);
    function G_ModuleHelp() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.HelpBody_Ar = "";
        _this.HelpBody_En = "";
        return _this;
    }
    return G_ModuleHelp;
}(SecurityClass));
var GQ_GetUserModule = /** @class */ (function (_super) {
    __extends(GQ_GetUserModule, _super);
    function GQ_GetUserModule() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        _this.VIEW = false;
        _this.CUSTOM1 = false;
        _this.CUSTOM2 = false;
        _this.CUSTOM3 = false;
        _this.CUSTOM4 = false;
        _this.CUSTOM5 = false;
        _this.CUSTOM6 = false;
        _this.CUSTOM7 = false;
        _this.CUSTOM8 = false;
        _this.CUSTOM9 = false;
        _this.ViewImages = false;
        _this.EditImages = false;
        _this.MENU_NO = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.M_CREATE = false;
        _this.M_EDIT = false;
        _this.M_DELETE = false;
        _this.M_VIEW = false;
        _this.M_PRINT = false;
        _this.M_CUSTOM1 = false;
        _this.M_CUSTOM2 = false;
        _this.M_CUSTOM3 = false;
        _this.M_CUSTOM4 = false;
        _this.M_CUSTOM5 = false;
        _this.M_CUSTOM6 = false;
        _this.M_CUSTOM7 = false;
        _this.M_CUSTOM8 = false;
        _this.M_CUSTOM9 = false;
        _this.CUSTOM1_DESC = "";
        _this.CUSTOM2_DESC = "";
        _this.CUSTOM3_DESC = "";
        _this.CUSTOM4_DESC = "";
        _this.CUSTOM5_DESC = "";
        _this.CUSTOM6_DESC = "";
        _this.CUSTOM7_DESC = "";
        _this.CUSTOM8_DESC = "";
        _this.CUSTOM9_DESC = "";
        _this.AVAILABLE = false;
        _this.M_images_enabled = false;
        return _this;
    }
    return GQ_GetUserModule;
}(SecurityClass));
var G_Noteifications = /** @class */ (function (_super) {
    __extends(G_Noteifications, _super);
    function G_Noteifications() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.Remarks = "";
        _this.ISActive = false;
        _this.ActiveIcon = "";
        _this.InActiveIcon = "";
        _this.PageName = "";
        _this.DisplayOrder = 0;
        return _this;
    }
    return G_Noteifications;
}(SecurityClass));
var G_NotificationCompany = /** @class */ (function (_super) {
    __extends(G_NotificationCompany, _super);
    function G_NotificationCompany() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.MODULE_CODE = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.ISActive = false;
        _this.NoteCount = 0;
        return _this;
    }
    return G_NotificationCompany;
}(SecurityClass));
var NoteificationsModel = /** @class */ (function (_super) {
    __extends(NoteificationsModel, _super);
    function NoteificationsModel() {
        var _this = _super.call(this) || this;
        _this.MODULE_CODE = "";
        _this.MODULE_DESCE = "";
        _this.MODULE_DESCA = "";
        _this.NoteCount = 0;
        return _this;
    }
    return NoteificationsModel;
}(SecurityClass));
var A_RecPay_D_AjustmentType = /** @class */ (function (_super) {
    __extends(A_RecPay_D_AjustmentType, _super);
    function A_RecPay_D_AjustmentType() {
        var _this = _super.call(this) || this;
        _this.AdustmentTypeID = 0;
        _this.AdjCode = 0;
        _this.Adj_DescA = "";
        _this.Adj_DescE = "";
        _this.VatType = 0;
        _this.AccountCode = "";
        _this.IsDebit = false;
        _this.IsCustomer = false;
        _this.CompCode = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return A_RecPay_D_AjustmentType;
}(SecurityClass));
var A_ACCOUNT = /** @class */ (function (_super) {
    __extends(A_ACCOUNT, _super);
    function A_ACCOUNT() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.ACC_CODE = "";
        _this.OPGLExpenseAcc = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.ACC_GROUP = 0;
        _this.ACC_TYPE = 0;
        _this.ACC_LEVEL = 0;
        _this.ACC_ACTIVE = false;
        _this.PARENT_ACC = "";
        _this.DETAIL = false;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.LAST_UPDATE = "";
        _this.CCDT_TYPE = "";
        _this.CUR_CODE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_ACCOUNT;
}(SecurityClass));
var G_LnkVar = /** @class */ (function (_super) {
    __extends(G_LnkVar, _super);
    function G_LnkVar() {
        var _this = _super.call(this) || this;
        _this.Lnktype = "";
        _this.Ser = 0;
        _this.LnkCode = "";
        _this.Acc_DescA = "";
        _this.Acc_DescE = "";
        return _this;
    }
    return G_LnkVar;
}(SecurityClass));
var A_ACCOUNT_YEAR = /** @class */ (function (_super) {
    __extends(A_ACCOUNT_YEAR, _super);
    function A_ACCOUNT_YEAR() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.ACC_CODE = "";
        _this.FIN_YEAR = 0;
        _this.OPENING_BALANCE = 0;
        _this.CREDIT = 0;
        _this.DEBIT = 0;
        _this.ACC_LIMIT = 0;
        _this.REMARKS = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_ACCOUNT_YEAR;
}(SecurityClass));
var AQ_GetAccount = /** @class */ (function (_super) {
    __extends(AQ_GetAccount, _super);
    function AQ_GetAccount() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.ACC_CODE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.ACC_GROUP = 0;
        _this.ACC_TYPE = 0;
        _this.ACC_LEVEL = 0;
        _this.ACC_ACTIVE = false;
        _this.PARENT_ACC = "";
        _this.DETAIL = false;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.LAST_UPDATE = "";
        _this.CCDT_TYPE = "";
        _this.CUR_CODE = "";
        _this.FIN_YEAR = 0;
        _this.OPENING_BALANCE = 0;
        _this.CREDIT = 0;
        _this.DEBIT = 0;
        _this.ACC_LIMIT = 0;
        _this.REMARKS = "";
        return _this;
    }
    return AQ_GetAccount;
}(SecurityClass));
var A_RecPay_D_Accounts = /** @class */ (function (_super) {
    __extends(A_RecPay_D_Accounts, _super);
    function A_RecPay_D_Accounts() {
        var _this = _super.call(this) || this;
        _this.ExpenseID = 0;
        _this.TrType = 0;
        _this.ExpCode = 0;
        _this.ExpDescA = "";
        _this.ExpDescE = "";
        _this.ExpAccountCode = "";
        _this.CompCode = 0;
        _this.IsActive = false;
        _this.StatusFlag = "";
        return _this;
    }
    return A_RecPay_D_Accounts;
}(SecurityClass));
var A_RecPay_Tr_ReceiptNote = /** @class */ (function (_super) {
    __extends(A_RecPay_Tr_ReceiptNote, _super);
    function A_RecPay_Tr_ReceiptNote() {
        var _this = _super.call(this) || this;
        _this.ReceiptID = 0;
        _this.CashBoxID = 0;
        _this.TrType = 0;
        _this.RecPayTypeId = 0;
        _this.TrNo = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.CustomerID = 0;
        _this.VendorID = 0;
        _this.FromCashBoxID = 0;
        _this.ExpenseID = 0;
        _this.Amount = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankAccountCode = "";
        _this.ReceiptDescA = "";
        _this.ReceiptDescE = "";
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CheckNo = "";
        _this.TransferNo = "";
        _this.BankName = "";
        _this.BankAcc_Code = "";
        _this.IsDeffered = false;
        _this.DueDate = "";
        _this.CashType = 0;
        return _this;
    }
    return A_RecPay_Tr_ReceiptNote;
}(SecurityClass));
var GQ_GetUserBarnchAccess = /** @class */ (function (_super) {
    __extends(GQ_GetUserBarnchAccess, _super);
    function GQ_GetUserBarnchAccess() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.BRA_DESCL = "";
        _this.BRA_DESCE = "";
        _this.BRA_DESC = "";
        _this.EXECUTE = false;
        _this.CREATE = false;
        _this.EDIT = false;
        _this.DELETE = false;
        _this.PRINT = false;
        return _this;
    }
    return GQ_GetUserBarnchAccess;
}(SecurityClass));
var IQ_GetBoxAdjustmentList = /** @class */ (function (_super) {
    __extends(IQ_GetBoxAdjustmentList, _super);
    function IQ_GetBoxAdjustmentList() {
        var _this = _super.call(this) || this;
        _this.AdjustmentID = 0;
        _this.AdustmentTypeID = 0;
        _this.IsDebit = false;
        _this.IsCustomer = false;
        _this.VendorId = 0;
        _this.CustomerId = 0;
        _this.TrNo;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.Amount = 0;
        _this.VatAmount = 0;
        _this.NetAfterVAT = 0;
        _this.AdjustDescA = "";
        _this.AdjustDescE = "";
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CustomerCODE = "";
        _this.cus_NameA = "";
        _this.Cus_NameE = "";
        _this.VendorCode = "";
        _this.Vnd_NameA = "";
        _this.Vnd_NameE = "";
        _this.AdjCode = 0;
        _this.Adj_DescA = "";
        _this.Adj_DescE = "";
        _this.DESCRIPTION = "";
        _this.VatPerc = 0;
        _this.VatType = 0;
        _this.InvoiceID = 0;
        _this.InvTotalAmount = 0;
        _this.InvVatAmount = 0;
        _this.InvDiscountAmount = 0;
        _this.InvDiscountPrc = 0;
        _this.InvNetAfterVat = 0;
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.Status_New = "";
        _this.IsDebitNew = "";
        _this.TrTime = "";
        _this.CRDBReasoncode = 0;
        _this.CryptographicStamp;
        _this.PrevInvoiceHash;
        return _this;
    }
    return IQ_GetBoxAdjustmentList;
}(SecurityClass));
var A_RecPay_Tr_Adjustment = /** @class */ (function (_super) {
    __extends(A_RecPay_Tr_Adjustment, _super);
    function A_RecPay_Tr_Adjustment() {
        var _this = _super.call(this) || this;
        _this.AdjustmentID = 0;
        _this.AdustmentTypeID = 0;
        _this.IsDebit = false;
        _this.IsCustomer = false;
        _this.VendorId = 0;
        _this.CustomerId = 0;
        _this.TrNo;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.Amount = 0;
        _this.VatType = 0;
        _this.VatAmount = 0;
        _this.NetAfterVAT = 0;
        _this.AdjustDescA = "";
        _this.AdjustDescE = "";
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.InvoiceID = 0;
        _this.InvTotalAmount = 0;
        _this.InvVatAmount = 0;
        _this.InvDiscountAmount = 0;
        _this.InvDiscountPrc = 0;
        _this.InvNetAfterVat = 0;
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.TrTime = "";
        _this.CryptographicStamp;
        _this.CRDBReasoncode = 0;
        _this.PrevInvoiceHash;
        return _this;
    }
    return A_RecPay_Tr_Adjustment;
}(SecurityClass));
var IQ_GetBoxReceiveList = /** @class */ (function (_super) {
    __extends(IQ_GetBoxReceiveList, _super);
    function IQ_GetBoxReceiveList() {
        var _this = _super.call(this) || this;
        _this.ReceiptID = 0;
        _this.CashBoxID = 0;
        _this.TrType = 0;
        _this.RecPayTypeId = 0;
        _this.TrNo = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.CustomerID = 0;
        _this.VendorID = 0;
        _this.FromCashBoxID = 0;
        _this.ExpenseID = 0;
        _this.Amount = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankAccountCode = "";
        _this.ReceiptDescA = "";
        _this.ReceiptDescE = "";
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CustomerCODE = "";
        _this.cus_NameA = "";
        _this.cus_NameE = "";
        _this.Bank_Acc_DescA = "";
        _this.Bank_ACC_DescE = "";
        _this.CashBox_DescA = "";
        _this.CashBox_DescE = "";
        _this.VendorCode = "";
        _this.Ven_NameA = "";
        _this.Ven_NameE = "";
        _this.ExpCode = 0;
        _this.Exp_DescA = "";
        _this.Exp_DescE = "";
        _this.Bef_ID = 0;
        _this.Bef_Code = 0;
        _this.Bef_DescA = "";
        _this.Bef_DescE = "";
        _this.Type_DescA = "";
        _this.Type_DescE = "";
        _this.CashT_DescA = "";
        _this.CashT_DescE = "";
        _this.CheckNo = "";
        _this.TransferNo = "";
        _this.BankName = "";
        _this.BankAcc_Code = "";
        _this.IsDeffered = false;
        _this.DueDate = "";
        _this.CashType = 0;
        _this.Bnk_acc_DescE = "";
        _this.ACC_DESCL = "";
        _this.Status_New = "";
        return _this;
    }
    return IQ_GetBoxReceiveList;
}(SecurityClass));
var IQ_GetPurchaseOrder = /** @class */ (function (_super) {
    __extends(IQ_GetPurchaseOrder, _super);
    function IQ_GetPurchaseOrder() {
        var _this = _super.call(this) || this;
        _this.PurOrderID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.SalesmanId = 0;
        _this.VendorID = 0;
        _this.VATType = 0;
        _this.IsCash = false;
        _this.Remarks = "";
        _this.Total = 0;
        _this.DiscountPrcnt = 0;
        _this.DiscountAmount = 0;
        _this.VatAmount = 0;
        _this.NetDue = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CurrencyID = 0;
        _this.Slsm_NameA = "";
        _this.Slsm_NameE = "";
        _this.Vnd_NameA = "";
        _this.vnd_NameE = "";
        _this.VendorCode = "";
        _this.sls_Code = "";
        _this.IsReceived = false;
        _this.StatusDesc = "";
        _this.IsReceivedDesc = "";
        _this.DliveryConditions = "";
        _this.ShipmentConditions = "";
        _this.ValidityPeriod = "";
        return _this;
    }
    return IQ_GetPurchaseOrder;
}(SecurityClass));
var IQ_GetPurchaseOrderDetail = /** @class */ (function (_super) {
    __extends(IQ_GetPurchaseOrderDetail, _super);
    function IQ_GetPurchaseOrderDetail() {
        var _this = _super.call(this) || this;
        _this.PurOrderDetailsID = 0;
        _this.PurOrderID = 0;
        _this.Serial = 0;
        _this.ItemID = 0;
        _this.UnitID = 0;
        _this.POStockQty = 0;
        _this.POQty = 0;
        _this.UnitPrice = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetUnitCost = 0;
        _this.BonusQty = 0;
        _this.StockAvailableQty = 0;
        _this.StockUnitCost = 0;
        _this.TotRecQty = 0;
        _this.ItemCode = "";
        _this.itm_DescA = "";
        _this.itm_DescE = "";
        _this.FamilyCode = "";
        _this.Fm_DescA = "";
        _this.Fm_DescE = "";
        _this.UomCode = "";
        _this.Uom_DescA = "";
        _this.UOM_DescE = "";
        return _this;
    }
    return IQ_GetPurchaseOrderDetail;
}(SecurityClass));
var IQ_GetPurReceiveList = /** @class */ (function (_super) {
    __extends(IQ_GetPurReceiveList, _super);
    function IQ_GetPurReceiveList() {
        var _this = _super.call(this) || this;
        _this.ReceiveID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SalesmanId = 0;
        _this.StoreID = 0;
        _this.VatAmount = 0;
        _this.VATType = 0;
        _this.DiscountAmount = 0;
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.Slsm_Code = "";
        _this.Slsm_DescA = "";
        _this.Slsm_DescE = "";
        _this.Vnd_NameA = "";
        _this.Box_DescA = "";
        _this.Box_DescE = "";
        _this.VendorID = 0;
        _this.VendorInvNo = "";
        _this.PoDate = "";
        _this.PoNo = "";
        _this.Remarks = "";
        _this.Total = 0;
        _this.DiscountPrcnt = 0;
        _this.NetDue = 0;
        _this.NetAdditionCost = 0;
        _this.VendorCode = "";
        _this.PurRecType = 0;
        _this.CashBoxID = 0;
        _this.NetAdditionVat = 0;
        _this.Vnd_NameE = "";
        _this.type_DescA = "";
        _this.Type_DescE = "";
        _this.CashPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.PurOrderID = 0;
        _this.PO_TrNo = 0;
        _this.PO_TrDate = "";
        return _this;
    }
    return IQ_GetPurReceiveList;
}(SecurityClass));
var KQ_GetAlertNoteLog = /** @class */ (function (_super) {
    __extends(KQ_GetAlertNoteLog, _super);
    function KQ_GetAlertNoteLog() {
        var _this = _super.call(this) || this;
        _this.NoteType = 0;
        _this.NoteSubType = 0;
        _this.MemberID = 0;
        _this.MsgDate = "";
        _this.MsgText = "";
        _this.IsSent = false;
        _this.AlertID = 0;
        return _this;
    }
    return KQ_GetAlertNoteLog;
}(SecurityClass));
//class KQ_GetNews extends SecurityClass {
//    constructor() {
//        super();
//        this.NewsID = 0;
//        this.NewsTypeCode = 0;
//        this.NewsToCode = 0;
//        this.NewsDate = "";
//        this.NewsExpiry = "";
//        this.NewsText = "";
//        this.CompCode = 0;
//        this.BranchCode = 0;
//        this.NewsType_DescA = "";
//        this.NewsType_DescE = "";
//        this.NewsTo_DescA = "";
//        this.NewsTo_DescE = "";
//        this.SubCode = "";
//        this.Selected = false;
//    }
//    public NewsID: number;
//    public NewsTypeCode: number;
//    public NewsToCode: number;
//    public NewsDate: string;
//    public NewsExpiry: string;
//    public NewsText: string;
//    public CompCode: number;
//    public BranchCode: number;
//    public NewsType_DescA: string;
//    public NewsType_DescE: string;
//    public NewsTo_DescA: string;
//    public NewsTo_DescE: string;
//    public SubCode: string;
//    public Selected: boolean;
//}
var G_News = /** @class */ (function (_super) {
    __extends(G_News, _super);
    function G_News() {
        var _this = _super.call(this) || this;
        _this.NewsID = 0;
        _this.NewsTypeCode = 0;
        _this.NewsToCode = 0;
        _this.NewsDate = "";
        _this.NewsExpiry = "";
        _this.NewsText = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        return _this;
    }
    return G_News;
}(SecurityClass));
var SlsInvoiceMasterDetails = /** @class */ (function (_super) {
    __extends(SlsInvoiceMasterDetails, _super);
    function SlsInvoiceMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Sls_TR_Invoice = new I_Sls_TR_Invoice();
        _this.I_Sls_TR_InvoiceItems = new Array();
        return _this;
    }
    return SlsInvoiceMasterDetails;
}(SecurityClass));
var PurReceiveMasterDetails = /** @class */ (function (_super) {
    __extends(PurReceiveMasterDetails, _super);
    function PurReceiveMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Pur_TR_Receive = new I_Pur_TR_Receive();
        _this.I_Pur_TR_ReceiveItems = new Array();
        _this.I_Pur_Tr_ReceiveCharges = new Array();
        return _this;
    }
    return PurReceiveMasterDetails;
}(SecurityClass));
var Rec_D_CustomerDetail = /** @class */ (function (_super) {
    __extends(Rec_D_CustomerDetail, _super);
    function Rec_D_CustomerDetail() {
        var _this = _super.call(this) || this;
        _this.A_Rec_D_Customer = new A_Rec_D_Customer();
        _this.A_Rec_D_CustomerDoc = new Array();
        return _this;
    }
    return Rec_D_CustomerDetail;
}(SecurityClass));
var I_Item_Year_Details = /** @class */ (function (_super) {
    __extends(I_Item_Year_Details, _super);
    function I_Item_Year_Details() {
        var _this = _super.call(this) || this;
        _this.I_Item = new Array();
        _this.I_ItemYear = new Array();
        return _this;
    }
    return I_Item_Year_Details;
}(SecurityClass));
var IQ_GetPurReceiveMasterDisplay = /** @class */ (function (_super) {
    __extends(IQ_GetPurReceiveMasterDisplay, _super);
    function IQ_GetPurReceiveMasterDisplay() {
        var _this = _super.call(this) || this;
        _this.IQ_GetPurReceiveItem = new Array();
        _this.IQ_GetPurReceiveCharge = new Array();
        return _this;
    }
    return IQ_GetPurReceiveMasterDisplay;
}(SecurityClass));
var A_ACCOUNT_AND_YEAR = /** @class */ (function (_super) {
    __extends(A_ACCOUNT_AND_YEAR, _super);
    function A_ACCOUNT_AND_YEAR() {
        var _this = _super.call(this) || this;
        _this.A_ACCOUNT = new Array();
        _this.A_ACCOUNT_YEAR = new A_ACCOUNT_YEAR();
        return _this;
    }
    return A_ACCOUNT_AND_YEAR;
}(SecurityClass));
var AllGetOperationMasterDisplay = /** @class */ (function (_super) {
    __extends(AllGetOperationMasterDisplay, _super);
    function AllGetOperationMasterDisplay() {
        var _this = _super.call(this) || this;
        _this.IQ_GetOperationItemInfo = new Array();
        _this.IQ_GetOperationCharges = new Array();
        _this.I_TR_OperationDeposit = new Array();
        _this.TR_OperationSalesman = new Array();
        _this.TR_OperationSalesmanItem = new Array();
        return _this;
    }
    return AllGetOperationMasterDisplay;
}(SecurityClass));
var I_Sls_TR_Invoice = /** @class */ (function (_super) {
    __extends(I_Sls_TR_Invoice, _super);
    function I_Sls_TR_Invoice() {
        var _this = _super.call(this) || this;
        _this.InvoiceID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SlsInvType = 0;
        _this.SlsInvSrc = 0;
        _this.CashBoxID = 0;
        _this.CustomerId = 0;
        _this.CustomerName = "";
        _this.CustomerMobileNo = "";
        _this.SalesmanId = 0;
        _this.StoreId = 0;
        _this.OperationId = 0;
        _this.TotalAmount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.DiscountAmount = 0;
        _this.DiscountPrc = 0;
        _this.NetAfterVat = 0;
        _this.CommitionAmount = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankTfAmount = 0;
        _this.BankAccount = "";
        _this.TotalPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.TrTime = "";
        _this.InvoiceTypeCode = 0;
        _this.InvoiceTransCode = 0;
        _this.TaxNotes = "";
        _this.TaxCurrencyID = 0;
        _this.InvoiceCurrenyID = 0;
        _this.ContractNo = "";
        _this.PurchaseorderNo = "";
        _this.GlobalInvoiceCounter = 0;
        _this.PrevInvoiceHash;
        _this.QRCode;
        _this.CryptographicStamp;
        _this.DeliveryDate = "";
        _this.DeliveryEndDate = "";
        _this.PaymentMeansTypeCode = 0;
        _this.CRDBReasoncode = 0;
        _this.PaymentTerms = "";
        _this.PaymentTermsID = 0;
        _this.AllowAmount = 0;
        _this.AllowPrc = 0;
        _this.AllowBase = 0;
        _this.AllowVatNatID = 0;
        _this.AllowVatPrc = 0;
        _this.AllowAfterVat = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.ItemTotal = 0;
        _this.ItemAllowTotal = 0;
        _this.ItemDiscountTotal = 0;
        _this.ItemVatTotal = 0;
        _this.RoundingAmount = 0;
        return _this;
    }
    return I_Sls_TR_Invoice;
}(SecurityClass));
var I_Sls_TR_InvoiceItems = /** @class */ (function (_super) {
    __extends(I_Sls_TR_InvoiceItems, _super);
    function I_Sls_TR_InvoiceItems() {
        var _this = _super.call(this) || this;
        _this.InvoiceItemID = 0;
        _this.InvoiceID = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.InvoiceSoldQty = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.StockSoldQty = 0;
        _this.StockUnitCost = 0;
        _this.VatApplied = 0;
        _this.TotRetQty = 0;
        _this.Serial = 0;
        _this.AllowAmount = 0;
        _this.AllowancePrc = 0;
        _this.AllowanceBase = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.BaseQty = 0;
        _this.BaseQtyUomid = 0;
        _this.BaseQtyPrice = 0;
        _this.BaseQtyDiscount = 0;
        _this.DiscountPrcBase = 0;
        _this.DiscountVatNatID = 0;
        _this.Discountreason = "";
        _this.DiscountCode = 0;
        _this.ItemNetAmount = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.VatNatID = 0;
        _this.UnitpriceWithVat = 0;
        _this.NetUnitPriceWithVat = 0;
        _this.Name_Item = "";
        _this.MinUnitPrice = 0;
        _this.ItemFamilyID = 0;
        _this.Name_ItemFamily = "";
        _this.OnhandQty = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_Sls_TR_InvoiceItems;
}(SecurityClass));
var IQ_GetSlsInvoiceStatistic = /** @class */ (function (_super) {
    __extends(IQ_GetSlsInvoiceStatistic, _super);
    function IQ_GetSlsInvoiceStatistic() {
        var _this = _super.call(this) || this;
        _this.InvoiceID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SlsInvType = 0;
        _this.SlsInvSrc = 0;
        _this.CashBoxID = 0;
        _this.CustomerId = 0;
        _this.CustomerName = "";
        _this.CustomerMobileNo = "";
        _this.SalesmanId = 0;
        _this.StoreId = 0;
        _this.OperationId = 0;
        _this.TotalAmount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.DiscountAmount = 0;
        _this.DiscountPrc = 0;
        _this.NetAfterVat = 0;
        _this.CommitionAmount = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankTfAmount = 0;
        _this.BankAccount = "";
        _this.TotalPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.Slsm_Code = "";
        _this.Slsm_DescA = "";
        _this.Slsm_DescE = "";
        _this.Cus_Code = "";
        _this.Cus_NameA = "";
        _this.Cus_NameE = "";
        _this.Box_DescA = "";
        _this.Box_DescE = "";
        _this.Line_Count = 0;
        _this.Item_Count = 0;
        _this.Tot_Qty = 0;
        _this.Tot_Amount = 0;
        _this.Tot_VAT = 0;
        _this.Tot_Net = 0;
        _this.tot_RetQty = 0;
        _this.returnTypeDesciption = "";
        _this.statusDesciption = "";
        _this.IsCashDesciption = "";
        _this.operationName = "";
        return _this;
    }
    return IQ_GetSlsInvoiceStatistic;
}(SecurityClass));
var IQ_GetSlsInvoiceItem = /** @class */ (function (_super) {
    __extends(IQ_GetSlsInvoiceItem, _super);
    function IQ_GetSlsInvoiceItem() {
        var _this = _super.call(this) || this;
        _this.InvoiceItemID = 0;
        _this.InvoiceID = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.StockSoldQty = 0;
        _this.StockUnitCost = 0;
        _this.VatApplied = 0;
        _this.TotRetQty = 0;
        _this.it_itemCode = "";
        _this.it_DescA = "";
        _this.CompCode = 0;
        _this.It_DescE = "";
        _this.ItFm_Code = "";
        _this.ItFm_DescA = "";
        _this.ItFm_DescE = "";
        _this.Cat_Code = "";
        _this.Cat_DescA = "";
        _this.Cat_DescE = "";
        _this.Uom_Code = "";
        _this.Uom_DescA = "";
        _this.Uom_DescE = "";
        _this.ItemFamilyID = 0;
        _this.InvoiceSoldQty = 0;
        _this.Serial = 0;
        _this.AllowAmount = 0;
        _this.AllowancePrc = 0;
        _this.AllowanceBase = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.BaseQty = 0;
        _this.BaseQtyUomid = 0;
        _this.BaseQtyPrice = 0;
        _this.BaseQtyDiscount = 0;
        _this.DiscountPrcBase = 0;
        _this.DiscountVatNatID = 0;
        _this.Discountreason = "";
        _this.DiscountCode = 0;
        _this.ItemNetAmount = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.VatNatID = 0;
        _this.UnitpriceWithVat = 0;
        _this.NetUnitPriceWithVat = 0;
        return _this;
    }
    return IQ_GetSlsInvoiceItem;
}(SecurityClass));
var IQ_GetSlsInvoiceList = /** @class */ (function (_super) {
    __extends(IQ_GetSlsInvoiceList, _super);
    function IQ_GetSlsInvoiceList() {
        var _this = _super.call(this) || this;
        _this.InvoiceID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SlsInvType = 0;
        _this.SlsInvSrc = 0;
        _this.CashBoxID = 0;
        _this.CustomerId = 0;
        _this.CustomerName = "";
        _this.CustomerMobileNo = "";
        _this.SalesmanId = 0;
        _this.StoreId = 0;
        _this.OperationId = 0;
        _this.TotalAmount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.DiscountAmount = 0;
        _this.DiscountPrc = 0;
        _this.NetAfterVat = 0;
        _this.CommitionAmount = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankTfAmount = 0;
        _this.BankAccount = "";
        _this.TotalPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.Slsm_Code = "";
        _this.Slsm_DescA = "";
        _this.Slsm_DescE = "";
        _this.Cus_Code = "";
        _this.Cus_NameA = "";
        _this.Cus_NameE = "";
        _this.Box_DescA = "";
        _this.Box_DescE = "";
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.TrTime = "";
        _this.InvoiceTypeCode = 0;
        _this.InvoiceTransCode = 0;
        _this.TaxNotes = "";
        _this.TaxCurrencyID = 0;
        _this.InvoiceCurrenyID = 0;
        _this.ContractNo = "";
        _this.PurchaseorderNo = "";
        _this.GlobalInvoiceCounter = 0;
        _this.PrevInvoiceHash;
        _this.QRCode;
        _this.CryptographicStamp;
        _this.DeliveryDate = "";
        _this.DeliveryEndDate = "";
        _this.PaymentMeansTypeCode = 0;
        _this.CRDBReasoncode = 0;
        _this.PaymentTerms = "";
        _this.PaymentTermsID = 0;
        _this.AllowAmount = 0;
        _this.AllowPrc = 0;
        _this.AllowBase = 0;
        _this.AllowVatNatID = 0;
        _this.AllowVatPrc = 0;
        _this.AllowAfterVat = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.ItemTotal = 0;
        _this.ItemAllowTotal = 0;
        _this.ItemDiscountTotal = 0;
        _this.ItemVatTotal = 0;
        _this.RoundingAmount = 0;
        return _this;
    }
    return IQ_GetSlsInvoiceList;
}(SecurityClass));
var I_TR_OperationItems = /** @class */ (function (_super) {
    __extends(I_TR_OperationItems, _super);
    function I_TR_OperationItems() {
        var _this = _super.call(this) || this;
        _this.OperationItemID = 0;
        _this.OperationID = 0;
        _this.ItemID = 0;
        _this.ReceivedQty = 0;
        _this.SoldQty = 0;
        _this.ScrapQty = 0;
        _this.Est_CostPrice = 0;
        _this.Est_SalesPrice = 0;
        _this.Min_SalesPrice = 0;
        _this.OnhandQty = 0;
        _this.Remarks = "";
        _this.StatusFlag = "";
        return _this;
    }
    return I_TR_OperationItems;
}(SecurityClass));
var I_TR_OperationDeposit = /** @class */ (function (_super) {
    __extends(I_TR_OperationDeposit, _super);
    function I_TR_OperationDeposit() {
        var _this = _super.call(this) || this;
        _this.OperationDepositID = 0;
        _this.OperationID = 0;
        _this.SalesmanId = 0;
        _this.ItemID = 0;
        _this.Acc_Code = "";
        _this.DepositAmount = 0;
        _this.DepositDate = "";
        _this.Remarks = "";
        _this.DepositType = 0;
        _this.CashBoxID = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_TR_OperationDeposit;
}(SecurityClass));
var IQ_GetOperationDepsit = /** @class */ (function (_super) {
    __extends(IQ_GetOperationDepsit, _super);
    function IQ_GetOperationDepsit() {
        var _this = _super.call(this) || this;
        _this.OperationDepositID = 0;
        _this.OperationID = 0;
        _this.ItemID = 0;
        _this.Acc_Code = "";
        _this.DepositAmount = 0;
        _this.DepositDate = "";
        _this.Remarks = "";
        _this.DepositType = 0;
        _this.CashBoxID = 0;
        _this.CashBox_DescA = "";
        _this.CashBox_DescE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.SalesmanId = 0;
        _this.SalesmanCode = "";
        _this.Sls_NameA = "";
        _this.sls_NameE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return IQ_GetOperationDepsit;
}(SecurityClass));
var I_TR_OperationCharges = /** @class */ (function (_super) {
    __extends(I_TR_OperationCharges, _super);
    function I_TR_OperationCharges() {
        var _this = _super.call(this) || this;
        _this.OperationExpensesID = 0;
        _this.OperationID = 0;
        _this.Serial = 0;
        _this.ChargeID = 0;
        _this.Amount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.VatPrc = 0;
        _this.NetAtferVat = 0;
        _this.isPaidByVendor = false;
        _this.RefInvoiceNo = "";
        _this.RefInvoiceDate = "";
        _this.VendorID = 0;
        _this.StatusFlag = "";
        _this.CashBoxID = 0;
        return _this;
    }
    return I_TR_OperationCharges;
}(SecurityClass));
var I_TR_Operation = /** @class */ (function (_super) {
    __extends(I_TR_Operation, _super);
    function I_TR_Operation() {
        var _this = _super.call(this) || this;
        _this.OperationID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.ClearanceDate = "";
        _this.TrDateH = "";
        _this.TruckNo = "";
        _this.PortName = "";
        _this.PaperPurchaseValue = 0;
        _this.NationalityID = 0;
        _this.VendorID = 0;
        _this.Goods_Desc = "";
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.OpenAt = "";
        _this.OpenBy = "";
        _this.CloseAt = "";
        _this.CloseBy = "";
        _this.User_Code = "";
        _this.SalesmanId = 0;
        _this.CompanyCommitionPrc = 0;
        _this.Close_CompanyCommitionPrc = 0;
        _this.Close_TrDate = "";
        _this.Close_TotalSalesCash = 0;
        _this.Close_TotalSalesCashVAT = 0;
        _this.Close_TotalSalesCredit = 0;
        _this.Close_TotalSalesCreditVAT = 0;
        _this.Close_CashOnhand = 0;
        _this.Close_CashOnBank = 0;
        _this.Close_BankAccNo = "";
        _this.Close_TotalSales = 0;
        _this.Close_Marketting = 0;
        _this.Close_TotalExpenses = 0;
        _this.Close_Adjustment = 0;
        _this.Close_AdjustmentRemarks = "";
        _this.Close_CompanyCommition = 0;
        _this.Close_purchaseValue = 0;
        _this.Close_SalesManCommition = 0;
        _this.Close_NetProfit = 0;
        _this.Close_Remarks = "";
        _this.IsGenerated = false;
        _this.PolicyNo = "";
        _this.CustomNo = "";
        return _this;
    }
    return I_TR_Operation;
}(SecurityClass));
var IQ_GetOperationItemInfo_New = /** @class */ (function () {
    function IQ_GetOperationItemInfo_New() {
        this.ItemID = 0;
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.Family_DescA = "";
        this.Family_DescE = "";
        this.ItemFamilyID = 0;
        this.Min_SalesPrice = 0;
        this.OnhandQty = 0;
        this.Est_SalesPrice = 0;
    }
    return IQ_GetOperationItemInfo_New;
}());
var IQ_GetOperationItemInfo = /** @class */ (function (_super) {
    __extends(IQ_GetOperationItemInfo, _super);
    function IQ_GetOperationItemInfo() {
        var _this = _super.call(this) || this;
        _this.ItemCode = "";
        _this.Itm_DescA = "";
        _this.Itm_DescE = "";
        _this.UomID = 0;
        _this.ItemFamilyID = 0;
        _this.CompCode = 0;
        _this.RefItemCode = "";
        _this.FirstEntryDate = "";
        _this.UnitPrice = 0;
        _this.StarGlobalCost = 0;
        _this.GlobalCost = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.LastBarCodeSeq = 0;
        _this.BarCodePrefix = "";
        _this.OnhandQty = 0;
        _this.Uom_DescA = "";
        _this.Uom_DescE = "";
        _this.FamilyCode = "";
        _this.Family_DescA = "";
        _this.Family_DescE = "";
        _this.MinUnitPrice = 0;
        _this.CatID = 0;
        _this.OperationItemID = 0;
        _this.OperationID = 0;
        _this.ItemID = 0;
        _this.ReceivedQty = 0;
        _this.SoldQty = 0;
        _this.ScrapQty = 0;
        _this.Est_CostPrice = 0;
        _this.Est_SalesPrice = 0;
        _this.Min_SalesPrice = 0;
        _this.Expr1 = "";
        return _this;
    }
    return IQ_GetOperationItemInfo;
}(SecurityClass));
var IQ_GetOperationCharges = /** @class */ (function (_super) {
    __extends(IQ_GetOperationCharges, _super);
    function IQ_GetOperationCharges() {
        var _this = _super.call(this) || this;
        _this.ChargeID = 0;
        _this.Amount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.VatPrc = 0;
        _this.NetAtferVat = 0;
        _this.isPaidByVendor = false;
        _this.RefInvoiceNo = "";
        _this.RefInvoiceDate = "";
        _this.VendorID = 0;
        _this.CostAddCode = 0;
        _this.DESCA = "";
        _this.DESCL = "";
        _this.IsAddition = false;
        _this.VendorCode = "";
        _this.Vnd_NameA = "";
        _this.Vnd_NameE = "";
        _this.Serial = 0;
        _this.OperationExpensesID = 0;
        _this.OperationID = 0;
        _this.CashBox_DescA = "";
        _this.CashBox_DescE = "";
        return _this;
    }
    return IQ_GetOperationCharges;
}(SecurityClass));
var IQ_GetOperation = /** @class */ (function (_super) {
    __extends(IQ_GetOperation, _super);
    function IQ_GetOperation() {
        var _this = _super.call(this) || this;
        _this.OperationID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TruckNo = "";
        _this.PortName = "";
        _this.PaperPurchaseValue = 0;
        _this.NationalityID = 0;
        _this.VendorID = 0;
        _this.Goods_Desc = "";
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.OpenAt = "";
        _this.OpenBy = "";
        _this.CloseAt = "";
        _this.CloseBy = "";
        _this.User_Code = "";
        _this.SalesmanId = 0;
        _this.CompanyCommitionPrc = 0;
        _this.Close_CompanyCommitionPrc = 0;
        _this.Close_TrDate = "";
        _this.Close_TotalSalesCash = 0;
        _this.Close_TotalSalesCashVAT = 0;
        _this.Close_TotalSalesCredit = 0;
        _this.Close_TotalSalesCreditVAT = 0;
        _this.Close_CashOnhand = 0;
        _this.Close_CashOnBank = 0;
        _this.Close_BankAccNo = "";
        _this.Close_TotalSales = 0;
        _this.Close_TotalExpenses = 0;
        _this.Close_Adjustment = 0;
        _this.Close_AdjustmentRemarks = "";
        _this.Close_CompanyCommition = 0;
        _this.Close_purchaseValue = 0;
        _this.Close_SalesManCommition = 0;
        _this.Close_NetProfit = 0;
        _this.Close_Remarks = "";
        _this.Vnd_Code = "";
        _this.nvd_DescA = "";
        _this.Vnd_DescE = "";
        _this.Status_DescA = "";
        _this.Status_DescE = "";
        _this.Nat_DescA = "";
        _this.Nat_Code = "";
        _this.Nat_DescE = "";
        _this.Sls_NameA = "";
        _this.Sls_Code = "";
        _this.Sls_NameE = "";
        _this.ClearanceDate = "";
        _this.ClearanceDateH = "";
        _this.ClearanceDateH = "";
        _this.IsGenerated = false;
        _this.PolicyNo = "";
        _this.CustomNo = "";
        return _this;
    }
    return IQ_GetOperation;
}(SecurityClass));
var IQ_GetPurReceiveStaistic = /** @class */ (function (_super) {
    __extends(IQ_GetPurReceiveStaistic, _super);
    function IQ_GetPurReceiveStaistic() {
        var _this = _super.call(this) || this;
        _this.ReceiveID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.IsCash = false;
        _this.TrType = 0;
        _this.SalesmanId = 0;
        _this.StoreID = 0;
        _this.VatAmount = 0;
        _this.VATType = 0;
        _this.DiscountAmount = 0;
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.BranchCode = 0;
        _this.CompCode = 0;
        _this.Slsm_Code = "";
        _this.Slsm_DescA = "";
        _this.Slsm_DescE = "";
        _this.Box_DescA = "";
        _this.Box_DescE = "";
        _this.VendorID = 0;
        _this.VendorInvNo = "";
        _this.PoDate = "";
        _this.PoNo = "";
        _this.Remarks = "";
        _this.Total = 0;
        _this.DiscountPrcnt = 0;
        _this.NetDue = 0;
        _this.NetAdditionCost = 0;
        _this.VendorCode = "";
        _this.PurRecType = 0;
        _this.CashBoxID = 0;
        _this.NetAdditionVat = 0;
        _this.Line_Count = 0;
        _this.Item_Count = 0;
        _this.Tot_Qty = 0;
        _this.Tot_Amount = 0;
        _this.Tot_VAT = 0;
        _this.Tot_Net = 0;
        _this.tot_RetQty = 0;
        _this.Tot_Add = 0;
        _this.TotAdd = 0;
        _this.TotAddVat = 0;
        _this.TotAddAfterVat = 0;
        _this.Vnd_NameA = "";
        _this.Vnd_NameE = "";
        _this.type_DescA = "";
        _this.Type_DescE = "";
        _this.Vendor_Name = "";
        _this.StatusDesc = "";
        _this.CashPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.CurrencyID = 0;
        _this.PurOrderID = 0;
        _this.PO_TrNo = 0;
        _this.PO_TrDate = "";
        _this.TotalFC = 0;
        _this.CurrencyRate = 0;
        _this.Tot_AmountFC = 0;
        return _this;
    }
    return IQ_GetPurReceiveStaistic;
}(SecurityClass));
var IQ_GetPurReceiveItem = /** @class */ (function (_super) {
    __extends(IQ_GetPurReceiveItem, _super);
    function IQ_GetPurReceiveItem() {
        var _this = _super.call(this) || this;
        _this.ItemID = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.StockUnitCost = 0;
        _this.TotRetQty = 0;
        _this.it_itemCode = "";
        _this.it_DescA = "";
        _this.CompCode = 0;
        _this.It_DescE = "";
        _this.ItFm_Code = "";
        _this.ItFm_DescA = "";
        _this.ItFm_DescE = "";
        _this.Cat_Code = "";
        _this.Cat_DescA = "";
        _this.Cat_DescE = "";
        _this.Uom_Code = "";
        _this.Uom_DescA = "";
        _this.Uom_DescE = "";
        _this.ReciveDetailsID = 0;
        _this.ReceiveID = 0;
        _this.Serial = 0;
        _this.UnitID = 0;
        _this.RecStockQty = 0;
        _this.RecQty = 0;
        _this.RecUnitPrice = 0;
        _this.NetUnitCost = 0;
        _this.BonusQty = 0;
        _this.ExpireDate = "";
        _this.BatchCode = "";
        _this.BarCode = "";
        _this.StockAvailableQty = 0;
        _this.NewUnitCost = 0;
        _this.UnitAddCost = 0;
        _this.TotItemCost = 0;
        _this.ItemFamilyID = 0;
        _this.ReceiveRecQty = 0;
        _this.RecUnitPriceFC = 0;
        return _this;
    }
    return IQ_GetPurReceiveItem;
}(SecurityClass));
var IQ_GetPurReceiveCharge = /** @class */ (function (_super) {
    __extends(IQ_GetPurReceiveCharge, _super);
    function IQ_GetPurReceiveCharge() {
        var _this = _super.call(this) || this;
        _this.ReceiveID = 0;
        _this.ReceiveExpensesID = 0;
        _this.ChargeID = 0;
        _this.Amount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.VatPrc = 0;
        _this.NetAtferVat = 0;
        _this.isPaidByVendor = false;
        _this.RefInvoiceNo = "";
        _this.RefInvoiceDate = "";
        _this.VendorID = 0;
        _this.CostAddCode = 0;
        _this.DESCA = "";
        _this.DESCL = "";
        _this.IsAddition = false;
        _this.VendorCode = "";
        _this.Vnd_NameA = "";
        _this.Vnd_NameE = "";
        _this.Serial = 0;
        _this.CashBoxID = 0;
        return _this;
    }
    return IQ_GetPurReceiveCharge;
}(SecurityClass));
var IQ_GetPurChargeInfo = /** @class */ (function (_super) {
    __extends(IQ_GetPurChargeInfo, _super);
    function IQ_GetPurChargeInfo() {
        var _this = _super.call(this) || this;
        _this.VatType = 0;
        _this.ChargeID = 0;
        _this.CompCode = 0;
        _this.CostAddCode = 0;
        _this.DESCA = "";
        _this.DESCL = "";
        _this.IsAddition = false;
        _this.DefaultPerc = 0;
        _this.IsAffectPurchaseCost = false;
        _this.GLExpenseAcc = "";
        _this.Ch_VatType = 0;
        _this.VatPerc = 0;
        return _this;
    }
    return IQ_GetPurChargeInfo;
}(SecurityClass));
var I_Pur_D_Charges = /** @class */ (function (_super) {
    __extends(I_Pur_D_Charges, _super);
    function I_Pur_D_Charges() {
        var _this = _super.call(this) || this;
        _this.ChargeID = 0;
        _this.CompCode = 0;
        _this.CostAddCode = 0;
        _this.DESCA = "";
        _this.DESCL = "";
        _this.IsAddition = false;
        _this.DefaultPerc = 0;
        _this.IsAffectPurchaseCost = false;
        _this.GLExpenseAcc = "";
        _this.VatType = 0;
        _this.StatusFlag = "";
        _this.OPGLExpenseAcc = "";
        return _this;
    }
    return I_Pur_D_Charges;
}(SecurityClass));
var I_Pur_TR_Receive = /** @class */ (function (_super) {
    __extends(I_Pur_TR_Receive, _super);
    function I_Pur_TR_Receive() {
        var _this = _super.call(this) || this;
        _this.ReceiveID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrType = 0;
        _this.PurRecType = 0;
        _this.StoreID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.SalesmanId = 0;
        _this.VendorID = 0;
        _this.VendorInvNo = "";
        _this.VATType = 0;
        _this.PoDate = "";
        _this.PoNo = "";
        _this.IsCash = false;
        _this.Remarks = "";
        _this.Total = 0;
        _this.DiscountPrcnt = 0;
        _this.DiscountAmount = 0;
        _this.VatAmount = 0;
        _this.NetDue = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.NetAdditionCost = 0;
        _this.NetAdditionVat = 0;
        _this.CashBoxID = 0;
        _this.CashPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.PurOrderID = 0;
        _this.CurrencyID = 0;
        _this.CurrencyRate = 0;
        _this.TotalFC = 0;
        return _this;
    }
    return I_Pur_TR_Receive;
}(SecurityClass));
var I_Pur_Tr_PurchaseOrder = /** @class */ (function (_super) {
    __extends(I_Pur_Tr_PurchaseOrder, _super);
    function I_Pur_Tr_PurchaseOrder() {
        var _this = _super.call(this) || this;
        _this.PurOrderID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Status = 0;
        _this.SalesmanId = 0;
        _this.VendorID = 0;
        _this.VATType = 0;
        _this.IsCash = false;
        _this.Remarks = "";
        _this.Total = 0;
        _this.DiscountPrcnt = 0;
        _this.DiscountAmount = 0;
        _this.VatAmount = 0;
        _this.NetDue = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.CurrencyID = 0;
        _this.IsReceived = false;
        _this.DliveryConditions = "";
        _this.ShipmentConditions = "";
        _this.ValidityPeriod = "";
        return _this;
    }
    return I_Pur_Tr_PurchaseOrder;
}(SecurityClass));
var I_Pur_Tr_PurchaseOrderDetail = /** @class */ (function (_super) {
    __extends(I_Pur_Tr_PurchaseOrderDetail, _super);
    function I_Pur_Tr_PurchaseOrderDetail() {
        var _this = _super.call(this) || this;
        _this.PurOrderDetailsID = 0;
        _this.PurOrderID = 0;
        _this.Serial = 0;
        _this.ItemID = 0;
        _this.UnitID = 0;
        _this.POStockQty = 0;
        _this.POQty = 0;
        _this.UnitPrice = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetUnitCost = 0;
        _this.BonusQty = 0;
        _this.StockAvailableQty = 0;
        _this.StockUnitCost = 0;
        _this.TotRecQty = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_Pur_Tr_PurchaseOrderDetail;
}(SecurityClass));
var I_Pur_TR_ReceiveItems = /** @class */ (function (_super) {
    __extends(I_Pur_TR_ReceiveItems, _super);
    function I_Pur_TR_ReceiveItems() {
        var _this = _super.call(this) || this;
        _this.ReciveDetailsID = 0;
        _this.ReceiveID = 0;
        _this.Serial = 0;
        _this.ItemID = 0;
        _this.UnitID = null;
        _this.RecStockQty = 0;
        _this.ReceiveRecQty = 0;
        _this.RecQty = 0;
        _this.RecUnitPrice = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetUnitCost = 0;
        _this.BonusQty = 0;
        _this.ExpireDate = "";
        _this.BatchCode = "";
        _this.BarCode = "";
        _this.StockAvailableQty = 0;
        _this.StockUnitCost = 0;
        _this.NewUnitCost = 0;
        _this.TotRetQty = 0;
        _this.UnitAddCost = 0;
        _this.RecUnitPriceFC = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_Pur_TR_ReceiveItems;
}(SecurityClass));
var I_Pur_Tr_ReceiveCharges = /** @class */ (function (_super) {
    __extends(I_Pur_Tr_ReceiveCharges, _super);
    function I_Pur_Tr_ReceiveCharges() {
        var _this = _super.call(this) || this;
        _this.ReceiveExpensesID = 0;
        _this.ReceiveID = 0;
        _this.Serial = 0;
        _this.ChargeID = 0;
        _this.Amount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.VatPrc = 0;
        _this.NetAtferVat = 0;
        _this.isPaidByVendor = false;
        _this.RefInvoiceNo = "";
        _this.RefInvoiceDate = "";
        _this.VendorID = 0;
        _this.StatusFlag = "";
        _this.CashBoxID = 0;
        return _this;
    }
    return I_Pur_Tr_ReceiveCharges;
}(SecurityClass));
var A_Voucher_Types = /** @class */ (function (_super) {
    __extends(A_Voucher_Types, _super);
    function A_Voucher_Types() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VoucherType = 0;
        _this.TYPE_CODE = 0;
        _this.TYPE_DESCA = "";
        _this.TYPE_DESCE = "";
        _this.Remarks = "";
        return _this;
    }
    return A_Voucher_Types;
}(SecurityClass));
var G_COST_CENTER = /** @class */ (function (_super) {
    __extends(G_COST_CENTER, _super);
    function G_COST_CENTER() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.CC_CODE = "";
        _this.CC_DESCA = "";
        _this.CC_PARENT = "";
        _this.CC_LEVEL = 0;
        _this.CC_LOCATION = "";
        _this.CC_TARGET = 0;
        _this.ACTIVE = false;
        _this.PAYROLL_UPDATE = false;
        _this.LEAF = false;
        _this.CC_DESCE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return G_COST_CENTER;
}(SecurityClass));
var JournalMasterDetails = /** @class */ (function (_super) {
    __extends(JournalMasterDetails, _super);
    function JournalMasterDetails() {
        var _this = _super.call(this) || this;
        _this.A_JOURNAL_HEADER = new A_JOURNAL_HEADER();
        _this.A_JOURNAL_DETAIL = new Array();
        return _this;
    }
    return JournalMasterDetails;
}(SecurityClass));
var AQ_GetJournalHeaderWithDetail = /** @class */ (function (_super) {
    __extends(AQ_GetJournalHeaderWithDetail, _super);
    function AQ_GetJournalHeaderWithDetail() {
        var _this = _super.call(this) || this;
        _this.AQ_GetJournalHeader = new Array();
        _this.AQ_GetJournalDetail = new Array();
        return _this;
    }
    return AQ_GetJournalHeaderWithDetail;
}(SecurityClass));
var A_JOURNAL_DETAIL = /** @class */ (function (_super) {
    __extends(A_JOURNAL_DETAIL, _super);
    function A_JOURNAL_DETAIL() {
        var _this = _super.call(this) || this;
        _this.VoucherDetailID = 0;
        _this.VoucherID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_SERIAL = 0;
        _this.ACC_CODE = "";
        _this.CC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.DESCL = "";
        _this.DESCA = "";
        _this.CCDT_CODE = "";
        _this.INVOICE_NO = 0;
        _this.BOOK_TR_NO = 0;
        _this.SRC_SYSTEM_CODE = "";
        _this.SRC_SUB_SYSTEM_CODE = "";
        _this.SRC_BRA_CODE = 0;
        _this.SRC_TR_CODE = "";
        _this.SRC_TR_NO = 0;
        _this.SRC_TR_TYPE = "";
        _this.DEBIT_FC = 0;
        _this.CREDIT_FC = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return A_JOURNAL_DETAIL;
}(SecurityClass));
var A_JOURNAL_HEADER = /** @class */ (function (_super) {
    __extends(A_JOURNAL_HEADER, _super);
    function A_JOURNAL_HEADER() {
        var _this = _super.call(this) || this;
        _this.VoucherID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_DATE = "";
        _this.VOUCHER_DESC = "";
        _this.VOUCHER_STATUS = 0;
        _this.TYPE_CODE = 0;
        _this.REF_CODE = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.POSTED_BY = "";
        _this.POSTED_AT = "";
        _this.BOOK_TR_NO = 0;
        _this.SOURCE_TYPE = "";
        _this.TotalDebit = 0;
        _this.TotalCredit = 0;
        _this.VOUCHER_DATEH = "";
        _this.AUTHORISED_BY = "";
        _this.AUTHORISED_AT = "";
        return _this;
    }
    return A_JOURNAL_HEADER;
}(SecurityClass));
var AQ_GetJournalDetail = /** @class */ (function (_super) {
    __extends(AQ_GetJournalDetail, _super);
    function AQ_GetJournalDetail() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_SERIAL = 0;
        _this.ACC_CODE = "";
        _this.CC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.DESCL = "";
        _this.DESCA = "";
        _this.CCDT_CODE = "";
        _this.INVOICE_NO = 0;
        _this.BOOK_TR_NO = 0;
        _this.SRC_SYSTEM_CODE = "";
        _this.SRC_SUB_SYSTEM_CODE = "";
        _this.SRC_BRA_CODE = 0;
        _this.SRC_TR_CODE = "";
        _this.SRC_TR_NO = 0;
        _this.SRC_TR_TYPE = "";
        _this.DEBIT_FC = 0;
        _this.CREDIT_FC = 0;
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.VoucherDetailID = 0;
        _this.VoucherID = 0;
        _this.CCDT_TYPE = "";
        _this.CCDT_DESCA = "";
        _this.CCDT_DESCE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return AQ_GetJournalDetail;
}(SecurityClass));
var AQ_GetJournalHeader = /** @class */ (function (_super) {
    __extends(AQ_GetJournalHeader, _super);
    function AQ_GetJournalHeader() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_DATE = "";
        _this.VOUCHER_DESC = "";
        _this.VOUCHER_STATUS = 0;
        _this.TYPE_CODE = 0;
        _this.REF_CODE = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.POSTED_BY = "";
        _this.POSTED_AT = "";
        _this.SOURCE_TYPE = "";
        _this.VOUCHER_DATEH = "";
        _this.AUTHORISED_BY = "";
        _this.AUTHORISED_AT = "";
        _this.TYPE_DESCA = "";
        _this.TYPE_DESCE = "";
        _this.St_DescE = "";
        _this.St_DescA = "";
        _this.Src_DescE = "";
        _this.Src_DescA = "";
        _this.VoucherID = 0;
        _this.TotalDebit = 0;
        _this.TotalCredit = 0;
        return _this;
    }
    return AQ_GetJournalHeader;
}(SecurityClass));
var A_TR_VchrTemplate = /** @class */ (function (_super) {
    __extends(A_TR_VchrTemplate, _super);
    function A_TR_VchrTemplate() {
        var _this = _super.call(this) || this;
        _this.TemplateID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_TYPE = 0;
        _this.TEMPLATE_DESC = "";
        _this.VOUCHER_DESC = "";
        _this.TYPE_CODE = 0;
        _this.ACC_CODE = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.IsSaveValue = false;
        return _this;
    }
    return A_TR_VchrTemplate;
}(SecurityClass));
var A_TR_VchrTemplateDetail = /** @class */ (function (_super) {
    __extends(A_TR_VchrTemplateDetail, _super);
    function A_TR_VchrTemplateDetail() {
        var _this = _super.call(this) || this;
        _this.VoucherDetailID = 0;
        _this.TemplateID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_TYPE = 0;
        _this.VOUCHER_SERIAL = 0;
        _this.ACC_CODE = "";
        _this.CC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.DESCL = "";
        _this.DESCA = "";
        _this.DEBIT_FC = 0;
        _this.CREDIT_FC = 0;
        _this.CCDT_CODE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_TR_VchrTemplateDetail;
}(SecurityClass));
var VchrTemplatMasterDetail = /** @class */ (function (_super) {
    __extends(VchrTemplatMasterDetail, _super);
    function VchrTemplatMasterDetail() {
        var _this = _super.call(this) || this;
        _this.A_TR_VchrTemplate = new A_TR_VchrTemplate();
        _this.A_TR_VchrTemplateDetail = new Array();
        return _this;
    }
    return VchrTemplatMasterDetail;
}(SecurityClass));
var G_RoleUsers = /** @class */ (function (_super) {
    __extends(G_RoleUsers, _super);
    function G_RoleUsers() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.RoleId = 0;
        _this.ISActive = false;
        _this.StatusFlag = "";
        return _this;
    }
    return G_RoleUsers;
}(SecurityClass));
var G_USERS = /** @class */ (function (_super) {
    __extends(G_USERS, _super);
    function G_USERS() {
        var _this = _super.call(this) || this;
        _this.LoginUrl = false;
        _this.Email = "";
        _this.FirstLogin = "";
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CashBoxID = 0;
        _this.UserId = 0;
        _this.SalesManID = 0;
        _this.USER_CODE = "";
        _this.USER_PASSWORD = "";
        _this.USER_ACTIVE = false;
        _this.USER_NAME = "";
        _this.CompCode = 0;
        _this.GRP_CODE = "";
        _this.REGION_CODE = "";
        _this.USER_PASSWORD2 = "";
        _this.CHANGE_PASS_DATE = "";
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Mobile = "";
        _this.DepartmentName = "";
        _this.JobTitle = "";
        _this.USER_TYPE = 0;
        _this.ManagedBy = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.Tokenid = "";
        _this.LastLogin = "";
        _this.Flag_Mastr = "";
        _this.StoreID = 0;
        _this.FirstName = "";
        return _this;
    }
    return G_USERS;
}(SecurityClass));
var GQ_GetUsers = /** @class */ (function (_super) {
    __extends(GQ_GetUsers, _super);
    function GQ_GetUsers() {
        var _this = _super.call(this) || this;
        _this.LoginUrl = false;
        _this.USER_CODE = "";
        _this.USER_PASSWORD = "";
        _this.USER_ACTIVE = false;
        _this.USER_NAME = "";
        _this.CompCode = 0;
        _this.UserId = 0;
        _this.CashBoxID = 0;
        _this.SalesManID = 0;
        _this.REGION_CODE = "";
        _this.GRP_CODE = "";
        _this.USER_PASSWORD2 = "";
        _this.CHANGE_PASS_DATE = "";
        _this.City = "";
        _this.Address = "";
        _this.Tel = "";
        _this.Fax = "";
        _this.Mobile = "";
        _this.Email = "";
        _this.DepartmentName = "";
        _this.JobTitle = "";
        _this.USER_TYPE = 0;
        _this.ManagedBy = "";
        _this.Tokenid = "";
        _this.LastLogin = "";
        _this.FirstLogin = "";
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.Type_DescA = "";
        _this.Type_DescE = "";
        _this.CodeType = "";
        _this.IsActiveDesc = "";
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.Flag_Mastr = "";
        _this.StoreID = 0;
        _this.FirstName = "";
        return _this;
    }
    return GQ_GetUsers;
}(SecurityClass));
var GQ_GetUserRole = /** @class */ (function (_super) {
    __extends(GQ_GetUserRole, _super);
    function GQ_GetUserRole() {
        var _this = _super.call(this) || this;
        _this.USER_CODE = "";
        _this.ISActive = false;
        _this.DescA = "";
        _this.DescE = "";
        _this.Remarks = "";
        _this.RoleId = 0;
        _this.IsActiveDesc = "";
        _this.IsAvailable = false;
        _this.IsShowable = false;
        return _this;
    }
    return GQ_GetUserRole;
}(SecurityClass));
var G_Role = /** @class */ (function (_super) {
    __extends(G_Role, _super);
    function G_Role() {
        var _this = _super.call(this) || this;
        _this.RoleId = 0;
        _this.DescA = "";
        _this.DescE = "";
        _this.Remarks = "";
        _this.IsAvailable = false;
        _this.IsShowable = false;
        return _this;
    }
    return G_Role;
}(SecurityClass));
var G_CONTROL = /** @class */ (function (_super) {
    __extends(G_CONTROL, _super);
    function G_CONTROL() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.FIN_YEAR = 0;
        _this.ACC_STATUS = 0;
        _this.INV_STATUS = 0;
        _this.FirstDate = "";
        _this.LastDate = "";
        _this.ProfitAcc_Code = "";
        _this.OpenAccVoucheNo = 0;
        _this.OpenInvAdjNo = 0;
        return _this;
    }
    return G_CONTROL;
}(SecurityClass));
var G_LnkTrans = /** @class */ (function (_super) {
    __extends(G_LnkTrans, _super);
    function G_LnkTrans() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.TR_CODE = "";
        _this.TR_DESCA = "";
        _this.TR_DESCE = "";
        _this.VOUCHER_TYPE = 0;
        _this.VOUCHER_SOURCE_TYPE = 0;
        _this.TABLE_NAME = "";
        _this.TABLE_CONDITION = "";
        _this.FN_COMP_CODE = "";
        _this.FN_BRA_CODE = "";
        _this.FN_TR_ID = "";
        _this.FN_TR_NO = "";
        _this.FN_TR_TYPE = "";
        _this.FN_TR_DATE = "";
        _this.FN_USER = "";
        _this.FN_TR_AMOUNT = "";
        _this.FN_TR_DESCA = "";
        _this.FN_TR_DESCE = "";
        _this.FN_VOUCHER_CODE = "";
        _this.INTEGRATE = false;
        _this.BASE_TABLE_NAME = "";
        _this.FN_POSTED = "";
        _this.Selected = false;
        return _this;
    }
    return G_LnkTrans;
}(SecurityClass));
var G_LnkTransVariable = /** @class */ (function (_super) {
    __extends(G_LnkTransVariable, _super);
    function G_LnkTransVariable() {
        var _this = _super.call(this) || this;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.TR_CODE = "";
        _this.VarType = "";
        _this.VarCode = "";
        _this.Var_DESCA = "";
        _this.Var_DESCE = "";
        _this.FN_VarExpression = "";
        _this.DataSource = "";
        return _this;
    }
    return G_LnkTransVariable;
}(SecurityClass));
var GQ_GetLnkTransVoucher = /** @class */ (function (_super) {
    __extends(GQ_GetLnkTransVoucher, _super);
    function GQ_GetLnkTransVoucher() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.TR_CODE = "";
        _this.SERIAL = 0;
        _this.VarCode = "";
        _this.ISDebit = false;
        _this.AccType = 0;
        _this.AccFixedCode = "";
        _this.AccVarCode = "";
        _this.AccBraCode = "";
        _this.CCType = 0;
        _this.CCFixedCode = "";
        _this.CCVarCode = "";
        _this.CCBraCode = "";
        _this.IsCollective = false;
        _this.Val_DesE = "";
        _this.Val_DescE = "";
        _this.VarAcc_DescA = "";
        _this.VarAcc_DescE = "";
        _this.VarCC_DescA = "";
        _this.VarCC_DescE = "";
        _this.FixAcc_DescA = "";
        _this.FixAcc_DescE = "";
        _this.Fixcc_DescA = "";
        _this.FixCC_DescE = "";
        _this.BrAcc_DescA = "";
        _this.BrAcc_DescE = "";
        _this.BrCC_DescA = "";
        _this.BrCC_DescE = "";
        _this.LineRemarkA = "";
        _this.LineRemarkE = "";
        return _this;
    }
    return GQ_GetLnkTransVoucher;
}(SecurityClass));
var G_LnkTrans_Temp = /** @class */ (function (_super) {
    __extends(G_LnkTrans_Temp, _super);
    function G_LnkTrans_Temp() {
        var _this = _super.call(this) || this;
        _this.ROW_ID = "";
        _this.User_Code = "";
        _this.TR_CODE = "";
        _this.COMP_CODE = 0;
        _this.BRA_CODE = 0;
        _this.SYSTEM_CODE = "";
        _this.SUB_SYSTEM_CODE = "";
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_TYPE = 0;
        _this.VOUCHER_SOURCE_TYPE = "";
        _this.TR_NO = 0;
        _this.TR_TYPE = "";
        _this.TR_DATE = "";
        _this.TR_AMOUNT = 0;
        _this.TR_DESCA = "";
        _this.TR_DESCE = "";
        _this.TR_USER_CODE = "";
        _this.VOUCHER_DESCA = "";
        _this.VOUCHER_DESCE = "";
        _this.IsSelected = false;
        _this.ROW_DATE = "";
        _this.FromDate = "";
        _this.ToDate = "";
        _this.FromTrNo = 0;
        _this.ToTrNo = 0;
        _this.IsGenerated = false;
        _this.GenRemarks = "";
        _this.IsGeneratedDesc = "";
        return _this;
    }
    return G_LnkTrans_Temp;
}(SecurityClass));
var GQ_GetLnkVoucherDetail = /** @class */ (function (_super) {
    __extends(GQ_GetLnkVoucherDetail, _super);
    function GQ_GetLnkVoucherDetail() {
        var _this = _super.call(this) || this;
        _this.Seq = 0;
        _this.User_Code = "";
        _this.SERIAL = 0;
        _this.COMP_CODE = 0;
        _this.BRANCH_CODE = 0;
        _this.ACC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.CC_CODE = "";
        _this.LINE_DESCA = "";
        _this.LINE_DESCE = "";
        _this.Tr_Code = "";
        _this.Tr_No = 0;
        _this.ROW_ID = 0;
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        return _this;
    }
    return GQ_GetLnkVoucherDetail;
}(SecurityClass));
var IQ_GetTransfer = /** @class */ (function (_super) {
    __extends(IQ_GetTransfer, _super);
    function IQ_GetTransfer() {
        var _this = _super.call(this) || this;
        _this.TransfareID = 0;
        _this.Tr_No = 0;
        _this.RefNO = "";
        _this.TrType = 0;
        _this.TFType = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.SenderBranchCode = 0;
        _this.ReceiverBranchCode = 0;
        _this.SenderStoreID = 0;
        _this.ReceiverStoreID = 0;
        _this.RequestTransferID = 0;
        _this.Remark = "";
        _this.SendTransferID = 0;
        _this.RequestedBy = "";
        _this.SendBy = "";
        _this.ReceivedBy = "";
        _this.VerfiedBy = "";
        _this.Total = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedBy = "";
        _this.UpdatedAt = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.IsSent = false;
        _this.IsReceived = false;
        _this.IsRequested = false;
        _this.SBr_DescA = "";
        _this.SBr_DescE = "";
        _this.SSt_DescA = "";
        _this.SSt_DescE = "";
        _this.SSt_Store_Code = 0;
        _this.RBr_DescA = "";
        _this.RBr_DescE = "";
        _this.RSt_DescA = "";
        _this.RSt_StoreCode = 0;
        _this.RSt_DescE = "";
        _this.IsSent_Desc = "";
        _this.IsReceived_Desc = "";
        _this.TrType_Desc = "";
        return _this;
    }
    return IQ_GetTransfer;
}(SecurityClass));
var IQ_GetTransferDetail = /** @class */ (function (_super) {
    __extends(IQ_GetTransferDetail, _super);
    function IQ_GetTransferDetail() {
        var _this = _super.call(this) || this;
        _this.TransfareDetailID = 0;
        _this.TransfareID = 0;
        _this.Serial = 0;
        _this.BarCode = "";
        _this.ItemID = 0;
        _this.SourceItemStoreBatchid = 0;
        _this.DestItemStoreBatchid = 0;
        _this.UnitCost = 0;
        _this.UnitID = 0;
        _this.ReqQty = 0;
        _this.SendQty = 0;
        _this.RecQty = 0;
        _this.StockReqQty = 0;
        _this.StockSendQty = 0;
        _this.StockRecQty = 0;
        _this.ItemCode = "";
        _this.Itm_DescA = "";
        _this.Itm_DescE = "";
        _this.FamilyCode = "";
        _this.ITFamly_DescA = "";
        _this.ITFamly_DescE = "";
        _this.SrcOhnandQty = 0;
        _this.RecOnhandQty = 0;
        _this.uom_DescA = "";
        _this.uom_DescE = "";
        _this.UomCode = "";
        return _this;
    }
    return IQ_GetTransferDetail;
}(SecurityClass));
var I_Stk_TR_Transfer = /** @class */ (function (_super) {
    __extends(I_Stk_TR_Transfer, _super);
    function I_Stk_TR_Transfer() {
        var _this = _super.call(this) || this;
        _this.TransfareID = 0;
        _this.Tr_No = 0;
        _this.RefNO = "";
        _this.TrType = 0;
        _this.TFType = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.SenderBranchCode = 0;
        _this.ReceiverBranchCode = 0;
        _this.SenderStoreID = 0;
        _this.ReceiverStoreID = 0;
        _this.RequestTransferID = 0;
        _this.SendTransferID = 0;
        _this.Remark = "";
        _this.RequestedBy = "";
        _this.SendBy = "";
        _this.ReceivedBy = "";
        _this.VerfiedBy = "";
        _this.Total = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.IsSent = false;
        _this.IsReceived = false;
        _this.IsRequested = false;
        return _this;
    }
    return I_Stk_TR_Transfer;
}(SecurityClass));
var I_Stk_TR_TransferDetails = /** @class */ (function (_super) {
    __extends(I_Stk_TR_TransferDetails, _super);
    function I_Stk_TR_TransferDetails() {
        var _this = _super.call(this) || this;
        _this.TransfareDetailID = 0;
        _this.TransfareID = 0;
        _this.Serial = 0;
        _this.BarCode = "";
        _this.ItemID = 0;
        _this.SourceItemStoreBatchid = 0;
        _this.DestItemStoreBatchid = 0;
        _this.UnitCost = 0;
        _this.UnitID = 0;
        _this.ReqQty = 0;
        _this.SendQty = 0;
        _this.RecQty = 0;
        _this.StockReqQty = 0;
        _this.StockSendQty = 0;
        _this.StockRecQty = 0;
        _this.StatusFlag = "";
        _this.SrcOhnandQty = 0;
        _this.RecOnhandQty = 0;
        return _this;
    }
    return I_Stk_TR_TransferDetails;
}(SecurityClass));
var DirectTransferMasterDetails = /** @class */ (function (_super) {
    __extends(DirectTransferMasterDetails, _super);
    function DirectTransferMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Stk_TR_Transfer = new I_Stk_TR_Transfer();
        _this.I_Stk_TR_TransferDetails = new Array();
        return _this;
    }
    return DirectTransferMasterDetails;
}(SecurityClass));
var IQ_DirectTransferWithDetail = /** @class */ (function (_super) {
    __extends(IQ_DirectTransferWithDetail, _super);
    function IQ_DirectTransferWithDetail() {
        var _this = _super.call(this) || this;
        _this.IQ_GetTransfer = new Array();
        _this.IQ_GetTransferDetail = new Array();
        return _this;
    }
    return IQ_DirectTransferWithDetail;
}(SecurityClass));
var I_Stk_TR_Adjust = /** @class */ (function (_super) {
    __extends(I_Stk_TR_Adjust, _super);
    function I_Stk_TR_Adjust() {
        var _this = _super.call(this) || this;
        _this.AdjustID = 0;
        _this.Tr_No = 0;
        _this.RefNO = "";
        _this.TrType = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.StoreID = 0;
        _this.Remark = "";
        _this.CountedBy = "";
        _this.VerfiedBy = "";
        _this.TotalCost = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.Status = 0;
        return _this;
    }
    return I_Stk_TR_Adjust;
}(SecurityClass));
var I_Stk_Tr_AdjustDetails = /** @class */ (function (_super) {
    __extends(I_Stk_Tr_AdjustDetails, _super);
    function I_Stk_Tr_AdjustDetails() {
        var _this = _super.call(this) || this;
        _this.AdjustDetailID = 0;
        _this.AdjustID = 0;
        _this.Serial = 0;
        _this.BarCode = "";
        _this.ItemID = 0;
        _this.ItemStoreBatchid = 0;
        _this.UnitID = 0;
        _this.CountQty = 0;
        _this.OnhandQty = 0;
        _this.UnitCost = 0;
        _this.NewUnitCost = 0;
        _this.StkUnitCost = 0;
        _this.NewStkUnitCost = 0;
        _this.StockCountedQty = 0;
        _this.StockOnhandQty = 0;
        _this.DiffQty = 0;
        _this.StockDiffQty = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return I_Stk_Tr_AdjustDetails;
}(SecurityClass));
var IQ_GetStkAdjust = /** @class */ (function (_super) {
    __extends(IQ_GetStkAdjust, _super);
    function IQ_GetStkAdjust() {
        var _this = _super.call(this) || this;
        _this.AdjustID = 0;
        _this.Tr_No = 0;
        _this.RefNO = "";
        _this.TrType = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.Remark = "";
        _this.StoreID = 0;
        _this.CountedBy = "";
        _this.TotalCost = 0;
        _this.VerfiedBy = "";
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.UpdatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.St_DEscA = "";
        _this.ST_DescE = "";
        _this.Type_DescA = "";
        _this.type_DescE = "";
        _this.Status = 0;
        _this.Status_Desc = "";
        return _this;
    }
    return IQ_GetStkAdjust;
}(SecurityClass));
var IQ_GetStkAdjustDetail = /** @class */ (function (_super) {
    __extends(IQ_GetStkAdjustDetail, _super);
    function IQ_GetStkAdjustDetail() {
        var _this = _super.call(this) || this;
        _this.AdjustDetailID = 0;
        _this.AdjustID = 0;
        _this.Serial = 0;
        _this.BarCode = "";
        _this.ItemID = 0;
        _this.ItemStoreBatchid = 0;
        _this.UnitID = 0;
        _this.CountQty = 0;
        _this.OnhandQty = 0;
        _this.UnitCost = 0;
        _this.NewUnitCost = 0;
        _this.StkUnitCost = 0;
        _this.NewStkUnitCost = 0;
        _this.StockCountedQty = 0;
        _this.StockOnhandQty = 0;
        _this.DiffQty = 0;
        _this.StockDiffQty = 0;
        _this.ItemCode = "";
        _this.itm_DescA = "";
        _this.itm_DescE = "";
        _this.CompCode = 0;
        _this.Uom_DescA = "";
        _this.UOM_DescE = "";
        _this.UomCode = "";
        return _this;
    }
    return IQ_GetStkAdjustDetail;
}(SecurityClass));
var StockAdjustMasterDetails = /** @class */ (function (_super) {
    __extends(StockAdjustMasterDetails, _super);
    function StockAdjustMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Stk_TR_Adjust = new I_Stk_TR_Adjust();
        _this.I_Stk_Tr_AdjustDetails = new Array();
        return _this;
    }
    return StockAdjustMasterDetails;
}(SecurityClass));
var IQ_GetStkAdjustWithDetail = /** @class */ (function (_super) {
    __extends(IQ_GetStkAdjustWithDetail, _super);
    function IQ_GetStkAdjustWithDetail() {
        var _this = _super.call(this) || this;
        _this.IQ_GetStkAdjust = new Array();
        _this.IQ_GetStkAdjustDetail = new Array();
        return _this;
    }
    return IQ_GetStkAdjustWithDetail;
}(SecurityClass));
var IQ_PurchaseOrderWithDetail = /** @class */ (function (_super) {
    __extends(IQ_PurchaseOrderWithDetail, _super);
    function IQ_PurchaseOrderWithDetail() {
        var _this = _super.call(this) || this;
        _this.IQ_GetPurchaseOrder = new Array();
        _this.IQ_GetPurchaseOrderDetail = new Array();
        return _this;
    }
    return IQ_PurchaseOrderWithDetail;
}(SecurityClass));
var PurchaseOrderMasterDetails = /** @class */ (function (_super) {
    __extends(PurchaseOrderMasterDetails, _super);
    function PurchaseOrderMasterDetails() {
        var _this = _super.call(this) || this;
        _this.I_Pur_Tr_PurchaseOrder = new I_Pur_Tr_PurchaseOrder();
        _this.I_Pur_Tr_PurchaseOrderDetail = new Array();
        return _this;
    }
    return PurchaseOrderMasterDetails;
}(SecurityClass));
var I_TR_OperationTF = /** @class */ (function (_super) {
    __extends(I_TR_OperationTF, _super);
    function I_TR_OperationTF() {
        var _this = _super.call(this) || this;
        _this.OperationTFID = 0;
        _this.Tr_No = 0;
        _this.TrType = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.OperationID = 0;
        _this.FromSalesmanID = 0;
        _this.ToSalesmanID = 0;
        _this.Remark = "";
        _this.RequestedBy = "";
        _this.SendBy = "";
        _this.ReceivedBy = "";
        _this.VerfiedBy = "";
        _this.Total = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.IsSent = false;
        _this.IsReceived = false;
        _this.IsRequested = false;
        return _this;
    }
    return I_TR_OperationTF;
}(SecurityClass));
var IQ_GetOperationTF = /** @class */ (function (_super) {
    __extends(IQ_GetOperationTF, _super);
    function IQ_GetOperationTF() {
        var _this = _super.call(this) || this;
        _this.OperationTFID = 0;
        _this.Tr_No = 0;
        _this.TrType = 0;
        _this.RefNO = "";
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.OperationID = 0;
        _this.FromSalesmanID = 0;
        _this.ToSalesmanID = 0;
        _this.Remark = "";
        _this.RequestedBy = "";
        _this.SendBy = "";
        _this.ReceivedBy = "";
        _this.VerfiedBy = "";
        _this.IsPosted = false;
        _this.Total = 0;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.IsSent = false;
        _this.IsReceived = false;
        _this.IsRequested = false;
        _this.Op_TRNo = 0;
        _this.Op_RefNo = "";
        _this.Op_TrDate = "";
        _this.Op_TruckNo = "";
        _this.Op_VendorCode = "";
        _this.Vnd_nameA = "";
        _this.Vnd_NameE = "";
        _this.Op_Status = 0;
        _this.FromSls_Code = "";
        _this.FromSls_NameA = "";
        _this.FromSls_NameE = "";
        _this.ToSls_Code = "";
        _this.ToSls_NameA = "";
        _this.Tosls_NameE = "";
        _this.IsSent_Desc = "";
        _this.TrType_Desc = "";
        return _this;
    }
    return IQ_GetOperationTF;
}(SecurityClass));
var IQ_GetOperationTFDetail = /** @class */ (function (_super) {
    __extends(IQ_GetOperationTFDetail, _super);
    function IQ_GetOperationTFDetail() {
        var _this = _super.call(this) || this;
        _this.OperationTFDetailID = 0;
        _this.OperationTFID = 0;
        _this.OperationItemID = 0;
        _this.ItemID = 0;
        _this.SendQty = 0;
        _this.RecQty = 0;
        _this.ItemCode = "";
        _this.IT_DescA = "";
        _this.IT_DescE = "";
        _this.FamilyCode = "";
        _this.FamDescA = "";
        _this.Fam_DescE = "";
        return _this;
    }
    return IQ_GetOperationTFDetail;
}(SecurityClass));
var IQ_GetOPerationTransferWithDetail = /** @class */ (function (_super) {
    __extends(IQ_GetOPerationTransferWithDetail, _super);
    function IQ_GetOPerationTransferWithDetail() {
        var _this = _super.call(this) || this;
        _this.IQ_GetOperationTF = new Array();
        _this.IQ_GetOperationTFDetail = new Array();
        return _this;
    }
    return IQ_GetOPerationTransferWithDetail;
}(SecurityClass));
var OPerationSalesmanTransferWithDetail = /** @class */ (function (_super) {
    __extends(OPerationSalesmanTransferWithDetail, _super);
    function OPerationSalesmanTransferWithDetail() {
        var _this = _super.call(this) || this;
        _this.I_TR_OperationTF = new I_TR_OperationTF();
        _this.I_TR_OperationTFDetail = new Array();
        return _this;
    }
    return OPerationSalesmanTransferWithDetail;
}(SecurityClass));
var AVAT_CONTROL = /** @class */ (function (_super) {
    __extends(AVAT_CONTROL, _super);
    function AVAT_CONTROL() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VAT_YEAR = 0;
        _this.VAT_SETTING = false;
        _this.VAT_PERIOD = 0;
        _this.VAT_START_DATE = "";
        _this.VAT_END_DATE = "";
        _this.VAT_CR_ACC = "";
        _this.VAT_DB_ACC = "";
        _this.VAT_ACCURUAL_ACC = "";
        _this.VAT_WARNING_DAYS = 0;
        _this.VAT_ALLOWED_DAYS = 0;
        _this.VAT_PREVBAL = 0;
        return _this;
    }
    return AVAT_CONTROL;
}(SecurityClass));
var A_Rec_D_Customer = /** @class */ (function (_super) {
    __extends(A_Rec_D_Customer, _super);
    function A_Rec_D_Customer() {
        var _this = _super.call(this) || this;
        _this.CustomerId = 0;
        _this.CustomerCODE = "";
        _this.CatID = 0;
        _this.GroupId = 0;
        _this.NAMEA = "";
        _this.NAMEE = "";
        _this.SHORTNAME = "";
        _this.TEL = "";
        _this.FAX = "";
        _this.EMAIL = "";
        _this.CURCODE = "";
        _this.REMARKS = "";
        _this.STATUS = false;
        _this.MOBILE = "";
        _this.Bank = "";
        _this.AccountNo = "";
        _this.ManagerName = "";
        _this.NationalityID = 0;
        _this.BranchCode = 0;
        _this.CompCode = 0;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.Employer = "";
        _this.JobName = "";
        _this.WorkTel = "";
        _this.WorkAddress = "";
        _this.VATType = 0;
        _this.AddDedType = 0;
        _this.AddDedNo = "";
        _this.VatNo = "";
        _this.Isactive = false;
        _this.IsAuthorized = false;
        _this.CreditLimit = 0;
        _this.CreditLimitFC = 0;
        _this.CreditPeriod = 0;
        _this.OpenBalanceFC = 0;
        _this.Openbalance = 0;
        _this.Debit = 0;
        _this.DebitFC = 0;
        _this.Credit = 0;
        _this.CreditFC = 0;
        _this.PaymentType = 0;
        _this.FCRate = 0;
        _this.CreditExpiryDate = "";
        _this.RefCode2 = "";
        _this.RefCode1 = "";
        _this.IsCreditCustomer = false;
        _this.DiscountplanID = 0;
        _this.SalesmanId = 0;
        _this.Address_postal = "";
        _this.Address_Province = "";
        _this.GroupVatNo = "";
        _this.Address_Street = "";
        _this.Address_Str_Additional = "";
        _this.Address_BuildingNo = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_District = "";
        return _this;
    }
    return A_Rec_D_Customer;
}(SecurityClass));
var A_Rec_D_CustomerDoc = /** @class */ (function (_super) {
    __extends(A_Rec_D_CustomerDoc, _super);
    function A_Rec_D_CustomerDoc() {
        var _this = _super.call(this) || this;
        _this.CustomerDocID = 0;
        _this.CustomerId = 0;
        _this.CusIDTypeCode = 0;
        _this.IDNo = "";
        _this.IDIssuePlace = "";
        _this.IDIssueDate = "";
        _this.IDIssueDateH = "";
        _this.IDExpireDate = "";
        _this.IDExpireDateH = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_Rec_D_CustomerDoc;
}(SecurityClass));
var A_Pay_D_Vendor = /** @class */ (function (_super) {
    __extends(A_Pay_D_Vendor, _super);
    function A_Pay_D_Vendor() {
        var _this = _super.call(this) || this;
        _this.VendorID = 0;
        _this.CompCode = 0;
        _this.VendorCode = "";
        _this.CatID = 0;
        _this.GroupId = 0;
        _this.NAMEA = "";
        _this.NAMEL = "";
        _this.SHORTNAMEA = "";
        _this.SHORTNAMEL = "";
        _this.NationalityID = 0;
        _this.RespPersonName = "";
        _this.RespPersonMobile = "";
        _this.TEL = "";
        _this.WorkTel = "";
        _this.MOBILE = 0;
        _this.EMAIL = "";
        _this.CURCODE = "";
        _this.PurchaserId = 0;
        _this.OnPurchaserAcc = false;
        _this.AccVendorID = 0;
        _this.PaymentType = 0;
        _this.DebitLimit = 0;
        _this.DebitLimitFC = 0;
        _this.DebitPeriod = 0;
        _this.OpenBalanceFC = 0;
        _this.Openbalance = 0;
        _this.Debit = 0;
        _this.DebitFC = 0;
        _this.Credit = 0;
        _this.CreditFC = 0;
        _this.Isactive = false;
        _this.FCRate = 0;
        _this.REMARKS = "";
        _this.STATUS = 0;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.VendorType = 0;
        _this.Bank = "";
        _this.BankAccountNo = "";
        _this.TaxFileNo = "";
        _this.TaxIssuePlace = "";
        _this.VATType = 0;
        _this.AddDedType = 0;
        _this.VATNo = "";
        _this.AddDedNo = "";
        _this.IsWebEnabled = false;
        _this.WebUserName = "";
        _this.WebPassword = "";
        _this.IsCreditVendor = false;
        _this.IDNo = "";
        _this.Address_postal = "";
        _this.Address_Province = "";
        _this.GroupVatNo = "";
        _this.Address_Street = "";
        _this.Address_Str_Additional = "";
        _this.Address_BuildingNo = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_District = "";
        _this.OperationFixed = "";
        _this.OperationSer = "";
        return _this;
    }
    return A_Pay_D_Vendor;
}(SecurityClass));
var A_Pay_D_VendorDoc = /** @class */ (function (_super) {
    __extends(A_Pay_D_VendorDoc, _super);
    function A_Pay_D_VendorDoc() {
        var _this = _super.call(this) || this;
        _this.VendorDocID = 0;
        _this.VendorId = 0;
        _this.VndIDTypeCode = 0;
        _this.IDNo = "";
        _this.IDIssuePlace = "";
        _this.IDIssueDate = "";
        _this.IDIssueDateH = "";
        _this.IDExpireDate = "";
        _this.IDExpireDateH = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_Pay_D_VendorDoc;
}(SecurityClass));
var G_Codes = /** @class */ (function (_super) {
    __extends(G_Codes, _super);
    function G_Codes() {
        var _this = _super.call(this) || this;
        _this.ID = 0;
        _this.CodeType = "";
        _this.CodeValue = 0;
        _this.DescA = "";
        _this.DescE = "";
        _this.SubCode = "";
        _this.Remarks = "";
        _this.StdCode = "";
        return _this;
    }
    return G_Codes;
}(SecurityClass));
var IQ_GetCustomer = /** @class */ (function (_super) {
    __extends(IQ_GetCustomer, _super);
    function IQ_GetCustomer() {
        var _this = _super.call(this) || this;
        _this.CustomerId = 0;
        _this.CustomerCODE = "";
        _this.CatID = 0;
        _this.GroupId = 0;
        _this.NAMEA = "";
        _this.NAMEE = "";
        _this.SHORTNAME = "";
        _this.TEL = "";
        _this.FAX = "";
        _this.EMAIL = "";
        _this.CURCODE = "";
        _this.REMARKS = "";
        _this.STATUS = false;
        _this.MOBILE = "";
        _this.Bank = "";
        _this.AccountNo = "";
        _this.ManagerName = "";
        _this.NationalityID = 0;
        _this.BranchCode = 0;
        _this.CompCode = 0;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.Employer = "";
        _this.JobName = "";
        _this.WorkTel = "";
        _this.WorkAddress = "";
        _this.VATType = 0;
        _this.AddDedType = 0;
        _this.AddDedNo = "";
        _this.VatNo = "";
        _this.Isactive = false;
        _this.IsAuthorized = false;
        _this.CreditLimit = 0;
        _this.CreditLimitFC = 0;
        _this.CreditPeriod = 0;
        _this.OpenBalanceFC = 0;
        _this.Openbalance = 0;
        _this.Debit = 0;
        _this.DebitFC = 0;
        _this.Credit = 0;
        _this.CreditFC = 0;
        _this.PaymentType = 0;
        _this.FCRate = 0;
        _this.CreditExpiryDate = "";
        _this.RefCode2 = "";
        _this.RefCode1 = "";
        _this.IsCreditCustomer = false;
        _this.DiscountplanID = 0;
        _this.SalesmanId = 0;
        _this.SalesmanCode = "";
        _this.Sls_NameA = "";
        _this.Sls_NameE = "";
        _this.CatCode = "";
        _this.Cat_DescA = "";
        _this.Cat_DescE = "";
        _this.GroupCode = "";
        _this.Group_DescA = "";
        _this.Group_DescE = "";
        _this.Balance = 0;
        _this.Address_postal = "";
        _this.Address_Province = "";
        _this.GroupVatNo = "";
        _this.Address_Street = "";
        _this.Address_Str_Additional = "";
        _this.Address_BuildingNo = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_District = "";
        return _this;
    }
    return IQ_GetCustomer;
}(SecurityClass));
var IQ_GetVendor = /** @class */ (function (_super) {
    __extends(IQ_GetVendor, _super);
    function IQ_GetVendor() {
        var _this = _super.call(this) || this;
        _this.VendorID = 0;
        _this.CatID = 0;
        _this.GroupId = 0;
        _this.NAMEA = "";
        _this.TEL = "";
        _this.EMAIL = "";
        _this.CURCODE = "";
        _this.REMARKS = "";
        _this.STATUS = 0;
        _this.MOBILE = 0;
        _this.Bank = "";
        _this.NationalityID = 0;
        _this.IDNo = "";
        _this.CompCode = 0;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_AT = "";
        _this.UPDATED_BY = "";
        _this.WorkTel = "";
        _this.VATType = 0;
        _this.AddDedType = 0;
        _this.AddDedNo = "";
        _this.VATNo = "";
        _this.Isactive = false;
        _this.OpenBalanceFC = 0;
        _this.Openbalance = 0;
        _this.Debit = 0;
        _this.DebitFC = 0;
        _this.Credit = 0;
        _this.CreditFC = 0;
        _this.PaymentType = 0;
        _this.FCRate = 0;
        _this.CatCode = "";
        _this.Cat_DescA = "";
        _this.Cat_DescE = "";
        _this.GroupCode = "";
        _this.Group_DescA = "";
        _this.Group_DescE = "";
        _this.Balance = 0;
        _this.VendorCode = "";
        _this.NAMEL = "";
        _this.SHORTNAMEA = "";
        _this.SHORTNAMEL = "";
        _this.RespPersonName = "";
        _this.RespPersonMobile = "";
        _this.PurchaserId = 0;
        _this.OnPurchaserAcc = false;
        _this.AccVendorID = 0;
        _this.DebitLimit = 0;
        _this.DebitPeriod = 0;
        _this.DebitLimitFC = 0;
        _this.BankAccountNo = "";
        _this.TaxFileNo = "";
        _this.TaxIssuePlace = "";
        _this.IsCreditVendor = false;
        _this.WebPassword = "";
        _this.WebUserName = "";
        _this.IsWebEnabled = false;
        _this.VendorType = 0;
        _this.Type_DescA = "";
        _this.Type_DescE = "";
        _this.Address_postal = "";
        _this.Address_Province = "";
        _this.GroupVatNo = "";
        _this.Address_Street = "";
        _this.Address_BuildingNo = "";
        _this.Address_Str_Additional = "";
        _this.Address_Build_Additional = "";
        _this.Address_City = "";
        _this.Address_District = "";
        return _this;
    }
    return IQ_GetVendor;
}(SecurityClass));
var AQ_GetVendorDoc = /** @class */ (function (_super) {
    __extends(AQ_GetVendorDoc, _super);
    function AQ_GetVendorDoc() {
        var _this = _super.call(this) || this;
        _this.VendorDocID = 0;
        _this.VendorId = 0;
        _this.VndIDTypeCode = 0;
        _this.IDNo = "";
        _this.IDIssuePlace = "";
        _this.IDIssueDate = "";
        _this.IDIssueDateH = "";
        _this.IDExpireDate = "";
        _this.IDExpireDateH = "";
        _this.Doc_DescA = "";
        _this.Doc_DescE = "";
        _this.Doc_StdCode = "";
        return _this;
    }
    return AQ_GetVendorDoc;
}(SecurityClass));
var AQ_GetCustomerDoc = /** @class */ (function (_super) {
    __extends(AQ_GetCustomerDoc, _super);
    function AQ_GetCustomerDoc() {
        var _this = _super.call(this) || this;
        _this.CustomerDocID = 0;
        _this.CustomerId = 0;
        _this.CusIDTypeCode = 0;
        _this.IDNo = "";
        _this.IDIssuePlace = "";
        _this.IDIssueDateH = "";
        _this.IDIssueDate = "";
        _this.IDExpireDate = "";
        _this.IDExpireDateH = "";
        _this.Doc_DescA = "";
        _this.Doc_DescE = "";
        _this.Doc_StdCode = "";
        return _this;
    }
    return AQ_GetCustomerDoc;
}(SecurityClass));
var IQ_GetItemCategory = /** @class */ (function (_super) {
    __extends(IQ_GetItemCategory, _super);
    function IQ_GetItemCategory() {
        var _this = _super.call(this) || this;
        _this.CatID = 0;
        _this.CompCode = 0;
        _this.CatCode = "";
        _this.DescA = "";
        _this.DescL = "";
        _this.CatLevel = 0;
        _this.ParentCatId = 0;
        _this.IsDetail = false;
        _this.UnitGrpID = 0;
        _this.IsAutoGenerateItem = false;
        _this.ItemFormatFix = "";
        _this.ItemFormatSerial = "";
        _this.ItemTypeID = 0;
        _this.CostMethodID = 0;
        _this.StockMethodID = 0;
        _this.IssueFromCenteralStore = false;
        _this.CenteralStoreCode = 0;
        _this.IsAdditionalSpecs = false;
        _this.AdditionalspcsDescA = "";
        _this.AdditionalspcsDescL = "";
        _this.ISSales = false;
        _this.IsStock = false;
        _this.IsProduct = false;
        _this.IsIssuetoCC = false;
        _this.IsIssueToProd = false;
        _this.IsPurchase = false;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.VatNatID = 0;
        _this.VatNatureCode = "";
        _this.VatNatureDescA = "";
        _this.VatNatureDescE = "";
        _this.VatPrc = 0;
        return _this;
    }
    return IQ_GetItemCategory;
}(SecurityClass));
var IQVendorMasterDetail = /** @class */ (function (_super) {
    __extends(IQVendorMasterDetail, _super);
    function IQVendorMasterDetail() {
        var _this = _super.call(this) || this;
        _this.IQ_GetVendor = new Array();
        _this.AQ_GetVendorDoc = new Array();
        return _this;
    }
    return IQVendorMasterDetail;
}(SecurityClass));
var VendorMasterDetail = /** @class */ (function (_super) {
    __extends(VendorMasterDetail, _super);
    function VendorMasterDetail() {
        var _this = _super.call(this) || this;
        _this.A_Pay_D_Vendor = new A_Pay_D_Vendor();
        _this.A_Pay_D_VendorDoc = new Array();
        return _this;
    }
    return VendorMasterDetail;
}(SecurityClass));
var G_Currency = /** @class */ (function (_super) {
    __extends(G_Currency, _super);
    function G_Currency() {
        var _this = _super.call(this) || this;
        _this.CurrencyID = 0;
        _this.CurrencyCode = "";
        _this.DescA = "";
        _this.DescL = "";
        _this.Remarks = "";
        return _this;
    }
    return G_Currency;
}(SecurityClass));
var AQVAT_GetService = /** @class */ (function (_super) {
    __extends(AQVAT_GetService, _super);
    function AQVAT_GetService() {
        var _this = _super.call(this) || this;
        _this.Itemid = 0;
        _this.ItemCode = "";
        _this.Itm_DescA = "";
        _this.Itm_DescE = "";
        _this.CompCode = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.Uom_DescA = "";
        _this.Uom_DescE = "";
        _this.VatPrc = 0;
        _this.VatNatID = 0;
        _this.SrvCategoryID = 0;
        _this.UnitPrice = 0;
        _this.UomID = 0;
        _this.UomCode = "";
        _this.CAT_CODE = "";
        _this.Cat_DescA = "";
        _this.cat_DescE = "";
        _this.VatNatureCode = "";
        _this.VatNatureDescA = "";
        _this.VatNatureDescE = "";
        _this.RefItemCode = "";
        _this.OldItemCode = "";
        _this.VndItemCode = "";
        _this.IsPurchase = false;
        return _this;
    }
    return AQVAT_GetService;
}(SecurityClass));
var AVAT_D_Service = /** @class */ (function (_super) {
    __extends(AVAT_D_Service, _super);
    function AVAT_D_Service() {
        var _this = _super.call(this) || this;
        _this.Itemid = 0;
        _this.SrvCategoryID = 0;
        _this.ItemCode = "";
        _this.CompCode = 0;
        _this.DescA = "";
        _this.DescL = "";
        _this.UnitPrice = 0;
        _this.Remarks = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.UomID = 0;
        _this.RefItemCode = "";
        _this.OldItemCode = "";
        _this.VndItemCode = "";
        return _this;
    }
    return AVAT_D_Service;
}(SecurityClass));
var AVAT_TR_SlsInvoice = /** @class */ (function (_super) {
    __extends(AVAT_TR_SlsInvoice, _super);
    function AVAT_TR_SlsInvoice() {
        var _this = _super.call(this) || this;
        _this.InvoiceID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SlsInvType = 0;
        _this.SlsInvSrc = 0;
        _this.CustomerId = 0;
        _this.CustomerName = "";
        _this.CustomerMobileNo = "";
        _this.SalesmanId = 0;
        _this.TotalAmount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.DiscountAmount = 0;
        _this.DiscountPrc = 0;
        _this.NetAfterVat = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankTfAmount = 0;
        _this.BankAccount = "";
        _this.TotalPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.TrTime = "";
        _this.InvoiceTypeCode = 0;
        _this.InvoiceTransCode = 0;
        _this.TaxNotes = "";
        _this.TaxCurrencyID = 0;
        _this.InvoiceCurrenyID = 0;
        _this.ContractNo = "";
        _this.PurchaseorderNo = "";
        _this.GlobalInvoiceCounter = 0;
        _this.PrevInvoiceHash;
        _this.QRCode;
        _this.CryptographicStamp;
        _this.DeliveryDate = "";
        _this.DeliveryEndDate = "";
        _this.PaymentMeansTypeCode = 0;
        _this.CRDBReasoncode = 0;
        _this.PaymentTerms = "";
        _this.PaymentTermsID = 0;
        _this.AllowAmount = 0;
        _this.AllowPrc = 0;
        _this.AllowBase = 0;
        _this.AllowVatNatID = 0;
        _this.AllowVatPrc = 0;
        _this.AllowAfterVat = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.ItemTotal = 0;
        _this.ItemAllowTotal = 0;
        _this.ItemDiscountTotal = 0;
        _this.ItemVatTotal = 0;
        _this.RoundingAmount = 0;
        return _this;
    }
    return AVAT_TR_SlsInvoice;
}(SecurityClass));
var AVAT_TR_SlsInvoiceItem = /** @class */ (function (_super) {
    __extends(AVAT_TR_SlsInvoiceItem, _super);
    function AVAT_TR_SlsInvoiceItem() {
        var _this = _super.call(this) || this;
        _this.InvoiceItemID = 0;
        _this.InvoiceID = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.InvoiceSoldQty = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.VatApplied = 0;
        _this.TotRetQty = 0;
        _this.Serial = 0;
        _this.AllowAmount = 0;
        _this.AllowancePrc = 0;
        _this.AllowanceBase = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.BaseQty = 0;
        _this.BaseQtyUomid = 0;
        _this.BaseQtyPrice = 0;
        _this.BaseQtyDiscount = 0;
        _this.DiscountPrcBase = 0;
        _this.DiscountVatNatID = 0;
        _this.Discountreason = "";
        _this.DiscountCode = 0;
        _this.ItemNetAmount = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.VatNatID = 0;
        _this.CC_CODE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return AVAT_TR_SlsInvoiceItem;
}(SecurityClass));
var AQVAT_GetSlsInvoiceItem = /** @class */ (function (_super) {
    __extends(AQVAT_GetSlsInvoiceItem, _super);
    function AQVAT_GetSlsInvoiceItem() {
        var _this = _super.call(this) || this;
        _this.InvoiceItemID = 0;
        _this.InvoiceID = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.VatApplied = 0;
        _this.TotRetQty = 0;
        _this.it_itemCode = "";
        _this.it_DescA = "";
        _this.CompCode = 0;
        _this.It_DescE = "";
        _this.Uom_Code = "";
        _this.Uom_DescA = "";
        _this.Uom_DescE = "";
        _this.InvoiceSoldQty = 0;
        _this.Serial = 0;
        _this.AllowAmount = 0;
        _this.AllowancePrc = 0;
        _this.AllowanceBase = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.BaseQty = 0;
        _this.BaseQtyUomid = 0;
        _this.BaseQtyPrice = 0;
        _this.BaseQtyDiscount = 0;
        _this.DiscountPrcBase = 0;
        _this.DiscountVatNatID = 0;
        _this.Discountreason = "";
        _this.DiscountCode = 0;
        _this.ItemNetAmount = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.VatNatID = 0;
        _this.CC_CODE = "";
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        _this.Cat_DescA = "";
        _this.cat_DescE = "";
        _this.CAT_CODE = "";
        return _this;
    }
    return AQVAT_GetSlsInvoiceItem;
}(SecurityClass));
var AQVAT_GetSlsInvoiceList = /** @class */ (function (_super) {
    __extends(AQVAT_GetSlsInvoiceList, _super);
    function AQVAT_GetSlsInvoiceList() {
        var _this = _super.call(this) || this;
        _this.InvoiceID = 0;
        _this.TrNo = 0;
        _this.RefNO = "";
        _this.RefTrID = 0;
        _this.TrDate = "";
        _this.TrDateH = "";
        _this.TrType = 0;
        _this.IsCash = false;
        _this.SlsInvType = 0;
        _this.SlsInvSrc = 0;
        _this.CustomerId = 0;
        _this.CustomerName = "";
        _this.CustomerMobileNo = "";
        _this.SalesmanId = 0;
        _this.TotalAmount = 0;
        _this.VatAmount = 0;
        _this.VatType = 0;
        _this.DiscountAmount = 0;
        _this.DiscountPrc = 0;
        _this.NetAfterVat = 0;
        _this.CashAmount = 0;
        _this.CardAmount = 0;
        _this.BankTfAmount = 0;
        _this.BankAccount = "";
        _this.TotalPaidAmount = 0;
        _this.RemainAmount = 0;
        _this.Remark = "";
        _this.Status = 0;
        _this.IsPosted = false;
        _this.VoucherNo = 0;
        _this.VoucherType = 0;
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.Slsm_Code = "";
        _this.Slsm_DescA = "";
        _this.Slsm_DescE = "";
        _this.Cus_Code = "";
        _this.Cus_NameA = "";
        _this.Cus_NameE = "";
        _this.DocNo = "";
        _this.DocUUID = "";
        _this.TrTime = "";
        _this.InvoiceTypeCode = 0;
        _this.InvoiceTransCode = 0;
        _this.TaxNotes = "";
        _this.TaxCurrencyID = 0;
        _this.InvoiceCurrenyID = 0;
        _this.ContractNo = "";
        _this.PurchaseorderNo = "";
        _this.GlobalInvoiceCounter = 0;
        _this.PrevInvoiceHash;
        _this.QRCode;
        _this.CryptographicStamp;
        _this.DeliveryDate = "";
        _this.DeliveryEndDate = "";
        _this.PaymentMeansTypeCode = 0;
        _this.CRDBReasoncode = 0;
        _this.PaymentTerms = "";
        _this.PaymentTermsID = 0;
        _this.AllowAmount = 0;
        _this.AllowPrc = 0;
        _this.AllowBase = 0;
        _this.AllowVatNatID = 0;
        _this.AllowVatPrc = 0;
        _this.AllowAfterVat = 0;
        _this.AllowReason = "";
        _this.AllowCode = 0;
        _this.ChargeAmount = 0;
        _this.ChargePrc = 0;
        _this.ChargeBase = 0;
        _this.ChargeVatNatID = 0;
        _this.ChargeVatPrc = 0;
        _this.ChargeAfterVat = 0;
        _this.ChargeReason = "";
        _this.ChargeCode = 0;
        _this.ItemTotal = 0;
        _this.ItemAllowTotal = 0;
        _this.ItemDiscountTotal = 0;
        _this.ItemVatTotal = 0;
        _this.RoundingAmount = 0;
        _this.RetInv_TrNo = 0;
        _this.statusDesciption = "";
        _this.IsCashDesciption = "";
        _this.RetInv_DocNo = "";
        return _this;
    }
    return AQVAT_GetSlsInvoiceList;
}(SecurityClass));
var AQVAT_GetPurReturnDetail = /** @class */ (function () {
    function AQVAT_GetPurReturnDetail() {
        this.InvoiceDetailID = 0;
        this.TR_SERIAL = 0;
        this.Itemid = 0;
        this.UomID = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatApplied = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.REMARK = "";
        this.ACTUAL_DATE = "";
        this.QTY_RET = 0;
        this.CC_CODE = "";
        this.CCDT_CODE = "";
        this.VatNatID = 0;
        this.VatNatureCode = "";
        this.VatNatureDescA = "";
        this.VatNatureDescE = "";
        this.CC_DESCA = "";
        this.CC_DESCE = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.UomCode = "";
        this.ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescE = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.InvoiceRetID = 0;
        this.InvoiceRetDetailid = 0;
        this.QTY_SOLD = 0;
    }
    return AQVAT_GetPurReturnDetail;
}());
var AQ_ServSlsInvoiceMasterDetails = /** @class */ (function (_super) {
    __extends(AQ_ServSlsInvoiceMasterDetails, _super);
    function AQ_ServSlsInvoiceMasterDetails() {
        var _this = _super.call(this) || this;
        _this.AQVAT_GetSlsInvoiceList = new Array();
        _this.AQVAT_GetSlsInvoiceItem = new Array();
        return _this;
    }
    return AQ_ServSlsInvoiceMasterDetails;
}(SecurityClass));
var ServSlsInvoiceMasterDetails = /** @class */ (function (_super) {
    __extends(ServSlsInvoiceMasterDetails, _super);
    function ServSlsInvoiceMasterDetails() {
        var _this = _super.call(this) || this;
        _this.AVAT_TR_SlsInvoice = new AVAT_TR_SlsInvoice();
        _this.AVAT_TR_SlsInvoiceItem = new Array();
        return _this;
    }
    return ServSlsInvoiceMasterDetails;
}(SecurityClass));
var AQVAT_GetPurInvoiceHeader = /** @class */ (function (_super) {
    __extends(AQVAT_GetPurInvoiceHeader, _super);
    function AQVAT_GetPurInvoiceHeader() {
        var _this = _super.call(this) || this;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.COMPCODE = 0;
        _this.BranchCode = 0;
        _this.Ref_No = "";
        _this.DocNo = "";
        _this.VND_SERIAL = 0;
        _this.VendorID = 0;
        _this.TR_TYPE = 0;
        _this.VENDOR_NAME = "";
        _this.TOTAL = 0;
        _this.DISCOUNT = 0;
        _this.PAID = 0;
        _this.Vat = 0;
        _this.NetATax = 0;
        _this.VatApplied = false;
        _this.VndVatType = 0;
        _this.VatPrc = 0;
        _this.SalesType = 0;
        _this.PAY_ACC_CODE = "";
        _this.REMARK = "";
        _this.InvoiceDate = "";
        _this.CCDT_CODE = "";
        _this.VendorCode = "";
        _this.vnd_NameA = "";
        _this.Vnd_NameE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        return _this;
    }
    return AQVAT_GetPurInvoiceHeader;
}(SecurityClass));
var AQVAT_GetPurInvoiceDetail = /** @class */ (function (_super) {
    __extends(AQVAT_GetPurInvoiceDetail, _super);
    function AQVAT_GetPurInvoiceDetail() {
        var _this = _super.call(this) || this;
        _this.InvoiceDetailID = 0;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.TR_SERIAL = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatApplied = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.REMARK = "";
        _this.ACTUAL_DATE = "";
        _this.QTY_RET = 0;
        _this.CC_CODE = "";
        _this.CCDT_CODE = "";
        _this.VatNatID = 0;
        _this.VatNatureCode = "";
        _this.VatNatureDescA = "";
        _this.VatNatureDescE = "";
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        _this.uom_DescA = "";
        _this.uom_DescE = "";
        _this.UomCode = "";
        _this.ItemCode = "";
        _this.itm_DescA = "";
        _this.itm_DescE = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.VND_SERIAL = 0;
        return _this;
    }
    return AQVAT_GetPurInvoiceDetail;
}(SecurityClass));
var AVAT_TR_PurInvoice = /** @class */ (function (_super) {
    __extends(AVAT_TR_PurInvoice, _super);
    function AVAT_TR_PurInvoice() {
        var _this = _super.call(this) || this;
        _this.InvoiceId = 0;
        _this.TR_NO = 0;
        _this.DocNo = "";
        _this.TR_DATE = "";
        _this.PERSON = "";
        _this.TOTAL = 0;
        _this.DISCOUNT = 0;
        _this.PAID = 0;
        _this.JOURNAL_NO = 0;
        _this.JOURNAL_RET_NO = 0;
        _this.CLOSED = false;
        _this.CANCEL = false;
        _this.Remark = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.IsPosted = false;
        _this.ACTUAL_DATE = "";
        _this.PrntNo = "";
        _this.Ref_No = "";
        _this.Vat = 0;
        _this.NetATax = 0;
        _this.InvoiceDate = "";
        _this.ImportInvoice = false;
        _this.CCDT_CODE = "";
        _this.ImportInvoiceDesc = "";
        _this.CLOSEDDesc = "";
        return _this;
    }
    return AVAT_TR_PurInvoice;
}(SecurityClass));
var AVAT_TR_PurInvoiceDetail = /** @class */ (function (_super) {
    __extends(AVAT_TR_PurInvoiceDetail, _super);
    function AVAT_TR_PurInvoiceDetail() {
        var _this = _super.call(this) || this;
        _this.InvoiceDetailID = 0;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.TR_SERIAL = 0;
        _this.ItemID = 0;
        _this.UomID = 0;
        _this.SoldQty = 0;
        _this.Unitprice = 0;
        _this.DiscountPrc = 0;
        _this.DiscountAmount = 0;
        _this.NetUnitPrice = 0;
        _this.ItemTotal = 0;
        _this.VatApplied = 0;
        _this.VatPrc = 0;
        _this.VatAmount = 0;
        _this.NetAfterVat = 0;
        _this.REMARK = "";
        _this.ACTUAL_DATE = "";
        _this.QTY_RET = 0;
        _this.CC_CODE = "";
        _this.CCDT_CODE = "";
        _this.VatNatID = 0;
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.VND_SERIAL = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return AVAT_TR_PurInvoiceDetail;
}(SecurityClass));
var AVAT_TR_PurInvoiceHeader = /** @class */ (function (_super) {
    __extends(AVAT_TR_PurInvoiceHeader, _super);
    function AVAT_TR_PurInvoiceHeader() {
        var _this = _super.call(this) || this;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.Ref_No = "";
        _this.DocNo = "";
        _this.VND_SERIAL = 0;
        _this.VendorID = 0;
        _this.TR_TYPE = 0;
        _this.VENDOR_NAME = "";
        _this.TOTAL = 0;
        _this.DISCOUNT = 0;
        _this.PAID = 0;
        _this.Vat = 0;
        _this.NetATax = 0;
        _this.VatApplied = false;
        _this.VndVatType = 0;
        _this.VatPrc = 0;
        _this.SalesType = 0;
        _this.PAY_ACC_CODE = "";
        _this.REMARK = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.InvoiceDate = "";
        _this.CCDT_CODE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return AVAT_TR_PurInvoiceHeader;
}(SecurityClass));
var AVAT_TR_PurInvoiceRet = /** @class */ (function (_super) {
    __extends(AVAT_TR_PurInvoiceRet, _super);
    function AVAT_TR_PurInvoiceRet() {
        var _this = _super.call(this) || this;
        _this.InvoiceRetID = 0;
        _this.TR_NO = 0;
        _this.DocNo = "";
        _this.TR_DATE = "";
        _this.TR_TYPE = 0;
        _this.VendorID = 0;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.VENDOR_NAME = "";
        _this.TOTAL = 0;
        _this.DISCOUNT = 0;
        _this.PAID = 0;
        _this.JOURNAL_NO = 0;
        _this.CLOSED = false;
        _this.CANCEL = false;
        _this.Remark = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.POSTED = false;
        _this.ACTUAL_DATE = "";
        _this.PrntNo = "";
        _this.Ref_No = "";
        _this.Con_No = 0;
        _this.Pay_No = 0;
        _this.ConTyp = 0;
        _this.Vat = 0;
        _this.NetATax = 0;
        _this.VatType = 0;
        _this.VatApplied = false;
        _this.VndVatType = 0;
        _this.DedTaxPrc = 0;
        _this.VatPrc = 0;
        _this.SalesType = 0;
        _this.ImportInvoice = false;
        _this.PAY_ACC_CODE = "";
        return _this;
    }
    return AVAT_TR_PurInvoiceRet;
}(SecurityClass));
var AQVAT_GetPurReturn = /** @class */ (function (_super) {
    __extends(AQVAT_GetPurReturn, _super);
    function AQVAT_GetPurReturn() {
        var _this = _super.call(this) || this;
        _this.InvoiceRetID = 0;
        _this.TR_NO = 0;
        _this.DocNo = "";
        _this.TR_DATE = "";
        _this.TR_TYPE = 0;
        _this.VendorID = 0;
        _this.InvoiceHeaderID = 0;
        _this.InvoiceId = 0;
        _this.VENDOR_NAME = "";
        _this.TOTAL = 0;
        _this.DISCOUNT = 0;
        _this.PAID = 0;
        _this.JOURNAL_NO = 0;
        _this.CLOSED = false;
        _this.CANCEL = false;
        _this.Remark = "";
        _this.CreatedAt = "";
        _this.CreatedBy = "";
        _this.UpdatedAt = "";
        _this.UpdatedBy = "";
        _this.CompCode = 0;
        _this.BranchCode = 0;
        _this.POSTED = false;
        _this.ACTUAL_DATE = "";
        _this.PrntNo = "";
        _this.Ref_No = "";
        _this.Con_No = 0;
        _this.Pay_No = 0;
        _this.ConTyp = 0;
        _this.Vat = 0;
        _this.NetATax = 0;
        _this.VatType = 0;
        _this.VatApplied = false;
        _this.VndVatType = 0;
        _this.DedTaxPrc = 0;
        _this.VatPrc = 0;
        _this.SalesType = 0;
        _this.ImportInvoice = false;
        _this.PAY_ACC_CODE = "";
        _this.VendorCode = "";
        _this.vnd_NameA = "";
        _this.vnd_NameE = "";
        _this.Pur_Tr_No = 0;
        _this.Pur_DocNo = "";
        _this.Pur_TrDate = "";
        _this.PurHD_Serial = 0;
        _this.PurHd_DocNo = "";
        _this.Closed_txt = "";
        return _this;
    }
    return AQVAT_GetPurReturn;
}(SecurityClass));
var AVAT_TR_PurInvoiceRetDetail = /** @class */ (function () {
    function AVAT_TR_PurInvoiceRetDetail() {
        this.InvoiceRetDetailid = 0;
        this.InvoiceRetID = 0;
        this.InvoiceDetailID = 0;
        this.TR_SERIAL = 0;
        this.Itemid = 0;
        this.UomID = 0;
        this.QTY_SOLD = 0;
        this.QTY_RET = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.REMARK = "";
        this.ACTUAL_DATE = "";
        this.VatApplied = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.CC_CODE = "";
        this.CCDT_CODE = "";
        this.VatNatID = 0;
        this.CompCode = 0;
        this.BranchCode = 0;
    }
    return AVAT_TR_PurInvoiceRetDetail;
}());
var A_CCDT_Types = /** @class */ (function (_super) {
    __extends(A_CCDT_Types, _super);
    function A_CCDT_Types() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.CCDT_TYPE = "";
        _this.DescA = "";
        _this.DescE = "";
        _this.Remarks = "";
        return _this;
    }
    return A_CCDT_Types;
}(SecurityClass));
var ListOperationDepositDetail = /** @class */ (function (_super) {
    __extends(ListOperationDepositDetail, _super);
    function ListOperationDepositDetail() {
        var _this = _super.call(this) || this;
        _this.I_TR_OperationSalesmanItem = new Array();
        _this.I_TR_OperationDeposit = new Array();
        return _this;
    }
    return ListOperationDepositDetail;
}(SecurityClass));
var ServPurchseInvoiceMasterDetail = /** @class */ (function (_super) {
    __extends(ServPurchseInvoiceMasterDetail, _super);
    function ServPurchseInvoiceMasterDetail() {
        var _this = _super.call(this) || this;
        _this.AVAT_TR_PurInvoice = new AVAT_TR_PurInvoice();
        _this.AVAT_TR_PurInvoiceDetail = new Array();
        _this.AVAT_TR_PurInvoiceHeader = new Array();
        return _this;
    }
    return ServPurchseInvoiceMasterDetail;
}(SecurityClass));
var PurInvoiceRetMasterDetails = /** @class */ (function () {
    function PurInvoiceRetMasterDetails() {
    }
    return PurInvoiceRetMasterDetails;
}());
var AQ_ServPurInvoiceMasterDetail = /** @class */ (function (_super) {
    __extends(AQ_ServPurInvoiceMasterDetail, _super);
    function AQ_ServPurInvoiceMasterDetail() {
        var _this = _super.call(this) || this;
        _this.AVAT_TR_PurInvoice = new Array();
        _this.AQVAT_GetPurInvoiceDetail = new Array();
        _this.AQVAT_GetPurInvoiceHeader = new Array();
        return _this;
    }
    return AQ_ServPurInvoiceMasterDetail;
}(SecurityClass));
var AQPurInvoiceRetMasterDetails = /** @class */ (function () {
    function AQPurInvoiceRetMasterDetails() {
    }
    return AQPurInvoiceRetMasterDetails;
}());
var Account_CCDT_CCDTTP_MasterDetails = /** @class */ (function () {
    function Account_CCDT_CCDTTP_MasterDetails() {
    }
    return Account_CCDT_CCDTTP_MasterDetails;
}());
var A_CCDT_COSTCENTERS = /** @class */ (function (_super) {
    __extends(A_CCDT_COSTCENTERS, _super);
    function A_CCDT_COSTCENTERS() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.CCDT_CODE = "";
        _this.CCDT_TYPE = "";
        _this.CCDT_DESCA = "";
        _this.CCDT_DESCE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return A_CCDT_COSTCENTERS;
}(SecurityClass));
var AVAT_PERIOD = /** @class */ (function (_super) {
    __extends(AVAT_PERIOD, _super);
    function AVAT_PERIOD() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VAT_YEAR = 0;
        _this.PERIOD_CODE = 0;
        _this.FROM_DATE = "";
        _this.TO_DATE = "";
        _this.STATUS = 0;
        _this.STATUS_txt = "";
        _this.VOUCHER_CODE = 0;
        _this.SALES_VAT = 0;
        _this.PUR_VAT = 0;
        _this.NETVAT_AMOUNT = 0;
        _this.TOTALPERIODVAT = 0;
        _this.CORRECTIONS = 0;
        _this.VAT_PREVBALANCE = 0;
        return _this;
    }
    return AVAT_PERIOD;
}(SecurityClass));
var AQVAT_GetPeriodDetail = /** @class */ (function (_super) {
    __extends(AQVAT_GetPeriodDetail, _super);
    function AQVAT_GetPeriodDetail() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VAT_YEAR = 0;
        _this.PERIOD_CODE = 0;
        _this.TYPE = 0;
        _this.CODE = 0;
        _this.Val_Amount = 0;
        _this.Upd_Amount = 0;
        _this.VAT_Amount = 0;
        _this.DESCRIPTION = "";
        _this.VatPerc = 0;
        _this.LineOrder = 0;
        return _this;
    }
    return AQVAT_GetPeriodDetail;
}(SecurityClass));
var AVAT_TRANS = /** @class */ (function (_super) {
    __extends(AVAT_TRANS, _super);
    function AVAT_TRANS() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.SYSTEM_CODE = "";
        _this.TRTYPE = "";
        _this.TRDESCA = "";
        _this.TRDESCE = "";
        _this.SYSTEMDESCA = "";
        _this.SYSTEMDESCE = "";
        _this.SEC = 0;
        _this.ISAVAILABLE = false;
        return _this;
    }
    return AVAT_TRANS;
}(SecurityClass));
var A_CashVoucher_Detail = /** @class */ (function (_super) {
    __extends(A_CashVoucher_Detail, _super);
    function A_CashVoucher_Detail() {
        var _this = _super.call(this) || this;
        _this.VoucherDetailID = 0;
        _this.VoucherID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_SERIAL = 0;
        _this.ACC_CODE = "";
        _this.CC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.DESCL = "";
        _this.DESCA = "";
        _this.CCDT_CODE = "";
        _this.INVOICE_NO = 0;
        _this.DEBIT_FC = 0;
        _this.CREDIT_FC = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return A_CashVoucher_Detail;
}(SecurityClass));
var A_CashVoucher_Header = /** @class */ (function (_super) {
    __extends(A_CashVoucher_Header, _super);
    function A_CashVoucher_Header() {
        var _this = _super.call(this) || this;
        _this.VoucherID = 0;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.TRType = 0;
        _this.TYPE_CODE = 0;
        _this.CheckType = 0;
        _this.VOUCHER_DATE = "";
        _this.VOUCHER_DESC = "";
        _this.REF_CODE = "";
        _this.VOUCHER_STATUS = 0;
        _this.BENIFICIARY = "";
        _this.ACC_CODE = "";
        _this.AMOUNT = 0;
        _this.CHECK_CODE = "";
        _this.BANK = "";
        _this.DEPOSIT_ACC_CODE = "";
        _this.CheckStatus = 0;
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.POSTED_BY = "";
        _this.POSTED_AT = "";
        _this.DueDate = "";
        return _this;
    }
    return A_CashVoucher_Header;
}(SecurityClass));
var AQ_GetCashVoucherDetail = /** @class */ (function (_super) {
    __extends(AQ_GetCashVoucherDetail, _super);
    function AQ_GetCashVoucherDetail() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_SERIAL = 0;
        _this.ACC_CODE = "";
        _this.CC_CODE = "";
        _this.DEBIT = 0;
        _this.CREDIT = 0;
        _this.DESCL = "";
        _this.DESCA = "";
        _this.CCDT_CODE = "";
        _this.INVOICE_NO = 0;
        _this.DEBIT_FC = 0;
        _this.CREDIT_FC = 0;
        _this.CC_DESCA = "";
        _this.CC_DESCE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        _this.VoucherDetailID = 0;
        _this.VoucherID = 0;
        _this.CCDT_DESCA = "";
        _this.CCDT_DESCE = "";
        _this.StatusFlag = "";
        return _this;
    }
    return AQ_GetCashVoucherDetail;
}(SecurityClass));
var AQ_GetCashVoucherHeader = /** @class */ (function (_super) {
    __extends(AQ_GetCashVoucherHeader, _super);
    function AQ_GetCashVoucherHeader() {
        var _this = _super.call(this) || this;
        _this.COMP_CODE = 0;
        _this.VOUCHER_CODE = 0;
        _this.VOUCHER_DATE = "";
        _this.VOUCHER_DESC = "";
        _this.VOUCHER_STATUS = 0;
        _this.TYPE_CODE = 0;
        _this.REF_CODE = "";
        _this.CREATED_BY = "";
        _this.CREATED_AT = "";
        _this.UPDATED_BY = "";
        _this.UPDATED_AT = "";
        _this.POSTED_BY = "";
        _this.POSTED_AT = "";
        _this.TYPE_DESCA = "";
        _this.TYPE_DESCE = "";
        _this.St_DescE = "";
        _this.St_DescA = "";
        _this.VoucherID = 0;
        _this.TRType = 0;
        _this.CheckType = 0;
        _this.BENIFICIARY = "";
        _this.ACC_CODE = "";
        _this.AMOUNT = 0;
        _this.CHECK_CODE = "";
        _this.BANK = "";
        _this.DEPOSIT_ACC_CODE = "";
        _this.CheckStatus = 0;
        _this.DueDate = "";
        _this.chkType_DescA = "";
        _this.chkType_DescE = "";
        _this.ACC_DESCA = "";
        _this.ACC_DESCL = "";
        return _this;
    }
    return AQ_GetCashVoucherHeader;
}(SecurityClass));
var AQ_GetCashVoucherHeaderWithDetail = /** @class */ (function (_super) {
    __extends(AQ_GetCashVoucherHeaderWithDetail, _super);
    function AQ_GetCashVoucherHeaderWithDetail() {
        var _this = _super.call(this) || this;
        _this.AQ_GetCashVoucherHeader = new Array();
        _this.AQ_GetCashVoucherDetail = new Array();
        return _this;
    }
    return AQ_GetCashVoucherHeaderWithDetail;
}(SecurityClass));
var CashVoucherMasterDetails = /** @class */ (function (_super) {
    __extends(CashVoucherMasterDetails, _super);
    function CashVoucherMasterDetails() {
        var _this = _super.call(this) || this;
        _this.A_CashVoucher_Header = new A_CashVoucher_Header();
        _this.A_CashVoucher_Detail = new Array();
        return _this;
    }
    return CashVoucherMasterDetails;
}(SecurityClass));
var Cal_AccountChart = /** @class */ (function (_super) {
    __extends(Cal_AccountChart, _super);
    function Cal_AccountChart() {
        var _this = _super.call(this) || this;
        _this.AccountId = 0;
        _this.AccountCode;
        _this.AccountNameA = "";
        _this.AccountNameE = "";
        _this.mainAccountId = 0;
        _this.AccountLevel = 0;
        _this.AccountType = 0;
        _this.AccountNature = 0;
        _this.AccountGroup = 0;
        _this.AccCashFlow = 0;
        _this.CalcMethod = false;
        _this.CurrencyId = 0;
        _this.Aid = 0;
        _this.AccBulkAccount = 0;
        _this.AccountCategory = 0;
        _this.CostCentersDistribute = false;
        _this.CurrencyReevaluation = false;
        _this.AccountStopped = false;
        _this.RemarksA = "";
        _this.RemarksE = "";
        _this.OpenningBalanceDepit = 0;
        _this.OpenningBalanceCredit = 0;
        _this.AccCurrTrancDepit = 0;
        _this.AccCurrTrancCredit = 0;
        _this.AccTotalDebit = 0;
        _this.AccTotaCredit = 0;
        _this.BalanceDebitLocal = 0;
        _this.BalanceCreditLocal = 0;
        _this.OpenningBalanceDepitCurncy = 0;
        _this.OpenningBalanceCreditCurncy = 0;
        _this.AccCurrTrancDepitCurncy = 0;
        _this.AccCurrTrancCreditCurncy = 0;
        _this.AccTotalDebitCurncy = 0;
        _this.AccTotaCreditCurncy = 0;
        _this.BalanceDebitCurncy = 0;
        _this.BalanceCreditCurncy = 0;
        _this.AccApproxim = 0;
        _this.CreatedBy = "";
        _this.CreatedAt = "";
        _this.UpdatedBy = "";
        _this.UpdatedAt = "";
        _this.DeletedBy = "";
        _this.DeletedAt = "";
        _this.CostCenterOption = 0;
        _this.StatusFlag = "";
        return _this;
    }
    return Cal_AccountChart;
}(SecurityClass));
var Cal_AccountUsers = /** @class */ (function () {
    function Cal_AccountUsers() {
        this.AccUserId = 0;
        this.AccountId = 0;
        this.UserId = 0;
        this.ApprovedBy = 0;
        this.UserName = "";
        this.Remarks1 = "";
        this.Remarks2 = "";
        this.TranAndView = false;
        this.StatusFlag = "";
    }
    return Cal_AccountUsers;
}());
var MS_CurrencyCategory = /** @class */ (function () {
    function MS_CurrencyCategory() {
        this.CurrencyCategoryId = 0;
        this.code = "";
        this.CurrencyCategoryNameA = "";
        this.CurrencyCategoryNameE = "";
        this.Aid = 0;
        this.Value = 0;
        this.RemarksA = "";
        this.RemarksE = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_CurrencyCategory;
}());
var Ms_CurrencyCategoryJoin = /** @class */ (function () {
    function Ms_CurrencyCategoryJoin() {
        this.CurrencyCatJoinId = 0;
        this.CurrencyId = 0;
        this.CurrencyCategoryId = 0;
        this.CurrencyType = 0;
    }
    return Ms_CurrencyCategoryJoin;
}());
var MS_Currency = /** @class */ (function () {
    function MS_Currency() {
        this.CurrencyId = 0;
        this.CurrencyCode = 0;
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Rate = 0;
        this.DefualtCurrency = false;
        this.CurrencySymbol = "";
        this.fractionalUnit = "";
        this.DecimalPlaces = 0;
        this.CurrencyCategoryId = 0;
        this.CurrenctType = "";
        this.singleCurencyname = "";
        this.singleCurencyname2 = "";
        this.DoubleCurencyname = "";
        this.DoubleCurencyname2 = "";
        this.CurrancyNameOverthree = "";
        this.CurrancyNameOverthree2 = "";
        this.CollectionCurrencyName = "";
        this.CollectionCurrencyName2 = "";
        this.singleCurencyFractionname = "";
        this.singleCurencyFractionname2 = "";
        this.DoubleCurencyFractionname = "";
        this.DoubleCurencyFractionname2 = "";
        this.CurrancyNameFractionOverthree = "";
        this.CurrancyNameFractionOverthree2 = "";
        this.CollectionCurrencyFractionName = "";
        this.CollectionCurrencyFractionName2 = "";
        this.singleCurencyTempname = "";
        this.DoubleCurencyTempname = "";
        this.CurrancyNameTempOver3 = "";
        this.CollectionCurrencyTempName = "";
        this.Aid = 0;
        this.EquivalentConversionPrice = 0;
        this.LastModify = "";
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_Currency;
}());
var Cod_AccountCategories = /** @class */ (function () {
    function Cod_AccountCategories() {
        this.AccountCatId = 0;
        this.ParentAccountCatId;
        this.Code = 0;
        this.DescA = "";
        this.DescE = "";
        this.AId = 0;
        this.AccountCatType = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.RemarksA = "";
        this.RemarksE = "";
    }
    return Cod_AccountCategories;
}());
var Cod_AccountClassification = /** @class */ (function () {
    function Cod_AccountClassification() {
        this.AccountClassId = 0;
        this.ParentAccountClassId;
        this.Code = 0;
        this.DescA = "";
        this.DescE = "";
        this.AId;
        this.AccountClassType;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.RemarksA = "";
        this.RemarksE = "";
        this.AccountCatId;
    }
    return Cod_AccountClassification;
}());
var MS_ItemCategory = /** @class */ (function () {
    function MS_ItemCategory() {
        this.ItemCategoryId = 0;
        this.ItemCatCode = "";
        this.ItemCatDescA = "";
        this.ItemCatDescE = "";
        this.ParentItemCategoryId;
        this.ItemCategoryType = 0;
        this.ItemCategoryCatLevel = 0;
        this.CategoryImage;
        this.CurrentTrNo = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_ItemCategory;
}());
var MSGA_City = /** @class */ (function () {
    function MSGA_City() {
        this.CityID = 0;
        this.CityCode = "";
        this.CityName = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.Remarks = "";
        this.DeletedAt = "";
        this.SysCityID = 0;
        this.CountryId = 0;
    }
    return MSGA_City;
}());
var Hr_Employees = /** @class */ (function () {
    function Hr_Employees() {
        this.EmpId = 0;
        this.StoreId = 0;
        this.JobId = 0;
        this.DepartMentId = 0;
        this.HREmpGroupId = 0;
        this.PeriodTableId = 0;
        this.ShiftId = 0;
        this.CurrencyId = 0;
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.EmpCode = "";
        this.DeviceEmpCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.Qualification = "";
        this.Gender = false;
        this.MaritalStatus = 0;
        this.KidsNo = 0;
        this.Religion = 0;
        this.Nationality = 0;
        this.BirthDate = "";
        this.Remarks = "";
        this.IDNo = "";
        this.IDIssueDate = "";
        this.IDExpiryDate = "";
        this.PassportNo = "";
        this.PassportIssueDate = "";
        this.PassportExpiryDate = "";
        this.Car = "";
        this.DrivingLicense = "";
        this.DrivingIssueDate = "";
        this.DrivingExpiryDate = "";
        this.DrivingRenewalDate = "";
        this.Phone1 = "";
        this.Phone2 = "";
        this.Phone3 = "";
        this.Email = "";
        this.Address1 = "";
        this.Address2 = "";
        this.AnnualVacs = 0;
        this.ReservedVacs = 0;
        this.LastVacsUpdate = "";
        this.AnnualVacsBalance = 0;
        this.ReservedVacsBalance = 0;
        this.MaxVacsBalance = 0;
        this.ContractType = false;
        this.Attendance = false;
        this.ContractSrtDate = "";
        this.ContractEndDate = "";
        this.WorkStartDate = "";
        this.SocialSecurityID = "";
        this.HealthInsID = "";
        this.HealthInsEndDate = "";
        this.syndicate = "";
        this.syndicateID = "";
        this.MilitaryService = 0;
        this.HourlyCostRate = 0;
        this.IsTechnician = false;
        this.IsSales = false;
        this.IsMoneyCollector = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.EmpImage;
        this.IssueSalary = false;
        this.DistributeSalary = false;
        this.AutosalaryIssue = false;
        this.BankName = "";
        this.BankAccNo = "";
        this.DailyCost = 0;
        this.HourlyCost = 0;
        this.TotalDailyCost = 0;
        this.TotalHourlyCost = 0;
        this.CommisionPercent = 0;
        this.CommisionCollectionPerc = 0;
        this.IsCommissionAfterDisc = false;
        this.TaxRefNo = "";
        this.EtaxCustType = "";
    }
    return Hr_Employees;
}());
var Cal_CostCenters = /** @class */ (function () {
    function Cal_CostCenters() {
        this.CostCenterId = 0;
        this.CostCenterCode = 0;
        this.CostCenterNameA = "";
        this.CostCenterNameE = "";
        this.mainCostCenterId = 0;
        this.CostCenterLevel = 0;
        this.CenterCategory = 0;
        this.CostType = 0;
        this.CashFlowList = 0;
        this.Aid = 0;
        this.AccountId = 0;
        this.CurrencyId = 0;
        this.FunctionDescA = "";
        this.FunctionDescE = "";
        this.PreviousBalance = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.RemarksA = "";
        this.RemarksE = "";
        this.Parent = 0;
        this.MonthlybalanceId = 0;
        this.jopDesc = 0;
        this.BoxId = 0;
        this.AccCostCenterId = 0;
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.CostCenterCurrTrancDepit = 0;
        this.CostCenterCurrTrancCredit = 0;
        this.CostCenterTotalDebit = 0;
        this.CostCenterTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.CostCenterCurrTrancDepitCurncy = 0;
        this.CostCenterCurrTrancCreditCurncy = 0;
        this.CostCenterTotalDebitCurncy = 0;
        this.CostCenterTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
    }
    return Cal_CostCenters;
}());
var MS_Customer = /** @class */ (function () {
    function MS_Customer() {
        this.CustomerId = 0;
        this.CustomerCatId = 0;
        this.CustomerTypeId = 0;
        this.CurrencyId = 0;
        this.CityId = 0;
        this.EmpId = 0;
        this.CostCenterId = 0;
        this.CustomerCode = "";
        this.CustomerDescA = "";
        this.CustomerDescE = "";
        this.IsActive = false;
        this.IsTaxExempted = false;
        this.CreditPeriod = 0;
        this.PeriodType = 0;
        this.CreditLimit = 0;
        this.CreditLimitAllowed = 0;
        this.Nationality = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.Email2 = "";
        this.Email3 = "";
        this.Email4 = "";
        this.Address = "";
        this.Address1 = "";
        this.Address2 = "";
        this.Address3 = "";
        this.Remarks = "";
        this.Tel2 = "";
        this.Tel3 = "";
        this.Tel4 = "";
        this.Tel5 = "";
        this.DateOfBirth = "";
        this.PassPortNo = "";
        this.PassPortIssueDate = "";
        this.PassPortExpiryDate = "";
        this.PassPortIssuePlace = "";
        this.InternationalLicense = false;
        this.CarLicenseNo = "";
        this.CarLicenseIssueDate = "";
        this.CarLicenseIssuePlace = "";
        this.CarLicenseExpiryDate = "";
        this.dtReg = "";
        this.dtRegRenew = "";
        this.Company = "";
        this.CustJob = "";
        this.CustID = "";
        this.Barcode = 0;
        this.SalPrice = 0;
        this.AddField1 = "";
        this.AddField2 = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.DefaultDisc = 0;
        this.ReportDiscValu = 0;
        this.DiscPercentOrVal = false;
        this.ForAdjustOnly = false;
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.StoreId = 0;
        this.TaxesId1 = 0;
        this.TaxesId2 = 0;
        this.TaxesId3 = 0;
        this.IsDiscountByItem = false;
        this.IsBlocked = false;
        this.IsCreditEnabled = false;
        this.IsPricIncludTax = false;
        this.TaxExemptionNo = "";
        this.TaxRefNo = "";
        this.PrePaidPercent = 0;
        this.PostalCode = "";
        this.HomePage = "";
        this.InvoiceCopies = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_Customer;
}());
var Ms_CustomerTypes = /** @class */ (function () {
    function Ms_CustomerTypes() {
        this.CustomerTypeId = 0;
        this.CustomerTypeCode = "";
        this.CustomerTypeDescA = "";
        this.CustomerTypeDescE = "";
        this.CustomerTypeParent;
        this.CustomerTypeLevel = 0;
        this.CustomerTypeLevelType = 0;
        this.CurrentTrNo = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Ms_CustomerTypes;
}());
var MS_CustomerCategory = /** @class */ (function () {
    function MS_CustomerCategory() {
        this.CustomerCatId = 0;
        this.CatCode = "";
        this.CatDescA = "";
        this.CatDescE = "";
        this.ParentCustomerCatId = 0;
        this.CustomerCatParent = 0;
        this.CustomerCatLevel = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_CustomerCategory;
}());
var Cal_CustAccounts = /** @class */ (function () {
    function Cal_CustAccounts() {
        this.StatusFlag = "";
        this.CustAccountId = 0;
        this.AccountId = 0;
        this.CustomerId = 0;
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.AccountStopped = false;
        this.AccountModel = "";
        this.RemarksA = "";
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.AccCurrTrancDepit = 0;
        this.AccCurrTrancCredit = 0;
        this.AccTotalDebit = 0;
        this.AccTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.AccCurrTrancDepitCurncy = 0;
        this.AccCurrTrancCreditCurncy = 0;
        this.AccTotalDebitCurncy = 0;
        this.AccTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.IsPrimeAccount = false;
        this.IsInUse = false;
        this.AccountDescription = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_CustAccounts;
}());
var Ms_CustomerBranches = /** @class */ (function () {
    function Ms_CustomerBranches() {
        this.StatusFlag = "";
        this.CustBranchId = 0;
        this.CustomerId = 0;
        this.CustBranchCode = "";
        this.CustBranchName1 = "";
        this.CustBranchName2 = "";
        this.Remarks = "";
        this.CityID = 0;
        this.Address = "";
    }
    return Ms_CustomerBranches;
}());
var Ms_CustomerContacts = /** @class */ (function () {
    function Ms_CustomerContacts() {
        this.StatusFlag = "";
        this.CustContactId = 0;
        this.CustomerId = 0;
        this.AccountId1 = 0;
        this.AccountId2 = 0;
        this.AccountId3 = 0;
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.CostCenterId3 = 0;
        this.ContactCode = "";
        this.CityId = 0;
        this.ContactName1 = "";
        this.ContactName2 = "";
        this.ContactPhone1 = "";
        this.ContactPhone2 = "";
        this.ContactPhone3 = "";
        this.ContactPhone4 = "";
        this.ContactPhone5 = "";
        this.ContactAddress1 = "";
        this.ContactAddress2 = "";
        this.ContactAddress3 = "";
        this.ContactEmail1 = "";
        this.ContactEmail2 = "";
        this.ContactEmail3 = "";
        this.IDNo = "";
        this.PassPortNo = "";
        this.Bank1 = "";
        this.Bank2 = "";
        this.Bank3 = "";
        this.BankAccNo1 = "";
        this.BankAccNo2 = "";
        this.BankAccNo3 = "";
        this.Remark1 = "";
        this.Remark2 = "";
        this.Isprimary = false;
    }
    return Ms_CustomerContacts;
}());
var Ms_CusromerUsers = /** @class */ (function () {
    function Ms_CusromerUsers() {
        this.CustUserId = 0;
        this.CustomerId = 0;
        this.UserId = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.StatusFlag = "";
    }
    return Ms_CusromerUsers;
}());
var Ms_CustImgs = /** @class */ (function () {
    function Ms_CustImgs() {
        this.CustImgId = 0;
        this.CustomerId = 0;
        this.Image;
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
    }
    return Ms_CustImgs;
}());
var MS_Vendor = /** @class */ (function () {
    function MS_Vendor() {
        this.VendorId = 0;
        this.VendorCatId = 0;
        this.VendorTypeId = 0;
        this.CurrencyId = 0;
        this.CostCenterId = 0;
        this.VendorCode = "";
        this.VendorDescA = "";
        this.VendorDescE = "";
        this.IsActive = false;
        this.IsTaxExempted = false;
        this.CreditPeriodType = 0;
        this.CreditPeriod = 0;
        this.CreditLimit = 0;
        this.Tel = "";
        this.Tel2 = "";
        this.Tel3 = "";
        this.Tel4 = "";
        this.Tel5 = "";
        this.Fax = "";
        this.Email = "";
        this.Email2 = "";
        this.Email3 = "";
        this.Email4 = "";
        this.Address = "";
        this.Address1 = "";
        this.Address2 = "";
        this.Address3 = "";
        this.Remarks = "";
        this.AddField1 = "";
        this.AddField2 = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.Barcode = 0;
        this.ForAdjustOnly = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.CityId = 0;
        this.EmpId = 0;
        this.StoreId = 0;
        this.TaxesId1 = 0;
        this.TaxesId2 = 0;
        this.TaxesId3 = 0;
        this.IsBlocked = false;
        this.IsCreditEnabled = false;
        this.IsPricIncludTax = false;
        this.TaxExemptionNo = "";
        this.TaxRefNo = "";
        this.PrePaidPercent = 0;
        this.PostalCode = "";
        this.HomePage = "";
        this.InvoiceCopies = 0;
        this.dtReg = "";
        this.dtRegRenew = "";
        this.Company = "";
        this.VendJob = "";
        this.VendID = "";
    }
    return MS_Vendor;
}());
var Ms_VendorTypes = /** @class */ (function () {
    function Ms_VendorTypes() {
        this.VendorTypeId = 0;
        this.VendorTypeCode = "";
        this.VendorTypeDescA = "";
        this.VendorTypeDescE = "";
        this.VendorTypeParent;
        this.VendorTypeLevel = 0;
        this.VendorTypeLevelType = 0;
        this.CurrentTrNo = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Ms_VendorTypes;
}());
var MS_VendorCategory = /** @class */ (function () {
    function MS_VendorCategory() {
        this.VendorCatId = 0;
        this.CatCode = "";
        this.CatDescA = "";
        this.CatDescE = "";
        this.ParentVendorCatId = 0;
        this.VendorCatParent = 0;
        this.VendorCatLevel = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_VendorCategory;
}());
var Cal_VendAccounts = /** @class */ (function () {
    function Cal_VendAccounts() {
        this.VendAccountId = 0;
        this.AccountId = 0;
        this.VendorId = 0;
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.AccountStopped = false;
        this.AccountModel = "";
        this.RemarksA = "";
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.AccCurrTrancDepit = 0;
        this.AccCurrTrancCredit = 0;
        this.AccTotalDebit = 0;
        this.AccTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.AccCurrTrancDepitCurncy = 0;
        this.AccCurrTrancCreditCurncy = 0;
        this.AccTotalDebitCurncy = 0;
        this.AccTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.IsPrimeAccount = false;
        this.IsInUse = false;
        this.AccountDescription = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_VendAccounts;
}());
var Ms_VendorBranches = /** @class */ (function () {
    function Ms_VendorBranches() {
        this.StatusFlag = "";
        this.VendBranchId = 0;
        this.VendorId = 0;
        this.VendBranchCode = "";
        this.VendBranchName1 = "";
        this.VendBranchName2 = "";
        this.Remarks = "";
        this.CityID = 0;
        this.Address = "";
    }
    return Ms_VendorBranches;
}());
var Ms_VendorContacts = /** @class */ (function () {
    function Ms_VendorContacts() {
        this.StatusFlag = "";
        this.VendContactId = 0;
        this.VendorId = 0;
        this.AccountId1 = 0;
        this.AccountId2 = 0;
        this.AccountId3 = 0;
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.CostCenterId3 = 0;
        this.ContactCode = "";
        this.CityId = 0;
        this.ContactName1 = "";
        this.ContactName2 = "";
        this.ContactPhone1 = "";
        this.ContactPhone2 = "";
        this.ContactPhone3 = "";
        this.ContactPhone4 = "";
        this.ContactPhone5 = "";
        this.ContactAddress1 = "";
        this.ContactAddress2 = "";
        this.ContactAddress3 = "";
        this.ContactEmail1 = "";
        this.ContactEmail2 = "";
        this.ContactEmail3 = "";
        this.IDNo = "";
        this.PassPortNo = "";
        this.Bank1 = "";
        this.Bank2 = "";
        this.Bank3 = "";
        this.BankAccNo1 = "";
        this.BankAccNo2 = "";
        this.BankAccNo3 = "";
        this.Remark1 = "";
        this.Remark2 = "";
        this.Isprimary = false;
    }
    return Ms_VendorContacts;
}());
var Ms_VendorUsers = /** @class */ (function () {
    function Ms_VendorUsers() {
        this.StatusFlag = "";
        this.VendUserId = 0;
        this.VendorId = 0;
        this.UserId = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Ms_VendorUsers;
}());
var Ms_VendImgs = /** @class */ (function () {
    function Ms_VendImgs() {
        this.VendImgId = 0;
        this.VendorId = 0;
        this.Image;
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
    }
    return Ms_VendImgs;
}());
var Hr_EmpSalaryTypes = /** @class */ (function () {
    function Hr_EmpSalaryTypes() {
        this.EmpSalaryTypesId = 0;
        this.EmpId = 0;
        this.SalaryTypId = 0;
        this.SalaryValu = 0;
        this.DebitAccId = 0;
        this.CreditAccId = 0;
        this.DebitCostCenterId = 0;
        this.CreditCostCenterId = 0;
        this.DebitEmpAccountId = 0;
        this.CreditEmpAccountId = 0;
    }
    return Hr_EmpSalaryTypes;
}());
var Cal_EmpAccounts = /** @class */ (function () {
    function Cal_EmpAccounts() {
        this.EmpAccountId = 0;
        this.AccountId = 0;
        this.EmpId = 0;
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.AccountStopped = false;
        this.AccountModel = "";
        this.RemarksA = "";
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.AccCurrTrancDepit = 0;
        this.AccCurrTrancCredit = 0;
        this.AccTotalDebit = 0;
        this.AccTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.AccCurrTrancDepitCurncy = 0;
        this.AccCurrTrancCreditCurncy = 0;
        this.AccTotalDebitCurncy = 0;
        this.AccTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.IsPrimeAccount = false;
        this.IsInUse = false;
        this.AccountDescription = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_EmpAccounts;
}());
var Hr_Jobs = /** @class */ (function () {
    function Hr_Jobs() {
        this.JobId = 0;
        this.DepartMentId = 0;
        this.JCode = "";
        this.JName1 = "";
        this.JName2 = "";
        this.JDesc = "";
        this.JResponsibilities = "";
        this.JDuties = "";
        this.JQualifications = "";
        this.Remarks = "";
        this.Add1 = "";
        this.ParentId = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.StandardMonthlyWage = 0;
        this.StandardHolyDays = 0;
        this.StandardDailyWage = 0;
        this.StandardDailyWorkHours = 0;
        this.StandardHourlyWage = 0;
        this.NumberAvailable = 0;
    }
    return Hr_Jobs;
}());
var Hr_Departments = /** @class */ (function () {
    function Hr_Departments() {
        this.DepartMentId = 0;
        this.DepartCode = "";
        this.DepartName1 = "";
        this.DepartName2 = "";
        this.DepartTask = "";
        this.Remarks = "";
        this.ParentId = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Hr_Departments;
}());
var G_SearchForm = /** @class */ (function (_super) {
    __extends(G_SearchForm, _super);
    function G_SearchForm() {
        var _this = _super.call(this) || this;
        _this.SearchFormCode = "";
        _this.ReturnDataPropertyName = "";
        _this.Description = "";
        _this.SerachFormTitle = "";
        _this.IsFullScreen = false;
        _this.Left = 0;
        _this.Top = 0;
        _this.Height = 0;
        _this.Width = 0;
        _this.PageSize = 0;
        _this.DataSourceName = "";
        _this.SearchInterval = 0;
        _this.SerachFormTitleA = "";
        return _this;
    }
    return G_SearchForm;
}(SecurityClass));
var G_SearchFormModule = /** @class */ (function (_super) {
    __extends(G_SearchFormModule, _super);
    function G_SearchFormModule() {
        var _this = _super.call(this) || this;
        _this.SystemCode = "";
        _this.SubSystemCode = "";
        _this.ModuleCode = "";
        _this.ControlCode = "";
        _this.SearchFormCode = "";
        return _this;
    }
    return G_SearchFormModule;
}(SecurityClass));
var G_SearchFormSetting = /** @class */ (function (_super) {
    __extends(G_SearchFormSetting, _super);
    function G_SearchFormSetting() {
        var _this = _super.call(this) || this;
        _this.StatusFlag = "";
        _this.SearchFormSettingID = 0;
        _this.SearchFormCode = "";
        _this.FieldSequence = 0;
        _this.DataMember = "";
        _this.AlternateDataMember = "";
        _this.FieldTitle = "";
        _this.IsReadOnly = false;
        _this.Datatype = 0;
        _this.FieldWidth = 0;
        _this.UseSelectionOperator = false;
        _this.Language = 0;
        _this.FieldTitleA = "";
        _this.IsSearchable = false;
        return _this;
    }
    return G_SearchFormSetting;
}(SecurityClass));
var Hr_SalaryTypes = /** @class */ (function () {
    function Hr_SalaryTypes() {
        this.SalaryTypId = 0;
        this.AttendElementId = 0;
        this.SalaryCalcMethod = 0;
        this.SalaryCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.SalaryValu = 0;
        this.UseType = 0;
        this.AffectType = 0;
        this.ImplementScale = 0;
        this.ParentRelation = 0;
        this.Multiply = 0;
        this.Devide = 0;
        this.Approximation = 0;
        this.MaximumVal = 0;
        this.MinimumVal = 0;
        this.DebitAccFilter = 0;
        this.DebitAccId = 0;
        this.CreditAccFilter = 0;
        this.CreditAccId = 0;
        this.DebitCostCenterFilter = 0;
        this.DebitCostCenterId = 0;
        this.CreditCostCenterFilter = 0;
        this.CreditCostCenterId = 0;
        this.LargerThanZero = false;
        this.CanDelet = false;
        this.AutoIssue = false;
        this.CanEdit = false;
        this.Distributable = false;
        this.IsBasicsalary = false;
        this.Indmnity = 0;
        this.Taxation = 0;
        this.SocialSecurity = 0;
        this.ElementCount = 0;
        this.ElementCountDesc = "";
        this.UseElementOrUnit = false;
        this.Equation = "";
        this.IsAnnualSegment = false;
        this.AnnualPeriods = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Hr_SalaryTypes;
}());
var Hr_Shifts = /** @class */ (function () {
    function Hr_Shifts() {
        this.ShiftId = 0;
        this.ShiftCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.Day1Name1 = "";
        this.Day1Name2 = "";
        this.Day2Name1 = "";
        this.Day2Name2 = "";
        this.Day3Name1 = "";
        this.Day3Name2 = "";
        this.Day4Name1 = "";
        this.Day4Name2 = "";
        this.Day5Name1 = "";
        this.Day5Name2 = "";
        this.Day6Name1 = "";
        this.Day6Name2 = "";
        this.Day7Name1 = "";
        this.Day7Name2 = "";
        this.Day1Type = false;
        this.Day2Type = false;
        this.Day3Type = false;
        this.Day4Type = false;
        this.Day5Type = false;
        this.Day6Type = false;
        this.Day7Type = false;
        this.FirstShfDay1tFrom = "";
        this.FirstShftDay1To = "";
        this.FirstShftDay2From = "";
        this.FirstShftDay2To = "";
        this.FirstShftDay3From = "";
        this.FirstShftDay3To = "";
        this.FirstShftDay4From = "";
        this.FirstShftDay4To = "";
        this.FirstShftDay5From = "";
        this.FirstShftDay5To = "";
        this.FirstShftDay6From = "";
        this.FirstShftDay6To = "";
        this.FirstShftDay7From = "";
        this.FirstShftDay7To = "";
        this.SecondShftDay1From = "";
        this.SecondShftDay1To = "";
        this.SecondShftDay2From = "";
        this.SecondShftDay2To = "";
        this.SecondShftDay3From = "";
        this.SecondShftDay3To = "";
        this.SecondShftDay4From = "";
        this.SecondShftDay4To = "";
        this.SecondShftDay5From = "";
        this.SecondShftDay5To = "";
        this.SecondShftDay6From = "";
        this.SecondShftDay6To = "";
        this.SecondShftDay7From = "";
        this.SecondShftDay7To = "";
        this.ThirdShftDay1From = "";
        this.ThirdShftDay1To = "";
        this.ThirdShftDay2From = "";
        this.ThirdShftDay2To = "";
        this.ThirdShftDay3From = "";
        this.ThirdShftDay3To = "";
        this.ThirdShftDay4From = "";
        this.ThirdShftDay4To = "";
        this.ThirdShftDay5From = "";
        this.ThirdShftDay5To = "";
        this.ThirdShftDay6From = "";
        this.ThirdShftDay6To = "";
        this.ThirdShftDay7From = "";
        this.ThirdShftDay7To = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Hr_Shifts;
}());
var Hr_PeriodsTables = /** @class */ (function () {
    function Hr_PeriodsTables() {
        this.PeriodTableId = 0;
        this.PeriodCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.AttendanceMachin = false;
        this.ShiftId = 0;
        this.PeriodsNum = 0;
        this.PeriodType = 0;
        this.TableStartDate = "";
        this.TableEndDate = "";
        this.FirstDayWork = "";
        this.PeriodWorkDays = 0;
        this.DailyWorkHours = 0;
        this.SubPeriodCount = 0;
        this.SubPeriodType = 0;
        this.RoundingMethod = 0;
        this.WorkDayShowElementId = 0;
        this.WorkDayNoShowElementId = 0;
        this.Shift1ShowElementId = 0;
        this.Shift1NoShowElementId = 0;
        this.Shift2ShowElementId = 0;
        this.Shift2NoShowElementId = 0;
        this.Shift3ShowElementId = 0;
        this.Shift3NoShowElementId = 0;
        this.LateArrivalElementId = 0;
        this.LateArrivalUnit = "";
        this.LateArrivalRound = 0;
        this.LateArrivalMinVal = 0;
        this.EarlyLeaveElementId = 0;
        this.EarlyLeaveUnit = "";
        this.EarlyLeaveRound = 0;
        this.EarlyLeaveMinVal = 0;
        this.EarlyAttendElementId = 0;
        this.EarlyAttendUnit = "";
        this.EarlyAttendRound = 0;
        this.EarlyAttendMinVal = 0;
        this.WorkdayOvertimeElementId = 0;
        this.WorkdayOvertimeUnit = "";
        this.WorkdayOvertimeRound = 0;
        this.WorkdayOvertimeMinVal = 0;
        this.VacationOvertimeElementId = 0;
        this.VacationOvertimeUnit = "";
        this.VacationOvertimeRound = 0;
        this.VacationOvertimeMinVal = 0;
        this.WeekendOvertimeElementId = 0;
        this.WeekendOvertimeUnit = "";
        this.WeekendOvertimeRound = 0;
        this.WeekendOvertimeMinVal = 0;
        this.WrkOvrTimAfterDismis = 0;
        this.WeekEndOvrTimAftrDismis = 0;
        this.VacOvrTimAftrDismis = 0;
        this.AcceptShiftVacs = false;
        this.AcceptShiftHours = false;
        this.ShiftNotAcheived = false;
        this.AcceptShftBeforDismis = false;
        this.CutLateTimFromOverTime = false;
        this.CancelEarlyLeave = false;
        this.CalcEarlyLeaveWeekEnd = false;
        this.CalcEarlyLeaveVacation = false;
        this.CalcLateAttendWeekEnd = false;
        this.CalcLateAttendVacation = false;
        this.WeekEndWorkDayElementId = 0;
        this.WeekEndWorkUnit = "";
        this.WeekEndWorkRound = 0;
        this.WeekEndWorkMinVal = 0;
        this.VacationWorkDayElementId = 0;
        this.VacationWorkUnit = "";
        this.VacationWorkRound = 0;
        this.VacationWorkMinVal = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Hr_PeriodsTables;
}());
var Hr_EmpDocuments = /** @class */ (function () {
    function Hr_EmpDocuments() {
        this.EmpDocId = 0;
        this.EmpDocTypId = 0;
        this.StoreId = 0;
        this.BookId = 0;
        this.TermId = 0;
        this.FinancialIntervalsId = 0;
        this.AId = 0;
        this.EmpId = 0;
        this.EmpApprovedById = 0;
        this.TrNo = 0;
        this.ManualTrNo = "";
        this.TrDate = "";
        this.FromDate = "";
        this.ToDate = "";
        this.IssuePlace = "";
        this.IssueDate = "";
        this.ExpiryDate = "";
        this.Remarks1 = "";
        this.Remarks2 = "";
        this.Remarks3 = "";
        this.Closed = false;
        this.IsPrinted = false;
        this.IsDelivered = false;
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.CloseDate = "";
        this.UncloseDate = "";
        this.ClosedBy = 0;
        this.UnclosedBy = 0;
        this.PermPrinted = 0;
        this.PermPrintedAt = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Hr_EmpDocuments;
}());
var Ms_CurrencyRate = /** @class */ (function () {
    function Ms_CurrencyRate() {
        this.EqualCurrencyPriceId = 0;
        this.CurrencyId = 0;
        this.EquivalentCurrencyId = 0;
        this.Rate = 0;
        this.LastModify = "";
    }
    return Ms_CurrencyRate;
}());
var Cal_JurnalDetail = /** @class */ (function () {
    function Cal_JurnalDetail() {
        this.JurnalDetailId = 0;
        this.JurnalId = 0;
        this.AId = 0;
        this.AccountId = 0;
        this.CustAccountId = 0;
        this.VendAccountId = 0;
        this.EmpAccountId = 0;
        this.AssetAccountId = 0;
        this.BusinessPartnerAccId = 0;
        this.CostCenterId = 0;
        this.CostCenterId1 = 0;
        this.CostCenterId2 = 0;
        this.CostCenterId3 = 0;
        this.CostCenterId4 = 0;
        this.Rate = 0;
        this.JurDesc = "";
        this.DebitCurrency = 0;
        this.CreditCurrency = 0;
        this.CurrencyId = 0;
        this.DebitLocal = 0;
        this.CreditLocal = 0;
        this.Remarks = "";
        this.StatusFlag = "";
    }
    return Cal_JurnalDetail;
}());
var Cal_JurnalEntry = /** @class */ (function () {
    function Cal_JurnalEntry() {
        this.JurnalId = 0;
        this.StorId = 0;
        this.TermId = 0;
        this.BookId = 0;
        this.AdjustId = 0;
        this.BoxTranId = 0;
        this.DeliverId = 0;
        this.PurInvId = 0;
        this.RectId = 0;
        this.RetPurchId = 0;
        this.RetSaleId = 0;
        this.InvId = 0;
        this.StockRecId = 0;
        this.TranId = 0;
        this.PayId = 0;
        this.StockAdjustId = 0;
        this.Tr_OpenningBalanceId = 0;
        this.KeeperId = 0;
        this.BankNoticId = 0;
        this.PettycashId = 0;
        this.PurOrderId = 0;
        this.SalesOfferId = 0;
        this.SalesOrderId = 0;
        this.ReservId = 0;
        this.SalaryIssuDocId = 0;
        this.DeprDocId = 0;
        this.AssetTerminatId = 0;
        this.AssetAddId = 0;
        this.AssetDeductId = 0;
        this.DeliverAssetId = 0;
        this.FixAssetId = 0;
        this.AssetMovId = 0;
        this.ReceiveAssetId = 0;
        this.JOrderEmpDocId = 0;
        this.JOrderEquipDocId = 0;
        this.JOrderClosId = 0;
        this.LetOfGrnteeTranId = 0;
        this.VJOrderId = 0;
        this.TranReqId = 0;
        this.Aid = 0;
        this.FinancialIntervalsId = 0;
        this.TrNo = 0;
        this.ManualTrNo = "";
        this.TrDate = "";
        this.JurnalDesc = "";
        this.TotalDebit = 0;
        this.TotalCredit = 0;
        this.IsOpenning = false;
        this.IsManual = false;
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.TotalInvoices = 0;
        this.NotPaidInvoices = 0;
        this.DifferenceInvoices = 0;
        this.ResourceBalance = 0;
        this.IsPaid = false;
        this.PaidDocId = 0;
        this.NotPaid = 0;
        this.TermCostCenterId = 0;
        this.TermCostCenterValue = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_JurnalEntry;
}());
var VW_SearchAllAccounts = /** @class */ (function () {
    function VW_SearchAllAccounts() {
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountLevel = 0;
        this.CalcMethod = false;
        this.AccType = 0;
        this.AccDesc;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.AccountType = 0;
        this.AccountNature = 0;
        this.AccountGroup = 0;
        this.AccCashFlow = 0;
        this.CurrencyId = 0;
        this.AccDesc2;
        this.AccountDescription = "";
    }
    return VW_SearchAllAccounts;
}());
var Cal_AssetAccounts = /** @class */ (function () {
    function Cal_AssetAccounts() {
        this.AssetAccountId = 0;
        this.AccountId = 0;
        this.AssetId = 0;
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.AccountStopped = false;
        this.AccountModel = "";
        this.RemarksA = "";
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.AccCurrTrancDepit = 0;
        this.AccCurrTrancCredit = 0;
        this.AccTotalDebit = 0;
        this.AccTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.AccCurrTrancDepitCurncy = 0;
        this.AccCurrTrancCreditCurncy = 0;
        this.AccTotalDebitCurncy = 0;
        this.AccTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.IsPrimeAccount = false;
        this.IsInUse = false;
        this.AccountDescription = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_AssetAccounts;
}());
var Cal_BusinessPartnerAccounts = /** @class */ (function () {
    function Cal_BusinessPartnerAccounts() {
        this.BusinessPartnerAccId = 0;
        this.BSPartnerId = 0;
        this.TableCode = "";
        this.TableEntityId = 0;
        this.AccountId = 0;
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.AccountStopped = false;
        this.AccountModel = "";
        this.RemarksA = "";
        this.OpenningBalanceDepit = 0;
        this.OpenningBalanceCredit = 0;
        this.AccCurrTrancDepit = 0;
        this.AccCurrTrancCredit = 0;
        this.AccTotalDebit = 0;
        this.AccTotaCredit = 0;
        this.BalanceDebitLocal = 0;
        this.BalanceCreditLocal = 0;
        this.OpenningBalanceDepitCurncy = 0;
        this.OpenningBalanceCreditCurncy = 0;
        this.AccCurrTrancDepitCurncy = 0;
        this.AccCurrTrancCreditCurncy = 0;
        this.AccTotalDebitCurncy = 0;
        this.AccTotaCreditCurncy = 0;
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.IsPrimeAccount = false;
        this.IsInUse = false;
        this.AccountDescription = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_BusinessPartnerAccounts;
}());
var Cal_Clauses = /** @class */ (function () {
    function Cal_Clauses() {
        this.ClausesId = 0;
        this.AccountId = 0;
        this.ClausesCode = "";
        this.NameAr = "";
        this.NameEn = "";
        this.Percentage = 0;
        this.Debtor = 0;
        this.Creditor = 0;
        this.Balance = 0;
        this.StatusFlag = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Cal_Clauses;
}());
var Ms_Terms = /** @class */ (function () {
    function Ms_Terms() {
        this.TermId = 0;
        this.TermCode = "";
        this.TermName = "";
        this.TermType = 0;
        this.BookId = 0;
        this.SystemIssuedOnly = false;
        this.JournalEntryBookId = 0;
        this.JournalEntryTermId = 0;
        this.InventoryBookId = 0;
        this.InventoryTermId = 0;
        this.IsOpenningTerm = false;
        this.CashOrCredit = false;
        this.IsStopped = false;
        this.IsDefaultTerm = false;
        this.UseItemTax = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Ms_Terms;
}());
var Ms_TermsCostCenter = /** @class */ (function () {
    function Ms_TermsCostCenter() {
        this.TermCostCenterId = 0;
        this.TermId = 0;
        this.CostCenterIdDebit = 0;
        this.CostCenterDebitFixed = false;
        this.ValuCostCenterDebit = "";
        this.CostCenterCredit = 0;
        this.CostCenterCreditFixed = false;
        this.ValuCostCenterCredit = "";
        this.CostCenterIdDisc = 0;
        this.CostCenterDiscIsFixed = false;
        this.ValuCostCenterDisc = "";
        this.CostCenterIdCash = 0;
        this.CostCenterCashIsFixed = false;
        this.ValuCostCenterCash = "";
        this.CostCenterIdTax = 0;
        this.CostCenterTaxIsFixed = false;
        this.ValuCostCenterTax = "";
        this.CenterDiscDebitOrCredit = false;
        this.CenterCashDebitOrCredit = false;
        this.CenterTaxDebitOrCredit = false;
        this.AddCostCenterId1 = 0;
        this.AddCostCenter1IsFixed = false;
        this.ValuAddCostCenter1 = "";
        this.AddCostCenterId2 = 0;
        this.AddCostCenterIsFixed2 = false;
        this.ValuAddCostCenter2 = "";
        this.AddCostCenterId3 = 0;
        this.AddCostCenterIsFixed3 = false;
        this.ValuAddCostCenter3 = "";
        this.AddCostCenterId4 = 0;
        this.AddCostCenterIsFixed4 = false;
        this.ValuAddCostCenter4 = "";
        this.AddCostCenterId5 = 0;
        this.AddCostCenterIsFixed5 = false;
        this.ValuAddCostCenter5 = "";
        this.AddCenter1DebitOrCredit = false;
        this.AddCenter2DebitOrCredit = false;
        this.AddCenter3DebitOrCredit = false;
        this.AddCenter4DebitOrCredit = false;
        this.AddCenter5DebitOrCredit = false;
    }
    return Ms_TermsCostCenter;
}());
var Ms_TermsDetails = /** @class */ (function () {
    function Ms_TermsDetails() {
        this.TermDetailId = 0;
        this.TermId = 0;
        this.AccountIdDebit = 0;
        this.AccountDebitFixed = 0;
        this.CostCenterIdDebit = 0;
        this.CostCenterDebitFixed = 0;
        this.ValuAccountDebit = "";
        this.AccountIdCredit = 0;
        this.AccountCreditFixed = 0;
        this.CostCenterIdCredit = 0;
        this.CostCenterCreditFixed = 0;
        this.ValuAccountCredit = "";
        this.AccountIdDisc = 0;
        this.AccountDiscIsFixed = 0;
        this.CostCenterIdDisc = 0;
        this.CostCenterDiscIsFixed = 0;
        this.ValuAccountDisc = "";
        this.AccountIdCash = 0;
        this.AccountCashIsFixed = 0;
        this.CostCenterIdCash = 0;
        this.CostCenterCashIsFixed = 0;
        this.ValuAccountCash = "";
        this.AccountIdTax = 0;
        this.AccountTaxIsFixed = 0;
        this.CostCenterIdTax = 0;
        this.CostCenterTaxIsFixed = 0;
        this.ValuAccountTax = "";
        this.AccDiscDebitOrCredit = false;
        this.AccCashDebitOrCredit = false;
        this.AccTaxDebitOrCredit = false;
        this.AddAccountId1 = 0;
        this.AddAccount1IsFixed = 0;
        this.AddCostCenterId1 = 0;
        this.AddCostCenter1IsFixed = 0;
        this.ValuAddAccount1 = "";
        this.AddAccountId2 = 0;
        this.AddAccountIsFixed2 = 0;
        this.AddCostCenterId2 = 0;
        this.AddCostCenterIsFixed2 = 0;
        this.ValuAddAccount2 = "";
        this.AddAccountId3 = 0;
        this.AddAccountIsFixed3 = 0;
        this.AddCostCenterId3 = 0;
        this.AddCostCenterIsFixed3 = 0;
        this.ValuAddAccount3 = "";
        this.AddAccountId4 = 0;
        this.AddAccountIsFixed4 = 0;
        this.AddCostCenterId4 = 0;
        this.AddCostCenterIsFixed4 = 0;
        this.ValuAddAccount4 = "";
        this.AddAccountId5 = 0;
        this.AddAccountIsFixed5 = 0;
        this.AddCostCenterId5 = 0;
        this.AddCostCenterIsFixed5 = 0;
        this.ValuAddAccount5 = "";
        this.AddAcc1DebitOrCredit = false;
        this.AddAcc2DebitOrCredit = false;
        this.AddAcc3DebitOrCredit = false;
        this.AddAcc4DebitOrCredit = false;
        this.AddAcc5DebitOrCredit = false;
        this.AnalaticalCodeMust = false;
    }
    return Ms_TermsDetails;
}());
var Sys_Books = /** @class */ (function () {
    function Sys_Books() {
        this.BookId = 0;
        this.PrefixCode = "";
        this.BookNameAR = "";
        this.BookNameEN = "";
        this.TermType = 0;
        this.UserId = 0;
        this.StoreId = 0;
        this.AutoSerial = false;
        this.SystemIssuedOnly = false;
        this.IsDefault = false;
        this.StartNum = 0;
        this.EndNum = 0;
        this.PostType = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Sys_Books;
}());
var MS_BoxCurrency = /** @class */ (function () {
    function MS_BoxCurrency() {
        this.BoxCurrencyId = 0;
        this.CurrencyId = 0;
        this.BoxId = 0;
        this.AccountId = 0;
        this.AccountChrtId = 0;
        this.RetAccountId = 0;
        this.BankExpensAccId = 0;
        this.ChequndercollectId = 0;
        this.CurrencyCode = 0;
        this.StatusFlag = "";
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Rate = "";
    }
    return MS_BoxCurrency;
}());
var Ms_BoxUsers = /** @class */ (function () {
    function Ms_BoxUsers() {
        this.BoxUsersId = 0;
        this.BoxId = 0;
        this.UserId = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.USER_NAME = "";
        this.FirstName = "";
        this.USER_CODE = "";
        this.StatusFlag = "";
    }
    return Ms_BoxUsers;
}());
var MS_Taxes = /** @class */ (function () {
    function MS_Taxes() {
        this.TaxesId = 0;
        this.TaxCode = "";
        this.TaxNameA = "";
        this.TaxNameE = "";
        this.TaxStyle = 0;
        this.TaxRate = 0;
        this.Remarks = "";
        this.AccountId = 0;
        this.IsAccomulative = false;
        this.PlusOrMinus = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.EtaxCode = "";
    }
    return MS_Taxes;
}());
var Sys_Counter = /** @class */ (function () {
    function Sys_Counter() {
        this.CounterId = 0;
        this.TrIdName = "";
        this.Counter = 0;
        this.BookId = 0;
    }
    return Sys_Counter;
}());
var Sys_FinancialIntervals = /** @class */ (function () {
    function Sys_FinancialIntervals() {
        this.FinancialIntervalsId = 0;
        this.FinancialIntervalCode = "";
        this.MonthNameA = "";
        this.MonthNameE = "";
        this.StartingFrom = "";
        this.StartingFromHijri = "";
        this.EndingDate = "";
        this.EndToHijri = "";
        this.IsClosed = false;
        this.IsActive = false;
        this.IsInUse = false;
        this.StopReason = "";
        this.StoppedByUserId = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.FinancialYearId = 0;
    }
    return Sys_FinancialIntervals;
}());
var Sys_FinancialYears = /** @class */ (function () {
    function Sys_FinancialYears() {
        this.FinancialYearsId = 0;
        this.FinancialYearsCode = 0;
        this.FinancialYearNameA = "";
        this.FinancialYearNameE = "";
        this.StartingFrom = "";
        this.StartingFromHijri = "";
        this.EndTo = "";
        this.EndToHijri = "";
        this.ClosingDate = "";
        this.ClosingDateHijri = "";
        this.YearState = "";
        this.NoOfIntervals = 0;
        this.YearType = false;
        this.SubPeriodsType = 0;
        this.IsClosed = false;
        this.IsActive = false;
        this.StopReason = "";
        this.StoppedByUserId = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Sys_FinancialYears;
}());
var MS_Expenses = /** @class */ (function () {
    function MS_Expenses() {
        this.ExpensesId = 0;
        this.ExpensesCode = "";
        this.ExpensesDescA = "";
        this.ExpensesDescE = "";
        this.ExpensesType = 0;
        this.ExpensesValue = 0;
        this.AccountId = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_Expenses;
}());
var Sr_VehicleTypes = /** @class */ (function () {
    function Sr_VehicleTypes() {
        this.VehicleTypId = 0;
        this.TypeCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.Remark = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Sr_VehicleTypes;
}());
var Sr_VehicleShapes = /** @class */ (function () {
    function Sr_VehicleShapes() {
        this.VehicleShapeId = 0;
        this.ShapeCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.Remark = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Sr_VehicleShapes;
}());
var Prod_Equipments = /** @class */ (function () {
    function Prod_Equipments() {
        this.EquipId = 0;
        this.EquipCode = "";
        this.EquipName1 = "";
        this.EquipName2 = "";
        this.JDesc = "";
        this.Remarks = "";
        this.StandardMonthlyCost = 0;
        this.StandardHolyDays = 0;
        this.StandardDailyCost = 0;
        this.StandardDailyWorkHours = 0;
        this.StandardHourlyCost = 0;
        this.NumberAvailable = 0;
        this.TimeRate = 0;
        this.BasUnitId = 0;
        this.QtyPerUnit = 0;
        this.IsScale = 0;
        this.MaxWeight = 0;
        this.MinWeight = 0;
        this.TechnicalSpecs = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Prod_Equipments;
}());
var Ms_ReceiptNote = /** @class */ (function () {
    function Ms_ReceiptNote() {
        this.RectId = 0;
        this.InvId = 0;
        this.RetPurId = 0;
        this.BoxId = 0;
        this.CurrencyId = 0;
        this.CustomerId = 0;
        this.StoreId = 0;
        this.BookId = 0;
        this.TermId = 0;
        this.EmpId = 0;
        this.CollectorId = 0;
        this.KeeperId = 0;
        this.ChequeOpenId = 0;
        this.BankNoticId = 0;
        this.ReservId = 0;
        this.InstallDates = "";
        this.FinancialIntervalsId = 0;
        this.TripId = 0;
        this.DBTableName = "";
        this.DBTableId = 0;
        this.AccountTableName = "";
        this.AccountId = 0;
        this.AId = 0;
        this.TrNo = 0;
        this.ManualTrNo = "";
        this.TrDate = "";
        this.TranType = 0;
        this.RectSourceType = 0;
        this.OtherSource = "";
        this.Rate = 0;
        this.PaidPrice = 0;
        this.NetPrice = 0;
        this.Commision = 0;
        this.ValueBeforeRate = 0;
        this.Value1 = 0;
        this.Value1BeforeRate = 0;
        this.Value2 = 0;
        this.Value2BeforeRate = 0;
        this.Value3 = 0;
        this.Value3BeforeRate = 0;
        this.Value4 = 0;
        this.Value4BeforeRate = 0;
        this.Value5 = 0;
        this.Value5BeforeRate = 0;
        this.Value6 = 0;
        this.Value6BeforeRate = 0;
        this.Value7 = 0;
        this.Value7BeforeRate = 0;
        this.Value8 = 0;
        this.Value8BeforeRate = 0;
        this.Value9 = 0;
        this.Value9BeforeRate = 0;
        this.Value10 = 0;
        this.Value10BeforeRate = 0;
        this.Equation = "";
        this.CheckNumber = "";
        this.BankAccNumber = "";
        this.DueDate = "";
        this.PaidDate = "";
        this.CheckType = 0;
        this.Remarks = "";
        this.IsPrinted = false;
        this.LastUpdate = "";
        this.ClientAccNo = "";
        this.ClientBankId = 0;
        this.strCustm1 = "";
        this.strCustm2 = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.AddField6 = "";
        this.AddField7 = "";
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.CheqBookId = 0;
        this.NoteNum = 0;
        this.IsKembiala = false;
        this.Closed = false;
        this.CloseDate = "";
        this.UncloseDate = "";
        this.ClosedBy = 0;
        this.UnclosedBy = 0;
        this.ReturnDate = "";
        this.ChequOwnerId = false;
        this.OwnerTranId = 0;
        this.ChequeTran = "";
        this.TotalInvoices = 0;
        this.NotPaidInvoices = 0;
        this.DifferenceInvoices = 0;
        this.ResourceBalance = 0;
        this.IsPaid = false;
        this.PaidDocId = 0;
        this.NotPaid = 0;
        this.TermCostCenterId = 0;
        this.TermCostCenterValue = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Ms_ReceiptNote;
}());
var MS_PaymentNote = /** @class */ (function () {
    function MS_PaymentNote() {
        this.PayId = 0;
        this.PurInvId = 0;
        this.RetSaleId = 0;
        this.BoxId = 0;
        this.CurrencyId = 0;
        this.VendorId = 0;
        this.StoreId = 0;
        this.EmpId = 0;
        this.CustodyEmpId = 0;
        this.BookId = 0;
        this.TermId = 0;
        this.ChequeOpenId = 0;
        this.ExpensesId = 0;
        this.BankNoticId = 0;
        this.FinancialIntervalsId = 0;
        this.TripId = 0;
        this.DBTableName = "";
        this.DBTableId = 0;
        this.AccountTableName = "";
        this.AccountId = 0;
        this.AId = 0;
        this.TrNo = 0;
        this.ManualTrNo = "";
        this.TrDate = "";
        this.TranType = 0;
        this.RectSourceType = 0;
        this.OtherSource = "";
        this.Rate = 0;
        this.PaidPrice = 0;
        this.NetPrice = 0;
        this.ValueBeforeRate = 0;
        this.Value1 = 0;
        this.Value1BeforeRate = 0;
        this.Value2 = 0;
        this.Value2BeforeRate = 0;
        this.Value3 = 0;
        this.Value3BeforeRate = 0;
        this.Value4 = 0;
        this.Value4BeforeRate = 0;
        this.Value5 = 0;
        this.Value5BeforeRate = 0;
        this.Value6 = 0;
        this.Value6BeforeRate = 0;
        this.Value7 = 0;
        this.Value7BeforeRate = 0;
        this.Value8 = 0;
        this.Value8BeforeRate = 0;
        this.Value9 = 0;
        this.Value9BeforeRate = 0;
        this.Value10 = 0;
        this.Value10BeforeRate = 0;
        this.Equation = "";
        this.CheckNumber = "";
        this.BankAccNumber = "";
        this.DueDate = "";
        this.PaidDate = "";
        this.CheckType = 0;
        this.strCustm1 = "";
        this.strCustm2 = "";
        this.Remarks = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.AddField6 = "";
        this.AddField7 = "";
        this.IsPrinted = false;
        this.LastUpdate = "";
        this.IsPettyCash = false;
        this.CheqBookId = 0;
        this.NoteNum = 0;
        this.IsKembiala = false;
        this.Closed = false;
        this.CloseDate = "";
        this.UncloseDate = "";
        this.ClosedBy = 0;
        this.UnclosedBy = 0;
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.TotalInvoices = 0;
        this.NotPaidInvoices = 0;
        this.DifferenceInvoices = 0;
        this.ResourceBalance = 0;
        this.IsPaid = false;
        this.PaidDocId = 0;
        this.NotPaid = 0;
        this.TermCostCenterId = 0;
        this.TermCostCenterValue = 0;
        this.TotalItems = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return MS_PaymentNote;
}());
var Ms_ReceiptNoteCurrencies = /** @class */ (function () {
    function Ms_ReceiptNoteCurrencies() {
        this.RecCurId = 0;
        this.RectId = 0;
        this.CurrencyCategoryId = 0;
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
        this.Total = 0;
    }
    return Ms_ReceiptNoteCurrencies;
}());
var BNk_BankNotice = /** @class */ (function () {
    function BNk_BankNotice() {
        this.BankNoticId = 0;
        this.StoreId = 0;
        this.CurrencyId = 0;
        this.TermId = 0;
        this.BookId = 0;
        this.FinancialIntervalsId = 0;
        this.AId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.KeeperNo = "";
        this.BoxId = 0;
        this.AccountId = 0;
        this.IsReceived = false;
        this.RefNo = 0;
        this.Remarks = "";
        this.TotalCheques = 0;
        this.PaperDirection = false;
        this.TranType = 0;
        this.BankExpenses = 0;
        this.TermCostCenterId = 0;
        this.TermCostCenterValue = 0;
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.Closed = false;
        this.CloseDate = "";
        this.UncloseDate = "";
        this.ClosedBy = 0;
        this.UnclosedBy = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return BNk_BankNotice;
}());
var ConnectionObj = /** @class */ (function () {
    function ConnectionObj() {
        this.ConnectionNumber = 0;
        this.ServerName = "";
        this.IntegratedSecurity = false;
        this.DbUserName = "";
        this.DbPassword = "";
        this.InitialCatalog = "";
        this.singleDb = "";
        this.Url = "";
    }
    return ConnectionObj;
}());
var Asset_AssetCard = /** @class */ (function () {
    function Asset_AssetCard() {
        this.AssetId = 0;
        this.AssetCatId = 0;
        this.CurrencyId = 0;
        this.CostCenterId = 0;
        this.CostCenterId2 = 0;
        this.CostCenterId3 = 0;
        this.DepartMentId = 0;
        this.StoreId = 0;
        this.CurrentEmpId = 0;
        this.AssetCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.NoDepreciation = false;
        this.Status = 0;
        this.PurchDate = "";
        this.PurchDoc = "";
        this.VendorDesc = "";
        this.SerialNo = "";
        this.WarrantyTerms = "";
        this.WarrantyDate = "";
        this.WarrantyNo = "";
        this.InsuranceExpiry = "";
        this.ResponsiblePerson = "";
        this.MarketPrice = 0;
        this.Barcode = 0;
        this.PurchPrice = 0;
        this.LastDeprDate = "";
        this.DeprStartDate = "";
        this.DeprInstallmentVal = 0;
        this.InstallMentCount = 0;
        this.RemainInstallments = 0;
        this.DeprMethod = 0;
        this.ProductivPeriod = 0;
        this.CurrentBookValue = 0;
        this.JunkValue = 0;
        this.IsProduction = false;
        this.EquipId = 0;
        this.CarLicenseNo = "";
        this.CarLicenseIssueDate = "";
        this.CarLicenseIssuePlace = "";
        this.CarLicenseExpiryDate = "";
        this.dtReg = "";
        this.dtRegRenew = "";
        this.Address = "";
        this.Address1 = "";
        this.Address2 = "";
        this.Address3 = "";
        this.Remarks = "";
        this.Tel = "";
        this.Tel2 = "";
        this.Tel3 = "";
        this.Tel4 = "";
        this.Tel5 = "";
        this.Fax = "";
        this.Email = "";
        this.Email2 = "";
        this.Email3 = "";
        this.Email4 = "";
        this.AddField1 = "";
        this.AddField2 = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Asset_AssetCard;
}());
var Asset_AssetCategory = /** @class */ (function () {
    function Asset_AssetCategory() {
        this.AssetCatId = 0;
        this.CatCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.ParentAssetCatId = 0;
        this.AssetCatType = 0;
        this.AssetCatLevel = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return Asset_AssetCategory;
}());
var MS_Settings = /** @class */ (function () {
    function MS_Settings() {
        this.SettingId = 0;
        this.ExpUseColor = false;
        this.ExpPeriod = 0;
        this.chekAlert = false;
        this.ItemLimitAlert = false;
        this.ItemMaxAlert = false;
        this.AlertCustCredit = false;
        this.AlertVendCredit = false;
        this.AlertTimeOut = 0;
        this.CustCodOrNam = false;
        this.VendCodOrNam = false;
        this.PartCodOrNam = false;
        this.AccountsDecimals = 0;
        this.QuantityDicimals = 0;
        this.PriceDicimals = 0;
        this.CostDicimals = 0;
        this.ValuesDicimals = 0;
        this.PercentDicimals = 0;
        this.DimensionDicimals = 0;
        this.TimeDecimals = 0;
        this.UseBarCodes = false;
        this.UseBasicOrAlterBarcod = false;
        this.UseSerialNumber = false;
        this.UseExpirySystem = false;
        this.UseExpiryDateColumn = false;
        this.UseProducDateColumn = false;
        this.UseLotNumberColumn = false;
        this.UseAlterItems = false;
        this.UseAttributes = false;
        this.UseHightColumn = false;
        this.UseWidthColumn = false;
        this.UseLengthColumn = false;
        this.UseUnitColumn = false;
        this.UseBrancheCodeColumn = false;
        this.UseBrancheNameColumn = false;
        this.UsePartitionCodeColumn = false;
        this.UsePartitionNameColumn = false;
        this.NoOfItemRemarksFields = 0;
        this.ItemCostAffectDoc = "";
        this.SalesReturnItemCost = "";
        this.PurchReturnItemCost = "";
        this.AskForAttachMove = 0;
        this.AttachmentPath = "";
        this.UseWeightCardSystem = false;
        this.UseCurrency = false;
        this.UseHijiryDate = false;
        this.SysDateFormat = "";
        this.ScaleAutoRead = false;
        this.ScaleAppPath = "";
        this.ScaleDataPath = "";
        this.ItemIssueCostMethod = 0;
        this.ItemIssueWhichCost = 0;
        this.UseFinancialQtyOnly = false;
        this.UseSimpleExpirySystem = false;
        this.UseComposItem = false;
        this.HideDeletedDocs = false;
        this.HideCustBranch = false;
        this.HideCurrency = false;
        this.HideSalesMan = false;
        this.HideMoneyCollector = false;
        this.DistDiscOnJobOrderItems = false;
        this.UseSalesJobOrders = false;
        this.UseItemTaxInPurch = false;
        this.UseItemTaxInSales = false;
        this.UseAnalyticalCode = false;
        this.UseShipping = false;
        this.UseVehicles = false;
        this.ItemDefTax = 0;
        this.PriceIncludTaxInSales = false;
        this.PriceIncludTaxInPurch = false;
        this.SearchItemWithQtySales = false;
        this.UseCatCodInItems = false;
        this.ItemSeparator;
        this.UseCatCodInCust = false;
        this.CustSeparator;
        this.UseCatCodInVend = false;
        this.VendSeparator;
    }
    return MS_Settings;
}());
var MS_ItemCard = /** @class */ (function () {
    function MS_ItemCard() {
        this.ItemCardId = 0;
        this.ItemCategoryId = 0;
        this.StoreId = 0;
        this.StorePartId = 0;
        this.BasUnitId = 0;
        this.TaxesId1 = 0;
        this.Tax1ForSale = false;
        this.Tax1ForPurch = false;
        this.Tax1Style = 0;
        this.Tax1Rate = 0;
        this.Tax1IsAccomulative = false;
        this.Tax1PlusOrMinus = false;
        this.TaxesId2 = 0;
        this.Tax2ForSale = false;
        this.Tax2ForPurch = false;
        this.Tax2Style = 0;
        this.Tax2Rate = 0;
        this.Tax2IsAccomulative = false;
        this.Tax2PlusOrMinus = false;
        this.TaxesId3 = 0;
        this.Tax3ForSale = false;
        this.Tax3ForPurch = false;
        this.Tax3Style = 0;
        this.Tax3Rate = 0;
        this.Tax3IsAccomulative = false;
        this.Tax3PlusOrMinus = false;
        this.ItemType = 0;
        this.ItemCode = "";
        this.TaxItemCode = "";
        this.ItemDescA = "";
        this.ItemDescE = "";
        this.QtyPartiation = 0;
        this.QtyInNotebook = 0;
        this.TotalCost = 0;
        this.PurchaseNumber = 0;
        this.LastSalePrice = 0;
        this.BeforLastCost = 0;
        this.LastCostManual = 0;
        this.ManualPurchasePrice = 0;
        this.LastCost = 0;
        this.CoastAverage = 0;
        this.LastPurchDate = "";
        this.FirstQty = 0;
        this.FirstPrice = 0;
        this.SecandQty = 0;
        this.SecandPrice = 0;
        this.ThridQty = 0;
        this.ThirdPrice = 0;
        this.LargeQty = 0;
        this.LargePrice = 0;
        this.Price5 = 0;
        this.Quantity5 = 0;
        this.Price6 = 0;
        this.Price7 = 0;
        this.Price8 = 0;
        this.Price9 = 0;
        this.Price10 = 0;
        this.LeastSalesPrice = 0;
        this.LeastProfitMargin = 0;
        this.QtyInBox = 0;
        this.PurchasePrice = 0;
        this.Wheight = 0;
        this.ServicePrice = 0;
        this.ProfitPrice = 0;
        this.Kirat = 0;
        this.strCustm5 = "";
        this.Remarks = "";
        this.AddField1 = "";
        this.AddField2 = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.AddField6 = "";
        this.AddField7 = "";
        this.AddField8 = "";
        this.AddField9 = "";
        this.AddField10 = "";
        this.ExpirPeriod = 0;
        this.PeriodType = 0;
        this.OfferDesc = "";
        this.InOffer = false;
        this.OfferFromDate = "";
        this.OfferToDate = "";
        this.IsOfferDiscount = false;
        this.IsDiscountPercent = false;
        this.Discount = 0;
        this.IsExpir = false;
        this.IsAttributeItem = false;
        this.IsCollection = false;
        this.IsDimension = false;
        this.IsSerialItem = false;
        this.AllPatchesSamePrice = false;
        this.UseSameItemAsMaterial = false;
        this.AutoSuggestBatches = false;
        this.CostWithDimension = false;
        this.DimensionSalesPrice = 0;
        this.LastUpdateTime;
        this.ItemLimit = 0;
        this.ItemMax = 0;
        this.Length = "";
        this.Width = "";
        this.Height = "";
        this.ItemSize = "";
        this.ItemColor = "";
        this.SerialNoPrefix = "";
        this.WarantyPeriod = 0;
        this.WarantyPeriodType = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.IsTempItem = false;
        this.ProductionItemUnit = 0;
        this.SpecialItemExeclud = false;
        this.IsCommisionPercent = false;
        this.Commision = 0;
        this.CommisionEndDate = "";
        this.IsOuterItem = false;
        this.UseSomeSubItems = false;
        this.Unit2IsMandatory = false;
        this.UseUnit2 = false;
        this.IsSalesStopped = false;
        this.IsServerEntity = false;
        this.MainServerId = 0;
    }
    return MS_ItemCard;
}());
var MS_ItemVendors = /** @class */ (function () {
    function MS_ItemVendors() {
        this.StatusFlag = "";
        this.VendorDescA = "";
        this.VendorDescE = "";
        this.VendorCode = "";
        this.ItemVendorId = 0;
        this.ItemCardId = 0;
        this.VendorId = 0;
        this.IsBasicVendor = false;
        this.UnitId = 0;
        this.UnitRate = 0;
        this.Quantity1;
        this.Price1;
        this.Quantity2;
        this.Price2;
        this.Quantity3;
        this.Price3;
        this.Quantity4;
        this.Price4;
        this.Quantity5;
        this.Price5;
        this.Quantity6;
        this.Price6;
        this.Quantity7;
        this.Price7;
        this.Quantity8;
        this.Price8;
        this.Quantity9;
        this.Price9;
        this.Quantity10;
        this.Price10;
    }
    return MS_ItemVendors;
}());
var Prod_ItemAttributes = /** @class */ (function () {
    function Prod_ItemAttributes() {
        this.AttributId = 0;
        this.AttributCode = "";
        this.AttributName1 = "";
        this.AttributName2 = "";
        this.IsActive = false;
        this.IsMandatory = false;
        this.Dimension = 0;
        this.IsFixedMenuValues = false;
        this.IsOptionalWithAlarm = false;
        this.BasUnitId = 0;
        this.DataType = 0;
        this.MinValu = 0;
        this.MaxValu = 0;
        this.IncrementalValu = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.UnitNam = "";
        this.UnitNameE = "";
    }
    return Prod_ItemAttributes;
}());
var Prod_ItemAttributsJoin = /** @class */ (function () {
    function Prod_ItemAttributsJoin() {
        this.StatusFlag = "";
        this.ProdItemAtrribId = 0;
        this.ItemCardId = 0;
        this.AttributId = 0;
        this.IsActive = false;
        this.IsMandatory = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.AttributName1 = "";
        this.AttributName2 = "";
        this.Dimension = "";
        this.AttributCode = "";
        this.BasUnitId = 0;
        this.UnitName = "";
    }
    return Prod_ItemAttributsJoin;
}());
var Ms_ItemPartition = /** @class */ (function () {
    function Ms_ItemPartition() {
        this.ItemPartId = 0;
        this.ItemCardId = 0;
        this.StoreId = 0;
        this.StorePartId = 0;
        this.LotNumberExpiryId = 0;
        this.QtyPartiation = 0;
        this.QtyInNotebook = 0;
        this.TotalCost = 0;
        this.PurchaseNumber = 0;
        this.FIFOCost = 0;
        this.LIFOCost = 0;
        this.CoastAverage = 0;
        this.BatchNumberFifoOrLifo = "";
        this.VarianceQty = 0;
        this.ReservedQty = 0;
        this.RequestedQty = 0;
        this.SaleNotDelivered = 0;
        this.PurNotReceived = 0;
        this.QtyOutWithoutBalance = 0;
        this.QtyInWithoutCost = 0;
        this.SalesOrder = 0;
        this.PurchaseOrder = 0;
        this.WithoutCost = 0;
        this.ItemLimit = 0;
        this.ItemMax = 0;
        this.TVersion;
        this.TType;
        this.QtyIUnit2Notebook = 0;
        this.QtyIUnit2Partiation = 0;
        this.UpdatedAt = "";
    }
    return Ms_ItemPartition;
}());
var Ms_ItemCardOffers = /** @class */ (function () {
    function Ms_ItemCardOffers() {
        this.OfferItemId = 0;
        this.ItemCardId = 0;
        this.UnitId = 0;
        this.BasicQuantity = 0;
        this.GiftItemCardId = 0;
        this.GiftUnitId = 0;
        this.GiftQuantity = 0;
        this.IsGiftDiscount = false;
        this.IsDiscountPercent = false;
        this.GiftDiscount = 0;
        this.PriceAfterDisc = 0;
        this.IsReplace = false;
        this.FromDate = "";
        this.ToDate = "";
        this.StatusFlag = "";
    }
    return Ms_ItemCardOffers;
}());
var MS_ItemImages = /** @class */ (function () {
    function MS_ItemImages() {
        this.ImgId = 0;
        this.ItemCardId = 0;
        this.Image;
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
        this.ImageStr = "";
    }
    return MS_ItemImages;
}());
var Prod_BasicUnits = /** @class */ (function () {
    function Prod_BasicUnits() {
        this.BasUnitId = 0;
        this.UnitCode = "";
        this.UnitNam = "";
        this.UnitNameE = "";
        this.UnittRate = 0;
        this.Symbol = "";
        this.ParentUnit = 0;
        this.Remarks = "";
        this.AutoDesc = "";
        this.EtaxUnitCode = "";
        this.IsKarat = false;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.StatusFlag = "";
    }
    return Prod_BasicUnits;
}());
var Ms_ItemUnit = /** @class */ (function () {
    function Ms_ItemUnit() {
        this.UnitId = 0;
        this.ItemCardId = 0;
        this.BasUnitId = 0;
        this.UnittRate = 0;
        this.UnitCode = "";
        this.UnitNam = "";
        this.UnitNameE = "";
        this.Symbol = "";
        this.BarCode1 = "";
        this.BarCode2 = "";
        this.BarCode3 = "";
        this.BarCode4 = "";
        this.BarCode5 = "";
        this.BarCode6 = "";
        this.BarCode7 = "";
        this.BarCode8 = "";
        this.BarCode9 = "";
        this.BarCode10 = "";
        this.BarCode11 = "";
        this.BarCode12 = "";
        this.BarCode13 = "";
        this.BarCode14 = "";
        this.BarCode15 = "";
        this.StatusFlag = "";
        this.DefaultBarCode = 0;
        this.ManualPurchasePrice = 0;
        this.LastCost = 0;
        this.BeforLastCost = 0;
        this.LastSalePrice = 0;
        this.LastCostManual = 0;
        this.IsDefaultSale = false;
        this.IsDefaultPurchas = false;
        this.IsBasicUnit = false;
        this.IsNotRegular = false;
        this.Price1 = 0;
        this.Quantity1 = 0;
        this.Price2 = 0;
        this.Quantity2 = 0;
        this.Price3 = 0;
        this.Quantity3 = 0;
        this.Price4 = 0;
        this.Quantity4 = 0;
        this.Price5 = 0;
        this.Quantity5 = 0;
        this.Price6 = 0;
        this.Price7 = 0;
        this.Price8 = 0;
        this.Price9 = 0;
        this.Price10 = 0;
        this.LeastSalesPrice = 0;
        this.LeastProfitMargin = 0;
        this.Wheight = 0;
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
    }
    return Ms_ItemUnit;
}());
var MS_ItemAlternatives = /** @class */ (function () {
    function MS_ItemAlternatives() {
        this.AlterId = 0;
        this.ItemCardId = 0;
        this.AlterItemCardId = 0;
        this.UnitId = 0;
        this.UnitRate = 0;
        this.ItemType = 0;
        this.Quantity = 0;
        this.QtyBeforRate = 0;
        this.Remarks = "";
        this.StatusFlag = "";
        this.ItemDescA = "";
        this.ItemDescE = "";
        this.UnitNam = "";
        this.ItemTypeName = "";
    }
    return MS_ItemAlternatives;
}());
var Ms_ItemCollection = /** @class */ (function () {
    function Ms_ItemCollection() {
        this.ItemCollectId = 0;
        this.ItemCardId = 0;
        this.ItemCode = "";
        this.SubItemId = 0;
        this.UnitId = 0;
        this.UnitRate = 0;
        this.ItemType = 0;
        this.Quantity = 0;
        this.QtyBeforRate = 0;
        this.Remarks = "";
        this.IsNotBasic = false;
        this.StatusFlag = "";
        this.UnitNam = "";
        this.ItemDescA = "";
        this.ItemDescE = "";
        this.ItemTypeName = "";
    }
    return Ms_ItemCollection;
}());
var Prod_ItemcardExpenses = /** @class */ (function () {
    function Prod_ItemcardExpenses() {
        this.ProdExpensId = 0;
        this.ItemCardId = 0;
        this.AccountId = 0;
        this.IsPercent = false;
        this.PercentOf = 0;
        this.ExpenseValu = 0;
        this.StatusFlag = "";
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
    }
    return Prod_ItemcardExpenses;
}());
var MS_PurchasInvoice = /** @class */ (function () {
    function MS_PurchasInvoice() {
        this.PurInvId = 0;
        this.VendorId = 0;
        this.StorId = 0;
        this.PurOrderId = 0;
        this.PurOrderReqId = 0;
        this.BookId = 0;
        this.TermId = 0;
        this.CurrencyId = 0;
        this.VendBranchId = 0;
        this.ExpensesId = 0;
        this.FinancialIntervalsId = 0;
        this.DBTableName = "";
        this.DBTableId = 0;
        this.AccountTableName = "";
        this.RectSourceType = 0;
        this.AccountId = 0;
        this.TaxesId1 = 0;
        this.TaxValue1 = 0;
        this.TaxesId2 = 0;
        this.TaxValue2 = 0;
        this.TaxesId3 = 0;
        this.TaxValue3 = 0;
        this.AId = 0;
        this.TrNo = 0;
        this.ManualTrNo = "";
        this.TrDate = "";
        this.InvDescA = "";
        this.InvDescE = "";
        this.Remarks = "";
        this.AddField3 = "";
        this.AddField4 = "";
        this.AddField5 = "";
        this.AddField6 = "";
        this.AddField7 = "";
        this.InvoiceType = 0;
        this.InvDueDate = "";
        this.TotalItemTax1 = 0;
        this.TotalItemTax2 = 0;
        this.TotalItemTax3 = 0;
        this.TotalTaxValu = 0;
        this.InvTotal = 0;
        this.DiscPercent = 0;
        this.DiscAmount = 0;
        this.DiscPercent2 = 0;
        this.DiscAmount2 = 0;
        this.DiscPercent3 = 0;
        this.DiscAmount3 = 0;
        this.DiscPercent4 = 0;
        this.DiscAmount4 = 0;
        this.PriceAfterTax = 0;
        this.ExpenValue = 0;
        this.PaidPrice = 0;
        this.NetPrice = 0;
        this.PaidPriceVisa = 0;
        this.Closed = false;
        this.IsPrinted = false;
        this.Rate = 0;
        this.NetPriceBeforCurr = 0;
        this.ExpenValueBeforCurr = 0;
        this.ExpenValueWithCurr = 0;
        this.AdvancExpenseWithCurr = 0;
        this.AdvancExpenseBeforCurr = 0;
        this.IsDelivered = false;
        this.IsPosted = false;
        this.Postedby = "";
        this.PostedDate = "";
        this.CloseDate = "";
        this.UncloseDate = "";
        this.ClosedBy = 0;
        this.UnclosedBy = 0;
        this.PermPrinted = 0;
        this.PermPrintedAt = "";
        this.IsPaid = false;
        this.PaidDocId = 0;
        this.NotPaid = 0;
        this.TermCostCenterId = 0;
        this.TermCostCenterValue = 0;
        this.IsShippingInv = false;
        this.IsNoCostDeliver = 0;
        this.DeliverNoCostExecut = false;
        this.MultiResourceDeliver = false;
        this.EtaxSent = false;
        this.EtaxSentTime = "";
        this.EtaxRemarks = "";
        this.EtaxReference = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.IsReturned = false;
        this.ShiftId = 0;
        this.LastUpdateTime;
        this.IsRemoteEntity = false;
        this.RemotId = 0;
        this.MainVendServerId = 0;
    }
    return MS_PurchasInvoice;
}());
var MS_PurchaseInvoiceItemCard = /** @class */ (function () {
    function MS_PurchaseInvoiceItemCard() {
        this.InvItemCardId = 0;
        this.PurInvId = 0;
        this.ItemTotal = 0;
        this.ItemTotalAfterRate = 0;
        this.ItemCardId = 0;
        this.ItemAtrribBatchId = 0;
        this.StoreId = 0;
        this.StorePartId = 0;
        this.StockRecItemCardId = 0;
        this.CityIDFrom = 0;
        this.CityIDTo = 0;
        this.ItemIdToFollow = 0;
        this.FollowCollectionId = 0;
        this.LotNumberExpiryId = 0;
        this.TaxesId1 = 0;
        this.Tax1Style = 0;
        this.Tax1IsAccomulative = false;
        this.Tax1PlusOrMinus = false;
        this.Tax1Percent = 0;
        this.TaxValue1 = 0;
        this.TaxesId2 = 0;
        this.Tax2Style = 0;
        this.Tax2IsAccomulative = false;
        this.Tax2PlusOrMinus = false;
        this.Tax2Percent = 0;
        this.TaxValue2 = 0;
        this.TaxesId3 = 0;
        this.Tax3Style = 0;
        this.Tax3IsAccomulative = false;
        this.Tax3PlusOrMinus = false;
        this.Tax3Percent = 0;
        this.TaxValue3 = 0;
        this.ScaleCardId = 0;
        this.UnitId = 0;
        this.UnitRate = 0;
        this.ItemType = 0;
        this.PayId = 0;
        this.VJOrderId = 0;
        this.StockRecId = 0;
        this.BarCode = "";
        this.BatchNumberFifoOrLifo = "";
        this.QuantityRecieved = 0;
        this.QtyRecievedBeforRate = 0;
        this.Quantity = 0;
        this.QtyBeforRate = 0;
        this.ExecutedQty = 0;
        this.QtyIUnit2 = 0;
        this.ReturnQty = 0;
        this.ReturnQtyBeforRate = 0;
        this.Price = 0;
        this.PriceAfterRate = 0;
        this.ServicePrice = 0;
        this.ProfitPrice = 0;
        this.Kirat = 0;
        this.DisAmount = 0;
        this.DisPercent = 0;
        this.DisAmountAfterRate = 0;
        this.MainDiscPercent = 0;
        this.MainDiscValue = 0;
        this.TaxableValue = 0;
        this.FIFOCost = 0;
        this.FIFOCostUnit = 0;
        this.LIFOCost = 0;
        this.LIFOCostUnit = 0;
        this.CoastAverage = 0;
        this.CoastAverageUnit = 0;
        this.IsCollection = false;
        this.ExpenseShare = 0;
        this.ExpenseShareUnit = 0;
        this.PriceAfterExpense = 0;
        this.PriceAfterExpenseUnit = 0;
        this.PriceAfterCurr = 0;
        this.PriceAfterCurrUnit = 0;
        this.ExpenseShareAfterCurr = 0;
        this.ExpenseShareAfterCurrUnit = 0;
        this.PriceAfterExpenseAfterCurr = 0;
        this.PriceAfterExpensAfterCurrUnit = 0;
        this.Remarks = "";
        this.Remarks1 = "";
        this.Remarks2 = "";
        this.Remarks3 = "";
        this.ItemCardDesc = "";
        this.ItemCardDescE = "";
        this.PriceIncludTaxInPurch = false;
        this.IsNoCostDeliver = 0;
        this.DeliverNoCostExecut = false;
        this.AId = 0;
        this.DBTableName = "";
        this.DBTableId = 0;
        this.AccountTableName = "";
        this.RectSourceType = 0;
        this.AccountId = 0;
        this.RectSourceTypeId = 0;
        this.VehicleId = 0;
        this.QtyBeforDiscount = 0;
        this.QtyDiscount = 0;
        this.QualityDiscount = 0;
        this.QualityValueDisc = 0;
        this.QtyScalDiffrence = 0;
        this.QtyScalDiffrenceValue = 0;
        this.LastUpdateTime;
        this.MainServerId = 0;
        this.ServerUnitId = 0;
        this.ServerItemCardId = 0;
        this.ItemDescA = "";
        this.ItemDescE = "";
        this.UnitNam = "";
        this.StatusFlag = "";
    }
    return MS_PurchaseInvoiceItemCard;
}());
//# sourceMappingURL=Entities.js.map