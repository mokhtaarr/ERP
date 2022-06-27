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
var Custom_AlertLog = /** @class */ (function (_super) {
    __extends(Custom_AlertLog, _super);
    function Custom_AlertLog() {
        var _this = _super.call(this) || this;
        _this.AlertSubTypeID = "";
        _this.AlertTypeID = "";
        _this.CompCode = "";
        _this.MsgBody = "";
        _this.SystemCode = "";
        return _this;
        //this.MemberIDs;
    }
    return Custom_AlertLog;
}(SecurityClass));
var MasterDetailsUserRoles = /** @class */ (function (_super) {
    __extends(MasterDetailsUserRoles, _super);
    function MasterDetailsUserRoles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MasterDetailsUserRoles;
}(SecurityClass));
var MasterDetails_Branches = /** @class */ (function () {
    function MasterDetails_Branches() {
    }
    return MasterDetails_Branches;
}());
var MasterDetails_AccountChart = /** @class */ (function () {
    function MasterDetails_AccountChart() {
    }
    return MasterDetails_AccountChart;
}());
var Cal_AccountUsersVm = /** @class */ (function () {
    function Cal_AccountUsersVm() {
        this.AccUserId = 0;
        this.AccountId = 0;
        this.UserId = 0;
        this.USERNAME = "";
        this.Remarks1 = "";
        this.Remarks2 = "";
        this.TranAndView = false;
        this.StatusFlag = "";
    }
    return Cal_AccountUsersVm;
}());
var DetailesForCustomer = /** @class */ (function () {
    function DetailesForCustomer() {
    }
    return DetailesForCustomer;
}());
var DetailesForEmployees = /** @class */ (function () {
    function DetailesForEmployees() {
    }
    return DetailesForEmployees;
}());
var UserVm = /** @class */ (function () {
    function UserVm() {
        this.UserCode = "";
        this.UserName = "";
        this.FirstName = "";
        this.StatusFlag = "";
        this.CustUserId = 0;
        this.CustomerId = 0;
    }
    return UserVm;
}());
var CustomCusromerUsers = /** @class */ (function () {
    function CustomCusromerUsers() {
        this.CustUserId = 0;
        this.CustomerId = 0;
        this.UserId = 0;
        this.USER_CODE = "";
        this.USER_NAME = "";
        this.FirstName = "";
        this.StatusFlag = "";
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return CustomCusromerUsers;
}());
var DetailesForVendor = /** @class */ (function () {
    function DetailesForVendor() {
    }
    return DetailesForVendor;
}());
var CustomVendorUsers = /** @class */ (function () {
    function CustomVendorUsers() {
        this.VendUserId = 0;
        this.VendorId = 0;
        this.UserId = 0;
        this.USER_CODE = "";
        this.USER_NAME = "";
        this.FirstName = "";
        this.StatusFlag = "";
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    return CustomVendorUsers;
}());
var MasterDetailsSearch = /** @class */ (function () {
    function MasterDetailsSearch() {
    }
    return MasterDetailsSearch;
}());
var NameAndValueInSearch = /** @class */ (function () {
    function NameAndValueInSearch() {
    }
    return NameAndValueInSearch;
}());
var FindKeyClass = /** @class */ (function () {
    function FindKeyClass() {
    }
    return FindKeyClass;
}());
var CustomEmpSalaryTypes = /** @class */ (function () {
    function CustomEmpSalaryTypes() {
        this.EmpSalaryTypesId = 0;
        this.SalaryCode = "";
        this.Name1 = "";
        this.Name2 = "";
        this.SalaryValu = 0;
        this.EmpId = 0;
        this.SalaryTypId = 0;
        this.DepitAccountCode = "";
        this.DebitAccountNameA = "";
        this.DebitAccountNameE = "";
        this.CreditAccountCode = "";
        this.CreditAccountNameA = "";
        this.CreditAccountNameE = "";
        this.DepitCostCode = "";
        this.DebitCostNameA = "";
        this.DebitCostNameE = "";
        this.CrediCostCode = "";
        this.CrediCostNameA = "";
        this.CrediCostNameE = "";
    }
    return CustomEmpSalaryTypes;
}());
var CurrencyDetails = /** @class */ (function () {
    function CurrencyDetails() {
    }
    return CurrencyDetails;
}());
var CustomCurrencyCategory = /** @class */ (function () {
    function CustomCurrencyCategory() {
        this.CurrencyCatJoinId = 0;
        this.CurrencyId = 0;
        this.CurrencyCategoryId = 0;
        this.CurrencyCategoryNameA = "";
        this.CurrencyCategoryNameE = "";
        this.CurrencyType = "";
        this.code = "";
        this.StatusFlag = "";
    }
    return CustomCurrencyCategory;
}());
var CustomCurrencyRate = /** @class */ (function () {
    function CustomCurrencyRate() {
        this.CurrencyId = 0;
        this.EqualCurrencyPriceId = 0;
        this.EquivalentCurrencyId = 0;
        this.CurrencyCode = "";
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Rate = 0;
        this.StatusFlag = "";
    }
    return CustomCurrencyRate;
}());
var CustomJurnalDetail = /** @class */ (function () {
    function CustomJurnalDetail() {
        this.JurnalDetailId = 0;
        this.AccountId = 0;
        this.JurnalId = 0;
        this.CustAccountId = 0;
        this.VendAccountId = 0;
        this.EmpAccountId = 0;
        this.AssetAccountId = 0;
        this.BusinessPartnerAccId = 0;
        this.CostCenterId1 = 0;
        this.AccountType = "";
        this.AccountCode = "";
        this.SubAccountCode = "";
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.CurrencyCreditor = 0;
        this.CurrencyDebtor = 0;
        this.CurrencyId = 0;
        this.CodeCurrency = "";
        this.NameCurrency = "";
        this.Rate = 0;
        this.Creditor = 0;
        this.Debtor = 0;
        this.Descriptions = "";
        this.Remarks = "";
        this.CostCenterCode = "";
        this.CostCenterNameA = "";
        this.CostCenterNameE = "";
        this.StatusFlag = "";
    }
    return CustomJurnalDetail;
}());
var CustomJurnalDetailAndmodel = /** @class */ (function () {
    function CustomJurnalDetailAndmodel() {
    }
    return CustomJurnalDetailAndmodel;
}());
var PostJurnalDetailAndmodel = /** @class */ (function () {
    function PostJurnalDetailAndmodel() {
    }
    return PostJurnalDetailAndmodel;
}());
var TermsHeaderAndDetails = /** @class */ (function () {
    function TermsHeaderAndDetails() {
    }
    return TermsHeaderAndDetails;
}());
var BoxBankHeaderAndDetails = /** @class */ (function () {
    function BoxBankHeaderAndDetails() {
    }
    return BoxBankHeaderAndDetails;
}());
var FinancialYearsDetails = /** @class */ (function () {
    function FinancialYearsDetails() {
    }
    return FinancialYearsDetails;
}());
var Connection = /** @class */ (function () {
    function Connection() {
        this.ConnectionNumber = 0;
        this.ServerName = "";
        this.IntegratedSecurity = false;
        this.UserName = "";
        this.Password = "";
        this.Database = "";
        this.singleDb = false;
        this.Url = "";
    }
    return Connection;
}());
var CurrencyCategoryShared = /** @class */ (function () {
    function CurrencyCategoryShared() {
        this.CurrencyCategoryId = 0;
        this.RectId = 0;
        this.RecCurId = 0;
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
    }
    return CurrencyCategoryShared;
}());
var PayCurrencyCategoryShared = /** @class */ (function () {
    function PayCurrencyCategoryShared() {
        this.CurrencyCategoryId = 0;
        this.PayId = 0;
        this.RecCurId = 0;
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
    }
    return PayCurrencyCategoryShared;
}());
var ReceiptNoteAndDetails = /** @class */ (function () {
    function ReceiptNoteAndDetails() {
    }
    return ReceiptNoteAndDetails;
}());
var PaymentNoteAndDetails = /** @class */ (function () {
    function PaymentNoteAndDetails() {
    }
    return PaymentNoteAndDetails;
}());
var CountInDashboard = /** @class */ (function () {
    function CountInDashboard() {
        this.ReceiptNoteCount = 0;
        this.PaymentNoteCount = 0;
        this.CustomerCount = 0;
        this.VendorCount = 0;
        this.UsersCount = 0;
    }
    return CountInDashboard;
}());
var Asset_AssetCardDetailes = /** @class */ (function () {
    function Asset_AssetCardDetailes() {
    }
    return Asset_AssetCardDetailes;
}());
var MS_ItemCardDetailesVM = /** @class */ (function () {
    function MS_ItemCardDetailesVM() {
    }
    return MS_ItemCardDetailesVM;
}());
var SharedVM = /** @class */ (function () {
    function SharedVM() {
    }
    return SharedVM;
}());
var Ms_ItemUnitVM = /** @class */ (function () {
    function Ms_ItemUnitVM() {
    }
    return Ms_ItemUnitVM;
}());
var ItemsVM = /** @class */ (function () {
    function ItemsVM() {
    }
    return ItemsVM;
}());
//# sourceMappingURL=CustomEntities.js.map