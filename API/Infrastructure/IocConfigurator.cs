using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity;
using System.Web.Http.Dependencies;
using Inv.DAL.Repository;
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.CompStatus;
using Inv.BLL.Services.IControl;
using Inv.BLL.Services.IGCodes; 
using Inv.BLL.Services.GCostCenter;
using Inv.BLL.Services.GRole;
using Inv.BLL.Services.GRoleUsers;
using Inv.BLL.Services.G_Control;
using Inv.BLL.Services.GBRANCH;
using Inv.BLL.Services.G_SUB_SYSTEM;
using Inv.BLL.Services.USER_BRANCH;
using Inv.BLL.Services.GCompany;
using Inv.BLL.Services.GAlertControl;
using Inv.BLL.Services.GLDefAccount;
using Inv.BLL.Services.MSPartition;
using Inv.BLL.Services.MSStores;
using Inv.BLL.Services.AccountUsers;
using Inv.BLL.Services.MSBoxBank;
using Inv.BLL.Services.AccountCategories;
using Inv.BLL.Services.AccountClassification;
using Inv.BLL.Services.CurrencyCategory;
using Inv.BLL.Services.MsCustomerTypes;
using Inv.BLL.Services.MsVendorTypes;
using Inv.BLL.Services.MSItemCategory;
using Inv.BLL.Services.MSCustomer;
using Inv.BLL.Services.MSVendor;
using Inv.BLL.Services.HrEmployees;
using Inv.BLL.Services.SySearch;
using Inv.BLL.Services.CalCostCenters;
using Inv.BLL.Services.MSCustomerCategory;
using Inv.BLL.Services.HrJobs;
using Inv.BLL.Services.HrDepartments;
using Inv.BLL.Services.MSGACity;
using Inv.BLL.Services.MSCurrency;
using Inv.BLL.Services.CalJurnalEntry;
using Inv.BLL.Services.Shared;
using Inv.BLL.Services.MsTerms;
using Inv.BLL.Services.MSTaxes;
using Inv.BLL.Services.SysBooks;
using Inv.BLL.Services.SysFinancialYears;
using Inv.BLL.Services.MSExpenses;
using Inv.BLL.Services.SrVehicle;
using Inv.BLL.Services.SrVehicleTypes;
using Inv.BLL.Services.SrVehicleShapes;
using Inv.BLL.Services.ProdEquipments;
using Inv.BLL.Services.MsReceiptNote;
using Inv.BLL.Services.MSPaymentNote;
using Inv.BLL.Services.AssetAssetCard;
using Inv.BLL.Services.AssetAssetCategory;
using Inv.BLL.Services.ProgrammingTools.MsSettings;
using Inv.BLL.Services.CalBusinessPartnerAccounts;
using Inv.BLL.Services.CalPostOrder;
using Inv.BLL.Services.SysAnalyticalCodes;
using Inv.BLL.Services.ProdJobOrder;
using Inv.BLL.Services.SrVehicles;
using Inv.BLL.Services.MsItemCard;
using Inv.BLL.Services.ProdBasicUnits;
using Inv.BLL.Services.Purchase.PurchasInvoice;
using Inv.BLL.Services.MSPrintBrCode;

namespace Inv.API.Infrastructure
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>();

            container.RegisterType<IG_USERSService, G_USERSService>();
            container.RegisterType<II_VW_GetCompStatusService, I_VW_GetCompStatusService>();
            container.RegisterType<II_ControlService, I_ControlService>();
            container.RegisterType<IIGCodesService, IGCodesService>();
            container.RegisterType<IGCostCenterService, GCostCenterService>();
            container.RegisterType<IG_ControlService, G_ControlService>();
            container.RegisterType<IGRoleUsersService, GRoleUsersService>();
            container.RegisterType<IGRoleService, GRoleService>();
            container.RegisterType<IGBRANCHService, GBRANCHService>();
            container.RegisterType<IG_SUB_SYSTEMSService, G_SUB_SYSTEMSService>();
            container.RegisterType<IG_USER_BRANCHService, G_USER_BRANCHService>();
            container.RegisterType<IGCompanyService, GCompanyService>();
            container.RegisterType<IG_AlertControlService, G_AlertControlService>();
            container.RegisterType<IMS_StoresService, MS_StoresService>();
            container.RegisterType<IMS_PartitionService, MS_PartitionService>();
            container.RegisterType<ICal_AccountUsersService, Cal_AccountUsersService>();
            container.RegisterType<IMS_BoxBankService, MS_BoxBankService>();
            container.RegisterType<IMS_CurrencyCategoryService, MS_CurrencyCategoryService>();
            
            //////////////////////// Account Service ////////////////////////////
            container.RegisterType<IGLDefAccountService, GLDefAccountService>();
            container.RegisterType<IAccountCategoriesService, AccountCategoriesService>();
            container.RegisterType<ICod_AccountClassificationService, Cod_AccountClassificationService>();
            container.RegisterType<ICalCostCentersService, CalCostCentersService>();
            container.RegisterType<IMS_CurrencyService, MS_CurrencyService>();
            container.RegisterType<ICal_JurnalEntryService, Cal_JurnalEntryService>();
            container.RegisterType<IMs_TermsService, Ms_TermsService>();
            container.RegisterType<IMS_TaxesService, MS_TaxesService>();
            container.RegisterType<ISys_BooksService, Sys_BooksService>();
            container.RegisterType<ISys_FinancialYearsService, Sys_FinancialYearsService>();
            container.RegisterType<IMS_ExpensesService, MS_ExpensesService>();
            container.RegisterType<IMS_PaymentNoteService, MS_PaymentNoteService>();
            container.RegisterType<ICal_PostOrderService, Cal_PostOrderService>();
            container.RegisterType<ICal_BusinessPartnerAccountsService, Cal_BusinessPartnerAccountsService>();
            container.RegisterType<ISys_AnalyticalCodesService, Sys_AnalyticalCodesService>();
            container.RegisterType<IProd_JobOrderService, Prod_JobOrderService>();
            container.RegisterType<ISr_VehiclesService, Sr_VehiclesService>();


            //////////////////////// IMs_Definitions Pages Service ////////////////////////////
            container.RegisterType<IMs_CustomerTypesService, Ms_CustomerTypesService>();
            container.RegisterType<IMs_VendorTypesService, Ms_VendorTypesService>();
            container.RegisterType<IMS_ItemCategoryService, MS_ItemCategoryService>();
            container.RegisterType<IMS_CustomerService, MS_CustomerService>();
            container.RegisterType<IMS_VendorService, MS_VendorService>();
            container.RegisterType<IHr_EmployeesService, Hr_EmployeesService>();
            container.RegisterType<IMS_PrintBarCodeService, MS_PrintBarCodeService>();
            container.RegisterType<IHr_JobsService, Hr_JobsService>();
            container.RegisterType<IHr_DepartmentsService, Hr_DepartmentsService>();
            container.RegisterType<IMSGA_CityService, MSGA_CityService>();
            container.RegisterType<ISr_VehicleTypesService, Sr_VehicleTypesService>();
            container.RegisterType<ISr_VehicleShapesService, Sr_VehicleShapesService>();
            container.RegisterType<IProd_EquipmentsService, Prod_EquipmentsService>();
            container.RegisterType<IMs_ReceiptNoteService, Ms_ReceiptNoteService>();
            container.RegisterType<IMS_ItemCardService, MS_ItemCardService>();
            container.RegisterType<IProd_BasicUnitsService, Prod_BasicUnitsService>();


            //////////////////////// System Pages Service ////////////////////////////
            container.RegisterType<ISearchService, SearchService>();
            container.RegisterType<ISharedService, SharedService>();
            

            //////////////////////// System Pages Service ////////////////////////////
            container.RegisterType<IMS_PurchasInvoiceService, MS_PurchasInvoiceService>();


            //////////////////////// Fixed assets Pages Service ////////////////////////////
            container.RegisterType<IAsset_AssetCategoryService, Asset_AssetCategoryService>();
            container.RegisterType<IAsset_AssetCategoryService, Asset_AssetCategoryService>();

            //////////////////////// ProgrammingTools Pages Service ////////////////////////////
            container.RegisterType<IMS_SettingsService, MS_SettingsService>();
        }
    }
}