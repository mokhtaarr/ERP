
class SecurityClass {
    public UserCode: string;
    public Token: string;
}

class FavModules {//
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public OPTIONORDER: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public USER_CODE: string;
}

class SystemParameters {
    public CompanyNameA: string;
    public CompanyNameE: string;
    public CompanyCode: string;
    public IsActive: boolean;
}

class APISessionRecord {

    private SetAPISession(key: string, value: string) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });

    }
    private GetAPISession(key: string): string {

        let value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        return value;
    }
    public set SystemCode(value: string) {
        this.SetAPISession("SystemCode", value);
    }
    public get SystemCode(): string {
        return this.GetAPISession("SystemCode");
    }

    public set SubSystemCode(value: string) {
        this.SetAPISession("SubSystemCode", value);
    }
    public get SubSystemCode(): string {
        return this.GetAPISession("SubSystemCode");
    }

    public set Modulecode(value: string) {
        this.SetAPISession("Modulecode", value);
    }
    public get Modulecode(): string {
        return this.GetAPISession("Modulecode");
    }

    public set UserCode(value: string) {
        this.SetAPISession("UserCode", value);
    }
    public set Token(value: string) {
        this.SetAPISession("Token", value);
    }
    public get UserCode(): string {
        return this.GetAPISession("UserCode");
    }
    public get Token(): string {
        return this.GetAPISession("Token");
    }
    public set CompCode(value: string) {
        this.SetAPISession("CompCode", value);
    }
    public get CompCode(): string {
        return this.GetAPISession("CompCode");
    }

    public set BranchCode(value: string) {
        this.SetAPISession("BranchCode", value);
    }
    public get BranchCode(): string {
        return this.GetAPISession("BranchCode");
    }


    public set CurrentYear(value: string) {
        this.SetAPISession("CurrentYear", value);
    }
    public get CurrentYear(): string {
        return this.GetAPISession("CurrentYear");
    }

    public set ScreenLanguage(value: string) {
        this.SetAPISession("ScreenLanguage", value);
    }
    public get ScreenLanguage(): string {
        return this.GetAPISession("ScreenLanguage");
    }

}


abstract class EntityContext {
    public RowIndex: number;
}
class ResponseResult {
    public ResponseState: boolean;
    public ResponseMessage: string;
    public ResponseData: any;
}

class BaseResponse {
    public IsSuccess: boolean;
    public ErrorMessage: string;
    public StatusCode: Number;
    public Response: any;
}
class MS_BoxBank {
    constructor() {

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
    public BoxId: number;
    public BoxCode: string;
    public DESCA: string;
    public DESCE: string;
    public AccountId: number;
    public StoreId: number;
    public KeeperName: string;
    public BankResposableName: string;
    public BankTel: string;
    public BankMobile: string;
    public BankFax: string;
    public IsActive: boolean;
    public IsBank: boolean;
    public CheckPrintID: number;
    public ForAdjustOnly: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}




class MS_Stores {
    constructor() {
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
    public StoreId: number;
    public UserId: number;
    public UserGroupId: number;
    public StoreCode: string;
    public StoreDescA: string;
    public StoreDescE: string;
    public StoreType: boolean;
    public StorePosition: string;
    public StoreKeeper: string;
    public Tel: string;
    public Fax: string;
    public Remarks: string;
    public PrintField1Font: string;
    public PrintField2Font: string;
    public PrintField3Font: string;
    public PrintField4Font: string;
    public PrintField5Font: string;
    public PrintField1FontColor: string;
    public PrintField2FontColor: string;
    public PrintField3FontColor: string;
    public PrintField4FontColor: string;
    public PrintField5FontColor: string;
    public PrintField1FontSize: number;
    public PrintField2FontSize: number;
    public PrintField3FontSize: number;
    public PrintField4FontSize: number;
    public PrintField5FontSize: number;
    public PrintField1FontStyle: number;
    public PrintField2FontStyle: number;
    public PrintField3FontStyle: number;
    public PrintField4FontStyle: number;
    public PrintField5FontStyle: number;
    public BoxId: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public CityID: number;
    public BranchLogo: string;


}


class MS_Partition {
    constructor() {
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
    public StorePartId: number;
    public StoreId: number;
    public PartCode: string;
    public PartDescA: string;
    public PartDescE: string;
    public Remarks: string;
    public StoreKeeper: string;
    public Tel: string;
    public Address: string;
    public Fax: string;
    public strCustm2: string;
    public strCustm3: string;
    public strCustm4: string;
    public strCustm5: string;
    public strCustm6: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public X: number;
    public Y: number;
    public Z: number;
    public CityID: number;
    public SharedPartition: number;
    public StatusFlag: string;

}

class ReportParameters {

    public CompCode: string;
    public CompNameA: string;
    public CompNameE: string;
    public BraNameA: string;
    public BraNameE: string;
    public UserCode: string;
    public BranchCode: string;
    public ScreenLanguage: string;
    public SystemCode: string;
    public SubSystemCode: string;
    public Tokenid: string;
    public LoginUser: string;
    public CustomerCode: string;
    public CatCodeFrom: string;
    public CatCodeTo: string;
    public FromDt: string;// { get; set; }--
    public ToDt: string;// { get; set; }--
    public stat: number;
    public MemId: number;
    public Shift: number;
    public CatId: number;//---
    public ExpID: number;//---
    public SrvId: number;
    public SrvCatId: number;

    public ShiftId: number;
    public Sex: number;
    public PeriodId: number;
    public User: string;
    public CashType: number;
    public PeriodDays: number;
    public PurchId: number;
    public JobID: number;
    public NatId: number;
    public TRId: number;
    public Empid: number;
    public EmpStat1: number;
    public EmpStat2: number;
    public EmpStat3: number;
    public EmpStat5: number;
    public Typ: number;
    public SimID: number;
    public DisCatID: number;
    public Mail: number;
    public Femail: number;
    public total: number;
    public Type: number;
    public id1: number;
    public id2: number;
    public id3: number;
    public id4: number;
    public ISQR: boolean;
    public id: number;
    public ExpenseStatementID: number;
    public User_Code: string;
    public FromDate: string;
    public ToDate: string
    public BoxId: number;
    public RepType: number;
    public TrType: number;
    public RecType: number;
    public BnfID: string;
    public BnfDesc: string;
    public Status: number;
    public Repdesign: number;
    public AdjDebit: number;
    public AdjId: number;
    public CustomerID: number;
    public VendorId: number;
    public SalesmanID: number;
    public SalesmanDSA1: number;
    public PaymentType: number;
    public CashBoxID: number;
    public Groupid: number;
    public IsCredit: number;
    public BalStatus: number;
    public MobileNo: string;
    public slip: number;
    public VendType: number;
    public check: number;
    public BalType: number;
    public ItemFamId: number;
    public ItemID: number;
    public cc_code: string;
    public AccCode: string;
    public exzero: number;
    public IsAuthVchr: number;
    public IsNewVchr: number;
    public Level: number;
    public OpenType: number;
    public PrdType: number;
    public EndType: number;
    public VchrSource: number;
    public VchrType: number;
    public fromacc: string;
    public toacc: string;
    public storeID: number;
    public TfType: number;
    public FromstoreID: number;
    public ToStoreID: number;
    public FromBra: number;
    public ToBra: number;
    public src: number;
    public OperationId: number;
    public FromSls: number;
    public ToSls: number;
    public ISimport: number;
    public CustomercatID: number;
    public CustomerGrpID: number;
    public checkedprint: boolean;


    public cusCatID: number;
    public cusGroupid: number;
    public cusid: number;
    public SLStype: number;
    public dtccCode: string;
    public TransCode: string;
    public SysCode: string;

    public Vattype: number;
    public VatBraCode: number;
    public vatyear: number;
    public prdcode: number;
}

class G_BRANCH extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESC = "";
        this.BRA_TYPE = 0;
        this.BRA_DESCL = "";
        this.BRA_SHORTA = "";
        this.BRA_SHORTL = "";
        this.REGION_CODE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.BranchManager = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
        this.BRA_DESCE = "";
        this.GroupVatNo = "";
        this.VndIDTypeCode = 0;
        this.IDNo;
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_Postal = "";
        this.Address_Province = "";
        this.Address_District = "";
        this.NationalityID = 0;
        this.Currencyid = 0;

    }
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESC: string;
    public BRA_TYPE: number;
    public BRA_DESCL: string;
    public BRA_SHORTA: string;
    public BRA_SHORTL: string;
    public REGION_CODE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public BranchManager: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
    public BRA_DESCE: string;
    public GroupVatNo: string;
    public VndIDTypeCode: number;
    public IDNo: any;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_Postal: string;
    public Address_Province: string;
    public Address_District: string;
    public NationalityID: number;
    public Currencyid: number;
}
class G_LnkVarBranch extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.BraCode = 0;
        this.Lnktype = "";
        this.Ser = 0;
        this.LnkCode = "";
        this.GLAccountCode = "";
        this.CC_Code = "";
    }
    public CompCode: number;
    public BraCode: number;
    public Lnktype: string;
    public Ser: number;
    public LnkCode: string;
    public GLAccountCode: string;
    public CC_Code: string;

}
class GQ_GetLnkVarBranch extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.BraCode = 0;
        this.Lnktype = "";
        this.Ser = 0;
        this.LnkCode = "";
        this.GLAccountCode = "";
        this.Acc_DescA = "";
        this.Acc_DescE = "";
        this.CC_Code = "";
        this.GSt_DescA = "";
        this.GSt_DescE = "";
        this.GLAcc_DescA = "";
        this.GLAcc_DescE = "";


    }
    public CompCode: number;
    public BraCode: number;
    public Lnktype: string;
    public Ser: number;
    public LnkCode: string;
    public GLAccountCode: string;
    public Acc_DescA: string;
    public Acc_DescE: string;
    public CC_Code: string;
    public GSt_DescA: string;
    public GSt_DescE: string;
    public GLAcc_DescA: string;
    public GLAcc_DescE: string;

}

class IGetunitprice {
    constructor() {
        this.unitprice = 0;
        this.unitpricewithvat = 0;

    }
    public unitprice: number;
    public unitpricewithvat: number;


}

class IQ_GetOperationSalesmanItem extends SecurityClass {
    constructor() {
        super();
        this.OperationSalesmanItemID = 0;
        this.OperationSalesmanID = 0;
        this.OperationItemID = 0;
        this.OperationID = 0;
        this.ItemID = 0;
        this.ReceivedQty = 0;
        this.SoldQty = 0;
        this.ScrapQty = 0;
        this.OnhandQty = 0;
        this.ItemCode = "";
        this.IT_DescA = "";
        this.IT_DescE = "";
        this.FamilyCode = "";
        this.FamDescA = "";
        this.Fam_DescE = "";
        this.SalesmanId = 0;
        this.Min_SalesPrice = 0;
        this.Est_SalesPrice = 0;
        this.Est_CostPrice = 0;
        this.VatNatID = 0;
        this.VatPrc = 0;
    }
    public OperationSalesmanItemID: number;
    public OperationSalesmanID: number;
    public OperationItemID: number;
    public OperationID: number;
    public ItemID: number;
    public ReceivedQty: number;
    public SoldQty: number;
    public ScrapQty: number;
    public OnhandQty: number;
    public ItemCode: string;
    public IT_DescA: string;
    public IT_DescE: string;
    public FamilyCode: string;
    public FamDescA: string;
    public Fam_DescE: string;
    public SalesmanId: number;
    public Min_SalesPrice: number;
    public Est_SalesPrice: number;
    public Est_CostPrice: number;
    public VatNatID: number;
    public VatPrc: number;
}



class IQ_GetOperationSalesman extends SecurityClass {
    constructor() {
        super();
        this.OperationSalesmanID = 0;
        this.OperationID = 0;
        this.SalesmanId = 0;
        this.Close_TotalSalesCash = 0;
        this.Close_TotalSalesCashVAT = 0;
        this.Close_TotalSalesCredit = 0;
        this.Close_TotalSalesCreditVAT = 0;
        this.Close_CashOnhand = 0;
        this.Close_CashOnBank = 0;
        this.Close_TotalSales = 0;
        this.SalesmanCode = "";
        this.NameA = "";
        this.NameE = "";
        this.TrNo = 0;
        this.RefNO = "";
        this.TruckNo = "";
        this.TrDate = "";
        this.Status = 0;
    }
    public OperationSalesmanID: number;
    public OperationID: number;
    public SalesmanId: number;
    public Close_TotalSalesCash: number;
    public Close_TotalSalesCashVAT: number;
    public Close_TotalSalesCredit: number;
    public Close_TotalSalesCreditVAT: number;
    public Close_CashOnhand: number;
    public Close_CashOnBank: number;
    public Close_TotalSales: number;
    public SalesmanCode: string;
    public NameA: string;
    public NameE: string;
    public TrNo: number;
    public RefNO: string;
    public TruckNo: string;
    public TrDate: string;
    public Status: number;
}



class I_TR_OperationSalesman extends SecurityClass {
    constructor() {
        super();
        this.OperationSalesmanID = 0;
        this.OperationID = 0;
        this.SalesmanId = 0;
        this.Close_TotalSalesCash = 0;
        this.Close_TotalSalesCashVAT = 0;
        this.Close_TotalSalesCredit = 0;
        this.Close_TotalSalesCreditVAT = 0;
        this.Close_CashOnhand = 0;
        this.Close_CashOnBank = 0;
        this.Close_TotalSales = 0;
    }
    public OperationSalesmanID: number;
    public OperationID: number;
    public SalesmanId: number;
    public Close_TotalSalesCash: number;
    public Close_TotalSalesCashVAT: number;
    public Close_TotalSalesCredit: number;
    public Close_TotalSalesCreditVAT: number;
    public Close_CashOnhand: number;
    public Close_CashOnBank: number;
    public Close_TotalSales: number;
}

class I_TR_OperationSalesmanItem extends SecurityClass {
    constructor() {
        super();
        this.OperationSalesmanItemID = 0;
        this.OperationSalesmanID = 0;
        this.OperationItemID = 0;
        this.OperationID = 0;
        this.ItemID = 0;
        this.ReceivedQty = 0;
        this.SoldQty = 0;
        this.ScrapQty = 0;
        this.OnhandQty = 0;
        this.StatusFlag = "";

    }
    public OperationSalesmanItemID: number;
    public OperationSalesmanID: number;
    public OperationItemID: number;
    public OperationID: number;
    public ItemID: number;
    public ReceivedQty: number;
    public SoldQty: number;
    public ScrapQty: number;
    public OnhandQty: number;
    public StatusFlag: string;

}


class I_TR_OperationTFDetail extends SecurityClass {
    constructor() {
        super();
        this.OperationTFDetailID = 0;
        this.OperationTFID = 0;
        this.OperationItemID = 0;
        this.ItemID = 0;
        this.SendQty = 0;
        this.RecQty = 0;
        this.StatusFlag = "";
    }
    public OperationTFDetailID: number;
    public OperationTFID: number;
    public OperationItemID: number;
    public ItemID: number;
    public SendQty: number;
    public RecQty: number;
    public StatusFlag: string;
}




class I_VW_GetCompStatus extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.AddAble = false;
        this.Editable = false;
        this.CompStatus = 0;
        this.LoginMsg;
        this.LastDate = "";
        this.FirstDate = "";
        this.INV_STATUS = 0;
        this.ACC_STATUS = 0;
        this.ProfitAcc_Code = "";
        this.OpenAccVoucheNo = 0;
        this.OpenInvAdjNo = 0;
    }
    public CompCode: number;
    public AddAble: boolean;
    public Editable: boolean;
    public CompStatus: number;
    public LoginMsg: any;
    public FIN_YEAR: number;
    public ACC_STATUS: number;
    public INV_STATUS: number;
    public FirstDate: string;
    public LastDate: string;
    public ProfitAcc_Code: string;
    public OpenAccVoucheNo: number;
    public OpenInvAdjNo: number;
}


class G_COMPANY extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.NameA = "";
        this.NameE = "";
        this.Systems = "";
        this.MOI_ID
        this.CRT_NO
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.GMName = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
        this.NameActive = "";
        this.IsActive = false;
        this.IsReadOnly = false;
        this.LogoIcon = "";
        this.BkImage1 = "";
        this.BkImage2 = "";
        this.GroupVatNo = "";
        this.VATNO = "";
        this.VndIDTypeCode = 0;
        this.IDNo
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_Postal = "";
        this.Address_Province = "";
        this.Address_District = "";
        this.NationalityID = 0;
        this.Currencyid = 0;
    }
    public COMP_CODE: number;
    public NameA: string;
    public NameE: string;
    public Systems: string;
    public MOI_ID: any;
    public CRT_NO: any;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public GMName: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
    public NameActive: string;
    public IsActive: boolean;
    public IsReadOnly: boolean;
    public LogoIcon: string;
    public BkImage1: string;
    public BkImage2: string;
    public GroupVatNo: string;
    public VATNO: string;
    public VndIDTypeCode: number;
    public IDNo: any;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_Postal: string;
    public Address_Province: string;
    public Address_District: string;
    public NationalityID: number;
    public Currencyid: number;
}

class G_MODULES extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MENU_NO = "";
        this.MENU_NAME = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.MODULE_TYPE
        this.Images_Enabled = false;
        this.SYSTEM_CODE_Desc = "";
        this.SUB_SYSTEM_CODE_Desc = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MENU_NO: string;
    public MENU_NAME: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public MODULE_TYPE: any;
    public Images_Enabled: boolean;
    public SYSTEM_CODE_Desc: string;
    public SUB_SYSTEM_CODE_Desc: string;
}

class G_Nationality extends SecurityClass {
    constructor() {
        super();
        this.NationalityID = 0;
        this.NationalityCode = "";
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
        this.StatusFlag = "";
    }
    public NationalityID: number;
    public NationalityCode: string;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
    public StatusFlag: string;
}
class A_RecPay_D_CashBox extends SecurityClass {
    constructor() {
        super();
        this.CashBoxID = 0;
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CashBox_DescA = "";
        this.CashBox_DescE = "";
        this.IsActive = false;
        this.AccountCode = "";
        this.CardAccountCode = "";
        this.User_Code = "";
        this.StatusFlag = "";
        this.IsRecPayAccount = false;

    }
    public CashBoxID: number;
    public CompCode: number;
    public BranchCode: number;
    public CashBox_DescA: string;
    public CashBox_DescE: string;
    public IsActive: boolean;
    public IsRecPayAccount: boolean;
    public AccountCode: string;
    public CardAccountCode: string;
    public User_Code: string;
    public StatusFlag: string;

}


class AVAT_D_SrvCategory extends SecurityClass {
    constructor() {
        super();
        this.SrvCategoryID = 0;
        this.COMP_CODE = 0;
        this.CAT_CODE = "";
        this.DescA = "";
        this.DescE = "";
        this.SALES_ACC_CODE = "";
        this.RETURN_ACC_CODE = "";
        this.DISC_ACC_CODE = "";
        this.ACTUAL_DATE = "";
        this.Nature = 0;
        this.IsPurchase = false;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.VatNatID = 0;
        this.ItemFormatFix = "";
        this.ItemFormatSerial = "";
    }
    public SrvCategoryID: number;
    public COMP_CODE: number;
    public CAT_CODE: string;
    public DescA: string;
    public DescE: string;
    public SALES_ACC_CODE: string;
    public RETURN_ACC_CODE: string;
    public DISC_ACC_CODE: string;
    public ACTUAL_DATE: string;
    public Nature: number;
    public IsPurchase: boolean;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public VatNatID: number;
    public ItemFormatFix: string;
    public ItemFormatSerial: string;
}
class AQVAT_GetSrvCategory extends SecurityClass {
    constructor() {
        super();
        this.DescA = "";
        this.ItemFormatFix = "";
        this.ItemFormatSerial = "";
        this.IsPurchase = false;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.VatNatID = 0;
        this.SrvCategoryID = 0;
        this.COMP_CODE = 0;
        this.CAT_CODE = "";
        this.DescE = "";
        this.SALES_ACC_CODE = "";
        this.RETURN_ACC_CODE = "";
        this.DISC_ACC_CODE = "";
        this.ACTUAL_DATE = "";
        this.Nature = 0;
        this.VatNatureCode = "";
        this.VatNatureDescA = "";
        this.VatNatureDescE = "";
        this.VatPrc = 0;
        this.sls_Acc_DescA = "";
        this.sls_Acc_DescE = "";
        this.Ret_Acc_DescA = "";
        this.Ret_Acc_DescE = "";
        this.Dis_Acc_DescA = "";
        this.Dis_Acc_DescE = "";
    }
    public DescA: string;
    public ItemFormatFix: string;
    public ItemFormatSerial: string;
    public IsPurchase: boolean;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public VatNatID: number;
    public SrvCategoryID: number;
    public COMP_CODE: number;
    public CAT_CODE: string;
    public DescE: string;
    public SALES_ACC_CODE: string;
    public RETURN_ACC_CODE: string;
    public DISC_ACC_CODE: string;
    public ACTUAL_DATE: string;
    public Nature: number;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public VatPrc: number;
    public sls_Acc_DescA: string;
    public sls_Acc_DescE: string;
    public Ret_Acc_DescA: string;
    public Ret_Acc_DescE: string;
    public Dis_Acc_DescA: string;
    public Dis_Acc_DescE: string;
}






class GQ_GetStore extends SecurityClass {
    constructor() {
        super();
        this.StoreId = 0;
        this.BranchId = 0;
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.STORE_CODE = 0;
        this.DescA = "";
        this.DescL = "";
        this.IsActive = false;
        this.NameIsActive = '';
        this.StockAccCode = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Address = "";
        this.STORE_TYPE = 0;
        this.TYPE_CODE = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.BRA_DESC = "";
        this.BRA_DESCL = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.StatusFlag = "";

    }
    public StoreId: number;
    public BranchId: number;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public STORE_CODE: number;
    public DescA: string;
    public DescL: string;
    public IsActive: boolean;
    public NameIsActive: string;
    public StockAccCode: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Address: string;
    public STORE_TYPE: number;
    public TYPE_CODE: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public BRA_DESC: string;
    public BRA_DESCL: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public StatusFlag: string;

}

class IQ_GetSalesMan extends SecurityClass {
    constructor() {
        super();
        this.SalesmanId = 0;
        this.CompCode = 0;
        this.BraCode = 0;
        this.SalesmanCode = "";
        this.NameA = "";
        this.NameE = "";
        this.ShortNameA = "";
        this.ShortNameE = "";
        this.ADDRESS = "";
        this.IDNo = "";
        this.MOBILE = "";
        this.EMAIL = "";
        this.Isactive = false;
        this.REMARKS = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.GLAccCode = "";
        this.IsSalesEnable = false;
        this.IsPurchaseEnable = false;
        this.ISOperationEnable = false;
        this.PurchaseLimit = 0;
        this.SalesCreditLimit = 0;
        this.NationalityID = 0;
        this.NationalityCode = "";
        this.Nat_DescA = "";
        this.Nat_DescE = "";
        this.CC_Code = "";
        this.CC_DESCA = "";
        this.CC_DESCE = "";
        this.text_IsSalesEnable = "";
        this.text_IsPurchaseEnable = "";
        this.text_ISOperationEnable = "";



    }
    public SalesmanId: number;
    public CompCode: number;
    public BraCode: number;
    public SalesmanCode: string;
    public NameA: string;
    public NameE: string;
    public ShortNameA: string;
    public ShortNameE: string;
    public ADDRESS: string;
    public IDNo: string;
    public MOBILE: string;
    public EMAIL: string;
    public Isactive: boolean;
    public REMARKS: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public GLAccCode: string;
    public IsSalesEnable: boolean;
    public IsPurchaseEnable: boolean;
    public ISOperationEnable: boolean;
    public PurchaseLimit: number;
    public SalesCreditLimit: number;
    public NationalityID: number;
    public NationalityCode: string;
    public Nat_DescA: string;
    public Nat_DescE: string;
    public CC_Code: string;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public text_IsSalesEnable: string;
    public text_IsPurchaseEnable: string;
    public text_ISOperationEnable: string;


}


class I_Sls_D_Salesman extends SecurityClass {
    constructor() {
        super();
        this.SalesmanId = 0;
        this.CompCode = 0;
        this.BraCode = 0;
        this.SalesmanCode = "";
        this.NameA = "";
        this.NameE = "";
        this.ShortNameA = "";
        this.ShortNameE = "";
        this.ADDRESS = "";
        this.IDNo = "";
        this.MOBILE = "";
        this.EMAIL = "";
        this.Isactive = false;
        this.REMARKS = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.GLAccCode = "";
        this.IsSalesEnable = false;
        this.IsPurchaseEnable = false;
        this.ISOperationEnable = false;
        this.PurchaseLimit = 0;
        this.SalesCreditLimit = 0;
        this.NationalityID = 0;
        this.CC_Code = "";
    }
    public SalesmanId: number;
    public CompCode: number;
    public BraCode: number;
    public SalesmanCode: string;
    public NameA: string;
    public NameE: string;
    public ShortNameA: string;
    public ShortNameE: string;
    public ADDRESS: string;
    public IDNo: string;
    public MOBILE: string;
    public EMAIL: string;
    public Isactive: boolean;
    public REMARKS: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public GLAccCode: string;
    public IsSalesEnable: boolean;
    public IsPurchaseEnable: boolean;
    public ISOperationEnable: boolean;
    public PurchaseLimit: number;
    public SalesCreditLimit: number;
    public NationalityID: number;
    public CC_Code: string;
}


class A_D_VAT_TYPE extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.TYPE = 0;
        this.CODE = 0;
        this.DESCRIPTION = "";
        this.VatType = 0;
        this.VatPerc = 0;
        this.LineOrder = 0
    }
    public COMP_CODE: number;
    public TYPE: number;
    public CODE: number;
    public DESCRIPTION: string;
    public VatType: number;
    public VatPerc: number;
    public LineOrder: number;
}

class I_D_Category extends SecurityClass {
    constructor() {
        super();
        this.CatID = 0;
        this.CompCode = 0;
        this.CatCode = "";
        this.DescA = "";
        this.DescL = "";
        this.ParentCatId = 0;
        this.CatLevel = 0;
        this.IsDetail = false;
        this.UnitGrpID = 0;
        this.IsAutoGenerateItem = false;
        this.ItemFormatFix = "";
        this.ItemFormatSerial = "";
        this.ItemTypeID = 0;
        this.CostMethodID = 0;
        this.StockMethodID = 0;
        this.IssueFromCenteralStore = false;
        this.CenteralStoreCode = 0;
        this.IsAdditionalSpecs = false;
        this.AdditionalspcsDescA = "";
        this.AdditionalspcsDescL = "";
        this.ISSales = false;
        this.IsStock = false;
        this.IsProduct = false;
        this.IsIssuetoCC = false;
        this.IsIssueToProd = false;
        this.IsPurchase = false;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.VatNatID = 0;
        this.StatusFlag = "";

    }
    public CatID: number;
    public CompCode: number;
    public CatCode: string;
    public DescA: string;
    public DescL: string;
    public ParentCatId: number;
    public CatLevel: number;
    public IsDetail: boolean;
    public UnitGrpID: number;
    public IsAutoGenerateItem: boolean;
    public ItemFormatFix: string;
    public ItemFormatSerial: string;
    public ItemTypeID: number;
    public CostMethodID: number;
    public StockMethodID: number;
    public IssueFromCenteralStore: boolean;
    public CenteralStoreCode: number;
    public IsAdditionalSpecs: boolean;
    public AdditionalspcsDescA: string;
    public AdditionalspcsDescL: string;
    public ISSales: boolean;
    public IsStock: boolean;
    public IsProduct: boolean;
    public IsIssuetoCC: boolean;
    public IsIssueToProd: boolean;
    public IsPurchase: boolean;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public VatNatID: number;
    public StatusFlag: string;
}





class A_RecPay_D_Category extends SecurityClass {
    constructor() {
        super();
        this.CatID = 0;
        this.AccountType = 0;
        this.CatCode = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
        this.REMARKS = "";
        this.AccountCode = "";
        this.CompCode = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StatusFlag = "";


    }
    public CatID: number;
    public AccountType: number;
    public CatCode: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
    public REMARKS: string;
    public AccountCode: string;
    public CompCode: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StatusFlag: string;
}




class A_RecPay_D_Group extends SecurityClass {
    constructor() {
        super();
        this.GroupID = 0;
        this.AccountType = 0;
        this.CompCode = 0;
        this.GroupCode = "";
        this.Group_DescA = "";
        this.Group_DescE = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StatusFlag = "";
    }
    public GroupID: number;
    public AccountType: number;
    public CompCode: number;
    public GroupCode: string;
    public Group_DescA: string;
    public Group_DescE: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StatusFlag: string;
}

class I_Item extends SecurityClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.ItemCode = "";
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.TechDescA = "";
        this.TechDescL = "";
        this.UnitGrpID = 0;
        this.UomID = 0;
        this.ItemFamilyID = 0;
        this.RefItemCode = "";
        this.OldItemCode = "";
        this.VndItemCode = "";
        this.BarCode1 = "";
        this.BarCode2 = "";
        this.FirstEntryDate = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
        this.StatusFlag = "";
        this.OnhandQty = 0;

    }
    public ItemID: number;
    public ItemCode: string;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public TechDescA: string;
    public TechDescL: string;
    public UnitGrpID: number;
    public UomID: number;
    public ItemFamilyID: number;
    public RefItemCode: string;
    public OldItemCode: string;
    public VndItemCode: string;
    public BarCode1: string;
    public BarCode2: string;
    public FirstEntryDate: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
    public StatusFlag: string;
    public OnhandQty: number;
}



class G_LnkTransVoucher extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.SERIAL = 0;
        this.VarCode = "";
        this.ISDebit = false;
        this.AccType = 0;
        this.AccFixedCode = "";
        this.AccVarCode = "";
        this.AccBraCode = "";
        this.CCType = 0;
        this.CCFixedCode = "";
        this.CCVarCode = "";
        this.CCBraCode = "";
        this.IsCollective = false;
        this.LineRemarkA = '';
        this.LineRemarkE = '';
        this.StatusFlag = '';
        this.serial_num = '';


    }
    public COMP_CODE: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public SERIAL: number;
    public VarCode: string;
    public ISDebit: boolean;
    public AccType: number;
    public AccFixedCode: string;
    public AccVarCode: string;
    public AccBraCode: string;
    public CCType: number;
    public CCFixedCode: string;
    public CCVarCode: string;
    public CCBraCode: string;
    public IsCollective: boolean;
    public LineRemarkA: string;
    public LineRemarkE: string;
    public StatusFlag: string;
    public serial_num: string;
}



class I_ItemYear {
    constructor() {
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
    public ItemYearID: number;
    public ItemID: number;
    public FinYear: number;
    public MinUnitPrice: number;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public UnitWholePrice: number;
    public MinUnitWholePrice: number;
    public StatusFlag: string;
}



class I_D_UOM extends SecurityClass {
    constructor() {
        super();
        this.UomID = 0;
        this.UomCode = "";
        this.DescA = "";
        this.DescE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StatusFlag = "";
    }
    public UomID: number;
    public UomCode: string;
    public DescA: string;
    public DescE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StatusFlag: string;
}

class Tax_Type {
    constructor() {
        this.Nature = 0;
        this.Prc = 0;
        this.VatType = 0;
    }
    public Nature: number;
    public Prc: number;
    public VatType: number;

}


class I_ItemFamily extends SecurityClass {
    constructor() {
        super();
        this.ItemFamilyID = 0;
        this.FamilyCode = "";
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.TechDescA = "";
        this.TechDescL = "";
        this.CatID = 0;
        this.ItemTypeID = 0;
        this.RefItemCode = "";
        this.BarCode1 = "";
        this.FirstEntryDate = "";
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
        this.StatusFlag = "";
    }
    public ItemFamilyID: number;
    public FamilyCode: string;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public TechDescA: string;
    public TechDescL: string;
    public CatID: number;
    public ItemTypeID: number;
    public RefItemCode: string;
    public BarCode1: string;
    public FirstEntryDate: string;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
    public StatusFlag: string;
}

class G_STORE extends SecurityClass {
    constructor() {
        super();
        this.StoreId = 0;
        this.BranchId = 0;
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.STORE_CODE = 0;
        this.DescA = "";
        this.DescL = "";
        this.IsActive = false;
        this.StockAccCode = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Address = "";
        this.STORE_TYPE = 0;
        this.TYPE_CODE = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    public StoreId: number;
    public BranchId: number;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public STORE_CODE: number;
    public DescA: string;
    public DescL: string;
    public IsActive: boolean;
    public StockAccCode: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Address: string;
    public STORE_TYPE: number;
    public TYPE_CODE: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}



class IQ_GetItemStoreInfo_New {
    constructor() {

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
    public ItemID: number;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public ItemFamilyID: number;
    public StoreId: number;
    public UnitPrice: number;
    public MinUnitPrice: number;
    public OnhandQty: number;
    public UomID: number;

}

class IQ_GetItemStoreInfo {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public UomID: number;
    public ItemFamilyID: number;
    public CompCode: number;
    public RefItemCode: string;
    public FirstEntryDate: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
    public StoreCode: number;
    public BraCode: number;
    public LOCATION: string;
    public OnhandQty: number;
    public MinQty: number;
    public MaxQty: number;
    public StartQty: number;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public FamilyCode: string;
    public Family_DescA: string;
    public Family_DescE: string;
    public StoreId: number;
    public CatID: number;
    public FinYear: number;
    public MinUnitPrice: number;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public UnitWholePrice: number;
    public MinUnitWholePrice: number;
    public ItemYearID: number;
    public ItemStoreID: number;
    public VatPrc: number;
    public VatNatID: number;
    public Cat_Desc: string;

}

class I_ItemStore {
    constructor() {
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
    public ItemStoreID: number;
    public ItemID: number;
    public FinYear: number;
    public StoreCode: number;
    public BraCode: number;
    public CompCode: number;
    public LOCATION: string;
    public LOCATION2: string;
    public OnhandQty: number;
    public BookQty: number;
    public OnRoadQty: number;
    public OnOrderQty: number;
    public ReOrderQty: number;
    public MinQty: number;
    public MaxQty: number;
    public StartQty: number;
    public StartLocalCost: number;
    public LocalCost: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StoreId: number;
}

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


class G_STANDARD extends SecurityClass {
    constructor() {
        super();
        this.BACKUP_PATH = "";
        this.BACKUP_DB = "";
        this.BACKUP_COPIES = 0;
    }
    public BACKUP_PATH: string;
    public BACKUP_DB: string;
    public BACKUP_COPIES: number;
}

class G_SUB_SYSTEMS extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.SUB_SYSTEM_DESCA = "";
        this.SUB_SYSTEM_DESCE = "";
        this.ICON_PATH = "";
        this.APPNAME = "";
        this.APPVERSION = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public SUB_SYSTEM_DESCA: string;
    public SUB_SYSTEM_DESCE: string;
    public ICON_PATH: string;
    public APPNAME: string;
    public APPVERSION: string;
}

class G_SYSTEM extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SYSTEM_DESCE = "";
        this.SYSTEM_DESCA = "";
        this.DB_NAME = "";
        this.ICON_PATH = "";
        this.INIT_ORDER = 0;
        this.VER_PATH = "";
    }
    public SYSTEM_CODE: string;
    public SYSTEM_DESCE: string;
    public SYSTEM_DESCA: string;
    public DB_NAME: string;
    public ICON_PATH: string;
    public INIT_ORDER: number;
    public VER_PATH: string;
}

class G_USER_BRANCH extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.StatusFlag = "";
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public StatusFlag: string;
}

class G_USER_COMPANY extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
}

class G_USER_LOG extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: any;
    public SYSTEM_YEAR: number;
    public MODULE_CODE: string;
    public COMP_CODE: number;
    public LOG_DATE: string;
}


class G_USER_MODULE extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
}

class G_USER_SUB_SYSTEM extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}

class G_USER_SYSTEM extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}
class I_Control {
    constructor() {
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
    public CompCode: number;
    public DefSlsVatType: number;
    public DefPurVatType: number;
    public IsVat: boolean;
    public MobileLength: number;
    public IDLength: number;
    public SendSMS: boolean;
    public SendPublicSMS: boolean;
    public NotePeriodinSec: number;
    public DashBoardPeriodinSec: number;
    public MaxYearlyMSGs: number;
    public UsedMSGs: number;
    public UserTimeZoneUTCDiff: number;
    public ServerTimeZoneUTCDiff: number;
    public SaudiNationID: number;
    public WebCustomerWebsite: boolean;
    public MembeshiptStartDate: string;
    public MembeshipEndDate: string;
    public MembershipAllanceDays: number;
    public MembershipreadOnlyDays: number;
    public IsFreePurchaseReturn: boolean;
    public IsFreeSalesReturn: boolean;
    public ExceedMinPricePassword: string;
    public GL_VoucherCCType: number;
    public Gl_JournalOpenType: number;
    public GL_JournalMonthlyNo: boolean;
    public GL_JournalMonthlyNoWidth: number;
    public GL_JournalSaveUnbalanced: boolean;
    public IsLocalBranchCustomer: boolean;
    public SysTimeOut: number;
    public NationalityID: number;
    public Currencyid: number;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GL_VoucherCCDT_Type: number;
    public InvoiceWithoutCust: boolean;
    public IvoiceDateEditable: boolean;
    public InvoiceLineDiscount: boolean;
    public InvoiceLineAllowance: boolean;
    public InvoiceTotalAllowance: boolean;
    public InvoiceTotalCharge: boolean;
    public OperationPriceWithVAT: boolean;
    public SalesPriceWithVAT: boolean;
}

class G_VatNature extends SecurityClass {
    constructor() {
        super();
        this.VatNatID = 0;
        this.VatNatureCode = "";
        this.VatNatureDescA = "";
        this.VatNatureDescE = "";
        this.VatPrc = 0;
    }
    public VatNatID: number;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public VatPrc: number;
}


class A_TmpVoucherProcess extends SecurityClass {
    constructor() {
        super();
        this.id = 0;
        this.CurrentUserCode = "";
        this.Selected = false;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = "";
        this.VOUCHER_DESC = "";
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.POSTED_BY = "";
        this.POSTED_AT = "";
        this.SOURCE_TYPE = 0;
        this.VOUCHER_DATEH = "";
        this.AUTHORISED_BY = "";
        this.AUTHORISED_AT = "";
        this.TYPE_DESCA = "";
        this.TYPE_DESCE = "";
        this.St_DescE = "";
        this.St_DescA = "";
        this.Src_DescE = "";
        this.Src_DescA = "";
        this.OpCode = 0;
    }
    public id: number;
    public CurrentUserCode: string;
    public Selected: boolean;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_DATE: string;
    public VOUCHER_DESC: string;
    public VOUCHER_STATUS: number;
    public TYPE_CODE: number;
    public REF_CODE: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public POSTED_BY: string;
    public POSTED_AT: string;
    public SOURCE_TYPE: number;
    public VOUCHER_DATEH: string;
    public AUTHORISED_BY: string;
    public AUTHORISED_AT: string;
    public TYPE_DESCA: string;
    public TYPE_DESCE: string;
    public St_DescE: string;
    public St_DescA: string;
    public Src_DescE: string;
    public Src_DescA: string;
    public OpCode: number;
}



class G_AlertLog extends SecurityClass {
    constructor() {
        super();

        this.AlertID = 0;
        this.AlertTypeID = 0;
        this.AlertSubTypeID = 0;
        this.MemberID = 0;
        this.MsgType = 0;
        this.MsgDate = "";
        this.MsgHeader = "";
        this.MsgBody = "";
        this.IsSent = false;
        this.SendDate = "";
        this.MobileNo = "";
        this.Email = "";
        this.SystemCode = "";
        this.CompCode = 0;
        this.TrID = 0;
        this.AlertType = "";
    }
    public AlertID: number;
    public AlertTypeID: number;
    public AlertSubTypeID: number;
    public MemberID: number;
    public MsgType: number;
    public MsgDate: string;
    public MsgHeader: string;
    public MsgBody: string;
    public IsSent: boolean;
    public SendDate: string;
    public MobileNo: string;
    public Email: string;
    public SystemCode: string;
    public CompCode: number;
    public TrID: number;
    public AlertType: string;
}

class G_AlertControl extends SecurityClass {
    constructor() {
        super();

        this.Compcode = 0;
        this.SystemCode = "";
        this.EMAIL_SSL = false;
        this.EMAIL_Authentication = false;
        this.EMAIL_SenderName = "";
        this.EMAIL_Sender = "";
        this.EMAIL_SenderPassword = "";
        this.EMAIL_SendorPort = 0;
        this.EMAIL_SenderSMTP = "";
        this.SMS_UserName = "";
        this.SMS_SenderName = "";
        this.SMS_Password = "";
        this.MobileNoPreFex = "";
        this.EmailMaxDaily = 0;
        this.DefPurVatType = 0;
        this.SMS_Provider = "";
    }
    public Compcode: number;
    public SystemCode: string;
    public EMAIL_SSL: boolean;
    public EMAIL_Authentication: boolean;
    public EMAIL_SenderName: string;
    public EMAIL_Sender: string;
    public EMAIL_SenderPassword: string;
    public EMAIL_SendorPort: number;
    public EMAIL_SenderSMTP: string;
    public SMS_UserName: string;
    public SMS_SenderName: string;
    public SMS_Password: string;
    public MobileNoPreFex: string;
    public EmailMaxDaily: number;
    public DefPurVatType: number;
    public SMS_Provider: string;
}

class G_ModuleHelp extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.HelpBody_Ar = "";
        this.HelpBody_En = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public HelpBody_Ar: string;
    public HelpBody_En: string;
}

class GQ_GetUserModule extends SecurityClass {
    constructor() {
        super();

        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
        this.MENU_NO = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.M_CREATE = false;
        this.M_EDIT = false;
        this.M_DELETE = false;
        this.M_VIEW = false;
        this.M_PRINT = false;
        this.M_CUSTOM1 = false;
        this.M_CUSTOM2 = false;
        this.M_CUSTOM3 = false;
        this.M_CUSTOM4 = false;
        this.M_CUSTOM5 = false;
        this.M_CUSTOM6 = false;
        this.M_CUSTOM7 = false;
        this.M_CUSTOM8 = false;
        this.M_CUSTOM9 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.M_images_enabled = false;
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
    public MENU_NO: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public M_CREATE: boolean;
    public M_EDIT: boolean;
    public M_DELETE: boolean;
    public M_VIEW: boolean;
    public M_PRINT: boolean;
    public M_CUSTOM1: boolean;
    public M_CUSTOM2: boolean;
    public M_CUSTOM3: boolean;
    public M_CUSTOM4: boolean;
    public M_CUSTOM5: boolean;
    public M_CUSTOM6: boolean;
    public M_CUSTOM7: boolean;
    public M_CUSTOM8: boolean;
    public M_CUSTOM9: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public M_images_enabled: boolean;
}

class G_Noteifications extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.Remarks = "";
        this.ISActive = false;
        this.ActiveIcon = "";
        this.InActiveIcon = "";
        this.PageName = "";
        this.DisplayOrder = 0;
    }

    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public Remarks: string;
    public ISActive: boolean;
    public ActiveIcon: string;
    public InActiveIcon: string;
    public PageName: string;
    public DisplayOrder: number;
}

class G_NotificationCompany extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.ISActive = false;
        this.NoteCount = 0;

    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public CompCode: number;
    public BranchCode: number;
    public ISActive: boolean;
    public NoteCount: number;
}
class NoteificationsModel extends SecurityClass {
    constructor() {
        super();

        this.MODULE_CODE = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.NoteCount = 0;

    }
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public NoteCount: number;
}
class A_RecPay_D_AjustmentType extends SecurityClass {
    constructor() {
        super();
        this.AdustmentTypeID = 0;
        this.AdjCode = 0;
        this.Adj_DescA = "";
        this.Adj_DescE = "";
        this.VatType = 0;
        this.AccountCode = "";
        this.IsDebit = false;
        this.IsCustomer = false;
        this.CompCode = 0;
        this.StatusFlag = "";
    }
    public AdustmentTypeID: number;
    public AdjCode: number;
    public Adj_DescA: string;
    public Adj_DescE: string;
    public VatType: number;
    public AccountCode: string;
    public IsDebit: boolean;
    public IsCustomer: boolean;
    public CompCode: number;
    public StatusFlag: string;

}


class A_ACCOUNT extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.ACC_CODE = "";
        this.OPGLExpenseAcc = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.ACC_GROUP = 0;
        this.ACC_TYPE = 0;
        this.ACC_LEVEL = 0;
        this.ACC_ACTIVE = false;
        this.PARENT_ACC = "";
        this.DETAIL = false;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.LAST_UPDATE = "";
        this.CCDT_TYPE = "";
        this.CUR_CODE = "";
        this.StatusFlag = "";

    }
    public COMP_CODE: number;
    public ACC_CODE: string;
    public OPGLExpenseAcc: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public ACC_GROUP: number;
    public ACC_TYPE: number;
    public ACC_LEVEL: number;
    public ACC_ACTIVE: boolean;
    public PARENT_ACC: string;
    public DETAIL: boolean;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public LAST_UPDATE: string;
    public CCDT_TYPE: string;
    public CUR_CODE: string;
    public StatusFlag: string;
}
class G_LnkVar extends SecurityClass {
    constructor() {
        super();
        this.Lnktype = "";
        this.Ser = 0;
        this.LnkCode = "";
        this.Acc_DescA = "";
        this.Acc_DescE = "";

    }
    public Lnktype: string;
    public Ser: number;
    public LnkCode: string;
    public Acc_DescA: string;
    public Acc_DescE: string;
}


class A_ACCOUNT_YEAR extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.ACC_CODE = "";
        this.FIN_YEAR = 0;
        this.OPENING_BALANCE = 0;
        this.CREDIT = 0;
        this.DEBIT = 0;
        this.ACC_LIMIT = 0;
        this.REMARKS = "";
        this.StatusFlag = "";

    }
    public COMP_CODE: number;
    public ACC_CODE: string;
    public FIN_YEAR: number;
    public OPENING_BALANCE: number;
    public CREDIT: number;
    public DEBIT: number;
    public ACC_LIMIT: number;
    public REMARKS: string;
    public StatusFlag: string;


}

class AQ_GetAccount extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.ACC_CODE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.ACC_GROUP = 0;
        this.ACC_TYPE = 0;
        this.ACC_LEVEL = 0;
        this.ACC_ACTIVE = false;
        this.PARENT_ACC = "";
        this.DETAIL = false;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.LAST_UPDATE = "";
        this.CCDT_TYPE = "";
        this.CUR_CODE = "";
        this.FIN_YEAR = 0;
        this.OPENING_BALANCE = 0;
        this.CREDIT = 0;
        this.DEBIT = 0;
        this.ACC_LIMIT = 0;
        this.REMARKS = "";
    }
    public COMP_CODE: number;
    public ACC_CODE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public ACC_GROUP: number;
    public ACC_TYPE: number;
    public ACC_LEVEL: number;
    public ACC_ACTIVE: boolean;
    public PARENT_ACC: string;
    public DETAIL: boolean;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public LAST_UPDATE: string;
    public CCDT_TYPE: string;
    public CUR_CODE: string;
    public FIN_YEAR: number;
    public OPENING_BALANCE: number;
    public CREDIT: number;
    public DEBIT: number;
    public ACC_LIMIT: number;
    public REMARKS: string;
}





class A_RecPay_D_Accounts extends SecurityClass {
    constructor() {
        super();
        this.ExpenseID = 0;
        this.TrType = 0;
        this.ExpCode = 0;
        this.ExpDescA = "";
        this.ExpDescE = "";
        this.ExpAccountCode = "";
        this.CompCode = 0;
        this.IsActive = false;
        this.StatusFlag = "";
    }
    public ExpenseID: number;
    public TrType: number;
    public ExpCode: number;
    public ExpDescA: string;
    public ExpDescE: string;
    public ExpAccountCode: string;
    public CompCode: number;
    public IsActive: boolean;
    public StatusFlag: string;
}

class A_RecPay_Tr_ReceiptNote extends SecurityClass {
    constructor() {
        super();
        this.ReceiptID = 0;
        this.CashBoxID = 0;
        this.TrType = 0;
        this.RecPayTypeId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.CustomerID = 0;
        this.VendorID = 0;
        this.FromCashBoxID = 0;
        this.ExpenseID = 0;
        this.Amount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankAccountCode = "";
        this.ReceiptDescA = "";
        this.ReceiptDescE = "";
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CheckNo = "";
        this.TransferNo = "";
        this.BankName = "";
        this.BankAcc_Code = "";
        this.IsDeffered = false;
        this.DueDate = "";
        this.CashType = 0;
    }
    public ReceiptID: number;
    public CashBoxID: number;
    public TrType: number;
    public RecPayTypeId: number;
    public TrNo: number;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public CustomerID: number;
    public VendorID: number;
    public FromCashBoxID: number;
    public ExpenseID: number;
    public Amount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankAccountCode: string;
    public ReceiptDescA: string;
    public ReceiptDescE: string;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public CheckNo: string;
    public TransferNo: string;
    public BankName: string;
    public BankAcc_Code: string;
    public IsDeffered: boolean;
    public DueDate: string;
    public CashType: number;
}


class GQ_GetUserBarnchAccess extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESCL: string;
    public BRA_DESCE: string;
    public BRA_DESC: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
}


class IQ_GetBoxAdjustmentList extends SecurityClass {
    constructor() {
        super();
        this.AdjustmentID = 0;
        this.AdustmentTypeID = 0;
        this.IsDebit = false;
        this.IsCustomer = false;
        this.VendorId = 0;
        this.CustomerId = 0;
        this.TrNo
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.Amount = 0;
        this.VatAmount = 0;
        this.NetAfterVAT = 0;
        this.AdjustDescA = "";
        this.AdjustDescE = "";
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CustomerCODE = "";
        this.cus_NameA = "";
        this.Cus_NameE = "";
        this.VendorCode = "";
        this.Vnd_NameA = "";
        this.Vnd_NameE = "";
        this.AdjCode = 0;
        this.Adj_DescA = "";
        this.Adj_DescE = "";
        this.DESCRIPTION = "";
        this.VatPerc = 0;
        this.VatType = 0;
        this.InvoiceID = 0;
        this.InvTotalAmount = 0;
        this.InvVatAmount = 0;
        this.InvDiscountAmount = 0;
        this.InvDiscountPrc = 0;
        this.InvNetAfterVat = 0;
        this.DocNo = "";
        this.DocUUID = "";
        this.Status_New = "";
        this.IsDebitNew = "";
        this.TrTime = "";
        this.CRDBReasoncode = 0;
        this.CryptographicStamp
        this.PrevInvoiceHash
    }
    public AdjustmentID: number;
    public AdustmentTypeID: number;
    public IsDebit: boolean;
    public IsCustomer: boolean;
    public VendorId: number;
    public CustomerId: number;
    public TrNo: any;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public Amount: number;
    public VatAmount: number;
    public NetAfterVAT: number;
    public AdjustDescA: string;
    public AdjustDescE: string;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public CustomerCODE: string;
    public cus_NameA: string;
    public Cus_NameE: string;
    public VendorCode: string;
    public Vnd_NameA: string;
    public Vnd_NameE: string;
    public AdjCode: number;
    public Adj_DescA: string;
    public Adj_DescE: string;
    public DESCRIPTION: string;
    public VatPerc: number;
    public VatType: number;
    public InvoiceID: number;
    public InvTotalAmount: number;
    public InvVatAmount: number;
    public InvDiscountAmount: number;
    public InvDiscountPrc: number;
    public InvNetAfterVat: number;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public CRDBReasoncode: number;
    public CryptographicStamp: any;
    public PrevInvoiceHash: any;
    public Status_New: string;
    public IsDebitNew: string;
}



class A_RecPay_Tr_Adjustment extends SecurityClass {
    constructor() {
        super();
        this.AdjustmentID = 0;
        this.AdustmentTypeID = 0;
        this.IsDebit = false;
        this.IsCustomer = false;
        this.VendorId = 0;
        this.CustomerId = 0;
        this.TrNo
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.Amount = 0;
        this.VatType = 0;
        this.VatAmount = 0;
        this.NetAfterVAT = 0;
        this.AdjustDescA = "";
        this.AdjustDescE = "";
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.InvoiceID = 0;
        this.InvTotalAmount = 0;
        this.InvVatAmount = 0;
        this.InvDiscountAmount = 0;
        this.InvDiscountPrc = 0;
        this.InvNetAfterVat = 0;
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.CryptographicStamp
        this.CRDBReasoncode = 0;
        this.PrevInvoiceHash
    }
    public AdjustmentID: number;
    public AdustmentTypeID: number;
    public IsDebit: boolean;
    public IsCustomer: boolean;
    public VendorId: number;
    public CustomerId: number;
    public TrNo: any;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public Amount: number;
    public VatType: number;
    public VatAmount: number;
    public NetAfterVAT: number;
    public AdjustDescA: string;
    public AdjustDescE: string;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public InvoiceID: number;
    public InvTotalAmount: number;
    public InvVatAmount: number;
    public InvDiscountAmount: number;
    public InvDiscountPrc: number;
    public InvNetAfterVat: number;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public CryptographicStamp: any;
    public CRDBReasoncode: number;
    public PrevInvoiceHash: any;
}





class IQ_GetBoxReceiveList extends SecurityClass {
    constructor() {
        super();
        this.ReceiptID = 0;
        this.CashBoxID = 0;
        this.TrType = 0;
        this.RecPayTypeId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.CustomerID = 0;
        this.VendorID = 0;
        this.FromCashBoxID = 0;
        this.ExpenseID = 0;
        this.Amount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankAccountCode = "";
        this.ReceiptDescA = "";
        this.ReceiptDescE = "";
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CustomerCODE = "";
        this.cus_NameA = "";
        this.cus_NameE = "";
        this.Bank_Acc_DescA = "";
        this.Bank_ACC_DescE = "";
        this.CashBox_DescA = "";
        this.CashBox_DescE = "";
        this.VendorCode = "";
        this.Ven_NameA = "";
        this.Ven_NameE = "";
        this.ExpCode = 0;
        this.Exp_DescA = "";
        this.Exp_DescE = "";
        this.Bef_ID = 0;
        this.Bef_Code = 0;
        this.Bef_DescA = "";
        this.Bef_DescE = "";
        this.Type_DescA = "";
        this.Type_DescE = "";
        this.CashT_DescA = "";
        this.CashT_DescE = "";
        this.CheckNo = "";
        this.TransferNo = "";
        this.BankName = "";
        this.BankAcc_Code = "";
        this.IsDeffered = false;
        this.DueDate = "";
        this.CashType = 0;
        this.Bnk_acc_DescE = "";
        this.ACC_DESCL = "";
        this.Status_New = "";
    }
    public ReceiptID: number;
    public CashBoxID: number;
    public TrType: number;
    public RecPayTypeId: number;
    public TrNo: number;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public CustomerID: number;
    public VendorID: number;
    public FromCashBoxID: number;
    public ExpenseID: number;
    public Amount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankAccountCode: string;
    public ReceiptDescA: string;
    public ReceiptDescE: string;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public CustomerCODE: string;
    public cus_NameA: string;
    public cus_NameE: string;
    public Bank_Acc_DescA: string;
    public Bank_ACC_DescE: string;
    public CashBox_DescA: string;
    public CashBox_DescE: string;
    public VendorCode: string;
    public Ven_NameA: string;
    public Ven_NameE: string;
    public ExpCode: number;
    public Exp_DescA: string;
    public Exp_DescE: string;
    public Bef_ID: number;
    public Bef_Code: number;
    public Bef_DescA: string;
    public Bef_DescE: string;
    public Type_DescA: string;
    public Type_DescE: string;
    public CashT_DescA: string;
    public CashT_DescE: string;
    public CheckNo: string;
    public TransferNo: string;
    public BankName: string;
    public BankAcc_Code: string;
    public IsDeffered: boolean;
    public DueDate: string;
    public CashType: number;
    public Bnk_acc_DescE: string;
    public ACC_DESCL: string;
    public Status_New: string;
}


class IQ_GetPurchaseOrder extends SecurityClass {
    constructor() {
        super();
        this.PurOrderID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.SalesmanId = 0;
        this.VendorID = 0;
        this.VATType = 0;
        this.IsCash = false;
        this.Remarks = "";
        this.Total = 0;
        this.DiscountPrcnt = 0;
        this.DiscountAmount = 0;
        this.VatAmount = 0;
        this.NetDue = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CurrencyID = 0;
        this.Slsm_NameA = "";
        this.Slsm_NameE = "";
        this.Vnd_NameA = "";
        this.vnd_NameE = "";
        this.VendorCode = "";
        this.sls_Code = "";
        this.IsReceived = false;
        this.StatusDesc = "";
        this.IsReceivedDesc = "";
        this.DliveryConditions = "";
        this.ShipmentConditions = "";
        this.ValidityPeriod = "";
    }
    public PurOrderID: number;
    public TrNo: number;
    public RefNO: string;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public SalesmanId: number;
    public VendorID: number;
    public VATType: number;
    public IsCash: boolean;
    public Remarks: string;
    public Total: number;
    public DiscountPrcnt: number;
    public DiscountAmount: number;
    public VatAmount: number;
    public NetDue: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public CurrencyID: number;
    public Slsm_NameA: string;
    public Slsm_NameE: string;
    public Vnd_NameA: string;
    public vnd_NameE: string;
    public VendorCode: string;
    public sls_Code: string;
    public IsReceived: boolean;
    public StatusDesc: string;
    public IsReceivedDesc: string;
    public DliveryConditions: string;
    public ShipmentConditions: string;
    public ValidityPeriod: string;
}

class IQ_GetPurchaseOrderDetail extends SecurityClass {
    constructor() {
        super();
        this.PurOrderDetailsID = 0;
        this.PurOrderID = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.UnitID = 0;
        this.POStockQty = 0;
        this.POQty = 0;
        this.UnitPrice = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetUnitCost = 0;
        this.BonusQty = 0;
        this.StockAvailableQty = 0;
        this.StockUnitCost = 0;
        this.TotRecQty = 0;
        this.ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescE = "";
        this.FamilyCode = "";
        this.Fm_DescA = "";
        this.Fm_DescE = "";
        this.UomCode = "";
        this.Uom_DescA = "";
        this.UOM_DescE = "";
    }
    public PurOrderDetailsID: number;
    public PurOrderID: number;
    public Serial: number;
    public ItemID: number;
    public UnitID: number;
    public POStockQty: number;
    public POQty: number;
    public UnitPrice: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetUnitCost: number;
    public BonusQty: number;
    public StockAvailableQty: number;
    public StockUnitCost: number;
    public TotRecQty: number;
    public ItemCode: string;
    public itm_DescA: string;
    public itm_DescE: string;
    public FamilyCode: string;
    public Fm_DescA: string;
    public Fm_DescE: string;
    public UomCode: string;
    public Uom_DescA: string;
    public UOM_DescE: string;
}



class IQ_GetPurReceiveList extends SecurityClass {
    constructor() {
        super();
        this.ReceiveID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SalesmanId = 0;
        this.StoreID = 0;
        this.VatAmount = 0;
        this.VATType = 0;
        this.DiscountAmount = 0;
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.Slsm_Code = "";
        this.Slsm_DescA = "";
        this.Slsm_DescE = "";
        this.Vnd_NameA = "";
        this.Box_DescA = "";
        this.Box_DescE = "";
        this.VendorID = 0;
        this.VendorInvNo = "";
        this.PoDate = "";
        this.PoNo = "";
        this.Remarks = "";
        this.Total = 0;
        this.DiscountPrcnt = 0;
        this.NetDue = 0;
        this.NetAdditionCost = 0;
        this.VendorCode = "";
        this.PurRecType = 0;
        this.CashBoxID = 0;
        this.NetAdditionVat = 0;
        this.Vnd_NameE = "";
        this.type_DescA = "";
        this.Type_DescE = "";
        this.CashPaidAmount = 0;
        this.RemainAmount = 0;
        this.PurOrderID = 0;
        this.PO_TrNo = 0;
        this.PO_TrDate = "";
    }
    public ReceiveID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SalesmanId: number;
    public StoreID: number;
    public VatAmount: number;
    public VATType: number;
    public DiscountAmount: number;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public Slsm_Code: string;
    public Slsm_DescA: string;
    public Slsm_DescE: string;
    public Vnd_NameA: string;
    public Box_DescA: string;
    public Box_DescE: string;
    public VendorID: number;
    public VendorInvNo: string;
    public PoDate: string;
    public PoNo: string;
    public Remarks: string;
    public Total: number;
    public DiscountPrcnt: number;
    public NetDue: number;
    public NetAdditionCost: number;
    public VendorCode: string;
    public PurRecType: number;
    public CashBoxID: number;
    public NetAdditionVat: number;
    public Vnd_NameE: string;
    public type_DescA: string;
    public Type_DescE: string;
    public CashPaidAmount: number;
    public RemainAmount: number;
    public PurOrderID: number;
    public PO_TrNo: number;
    public PO_TrDate: string;
}




class KQ_GetAlertNoteLog extends SecurityClass {
    constructor() {
        super();
        this.NoteType = 0;
        this.NoteSubType = 0;
        this.MemberID = 0;
        this.MsgDate = "";
        this.MsgText = "";
        this.IsSent = false;
        this.AlertID = 0;
    }
    public NoteType: number;
    public NoteSubType: number;
    public MemberID: number;
    public MsgDate: string;
    public MsgText: string;
    public IsSent: boolean;
    public AlertID: number;
}


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

class G_News extends SecurityClass {
    constructor() {
        super();
        this.NewsID = 0;
        this.NewsTypeCode = 0;
        this.NewsToCode = 0;
        this.NewsDate = "";
        this.NewsExpiry = "";
        this.NewsText = "";
        this.CompCode = 0;
        this.BranchCode = 0;
    }
    public NewsID: number;
    public NewsTypeCode: number;
    public NewsToCode: number;
    public NewsDate: string;
    public NewsExpiry: string;
    public NewsText: string;
    public CompCode: number;
    public BranchCode: number;
}
class SlsInvoiceMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.I_Sls_TR_Invoice = new I_Sls_TR_Invoice();
        this.I_Sls_TR_InvoiceItems = new Array<I_Sls_TR_InvoiceItems>();
    }
    public I_Sls_TR_Invoice: I_Sls_TR_Invoice;
    public I_Sls_TR_InvoiceItems: Array<I_Sls_TR_InvoiceItems>;


}
class PurReceiveMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.I_Pur_TR_Receive = new I_Pur_TR_Receive();
        this.I_Pur_TR_ReceiveItems = new Array<I_Pur_TR_ReceiveItems>();
        this.I_Pur_Tr_ReceiveCharges = new Array<I_Pur_Tr_ReceiveCharges>();
    }
    public I_Pur_TR_Receive: I_Pur_TR_Receive;
    public I_Pur_TR_ReceiveItems: Array<I_Pur_TR_ReceiveItems>;
    public I_Pur_Tr_ReceiveCharges: Array<I_Pur_Tr_ReceiveCharges>;

}

class Rec_D_CustomerDetail extends SecurityClass {
    constructor() {
        super();
        this.A_Rec_D_Customer = new A_Rec_D_Customer();
        this.A_Rec_D_CustomerDoc = new Array<A_Rec_D_CustomerDoc>();
    }
    public A_Rec_D_Customer: A_Rec_D_Customer;
    public A_Rec_D_CustomerDoc: Array<A_Rec_D_CustomerDoc>;

}



class I_Item_Year_Details extends SecurityClass {
    constructor() {
        super();
        this.I_Item = new Array<I_Item>();
        this.I_ItemYear = new Array<I_ItemYear>();
    }
    public I_Item: Array<I_Item>;
    public I_ItemYear: Array<I_ItemYear>;

}



class IQ_GetPurReceiveMasterDisplay extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetPurReceiveItem = new Array<IQ_GetPurReceiveItem>();
        this.IQ_GetPurReceiveCharge = new Array<IQ_GetPurReceiveCharge>();
    }

    public IQ_GetPurReceiveItem: Array<IQ_GetPurReceiveItem>;
    public IQ_GetPurReceiveCharge: Array<IQ_GetPurReceiveCharge>;

}


class A_ACCOUNT_AND_YEAR extends SecurityClass {
    constructor() {
        super();
        this.A_ACCOUNT = new Array<A_ACCOUNT>();
        this.A_ACCOUNT_YEAR = new A_ACCOUNT_YEAR();
    }

    public A_ACCOUNT: Array<A_ACCOUNT>;
    public A_ACCOUNT_YEAR: A_ACCOUNT_YEAR;

}

class AllGetOperationMasterDisplay extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetOperationItemInfo = new Array<IQ_GetOperationItemInfo>();
        this.IQ_GetOperationCharges = new Array<IQ_GetOperationCharges>();
        this.I_TR_OperationDeposit = new Array<IQ_GetOperationDepsit>();
        this.TR_OperationSalesman = new Array<IQ_GetOperationSalesman>();
        this.TR_OperationSalesmanItem = new Array<IQ_GetOperationSalesmanItem>();
    }

    public IQ_GetOperationItemInfo: Array<IQ_GetOperationItemInfo>;
    public IQ_GetOperationCharges: Array<IQ_GetOperationCharges>;
    public I_TR_OperationDeposit: Array<IQ_GetOperationDepsit>;
    public TR_OperationSalesman: Array<IQ_GetOperationSalesman>;
    public TR_OperationSalesmanItem: Array<IQ_GetOperationSalesmanItem>;
}




class I_Sls_TR_Invoice extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CashBoxID = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.StoreId = 0;
        this.OperationId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CommitionAmount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxNotes = "";
        this.TaxCurrencyID = 0;
        this.InvoiceCurrenyID = 0;
        this.ContractNo = "";
        this.PurchaseorderNo = "";
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.DeliveryDate = "";
        this.DeliveryEndDate = "";
        this.PaymentMeansTypeCode = 0;
        this.CRDBReasoncode = 0;
        this.PaymentTerms = "";
        this.PaymentTermsID = 0;
        this.AllowAmount = 0;
        this.AllowPrc = 0;
        this.AllowBase = 0;
        this.AllowVatNatID = 0;
        this.AllowVatPrc = 0;
        this.AllowAfterVat = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.ItemTotal = 0;
        this.ItemAllowTotal = 0;
        this.ItemDiscountTotal = 0;
        this.ItemVatTotal = 0;
        this.RoundingAmount = 0;
    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CashBoxID: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public StoreId: number;
    public OperationId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CommitionAmount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public TaxNotes: string;
    public TaxCurrencyID: number;
    public InvoiceCurrenyID: number;
    public ContractNo: string;
    public PurchaseorderNo: string;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public DeliveryDate: string;
    public DeliveryEndDate: string;
    public PaymentMeansTypeCode: number;
    public CRDBReasoncode: number;
    public PaymentTerms: string;
    public PaymentTermsID: number;
    public AllowAmount: number;
    public AllowPrc: number;
    public AllowBase: number;
    public AllowVatNatID: number;
    public AllowVatPrc: number;
    public AllowAfterVat: number;
    public AllowReason: string;
    public AllowCode: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public ItemTotal: number;
    public ItemAllowTotal: number;
    public ItemDiscountTotal: number;
    public ItemVatTotal: number;
    public RoundingAmount: number;
}

class I_Sls_TR_InvoiceItems extends SecurityClass {
    constructor() {
        super();
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.InvoiceSoldQty = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.StockSoldQty = 0;
        this.StockUnitCost = 0;
        this.VatApplied = 0;
        this.TotRetQty = 0;
        this.Serial = 0;
        this.AllowAmount = 0;
        this.AllowancePrc = 0;
        this.AllowanceBase = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.BaseQty = 0;
        this.BaseQtyUomid = 0;
        this.BaseQtyPrice = 0;
        this.BaseQtyDiscount = 0;
        this.DiscountPrcBase = 0;
        this.DiscountVatNatID = 0;
        this.Discountreason = "";
        this.DiscountCode = 0;
        this.ItemNetAmount = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.VatNatID = 0;
        this.UnitpriceWithVat = 0;
        this.NetUnitPriceWithVat = 0;
        this.Name_Item = "";
        this.MinUnitPrice = 0;
        this.ItemFamilyID = 0;
        this.Name_ItemFamily = "";
        this.OnhandQty = 0;
        this.StatusFlag = "";

    }
    public InvoiceItemID: number;
    public InvoiceID: number;
    public ItemID: number;
    public UomID: number;
    public InvoiceSoldQty: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public StockSoldQty: number;
    public StockUnitCost: number;
    public VatApplied: number;
    public TotRetQty: number;
    public Serial: number;
    public AllowAmount: number;
    public AllowancePrc: number;
    public AllowanceBase: number;
    public AllowReason: string;
    public AllowCode: number;
    public BaseQty: number;
    public BaseQtyUomid: number;
    public BaseQtyPrice: number;
    public BaseQtyDiscount: number;
    public DiscountPrcBase: number;
    public DiscountVatNatID: number;
    public Discountreason: string;
    public DiscountCode: number;
    public ItemNetAmount: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public VatNatID: number;
    public UnitpriceWithVat: number;
    public NetUnitPriceWithVat: number;
    public Name_Item: string;
    public Name_ItemFamily: string;
    public MinUnitPrice: number;
    public ItemFamilyID: number;
    public OnhandQty: number;
    public StatusFlag: string;
}
class IQ_GetSlsInvoiceStatistic extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CashBoxID = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.StoreId = 0;
        this.OperationId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CommitionAmount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.Slsm_Code = "";
        this.Slsm_DescA = "";
        this.Slsm_DescE = "";
        this.Cus_Code = "";
        this.Cus_NameA = "";
        this.Cus_NameE = "";
        this.Box_DescA = "";
        this.Box_DescE = "";
        this.Line_Count = 0;
        this.Item_Count = 0;
        this.Tot_Qty = 0;
        this.Tot_Amount = 0;
        this.Tot_VAT = 0;
        this.Tot_Net = 0;
        this.tot_RetQty = 0;
        this.returnTypeDesciption = "";
        this.statusDesciption = "";
        this.IsCashDesciption = "";
        this.operationName = "";
    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CashBoxID: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public StoreId: number;
    public OperationId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CommitionAmount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public Slsm_Code: string;
    public Slsm_DescA: string;
    public Slsm_DescE: string;
    public Cus_Code: string;
    public Cus_NameA: string;
    public Cus_NameE: string;
    public Box_DescA: string;
    public Box_DescE: string;
    public Line_Count: number;
    public Item_Count: number;
    public Tot_Qty: number;
    public Tot_Amount: number;
    public Tot_VAT: number;
    public Tot_Net: number;
    public tot_RetQty: number;
    public returnTypeDesciption: string;
    public statusDesciption: string;
    public IsCashDesciption: string;
    public operationName: string;
}

class IQ_GetSlsInvoiceItem extends SecurityClass {
    constructor() {
        super();
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.StockSoldQty = 0;
        this.StockUnitCost = 0;
        this.VatApplied = 0;
        this.TotRetQty = 0;
        this.it_itemCode = "";
        this.it_DescA = "";
        this.CompCode = 0;
        this.It_DescE = "";
        this.ItFm_Code = "";
        this.ItFm_DescA = "";
        this.ItFm_DescE = "";
        this.Cat_Code = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.ItemFamilyID = 0;
        this.InvoiceSoldQty = 0;
        this.Serial = 0;
        this.AllowAmount = 0;
        this.AllowancePrc = 0;
        this.AllowanceBase = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.BaseQty = 0;
        this.BaseQtyUomid = 0;
        this.BaseQtyPrice = 0;
        this.BaseQtyDiscount = 0;
        this.DiscountPrcBase = 0;
        this.DiscountVatNatID = 0;
        this.Discountreason = "";
        this.DiscountCode = 0;
        this.ItemNetAmount = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.VatNatID = 0;
        this.UnitpriceWithVat = 0;
        this.NetUnitPriceWithVat = 0;
    }
    public InvoiceItemID: number;
    public InvoiceID: number;
    public ItemID: number;
    public UomID: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public StockSoldQty: number;
    public StockUnitCost: number;
    public VatApplied: number;
    public TotRetQty: number;
    public it_itemCode: string;
    public it_DescA: string;
    public CompCode: number;
    public It_DescE: string;
    public ItFm_Code: string;
    public ItFm_DescA: string;
    public ItFm_DescE: string;
    public Cat_Code: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public ItemFamilyID: number;
    public InvoiceSoldQty: number;
    public Serial: number;
    public AllowAmount: number;
    public AllowancePrc: number;
    public AllowanceBase: number;
    public AllowReason: string;
    public AllowCode: number;
    public BaseQty: number;
    public BaseQtyUomid: number;
    public BaseQtyPrice: number;
    public BaseQtyDiscount: number;
    public DiscountPrcBase: number;
    public DiscountVatNatID: number;
    public Discountreason: string;
    public DiscountCode: number;
    public ItemNetAmount: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public VatNatID: number;
    public UnitpriceWithVat: number;
    public NetUnitPriceWithVat: number;
}
class IQ_GetSlsInvoiceList extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CashBoxID = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.StoreId = 0;
        this.OperationId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CommitionAmount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.Slsm_Code = "";
        this.Slsm_DescA = "";
        this.Slsm_DescE = "";
        this.Cus_Code = "";
        this.Cus_NameA = "";
        this.Cus_NameE = "";
        this.Box_DescA = "";
        this.Box_DescE = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxNotes = "";
        this.TaxCurrencyID = 0;
        this.InvoiceCurrenyID = 0;
        this.ContractNo = "";
        this.PurchaseorderNo = "";
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.DeliveryDate = "";
        this.DeliveryEndDate = "";
        this.PaymentMeansTypeCode = 0;
        this.CRDBReasoncode = 0;
        this.PaymentTerms = "";
        this.PaymentTermsID = 0;
        this.AllowAmount = 0;
        this.AllowPrc = 0;
        this.AllowBase = 0;
        this.AllowVatNatID = 0;
        this.AllowVatPrc = 0;
        this.AllowAfterVat = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.ItemTotal = 0;
        this.ItemAllowTotal = 0;
        this.ItemDiscountTotal = 0;
        this.ItemVatTotal = 0;
        this.RoundingAmount = 0;

    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CashBoxID: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public StoreId: number;
    public OperationId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CommitionAmount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public Slsm_Code: string;
    public Slsm_DescA: string;
    public Slsm_DescE: string;
    public Cus_Code: string;
    public Cus_NameA: string;
    public Cus_NameE: string;
    public Box_DescA: string;
    public Box_DescE: string;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public TaxNotes: string;
    public TaxCurrencyID: number;
    public InvoiceCurrenyID: number;
    public ContractNo: string;
    public PurchaseorderNo: string;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public DeliveryDate: string;
    public DeliveryEndDate: string;
    public PaymentMeansTypeCode: number;
    public CRDBReasoncode: number;
    public PaymentTerms: string;
    public PaymentTermsID: number;
    public AllowAmount: number;
    public AllowPrc: number;
    public AllowBase: number;
    public AllowVatNatID: number;
    public AllowVatPrc: number;
    public AllowAfterVat: number;
    public AllowReason: string;
    public AllowCode: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public ItemTotal: number;
    public ItemAllowTotal: number;
    public ItemDiscountTotal: number;
    public ItemVatTotal: number;
    public RoundingAmount: number;
}
class I_TR_OperationItems extends SecurityClass {
    constructor() {
        super();
        this.OperationItemID = 0;
        this.OperationID = 0;
        this.ItemID = 0;
        this.ReceivedQty = 0;
        this.SoldQty = 0;
        this.ScrapQty = 0;
        this.Est_CostPrice = 0;
        this.Est_SalesPrice = 0;
        this.Min_SalesPrice = 0;
        this.OnhandQty = 0;
        this.Remarks = "";
        this.StatusFlag = "";
    }
    public OperationItemID: number;
    public OperationID: number;
    public ItemID: number;
    public ReceivedQty: number;
    public SoldQty: number;
    public ScrapQty: number;
    public Est_CostPrice: number;
    public Est_SalesPrice: number;
    public Min_SalesPrice: number;
    public OnhandQty: number;
    public Remarks: string;
    public StatusFlag: string;
}


class I_TR_OperationDeposit extends SecurityClass {
    constructor() {
        super();
        this.OperationDepositID = 0;
        this.OperationID = 0;
        this.SalesmanId = 0;
        this.ItemID = 0;
        this.Acc_Code = "";
        this.DepositAmount = 0;
        this.DepositDate = "";
        this.Remarks = "";
        this.DepositType = 0;
        this.CashBoxID = 0;
        this.StatusFlag = "";

    }
    public OperationDepositID: number;
    public OperationID: number;
    public SalesmanId: number;
    public ItemID: number;
    public Acc_Code: string;
    public DepositAmount: number;
    public DepositDate: string;
    public Remarks: string;
    public DepositType: number;
    public CashBoxID: number;
    public StatusFlag: string;
}


class IQ_GetOperationDepsit extends SecurityClass {
    constructor() {
        super();
        this.OperationDepositID = 0;
        this.OperationID = 0;
        this.ItemID = 0;
        this.Acc_Code = "";
        this.DepositAmount = 0;
        this.DepositDate = "";
        this.Remarks = "";
        this.DepositType = 0;
        this.CashBoxID = 0;
        this.CashBox_DescA = "";
        this.CashBox_DescE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.SalesmanId = 0;
        this.SalesmanCode = "";
        this.Sls_NameA = "";
        this.sls_NameE = "";
        this.StatusFlag = "";

    }
    public OperationDepositID: number;
    public OperationID: number;
    public ItemID: number;
    public Acc_Code: string;
    public DepositAmount: number;
    public DepositDate: string;
    public Remarks: string;
    public DepositType: number;
    public CashBoxID: number;
    public CashBox_DescA: string;
    public CashBox_DescE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public SalesmanId: number;
    public SalesmanCode: string;
    public Sls_NameA: string;
    public sls_NameE: string;
    public StatusFlag: string;

}




class I_TR_OperationCharges extends SecurityClass {
    constructor() {
        super();
        this.OperationExpensesID = 0;
        this.OperationID = 0;
        this.Serial = 0;
        this.ChargeID = 0;
        this.Amount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.VatPrc = 0;
        this.NetAtferVat = 0;
        this.isPaidByVendor = false;
        this.RefInvoiceNo = "";
        this.RefInvoiceDate = "";
        this.VendorID = 0;
        this.StatusFlag = "";
        this.CashBoxID = 0;
    }
    public OperationExpensesID: number;
    public OperationID: number;
    public Serial: number;
    public ChargeID: number;
    public Amount: number;
    public VatAmount: number;
    public VatType: number;
    public VatPrc: number;
    public NetAtferVat: number;
    public isPaidByVendor: boolean;
    public RefInvoiceNo: string;
    public RefInvoiceDate: string;
    public VendorID: number;
    public StatusFlag: string;
    public CashBoxID: number;
}


class I_TR_Operation extends SecurityClass {
    constructor() {
        super();
        this.OperationID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.ClearanceDate = "";
        this.TrDateH = "";
        this.TruckNo = "";
        this.PortName = "";
        this.PaperPurchaseValue = 0;
        this.NationalityID = 0;
        this.VendorID = 0;
        this.Goods_Desc = "";
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.OpenAt = "";
        this.OpenBy = "";
        this.CloseAt = "";
        this.CloseBy = "";
        this.User_Code = "";
        this.SalesmanId = 0;
        this.CompanyCommitionPrc = 0;
        this.Close_CompanyCommitionPrc = 0;
        this.Close_TrDate = "";
        this.Close_TotalSalesCash = 0;
        this.Close_TotalSalesCashVAT = 0;
        this.Close_TotalSalesCredit = 0;
        this.Close_TotalSalesCreditVAT = 0;
        this.Close_CashOnhand = 0;
        this.Close_CashOnBank = 0;
        this.Close_BankAccNo = "";
        this.Close_TotalSales = 0;
        this.Close_Marketting = 0;
        this.Close_TotalExpenses = 0;
        this.Close_Adjustment = 0;
        this.Close_AdjustmentRemarks = "";
        this.Close_CompanyCommition = 0;
        this.Close_purchaseValue = 0;
        this.Close_SalesManCommition = 0;
        this.Close_NetProfit = 0;
        this.Close_Remarks = "";
        this.IsGenerated = false;
        this.PolicyNo = "";
        this.CustomNo = "";
    }
    public OperationID: number;
    public TrNo: number;
    public RefNO: string;
    public TrDate: string;
    public ClearanceDate: string;
    public TrDateH: string;
    public TruckNo: string;
    public PortName: string;
    public PaperPurchaseValue: number;
    public NationalityID: number;
    public VendorID: number;
    public Goods_Desc: string;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public OpenAt: string;
    public OpenBy: string;
    public CloseAt: string;
    public CloseBy: string;
    public User_Code: string;
    public SalesmanId: number;
    public CompanyCommitionPrc: number;
    public Close_CompanyCommitionPrc: number;
    public Close_TrDate: string;
    public Close_TotalSalesCash: number;
    public Close_TotalSalesCashVAT: number;
    public Close_TotalSalesCredit: number;
    public Close_TotalSalesCreditVAT: number;
    public Close_CashOnhand: number;
    public Close_CashOnBank: number;
    public Close_BankAccNo: string;
    public Close_TotalSales: number;
    public Close_TotalExpenses: number;
    public Close_Adjustment: number;
    public Close_Marketting: number;
    public Close_AdjustmentRemarks: string;
    public Close_CompanyCommition: number;
    public Close_purchaseValue: number;
    public Close_SalesManCommition: number;
    public Close_NetProfit: number;
    public Close_Remarks: string;
    public IsGenerated: boolean;
    public PolicyNo: string;
    public CustomNo: string;

}
class IQ_GetOperationItemInfo_New {
    constructor() {

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
    public ItemID: number;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public Family_DescA: string;
    public Family_DescE: string;
    public ItemFamilyID: number;
    public Min_SalesPrice: number;
    public OnhandQty: number;
    public Est_SalesPrice: number;
}

class IQ_GetOperationItemInfo extends SecurityClass {
    constructor() {
        super();
        this.ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.UomID = 0;
        this.ItemFamilyID = 0;
        this.CompCode = 0;
        this.RefItemCode = "";
        this.FirstEntryDate = "";
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
        this.OnhandQty = 0;
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.FamilyCode = "";
        this.Family_DescA = "";
        this.Family_DescE = "";
        this.MinUnitPrice = 0;
        this.CatID = 0;
        this.OperationItemID = 0;
        this.OperationID = 0;
        this.ItemID = 0;
        this.ReceivedQty = 0;
        this.SoldQty = 0;
        this.ScrapQty = 0;
        this.Est_CostPrice = 0;
        this.Est_SalesPrice = 0;
        this.Min_SalesPrice = 0;
        this.Expr1 = "";
    }
    public ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public UomID: number;
    public ItemFamilyID: number;
    public CompCode: number;
    public RefItemCode: string;
    public FirstEntryDate: string;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
    public OnhandQty: number;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public FamilyCode: string;
    public Family_DescA: string;
    public Family_DescE: string;
    public MinUnitPrice: number;
    public CatID: number;
    public OperationItemID: number;
    public OperationID: number;
    public ItemID: number;
    public ReceivedQty: number;
    public SoldQty: number;
    public ScrapQty: number;
    public Est_CostPrice: number;
    public Est_SalesPrice: number;
    public Min_SalesPrice: number;
    public Expr1: string;
}


class IQ_GetOperationCharges extends SecurityClass {
    constructor() {
        super();
        this.ChargeID = 0;
        this.Amount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.VatPrc = 0;
        this.NetAtferVat = 0;
        this.isPaidByVendor = false;
        this.RefInvoiceNo = "";
        this.RefInvoiceDate = "";
        this.VendorID = 0;
        this.CostAddCode = 0;
        this.DESCA = "";
        this.DESCL = "";
        this.IsAddition = false;
        this.VendorCode = "";
        this.Vnd_NameA = "";
        this.Vnd_NameE = "";
        this.Serial = 0;
        this.OperationExpensesID = 0;
        this.OperationID = 0;
        this.CashBox_DescA = "";
        this.CashBox_DescE = "";


    }
    public ChargeID: number;
    public Amount: number;
    public VatAmount: number;
    public VatType: number;
    public VatPrc: number;
    public NetAtferVat: number;
    public isPaidByVendor: boolean;
    public RefInvoiceNo: string;
    public RefInvoiceDate: string;
    public VendorID: number;
    public CostAddCode: number;
    public DESCA: string;
    public DESCL: string;
    public IsAddition: boolean;
    public VendorCode: string;
    public Vnd_NameA: string;
    public Vnd_NameE: string;
    public Serial: number;
    public OperationExpensesID: number;
    public OperationID: number;
    public CashBox_DescA: string;
    public CashBox_DescE: string;

}


class IQ_GetOperation extends SecurityClass {
    constructor() {
        super();
        this.OperationID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.TrDateH = "";
        this.TruckNo = "";
        this.PortName = "";
        this.PaperPurchaseValue = 0;
        this.NationalityID = 0;
        this.VendorID = 0;
        this.Goods_Desc = "";
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.OpenAt = "";
        this.OpenBy = "";
        this.CloseAt = "";
        this.CloseBy = "";
        this.User_Code = "";
        this.SalesmanId = 0;
        this.CompanyCommitionPrc = 0;
        this.Close_CompanyCommitionPrc = 0;
        this.Close_TrDate = "";
        this.Close_TotalSalesCash = 0;
        this.Close_TotalSalesCashVAT = 0;
        this.Close_TotalSalesCredit = 0;
        this.Close_TotalSalesCreditVAT = 0;
        this.Close_CashOnhand = 0;
        this.Close_CashOnBank = 0;
        this.Close_BankAccNo = "";
        this.Close_TotalSales = 0;
        this.Close_TotalExpenses = 0;
        this.Close_Adjustment = 0;
        this.Close_AdjustmentRemarks = "";
        this.Close_CompanyCommition = 0;
        this.Close_purchaseValue = 0;
        this.Close_SalesManCommition = 0;
        this.Close_NetProfit = 0;
        this.Close_Remarks = "";
        this.Vnd_Code = "";
        this.nvd_DescA = "";
        this.Vnd_DescE = "";
        this.Status_DescA = "";
        this.Status_DescE = "";
        this.Nat_DescA = "";
        this.Nat_Code = "";
        this.Nat_DescE = "";
        this.Sls_NameA = "";
        this.Sls_Code = "";
        this.Sls_NameE = "";
        this.ClearanceDate = "";
        this.ClearanceDateH = "";
        this.ClearanceDateH = "";
        this.IsGenerated = false;
        this.PolicyNo = "";
        this.CustomNo = "";


    }
    public OperationID: number;
    public TrNo: number;
    public RefNO: string;
    public TrDate: string;
    public TrDateH: string;
    public TruckNo: string;
    public PortName: string;
    public PaperPurchaseValue: number;
    public NationalityID: number;
    public VendorID: number;
    public Goods_Desc: string;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public OpenAt: string;
    public OpenBy: string;
    public CloseAt: string;
    public CloseBy: string;
    public User_Code: string;
    public SalesmanId: number;
    public CompanyCommitionPrc: number;
    public Close_CompanyCommitionPrc: number;
    public Close_TrDate: string;
    public Close_TotalSalesCash: number;
    public Close_TotalSalesCashVAT: number;
    public Close_TotalSalesCredit: number;
    public Close_TotalSalesCreditVAT: number;
    public Close_CashOnhand: number;
    public Close_CashOnBank: number;
    public Close_BankAccNo: string;
    public Close_TotalSales: number;
    public Close_TotalExpenses: number;
    public Close_Adjustment: number;
    public Close_AdjustmentRemarks: string;
    public Close_CompanyCommition: number;
    public Close_purchaseValue: number;
    public Close_SalesManCommition: number;
    public Close_NetProfit: number;
    public Close_Remarks: string;
    public Vnd_Code: string;
    public nvd_DescA: string;
    public Vnd_DescE: string;
    public Status_DescA: string;
    public Status_DescE: string;
    public Nat_DescA: string;
    public Nat_Code: string;
    public Nat_DescE: string;
    public Sls_NameA: string;
    public Sls_Code: string;
    public Sls_NameE: string;
    public ClearanceDate: string;
    public ClearanceDateH: string;
    public IsGenerated: boolean;
    public PolicyNo: string;
    public CustomNo: string;

}




class IQ_GetPurReceiveStaistic extends SecurityClass {
    constructor() {
        super();
        this.ReceiveID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.IsCash = false;
        this.TrType = 0;
        this.SalesmanId = 0;
        this.StoreID = 0;
        this.VatAmount = 0;
        this.VATType = 0;
        this.DiscountAmount = 0;
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.BranchCode = 0;
        this.CompCode = 0;
        this.Slsm_Code = "";
        this.Slsm_DescA = "";
        this.Slsm_DescE = "";
        this.Box_DescA = "";
        this.Box_DescE = "";
        this.VendorID = 0;
        this.VendorInvNo = "";
        this.PoDate = "";
        this.PoNo = "";
        this.Remarks = "";
        this.Total = 0;
        this.DiscountPrcnt = 0;
        this.NetDue = 0;
        this.NetAdditionCost = 0;
        this.VendorCode = "";
        this.PurRecType = 0;
        this.CashBoxID = 0;
        this.NetAdditionVat = 0;
        this.Line_Count = 0;
        this.Item_Count = 0;
        this.Tot_Qty = 0;
        this.Tot_Amount = 0;
        this.Tot_VAT = 0;
        this.Tot_Net = 0;
        this.tot_RetQty = 0;
        this.Tot_Add = 0;
        this.TotAdd = 0;
        this.TotAddVat = 0;
        this.TotAddAfterVat = 0;
        this.Vnd_NameA = "";
        this.Vnd_NameE = "";
        this.type_DescA = "";
        this.Type_DescE = "";
        this.Vendor_Name = "";
        this.StatusDesc = "";
        this.CashPaidAmount = 0;
        this.RemainAmount = 0;
        this.CurrencyID = 0;
        this.PurOrderID = 0;
        this.PO_TrNo = 0;
        this.PO_TrDate = "";
        this.TotalFC = 0;
        this.CurrencyRate = 0;
        this.Tot_AmountFC = 0;
    }
    public ReceiveID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public IsCash: boolean;
    public TrType: number;
    public SalesmanId: number;
    public StoreID: number;
    public VatAmount: number;
    public VATType: number;
    public DiscountAmount: number;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public BranchCode: number;
    public CompCode: number;
    public Slsm_Code: string;
    public Slsm_DescA: string;
    public Slsm_DescE: string;
    public Box_DescA: string;
    public Box_DescE: string;
    public VendorID: number;
    public VendorInvNo: string;
    public PoDate: string;
    public PoNo: string;
    public Remarks: string;
    public Total: number;
    public DiscountPrcnt: number;
    public NetDue: number;
    public NetAdditionCost: number;
    public VendorCode: string;
    public PurRecType: number;
    public CashBoxID: number;
    public NetAdditionVat: number;
    public Line_Count: number;
    public Item_Count: number;
    public Tot_Qty: number;
    public Tot_Amount: number;
    public Tot_VAT: number;
    public Tot_Net: number;
    public tot_RetQty: number;
    public Tot_Add: number;
    public TotAdd: number;
    public TotAddVat: number;
    public TotAddAfterVat: number;
    public Vnd_NameA: string;
    public Vnd_NameE: string;
    public type_DescA: string;
    public Type_DescE: string;
    public Vendor_Name: string;
    public StatusDesc: string;
    public CashPaidAmount: number;
    public RemainAmount: number;
    public CurrencyID: number;
    public PurOrderID: number;
    public PO_TrNo: number;
    public PO_TrDate: string;
    public TotalFC: number;
    public CurrencyRate: number;
    public Tot_AmountFC: number;
}
class IQ_GetPurReceiveItem extends SecurityClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.StockUnitCost = 0;
        this.TotRetQty = 0;
        this.it_itemCode = "";
        this.it_DescA = "";
        this.CompCode = 0;
        this.It_DescE = "";
        this.ItFm_Code = "";
        this.ItFm_DescA = "";
        this.ItFm_DescE = "";
        this.Cat_Code = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.ReciveDetailsID = 0;
        this.ReceiveID = 0;
        this.Serial = 0;
        this.UnitID = 0;
        this.RecStockQty = 0;
        this.RecQty = 0;
        this.RecUnitPrice = 0;
        this.NetUnitCost = 0;
        this.BonusQty = 0;
        this.ExpireDate = "";
        this.BatchCode = "";
        this.BarCode = "";
        this.StockAvailableQty = 0;
        this.NewUnitCost = 0;
        this.UnitAddCost = 0;
        this.TotItemCost = 0;
        this.ItemFamilyID = 0;
        this.ReceiveRecQty = 0;
        this.RecUnitPriceFC = 0;

    }
    public ItemID: number;
    public VatPrc: number;
    public VatAmount: number;
    public StockUnitCost: number;
    public TotRetQty: number;
    public it_itemCode: string;
    public it_DescA: string;
    public CompCode: number;
    public It_DescE: string;
    public ItFm_Code: string;
    public ItFm_DescA: string;
    public ItFm_DescE: string;
    public Cat_Code: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public ReciveDetailsID: number;
    public ReceiveID: number;
    public Serial: number;
    public UnitID: number;
    public RecStockQty: number;
    public RecQty: number;
    public RecUnitPrice: number;
    public NetUnitCost: number;
    public BonusQty: number;
    public ExpireDate: string;
    public BatchCode: string;
    public BarCode: string;
    public StockAvailableQty: number;
    public NewUnitCost: number;
    public UnitAddCost: number;
    public TotItemCost: number;
    public ItemFamilyID: number;
    public ReceiveRecQty: number;
    public RecUnitPriceFC: number;
}
class IQ_GetPurReceiveCharge extends SecurityClass {
    constructor() {
        super();
        this.ReceiveID = 0;
        this.ReceiveExpensesID = 0;
        this.ChargeID = 0;
        this.Amount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.VatPrc = 0;
        this.NetAtferVat = 0;
        this.isPaidByVendor = false;
        this.RefInvoiceNo = "";
        this.RefInvoiceDate = "";
        this.VendorID = 0;
        this.CostAddCode = 0;
        this.DESCA = "";
        this.DESCL = "";
        this.IsAddition = false;
        this.VendorCode = "";
        this.Vnd_NameA = "";
        this.Vnd_NameE = "";
        this.Serial = 0;
        this.CashBoxID = 0;
    }
    public ReceiveID: number;
    public ReceiveExpensesID: number;
    public ChargeID: number;
    public Amount: number;
    public VatAmount: number;
    public VatType: number;
    public VatPrc: number;
    public NetAtferVat: number;
    public isPaidByVendor: boolean;
    public RefInvoiceNo: string;
    public RefInvoiceDate: string;
    public VendorID: number;
    public CostAddCode: number;
    public DESCA: string;
    public DESCL: string;
    public IsAddition: boolean;
    public VendorCode: string;
    public Vnd_NameA: string;
    public Vnd_NameE: string;
    public Serial: number;
    public CashBoxID: number;
}
class IQ_GetPurChargeInfo extends SecurityClass {
    constructor() {
        super();
        this.VatType = 0;
        this.ChargeID = 0;
        this.CompCode = 0;
        this.CostAddCode = 0;
        this.DESCA = "";
        this.DESCL = "";
        this.IsAddition = false;
        this.DefaultPerc = 0;
        this.IsAffectPurchaseCost = false;
        this.GLExpenseAcc = "";
        this.Ch_VatType = 0;
        this.VatPerc = 0;
    }
    public VatType: number;
    public ChargeID: number;
    public CompCode: number;
    public CostAddCode: number;
    public DESCA: string;
    public DESCL: string;
    public IsAddition: boolean;
    public DefaultPerc: number;
    public IsAffectPurchaseCost: boolean;
    public GLExpenseAcc: string;
    public Ch_VatType: number;
    public VatPerc: number;
}

class I_Pur_D_Charges extends SecurityClass {
    constructor() {
        super();
        this.ChargeID = 0;
        this.CompCode = 0;
        this.CostAddCode = 0;
        this.DESCA = "";
        this.DESCL = "";
        this.IsAddition = false;
        this.DefaultPerc = 0;
        this.IsAffectPurchaseCost = false;
        this.GLExpenseAcc = "";
        this.VatType = 0;
        this.StatusFlag = "";
        this.OPGLExpenseAcc = "";


    }
    public ChargeID: number;
    public CompCode: number;
    public CostAddCode: number;
    public DESCA: string;
    public DESCL: string;
    public IsAddition: boolean;
    public DefaultPerc: number;
    public IsAffectPurchaseCost: boolean;
    public GLExpenseAcc: string;
    public VatType: number;
    public StatusFlag: string;
    public OPGLExpenseAcc: string;

}

class I_Pur_TR_Receive extends SecurityClass {
    constructor() {
        super();
        this.ReceiveID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrType = 0;
        this.PurRecType = 0;
        this.StoreID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.SalesmanId = 0;
        this.VendorID = 0;
        this.VendorInvNo = "";
        this.VATType = 0;
        this.PoDate = "";
        this.PoNo = "";
        this.IsCash = false;
        this.Remarks = "";
        this.Total = 0;
        this.DiscountPrcnt = 0;
        this.DiscountAmount = 0;
        this.VatAmount = 0;
        this.NetDue = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.NetAdditionCost = 0;
        this.NetAdditionVat = 0;
        this.CashBoxID = 0;
        this.CashPaidAmount = 0;
        this.RemainAmount = 0;
        this.PurOrderID = 0;
        this.CurrencyID = 0;
        this.CurrencyRate = 0;
        this.TotalFC = 0;
    }
    public ReceiveID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrType: number;
    public PurRecType: number;
    public StoreID: number;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public SalesmanId: number;
    public VendorID: number;
    public VendorInvNo: string;
    public VATType: number;
    public PoDate: string;
    public PoNo: string;
    public IsCash: boolean;
    public Remarks: string;
    public Total: number;
    public DiscountPrcnt: number;
    public DiscountAmount: number;
    public VatAmount: number;
    public NetDue: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public NetAdditionCost: number;
    public NetAdditionVat: number;
    public CashBoxID: number;
    public CashPaidAmount: number;
    public RemainAmount: number;
    public PurOrderID: number;
    public CurrencyID: number;
    public CurrencyRate: number;
    public TotalFC: number;
}


class I_Pur_Tr_PurchaseOrder extends SecurityClass {
    constructor() {
        super();
        this.PurOrderID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.TrDateH = "";
        this.Status = 0;
        this.SalesmanId = 0;
        this.VendorID = 0;
        this.VATType = 0;
        this.IsCash = false;
        this.Remarks = "";
        this.Total = 0;
        this.DiscountPrcnt = 0;
        this.DiscountAmount = 0;
        this.VatAmount = 0;
        this.NetDue = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.CurrencyID = 0;
        this.IsReceived = false;
        this.DliveryConditions = "";
        this.ShipmentConditions = "";
        this.ValidityPeriod = "";
    }
    public PurOrderID: number;
    public TrNo: number;
    public RefNO: string;
    public TrDate: string;
    public TrDateH: string;
    public Status: number;
    public SalesmanId: number;
    public VendorID: number;
    public VATType: number;
    public IsCash: boolean;
    public Remarks: string;
    public Total: number;
    public DiscountPrcnt: number;
    public DiscountAmount: number;
    public VatAmount: number;
    public NetDue: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public CurrencyID: number;
    public IsReceived: boolean;
    public DliveryConditions: string;
    public ShipmentConditions: string;
    public ValidityPeriod: string;
}

class I_Pur_Tr_PurchaseOrderDetail extends SecurityClass {
    constructor() {
        super();
        this.PurOrderDetailsID = 0;
        this.PurOrderID = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.UnitID = 0;
        this.POStockQty = 0;
        this.POQty = 0;
        this.UnitPrice = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetUnitCost = 0;
        this.BonusQty = 0;
        this.StockAvailableQty = 0;
        this.StockUnitCost = 0;
        this.TotRecQty = 0;
        this.StatusFlag = "";
    }
    public PurOrderDetailsID: number;
    public PurOrderID: number;
    public Serial: number;
    public ItemID: number;
    public UnitID: number;
    public POStockQty: number;
    public POQty: number;
    public UnitPrice: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetUnitCost: number;
    public BonusQty: number;
    public StockAvailableQty: number;
    public StockUnitCost: number;
    public TotRecQty: number;
    public StatusFlag: string;
}



class I_Pur_TR_ReceiveItems extends SecurityClass {
    constructor() {
        super();
        this.ReciveDetailsID = 0;
        this.ReceiveID = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.UnitID = null;
        this.RecStockQty = 0;
        this.ReceiveRecQty = 0;
        this.RecQty = 0;
        this.RecUnitPrice = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetUnitCost = 0;
        this.BonusQty = 0;
        this.ExpireDate = "";
        this.BatchCode = "";
        this.BarCode = "";
        this.StockAvailableQty = 0;
        this.StockUnitCost = 0;
        this.NewUnitCost = 0;
        this.TotRetQty = 0;
        this.UnitAddCost = 0;
        this.RecUnitPriceFC = 0;
        this.StatusFlag = "";
    }
    public ReciveDetailsID: number;
    public ReceiveID: number;
    public Serial: number;
    public ItemID: number;
    public UnitID: number;
    public RecStockQty: number;
    public ReceiveRecQty: number;
    public RecQty: number;
    public RecUnitPrice: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetUnitCost: number;
    public BonusQty: number;
    public ExpireDate: string;
    public BatchCode: string;
    public BarCode: string;
    public StockAvailableQty: number;
    public StockUnitCost: number;
    public NewUnitCost: number;
    public TotRetQty: number;
    public UnitAddCost: number;
    public RecUnitPriceFC: number;
    public StatusFlag: string;
}
class I_Pur_Tr_ReceiveCharges extends SecurityClass {
    constructor() {
        super();
        this.ReceiveExpensesID = 0;
        this.ReceiveID = 0;
        this.Serial = 0;
        this.ChargeID = 0;
        this.Amount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.VatPrc = 0;
        this.NetAtferVat = 0;
        this.isPaidByVendor = false;
        this.RefInvoiceNo = "";
        this.RefInvoiceDate = "";
        this.VendorID = 0;
        this.StatusFlag = "";
        this.CashBoxID = 0;
    }
    public ReceiveExpensesID: number;
    public ReceiveID: number;
    public Serial: number;
    public ChargeID: number;
    public Amount: number;
    public VatAmount: number;
    public VatType: number;
    public VatPrc: number;
    public NetAtferVat: number;
    public isPaidByVendor: boolean;
    public RefInvoiceNo: string;
    public RefInvoiceDate: string;
    public VendorID: number;
    public StatusFlag: string;
    public CashBoxID: number;
}


class A_Voucher_Types extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VoucherType = 0;
        this.TYPE_CODE = 0;
        this.TYPE_DESCA = "";
        this.TYPE_DESCE = "";
        this.Remarks = "";
    }
    public COMP_CODE: number;
    public VoucherType: number;
    public TYPE_CODE: number;
    public TYPE_DESCA: string;
    public TYPE_DESCE: string;
    public Remarks: string;
}


class G_COST_CENTER extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.CC_CODE = "";
        this.CC_DESCA = "";
        this.CC_PARENT = "";
        this.CC_LEVEL = 0;
        this.CC_LOCATION = "";
        this.CC_TARGET = 0;
        this.ACTIVE = false;
        this.PAYROLL_UPDATE = false;
        this.LEAF = false;
        this.CC_DESCE = "";
        this.StatusFlag = "";
    }
    public COMP_CODE: number;
    public CC_CODE: string;
    public CC_DESCA: string;
    public CC_PARENT: string;
    public CC_LEVEL: number;
    public CC_LOCATION: string;
    public CC_TARGET: number;
    public ACTIVE: boolean;
    public PAYROLL_UPDATE: boolean;
    public LEAF: boolean;
    public CC_DESCE: string;
    public StatusFlag: string;
}

class JournalMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.A_JOURNAL_HEADER = new A_JOURNAL_HEADER();
        this.A_JOURNAL_DETAIL = new Array<A_JOURNAL_DETAIL>();
    }
    public A_JOURNAL_HEADER: A_JOURNAL_HEADER;
    public A_JOURNAL_DETAIL: Array<A_JOURNAL_DETAIL>;
}

class AQ_GetJournalHeaderWithDetail extends SecurityClass {
    constructor() {
        super();
        this.AQ_GetJournalHeader = new Array<AQ_GetJournalHeader>();
        this.AQ_GetJournalDetail = new Array<AQ_GetJournalDetail>();
    }
    public AQ_GetJournalHeader: Array<AQ_GetJournalHeader>;
    public AQ_GetJournalDetail: Array<AQ_GetJournalDetail>;
}
class A_JOURNAL_DETAIL extends SecurityClass {
    constructor() {
        super();
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_SERIAL = 0;
        this.ACC_CODE = "";
        this.CC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.DESCL = "";
        this.DESCA = "";
        this.CCDT_CODE = "";
        this.INVOICE_NO = 0;
        this.BOOK_TR_NO = 0;
        this.SRC_SYSTEM_CODE = "";
        this.SRC_SUB_SYSTEM_CODE = "";
        this.SRC_BRA_CODE = 0;
        this.SRC_TR_CODE = "";
        this.SRC_TR_NO = 0;
        this.SRC_TR_TYPE = "";
        this.DEBIT_FC = 0;
        this.CREDIT_FC = 0;
        this.StatusFlag = "";
    }
    public VoucherDetailID: number;
    public VoucherID: number;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_SERIAL: number;
    public ACC_CODE: string;
    public CC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public DESCL: string;
    public DESCA: string;
    public CCDT_CODE: string;
    public INVOICE_NO: number;
    public BOOK_TR_NO: number;
    public SRC_SYSTEM_CODE: string;
    public SRC_SUB_SYSTEM_CODE: string;
    public SRC_BRA_CODE: number;
    public SRC_TR_CODE: string;
    public SRC_TR_NO: number;
    public SRC_TR_TYPE: string;
    public DEBIT_FC: number;
    public CREDIT_FC: number;
    public StatusFlag: string;
}

class A_JOURNAL_HEADER extends SecurityClass {
    constructor() {
        super();
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = "";
        this.VOUCHER_DESC = "";
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.POSTED_BY = "";
        this.POSTED_AT = "";
        this.BOOK_TR_NO = 0;
        this.SOURCE_TYPE = "";
        this.TotalDebit = 0;
        this.TotalCredit = 0;
        this.VOUCHER_DATEH = "";
        this.AUTHORISED_BY = "";
        this.AUTHORISED_AT = "";
    }
    public VoucherID: number;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_DATE: string;
    public VOUCHER_DESC: string;
    public VOUCHER_STATUS: number;
    public TYPE_CODE: number;
    public REF_CODE: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public POSTED_BY: string;
    public POSTED_AT: string;
    public BOOK_TR_NO: number;
    public SOURCE_TYPE: string;
    public TotalDebit: number;
    public TotalCredit: number;
    public VOUCHER_DATEH: string;
    public AUTHORISED_BY: string;
    public AUTHORISED_AT: string;
}

class AQ_GetJournalDetail extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_SERIAL = 0;
        this.ACC_CODE = "";
        this.CC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.DESCL = "";
        this.DESCA = "";
        this.CCDT_CODE = "";
        this.INVOICE_NO = 0;
        this.BOOK_TR_NO = 0;
        this.SRC_SYSTEM_CODE = "";
        this.SRC_SUB_SYSTEM_CODE = "";
        this.SRC_BRA_CODE = 0;
        this.SRC_TR_CODE = "";
        this.SRC_TR_NO = 0;
        this.SRC_TR_TYPE = "";
        this.DEBIT_FC = 0;
        this.CREDIT_FC = 0;
        this.CC_DESCA = "";
        this.CC_DESCE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.CCDT_TYPE = "";
        this.CCDT_DESCA = "";
        this.CCDT_DESCE = "";
        this.StatusFlag = "";
    }
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_SERIAL: number;
    public ACC_CODE: string;
    public CC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public DESCL: string;
    public DESCA: string;
    public CCDT_CODE: string;
    public INVOICE_NO: number;
    public BOOK_TR_NO: number;
    public SRC_SYSTEM_CODE: string;
    public SRC_SUB_SYSTEM_CODE: string;
    public SRC_BRA_CODE: number;
    public SRC_TR_CODE: string;
    public SRC_TR_NO: number;
    public SRC_TR_TYPE: string;
    public DEBIT_FC: number;
    public CREDIT_FC: number;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public VoucherDetailID: number;
    public VoucherID: number;
    public CCDT_TYPE: string;
    public CCDT_DESCA: string;
    public CCDT_DESCE: string;
    public StatusFlag: string;
}


class AQ_GetJournalHeader extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = "";
        this.VOUCHER_DESC = "";
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.POSTED_BY = "";
        this.POSTED_AT = "";
        this.SOURCE_TYPE = "";
        this.VOUCHER_DATEH = "";
        this.AUTHORISED_BY = "";
        this.AUTHORISED_AT = "";
        this.TYPE_DESCA = "";
        this.TYPE_DESCE = "";
        this.St_DescE = "";
        this.St_DescA = "";
        this.Src_DescE = "";
        this.Src_DescA = "";
        this.VoucherID = 0;
        this.TotalDebit = 0;
        this.TotalCredit = 0;
    }
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_DATE: string;
    public VOUCHER_DESC: string;
    public VOUCHER_STATUS: number;
    public TYPE_CODE: number;
    public REF_CODE: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public POSTED_BY: string;
    public POSTED_AT: string;
    public SOURCE_TYPE: string;
    public VOUCHER_DATEH: string;
    public AUTHORISED_BY: string;
    public AUTHORISED_AT: string;
    public TYPE_DESCA: string;
    public TYPE_DESCE: string;
    public St_DescE: string;
    public St_DescA: string;
    public Src_DescE: string;
    public Src_DescA: string;
    public VoucherID: number;
    public TotalDebit: number;
    public TotalCredit: number;
}
class A_TR_VchrTemplate extends SecurityClass {
    constructor() {
        super();
        this.TemplateID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_TYPE = 0;
        this.TEMPLATE_DESC = "";
        this.VOUCHER_DESC = "";
        this.TYPE_CODE = 0;
        this.ACC_CODE = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.IsSaveValue = false;
    }
    public TemplateID: number;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_TYPE: number;
    public TEMPLATE_DESC: string;
    public VOUCHER_DESC: string;
    public TYPE_CODE: number;
    public ACC_CODE: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public IsSaveValue: boolean;
}

class A_TR_VchrTemplateDetail extends SecurityClass {
    constructor() {
        super();
        this.VoucherDetailID = 0;
        this.TemplateID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_SERIAL = 0;
        this.ACC_CODE = "";
        this.CC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.DESCL = "";
        this.DESCA = "";
        this.DEBIT_FC = 0;
        this.CREDIT_FC = 0;
        this.CCDT_CODE = "";
        this.StatusFlag = "";
    }
    public VoucherDetailID: number;
    public TemplateID: number;
    public COMP_CODE: number;
    public VOUCHER_TYPE: number;
    public VOUCHER_SERIAL: number;
    public ACC_CODE: string;
    public CC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public DESCL: string;
    public DESCA: string;
    public DEBIT_FC: number;
    public CREDIT_FC: number;
    public CCDT_CODE: string;
    public StatusFlag: string;
}


class VchrTemplatMasterDetail extends SecurityClass {
    constructor() {
        super();
        this.A_TR_VchrTemplate = new A_TR_VchrTemplate();
        this.A_TR_VchrTemplateDetail = new Array<A_TR_VchrTemplateDetail>();
    }
    public A_TR_VchrTemplate: A_TR_VchrTemplate;
    public A_TR_VchrTemplateDetail: Array<A_TR_VchrTemplateDetail>;
}
class G_RoleUsers extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.RoleId = 0;
        this.ISActive = false;
        this.StatusFlag = "";


    }
    public USER_CODE: string;
    public StatusFlag: string;
    public RoleId: number;
    public ISActive: boolean;
}
class G_USERS extends SecurityClass {
    constructor() {
        super();
        this.LoginUrl = false;
        this.Email = "";
        this.FirstLogin = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CashBoxID = 0;
        this.UserId = 0;
        this.SalesManID = 0;
        this.USER_CODE = "";
        this.USER_PASSWORD = "";
        this.USER_ACTIVE = false;
        this.USER_NAME = "";
        this.CompCode = 0;
        this.GRP_CODE = "";
        this.REGION_CODE = "";
        this.USER_PASSWORD2 = "";
        this.CHANGE_PASS_DATE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Mobile = "";
        this.DepartmentName = "";
        this.JobTitle = "";
        this.USER_TYPE = 0;
        this.ManagedBy = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.Tokenid = "";
        this.LastLogin = "";
        this.Flag_Mastr = "";
        this.StoreID = 0;
        this.FirstName = "";
    }
    public LoginUrl: boolean;
    public Email: string;
    public FirstLogin: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public UserId: number;
    public CashBoxID: number;
    public SalesManID: number;
    public USER_CODE: string;
    public USER_PASSWORD: string;
    public USER_ACTIVE: boolean;
    public USER_NAME: string;
    public CompCode: number;
    public GRP_CODE: string;
    public REGION_CODE: string;
    public USER_PASSWORD2: string;
    public CHANGE_PASS_DATE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Mobile: string;
    public DepartmentName: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public ManagedBy: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public LastLogin: string;
    public Tokenid: string;
    public Flag_Mastr: string;
    public StoreID: number;
    public FirstName: "";
}

class GQ_GetUsers extends SecurityClass {
    constructor() {
        super();
        this.LoginUrl = false;
        this.USER_CODE = "";
        this.USER_PASSWORD = "";
        this.USER_ACTIVE = false;
        this.USER_NAME = "";
        this.CompCode = 0;
        this.UserId = 0;
        this.CashBoxID = 0;
        this.SalesManID = 0;
        this.REGION_CODE = "";
        this.GRP_CODE = "";
        this.USER_PASSWORD2 = "";
        this.CHANGE_PASS_DATE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.DepartmentName = "";
        this.JobTitle = "";
        this.USER_TYPE = 0;
        this.ManagedBy = "";
        this.Tokenid = "";
        this.LastLogin = "";
        this.FirstLogin = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.Type_DescA = "";
        this.Type_DescE = "";
        this.CodeType = "";
        this.IsActiveDesc = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.Flag_Mastr = "";
        this.StoreID = 0;
        this.FirstName = "";

    }
    public LoginUrl: boolean;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public USER_CODE: string;
    public USER_PASSWORD: string;
    public USER_ACTIVE: boolean;
    public USER_NAME: string;
    public CompCode: number;
    public UserId: number;
    public CashBoxID: number;
    public SalesManID: number;
    public REGION_CODE: string;
    public GRP_CODE: string;
    public USER_PASSWORD2: string;
    public CHANGE_PASS_DATE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public DepartmentName: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public ManagedBy: string;
    public Tokenid: string;
    public LastLogin: string;
    public FirstLogin: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public Type_DescA: string;
    public Type_DescE: string;
    public CodeType: string;
    public IsActiveDesc: string;
    public Flag_Mastr: string;
    public StoreID: number;
    public FirstName: string;
}
class GQ_GetUserRole extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.ISActive = false;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.RoleId = 0;
        this.IsActiveDesc = "";
        this.IsAvailable = false;
        this.IsShowable = false;
    }
    public USER_CODE: string;
    public ISActive: boolean;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public RoleId: number;
    public IsActiveDesc: string;
    public IsAvailable: boolean;
    public IsShowable: boolean;
}
class G_Role extends SecurityClass {
    constructor() {
        super();
        this.RoleId = 0;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.IsAvailable = false;
        this.IsShowable = false;
    }
    public RoleId: number;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public IsAvailable: boolean;
    public IsShowable: boolean;
}
class G_CONTROL extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.FIN_YEAR = 0;
        this.ACC_STATUS = 0;
        this.INV_STATUS = 0;
        this.FirstDate = "";
        this.LastDate = "";
        this.ProfitAcc_Code = "";
        this.OpenAccVoucheNo = 0;
        this.OpenInvAdjNo = 0;
    }
    public COMP_CODE: number;
    public FIN_YEAR: number;
    public ACC_STATUS: number;
    public INV_STATUS: number;
    public FirstDate: string;
    public LastDate: string;
    public ProfitAcc_Code: string;
    public OpenAccVoucheNo: number;
    public OpenInvAdjNo: number;
}
class G_LnkTrans extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.TR_DESCA = "";
        this.TR_DESCE = "";
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_SOURCE_TYPE = 0;
        this.TABLE_NAME = "";
        this.TABLE_CONDITION = "";
        this.FN_COMP_CODE = "";
        this.FN_BRA_CODE = "";
        this.FN_TR_ID = "";
        this.FN_TR_NO = "";
        this.FN_TR_TYPE = "";
        this.FN_TR_DATE = "";
        this.FN_USER = "";
        this.FN_TR_AMOUNT = "";
        this.FN_TR_DESCA = "";
        this.FN_TR_DESCE = "";
        this.FN_VOUCHER_CODE = "";
        this.INTEGRATE = false;
        this.BASE_TABLE_NAME = "";
        this.FN_POSTED = "";
        this.Selected = false;
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public TR_DESCA: string;
    public TR_DESCE: string;
    public VOUCHER_TYPE: number;
    public VOUCHER_SOURCE_TYPE: number;
    public TABLE_NAME: string;
    public TABLE_CONDITION: string;
    public FN_COMP_CODE: string;
    public FN_BRA_CODE: string;
    public FN_TR_ID: string;
    public FN_TR_NO: string;
    public FN_TR_TYPE: string;
    public FN_TR_DATE: string;
    public FN_USER: string;
    public FN_TR_AMOUNT: string;
    public FN_TR_DESCA: string;
    public FN_TR_DESCE: string;
    public FN_VOUCHER_CODE: string;
    public INTEGRATE: boolean;
    public BASE_TABLE_NAME: string;
    public FN_POSTED: string;
    public Selected: boolean;
} class G_LnkTransVariable extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.VarType = "";
        this.VarCode = "";
        this.Var_DESCA = "";
        this.Var_DESCE = "";
        this.FN_VarExpression = "";
        this.DataSource = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public VarType: string;
    public VarCode: string;
    public Var_DESCA: string;
    public Var_DESCE: string;
    public FN_VarExpression: string;
    public DataSource: string;
}
class GQ_GetLnkTransVoucher extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.SERIAL = 0;
        this.VarCode = "";
        this.ISDebit = false;
        this.AccType = 0;
        this.AccFixedCode = "";
        this.AccVarCode = "";
        this.AccBraCode = "";
        this.CCType = 0;
        this.CCFixedCode = "";
        this.CCVarCode = "";
        this.CCBraCode = "";
        this.IsCollective = false;
        this.Val_DesE = "";
        this.Val_DescE = "";
        this.VarAcc_DescA = "";
        this.VarAcc_DescE = "";
        this.VarCC_DescA = "";
        this.VarCC_DescE = "";
        this.FixAcc_DescA = "";
        this.FixAcc_DescE = "";
        this.Fixcc_DescA = "";
        this.FixCC_DescE = "";
        this.BrAcc_DescA = "";
        this.BrAcc_DescE = "";
        this.BrCC_DescA = "";
        this.BrCC_DescE = "";
        this.LineRemarkA = "";
        this.LineRemarkE = "";
    }
    public COMP_CODE: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public SERIAL: number;
    public VarCode: string;
    public ISDebit: boolean;
    public AccType: number;
    public AccFixedCode: string;
    public AccVarCode: string;
    public AccBraCode: string;
    public CCType: number;
    public CCFixedCode: string;
    public CCVarCode: string;
    public CCBraCode: string;
    public IsCollective: boolean;
    public Val_DesE: string;
    public Val_DescE: string;
    public VarAcc_DescA: string;
    public VarAcc_DescE: string;
    public VarCC_DescA: string;
    public VarCC_DescE: string;
    public FixAcc_DescA: string;
    public FixAcc_DescE: string;
    public Fixcc_DescA: string;
    public FixCC_DescE: string;
    public BrAcc_DescA: string;
    public BrAcc_DescE: string;
    public BrCC_DescA: string;
    public BrCC_DescE: string;
    public LineRemarkA: string;
    public LineRemarkE: string;
}

class G_LnkTrans_Temp extends SecurityClass {
    constructor() {
        super();
        this.ROW_ID = "";
        this.User_Code = "";
        this.TR_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.VOUCHER_CODE = 0;
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_SOURCE_TYPE = "";
        this.TR_NO = 0;
        this.TR_TYPE = "";
        this.TR_DATE = "";
        this.TR_AMOUNT = 0;
        this.TR_DESCA = "";
        this.TR_DESCE = "";
        this.TR_USER_CODE = "";
        this.VOUCHER_DESCA = "";
        this.VOUCHER_DESCE = "";
        this.IsSelected = false;
        this.ROW_DATE = "";
        this.FromDate = "";
        this.ToDate = "";
        this.FromTrNo = 0;
        this.ToTrNo = 0;
        this.IsGenerated = false;
        this.GenRemarks = "";
        this.IsGeneratedDesc = "";
    }
    public ROW_ID: string;
    public User_Code: string;
    public TR_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public VOUCHER_CODE: number;
    public VOUCHER_TYPE: number;
    public VOUCHER_SOURCE_TYPE: string;
    public TR_NO: number;
    public TR_TYPE: string;
    public TR_DATE: string;
    public TR_AMOUNT: number;
    public TR_DESCA: string;
    public TR_DESCE: string;
    public TR_USER_CODE: string;
    public VOUCHER_DESCA: string;
    public VOUCHER_DESCE: string;
    public IsSelected: boolean;
    public ROW_DATE: string;
    public FromDate: string;
    public ToDate: string;
    public FromTrNo: number;
    public ToTrNo: number;
    public IsGenerated: boolean;
    public GenRemarks: string;
    public IsGeneratedDesc: string;
}

class GQ_GetLnkVoucherDetail extends SecurityClass {
    constructor() {
        super();
        this.Seq = 0;
        this.User_Code = "";
        this.SERIAL = 0;
        this.COMP_CODE = 0;
        this.BRANCH_CODE = 0;
        this.ACC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.CC_CODE = "";
        this.LINE_DESCA = "";
        this.LINE_DESCE = "";
        this.Tr_Code = "";
        this.Tr_No = 0;
        this.ROW_ID = 0;
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.CC_DESCA = "";
        this.CC_DESCE = "";
    }
    public Seq: number;
    public User_Code: string;
    public SERIAL: number;
    public COMP_CODE: number;
    public BRANCH_CODE: number;
    public ACC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public CC_CODE: string;
    public LINE_DESCA: string;
    public LINE_DESCE: string;
    public Tr_Code: string;
    public Tr_No: number;
    public ROW_ID: number;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public CC_DESCA: string;
    public CC_DESCE: string;
}
class IQ_GetTransfer extends SecurityClass {
    constructor() {
        super();
        this.TransfareID = 0;
        this.Tr_No = 0;
        this.RefNO = "";
        this.TrType = 0;
        this.TFType = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.SenderBranchCode = 0;
        this.ReceiverBranchCode = 0;
        this.SenderStoreID = 0;
        this.ReceiverStoreID = 0;
        this.RequestTransferID = 0;
        this.Remark = "";
        this.SendTransferID = 0;
        this.RequestedBy = "";
        this.SendBy = "";
        this.ReceivedBy = "";
        this.VerfiedBy = "";
        this.Total = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.IsSent = false;
        this.IsReceived = false;
        this.IsRequested = false;
        this.SBr_DescA = "";
        this.SBr_DescE = "";
        this.SSt_DescA = "";
        this.SSt_DescE = "";
        this.SSt_Store_Code = 0;
        this.RBr_DescA = "";
        this.RBr_DescE = "";
        this.RSt_DescA = "";
        this.RSt_StoreCode = 0;
        this.RSt_DescE = "";
        this.IsSent_Desc = "";
        this.IsReceived_Desc = "";
        this.TrType_Desc = "";
    }
    public TransfareID: number;
    public Tr_No: number;
    public RefNO: string;
    public TrType: number;
    public TFType: number;
    public TrDate: string;
    public TrDateH: string;
    public SenderBranchCode: number;
    public ReceiverBranchCode: number;
    public SenderStoreID: number;
    public ReceiverStoreID: number;
    public RequestTransferID: number;
    public Remark: string;
    public SendTransferID: number;
    public RequestedBy: string;
    public SendBy: string;
    public ReceivedBy: string;
    public VerfiedBy: string;
    public Total: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public CompCode: number;
    public BranchCode: number;
    public IsSent: boolean;
    public IsReceived: boolean;
    public IsRequested: boolean;
    public SBr_DescA: string;
    public SBr_DescE: string;
    public SSt_DescA: string;
    public SSt_DescE: string;
    public SSt_Store_Code: number;
    public RBr_DescA: string;
    public RBr_DescE: string;
    public RSt_DescA: string;
    public RSt_StoreCode: number;
    public RSt_DescE: string;
    public IsSent_Desc: string;
    public IsReceived_Desc: string;
    public TrType_Desc: string;
}

class IQ_GetTransferDetail extends SecurityClass {
    constructor() {
        super();
        this.TransfareDetailID = 0;
        this.TransfareID = 0;
        this.Serial = 0;
        this.BarCode = "";
        this.ItemID = 0;
        this.SourceItemStoreBatchid = 0;
        this.DestItemStoreBatchid = 0;
        this.UnitCost = 0;
        this.UnitID = 0;
        this.ReqQty = 0;
        this.SendQty = 0;
        this.RecQty = 0;
        this.StockReqQty = 0;
        this.StockSendQty = 0;
        this.StockRecQty = 0;
        this.ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.FamilyCode = "";
        this.ITFamly_DescA = "";
        this.ITFamly_DescE = "";
        this.SrcOhnandQty = 0;
        this.RecOnhandQty = 0;
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.UomCode = "";
    }
    public TransfareDetailID: number;
    public TransfareID: number;
    public Serial: number;
    public BarCode: string;
    public ItemID: number;
    public SourceItemStoreBatchid: number;
    public DestItemStoreBatchid: number;
    public UnitCost: number;
    public UnitID: number;
    public ReqQty: number;
    public SendQty: number;
    public RecQty: number;
    public StockReqQty: number;
    public StockSendQty: number;
    public StockRecQty: number;
    public ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public FamilyCode: string;
    public ITFamly_DescA: string;
    public ITFamly_DescE: string;

    public SrcOhnandQty: number;
    public RecOnhandQty: number;
    public uom_DescA: string;
    public uom_DescE: string;
    public UomCode: string;
}

class I_Stk_TR_Transfer extends SecurityClass {
    constructor() {
        super();
        this.TransfareID = 0;
        this.Tr_No = 0;
        this.RefNO = "";
        this.TrType = 0;
        this.TFType = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.SenderBranchCode = 0;
        this.ReceiverBranchCode = 0;
        this.SenderStoreID = 0;
        this.ReceiverStoreID = 0;
        this.RequestTransferID = 0;
        this.SendTransferID = 0;
        this.Remark = "";
        this.RequestedBy = "";
        this.SendBy = "";
        this.ReceivedBy = "";
        this.VerfiedBy = "";
        this.Total = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.IsSent = false;
        this.IsReceived = false;
        this.IsRequested = false;
    }
    public TransfareID: number;
    public Tr_No: number;
    public RefNO: string;
    public TrType: number;
    public TFType: number;
    public TrDate: string;
    public TrDateH: string;
    public SenderBranchCode: number;
    public ReceiverBranchCode: number;
    public SenderStoreID: number;
    public ReceiverStoreID: number;
    public RequestTransferID: number;
    public SendTransferID: number;
    public Remark: string;
    public RequestedBy: string;
    public SendBy: string;
    public ReceivedBy: string;
    public VerfiedBy: string;
    public Total: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public IsSent: boolean;
    public IsReceived: boolean;
    public IsRequested: boolean;
}

class I_Stk_TR_TransferDetails extends SecurityClass {
    constructor() {
        super();
        this.TransfareDetailID = 0;
        this.TransfareID = 0;
        this.Serial = 0;
        this.BarCode = "";
        this.ItemID = 0;
        this.SourceItemStoreBatchid = 0;
        this.DestItemStoreBatchid = 0;
        this.UnitCost = 0;
        this.UnitID = 0;
        this.ReqQty = 0;
        this.SendQty = 0;
        this.RecQty = 0;
        this.StockReqQty = 0;
        this.StockSendQty = 0;
        this.StockRecQty = 0;
        this.StatusFlag = "";
        this.SrcOhnandQty = 0;
        this.RecOnhandQty = 0;
    }
    public TransfareDetailID: number;
    public TransfareID: number;
    public Serial: number;
    public BarCode: string;
    public ItemID: number;
    public SourceItemStoreBatchid: number;
    public DestItemStoreBatchid: number;
    public UnitCost: number;
    public UnitID: number;
    public ReqQty: number;
    public SendQty: number;
    public RecQty: number;
    public StockReqQty: number;
    public StockSendQty: number;
    public StockRecQty: number;
    public StatusFlag: string;
    public SrcOhnandQty: number;
    public RecOnhandQty: number;
}

class DirectTransferMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.I_Stk_TR_Transfer = new I_Stk_TR_Transfer();
        this.I_Stk_TR_TransferDetails = new Array<I_Stk_TR_TransferDetails>();
    }
    public I_Stk_TR_Transfer: I_Stk_TR_Transfer;
    public I_Stk_TR_TransferDetails: Array<I_Stk_TR_TransferDetails>;
}

class IQ_DirectTransferWithDetail extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetTransfer = new Array<IQ_GetTransfer>();
        this.IQ_GetTransferDetail = new Array<IQ_GetTransferDetail>();
    }
    public IQ_GetTransfer: Array<IQ_GetTransfer>;
    public IQ_GetTransferDetail: Array<IQ_GetTransferDetail>;
}
class I_Stk_TR_Adjust extends SecurityClass {
    constructor() {
        super();
        this.AdjustID = 0;
        this.Tr_No = 0;
        this.RefNO = "";
        this.TrType = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.StoreID = 0;
        this.Remark = "";
        this.CountedBy = "";
        this.VerfiedBy = "";
        this.TotalCost = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.Status = 0;
    }
    public AdjustID: number;
    public Tr_No: number;
    public RefNO: string;
    public TrType: number;
    public TrDate: string;
    public TrDateH: string;
    public StoreID: number;
    public Remark: string;
    public CountedBy: string;
    public VerfiedBy: string;
    public TotalCost: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public Status: number;
}

class I_Stk_Tr_AdjustDetails extends SecurityClass {
    constructor() {
        super();
        this.AdjustDetailID = 0;
        this.AdjustID = 0;
        this.Serial = 0;
        this.BarCode = "";
        this.ItemID = 0;
        this.ItemStoreBatchid = 0;
        this.UnitID = 0;
        this.CountQty = 0;
        this.OnhandQty = 0;
        this.UnitCost = 0;
        this.NewUnitCost = 0;
        this.StkUnitCost = 0;
        this.NewStkUnitCost = 0;
        this.StockCountedQty = 0;
        this.StockOnhandQty = 0;
        this.DiffQty = 0;
        this.StockDiffQty = 0;
        this.StatusFlag = "";
    }
    public AdjustDetailID: number;
    public AdjustID: number;
    public Serial: number;
    public BarCode: string;
    public ItemID: number;
    public ItemStoreBatchid: number;
    public UnitID: number;
    public CountQty: number;
    public OnhandQty: number;
    public UnitCost: number;
    public NewUnitCost: number;
    public StkUnitCost: number;
    public NewStkUnitCost: number;
    public StockCountedQty: number;
    public StockOnhandQty: number;
    public DiffQty: number;
    public StockDiffQty: number;
    public StatusFlag: string;
}

class IQ_GetStkAdjust extends SecurityClass {
    constructor() {
        super();
        this.AdjustID = 0;
        this.Tr_No = 0;
        this.RefNO = "";
        this.TrType = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.Remark = "";
        this.StoreID = 0;
        this.CountedBy = "";
        this.TotalCost = 0;
        this.VerfiedBy = "";
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.UpdatedAt = "";
        this.CreatedBy = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.St_DEscA = "";
        this.ST_DescE = "";
        this.Type_DescA = "";
        this.type_DescE = "";
        this.Status = 0;
        this.Status_Desc = "";
    }
    public AdjustID: number;
    public Tr_No: number;
    public RefNO: string;
    public TrType: number;
    public TrDate: string;
    public TrDateH: string;
    public Remark: string;
    public StoreID: number;
    public CountedBy: string;
    public TotalCost: number;
    public VerfiedBy: string;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public UpdatedAt: string;
    public CreatedBy: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public St_DEscA: string;
    public ST_DescE: string;
    public Type_DescA: string;
    public type_DescE: string;
    public Status: number;
    public Status_Desc: string;
}

class IQ_GetStkAdjustDetail extends SecurityClass {
    constructor() {
        super();
        this.AdjustDetailID = 0;
        this.AdjustID = 0;
        this.Serial = 0;
        this.BarCode = "";
        this.ItemID = 0;
        this.ItemStoreBatchid = 0;
        this.UnitID = 0;
        this.CountQty = 0;
        this.OnhandQty = 0;
        this.UnitCost = 0;
        this.NewUnitCost = 0;
        this.StkUnitCost = 0;
        this.NewStkUnitCost = 0;
        this.StockCountedQty = 0;
        this.StockOnhandQty = 0;
        this.DiffQty = 0;
        this.StockDiffQty = 0;
        this.ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescE = "";
        this.CompCode = 0;
        this.Uom_DescA = "";
        this.UOM_DescE = "";
        this.UomCode = "";
    }
    public AdjustDetailID: number;
    public AdjustID: number;
    public Serial: number;
    public BarCode: string;
    public ItemID: number;
    public ItemStoreBatchid: number;
    public UnitID: number;
    public CountQty: number;
    public OnhandQty: number;
    public UnitCost: number;
    public NewUnitCost: number;
    public StkUnitCost: number;
    public NewStkUnitCost: number;
    public StockCountedQty: number;
    public StockOnhandQty: number;
    public DiffQty: number;
    public StockDiffQty: number;
    public ItemCode: string;
    public itm_DescA: string;
    public itm_DescE: string;
    public CompCode: number;
    public Uom_DescA: string;
    public UOM_DescE: string;
    public UomCode: string;
}

class StockAdjustMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.I_Stk_TR_Adjust = new I_Stk_TR_Adjust();
        this.I_Stk_Tr_AdjustDetails = new Array<I_Stk_Tr_AdjustDetails>();
    }
    public I_Stk_TR_Adjust: I_Stk_TR_Adjust;
    public I_Stk_Tr_AdjustDetails: Array<I_Stk_Tr_AdjustDetails>;
}

class IQ_GetStkAdjustWithDetail extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetStkAdjust = new Array<IQ_GetStkAdjust>();
        this.IQ_GetStkAdjustDetail = new Array<IQ_GetStkAdjustDetail>();
    }
    public IQ_GetStkAdjust: Array<IQ_GetStkAdjust>;
    public IQ_GetStkAdjustDetail: Array<IQ_GetStkAdjustDetail>;
}

class IQ_PurchaseOrderWithDetail extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetPurchaseOrder = new Array<IQ_GetPurchaseOrder>();
        this.IQ_GetPurchaseOrderDetail = new Array<IQ_GetPurchaseOrderDetail>();
    }
    public IQ_GetPurchaseOrder: Array<IQ_GetPurchaseOrder>;
    public IQ_GetPurchaseOrderDetail: Array<IQ_GetPurchaseOrderDetail>;
}

class PurchaseOrderMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.I_Pur_Tr_PurchaseOrder = new I_Pur_Tr_PurchaseOrder();
        this.I_Pur_Tr_PurchaseOrderDetail = new Array<I_Pur_Tr_PurchaseOrderDetail>();
    }
    public I_Pur_Tr_PurchaseOrder: I_Pur_Tr_PurchaseOrder;
    public I_Pur_Tr_PurchaseOrderDetail: Array<I_Pur_Tr_PurchaseOrderDetail>;
}
class I_TR_OperationTF extends SecurityClass {
    constructor() {
        super();
        this.OperationTFID = 0;
        this.Tr_No = 0;
        this.TrType = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.TrDateH = "";
        this.OperationID = 0;
        this.FromSalesmanID = 0;
        this.ToSalesmanID = 0;
        this.Remark = "";
        this.RequestedBy = "";
        this.SendBy = "";
        this.ReceivedBy = "";
        this.VerfiedBy = "";
        this.Total = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.IsSent = false;
        this.IsReceived = false;
        this.IsRequested = false;
    }
    public OperationTFID: number;
    public Tr_No: number;
    public TrType: number;
    public RefNO: string;
    public TrDate: string;
    public TrDateH: string;
    public OperationID: number;
    public FromSalesmanID: number;
    public ToSalesmanID: number;
    public Remark: string;
    public RequestedBy: string;
    public SendBy: string;
    public ReceivedBy: string;
    public VerfiedBy: string;
    public Total: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public IsSent: boolean;
    public IsReceived: boolean;
    public IsRequested: boolean;
}

class IQ_GetOperationTF extends SecurityClass {
    constructor() {
        super();
        this.OperationTFID = 0;
        this.Tr_No = 0;
        this.TrType = 0;
        this.RefNO = "";
        this.TrDate = "";
        this.TrDateH = "";
        this.OperationID = 0;
        this.FromSalesmanID = 0;
        this.ToSalesmanID = 0;
        this.Remark = "";
        this.RequestedBy = "";
        this.SendBy = "";
        this.ReceivedBy = "";
        this.VerfiedBy = "";
        this.IsPosted = false;
        this.Total = 0;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.IsSent = false;
        this.IsReceived = false;
        this.IsRequested = false;
        this.Op_TRNo = 0;
        this.Op_RefNo = "";
        this.Op_TrDate = "";
        this.Op_TruckNo = "";
        this.Op_VendorCode = "";
        this.Vnd_nameA = "";
        this.Vnd_NameE = "";
        this.Op_Status = 0;
        this.FromSls_Code = "";
        this.FromSls_NameA = "";
        this.FromSls_NameE = "";
        this.ToSls_Code = "";
        this.ToSls_NameA = "";
        this.Tosls_NameE = "";
        this.IsSent_Desc = "";
        this.TrType_Desc = "";
    }
    public OperationTFID: number;
    public Tr_No: number;
    public TrType: number;
    public RefNO: string;
    public TrDate: string;
    public TrDateH: string;
    public OperationID: number;
    public FromSalesmanID: number;
    public ToSalesmanID: number;
    public Remark: string;
    public RequestedBy: string;
    public SendBy: string;
    public ReceivedBy: string;
    public VerfiedBy: string;
    public IsPosted: boolean;
    public Total: number;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public IsSent: boolean;
    public IsReceived: boolean;
    public IsRequested: boolean;
    public Op_TRNo: number;
    public Op_RefNo: string;
    public Op_TrDate: string;
    public Op_TruckNo: string;
    public Op_VendorCode: string;
    public Vnd_nameA: string;
    public Vnd_NameE: string;
    public Op_Status: number;
    public FromSls_Code: string;
    public FromSls_NameA: string;
    public FromSls_NameE: string;
    public ToSls_Code: string;
    public ToSls_NameA: string;
    public Tosls_NameE: string;
    public IsSent_Desc: string;
    public TrType_Desc: string;
}

class IQ_GetOperationTFDetail extends SecurityClass {
    constructor() {
        super();
        this.OperationTFDetailID = 0;
        this.OperationTFID = 0;
        this.OperationItemID = 0;
        this.ItemID = 0;
        this.SendQty = 0;
        this.RecQty = 0;
        this.ItemCode = "";
        this.IT_DescA = "";
        this.IT_DescE = "";
        this.FamilyCode = "";
        this.FamDescA = "";
        this.Fam_DescE = "";
    }
    public OperationTFDetailID: number;
    public OperationTFID: number;
    public OperationItemID: number;
    public ItemID: number;
    public SendQty: number;
    public RecQty: number;
    public ItemCode: string;
    public IT_DescA: string;
    public IT_DescE: string;
    public FamilyCode: string;
    public FamDescA: string;
    public Fam_DescE: string;
}

class IQ_GetOPerationTransferWithDetail extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetOperationTF = new Array<IQ_GetOperationTF>();
        this.IQ_GetOperationTFDetail = new Array<IQ_GetOperationTFDetail>();
    }
    public IQ_GetOperationTF: Array<IQ_GetOperationTF>;
    public IQ_GetOperationTFDetail: Array<IQ_GetOperationTFDetail>;
}

class OPerationSalesmanTransferWithDetail extends SecurityClass {
    constructor() {
        super();
        this.I_TR_OperationTF = new I_TR_OperationTF();
        this.I_TR_OperationTFDetail = new Array<I_TR_OperationTFDetail>();
    }
    public I_TR_OperationTF: I_TR_OperationTF;
    public I_TR_OperationTFDetail: Array<I_TR_OperationTFDetail>;
}

class AVAT_CONTROL extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VAT_YEAR = 0;
        this.VAT_SETTING = false;
        this.VAT_PERIOD = 0;
        this.VAT_START_DATE = "";
        this.VAT_END_DATE = "";
        this.VAT_CR_ACC = "";
        this.VAT_DB_ACC = "";
        this.VAT_ACCURUAL_ACC = "";
        this.VAT_WARNING_DAYS = 0;
        this.VAT_ALLOWED_DAYS = 0;
        this.VAT_PREVBAL = 0;
    }
    public COMP_CODE: number;
    public VAT_YEAR: number;
    public VAT_SETTING: boolean;
    public VAT_PERIOD: number;
    public VAT_START_DATE: string;
    public VAT_END_DATE: string;
    public VAT_CR_ACC: string;
    public VAT_DB_ACC: string;
    public VAT_ACCURUAL_ACC: string;
    public VAT_WARNING_DAYS: number;
    public VAT_ALLOWED_DAYS: number;
    public VAT_PREVBAL: number;
}


class A_Rec_D_Customer extends SecurityClass {
    constructor() {
        super();
        this.CustomerId = 0;
        this.CustomerCODE = "";
        this.CatID = 0;
        this.GroupId = 0;
        this.NAMEA = "";
        this.NAMEE = "";
        this.SHORTNAME = "";
        this.TEL = "";
        this.FAX = "";
        this.EMAIL = "";
        this.CURCODE = "";
        this.REMARKS = "";
        this.STATUS = false;
        this.MOBILE = "";
        this.Bank = "";
        this.AccountNo = "";
        this.ManagerName = "";
        this.NationalityID = 0;
        this.BranchCode = 0;
        this.CompCode = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.Employer = "";
        this.JobName = "";
        this.WorkTel = "";
        this.WorkAddress = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.AddDedNo = "";
        this.VatNo = "";
        this.Isactive = false;
        this.IsAuthorized = false;
        this.CreditLimit = 0;
        this.CreditLimitFC = 0;
        this.CreditPeriod = 0;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.PaymentType = 0;
        this.FCRate = 0;
        this.CreditExpiryDate = "";
        this.RefCode2 = "";
        this.RefCode1 = "";
        this.IsCreditCustomer = false;
        this.DiscountplanID = 0;
        this.SalesmanId = 0;
        this.Address_postal = "";
        this.Address_Province = "";
        this.GroupVatNo = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
    }
    public CustomerId: number;
    public CustomerCODE: string;
    public CatID: number;
    public GroupId: number;
    public NAMEA: string;
    public NAMEE: string;
    public SHORTNAME: string;
    public TEL: string;
    public FAX: string;
    public EMAIL: string;
    public CURCODE: string;
    public REMARKS: string;
    public STATUS: boolean;
    public MOBILE: string;
    public Bank: string;
    public AccountNo: string;
    public ManagerName: string;
    public NationalityID: number;
    public BranchCode: number;
    public CompCode: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public Employer: string;
    public JobName: string;
    public WorkTel: string;
    public WorkAddress: string;
    public VATType: number;
    public AddDedType: number;
    public AddDedNo: string;
    public VatNo: string;
    public Isactive: boolean;
    public IsAuthorized: boolean;
    public CreditLimit: number;
    public CreditLimitFC: number;
    public CreditPeriod: number;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public PaymentType: number;
    public FCRate: number;
    public CreditExpiryDate: string;
    public RefCode2: string;
    public RefCode1: string;
    public IsCreditCustomer: boolean;
    public DiscountplanID: number;
    public SalesmanId: number;
    public Address_postal: string;
    public Address_Province: string;
    public GroupVatNo: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
}

class A_Rec_D_CustomerDoc extends SecurityClass {
    constructor() {
        super();
        this.CustomerDocID = 0;
        this.CustomerId = 0;
        this.CusIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDate = "";
        this.IDIssueDateH = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.StatusFlag = "";
    }
    public CustomerDocID: number;
    public CustomerId: number;
    public CusIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDate: string;
    public IDIssueDateH: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public StatusFlag: string;
}

class A_Pay_D_Vendor extends SecurityClass {
    constructor() {
        super();
        this.VendorID = 0;
        this.CompCode = 0;
        this.VendorCode = "";
        this.CatID = 0;
        this.GroupId = 0;
        this.NAMEA = "";
        this.NAMEL = "";
        this.SHORTNAMEA = "";
        this.SHORTNAMEL = "";
        this.NationalityID = 0;
        this.RespPersonName = "";
        this.RespPersonMobile = "";
        this.TEL = "";
        this.WorkTel = "";
        this.MOBILE = 0;
        this.EMAIL = "";
        this.CURCODE = "";
        this.PurchaserId = 0;
        this.OnPurchaserAcc = false;
        this.AccVendorID = 0;
        this.PaymentType = 0;
        this.DebitLimit = 0;
        this.DebitLimitFC = 0;
        this.DebitPeriod = 0;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.Isactive = false;
        this.FCRate = 0;
        this.REMARKS = "";
        this.STATUS = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.VendorType = 0;
        this.Bank = "";
        this.BankAccountNo = "";
        this.TaxFileNo = "";
        this.TaxIssuePlace = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.VATNo = "";
        this.AddDedNo = "";
        this.IsWebEnabled = false;
        this.WebUserName = "";
        this.WebPassword = "";
        this.IsCreditVendor = false;
        this.IDNo = "";
        this.Address_postal = "";
        this.Address_Province = "";
        this.GroupVatNo = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
        this.OperationFixed = "";
        this.OperationSer = "";
    }
    public VendorID: number;
    public CompCode: number;
    public VendorCode: string;
    public CatID: number;
    public GroupId: number;
    public NAMEA: string;
    public NAMEL: string;
    public SHORTNAMEA: string;
    public SHORTNAMEL: string;
    public NationalityID: number;
    public RespPersonName: string;
    public RespPersonMobile: string;
    public TEL: string;
    public WorkTel: string;
    public MOBILE: number;
    public EMAIL: string;
    public CURCODE: string;
    public PurchaserId: number;
    public OnPurchaserAcc: boolean;
    public AccVendorID: number;
    public PaymentType: number;
    public DebitLimit: number;
    public DebitLimitFC: number;
    public DebitPeriod: number;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public Isactive: boolean;
    public FCRate: number;
    public REMARKS: string;
    public STATUS: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public VendorType: number;
    public Bank: string;
    public BankAccountNo: string;
    public TaxFileNo: string;
    public TaxIssuePlace: string;
    public VATType: number;
    public AddDedType: number;
    public VATNo: string;
    public AddDedNo: string;
    public IsWebEnabled: boolean;
    public WebUserName: string;
    public WebPassword: string;
    public IsCreditVendor: boolean;
    public IDNo: string;
    public Address_postal: string;
    public Address_Province: string;
    public GroupVatNo: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
    public OperationFixed: string;
    public OperationSer: string;
}


class A_Pay_D_VendorDoc extends SecurityClass {
    constructor() {
        super();
        this.VendorDocID = 0;
        this.VendorId = 0;
        this.VndIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDate = "";
        this.IDIssueDateH = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.StatusFlag = "";
    }
    public VendorDocID: number;
    public VendorId: number;
    public VndIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDate: string;
    public IDIssueDateH: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public StatusFlag: string;
}

class G_Codes extends SecurityClass {
    constructor() {
        super();
        this.ID = 0;
        this.CodeType = "";
        this.CodeValue = 0;
        this.DescA = "";
        this.DescE = "";
        this.SubCode = "";
        this.Remarks = "";
        this.StdCode = "";
    }
    public ID: number;
    public CodeType: string;
    public CodeValue: number;
    public DescA: string;
    public DescE: string;
    public SubCode: string;
    public Remarks: string;
    public StdCode: string;
}

class IQ_GetCustomer extends SecurityClass {
    constructor() {
        super();
        this.CustomerId = 0;
        this.CustomerCODE = "";
        this.CatID = 0;
        this.GroupId = 0;
        this.NAMEA = "";
        this.NAMEE = "";
        this.SHORTNAME = "";
        this.TEL = "";
        this.FAX = "";
        this.EMAIL = "";
        this.CURCODE = "";
        this.REMARKS = "";
        this.STATUS = false;
        this.MOBILE = "";
        this.Bank = "";
        this.AccountNo = "";
        this.ManagerName = "";
        this.NationalityID = 0;
        this.BranchCode = 0;
        this.CompCode = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.Employer = "";
        this.JobName = "";
        this.WorkTel = "";
        this.WorkAddress = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.AddDedNo = "";
        this.VatNo = "";
        this.Isactive = false;
        this.IsAuthorized = false;
        this.CreditLimit = 0;
        this.CreditLimitFC = 0;
        this.CreditPeriod = 0;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.PaymentType = 0;
        this.FCRate = 0;
        this.CreditExpiryDate = "";
        this.RefCode2 = "";
        this.RefCode1 = "";
        this.IsCreditCustomer = false;
        this.DiscountplanID = 0;
        this.SalesmanId = 0;
        this.SalesmanCode = "";
        this.Sls_NameA = "";
        this.Sls_NameE = "";
        this.CatCode = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
        this.GroupCode = "";
        this.Group_DescA = "";
        this.Group_DescE = "";
        this.Balance = 0;
        this.Address_postal = "";
        this.Address_Province = "";
        this.GroupVatNo = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
    }
    public CustomerId: number;
    public CustomerCODE: string;
    public CatID: number;
    public GroupId: number;
    public NAMEA: string;
    public NAMEE: string;
    public SHORTNAME: string;
    public TEL: string;
    public FAX: string;
    public EMAIL: string;
    public CURCODE: string;
    public REMARKS: string;
    public STATUS: boolean;
    public MOBILE: string;
    public Bank: string;
    public AccountNo: string;
    public ManagerName: string;
    public NationalityID: number;
    public BranchCode: number;
    public CompCode: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public Employer: string;
    public JobName: string;
    public WorkTel: string;
    public WorkAddress: string;
    public VATType: number;
    public AddDedType: number;
    public AddDedNo: string;
    public VatNo: string;
    public Isactive: boolean;
    public IsAuthorized: boolean;
    public CreditLimit: number;
    public CreditLimitFC: number;
    public CreditPeriod: number;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public PaymentType: number;
    public FCRate: number;
    public CreditExpiryDate: string;
    public RefCode2: string;
    public RefCode1: string;
    public IsCreditCustomer: boolean;
    public DiscountplanID: number;
    public SalesmanId: number;
    public SalesmanCode: string;
    public Sls_NameA: string;
    public Sls_NameE: string;
    public CatCode: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
    public GroupCode: string;
    public Group_DescA: string;
    public Group_DescE: string;
    public Balance: number;
    public Address_postal: string;
    public Address_Province: string;
    public GroupVatNo: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
}

class IQ_GetVendor extends SecurityClass {
    constructor() {
        super();
        this.VendorID = 0;
        this.CatID = 0;
        this.GroupId = 0;
        this.NAMEA = "";
        this.TEL = "";
        this.EMAIL = "";
        this.CURCODE = "";
        this.REMARKS = "";
        this.STATUS = 0;
        this.MOBILE = 0;
        this.Bank = "";
        this.NationalityID = 0;
        this.IDNo = "";
        this.CompCode = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.WorkTel = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.AddDedNo = "";
        this.VATNo = "";
        this.Isactive = false;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.PaymentType = 0;
        this.FCRate = 0;
        this.CatCode = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
        this.GroupCode = "";
        this.Group_DescA = "";
        this.Group_DescE = "";
        this.Balance = 0;
        this.VendorCode = "";
        this.NAMEL = "";
        this.SHORTNAMEA = "";
        this.SHORTNAMEL = "";
        this.RespPersonName = "";
        this.RespPersonMobile = "";
        this.PurchaserId = 0;
        this.OnPurchaserAcc = false;
        this.AccVendorID = 0;
        this.DebitLimit = 0;
        this.DebitPeriod = 0;
        this.DebitLimitFC = 0;
        this.BankAccountNo = "";
        this.TaxFileNo = "";
        this.TaxIssuePlace = "";
        this.IsCreditVendor = false;
        this.WebPassword = "";
        this.WebUserName = "";
        this.IsWebEnabled = false;
        this.VendorType = 0;
        this.Type_DescA = "";
        this.Type_DescE = "";
        this.Address_postal = "";
        this.Address_Province = "";
        this.GroupVatNo = "";
        this.Address_Street = "";
        this.Address_BuildingNo = "";
        this.Address_Str_Additional = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
    }
    public VendorID: number;
    public CatID: number;
    public GroupId: number;
    public NAMEA: string;
    public TEL: string;
    public EMAIL: string;
    public CURCODE: string;
    public REMARKS: string;
    public STATUS: number;
    public MOBILE: number;
    public Bank: string;
    public NationalityID: number;
    public IDNo: string;
    public CompCode: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public WorkTel: string;
    public VATType: number;
    public AddDedType: number;
    public AddDedNo: string;
    public VATNo: string;
    public Isactive: boolean;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public PaymentType: number;
    public FCRate: number;
    public CatCode: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
    public GroupCode: string;
    public Group_DescA: string;
    public Group_DescE: string;
    public Balance: number;
    public VendorCode: string;
    public NAMEL: string;
    public SHORTNAMEA: string;
    public SHORTNAMEL: string;
    public RespPersonName: string;
    public RespPersonMobile: string;
    public PurchaserId: number;
    public OnPurchaserAcc: boolean;
    public AccVendorID: number;
    public DebitLimit: number;
    public DebitPeriod: number;
    public DebitLimitFC: number;
    public BankAccountNo: string;
    public TaxFileNo: string;
    public TaxIssuePlace: string;
    public IsCreditVendor: boolean;
    public WebPassword: string;
    public WebUserName: string;
    public IsWebEnabled: boolean;
    public VendorType: number;
    public Type_DescA: string;
    public Type_DescE: string;
    public Address_postal: string;
    public Address_Province: string;
    public GroupVatNo: string;
    public Address_Street: string;
    public Address_BuildingNo: string;
    public Address_Str_Additional: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
}

class AQ_GetVendorDoc extends SecurityClass {
    constructor() {
        super();
        this.VendorDocID = 0;
        this.VendorId = 0;
        this.VndIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDate = "";
        this.IDIssueDateH = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.Doc_DescA = "";
        this.Doc_DescE = "";
        this.Doc_StdCode = "";
    }
    public VendorDocID: number;
    public VendorId: number;
    public VndIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDate: string;
    public IDIssueDateH: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public Doc_DescA: string;
    public Doc_DescE: string;
    public Doc_StdCode: string;
}

class AQ_GetCustomerDoc extends SecurityClass {
    constructor() {
        super();
        this.CustomerDocID = 0;
        this.CustomerId = 0;
        this.CusIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDateH = "";
        this.IDIssueDate = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.Doc_DescA = "";
        this.Doc_DescE = "";
        this.Doc_StdCode = "";
    }
    public CustomerDocID: number;
    public CustomerId: number;
    public CusIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDateH: string;
    public IDIssueDate: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public Doc_DescA: string;
    public Doc_DescE: string;
    public Doc_StdCode: string;
}


class IQ_GetItemCategory extends SecurityClass {
    constructor() {
        super();
        this.CatID = 0;
        this.CompCode = 0;
        this.CatCode = "";
        this.DescA = "";
        this.DescL = "";
        this.CatLevel = 0;
        this.ParentCatId = 0;
        this.IsDetail = false;
        this.UnitGrpID = 0;
        this.IsAutoGenerateItem = false;
        this.ItemFormatFix = "";
        this.ItemFormatSerial = "";
        this.ItemTypeID = 0;
        this.CostMethodID = 0;
        this.StockMethodID = 0;
        this.IssueFromCenteralStore = false;
        this.CenteralStoreCode = 0;
        this.IsAdditionalSpecs = false;
        this.AdditionalspcsDescA = "";
        this.AdditionalspcsDescL = "";
        this.ISSales = false;
        this.IsStock = false;
        this.IsProduct = false;
        this.IsIssuetoCC = false;
        this.IsIssueToProd = false;
        this.IsPurchase = false;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.VatNatID = 0;
        this.VatNatureCode = "";
        this.VatNatureDescA = "";
        this.VatNatureDescE = "";
        this.VatPrc = 0;
    }
    public CatID: number;
    public CompCode: number;
    public CatCode: string;
    public DescA: string;
    public DescL: string;
    public CatLevel: number;
    public ParentCatId: number;
    public IsDetail: boolean;
    public UnitGrpID: number;
    public IsAutoGenerateItem: boolean;
    public ItemFormatFix: string;
    public ItemFormatSerial: string;
    public ItemTypeID: number;
    public CostMethodID: number;
    public StockMethodID: number;
    public IssueFromCenteralStore: boolean;
    public CenteralStoreCode: number;
    public IsAdditionalSpecs: boolean;
    public AdditionalspcsDescA: string;
    public AdditionalspcsDescL: string;
    public ISSales: boolean;
    public IsStock: boolean;
    public IsProduct: boolean;
    public IsIssuetoCC: boolean;
    public IsIssueToProd: boolean;
    public IsPurchase: boolean;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public VatNatID: number;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public VatPrc: number;
}


class IQVendorMasterDetail extends SecurityClass {
    constructor() {
        super();
        this.IQ_GetVendor = new Array<IQ_GetVendor>();
        this.AQ_GetVendorDoc = new Array<AQ_GetVendorDoc>();
    }
    public IQ_GetVendor: Array<IQ_GetVendor>;
    public AQ_GetVendorDoc: Array<AQ_GetVendorDoc>;
}

class VendorMasterDetail extends SecurityClass {
    constructor() {
        super();
        this.A_Pay_D_Vendor = new A_Pay_D_Vendor();
        this.A_Pay_D_VendorDoc = new Array<A_Pay_D_VendorDoc>();
    }
    public A_Pay_D_Vendor: A_Pay_D_Vendor;
    public A_Pay_D_VendorDoc: Array<A_Pay_D_VendorDoc>;
}


class G_Currency extends SecurityClass {
    constructor() {
        super();
        this.CurrencyID = 0;
        this.CurrencyCode = "";
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    public CurrencyID: number;
    public CurrencyCode: string;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
}



class AQVAT_GetService extends SecurityClass {
    constructor() {
        super();
        this.Itemid = 0;
        this.ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.VatPrc = 0;
        this.VatNatID = 0;
        this.SrvCategoryID = 0;
        this.UnitPrice = 0;
        this.UomID = 0;
        this.UomCode = "";
        this.CAT_CODE = "";
        this.Cat_DescA = "";
        this.cat_DescE = "";
        this.VatNatureCode = "";
        this.VatNatureDescA = "";
        this.VatNatureDescE = "";
        this.RefItemCode = "";
        this.OldItemCode = "";
        this.VndItemCode = "";
        this.IsPurchase = false;
    }
    public Itemid: number;
    public ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public VatPrc: number;
    public VatNatID: number;
    public SrvCategoryID: number;
    public UnitPrice: number;
    public UomID: number;
    public UomCode: string;
    public CAT_CODE: string;
    public Cat_DescA: string;
    public cat_DescE: string;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public RefItemCode: string;
    public OldItemCode: string;
    public VndItemCode: string;
    public IsPurchase: boolean;
}

class AVAT_D_Service extends SecurityClass {
    constructor() {
        super();
        this.Itemid = 0;
        this.SrvCategoryID = 0;
        this.ItemCode = "";
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.UnitPrice = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.UomID = 0;
        this.RefItemCode = "";
        this.OldItemCode = "";
        this.VndItemCode = "";
    }
    public Itemid: number;
    public SrvCategoryID: number;
    public ItemCode: string;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public UnitPrice: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public UomID: number;
    public RefItemCode: string;
    public OldItemCode: string;
    public VndItemCode: string;
}

class AVAT_TR_SlsInvoice extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxNotes = "";
        this.TaxCurrencyID = 0;
        this.InvoiceCurrenyID = 0;
        this.ContractNo = "";
        this.PurchaseorderNo = "";
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.DeliveryDate = "";
        this.DeliveryEndDate = "";
        this.PaymentMeansTypeCode = 0;
        this.CRDBReasoncode = 0;
        this.PaymentTerms = "";
        this.PaymentTermsID = 0;
        this.AllowAmount = 0;
        this.AllowPrc = 0;
        this.AllowBase = 0;
        this.AllowVatNatID = 0;
        this.AllowVatPrc = 0;
        this.AllowAfterVat = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.ItemTotal = 0;
        this.ItemAllowTotal = 0;
        this.ItemDiscountTotal = 0;
        this.ItemVatTotal = 0;
        this.RoundingAmount = 0;
    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public TaxNotes: string;
    public TaxCurrencyID: number;
    public InvoiceCurrenyID: number;
    public ContractNo: string;
    public PurchaseorderNo: string;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public DeliveryDate: string;
    public DeliveryEndDate: string;
    public PaymentMeansTypeCode: number;
    public CRDBReasoncode: number;
    public PaymentTerms: string;
    public PaymentTermsID: number;
    public AllowAmount: number;
    public AllowPrc: number;
    public AllowBase: number;
    public AllowVatNatID: number;
    public AllowVatPrc: number;
    public AllowAfterVat: number;
    public AllowReason: string;
    public AllowCode: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public ItemTotal: number;
    public ItemAllowTotal: number;
    public ItemDiscountTotal: number;
    public ItemVatTotal: number;
    public RoundingAmount: number;
}

class AVAT_TR_SlsInvoiceItem extends SecurityClass {
    constructor() {
        super();
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.InvoiceSoldQty = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.VatApplied = 0;
        this.TotRetQty = 0;
        this.Serial = 0;
        this.AllowAmount = 0;
        this.AllowancePrc = 0;
        this.AllowanceBase = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.BaseQty = 0;
        this.BaseQtyUomid = 0;
        this.BaseQtyPrice = 0;
        this.BaseQtyDiscount = 0;
        this.DiscountPrcBase = 0;
        this.DiscountVatNatID = 0;
        this.Discountreason = "";
        this.DiscountCode = 0;
        this.ItemNetAmount = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.VatNatID = 0;
        this.CC_CODE = "";
        this.StatusFlag = "";
    }
    public InvoiceItemID: number;
    public InvoiceID: number;
    public ItemID: number;
    public UomID: number;
    public InvoiceSoldQty: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public VatApplied: number;
    public TotRetQty: number;
    public Serial: number;
    public AllowAmount: number;
    public AllowancePrc: number;
    public AllowanceBase: number;
    public AllowReason: string;
    public AllowCode: number;
    public BaseQty: number;
    public BaseQtyUomid: number;
    public BaseQtyPrice: number;
    public BaseQtyDiscount: number;
    public DiscountPrcBase: number;
    public DiscountVatNatID: number;
    public Discountreason: string;
    public DiscountCode: number;
    public ItemNetAmount: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public VatNatID: number;
    public CC_CODE: string;
    public StatusFlag: string;
}

class AQVAT_GetSlsInvoiceItem extends SecurityClass {
    constructor() {
        super();
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.VatApplied = 0;
        this.TotRetQty = 0;
        this.it_itemCode = "";
        this.it_DescA = "";
        this.CompCode = 0;
        this.It_DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.InvoiceSoldQty = 0;
        this.Serial = 0;
        this.AllowAmount = 0;
        this.AllowancePrc = 0;
        this.AllowanceBase = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.BaseQty = 0;
        this.BaseQtyUomid = 0;
        this.BaseQtyPrice = 0;
        this.BaseQtyDiscount = 0;
        this.DiscountPrcBase = 0;
        this.DiscountVatNatID = 0;
        this.Discountreason = "";
        this.DiscountCode = 0;
        this.ItemNetAmount = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.VatNatID = 0;
        this.CC_CODE = "";
        this.CC_DESCA = "";
        this.CC_DESCE = "";
        this.Cat_DescA = "";
        this.cat_DescE = "";
        this.CAT_CODE = "";
    }
    public InvoiceItemID: number;
    public InvoiceID: number;
    public ItemID: number;
    public UomID: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public VatApplied: number;
    public TotRetQty: number;
    public it_itemCode: string;
    public it_DescA: string;
    public CompCode: number;
    public It_DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public InvoiceSoldQty: number;
    public Serial: number;
    public AllowAmount: number;
    public AllowancePrc: number;
    public AllowanceBase: number;
    public AllowReason: string;
    public AllowCode: number;
    public BaseQty: number;
    public BaseQtyUomid: number;
    public BaseQtyPrice: number;
    public BaseQtyDiscount: number;
    public DiscountPrcBase: number;
    public DiscountVatNatID: number;
    public Discountreason: string;
    public DiscountCode: number;
    public ItemNetAmount: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public VatNatID: number;
    public CC_CODE: string;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public Cat_DescA: string;
    public cat_DescE: string;
    public CAT_CODE: string;
}

class AQVAT_GetSlsInvoiceList extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.Slsm_Code = "";
        this.Slsm_DescA = "";
        this.Slsm_DescE = "";
        this.Cus_Code = "";
        this.Cus_NameA = "";
        this.Cus_NameE = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxNotes = "";
        this.TaxCurrencyID = 0;
        this.InvoiceCurrenyID = 0;
        this.ContractNo = "";
        this.PurchaseorderNo = "";
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.DeliveryDate = "";
        this.DeliveryEndDate = "";
        this.PaymentMeansTypeCode = 0;
        this.CRDBReasoncode = 0;
        this.PaymentTerms = "";
        this.PaymentTermsID = 0;
        this.AllowAmount = 0;
        this.AllowPrc = 0;
        this.AllowBase = 0;
        this.AllowVatNatID = 0;
        this.AllowVatPrc = 0;
        this.AllowAfterVat = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.ItemTotal = 0;
        this.ItemAllowTotal = 0;
        this.ItemDiscountTotal = 0;
        this.ItemVatTotal = 0;
        this.RoundingAmount = 0;
        this.RetInv_TrNo = 0;
        this.statusDesciption = "";
        this.IsCashDesciption = "";
        this.RetInv_DocNo = "";
    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public Slsm_Code: string;
    public Slsm_DescA: string;
    public Slsm_DescE: string;
    public Cus_Code: string;
    public Cus_NameA: string;
    public Cus_NameE: string;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public TaxNotes: string;
    public TaxCurrencyID: number;
    public InvoiceCurrenyID: number;
    public ContractNo: string;
    public PurchaseorderNo: string;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public DeliveryDate: string;
    public DeliveryEndDate: string;
    public PaymentMeansTypeCode: number;
    public CRDBReasoncode: number;
    public PaymentTerms: string;
    public PaymentTermsID: number;
    public AllowAmount: number;
    public AllowPrc: number;
    public AllowBase: number;
    public AllowVatNatID: number;
    public AllowVatPrc: number;
    public AllowAfterVat: number;
    public AllowReason: string;
    public AllowCode: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public ItemTotal: number;
    public ItemAllowTotal: number;
    public ItemDiscountTotal: number;
    public ItemVatTotal: number;
    public RoundingAmount: number;
    public RetInv_TrNo: number;
    public statusDesciption: string;
    public IsCashDesciption: string;
    public RetInv_DocNo: string;
}


class AQVAT_GetPurReturnDetail {
    constructor() {
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
    public InvoiceDetailID: number;
    public TR_SERIAL: number;
    public Itemid: number;
    public UomID: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatApplied: number;
    public VatPrc: number;
    public VatAmount: number;
    public REMARK: string;
    public ACTUAL_DATE: string;
    public QTY_RET: number;
    public CC_CODE: string;
    public CCDT_CODE: string;
    public VatNatID: number;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public UomCode: string;
    public ItemCode: string;
    public itm_DescA: string;
    public itm_DescE: string;
    public CompCode: number;
    public BranchCode: number;
    public InvoiceRetID: number;
    public InvoiceRetDetailid: number;
    public QTY_SOLD: number;
}





class AQ_ServSlsInvoiceMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.AQVAT_GetSlsInvoiceList = new Array<AQVAT_GetSlsInvoiceList>();
        this.AQVAT_GetSlsInvoiceItem = new Array<AQVAT_GetSlsInvoiceItem>();
    }
    public AQVAT_GetSlsInvoiceList: Array<AQVAT_GetSlsInvoiceList>;
    public AQVAT_GetSlsInvoiceItem: Array<AQVAT_GetSlsInvoiceItem>;
}

class ServSlsInvoiceMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.AVAT_TR_SlsInvoice = new AVAT_TR_SlsInvoice();
        this.AVAT_TR_SlsInvoiceItem = new Array<AVAT_TR_SlsInvoiceItem>();
    }
    public AVAT_TR_SlsInvoice: AVAT_TR_SlsInvoice;
    public AVAT_TR_SlsInvoiceItem: Array<AVAT_TR_SlsInvoiceItem>;
}

class AQVAT_GetPurInvoiceHeader extends SecurityClass {
    constructor() {
        super();
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.COMPCODE = 0;
        this.BranchCode = 0;
        this.Ref_No = "";
        this.DocNo = "";
        this.VND_SERIAL = 0;
        this.VendorID = 0;
        this.TR_TYPE = 0;
        this.VENDOR_NAME = "";
        this.TOTAL = 0;
        this.DISCOUNT = 0;
        this.PAID = 0;
        this.Vat = 0;
        this.NetATax = 0;
        this.VatApplied = false;
        this.VndVatType = 0;
        this.VatPrc = 0;
        this.SalesType = 0;
        this.PAY_ACC_CODE = "";
        this.REMARK = "";
        this.InvoiceDate = "";
        this.CCDT_CODE = "";
        this.VendorCode = "";
        this.vnd_NameA = "";
        this.Vnd_NameE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
    }
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public COMPCODE: number;
    public BranchCode: number;
    public Ref_No: string;
    public DocNo: string;
    public VND_SERIAL: number;
    public VendorID: number;
    public TR_TYPE: number;
    public VENDOR_NAME: string;
    public TOTAL: number;
    public DISCOUNT: number;
    public PAID: number;
    public Vat: number;
    public NetATax: number;
    public VatApplied: boolean;
    public VndVatType: number;
    public VatPrc: number;
    public SalesType: number;
    public PAY_ACC_CODE: string;
    public REMARK: string;
    public InvoiceDate: string;
    public CCDT_CODE: string;
    public VendorCode: string;
    public vnd_NameA: string;
    public Vnd_NameE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
}

class AQVAT_GetPurInvoiceDetail extends SecurityClass {
    constructor() {
        super();
        this.InvoiceDetailID = 0;
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.TR_SERIAL = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatApplied = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
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
        this.VND_SERIAL = 0;
    }
    public InvoiceDetailID: number;
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public TR_SERIAL: number;
    public ItemID: number;
    public UomID: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatApplied: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public REMARK: string;
    public ACTUAL_DATE: string;
    public QTY_RET: number;
    public CC_CODE: string;
    public CCDT_CODE: string;
    public VatNatID: number;
    public VatNatureCode: string;
    public VatNatureDescA: string;
    public VatNatureDescE: string;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public UomCode: string;
    public ItemCode: string;
    public itm_DescA: string;
    public itm_DescE: string;
    public CompCode: number;
    public BranchCode: number;
    public VND_SERIAL: number;
}



class AVAT_TR_PurInvoice extends SecurityClass {
    constructor() {
        super();
        this.InvoiceId = 0;
        this.TR_NO = 0;
        this.DocNo = "";
        this.TR_DATE = "";
        this.PERSON = "";
        this.TOTAL = 0;
        this.DISCOUNT = 0;
        this.PAID = 0;
        this.JOURNAL_NO = 0;
        this.JOURNAL_RET_NO = 0;
        this.CLOSED = false;
        this.CANCEL = false;
        this.Remark = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.IsPosted = false;
        this.ACTUAL_DATE = "";
        this.PrntNo = "";
        this.Ref_No = "";
        this.Vat = 0;
        this.NetATax = 0;
        this.InvoiceDate = "";
        this.ImportInvoice = false;
        this.CCDT_CODE = "";
        this.ImportInvoiceDesc = "";
        this.CLOSEDDesc = "";
    }
    public InvoiceId: number;
    public TR_NO: number;
    public DocNo: string;
    public TR_DATE: string;
    public PERSON: string;
    public TOTAL: number;
    public DISCOUNT: number;
    public PAID: number;
    public JOURNAL_NO: number;
    public JOURNAL_RET_NO: number;
    public CLOSED: boolean;
    public CANCEL: boolean;
    public Remark: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public IsPosted: boolean;
    public ACTUAL_DATE: string;
    public PrntNo: string;
    public Ref_No: string;
    public Vat: number;
    public NetATax: number;
    public InvoiceDate: string;
    public ImportInvoice: boolean;
    public CCDT_CODE: string;
    public ImportInvoiceDesc: string;
    public CLOSEDDesc: string;
}

class AVAT_TR_PurInvoiceDetail extends SecurityClass {
    constructor() {
        super();
        this.InvoiceDetailID = 0;
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.TR_SERIAL = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatApplied = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.REMARK = "";
        this.ACTUAL_DATE = "";
        this.QTY_RET = 0;
        this.CC_CODE = "";
        this.CCDT_CODE = "";
        this.VatNatID = 0;
        this.CompCode = 0;
        this.BranchCode = 0;
        this.VND_SERIAL = 0;
        this.StatusFlag = "";
    }
    public InvoiceDetailID: number;
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public TR_SERIAL: number;
    public ItemID: number;
    public UomID: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatApplied: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public REMARK: string;
    public ACTUAL_DATE: string;
    public QTY_RET: number;
    public CC_CODE: string;
    public CCDT_CODE: string;
    public VatNatID: number;
    public CompCode: number;
    public BranchCode: number;
    public VND_SERIAL: number;
    public StatusFlag: string;
}

class AVAT_TR_PurInvoiceHeader extends SecurityClass {
    constructor() {
        super();
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.Ref_No = "";
        this.DocNo = "";
        this.VND_SERIAL = 0;
        this.VendorID = 0;
        this.TR_TYPE = 0;
        this.VENDOR_NAME = "";
        this.TOTAL = 0;
        this.DISCOUNT = 0;
        this.PAID = 0;
        this.Vat = 0;
        this.NetATax = 0;
        this.VatApplied = false;
        this.VndVatType = 0;
        this.VatPrc = 0;
        this.SalesType = 0;
        this.PAY_ACC_CODE = "";
        this.REMARK = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.InvoiceDate = "";
        this.CCDT_CODE = "";
        this.StatusFlag = "";
    }
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public Ref_No: string;
    public DocNo: string;
    public VND_SERIAL: number;
    public VendorID: number;
    public TR_TYPE: number;
    public VENDOR_NAME: string;
    public TOTAL: number;
    public DISCOUNT: number;
    public PAID: number;
    public Vat: number;
    public NetATax: number;
    public VatApplied: boolean;
    public VndVatType: number;
    public VatPrc: number;
    public SalesType: number;
    public PAY_ACC_CODE: string;
    public REMARK: string;
    public CompCode: number;
    public BranchCode: number;
    public InvoiceDate: string;
    public CCDT_CODE: string;
    public StatusFlag: string;
}


class AVAT_TR_PurInvoiceRet extends SecurityClass {
    constructor() {
        super();
        this.InvoiceRetID = 0;
        this.TR_NO = 0;
        this.DocNo = "";
        this.TR_DATE = "";
        this.TR_TYPE = 0;
        this.VendorID = 0;
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.VENDOR_NAME = "";
        this.TOTAL = 0;
        this.DISCOUNT = 0;
        this.PAID = 0;
        this.JOURNAL_NO = 0;
        this.CLOSED = false;
        this.CANCEL = false;
        this.Remark = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.POSTED = false;
        this.ACTUAL_DATE = "";
        this.PrntNo = "";
        this.Ref_No = "";
        this.Con_No = 0;
        this.Pay_No = 0;
        this.ConTyp = 0;
        this.Vat = 0;
        this.NetATax = 0;
        this.VatType = 0;
        this.VatApplied = false;
        this.VndVatType = 0;
        this.DedTaxPrc = 0;
        this.VatPrc = 0;
        this.SalesType = 0;
        this.ImportInvoice = false;
        this.PAY_ACC_CODE = "";
    }
    public InvoiceRetID: number;
    public TR_NO: number;
    public DocNo: string;
    public TR_DATE: string;
    public TR_TYPE: number;
    public VendorID: number;
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public VENDOR_NAME: string;
    public TOTAL: number;
    public DISCOUNT: number;
    public PAID: number;
    public JOURNAL_NO: number;
    public CLOSED: boolean;
    public CANCEL: boolean;
    public Remark: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public POSTED: boolean;
    public ACTUAL_DATE: string;
    public PrntNo: string;
    public Ref_No: string;
    public Con_No: number;
    public Pay_No: number;
    public ConTyp: number;
    public Vat: number;
    public NetATax: number;
    public VatType: number;
    public VatApplied: boolean;
    public VndVatType: number;
    public DedTaxPrc: number;
    public VatPrc: number;
    public SalesType: number;
    public ImportInvoice: boolean;
    public PAY_ACC_CODE: string;
}
class AQVAT_GetPurReturn extends SecurityClass {
    constructor() {
        super();
        this.InvoiceRetID = 0;
        this.TR_NO = 0;
        this.DocNo = "";
        this.TR_DATE = "";
        this.TR_TYPE = 0;
        this.VendorID = 0;
        this.InvoiceHeaderID = 0;
        this.InvoiceId = 0;
        this.VENDOR_NAME = "";
        this.TOTAL = 0;
        this.DISCOUNT = 0;
        this.PAID = 0;
        this.JOURNAL_NO = 0;
        this.CLOSED = false;
        this.CANCEL = false;
        this.Remark = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.POSTED = false;
        this.ACTUAL_DATE = "";
        this.PrntNo = "";
        this.Ref_No = "";
        this.Con_No = 0;
        this.Pay_No = 0;
        this.ConTyp = 0;
        this.Vat = 0;
        this.NetATax = 0;
        this.VatType = 0;
        this.VatApplied = false;
        this.VndVatType = 0;
        this.DedTaxPrc = 0;
        this.VatPrc = 0;
        this.SalesType = 0;
        this.ImportInvoice = false;
        this.PAY_ACC_CODE = "";
        this.VendorCode = "";
        this.vnd_NameA = "";
        this.vnd_NameE = "";
        this.Pur_Tr_No = 0;
        this.Pur_DocNo = "";
        this.Pur_TrDate = "";
        this.PurHD_Serial = 0;
        this.PurHd_DocNo = "";
        this.Closed_txt = "";
    }
    public InvoiceRetID: number;
    public TR_NO: number;
    public DocNo: string;
    public TR_DATE: string;
    public TR_TYPE: number;
    public VendorID: number;
    public InvoiceHeaderID: number;
    public InvoiceId: number;
    public VENDOR_NAME: string;
    public TOTAL: number;
    public DISCOUNT: number;
    public PAID: number;
    public JOURNAL_NO: number;
    public CLOSED: boolean;
    public CANCEL: boolean;
    public Remark: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public POSTED: boolean;
    public ACTUAL_DATE: string;
    public PrntNo: string;
    public Ref_No: string;
    public Con_No: number;
    public Pay_No: number;
    public ConTyp: number;
    public Vat: number;
    public NetATax: number;
    public VatType: number;
    public VatApplied: boolean;
    public VndVatType: number;
    public DedTaxPrc: number;
    public VatPrc: number;
    public SalesType: number;
    public ImportInvoice: boolean;
    public PAY_ACC_CODE: string;
    public VendorCode: string;
    public vnd_NameA: string;
    public vnd_NameE: string;
    public Pur_Tr_No: number;
    public Pur_DocNo: string;
    public Pur_TrDate: string;
    public PurHD_Serial: number;
    public PurHd_DocNo: string;
    public Closed_txt: string;
}

class AVAT_TR_PurInvoiceRetDetail {
    constructor() {
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
    public InvoiceRetDetailid: number;
    public InvoiceRetID: number;
    public InvoiceDetailID: number;
    public TR_SERIAL: number;
    public Itemid: number;
    public UomID: number;
    public QTY_SOLD: number;
    public QTY_RET: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public REMARK: string;
    public ACTUAL_DATE: string;
    public VatApplied: number;
    public VatPrc: number;
    public VatAmount: number;
    public CC_CODE: string;
    public CCDT_CODE: string;
    public VatNatID: number;
    public CompCode: number;
    public BranchCode: number;
}

class A_CCDT_Types extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.CCDT_TYPE = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
    }
    public CCDT_TYPE: string;
    public DescA: string;
    public COMP_CODE: number;
    public DescE: string;
    public Remarks: string;
}







class ListOperationDepositDetail extends SecurityClass {
    constructor() {
        super();
        this.I_TR_OperationSalesmanItem = new Array<I_TR_OperationSalesmanItem>();
        this.I_TR_OperationDeposit = new Array<I_TR_OperationDeposit>();
    }

    public I_TR_OperationSalesmanItem: Array<I_TR_OperationSalesmanItem>;
    public I_TR_OperationDeposit: Array<I_TR_OperationDeposit>;
}



class ServPurchseInvoiceMasterDetail extends SecurityClass {
    constructor() {
        super();
        this.AVAT_TR_PurInvoice = new AVAT_TR_PurInvoice();
        this.AVAT_TR_PurInvoiceDetail = new Array<AVAT_TR_PurInvoiceDetail>();
        this.AVAT_TR_PurInvoiceHeader = new Array<AVAT_TR_PurInvoiceHeader>();
    }
    public AVAT_TR_PurInvoice: AVAT_TR_PurInvoice;
    public AVAT_TR_PurInvoiceDetail: Array<AVAT_TR_PurInvoiceDetail>;
    public AVAT_TR_PurInvoiceHeader: Array<AVAT_TR_PurInvoiceHeader>;
}

class PurInvoiceRetMasterDetails {

    public AVAT_TR_PurInvoiceRet: AVAT_TR_PurInvoiceRet;
    public AVAT_TR_PurInvoiceRetDetail: Array<AVAT_TR_PurInvoiceRetDetail>;

}

class AQ_ServPurInvoiceMasterDetail extends SecurityClass {
    constructor() {
        super();
        this.AVAT_TR_PurInvoice = new Array<AVAT_TR_PurInvoice>();
        this.AQVAT_GetPurInvoiceDetail = new Array<AQVAT_GetPurInvoiceDetail>();
        this.AQVAT_GetPurInvoiceHeader = new Array<AQVAT_GetPurInvoiceHeader>();
    }
    public AVAT_TR_PurInvoice: Array<AVAT_TR_PurInvoice>;
    public AQVAT_GetPurInvoiceDetail: Array<AQVAT_GetPurInvoiceDetail>;
    public AQVAT_GetPurInvoiceHeader: Array<AQVAT_GetPurInvoiceHeader>;
}



class AQPurInvoiceRetMasterDetails {

    public AVAT_TR_PurInvoiceRet: AVAT_TR_PurInvoiceRet;
    public AQVAT_GetPurReturnDetail: Array<AQVAT_GetPurReturnDetail>;

}

class Account_CCDT_CCDTTP_MasterDetails {
    public A_CCDT_Types: A_CCDT_Types;
    public A_ACCOUNT: Array<A_ACCOUNT>;
    public A_CCDT_COSTCENTERS: Array<A_CCDT_COSTCENTERS>;

}
class A_CCDT_COSTCENTERS extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.CCDT_CODE = "";
        this.CCDT_TYPE = "";
        this.CCDT_DESCA = "";
        this.CCDT_DESCE = "";
        this.StatusFlag = "";
    }
    public COMP_CODE: number;
    public CCDT_CODE: string;
    public CCDT_TYPE: string;
    public CCDT_DESCA: string;
    public CCDT_DESCE: string;
    public StatusFlag: string;
}

class AVAT_PERIOD extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VAT_YEAR = 0;
        this.PERIOD_CODE = 0;
        this.FROM_DATE = "";
        this.TO_DATE = "";
        this.STATUS = 0;
        this.STATUS_txt = "";
        this.VOUCHER_CODE = 0;
        this.SALES_VAT = 0;
        this.PUR_VAT = 0;
        this.NETVAT_AMOUNT = 0;
        this.TOTALPERIODVAT = 0;
        this.CORRECTIONS = 0;
        this.VAT_PREVBALANCE = 0;
    }
    public COMP_CODE: number;
    public VAT_YEAR: number;
    public PERIOD_CODE: number;
    public FROM_DATE: string;
    public TO_DATE: string;
    public STATUS: number;
    public VOUCHER_CODE: number;
    public SALES_VAT: number;
    public PUR_VAT: number;
    public NETVAT_AMOUNT: number;
    public TOTALPERIODVAT: number;
    public CORRECTIONS: number;
    public VAT_PREVBALANCE: number;
    public STATUS_txt: string;
}

class AQVAT_GetPeriodDetail extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VAT_YEAR = 0;
        this.PERIOD_CODE = 0;
        this.TYPE = 0;
        this.CODE = 0;
        this.Val_Amount = 0;
        this.Upd_Amount = 0;
        this.VAT_Amount = 0;
        this.DESCRIPTION = "";
        this.VatPerc = 0;
        this.LineOrder = 0;
    }
    public COMP_CODE: number;
    public VAT_YEAR: number;
    public PERIOD_CODE: number;
    public TYPE: number;
    public CODE: number;
    public Val_Amount: number;
    public Upd_Amount: number;
    public VAT_Amount: number;
    public DESCRIPTION: string;
    public VatPerc: number;
    public LineOrder: number;
}

class AVAT_TRANS extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.SYSTEM_CODE = "";
        this.TRTYPE = "";
        this.TRDESCA = "";
        this.TRDESCE = "";
        this.SYSTEMDESCA = "";
        this.SYSTEMDESCE = "";
        this.SEC = 0;
        this.ISAVAILABLE = false;
    }
    public COMP_CODE: number;
    public SYSTEM_CODE: string;
    public TRTYPE: string;
    public TRDESCA: string;
    public TRDESCE: string;
    public SYSTEMDESCA: string;
    public SYSTEMDESCE: string;
    public SEC: number;
    public ISAVAILABLE: boolean;
}

class A_CashVoucher_Detail extends SecurityClass {
    constructor() {
        super();
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_SERIAL = 0;
        this.ACC_CODE = "";
        this.CC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.DESCL = "";
        this.DESCA = "";
        this.CCDT_CODE = "";
        this.INVOICE_NO = 0;
        this.DEBIT_FC = 0;
        this.CREDIT_FC = 0;
        this.StatusFlag = "";
    }
    public VoucherDetailID: number;
    public VoucherID: number;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_SERIAL: number;
    public ACC_CODE: string;
    public CC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public DESCL: string;
    public DESCA: string;
    public CCDT_CODE: string;
    public INVOICE_NO: number;
    public DEBIT_FC: number;
    public CREDIT_FC: number;
    public StatusFlag: string;
}

class A_CashVoucher_Header extends SecurityClass {
    constructor() {
        super();
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.TRType = 0;
        this.TYPE_CODE = 0;
        this.CheckType = 0;
        this.VOUCHER_DATE = "";
        this.VOUCHER_DESC = "";
        this.REF_CODE = "";
        this.VOUCHER_STATUS = 0;
        this.BENIFICIARY = "";
        this.ACC_CODE = "";
        this.AMOUNT = 0;
        this.CHECK_CODE = "";
        this.BANK = "";
        this.DEPOSIT_ACC_CODE = "";
        this.CheckStatus = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.POSTED_BY = "";
        this.POSTED_AT = "";
        this.DueDate = "";
    }
    public VoucherID: number;
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public TRType: number;
    public TYPE_CODE: number;
    public CheckType: number;
    public VOUCHER_DATE: string;
    public VOUCHER_DESC: string;
    public REF_CODE: string;
    public VOUCHER_STATUS: number;
    public BENIFICIARY: string;
    public ACC_CODE: string;
    public AMOUNT: number;
    public CHECK_CODE: string;
    public BANK: string;
    public DEPOSIT_ACC_CODE: string;
    public CheckStatus: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public POSTED_BY: string;
    public POSTED_AT: string;
    public DueDate: string;
}

class AQ_GetCashVoucherDetail extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_SERIAL = 0;
        this.ACC_CODE = "";
        this.CC_CODE = "";
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.DESCL = "";
        this.DESCA = "";
        this.CCDT_CODE = "";
        this.INVOICE_NO = 0;
        this.DEBIT_FC = 0;
        this.CREDIT_FC = 0;
        this.CC_DESCA = "";
        this.CC_DESCE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.CCDT_DESCA = "";
        this.CCDT_DESCE = "";
        this.StatusFlag = "";
    }
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_SERIAL: number;
    public ACC_CODE: string;
    public CC_CODE: string;
    public DEBIT: number;
    public CREDIT: number;
    public DESCL: string;
    public DESCA: string;
    public CCDT_CODE: string;
    public INVOICE_NO: number;
    public DEBIT_FC: number;
    public CREDIT_FC: number;
    public CC_DESCA: string;
    public CC_DESCE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public VoucherDetailID: number;
    public VoucherID: number;
    public CCDT_DESCA: string;
    public CCDT_DESCE: string;
    public StatusFlag: string;
}

class AQ_GetCashVoucherHeader extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = "";
        this.VOUCHER_DESC = "";
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = "";
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.POSTED_BY = "";
        this.POSTED_AT = "";
        this.TYPE_DESCA = "";
        this.TYPE_DESCE = "";
        this.St_DescE = "";
        this.St_DescA = "";
        this.VoucherID = 0;
        this.TRType = 0;
        this.CheckType = 0;
        this.BENIFICIARY = "";
        this.ACC_CODE = "";
        this.AMOUNT = 0;
        this.CHECK_CODE = "";
        this.BANK = "";
        this.DEPOSIT_ACC_CODE = "";
        this.CheckStatus = 0;
        this.DueDate = "";
        this.chkType_DescA = "";
        this.chkType_DescE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
    }
    public COMP_CODE: number;
    public VOUCHER_CODE: number;
    public VOUCHER_DATE: string;
    public VOUCHER_DESC: string;
    public VOUCHER_STATUS: number;
    public TYPE_CODE: number;
    public REF_CODE: string;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public POSTED_BY: string;
    public POSTED_AT: string;
    public TYPE_DESCA: string;
    public TYPE_DESCE: string;
    public St_DescE: string;
    public St_DescA: string;
    public VoucherID: number;
    public TRType: number;
    public CheckType: number;
    public BENIFICIARY: string;
    public ACC_CODE: string;
    public AMOUNT: number;
    public CHECK_CODE: string;
    public BANK: string;
    public DEPOSIT_ACC_CODE: string;
    public CheckStatus: number;
    public DueDate: string;
    public chkType_DescA: string;
    public chkType_DescE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
}


class AQ_GetCashVoucherHeaderWithDetail extends SecurityClass {
    constructor() {
        super();
        this.AQ_GetCashVoucherHeader = new Array<AQ_GetCashVoucherHeader>();
        this.AQ_GetCashVoucherDetail = new Array<AQ_GetCashVoucherDetail>();
    }

    public AQ_GetCashVoucherHeader: Array<AQ_GetCashVoucherHeader>;
    public AQ_GetCashVoucherDetail: Array<AQ_GetCashVoucherDetail>;
}

class CashVoucherMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.A_CashVoucher_Header = new A_CashVoucher_Header();
        this.A_CashVoucher_Detail = new Array<A_CashVoucher_Detail>();
    }
    public A_CashVoucher_Header: A_CashVoucher_Header;
    public A_CashVoucher_Detail: Array<A_CashVoucher_Detail>;
}


class Cal_AccountChart extends SecurityClass {
    constructor() {
        super();
        this.AccountId = 0;
        this.AccountCode
        this.AccountNameA = "";
        this.AccountNameE = "";
        this.mainAccountId = 0;
        this.AccountLevel = 0;
        this.AccountType = 0;
        this.AccountNature = 0;
        this.AccountGroup = 0;
        this.AccCashFlow = 0;
        this.CalcMethod = false;
        this.CurrencyId = 0;
        this.Aid = 0;
        this.AccBulkAccount = 0;
        this.AccountCategory = 0;
        this.CostCentersDistribute = false;
        this.CurrencyReevaluation = false;
        this.AccountStopped = false;
        this.RemarksA = "";
        this.RemarksE = "";
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
        this.AccApproxim = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
        this.CostCenterOption = 0;
        this.StatusFlag = "";
    }
    public AccountId: number;
    public AccountCode: any;
    public AccountNameA: string;
    public AccountNameE: string;
    public mainAccountId: number;
    public AccountLevel: number;
    public AccountType: number;
    public AccountNature: number;
    public AccountGroup: number;
    public AccCashFlow: number;
    public CalcMethod: boolean;
    public CurrencyId: number;
    public Aid: number;
    public AccBulkAccount: number;
    public AccountCategory: number;
    public CostCentersDistribute: boolean;
    public CurrencyReevaluation: boolean;
    public AccountStopped: boolean;
    public RemarksA: string;
    public RemarksE: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public AccApproxim: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public CostCenterOption: number;
    public StatusFlag: string;
}

class Cal_AccountUsers {
    constructor() {
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
    public AccUserId: number;
    public AccountId: number;
    public UserId: number;
    public ApprovedBy: number;
    public UserName: string;
    public Remarks1: string;
    public Remarks2: string;
    public TranAndView: boolean;
    public StatusFlag: string;
}
class MS_CurrencyCategory {
    constructor() {
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
    public CurrencyCategoryId: number;
    public code: string;
    public CurrencyCategoryNameA: string;
    public CurrencyCategoryNameE: string;
    public Aid: number;
    public Value: number;
    public RemarksA: string;
    public RemarksE: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_CurrencyCategoryJoin {
    constructor() {
        this.CurrencyCatJoinId = 0;
        this.CurrencyId = 0;
        this.CurrencyCategoryId = 0;
        this.CurrencyType = 0;
    }
    public CurrencyCatJoinId: number;
    public CurrencyId: number;
    public CurrencyCategoryId: number;
    public CurrencyType: number;
}
class MS_Currency {
    constructor() {
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
    public CurrencyId: number;
    public CurrencyCode: number;
    public CurrencyDescA: string;
    public CurrencyDescE: string;
    public Rate: number;
    public DefualtCurrency: boolean;
    public CurrencySymbol: string;
    public fractionalUnit: string;
    public DecimalPlaces: number;
    public CurrencyCategoryId: number;
    public CurrenctType: string;
    public singleCurencyname: string;
    public singleCurencyname2: string;
    public DoubleCurencyname: string;
    public DoubleCurencyname2: string;
    public CurrancyNameOverthree: string;
    public CurrancyNameOverthree2: string;
    public CollectionCurrencyName: string;
    public CollectionCurrencyName2: string;
    public singleCurencyFractionname: string;
    public singleCurencyFractionname2: string;
    public DoubleCurencyFractionname: string;
    public DoubleCurencyFractionname2: string;
    public CurrancyNameFractionOverthree: string;
    public CurrancyNameFractionOverthree2: string;
    public CollectionCurrencyFractionName: string;
    public CollectionCurrencyFractionName2: string;
    public singleCurencyTempname: string;
    public DoubleCurencyTempname: string;
    public CurrancyNameTempOver3: string;
    public CollectionCurrencyTempName: string;
    public Aid: number;
    public EquivalentConversionPrice: number;
    public LastModify: string;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Cod_AccountCategories {
    constructor() {
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
    public AccountCatId: number;
    public ParentAccountCatId: any;
    public Code: number;
    public DescA: string;
    public DescE: string;
    public AId: number;
    public AccountCatType: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public RemarksA: string;
    public RemarksE: string;
}

class Cod_AccountClassification {
    constructor() {
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
    public AccountClassId: number;
    public ParentAccountClassId: any;
    public Code: number;
    public DescA: string;
    public DescE: string;
    public AId: any;
    public AccountClassType: any;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public RemarksA: string;
    public RemarksE: string;
    public AccountCatId: any;
}


class MS_ItemCategory {
    constructor() {
        this.ItemCategoryId = 0;
        this.ItemCatCode = "";
        this.ItemCatDescA = "";
        this.ItemCatDescE = "";
        this.ParentItemCategoryId;
        this.ItemCategoryType = 0;
        this.ItemCategoryCatLevel = 0;
        this.CategoryImage
        this.CurrentTrNo = 0;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdateBy = "";
        this.UpdateAt = "";
        this.DeletedBy = "";
        this.DeletedAt = "";
    }
    public ItemCategoryId: number;
    public ItemCatCode: string;
    public ItemCatDescA: string;
    public ItemCatDescE: string;
    public ParentItemCategoryId: any;
    public ItemCategoryType: number;
    public ItemCategoryCatLevel: number;
    public CategoryImage: any;
    public CurrentTrNo: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MSGA_City {
    constructor() {
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
    public CityID: number;
    public CityCode: string;
    public CityName: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public Remarks: string;
    public DeletedAt: string;
    public SysCityID: number;
    public CountryId: number;
}

class Hr_Employees {
    constructor() {
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
        this.EmpImage
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
    public EmpId: number;
    public StoreId: number;
    public JobId: number;
    public DepartMentId: number;
    public HREmpGroupId: number;
    public PeriodTableId: number;
    public ShiftId: number;
    public CurrencyId: number;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public EmpCode: string;
    public DeviceEmpCode: string;
    public Name1: string;
    public Name2: string;
    public Qualification: string;
    public Gender: boolean;
    public MaritalStatus: number;
    public KidsNo: number;
    public Religion: number;
    public Nationality: number;
    public BirthDate: string;
    public Remarks: string;
    public IDNo: string;
    public IDIssueDate: string;
    public IDExpiryDate: string;
    public PassportNo: string;
    public PassportIssueDate: string;
    public PassportExpiryDate: string;
    public Car: string;
    public DrivingLicense: string;
    public DrivingIssueDate: string;
    public DrivingExpiryDate: string;
    public DrivingRenewalDate: string;
    public Phone1: string;
    public Phone2: string;
    public Phone3: string;
    public Email: string;
    public Address1: string;
    public Address2: string;
    public AnnualVacs: number;
    public ReservedVacs: number;
    public LastVacsUpdate: string;
    public AnnualVacsBalance: number;
    public ReservedVacsBalance: number;
    public MaxVacsBalance: number;
    public ContractType: boolean;
    public Attendance: boolean;
    public ContractSrtDate: string;
    public ContractEndDate: string;
    public WorkStartDate: string;
    public SocialSecurityID: string;
    public HealthInsID: string;
    public HealthInsEndDate: string;
    public syndicate: string;
    public syndicateID: string;
    public MilitaryService: number;
    public HourlyCostRate: number;
    public IsTechnician: boolean;
    public IsSales: boolean;
    public IsMoneyCollector: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public EmpImage: any;
    public IssueSalary: boolean;
    public DistributeSalary: boolean;
    public AutosalaryIssue: boolean;
    public BankName: string;
    public BankAccNo: string;
    public DailyCost: number;
    public HourlyCost: number;
    public TotalDailyCost: number;
    public TotalHourlyCost: number;
    public CommisionPercent: number;
    public CommisionCollectionPerc: number;
    public IsCommissionAfterDisc: boolean;
    public TaxRefNo: string;
    public EtaxCustType: string;
}



class Cal_CostCenters {
    constructor() {
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
    public CostCenterId: number;
    public CostCenterCode: number;
    public CostCenterNameA: string;
    public CostCenterNameE: string;
    public mainCostCenterId: number;
    public CostCenterLevel: number;
    public CenterCategory: number;
    public CostType: number;
    public CashFlowList: number;
    public Aid: number;
    public AccountId: number;
    public CurrencyId: number;
    public FunctionDescA: string;
    public FunctionDescE: string;
    public PreviousBalance: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public RemarksA: string;
    public RemarksE: string;
    public Parent: number;
    public MonthlybalanceId: number;
    public jopDesc: number;
    public BoxId: number;
    public AccCostCenterId: number;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public CostCenterCurrTrancDepit: number;
    public CostCenterCurrTrancCredit: number;
    public CostCenterTotalDebit: number;
    public CostCenterTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public CostCenterCurrTrancDepitCurncy: number;
    public CostCenterCurrTrancCreditCurncy: number;
    public CostCenterTotalDebitCurncy: number;
    public CostCenterTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
}



class MS_Customer {
    constructor() {
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
    public CustomerId: number;
    public CustomerCatId: number;
    public CustomerTypeId: number;
    public CurrencyId: number;
    public CityId: number;
    public EmpId: number;
    public CostCenterId: number;
    public CustomerCode: string;
    public CustomerDescA: string;
    public CustomerDescE: string;
    public IsActive: boolean;
    public IsTaxExempted: boolean;
    public CreditPeriod: number;
    public PeriodType: number;
    public CreditLimit: number;
    public CreditLimitAllowed: number;
    public Nationality: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public Email2: string;
    public Email3: string;
    public Email4: string;
    public Address: string;
    public Address1: string;
    public Address2: string;
    public Address3: string;
    public Remarks: string;
    public Tel2: string;
    public Tel3: string;
    public Tel4: string;
    public Tel5: string;
    public DateOfBirth: string;
    public PassPortNo: string;
    public PassPortIssueDate: string;
    public PassPortExpiryDate: string;
    public PassPortIssuePlace: string;
    public InternationalLicense: boolean;
    public CarLicenseNo: string;
    public CarLicenseIssueDate: string;
    public CarLicenseIssuePlace: string;
    public CarLicenseExpiryDate: string;
    public dtReg: string;
    public dtRegRenew: string;
    public Company: string;
    public CustJob: string;
    public CustID: string;
    public Barcode: number;
    public SalPrice: number;
    public AddField1: string;
    public AddField2: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public DefaultDisc: number;
    public ReportDiscValu: number;
    public DiscPercentOrVal: boolean;
    public ForAdjustOnly: boolean;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public StoreId: number;
    public TaxesId1: number;
    public TaxesId2: number;
    public TaxesId3: number;
    public IsDiscountByItem: boolean;
    public IsBlocked: boolean;
    public IsCreditEnabled: boolean;
    public IsPricIncludTax: boolean;
    public TaxExemptionNo: string;
    public TaxRefNo: string;
    public PrePaidPercent: number;
    public PostalCode: string;
    public HomePage: string;
    public InvoiceCopies: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_CustomerTypes {
    constructor() {
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
    public CustomerTypeId: number;
    public CustomerTypeCode: string;
    public CustomerTypeDescA: string;
    public CustomerTypeDescE: string;
    public CustomerTypeParent: any;
    public CustomerTypeLevel: number;
    public CustomerTypeLevelType: number;
    public CurrentTrNo: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_CustomerCategory {
    constructor() {
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
    public CustomerCatId: number;
    public CatCode: string;
    public CatDescA: string;
    public CatDescE: string;
    public ParentCustomerCatId: number;
    public CustomerCatParent: number;
    public CustomerCatLevel: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Cal_CustAccounts {
    constructor() {
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
    public StatusFlag: string;
    public CustAccountId: number;
    public AccountId: number;
    public CustomerId: number;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public AccountStopped: boolean;
    public AccountModel: string;
    public RemarksA: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public IsPrimeAccount: boolean;
    public IsInUse: boolean;
    public AccountDescription: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_CustomerBranches {
    constructor() {
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
    public StatusFlag: string;
    public CustBranchId: number;
    public CustomerId: number;
    public CustBranchCode: string;
    public CustBranchName1: string;
    public CustBranchName2: string;
    public Remarks: string;
    public CityID: number;
    public Address: string;
}

class Ms_CustomerContacts {
    constructor() {
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
    public StatusFlag: string;
    public CustContactId: number;
    public CustomerId: number;
    public AccountId1: number;
    public AccountId2: number;
    public AccountId3: number;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public CostCenterId3: number;
    public ContactCode: string;
    public CityId: number;
    public ContactName1: string;
    public ContactName2: string;
    public ContactPhone1: string;
    public ContactPhone2: string;
    public ContactPhone3: string;
    public ContactPhone4: string;
    public ContactPhone5: string;
    public ContactAddress1: string;
    public ContactAddress2: string;
    public ContactAddress3: string;
    public ContactEmail1: string;
    public ContactEmail2: string;
    public ContactEmail3: string;
    public IDNo: string;
    public PassPortNo: string;
    public Bank1: string;
    public Bank2: string;
    public Bank3: string;
    public BankAccNo1: string;
    public BankAccNo2: string;
    public BankAccNo3: string;
    public Remark1: string;
    public Remark2: string;
    public Isprimary: boolean;
}

class Ms_CusromerUsers {
    constructor() {
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
    public CustUserId: number;
    public CustomerId: number;
    public UserId: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public StatusFlag: string;
}

class Ms_CustImgs {
    constructor() {
        this.CustImgId = 0;
        this.CustomerId = 0;
        this.Image
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
    }
    public CustImgId: number;
    public CustomerId: number;
    public Image: any;
    public ImgDesc1: string;
    public ImgDesc2: string;
}


class MS_Vendor {
    constructor() {
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
    public VendorId: number;
    public VendorCatId: number;
    public VendorTypeId: number;
    public CurrencyId: number;
    public CostCenterId: number;
    public VendorCode: string;
    public VendorDescA: string;
    public VendorDescE: string;
    public IsActive: boolean;
    public IsTaxExempted: boolean;
    public CreditPeriodType: number;
    public CreditPeriod: number;
    public CreditLimit: number;
    public Tel: string;
    public Tel2: string;
    public Tel3: string;
    public Tel4: string;
    public Tel5: string;
    public Fax: string;
    public Email: string;
    public Email2: string;
    public Email3: string;
    public Email4: string;
    public Address: string;
    public Address1: string;
    public Address2: string;
    public Address3: string;
    public Remarks: string;
    public AddField1: string;
    public AddField2: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public Barcode: number;
    public ForAdjustOnly: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public CityId: number;
    public EmpId: number;
    public StoreId: number;
    public TaxesId1: number;
    public TaxesId2: number;
    public TaxesId3: number;
    public IsBlocked: boolean;
    public IsCreditEnabled: boolean;
    public IsPricIncludTax: boolean;
    public TaxExemptionNo: string;
    public TaxRefNo: string;
    public PrePaidPercent: number;
    public PostalCode: string;
    public HomePage: string;
    public InvoiceCopies: number;
    public dtReg: string;
    public dtRegRenew: string;
    public Company: string;
    public VendJob: string;
    public VendID: string;
}

class Ms_VendorTypes {
    constructor() {
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
    public VendorTypeId: number;
    public VendorTypeCode: string;
    public VendorTypeDescA: string;
    public VendorTypeDescE: string;
    public VendorTypeParent: any;
    public VendorTypeLevel: number;
    public VendorTypeLevelType: number;
    public CurrentTrNo: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_VendorCategory {
    constructor() {
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
    public VendorCatId: number;
    public CatCode: string;
    public CatDescA: string;
    public CatDescE: string;
    public ParentVendorCatId: number;
    public VendorCatParent: number;
    public VendorCatLevel: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Cal_VendAccounts {
    constructor() {
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
    public VendAccountId: number;
    public AccountId: number;
    public VendorId: number;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public AccountStopped: boolean;
    public AccountModel: string;
    public RemarksA: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public IsPrimeAccount: boolean;
    public IsInUse: boolean;
    public AccountDescription: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_VendorBranches {
    constructor() {
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
    public StatusFlag: string;
    public VendBranchId: number;
    public VendorId: number;
    public VendBranchCode: string;
    public VendBranchName1: string;
    public VendBranchName2: string;
    public Remarks: string;
    public CityID: number;
    public Address: string;
}

class Ms_VendorContacts {
    constructor() {
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
    public StatusFlag: string;
    public VendContactId: number;
    public VendorId: number;
    public AccountId1: number;
    public AccountId2: number;
    public AccountId3: number;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public CostCenterId3: number;
    public ContactCode: string;
    public CityId: number;
    public ContactName1: string;
    public ContactName2: string;
    public ContactPhone1: string;
    public ContactPhone2: string;
    public ContactPhone3: string;
    public ContactPhone4: string;
    public ContactPhone5: string;
    public ContactAddress1: string;
    public ContactAddress2: string;
    public ContactAddress3: string;
    public ContactEmail1: string;
    public ContactEmail2: string;
    public ContactEmail3: string;
    public IDNo: string;
    public PassPortNo: string;
    public Bank1: string;
    public Bank2: string;
    public Bank3: string;
    public BankAccNo1: string;
    public BankAccNo2: string;
    public BankAccNo3: string;
    public Remark1: string;
    public Remark2: string;
    public Isprimary: boolean;
}

class Ms_VendorUsers {
    constructor() {
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
    public StatusFlag: string;
    public VendUserId: number;
    public VendorId: number;
    public UserId: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_VendImgs {
    constructor() {
        this.VendImgId = 0;
        this.VendorId = 0;
        this.Image
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
    }
    public VendImgId: number;
    public VendorId: number;
    public Image: any;
    public ImgDesc1: string;
    public ImgDesc2: string;
}


class Hr_EmpSalaryTypes {
    constructor() {
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
    public EmpSalaryTypesId: number;
    public EmpId: number;
    public SalaryTypId: number;
    public SalaryValu: number;
    public DebitAccId: number;
    public CreditAccId: number;
    public DebitCostCenterId: number;
    public CreditCostCenterId: number;
    public DebitEmpAccountId: number;
    public CreditEmpAccountId: number;
}

class Cal_EmpAccounts {
    constructor() {
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
    public EmpAccountId: number;
    public AccountId: number;
    public EmpId: number;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public AccountStopped: boolean;
    public AccountModel: string;
    public RemarksA: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public IsPrimeAccount: boolean;
    public IsInUse: boolean;
    public AccountDescription: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Hr_Jobs {
    constructor() {
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
    public JobId: number;
    public DepartMentId: number;
    public JCode: string;
    public JName1: string;
    public JName2: string;
    public JDesc: string;
    public JResponsibilities: string;
    public JDuties: string;
    public JQualifications: string;
    public Remarks: string;
    public Add1: string;
    public ParentId: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public StandardMonthlyWage: number;
    public StandardHolyDays: number;
    public StandardDailyWage: number;
    public StandardDailyWorkHours: number;
    public StandardHourlyWage: number;
    public NumberAvailable: number;
}

class Hr_Departments {
    constructor() {
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
    public DepartMentId: number;
    public DepartCode: string;
    public DepartName1: string;
    public DepartName2: string;
    public DepartTask: string;
    public Remarks: string;
    public ParentId: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}



class G_SearchForm extends SecurityClass {
    constructor() {
        super();
        this.SearchFormCode = "";
        this.ReturnDataPropertyName = "";
        this.Description = "";
        this.SerachFormTitle = "";
        this.IsFullScreen = false;
        this.Left = 0;
        this.Top = 0;
        this.Height = 0;
        this.Width = 0;
        this.PageSize = 0;
        this.DataSourceName = "";
        this.SearchInterval = 0;
        this.SerachFormTitleA = "";
    }
    public SearchFormCode: string;
    public ReturnDataPropertyName: string;
    public Description: string;
    public SerachFormTitle: string;
    public IsFullScreen: boolean;
    public Left: number;
    public Top: number;
    public Height: number;
    public Width: number;
    public PageSize: number;
    public DataSourceName: string;
    public SearchInterval: number;
    public SerachFormTitleA: string;
}

class G_SearchFormModule extends SecurityClass {
    constructor() {
        super();
        this.SystemCode = "";
        this.SubSystemCode = "";
        this.ModuleCode = "";
        this.ControlCode = "";
        this.SearchFormCode = "";
    }
    public SystemCode: string;
    public SubSystemCode: string;
    public ModuleCode: string;
    public ControlCode: string;
    public SearchFormCode: string;
}

class G_SearchFormSetting extends SecurityClass {
    constructor() {
        super();
        this.StatusFlag = "";
        this.SearchFormSettingID = 0;
        this.SearchFormCode = "";
        this.FieldSequence = 0;
        this.DataMember = "";
        this.AlternateDataMember = "";
        this.FieldTitle = "";
        this.IsReadOnly = false;
        this.Datatype = 0;
        this.FieldWidth = 0;
        this.UseSelectionOperator = false;
        this.Language = 0;
        this.FieldTitleA = "";
        this.IsSearchable = false;
    }
    public StatusFlag: string;
    public SearchFormSettingID: number;
    public SearchFormCode: string;
    public FieldSequence: number;
    public DataMember: string;
    public AlternateDataMember: string;
    public FieldTitle: string;
    public IsReadOnly: boolean;
    public Datatype: number;
    public FieldWidth: number;
    public UseSelectionOperator: boolean;
    public Language: number;
    public FieldTitleA: string;
    public IsSearchable: boolean;
}

class Hr_SalaryTypes {
    constructor() {
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
    public SalaryTypId: number;
    public AttendElementId: number;
    public SalaryCalcMethod: number;
    public SalaryCode: string;
    public Name1: string;
    public Name2: string;
    public SalaryValu: number;
    public UseType: number;
    public AffectType: number;
    public ImplementScale: number;
    public ParentRelation: number;
    public Multiply: number;
    public Devide: number;
    public Approximation: number;
    public MaximumVal: number;
    public MinimumVal: number;
    public DebitAccFilter: number;
    public DebitAccId: number;
    public CreditAccFilter: number;
    public CreditAccId: number;
    public DebitCostCenterFilter: number;
    public DebitCostCenterId: number;
    public CreditCostCenterFilter: number;
    public CreditCostCenterId: number;
    public LargerThanZero: boolean;
    public CanDelet: boolean;
    public AutoIssue: boolean;
    public CanEdit: boolean;
    public Distributable: boolean;
    public IsBasicsalary: boolean;
    public Indmnity: number;
    public Taxation: number;
    public SocialSecurity: number;
    public ElementCount: number;
    public ElementCountDesc: string;
    public UseElementOrUnit: boolean;
    public Equation: string;
    public IsAnnualSegment: boolean;
    public AnnualPeriods: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Hr_Shifts {
    constructor() {
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
    public ShiftId: number;
    public ShiftCode: string;
    public Name1: string;
    public Name2: string;
    public Day1Name1: string;
    public Day1Name2: string;
    public Day2Name1: string;
    public Day2Name2: string;
    public Day3Name1: string;
    public Day3Name2: string;
    public Day4Name1: string;
    public Day4Name2: string;
    public Day5Name1: string;
    public Day5Name2: string;
    public Day6Name1: string;
    public Day6Name2: string;
    public Day7Name1: string;
    public Day7Name2: string;
    public Day1Type: boolean;
    public Day2Type: boolean;
    public Day3Type: boolean;
    public Day4Type: boolean;
    public Day5Type: boolean;
    public Day6Type: boolean;
    public Day7Type: boolean;
    public FirstShfDay1tFrom: string;
    public FirstShftDay1To: string;
    public FirstShftDay2From: string;
    public FirstShftDay2To: string;
    public FirstShftDay3From: string;
    public FirstShftDay3To: string;
    public FirstShftDay4From: string;
    public FirstShftDay4To: string;
    public FirstShftDay5From: string;
    public FirstShftDay5To: string;
    public FirstShftDay6From: string;
    public FirstShftDay6To: string;
    public FirstShftDay7From: string;
    public FirstShftDay7To: string;
    public SecondShftDay1From: string;
    public SecondShftDay1To: string;
    public SecondShftDay2From: string;
    public SecondShftDay2To: string;
    public SecondShftDay3From: string;
    public SecondShftDay3To: string;
    public SecondShftDay4From: string;
    public SecondShftDay4To: string;
    public SecondShftDay5From: string;
    public SecondShftDay5To: string;
    public SecondShftDay6From: string;
    public SecondShftDay6To: string;
    public SecondShftDay7From: string;
    public SecondShftDay7To: string;
    public ThirdShftDay1From: string;
    public ThirdShftDay1To: string;
    public ThirdShftDay2From: string;
    public ThirdShftDay2To: string;
    public ThirdShftDay3From: string;
    public ThirdShftDay3To: string;
    public ThirdShftDay4From: string;
    public ThirdShftDay4To: string;
    public ThirdShftDay5From: string;
    public ThirdShftDay5To: string;
    public ThirdShftDay6From: string;
    public ThirdShftDay6To: string;
    public ThirdShftDay7From: string;
    public ThirdShftDay7To: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Hr_PeriodsTables {
    constructor() {
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
    public PeriodTableId: number;
    public PeriodCode: string;
    public Name1: string;
    public Name2: string;
    public AttendanceMachin: boolean;
    public ShiftId: number;
    public PeriodsNum: number;
    public PeriodType: number;
    public TableStartDate: string;
    public TableEndDate: string;
    public FirstDayWork: string;
    public PeriodWorkDays: number;
    public DailyWorkHours: number;
    public SubPeriodCount: number;
    public SubPeriodType: number;
    public RoundingMethod: number;
    public WorkDayShowElementId: number;
    public WorkDayNoShowElementId: number;
    public Shift1ShowElementId: number;
    public Shift1NoShowElementId: number;
    public Shift2ShowElementId: number;
    public Shift2NoShowElementId: number;
    public Shift3ShowElementId: number;
    public Shift3NoShowElementId: number;
    public LateArrivalElementId: number;
    public LateArrivalUnit: string;
    public LateArrivalRound: number;
    public LateArrivalMinVal: number;
    public EarlyLeaveElementId: number;
    public EarlyLeaveUnit: string;
    public EarlyLeaveRound: number;
    public EarlyLeaveMinVal: number;
    public EarlyAttendElementId: number;
    public EarlyAttendUnit: string;
    public EarlyAttendRound: number;
    public EarlyAttendMinVal: number;
    public WorkdayOvertimeElementId: number;
    public WorkdayOvertimeUnit: string;
    public WorkdayOvertimeRound: number;
    public WorkdayOvertimeMinVal: number;
    public VacationOvertimeElementId: number;
    public VacationOvertimeUnit: string;
    public VacationOvertimeRound: number;
    public VacationOvertimeMinVal: number;
    public WeekendOvertimeElementId: number;
    public WeekendOvertimeUnit: string;
    public WeekendOvertimeRound: number;
    public WeekendOvertimeMinVal: number;
    public WrkOvrTimAfterDismis: number;
    public WeekEndOvrTimAftrDismis: number;
    public VacOvrTimAftrDismis: number;
    public AcceptShiftVacs: boolean;
    public AcceptShiftHours: boolean;
    public ShiftNotAcheived: boolean;
    public AcceptShftBeforDismis: boolean;
    public CutLateTimFromOverTime: boolean;
    public CancelEarlyLeave: boolean;
    public CalcEarlyLeaveWeekEnd: boolean;
    public CalcEarlyLeaveVacation: boolean;
    public CalcLateAttendWeekEnd: boolean;
    public CalcLateAttendVacation: boolean;
    public WeekEndWorkDayElementId: number;
    public WeekEndWorkUnit: string;
    public WeekEndWorkRound: number;
    public WeekEndWorkMinVal: number;
    public VacationWorkDayElementId: number;
    public VacationWorkUnit: string;
    public VacationWorkRound: number;
    public VacationWorkMinVal: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Hr_EmpDocuments {
    constructor() {
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
    public EmpDocId: number;
    public EmpDocTypId: number;
    public StoreId: number;
    public BookId: number;
    public TermId: number;
    public FinancialIntervalsId: number;
    public AId: number;
    public EmpId: number;
    public EmpApprovedById: number;
    public TrNo: number;
    public ManualTrNo: string;
    public TrDate: string;
    public FromDate: string;
    public ToDate: string;
    public IssuePlace: string;
    public IssueDate: string;
    public ExpiryDate: string;
    public Remarks1: string;
    public Remarks2: string;
    public Remarks3: string;
    public Closed: boolean;
    public IsPrinted: boolean;
    public IsDelivered: boolean;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public CloseDate: string;
    public UncloseDate: string;
    public ClosedBy: number;
    public UnclosedBy: number;
    public PermPrinted: number;
    public PermPrintedAt: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_CurrencyRate {
    constructor() {
        this.EqualCurrencyPriceId = 0;
        this.CurrencyId = 0;
        this.EquivalentCurrencyId = 0;
        this.Rate = 0;
        this.LastModify = "";
    }
    public EqualCurrencyPriceId: number;
    public CurrencyId: number;
    public EquivalentCurrencyId: number;
    public Rate: number;
    public LastModify: string;
}

class Cal_JurnalDetail {
    constructor() {
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
    public JurnalDetailId: number;
    public JurnalId: number;
    public AId: number;
    public AccountId: number;
    public CustAccountId: number;
    public VendAccountId: number;
    public EmpAccountId: number;
    public AssetAccountId: number;
    public BusinessPartnerAccId: number;
    public CostCenterId: number;
    public CostCenterId1: number;
    public CostCenterId2: number;
    public CostCenterId3: number;
    public CostCenterId4: number;
    public Rate: number;
    public JurDesc: string;
    public DebitCurrency: number;
    public CreditCurrency: number;
    public CurrencyId: number;
    public DebitLocal: number;
    public CreditLocal: number;
    public Remarks: string;
    public StatusFlag: string;
}

class Cal_JurnalEntry {
    constructor() {
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
    public JurnalId: number;
    public StorId: number;
    public TermId: number;
    public BookId: number;
    public AdjustId: number;
    public BoxTranId: number;
    public DeliverId: number;
    public PurInvId: number;
    public RectId: number;
    public RetPurchId: number;
    public RetSaleId: number;
    public InvId: number;
    public StockRecId: number;
    public TranId: number;
    public PayId: number;
    public StockAdjustId: number;
    public Tr_OpenningBalanceId: number;
    public KeeperId: number;
    public BankNoticId: number;
    public PettycashId: number;
    public PurOrderId: number;
    public SalesOfferId: number;
    public SalesOrderId: number;
    public ReservId: number;
    public SalaryIssuDocId: number;
    public DeprDocId: number;
    public AssetTerminatId: number;
    public AssetAddId: number;
    public AssetDeductId: number;
    public DeliverAssetId: number;
    public FixAssetId: number;
    public AssetMovId: number;
    public ReceiveAssetId: number;
    public JOrderEmpDocId: number;
    public JOrderEquipDocId: number;
    public JOrderClosId: number;
    public LetOfGrnteeTranId: number;
    public VJOrderId: number;
    public TranReqId: number;
    public Aid: number;
    public FinancialIntervalsId: number;
    public TrNo: number;
    public ManualTrNo: string;
    public TrDate: string;
    public JurnalDesc: string;
    public TotalDebit: number;
    public TotalCredit: number;
    public IsOpenning: boolean;
    public IsManual: boolean;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public TotalInvoices: number;
    public NotPaidInvoices: number;
    public DifferenceInvoices: number;
    public ResourceBalance: number;
    public IsPaid: boolean;
    public PaidDocId: number;
    public NotPaid: number;
    public TermCostCenterId: number;
    public TermCostCenterValue: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class VW_SearchAllAccounts {
    constructor() {
        this.AccountCode = "";
        this.AccountNameA = "";
        this.AccountLevel = 0;
        this.CalcMethod = false;
        this.AccType = 0;
        this.AccDesc
        this.BalanceDebitCurncy = 0;
        this.BalanceCreditCurncy = 0;
        this.AccountType = 0;
        this.AccountNature = 0;
        this.AccountGroup = 0;
        this.AccCashFlow = 0;
        this.CurrencyId = 0;
        this.AccDesc2
        this.AccountDescription = "";
    }
    public AccountCode: string;
    public AccountNameA: string;
    public AccountLevel: number;
    public CalcMethod: boolean;
    public AccType: number;
    public AccDesc: any;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public AccountType: number;
    public AccountNature: number;
    public AccountGroup: number;
    public CurrencyId: number;
    public AccCashFlow: number;
    public AccDesc2: any;
    public AccountDescription: string;
}

class Cal_AssetAccounts {
    constructor() {
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
    public AssetAccountId: number;
    public AccountId: number;
    public AssetId: number;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public AccountStopped: boolean;
    public AccountModel: string;
    public RemarksA: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public IsPrimeAccount: boolean;
    public IsInUse: boolean;
    public AccountDescription: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Cal_BusinessPartnerAccounts {
    constructor() {
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
    public BusinessPartnerAccId: number;
    public BSPartnerId: number;
    public TableCode: string;
    public TableEntityId: number;
    public AccountId: number;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
    public AccountStopped: boolean;
    public AccountModel: string;
    public RemarksA: string;
    public OpenningBalanceDepit: number;
    public OpenningBalanceCredit: number;
    public AccCurrTrancDepit: number;
    public AccCurrTrancCredit: number;
    public AccTotalDebit: number;
    public AccTotaCredit: number;
    public BalanceDebitLocal: number;
    public BalanceCreditLocal: number;
    public OpenningBalanceDepitCurncy: number;
    public OpenningBalanceCreditCurncy: number;
    public AccCurrTrancDepitCurncy: number;
    public AccCurrTrancCreditCurncy: number;
    public AccTotalDebitCurncy: number;
    public AccTotaCreditCurncy: number;
    public BalanceDebitCurncy: number;
    public BalanceCreditCurncy: number;
    public IsPrimeAccount: boolean;
    public IsInUse: boolean;
    public AccountDescription: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Cal_Clauses {
    constructor() {
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
    public ClausesId: number;
    public AccountId: number;
    public ClausesCode: string;
    public NameAr: string;
    public NameEn: string;
    public Percentage: number;
    public Debtor: number;
    public Creditor: number;
    public Balance: number;
    public StatusFlag: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_Terms {
    constructor() {
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
    public TermId: number;
    public TermCode: string;
    public TermName: string;
    public TermType: number;
    public BookId: number;
    public SystemIssuedOnly: boolean;
    public JournalEntryBookId: number;
    public JournalEntryTermId: number;
    public InventoryBookId: number;
    public InventoryTermId: number;
    public IsOpenningTerm: boolean;
    public CashOrCredit: boolean;
    public IsStopped: boolean;
    public IsDefaultTerm: boolean;
    public UseItemTax: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_TermsCostCenter {
    constructor() {
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
    public TermCostCenterId: number;
    public TermId: number;
    public CostCenterIdDebit: number;
    public CostCenterDebitFixed: boolean;
    public ValuCostCenterDebit: string;
    public CostCenterCredit: number;
    public CostCenterCreditFixed: boolean;
    public ValuCostCenterCredit: string;
    public CostCenterIdDisc: number;
    public CostCenterDiscIsFixed: boolean;
    public ValuCostCenterDisc: string;
    public CostCenterIdCash: number;
    public CostCenterCashIsFixed: boolean;
    public ValuCostCenterCash: string;
    public CostCenterIdTax: number;
    public CostCenterTaxIsFixed: boolean;
    public ValuCostCenterTax: string;
    public CenterDiscDebitOrCredit: boolean;
    public CenterCashDebitOrCredit: boolean;
    public CenterTaxDebitOrCredit: boolean;
    public AddCostCenterId1: number;
    public AddCostCenter1IsFixed: boolean;
    public ValuAddCostCenter1: string;
    public AddCostCenterId2: number;
    public AddCostCenterIsFixed2: boolean;
    public ValuAddCostCenter2: string;
    public AddCostCenterId3: number;
    public AddCostCenterIsFixed3: boolean;
    public ValuAddCostCenter3: string;
    public AddCostCenterId4: number;
    public AddCostCenterIsFixed4: boolean;
    public ValuAddCostCenter4: string;
    public AddCostCenterId5: number;
    public AddCostCenterIsFixed5: boolean;
    public ValuAddCostCenter5: string;
    public AddCenter1DebitOrCredit: boolean;
    public AddCenter2DebitOrCredit: boolean;
    public AddCenter3DebitOrCredit: boolean;
    public AddCenter4DebitOrCredit: boolean;
    public AddCenter5DebitOrCredit: boolean;
}

class Ms_TermsDetails {
    constructor() {
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
    public TermDetailId: number;
    public TermId: number;
    public AccountIdDebit: number;
    public AccountDebitFixed: number;
    public CostCenterIdDebit: number;
    public CostCenterDebitFixed: number;
    public ValuAccountDebit: string;
    public AccountIdCredit: number;
    public AccountCreditFixed: number;
    public CostCenterIdCredit: number;
    public CostCenterCreditFixed: number;
    public ValuAccountCredit: string;
    public AccountIdDisc: number;
    public AccountDiscIsFixed: number;
    public CostCenterIdDisc: number;
    public CostCenterDiscIsFixed: number;
    public ValuAccountDisc: string;
    public AccountIdCash: number;
    public AccountCashIsFixed: number;
    public CostCenterIdCash: number;
    public CostCenterCashIsFixed: number;
    public ValuAccountCash: string;
    public AccountIdTax: number;
    public AccountTaxIsFixed: number;
    public CostCenterIdTax: number;
    public CostCenterTaxIsFixed: number;
    public ValuAccountTax: string;
    public AccDiscDebitOrCredit: boolean;
    public AccCashDebitOrCredit: boolean;
    public AccTaxDebitOrCredit: boolean;
    public AddAccountId1: number;
    public AddAccount1IsFixed: number;
    public AddCostCenterId1: number;
    public AddCostCenter1IsFixed: number;
    public ValuAddAccount1: string;
    public AddAccountId2: number;
    public AddAccountIsFixed2: number;
    public AddCostCenterId2: number;
    public AddCostCenterIsFixed2: number;
    public ValuAddAccount2: string;
    public AddAccountId3: number;
    public AddAccountIsFixed3: number;
    public AddCostCenterId3: number;
    public AddCostCenterIsFixed3: number;
    public ValuAddAccount3: string;
    public AddAccountId4: number;
    public AddAccountIsFixed4: number;
    public AddCostCenterId4: number;
    public AddCostCenterIsFixed4: number;
    public ValuAddAccount4: string;
    public AddAccountId5: number;
    public AddAccountIsFixed5: number;
    public AddCostCenterId5: number;
    public AddCostCenterIsFixed5: number;
    public ValuAddAccount5: string;
    public AddAcc1DebitOrCredit: boolean;
    public AddAcc2DebitOrCredit: boolean;
    public AddAcc3DebitOrCredit: boolean;
    public AddAcc4DebitOrCredit: boolean;
    public AddAcc5DebitOrCredit: boolean;
    public AnalaticalCodeMust: boolean;
}

class Sys_Books {
    constructor() {
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
    public BookId: number;
    public PrefixCode: string;
    public BookNameAR: string;
    public BookNameEN: string;
    public TermType: number;
    public UserId: number;
    public StoreId: number;
    public AutoSerial: boolean;
    public SystemIssuedOnly: boolean;
    public IsDefault: boolean;
    public StartNum: number;
    public EndNum: number;
    public PostType: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_BoxCurrency{
    constructor() {
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
    public BoxCurrencyId: number;
    public CurrencyId: number;
    public BoxId: number;
    public AccountId: number;
    public AccountChrtId: number;
    public RetAccountId: number;
    public BankExpensAccId: number;
    public ChequndercollectId: number;
    public StatusFlag: string;
    public CurrencyCode: number;
    public CurrencyDescA: string;
    public CurrencyDescE: string;
    public Rate: string;
}

class Ms_BoxUsers {
    constructor() {
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
    public BoxUsersId: number;
    public BoxId: number;
    public UserId: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public USER_NAME: string;
    public FirstName: string;
    public USER_CODE: string;
    public StatusFlag: string;
}

class MS_Taxes {
    constructor() {
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
    public TaxesId: number;
    public TaxCode: string;
    public TaxNameA: string;
    public TaxNameE: string;
    public TaxStyle: number;
    public TaxRate: number;
    public Remarks: string;
    public AccountId: number;
    public IsAccomulative: boolean;
    public PlusOrMinus: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public EtaxCode: string;
}

class Sys_Counter {
    constructor() {
        this.CounterId = 0;
        this.TrIdName = "";
        this.Counter = 0;
        this.BookId = 0;
    }
    public CounterId: number;
    public TrIdName: string;
    public Counter: number;
    public BookId: number;
}

class Sys_FinancialIntervals {
    constructor() {
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
    public FinancialIntervalsId: number;
    public FinancialIntervalCode: string;
    public MonthNameA: string;
    public MonthNameE: string;
    public StartingFrom: string;
    public StartingFromHijri: string;
    public EndingDate: string;
    public EndToHijri: string;
    public IsClosed: boolean;
    public IsActive: boolean;
    public IsInUse: boolean;
    public StopReason: string;
    public StoppedByUserId: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public FinancialYearId: number;
}

class Sys_FinancialYears {
    constructor() {
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
    public FinancialYearsId: number;
    public FinancialYearsCode: number;
    public FinancialYearNameA: string;
    public FinancialYearNameE: string;
    public StartingFrom: string;
    public StartingFromHijri: string;
    public EndTo: string;
    public EndToHijri: string;
    public ClosingDate: string;
    public ClosingDateHijri: string;
    public YearState: string;
    public NoOfIntervals: number;
    public YearType: boolean;
    public SubPeriodsType: number;
    public IsClosed: boolean;
    public IsActive: boolean;
    public StopReason: string;
    public StoppedByUserId: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_Expenses {
    constructor() {
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
    public ExpensesId: number;
    public ExpensesCode: string;
    public ExpensesDescA: string;
    public ExpensesDescE: string;
    public ExpensesType: number;
    public ExpensesValue: number;
    public AccountId: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}
class Sr_VehicleTypes {
    constructor() {
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
    public VehicleTypId: number;
    public TypeCode: string;
    public Name1: string;
    public Name2: string;
    public Remark: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}
class Sr_VehicleShapes {
    constructor() {
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
    public VehicleShapeId: number;
    public ShapeCode: string;
    public Name1: string;
    public Name2: string;
    public Remark: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Prod_Equipments {
    constructor() {
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
    public EquipId: number;
    public EquipCode: string;
    public EquipName1: string;
    public EquipName2: string;
    public JDesc: string;
    public Remarks: string;
    public StandardMonthlyCost: number;
    public StandardHolyDays: number;
    public StandardDailyCost: number;
    public StandardDailyWorkHours: number;
    public StandardHourlyCost: number;
    public NumberAvailable: number;
    public TimeRate: number;
    public BasUnitId: number;
    public QtyPerUnit: number;
    public IsScale: number;
    public MaxWeight: number;
    public MinWeight: number;
    public TechnicalSpecs: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_ReceiptNote {
    constructor() {
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
    public RectId: number;
    public InvId: number;
    public RetPurId: number;
    public BoxId: number;
    public CurrencyId: number;
    public CustomerId: number;
    public StoreId: number;
    public BookId: number;
    public TermId: number;
    public EmpId: number;
    public CollectorId: number;
    public KeeperId: number;
    public ChequeOpenId: number;
    public BankNoticId: number;
    public ReservId: number;
    public InstallDates: string;
    public FinancialIntervalsId: number;
    public TripId: number;
    public DBTableName: string;
    public DBTableId: number;
    public AccountTableName: string;
    public AccountId: number;
    public AId: number;
    public TrNo: number;
    public ManualTrNo: string;
    public TrDate: string;
    public TranType: number;
    public RectSourceType: number;
    public OtherSource: string;
    public Rate: number;
    public PaidPrice: number;
    public NetPrice: number;
    public Commision: number;
    public ValueBeforeRate: number;
    public Value1: number;
    public Value1BeforeRate: number;
    public Value2: number;
    public Value2BeforeRate: number;
    public Value3: number;
    public Value3BeforeRate: number;
    public Value4: number;
    public Value4BeforeRate: number;
    public Value5: number;
    public Value5BeforeRate: number;
    public Value6: number;
    public Value6BeforeRate: number;
    public Value7: number;
    public Value7BeforeRate: number;
    public Value8: number;
    public Value8BeforeRate: number;
    public Value9: number;
    public Value9BeforeRate: number;
    public Value10: number;
    public Value10BeforeRate: number;
    public Equation: string;
    public CheckNumber: string;
    public BankAccNumber: string;
    public DueDate: string;
    public PaidDate: string;
    public CheckType: number;
    public Remarks: string;
    public IsPrinted: boolean;
    public LastUpdate: string;
    public ClientAccNo: string;
    public ClientBankId: number;
    public strCustm1: string;
    public strCustm2: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public AddField6: string;
    public AddField7: string;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public CheqBookId: number;
    public NoteNum: number;
    public IsKembiala: boolean;
    public Closed: boolean;
    public CloseDate: string;
    public UncloseDate: string;
    public ClosedBy: number;
    public UnclosedBy: number;
    public ReturnDate: string;
    public ChequOwnerId: boolean;
    public OwnerTranId: number;
    public ChequeTran: string;
    public TotalInvoices: number;
    public NotPaidInvoices: number;
    public DifferenceInvoices: number;
    public ResourceBalance: number;
    public IsPaid: boolean;
    public PaidDocId: number;
    public NotPaid: number;
    public TermCostCenterId: number;
    public TermCostCenterValue: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_PaymentNote {
    constructor() {
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
    public PayId: number;
    public PurInvId: number;
    public RetSaleId: number;
    public BoxId: number;
    public CurrencyId: number;
    public VendorId: number;
    public StoreId: number;
    public EmpId: number;
    public CustodyEmpId: number;
    public BookId: number;
    public TermId: number;
    public ChequeOpenId: number;
    public ExpensesId: number;
    public BankNoticId: number;
    public FinancialIntervalsId: number;
    public TripId: number;
    public DBTableName: string;
    public DBTableId: number;
    public AccountTableName: string;
    public AccountId: number;
    public AId: number;
    public TrNo: number;
    public ManualTrNo: string;
    public TrDate: string;
    public TranType: number;
    public RectSourceType: number;
    public OtherSource: string;
    public Rate: number;
    public PaidPrice: number;
    public NetPrice: number;
    public ValueBeforeRate: number;
    public Value1: number;
    public Value1BeforeRate: number;
    public Value2: number;
    public Value2BeforeRate: number;
    public Value3: number;
    public Value3BeforeRate: number;
    public Value4: number;
    public Value4BeforeRate: number;
    public Value5: number;
    public Value5BeforeRate: number;
    public Value6: number;
    public Value6BeforeRate: number;
    public Value7: number;
    public Value7BeforeRate: number;
    public Value8: number;
    public Value8BeforeRate: number;
    public Value9: number;
    public Value9BeforeRate: number;
    public Value10: number;
    public Value10BeforeRate: number;
    public Equation: string;
    public CheckNumber: string;
    public BankAccNumber: string;
    public DueDate: string;
    public PaidDate: string;
    public CheckType: number;
    public strCustm1: string;
    public strCustm2: string;
    public Remarks: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public AddField6: string;
    public AddField7: string;
    public IsPrinted: boolean;
    public LastUpdate: string;
    public IsPettyCash: boolean;
    public CheqBookId: number;
    public NoteNum: number;
    public IsKembiala: boolean;
    public Closed: boolean;
    public CloseDate: string;
    public UncloseDate: string;
    public ClosedBy: number;
    public UnclosedBy: number;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public TotalInvoices: number;
    public NotPaidInvoices: number;
    public DifferenceInvoices: number;
    public ResourceBalance: number;
    public IsPaid: boolean;
    public PaidDocId: number;
    public NotPaid: number;
    public TermCostCenterId: number;
    public TermCostCenterValue: number;
    public TotalItems: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Ms_ReceiptNoteCurrencies {
    constructor() {
        this.RecCurId = 0;
        this.RectId = 0;
        this.CurrencyCategoryId = 0;
        this.Value = 0;
        this.Count = 0;
        this.Price = 0;
        this.Total = 0;
    }
    public RecCurId: number;
    public RectId: number;
    public CurrencyCategoryId: number;
    public Value: number;
    public Count: number;
    public Price: number;
    public Total: number;
}

class BNk_BankNotice {
    constructor() {
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
    public BankNoticId: number;
    public StoreId: number;
    public CurrencyId: number;
    public TermId: number;
    public BookId: number;
    public FinancialIntervalsId: number;
    public AId: number;
    public TrNo: number;
    public TrDate: string;
    public KeeperNo: string;
    public BoxId: number;
    public AccountId: number;
    public IsReceived: boolean;
    public RefNo: number;
    public Remarks: string;
    public TotalCheques: number;
    public PaperDirection: boolean;
    public TranType: number;
    public BankExpenses: number;
    public TermCostCenterId: number;
    public TermCostCenterValue: number;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public Closed: boolean;
    public CloseDate: string;
    public UncloseDate: string;
    public ClosedBy: number;
    public UnclosedBy: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}


class ConnectionObj {
    constructor() {
        this.ConnectionNumber = 0;
        this.ServerName = "";
        this.IntegratedSecurity = false;
        this.DbUserName = "";
        this.DbPassword = "";
        this.InitialCatalog = "";
        this.singleDb = "";
        this.Url = "";
    }
    public ConnectionNumber: number;
    public ServerName: string;
    public IntegratedSecurity: boolean;
    public DbUserName: string;
    public DbPassword: string;
    public InitialCatalog: string;
    public singleDb: string;
    public Url: string;
}

class Asset_AssetCard {
    constructor() {
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
    public AssetId: number;
    public AssetCatId: number;
    public CurrencyId: number;
    public CostCenterId: number;
    public CostCenterId2: number;
    public CostCenterId3: number;
    public DepartMentId: number;
    public StoreId: number;
    public CurrentEmpId: number;
    public AssetCode: string;
    public Name1: string;
    public Name2: string;
    public NoDepreciation: boolean;
    public Status: number;
    public PurchDate: string;
    public PurchDoc: string;
    public VendorDesc: string;
    public SerialNo: string;
    public WarrantyTerms: string;
    public WarrantyDate: string;
    public WarrantyNo: string;
    public InsuranceExpiry: string;
    public ResponsiblePerson: string;
    public MarketPrice: number;
    public Barcode: number;
    public PurchPrice: number;
    public LastDeprDate: string;
    public DeprStartDate: string;
    public DeprInstallmentVal: number;
    public InstallMentCount: number;
    public RemainInstallments: number;
    public DeprMethod: number;
    public ProductivPeriod: number;
    public CurrentBookValue: number;
    public JunkValue: number;
    public IsProduction: boolean;
    public EquipId: number;
    public CarLicenseNo: string;
    public CarLicenseIssueDate: string;
    public CarLicenseIssuePlace: string;
    public CarLicenseExpiryDate: string;
    public dtReg: string;
    public dtRegRenew: string;
    public Address: string;
    public Address1: string;
    public Address2: string;
    public Address3: string;
    public Remarks: string;
    public Tel: string;
    public Tel2: string;
    public Tel3: string;
    public Tel4: string;
    public Tel5: string;
    public Fax: string;
    public Email: string;
    public Email2: string;
    public Email3: string;
    public Email4: string;
    public AddField1: string;
    public AddField2: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class Asset_AssetCategory {
    constructor() {
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
    public AssetCatId: number;
    public CatCode: string;
    public Name1: string;
    public Name2: string;
    public ParentAssetCatId: number;
    public AssetCatType: number;
    public AssetCatLevel: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
}

class MS_Settings {
    constructor() {
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
        this.ItemSeparator
        this.UseCatCodInCust = false;
        this.CustSeparator
        this.UseCatCodInVend = false;
        this.VendSeparator
    }
    public SettingId: number;
    public ExpUseColor: boolean;
    public ExpPeriod: number;
    public chekAlert: boolean;
    public ItemLimitAlert: boolean;
    public ItemMaxAlert: boolean;
    public AlertCustCredit: boolean;
    public AlertVendCredit: boolean;
    public AlertTimeOut: number;
    public CustCodOrNam: boolean;
    public VendCodOrNam: boolean;
    public PartCodOrNam: boolean;
    public AccountsDecimals: number;
    public QuantityDicimals: number;
    public PriceDicimals: number;
    public CostDicimals: number;
    public ValuesDicimals: number;
    public PercentDicimals: number;
    public DimensionDicimals: number;
    public TimeDecimals: number;
    public UseBarCodes: boolean;
    public UseBasicOrAlterBarcod: boolean;
    public UseSerialNumber: boolean;
    public UseExpirySystem: boolean;
    public UseExpiryDateColumn: boolean;
    public UseProducDateColumn: boolean;
    public UseLotNumberColumn: boolean;
    public UseAlterItems: boolean;
    public UseAttributes: boolean;
    public UseHightColumn: boolean;
    public UseWidthColumn: boolean;
    public UseLengthColumn: boolean;
    public UseUnitColumn: boolean;
    public UseBrancheCodeColumn: boolean;
    public UseBrancheNameColumn: boolean;
    public UsePartitionCodeColumn: boolean;
    public UsePartitionNameColumn: boolean;
    public NoOfItemRemarksFields: number;
    public ItemCostAffectDoc: string;
    public SalesReturnItemCost: string;
    public PurchReturnItemCost: string;
    public AskForAttachMove: number;
    public AttachmentPath: string;
    public UseWeightCardSystem: boolean;
    public UseCurrency: boolean;
    public UseHijiryDate: boolean;
    public SysDateFormat: string;
    public ScaleAutoRead: boolean;
    public ScaleAppPath: string;
    public ScaleDataPath: string;
    public ItemIssueCostMethod: number;
    public ItemIssueWhichCost: number;
    public UseFinancialQtyOnly: boolean;
    public UseSimpleExpirySystem: boolean;
    public UseComposItem: boolean;
    public HideDeletedDocs: boolean;
    public HideCustBranch: boolean;
    public HideCurrency: boolean;
    public HideSalesMan: boolean;
    public HideMoneyCollector: boolean;
    public DistDiscOnJobOrderItems: boolean;
    public UseSalesJobOrders: boolean;
    public UseItemTaxInPurch: boolean;
    public UseItemTaxInSales: boolean;
    public UseAnalyticalCode: boolean;
    public UseShipping: boolean;
    public UseVehicles: boolean;
    public ItemDefTax: number;
    public PriceIncludTaxInSales: boolean;
    public PriceIncludTaxInPurch: boolean;
    public SearchItemWithQtySales: boolean;
    public UseCatCodInItems: boolean;
    public ItemSeparator: any;
    public UseCatCodInCust: boolean;
    public CustSeparator: any;
    public UseCatCodInVend: boolean;
    public VendSeparator: any;
}

class MS_ItemCard {
    constructor() {
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
        this.LastUpdateTime
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
    public ItemCardId: number;
    public ItemCategoryId: number;
    public StoreId: number;
    public StorePartId: number;
    public BasUnitId: number;
    public TaxesId1: number;
    public Tax1ForSale: boolean;
    public Tax1ForPurch: boolean;
    public Tax1Style: number;
    public Tax1Rate: number;
    public Tax1IsAccomulative: boolean;
    public Tax1PlusOrMinus: boolean;
    public TaxesId2: number;
    public Tax2ForSale: boolean;
    public Tax2ForPurch: boolean;
    public Tax2Style: number;
    public Tax2Rate: number;
    public Tax2IsAccomulative: boolean;
    public Tax2PlusOrMinus: boolean;
    public TaxesId3: number;
    public Tax3ForSale: boolean;
    public Tax3ForPurch: boolean;
    public Tax3Style: number;
    public Tax3Rate: number;
    public Tax3IsAccomulative: boolean;
    public Tax3PlusOrMinus: boolean;
    public ItemType: number;
    public ItemCode: string;
    public TaxItemCode: string;
    public ItemDescA: string;
    public ItemDescE: string;
    public QtyPartiation: number;
    public QtyInNotebook: number;
    public TotalCost: number;
    public PurchaseNumber: number;
    public LastSalePrice: number;
    public BeforLastCost: number;
    public LastCostManual: number;
    public ManualPurchasePrice: number;
    public LastCost: number;
    public CoastAverage: number;
    public LastPurchDate: string;
    public FirstQty: number;
    public FirstPrice: number;
    public SecandQty: number;
    public SecandPrice: number;
    public ThridQty: number;
    public ThirdPrice: number;
    public LargeQty: number;
    public LargePrice: number;
    public Price5: number;
    public Quantity5: number;
    public Price6: number;
    public Price7: number;
    public Price8: number;
    public Price9: number;
    public Price10: number;
    public LeastSalesPrice: number;
    public LeastProfitMargin: number;
    public QtyInBox: number;
    public PurchasePrice: number;
    public Wheight: number;
    public ServicePrice: number;
    public ProfitPrice: number;
    public Kirat: number;
    public strCustm5: string;
    public Remarks: string;
    public AddField1: string;
    public AddField2: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public AddField6: string;
    public AddField7: string;
    public AddField8: string;
    public AddField9: string;
    public AddField10: string;
    public ExpirPeriod: number;
    public PeriodType: number;
    public OfferDesc: string;
    public InOffer: boolean;
    public OfferFromDate: string;
    public OfferToDate: string;
    public IsOfferDiscount: boolean;
    public IsDiscountPercent: boolean;
    public Discount: number;
    public IsExpir: boolean;
    public IsAttributeItem: boolean;
    public IsCollection: boolean;
    public IsDimension: boolean;
    public IsSerialItem: boolean;
    public AllPatchesSamePrice: boolean;
    public UseSameItemAsMaterial: boolean;
    public AutoSuggestBatches: boolean;
    public CostWithDimension: boolean;
    public DimensionSalesPrice: number;
    public LastUpdateTime: any;
    public ItemLimit: number;
    public ItemMax: number;
    public Length: string;
    public Width: string;
    public Height: string;
    public ItemSize: string;
    public ItemColor: string;
    public SerialNoPrefix: string;
    public WarantyPeriod: number;
    public WarantyPeriodType: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public IsTempItem: boolean;
    public ProductionItemUnit: number;
    public SpecialItemExeclud: boolean;
    public IsCommisionPercent: boolean;
    public Commision: number;
    public CommisionEndDate: string;
    public IsOuterItem: boolean;
    public UseSomeSubItems: boolean;
    public Unit2IsMandatory: boolean;
    public UseUnit2: boolean;
    public IsSalesStopped: boolean;
    public IsServerEntity: boolean;
    public MainServerId: number;
}

class MS_ItemVendors {
    constructor() {
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
        this.Quantity1
        this.Price1
        this.Quantity2
        this.Price2
        this.Quantity3
        this.Price3
        this.Quantity4
        this.Price4
        this.Quantity5
        this.Price5
        this.Quantity6
        this.Price6
        this.Quantity7
        this.Price7
        this.Quantity8
        this.Price8
        this.Quantity9
        this.Price9
        this.Quantity10
        this.Price10
    }
    public StatusFlag: string;
    public VendorDescA: string;
    public VendorDescE: string;
    public VendorCode: string;
    public ItemVendorId: number;
    public ItemCardId: number;
    public VendorId: number;
    public IsBasicVendor: boolean;
    public UnitId: number;
    public UnitRate: number;
    public Quantity1: any;
    public Price1: any;
    public Quantity2: any;
    public Price2: any;
    public Quantity3: any;
    public Price3: any;
    public Quantity4: any;
    public Price4: any;
    public Quantity5: any;
    public Price5: any;
    public Quantity6: any;
    public Price6: any;
    public Quantity7: any;
    public Price7: any;
    public Quantity8: any;
    public Price8: any;
    public Quantity9: any;
    public Price9: any;
    public Quantity10: any;
    public Price10: any;
}

class Prod_ItemAttributes {
    constructor() {
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
    public AttributId: number;
    public AttributCode: string;
    public AttributName1: string;
    public AttributName2: string;
    public IsActive: boolean;
    public IsMandatory: boolean;
    public Dimension: number;
    public IsFixedMenuValues: boolean;
    public IsOptionalWithAlarm: boolean;
    public BasUnitId: number;
    public DataType: number;
    public MinValu: number;
    public MaxValu: number;
    public IncrementalValu: number;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public UnitNam: string;
    public UnitNameE: string;
}

class Prod_ItemAttributsJoin {
    constructor() {
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
    public StatusFlag: string;
    public ProdItemAtrribId: number;
    public ItemCardId: number;
    public AttributId: number;
    public IsActive: boolean;
    public IsMandatory: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public AttributName1: string;
    public AttributName2: string;
    public Dimension: string;
    public AttributCode: string;
    public BasUnitId: number;
    public UnitName: string;
}

class Ms_ItemPartition {
    constructor() {
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
        this.TVersion
        this.TType
        this.QtyIUnit2Notebook = 0;
        this.QtyIUnit2Partiation = 0;
        this.UpdatedAt = "";
    }
    public ItemPartId: number;
    public ItemCardId: number;
    public StoreId: number;
    public StorePartId: number;
    public LotNumberExpiryId: number;
    public QtyPartiation: number;
    public QtyInNotebook: number;
    public TotalCost: number;
    public PurchaseNumber: number;
    public FIFOCost: number;
    public LIFOCost: number;
    public CoastAverage: number;
    public BatchNumberFifoOrLifo: string;
    public VarianceQty: number;
    public ReservedQty: number;
    public RequestedQty: number;
    public SaleNotDelivered: number;
    public PurNotReceived: number;
    public QtyOutWithoutBalance: number;
    public QtyInWithoutCost: number;
    public SalesOrder: number;
    public PurchaseOrder: number;
    public WithoutCost: number;
    public ItemLimit: number;
    public ItemMax: number;
    public TVersion: any;
    public TType: any;
    public QtyIUnit2Notebook: number;
    public QtyIUnit2Partiation: number;
    public UpdatedAt: string;
}


class Ms_ItemCardOffers {
    constructor() {
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
    public OfferItemId: number;
    public ItemCardId: number;
    public UnitId: number;
    public BasicQuantity: number;
    public GiftItemCardId: number;
    public GiftUnitId: number;
    public GiftQuantity: number;
    public IsGiftDiscount: boolean;
    public IsDiscountPercent: boolean;
    public GiftDiscount: number;
    public PriceAfterDisc: number;
    public IsReplace: boolean;
    public FromDate: string;
    public ToDate: string;
    public StatusFlag: string;
}

class MS_ItemImages {
    constructor() {
        this.ImgId = 0;
        this.ItemCardId = 0;
        this.Image
        this.ImgDesc1 = "";
        this.ImgDesc2 = "";
        this.ImageStr = "";
    }
    public ImgId: number;
    public ItemCardId: number;
    public Image: any;
    public ImgDesc1: string;
    public ImgDesc2: string;
    public ImageStr: string;
}

class Prod_BasicUnits {
    constructor() {
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
    public BasUnitId: number;
    public UnitCode: string;
    public UnitNam: string;
    public UnitNameE: string;
    public UnittRate: number;
    public Symbol: string;
    public ParentUnit: number;
    public Remarks: string;
    public AutoDesc: string;
    public EtaxUnitCode: string;
    public IsKarat: boolean;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public StatusFlag: string;
}

class Ms_ItemUnit {
    constructor() {
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
    public UnitId: number;
    public ItemCardId: number;
    public BasUnitId: number;
    public UnittRate: number;
    public UnitCode: string;
    public UnitNam: string;
    public UnitNameE: string;
    public Symbol: string;
    public BarCode1: string;
    public BarCode2: string;
    public BarCode3: string;
    public BarCode4: string;
    public BarCode5: string;
    public BarCode6: string;
    public BarCode7: string;
    public BarCode8: string;
    public BarCode9: string;
    public BarCode10: string;
    public BarCode11: string;
    public BarCode12: string;
    public BarCode13: string;
    public BarCode14: string;
    public BarCode15: string;
    public StatusFlag: string;
    public DefaultBarCode: number;
    public ManualPurchasePrice: number;
    public LastCost: number;
    public BeforLastCost: number;
    public LastSalePrice: number;
    public LastCostManual: number;
    public IsDefaultSale: boolean;
    public IsDefaultPurchas: boolean;
    public IsBasicUnit: boolean;
    public IsNotRegular: boolean;
    public Price1: number;
    public Quantity1: number;
    public Price2: number;
    public Quantity2: number;
    public Price3: number;
    public Quantity3: number;
    public Price4: number;
    public Quantity4: number;
    public Price5: number;
    public Quantity5: number;
    public Price6: number;
    public Price7: number;
    public Price8: number;
    public Price9: number;
    public Price10: number;
    public LeastSalesPrice: number;
    public LeastProfitMargin: number;
    public Wheight: number;
    public X: number;
    public Y: number;
    public Z: number;
}

class MS_ItemAlternatives {
    constructor() {
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
    public AlterId: number;
    public ItemCardId: number;
    public AlterItemCardId: number;
    public UnitId: number;
    public UnitRate: number;
    public ItemType: number;
    public Quantity: number;
    public QtyBeforRate: number;
    public Remarks: string;
    public StatusFlag: string;
    public ItemDescA: string;
    public ItemDescE: string;
    public UnitNam: string;
    public ItemTypeName: string;
}

class Ms_ItemCollection {
    constructor() {
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
    public ItemCollectId: number;
    public ItemCardId: number;
    public SubItemId: number;
    public UnitId: number;
    public UnitRate: number;
    public ItemType: number;
    public Quantity: number;
    public QtyBeforRate: number;
    public Remarks: string;
    public IsNotBasic: boolean;
    public StatusFlag: string;
    public ItemCode: string;
    public UnitNam: string;
    public ItemDescA: string;
    public ItemDescE: string;
    public ItemTypeName: string;
}

class Prod_ItemcardExpenses {
    constructor() {
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
    public ProdExpensId: number;
    public ItemCardId: number;
    public AccountId: number;
    public IsPercent: boolean;
    public PercentOf: number;
    public ExpenseValu: number;
    public StatusFlag: string;
    public AccountCode: string;
    public AccountNameA: string;
    public AccountNameE: string;
}

class MS_PurchasInvoice {
    constructor() {
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
        this.LastUpdateTime
        this.IsRemoteEntity = false;
        this.RemotId = 0;
        this.MainVendServerId = 0;
    }
    public PurInvId: number;
    public VendorId: number;
    public StorId: number;
    public PurOrderId: number;
    public PurOrderReqId: number;
    public BookId: number;
    public TermId: number;
    public CurrencyId: number;
    public VendBranchId: number;
    public ExpensesId: number;
    public FinancialIntervalsId: number;
    public DBTableName: string;
    public DBTableId: number;
    public AccountTableName: string;
    public RectSourceType: number;
    public AccountId: number;
    public TaxesId1: number;
    public TaxValue1: number;
    public TaxesId2: number;
    public TaxValue2: number;
    public TaxesId3: number;
    public TaxValue3: number;
    public AId: number;
    public TrNo: number;
    public ManualTrNo: string;
    public TrDate: string;
    public InvDescA: string;
    public InvDescE: string;
    public Remarks: string;
    public AddField3: string;
    public AddField4: string;
    public AddField5: string;
    public AddField6: string;
    public AddField7: string;
    public InvoiceType: number;
    public InvDueDate: string;
    public TotalItemTax1: number;
    public TotalItemTax2: number;
    public TotalItemTax3: number;
    public TotalTaxValu: number;
    public InvTotal: number;
    public DiscPercent: number;
    public DiscAmount: number;
    public DiscPercent2: number;
    public DiscAmount2: number;
    public DiscPercent3: number;
    public DiscAmount3: number;
    public DiscPercent4: number;
    public DiscAmount4: number;
    public PriceAfterTax: number;
    public ExpenValue: number;
    public PaidPrice: number;
    public NetPrice: number;
    public PaidPriceVisa: number;
    public Closed: boolean;
    public IsPrinted: boolean;
    public Rate: number;
    public NetPriceBeforCurr: number;
    public ExpenValueBeforCurr: number;
    public ExpenValueWithCurr: number;
    public AdvancExpenseWithCurr: number;
    public AdvancExpenseBeforCurr: number;
    public IsDelivered: boolean;
    public IsPosted: boolean;
    public Postedby: string;
    public PostedDate: string;
    public CloseDate: string;
    public UncloseDate: string;
    public ClosedBy: number;
    public UnclosedBy: number;
    public PermPrinted: number;
    public PermPrintedAt: string;
    public IsPaid: boolean;
    public PaidDocId: number;
    public NotPaid: number;
    public TermCostCenterId: number;
    public TermCostCenterValue: number;
    public IsShippingInv: boolean;
    public IsNoCostDeliver: number;
    public DeliverNoCostExecut: boolean;
    public MultiResourceDeliver: boolean;
    public EtaxSent: boolean;
    public EtaxSentTime: string;
    public EtaxRemarks: string;
    public EtaxReference: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdateBy: string;
    public UpdateAt: string;
    public DeletedBy: string;
    public DeletedAt: string;
    public IsReturned: boolean;
    public ShiftId: number;
    public LastUpdateTime: any;
    public IsRemoteEntity: boolean;
    public RemotId: number;
    public MainVendServerId: number;
}

class MS_PurchaseInvoiceItemCard {
    constructor() {
        this.InvItemCardId = 0;
        this.PurInvId = 0;
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
        this.LastUpdateTime
        this.MainServerId = 0;
        this.ServerUnitId = 0;
        this.ServerItemCardId = 0;
        this.ItemDescA = "";
        this.ItemDescE = "";
        this.UnitNam = "";
        this.StatusFlag = "";
    }
    public StatusFlag: string;
    public UnitNam: string;
    public ItemDescA: string;
    public ItemDescE: string;
    public InvItemCardId: number;
    public PurInvId: number;
    public ItemCardId: number;
    public ItemAtrribBatchId: number;
    public StoreId: number;
    public StorePartId: number;
    public StockRecItemCardId: number;
    public CityIDFrom: number;
    public CityIDTo: number;
    public ItemIdToFollow: number;
    public FollowCollectionId: number;
    public LotNumberExpiryId: number;
    public TaxesId1: number;
    public Tax1Style: number;
    public Tax1IsAccomulative: boolean;
    public Tax1PlusOrMinus: boolean;
    public Tax1Percent: number;
    public TaxValue1: number;
    public TaxesId2: number;
    public Tax2Style: number;
    public Tax2IsAccomulative: boolean;
    public Tax2PlusOrMinus: boolean;
    public Tax2Percent: number;
    public TaxValue2: number;
    public TaxesId3: number;
    public Tax3Style: number;
    public Tax3IsAccomulative: boolean;
    public Tax3PlusOrMinus: boolean;
    public Tax3Percent: number;
    public TaxValue3: number;
    public ScaleCardId: number;
    public UnitId: number;
    public UnitRate: number;
    public ItemType: number;
    public PayId: number;
    public VJOrderId: number;
    public StockRecId: number;
    public BarCode: string;
    public BatchNumberFifoOrLifo: string;
    public QuantityRecieved: number;
    public QtyRecievedBeforRate: number;
    public Quantity: number;
    public QtyBeforRate: number;
    public ExecutedQty: number;
    public QtyIUnit2: number;
    public ReturnQty: number;
    public ReturnQtyBeforRate: number;
    public Price: number;
    public PriceAfterRate: number;
    public ServicePrice: number;
    public ProfitPrice: number;
    public Kirat: number;
    public DisAmount: number;
    public DisPercent: number;
    public DisAmountAfterRate: number;
    public MainDiscPercent: number;
    public MainDiscValue: number;
    public TaxableValue: number;
    public FIFOCost: number;
    public FIFOCostUnit: number;
    public LIFOCost: number;
    public LIFOCostUnit: number;
    public CoastAverage: number;
    public CoastAverageUnit: number;
    public IsCollection: boolean;
    public ExpenseShare: number;
    public ExpenseShareUnit: number;
    public PriceAfterExpense: number;
    public PriceAfterExpenseUnit: number;
    public PriceAfterCurr: number;
    public PriceAfterCurrUnit: number;
    public ExpenseShareAfterCurr: number;
    public ExpenseShareAfterCurrUnit: number;
    public PriceAfterExpenseAfterCurr: number;
    public PriceAfterExpensAfterCurrUnit: number;
    public Remarks: string;
    public Remarks1: string;
    public Remarks2: string;
    public Remarks3: string;
    public ItemCardDesc: string;
    public ItemCardDescE: string;
    public PriceIncludTaxInPurch: boolean;
    public IsNoCostDeliver: number;
    public DeliverNoCostExecut: boolean;
    public AId: number;
    public DBTableName: string;
    public DBTableId: number;
    public AccountTableName: string;
    public RectSourceType: number;
    public AccountId: number;
    public RectSourceTypeId: number;
    public VehicleId: number;
    public QtyBeforDiscount: number;
    public QtyDiscount: number;
    public QualityDiscount: number;
    public QualityValueDisc: number;
    public QtyScalDiffrence: number;
    public QtyScalDiffrenceValue: number;
    public LastUpdateTime: any;
    public MainServerId: number;
    public ServerUnitId: number;
    public ServerItemCardId: number;
}

