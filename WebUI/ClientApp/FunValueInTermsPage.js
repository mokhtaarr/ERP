var sys = new SystemTools();
var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
var ValueArr = [];
//class ListValue {
//    public static GetLetOfGrnteeTranDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "ValueBeforeRate", text: "مبلغ الضمان" });
//            ValueArr.push({ value: "CoverValue", text: "قيمة التغطيه" });
//            ValueArr.push({ value: "Expenses", text: "مصروفات" });
//            ValueArr.push({ value: "CashMargin", text: "هامش نقدى" });
//            ValueArr.push({ value: "Commision", text: "عموله" });
//        }
//        else {
//            ValueArr.push({ value: "ValueBeforeRate", text: "Guarantee amount" });
//            ValueArr.push({ value: "CoverValue", text: "Coverage amount" });
//            ValueArr.push({ value: "Expenses", text: "Expenses" });
//            ValueArr.push({ value: "CashMargin", text: "Cash Margin" });
//            ValueArr.push({ value: "Commision", text: "Commision" });
//        }
//        return ValueArr;
//    }
//    public static GetJobOrderEquipDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalCost", text: "إجمالى تكلفه" });
//        }
//        else {
//            ValueArr.push({ value: "TotalCost", text: "Total Cost" });
//        }
//        return ValueArr;
//    }
//    public static GetJobOrderEmpDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalCost", text: "إجمالى تكلفه" });
//        }
//        else {
//            ValueArr.push({ value: "TotalCost", text: "Total Cost" });
//        }
//        return ValueArr;
//    }
//    public static GetUnitReservationDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalPrice", text: "سعر البيع" });
//            ValueArr.push({ value: "FinishValue", text: "إجمالى التشطيب" });
//            ValueArr.push({ value: "FeesValue", text: "رســـوم" });
//            ValueArr.push({ value: "CommissionValue", text: "العمولــه" });
//            ValueArr.push({ value: "DiscValue", text: "الخصــــم" });
//            ValueArr.push({ value: "LeaveValue", text: "قيمة التنازل" });
//            ValueArr.push({ value: "ActPricWithoutFee", text: "الصافى بدون الرسوم" });
//            //ValueArr.push({ value:"ActualSalesPriceWithFee",text: "الصافى بالرسوم"});
//            ValueArr.push({ value: "ActualSalesPrice", text: "صافى بيع" });
//            ValueArr.push({ value: "TotalServices", text: "خدمات و مرافق" });
//            //ValueArr.push({ value:"TotalInstallments",text: "إجمالى الأقساط"});
//            //ValueArr.push({ value:"ActualPriceWithServices",text: "صافى البيع بالخدمات و المرافق"});
//            //ValueArr.push({ value:"ActualPriceWithFinish",text: "صافى البيع بالخدمات و المرافق"});
//            //ValueArr.push({ value:"ActualPriceWithServicesAndFinish",text: "صافى بيع"});
//        }
//        else {
//            ValueArr.push({ value: "TotalPrice", text: "Sales Price" });
//            ValueArr.push({ value: "FinishValue", text: "Decoration Price" });
//            ValueArr.push({ value: "FeesValue", text: "Fees" });
//            ValueArr.push({ value: "CommissionValue", text: "Commission" });
//            ValueArr.push({ value: "DiscValue", text: "Discount" });
//            ValueArr.push({ value: "LeaveValue", text: "concession fee" });
//            //ValueArr.push({ value:"PaidPrice",text: "المدفـــوع"});
//            ValueArr.push({ value: "ActPricWithoutFee", text: "Net Without fees" });
//            ValueArr.push({ value: "ActualSalesPrice", text: "Net Price" });
//            ValueArr.push({ value: "TotalServices", text: "Total Services" });
//            //ValueArr.push({ value:"Commision",text: "عمولة البيع"});
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        return ValueArr;
//    }
//    public static GetBankNoticeDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalCheques", text: "اجمالى الأوراق" });
//            ValueArr.push({ value: "MultiCheques", text: "الأوراق المتعدده" });
//            ValueArr.push({ value: "BankExpenses", text: "مصروفات بنكيه" });
//            ValueArr.push({ value: "TotalChequesAfterExpens", text: "الاجمالى بعد المصروفات" });
//        }
//        else {
//            ValueArr.push({ value: "TotalCheques", text: "Total Cheques" });
//            ValueArr.push({ value: "MultiCheques", text: "Multi Cheques" });
//            ValueArr.push({ value: "BankExpenses", text: "Bank Expenses" });
//            ValueArr.push({ value: "TotalChequesAfterExpens", text: "Total Cheques After Expenses" });
//        }
//        return ValueArr;
//    }
//    public static GetPettyCashDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalFilteredPrice", text: "تصفية العهده" });
//            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
//        }
//        else {
//            ValueArr.push({ value: "TotalFilteredPrice", text: "Total lequidation" });
//            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
//        }
//        return ValueArr;
//    }
//    public static GetItemStockAdjustDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "StockTotalCost", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TotalDiff", text: "فرق التكلفه" });
//        }
//        else {
//            ValueArr.push({ value: "StockTotalCost", text: "Total Items" });
//            ValueArr.push({ value: "TotalDiff", text: "Net Cost" });
//        }
//        return ValueArr;
//    }
//    public static GetJournalEntryDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalDebit", text: "اجمالى مدين" });
//            ValueArr.push({ value: "TotalCredit", text: "اجمالى دائن" });
//        }
//        else {
//            ValueArr.push({ value: "TotalDebit", text: "Total Debit" });
//            ValueArr.push({ value: "TotalCredit", text: "Total Credit" });
//        }
//        return ValueArr;
//    }
//    public static GetKeeperbankDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalCheques", text: "اجمالى الشيكات" });
//        }
//        else {
//            ValueArr.push({ value: "TotalCheques", text: "Total Cheques" });
//        }
//        return ValueArr;
//    }
//    public static GetStockTranReqValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalValue", text: "اجمالى متوسط التكلفه" });
//            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
//        }
//        else {
//            ValueArr.push({ value: "TotalValue", text: "Total Cost Average" });
//            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
//        }
//        return ValueArr;
//    }
//    public static GetStockTranValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalValue", text: "اجمالى متوسط التكلفه" });
//        }
//        else {
//            ValueArr.push({ value: "TotalValue", text: "Total Cost Average" });
//            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
//        }
//        return ValueArr;
//    }
//    public static GetSalesDeliverValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalCostAverage", text: "اجمالى متوسط التكلفه" });
//            ValueArr.push({ value: "TotalLastCost", text: "اجمالى اخر تكلفه" });
//        }
//        else {
//            ValueArr.push({ value: "TotalCostAverage", text: "Total Cost Average" });
//            ValueArr.push({ value: "TotalLastCost", text: "Total Last Cost" });
//        }
//        return ValueArr;
//    }
//    public static GetPurchReceitValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "NetPrice", text: "تكلفة الأصناف" });
//        }
//        else {
//            ValueArr.push({ value: "NetPrice", text: "Net Item Cost" });
//        }
//        return ValueArr;
//    }
//    public static GetPurchValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
//            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
//            ValueArr.push({ value: "ExpenValueWithCurr", text: "اجمالى المصاريف المتعدده" });
//            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
//            ValueArr.push({ value: "AccountInExpense", text: "حساب فرعى بملف المصروف" });
//            ValueArr.push({ value: "AdvancExpenseWithCurr", text: "دفعات مقدمه عمله" });
//            ValueArr.push({ value: "AdvancExpenseBeforCurr", text: "دفعات مقدمه محلى" });
//        }
//        else {
//            ValueArr.push({ value: "InvTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
//            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
//            ValueArr.push({ value: "ExpenValueWithCurr", text: "Total Multi-Expenses" });
//            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
//            ValueArr.push({ value: "AccountInExpense", text: "Expenses GL Account" });
//            ValueArr.push({ value: "AdvancExpenseWithCurr", text: "Expenses in advance currency" });
//            ValueArr.push({ value: "AdvancExpenseBeforCurr", text: "Expenses in advance local" });
//        }
//        return ValueArr;
//    }
//    public static GetJobOrderDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalProductsPrice", text: "اجمالى المنتجات" });
//            ValueArr.push({ value: "TotalItemCost", text: "اجمالى الخامات" });
//            ValueArr.push({ value: "TotalJobsCost", text: "عماله مباشره" });
//            ValueArr.push({ value: "TotalScrap", text: "اجمالى هالك" });
//            ValueArr.push({ value: "TotalExpensesCost", text: "اجمالى مصروفات" });
//            ValueArr.push({ value: "CustomerCharged", text: "مصروفات على العميل" });
//            ValueArr.push({ value: "NetExpenses", text: "صافى المصروفات" });
//            ValueArr.push({ value: "TotalEquipCost", text: "تكلفة ماكينات" });
//            ValueArr.push({ value: "TotalPurchInvCost", text: "تكلفه المشتريات" });
//            ValueArr.push({ value: "GrandTotal", text: "اجمالى بيع" });
//            ValueArr.push({ value: "TotalJpbOrder", text: "اجمالى تكلفه" });
//            ValueArr.push({ value: "TotalProfit", text: "اجمالى ربح" });
//        }
//        else {
//            ValueArr.push({ value: "TotalProductsPrice", text: "Total Products" });
//            ValueArr.push({ value: "TotalItemCost", text: "Total Material Cost" });
//            ValueArr.push({ value: "TotalJobsCost", text: "Total WorkForce" });
//            ValueArr.push({ value: "TotalScrap", text: "Total Scrap" });
//            ValueArr.push({ value: "TotalExpensesCost", text: "Total Expenses" });
//            ValueArr.push({ value: "CustomerCharged", text: "Customer Charged" });
//            ValueArr.push({ value: "NetExpenses", text: "Net Expenses" });
//            ValueArr.push({ value: "TotalEquipCost", text: "Total Machine cost" });
//            ValueArr.push({ value: "TotalPurchInvCost", text: "Total Purchase" });
//            ValueArr.push({ value: "GrandTotal", text: "Grand Total" });
//            ValueArr.push({ value: "TotalJpbOrder", text: "Total Jobb Order Cost" });
//            ValueArr.push({ value: "TotalProfit", text: "Total Profit" });
//        }
//        return ValueArr;
//    }
//    public static GetPurchOrderDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
//            ValueArr.push({ value: "ExpenValueBeforCurr", text: "اجمالى المصاريف المتعدده" });
//            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
//            ValueArr.push({ value: "AccountInExpense", text: "حساب فرعى بملف المصروف" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        else {
//            ValueArr.push({ value: "InvTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
//            ValueArr.push({ value: "ExpenValueBeforCurr", text: "Total Multi-Expenses" });
//            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
//            ValueArr.push({ value: "AccountInExpense", text: "Expenses GL Account" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        return ValueArr;
//    }
//    public static GetSalesOfferDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
//            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
//            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        else {
//            ValueArr.push({ value: "InvTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
//            ValueArr.push({ value: "Commision", text: "Sales Commision" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        return ValueArr;
//    }
//    public static GetSalesOrderDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
//            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
//            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        else {
//            ValueArr.push({ value: "InvTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
//            ValueArr.push({ value: "Commision", text: "Sales Commision" });
//            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
//        }
//        return ValueArr;
//    }
//    public static GetSalesValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب 1" });
//            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
//            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
//            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
//            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
//            ValueArr.push({ value: "PayMethodValue", text: "نسبة الزياده" });
//            ValueArr.push({ value: "TotalItemsCost", text: "اجمالى تكلفة الاصناف" });
//            ValueArr.push({ value: "TotalItemsProfit", text: "اجمالى ربح الاصناف" });
//            ValueArr.push({ value: "PaidPriceVisa", text: "المدفوع فيزا" });
//            ValueArr.push({ value: "ItemCommision", text: "عمولة الأصناف" });
//            ValueArr.push({ value: "DiscAmount2", text: "خصم كسور" });
//        }
//        else {
//            ValueArr.push({ value: "InvTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value 1" });
//            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
//            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
//            ValueArr.push({ value: "Commision", text: "Sales Commision" });
//            ValueArr.push({ value: "PayMethodValue", text: "Add Percent" });
//            ValueArr.push({ value: "TotalItemsCost", text: "Total Items Cost" });
//            ValueArr.push({ value: "TotalItemsProfit", text: "Total Items Profit" });
//            ValueArr.push({ value: "PaidPriceVisa", text: "Paid VISA" });
//            ValueArr.push({ value: "ItemCommision", text: "Items Commision" });
//            ValueArr.push({ value: "DiscAmount2", text: "Discount on net Val" });
//        }
//        return ValueArr;
//    }
//    public static GetRetPurchValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "RetTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
//            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaidPrice", text: "المتبقـــى" });
//        }
//        else {
//            ValueArr.push({ value: "RetTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
//            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaidPrice", text: "Not Paid " });
//        }
//        return ValueArr;
//    }
//    public static GetRetSalesValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "RetTotal", text: "اجمالى الاصناف" });
//            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
//            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
//            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
//            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
//            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
//            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
//            ValueArr.push({ value: "NotPaidPrice", text: "المتبقـــى" });
//            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
//            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
//            ValueArr.push({ value: "TotalItemsCost", text: "اجمالى تكلفة الاصناف" });
//            ValueArr.push({ value: "TotalItemsProfit", text: "اجمالى ربح الاصناف" });
//            ValueArr.push({ value: "DiscAmount2", text: "خصم كسور" });
//        }
//        else {
//            ValueArr.push({ value: "RetTotal", text: "Total Items" });
//            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
//            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
//            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
//            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
//            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
//            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
//            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
//            ValueArr.push({ value: "DiscAmount", text: "Discount" });
//            ValueArr.push({ value: "NetPrice", text: "Net Price" });
//            ValueArr.push({ value: "PaidPrice", text: "Paid " });
//            ValueArr.push({ value: "NotPaidPrice", text: "Not Paid " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
//            ValueArr.push({ value: "Commision", text: "Sales Commision" });
//            ValueArr.push({ value: "TotalItemsCost", text: "Total Items Cost" });
//            ValueArr.push({ value: "TotalItemsProfit", text: "Total Items Profit" });
//            ValueArr.push({ value: "DiscAmount2", text: "Discount on net Val" });
//        }
//        return ValueArr;
//    }
//    public static GetAdjustValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "Value", text: "قيمة التسويه" });
//        }
//        else {
//            ValueArr.push({ value: "Value", text: "Value" });
//        }
//        return ValueArr;
//    }
//    public static GetRecietValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "PaidPrice", text: "مبلغ القبض " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
//            ValueArr.push({ value: "Commision", text: "عمولة التحصيل" });
//            ValueArr.push({ value: "Value1BeforeRate", text: "ديون معدومه" });
//            ValueArr.push({ value: "Value2BeforeRate", text: "مصروفات تحصيل" });
//            ValueArr.push({ value: "Value3BeforeRate", text: "غرامات" });
//            ValueArr.push({ value: "Value4BeforeRate", text: "ضريبه" });
//            ValueArr.push({ value: "Value5BeforeRate", text: "خصم" });
//            ValueArr.push({ value: "Value6BeforeRate", text: "دمغات" });
//            ValueArr.push({ value: "Value7BeforeRate", text: "تأمين ابتدائى" });
//            ValueArr.push({ value: "Value8BeforeRate", text: "تأمين نهائى" });
//            ValueArr.push({ value: "Value9BeforeRate", text: "قيمه 9" });
//            ValueArr.push({ value: "Value10BeforeRate", text: "قيمه 10" });
//            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
//        }
//        else {
//            ValueArr.push({ value: "PaidPrice", text: "Amount " });
//            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
//            ValueArr.push({ value: "Commision", text: "Collection Commision" });
//            ValueArr.push({ value: "Value1BeforeRate", text: "Bad debts" });
//            ValueArr.push({ value: "Value2BeforeRate", text: "Collection Expenses" });
//            ValueArr.push({ value: "Value3BeforeRate", text: "Fines" });
//            ValueArr.push({ value: "Value4BeforeRate", text: "Tax Value" });
//            ValueArr.push({ value: "Value5BeforeRate", text: "Discount" });
//            ValueArr.push({ value: "Value6BeforeRate", text: "stamp" });
//            ValueArr.push({ value: "Value7BeforeRate", text: "Primary insurance" });
//            ValueArr.push({ value: "Value8BeforeRate", text: "Final insurance" });
//            ValueArr.push({ value: "Value9BeforeRate", text: "Value 9" });
//            ValueArr.push({ value: "Value10BeforeRate", text: "Value 10" });
//            ValueArr.push({ value: "TotalValue", text: "Total Value" });
//        }
//        return ValueArr;
//    }
//    public static GetPayValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "PaidPrice", text: "مبلغ الدفع " });
//            ValueArr.push({ value: "Value1BeforeRate", text: "قيمه 1" });
//            ValueArr.push({ value: "Value2BeforeRate", text: "قيمه 2" });
//            ValueArr.push({ value: "Value3BeforeRate", text: "قيمه 3" });
//            ValueArr.push({ value: "Value4BeforeRate", text: "قيمه 4" });
//            ValueArr.push({ value: "Value5BeforeRate", text: "قيمه 5" });
//            ValueArr.push({ value: "Value6BeforeRate", text: "قيمه 6" });
//            ValueArr.push({ value: "Value7BeforeRate", text: "تأمين ابتدائى" });
//            ValueArr.push({ value: "Value8BeforeRate", text: "تأمين نهائى" });
//            ValueArr.push({ value: "Value9BeforeRate", text: "قيمه 9" });
//            ValueArr.push({ value: "Value10BeforeRate", text: "قيمه 10" });
//            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
//        }
//        else {
//            ValueArr.push({ value: "PaidPrice", text: "Paid Amount " });
//            ValueArr.push({ value: "Value1BeforeRate", text: "Value 1" });
//            ValueArr.push({ value: "Value2BeforeRate", text: "Value 2" });
//            ValueArr.push({ value: "Value3BeforeRate", text: "Value 3" });
//            ValueArr.push({ value: "Value4BeforeRate", text: "Value 4" });
//            ValueArr.push({ value: "Value5BeforeRate", text: "Value 5" });
//            ValueArr.push({ value: "Value6BeforeRate", text: "Value 6" });
//            ValueArr.push({ value: "Value7BeforeRate", text: "Primary insurance" });
//            ValueArr.push({ value: "Value8BeforeRate", text: "Final insurance" });
//            ValueArr.push({ value: "Value9BeforeRate", text: "Value 9" });
//            ValueArr.push({ value: "Value10BeforeRate", text: "Value 10" });
//            ValueArr.push({ value: "TotalValue", text: "Total Value" });
//        }
//        return ValueArr;
//    }
//    public static GetVehicleMovValuesDataTable() {
//        if (language == "ar") {
//            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
//            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
//        }
//        else {
//            ValueArr.push({ value: "TotalValue", text: "Total Value" });
//            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
//        }
//        return ValueArr;
//    }
//}
//# sourceMappingURL=FunValueInTermsPage.js.map