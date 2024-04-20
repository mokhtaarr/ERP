class Custom_AlertLog extends SecurityClass {
    constructor() {
        super();
        this.AlertSubTypeID = "";
        this.AlertTypeID = "";
        this.CompCode = "";
        this.MsgBody = "";
        this.SystemCode = "";
        //this.MemberIDs;
    }
    public MemberIDs: Array<number>;
    public SystemCode: string;
    public AlertTypeID: string;
    public MsgBody: string;
    public CompCode: string;
    public AlertSubTypeID: string;



}
class MasterDetailsUserRoles extends SecurityClass {

    public G_USERS: G_USERS;
    public G_RoleUsers: Array<G_RoleUsers>;
    public BRANCHDetailsModel: Array<G_USER_BRANCH>;

}


class MasterDetails_Branches {

    public MS_Stores: MS_Stores;
    public MS_Partitions: Array<MS_Partition>;


}


class MasterDetails_AccountChart {
    public Cal_AccountChart: Cal_AccountChart;
    public Cal_AccountUsers: Array<Cal_AccountUsers>;
    public Clauses: Array<Cal_Clauses>;
}

class Cal_AccountUsersVm {
    constructor() {
        this.AccUserId = 0;
        this.AccountId = 0;
        this.UserId = 0;
        this.USERNAME = "";
        this.Remarks1 = "";
        this.Remarks2 = "";
        this.TranAndView = false;
        this.StatusFlag = "";
    }
    public AccUserId: number;
    public AccountId: number;
    public UserId: number;
    public USERNAME: string;
    public Remarks1: string;
    public Remarks2: string;
    public TranAndView: boolean;
    public StatusFlag: string;
}

class DetailesForCustomer {
    public Customer: MS_Customer;
    public branches: Array<Ms_CustomerBranches>;
    public contacts: Array<Ms_CustomerContacts>;
    public CustomUsers: Array<CustomCusromerUsers>;
    public users: Array<Ms_CusromerUsers>;
    public accounts: Array<Cal_CustAccounts>;
}

class DetailesForEmployees {
    public Model: Hr_Employees;
    public accounts: Array<Cal_EmpAccounts>;
}


class UserVm {
    constructor() {
        this.UserCode = "";
        this.UserName = "";
        this.FirstName = "";
        this.StatusFlag = "";
        this.CustUserId = 0;
        this.CustomerId = 0;
    }
    public UserCode: string;
    public UserName: string;
    public FirstName: string;
    public StatusFlag: string;
    public CustUserId: number;
    public CustomerId: number;
    public UserId: number;
}

class CustomCusromerUsers {
    constructor() {
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
    public CustUserId: number;
    public CustomerId: number;
    public UserId: number;
    public USER_CODE: string;
    public USER_NAME: string;
    public FirstName: string;
    public StatusFlag: string;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}


class DetailesForVendor {
    public Vendor: MS_Vendor;
    public branches: Array<Ms_VendorBranches>;
    public contacts: Array<Ms_VendorContacts>;
    public CustomUsers: Array<CustomVendorUsers>;
    public users: Array<Ms_VendorUsers>;
    public accounts: Array<Cal_VendAccounts>;
}

class CustomVendorUsers {
    constructor() {
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
    public VendUserId: number;
    public VendorId: number;
    public UserId: number;
    public USER_CODE: string;
    public USER_NAME: string;
    public FirstName: string;
    public StatusFlag: string;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MasterDetailsSearch {
    public module: G_SearchFormModule;
    public settings: G_SearchForm;
    public ColumnSetting: Array<G_SearchFormSetting>;
}

class NameAndValueInSearch {
    public Name: string;
    public Value: string;
}

class FindKeyClass {
    public moduleCode: string
    public Condition: string
    public valueInSearches: Array<NameAndValueInSearch>
    public controlName: string
    public SystemCode: string
    public SubSystemCode: string
    public ScreenLanguage: string
}

class CustomEmpSalaryTypes {
    constructor() {
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
    public EmpSalaryTypesId: number;
    public SalaryCode: string;
    public Name1: string;
    public Name2: string;
    public SalaryValu: number;
    public EmpId: number;
    public SalaryTypId: number;

    public DepitAccountCode: string;
    public DebitAccountNameA: string;
    public DebitAccountNameE: string;
    public CreditAccountCode: string;
    public CreditAccountNameA: string;
    public CreditAccountNameE: string;

    public DepitCostCode: string;
    public DebitCostNameA: string;
    public DebitCostNameE: string;
    public CrediCostCode: string;
    public CrediCostNameA: string;
    public CrediCostNameE: string;
}


class CurrencyDetails {
    public Currency: MS_Currency;
    public CurrencyCategories: Array<CustomCurrencyCategory>;
    public CurrencyRate: Array<CustomCurrencyRate>;
}

class CustomCurrencyCategory {
    constructor() {
        this.CurrencyCatJoinId = 0;
        this.CurrencyId = 0;
        this.CurrencyCategoryId = 0;
        this.CurrencyCategoryNameA = "";
        this.CurrencyCategoryNameE = "";
        this.CurrencyType = "";
        this.code = "";
        this.StatusFlag = "";
    }
    public CurrencyCatJoinId: number;
    public CurrencyId: number;
    public CurrencyCategoryId: number;
    public CurrencyCategoryNameA: string;
    public CurrencyCategoryNameE: string;
    public CurrencyType: string;
    public code: string;
    public StatusFlag: string;
}

class CustomCurrencyRate {
    constructor() {
        this.CurrencyId = 0;
        this.EqualCurrencyPriceId = 0;
        this.EquivalentCurrencyId = 0;
        this.CurrencyCode = "";
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Rate = 0;
        this.StatusFlag = "";
    }
    public EqualCurrencyPriceId: number;
    public EquivalentCurrencyId: number;
    public CurrencyId: number;
    public CurrencyCode: string;
    public CurrencyDescA: string;
    public CurrencyDescE: string;
    public Rate: number;
    public StatusFlag: string;
}

class CustomJurnalDetail {
    constructor() {
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
        this.CurrencyCreditor =0;
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
    public JurnalDetailId: number;
    public AccountId: number;
    public JurnalId: number;
    public CustAccountId: number;
    public VendAccountId: number;
    public EmpAccountId: number;
    public AssetAccountId: number;
    public BusinessPartnerAccId: number;
    public CostCenterId1: number;
    public AccountType: string;
    public AccountCode: string;
    public SubAccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public CurrencyCreditor: number;
    public CurrencyDebtor: number;
    public CurrencyId: number;
    public CodeCurrency: string;
    public NameCurrency: string;
    public Rate: number;
    public Creditor: number;
    public Debtor: number;
    public Descriptions: string;
    public Remarks: string;
    public CostCenterCode: string;
    public CostCenterNameA: string;
    public CostCenterNameE: string;
    public StatusFlag: string;
}

class CustomJurnalDetailAndmodel {
    public JurnalEntry: Cal_JurnalEntry;
    public JurnalDetails: Array<CustomJurnalDetail>;
}

class PostJurnalDetailAndmodel {
    public JurnalEntry: Cal_JurnalEntry;
    public JurnalDetails: Array<Cal_JurnalDetail>;
}

class TermsHeaderAndDetails {
    public Terms: Ms_Terms;
    public TermsDetails: Ms_TermsDetails;
}


class BoxBankHeaderAndDetails {
    public BoxBank: MS_BoxBank;
    public BoxCurrency: Array<MS_BoxCurrency>;
    public BoxUsers: Array<Ms_BoxUsers>;
}

class FinancialYearsDetails {
    public Model: Sys_FinancialYears;
    public Intervals: Array<Sys_FinancialIntervals>;
}

class Connection {
    constructor() {
        this.ConnectionNumber = 0;
        this.ServerName = "";
        this.IntegratedSecurity = false;
        this.UserName = "";
        this.Password = "";
        this.Database = "";
        this.singleDb = false;
        this.Url = "";
    }
    public ConnectionNumber: number;
    public ServerName: string;
    public IntegratedSecurity: boolean;
    public UserName: string;
    public Password: string;
    public Database: string;
    public singleDb: boolean;
    public Url: string;
}

class CurrencyCategoryShared {
    constructor() {
        this.CurrencyCategoryId = 0;
        this.RectId = 0;
        this.RecCurId = 0;
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
    }
    public CurrencyCategoryId: number;
    public RectId: number;
    public RecCurId: number;
    public CurrencyDescA: string;
    public CurrencyDescE: string;
    public Value: number;
    public Count: number;
    public Price: number;
}

class PayCurrencyCategoryShared {
    constructor() {
        this.CurrencyCategoryId = 0;
        this.PayId = 0;
        this.RecCurId = 0;
        this.CurrencyDescA = "";
        this.CurrencyDescE = "";
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
    }
    public CurrencyCategoryId: number;
    public PayId: number;
    public RecCurId: number;
    public CurrencyDescA: string;
    public CurrencyDescE: string;
    public Value: number;
    public Count: number;
    public Price: number;
}

class ReceiptNoteAndDetails {
    public Ms_Receipt: Ms_ReceiptNote;
    public Currencies: Array<CurrencyCategoryShared>;
}


class PaymentNoteAndDetails {
    public PaymentNote: MS_PaymentNote;
    public Currencies: Array<CurrencyCategoryShared>;
}

class CountInDashboard {
    constructor() {
        this.ReceiptNoteCount = 0;
        this.PaymentNoteCount = 0;
        this.CustomerCount = 0;
        this.VendorCount = 0;
        this.UsersCount = 0;
    }
    public ReceiptNoteCount: number;
    public PaymentNoteCount: number;
    public CustomerCount: number;
    public VendorCount: number;
    public UsersCount: number;
}


class Asset_AssetCardDetailes {
    public Model: Asset_AssetCard;
    public accounts: Array<Cal_AssetAccounts>;
}

class MS_ItemCardDetailesVM {
    public Model: MS_ItemCard;
    public Vendors: Array<MS_ItemVendors>;
    public AttributsJoin: Array<Prod_ItemAttributsJoin>;
    public Offers: Array<Ms_ItemCardOffers>;
    public ItemImages: Array<MS_ItemImages>;
    public StrItemImages: Array<string>;
    public GiftUnits: Array<Ms_ItemUnitVM>;
    public ItemCardUnits: Array<Ms_ItemUnitVM>;

    public ItemUnit: Array<Ms_ItemUnit>;
    public ItemAlternatives: Array<MS_ItemAlternatives>;
    public ItemCollection: Array<Ms_ItemCollection>;
    public ItemCardExpenses: Array<Prod_ItemcardExpenses>;
}

class Prod_BasicUnitsDetailesVM {
    public Model: Prod_BasicUnits;
    public Details: Array<Prod_BasicUnits>;
}

class SharedVM {
    public Id: number;
    public Code: string;
    public NameA: string;
    public NameE: string;
}

class Ms_ItemUnitVM {
    public ItemCardId: number;
    public UnitId: number;
    public UnitCode: string;
    public UnitNam: string;
    public UnitNameE: string;
}

class ItemsVM {
    public  ItemCode ;
    public UnitNam: string;
    public UnitNameE: string;
    public BarCode1: string;
    public PartCode: string;
    public PartDescA: string;
    public StoreCode: string;
    public StoreDescA: string;
    public ItemDescA: string;
    public ItemDescE: string;
    public ItemCatCode: string;
    public ItemCatDescA: string;
    public GiftItemCardId: number;
    public GiftUnitId: number;
    public UnitId: number;
    public UnittRate : number;
    public QtyInBox: number;
    public QtyPartiation: number;
    public QtyInNotebook: number;
    public Nullable: boolean;
    public FirstPrice: number;
    public SecandPrice: number ;
    public ThirdPrice: number;
    public LargePrice: number;
    public Remarks: string;
    public ItemTypestring: string;
    public ItemType: number;
    public ItemType2: string;
    public BarCode2: string;
    public BarCode3: string;
    public BarCode4: string;
    public BarCode5: string;
}

class PurchasInvoiceAndDetail {
    public Model: MS_PurchasInvoice;
    public Details: Array<MS_PurchaseInvoiceItemCard>;
}
