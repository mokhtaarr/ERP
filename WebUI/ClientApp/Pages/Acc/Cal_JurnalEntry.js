$(document).ready(function () {
    SharedButtons.OnLoad();
    CalJurnalEntry.InitalizeComponent();
});
var CalJurnalEntry;
(function (CalJurnalEntry) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.DailyVoucherDocuments);
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var language = SysSession.CurrentEnvironment.ScreenLanguage;
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var Data = new Array();
    var Model = new Cal_JurnalEntry();
    var JurnalEntries = new Array();
    var JurnalDetail = new Array();
    var PostJurnalDetail = new PostJurnalDetailAndmodel();
    var GetJurnalDetail = new Array();
    var OldJurnalDetail = new Array();
    var GetNewJurnalDetail = new CustomJurnalDetail();
    var AllAccounts = new Array();
    var DeatilsAndModel = new CustomJurnalDetailAndmodel();
    var Terms = new Array();
    var CostCenters = new Array();
    var Currencies = new Array();
    // select Options
    var element;
    var TermId;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var pageLoaded = false;
    var flag = true;
    var flagTotal = true;
    var AccountId;
    var rowId;
    var divJurnalDetailGrid = new JsGrid();
    var grid = new JsGrid();
    var datatable;
    function InitalizeComponent() {
        localStorage.setItem("TableName", "Cal_JurnalEntry");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () { Undo(); });
        SharedButtons.SaveAction(function () {
            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit) {
                btnsave_onClick();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Query) {
                WorningMessage("يجب اختيار وضع التعديل او الاضافة اولا ", "Please Select Save Or Edit Mode First");
                return;
            }
        });
        InitalizeControls();
        InitalizeEvents();
        sys.JsTree(Data);
        GetAll();
        GetAllAccountCode();
        GetCostCenters();
        GetCurrency();
        GetAllTerms(13);
        InitializeJurnalDetailGrid();
    }
    CalJurnalEntry.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnCal_JurnalEntrySearch");
        TermId = document.getElementById("TermId");
        //DepartMentId = document.getElementById("DepartMentId") as HTMLSelectElement;
        //StoreId = document.getElementById("StoreId") as HTMLSelectElement;
        //JobId = document.getElementById("JobId") as HTMLSelectElement;
        //PeriodTableId = document.getElementById("PeriodTableId") as HTMLSelectElement;
        //ShiftId = document.getElementById("ShiftId") as HTMLSelectElement;
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAllFroTree"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    JurnalEntries = result.Response;
                    //FillTreeData();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAll"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DeatilsAndModel = result.Response;
                    GetJurnalDetail = DeatilsAndModel.JurnalDetails;
                    var data = ConvertNumberToDesimal(GetJurnalDetail);
                    divJurnalDetailGrid.DataSource = data;
                    divJurnalDetailGrid.Bind();
                    //console.log(divJurnalDetailGrid.DataSource);
                    //InitializeJurnalDetailGrid();
                    //////////////// for DataTable ////////////////
                    //if (datatable == null)
                    //    Initalizegrid(data);
                    //else
                    //    ResetDatatable(data);
                    Model = DeatilsAndModel.JurnalEntry;
                    Display(Model);
                    CalculatTotal();
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function ConvertNumberToDesimal(Detail) {
        var _a, _b, _c, _d;
        for (var i = 0; i < Detail.length; i++) {
            Detail[i].CurrencyDebtor = Number((_a = Detail[i].CurrencyDebtor) === null || _a === void 0 ? void 0 : _a.toFixed(3));
            Detail[i].Debtor = Number((_b = Detail[i].Debtor) === null || _b === void 0 ? void 0 : _b.toFixed(3));
            Detail[i].CurrencyCreditor = Number((_c = Detail[i].CurrencyCreditor) === null || _c === void 0 ? void 0 : _c.toFixed(3));
            Detail[i].Creditor = Number((_d = Detail[i].Creditor) === null || _d === void 0 ? void 0 : _d.toFixed(3));
        }
        return GetJurnalDetail;
    }
    function Assign() {
        MapDetails();
        Model = DocumentActions.AssignToModel(Model);
        PostJurnalDetail.JurnalEntry = Model;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            // Model.JurnalId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.JurnalId;
        GetAll();
        if (ObjectId != 0)
            GetByID(ObjectId);
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(JurnalEntries, DocumentActions.GetElementByName("TrNo").value, "TrNo") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else {
            Assign();
            if (Success) {
                Disabled(false);
                Success = false;
                SharedWork.SwitchModes(ScreenModes.Query);
            }
        }
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Cal_JurnalEntry", "Insert"),
            data: JSON.stringify(PostJurnalDetail),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.JurnalId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Cal_JurnalEntry", "Update"),
            data: JSON.stringify(PostJurnalDetail),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.JurnalId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
        ClearGrids();
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("TrNo");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            if (hasNodes) {
                MessageBox.Show(Resource.CannotDeleteHasChildren, Resource.Error);
            }
            else {
                Delete();
            }
        }
    }
    function ValidationHeader() {
        //if (DocumentActions.GetElementByName("TrNo").value == "") {
        //    MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
        //    return false
        //}
        //else if (DocumentActions.GetElementByName("Name1").value == "") {
        //    MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
        //    return false
        //}
        if (!flagTotal) {
            MessageBox.Toastr(Resource.TotalDebtorMustEqualTotalCreditor, Resource.Error, ToastrTypes.error);
            flag = flagTotal;
        }
        return flag;
    }
    function Navigate() {
        Model = JurnalEntries[SharedWork.PageIndex - 1];
        ObjectId = Model.JurnalId;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }
    CalJurnalEntry.Navigate = Navigate;
    function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < JurnalEntries.length; i++) {
            Data.push({
                id: JurnalEntries[i].JurnalId,
                parent: "#",
                text: JurnalEntries[i].TrNo,
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    CalJurnalEntry.FillTreeData = FillTreeData;
    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id); });
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        ObjectId = Number(Model.JurnalId);
    }
    //////////////////////// start Add Jurnal Detail In Grid /////////////////////////
    function AddJurnalDetailInGrid() {
        flag = true;
        GetNewJurnalDetail = new CustomJurnalDetail();
        var SubAccountCode = $('#SubAccountCode'), AccountId = $('#AccountId'), BusinessPartnerAccId = $('#BusinessPartnerAccId'), AssetAccountId = $('#AssetAccountId'), EmpAccountId = $('#EmpAccountId'), VendAccountId = $('#VendAccountId'), CustAccountId = $('#CustAccountId'), AccountCode = $('#AccountCode'), AccountNameA = $('#AccountNameA'), CurrencyCreditor = $('#CurrencyCreditor'), CurrencyDebtor = $('#CurrencyDebtor'), CurrencyId = $('#CurrencyId'), CodeCurrency = $('#CodeCurrency'), NameCurrency = $('#NameCurrency'), Rate = $('#Rate'), Creditor = $('#Creditor'), Debtor = $('#Debtor'), Descriptions = $('#Descriptions'), Remarks = $('#Remarks'), CostCenterId1 = $('#CostCenterId1'), CostCenterCode = $('#CostCenterCode'), CostCenterNameA = $('#CostCenterNameA'), JurnalDetailId = $('#JurnalDetailId'), JurnalId = $('#JurnalId');
        if (CurrencyCreditor.val().trim() == '' && CurrencyDebtor.val().trim() == '') {
            MessageBox.Show("من فضلك ادخل قيمة الدائن او المدين", Resource.Error);
            flag = false;
            return;
        }
        if (AccountCode.val().trim() == 'null') {
            MessageBox.Show(Resource.PleaseEnterCode, Resource.Error);
            flag = false;
            return;
        }
        else {
            GetNewJurnalDetail.AccountId = AccountId.val().trim();
            var val = AccountCode.val().trim().split('-');
            if (val.length > 1)
                GetNewJurnalDetail.AccountCode = val[1];
            else
                GetNewJurnalDetail.AccountCode = val[0];
        }
        if (CodeCurrency.val().trim() == "null") {
            MessageBox.Show("من فضلك اختر العملة", Resource.Error);
            flag = false;
            return;
        }
        if (flag) {
            GetNewJurnalDetail.JurnalId = JurnalId.val().trim();
            GetNewJurnalDetail.SubAccountCode = SubAccountCode.val().trim();
            GetNewJurnalDetail.AccountNameA = AccountNameA.val().trim();
            GetNewJurnalDetail.CurrencyCreditor = CurrencyCreditor.val().trim();
            GetNewJurnalDetail.CurrencyDebtor = CurrencyDebtor.val().trim();
            GetNewJurnalDetail.CurrencyId = CurrencyId.val().trim();
            GetNewJurnalDetail.CodeCurrency = CodeCurrency.val().trim();
            GetNewJurnalDetail.NameCurrency = NameCurrency.val().trim();
            GetNewJurnalDetail.Rate = Rate.val().trim();
            GetNewJurnalDetail.Creditor = Creditor.val().trim();
            GetNewJurnalDetail.Debtor = Debtor.val().trim();
            GetNewJurnalDetail.Descriptions = Descriptions.val().trim();
            GetNewJurnalDetail.Remarks = Remarks.val().trim();
            if (CostCenterCode.val().trim() != 'null') {
                GetNewJurnalDetail.CostCenterCode = CostCenterCode.val().trim();
                GetNewJurnalDetail.CostCenterNameA = CostCenterNameA.val().trim();
                GetNewJurnalDetail.CostCenterId1 = CostCenterId1.val().trim();
            }
            GetNewJurnalDetail.BusinessPartnerAccId = BusinessPartnerAccId.val().trim();
            GetNewJurnalDetail.AssetAccountId = AssetAccountId.val().trim();
            GetNewJurnalDetail.EmpAccountId = EmpAccountId.val().trim();
            GetNewJurnalDetail.VendAccountId = VendAccountId.val().trim();
            GetNewJurnalDetail.CustAccountId = CustAccountId.val().trim();
            if ($('#Flag').val().trim() == "u")
                GetNewJurnalDetail.StatusFlag = "u";
            else
                GetNewJurnalDetail.StatusFlag = "i";
            if (JurnalDetailId.val().trim() == "")
                GetNewJurnalDetail.JurnalDetailId = 0;
            else
                GetNewJurnalDetail.JurnalDetailId = JurnalDetailId.val().trim();
            GetJurnalDetail.unshift(GetNewJurnalDetail);
            divJurnalDetailGrid.DataSource = GetJurnalDetail;
            CalculatTotal();
            divJurnalDetailGrid.Bind();
        }
        return;
    }
    function InitializeJurnalDetailGrid() {
        divJurnalDetailGrid.ElementName = "divJurnalDetailGrid";
        divJurnalDetailGrid.PrimaryKey = "JurnalDetailId";
        divJurnalDetailGrid.Inserting = true;
        divJurnalDetailGrid.Editing = true;
        divJurnalDetailGrid.Paging = true;
        //divJurnalDetailGrid.Sorting = true;
        divJurnalDetailGrid.PageSize = 10;
        divJurnalDetailGrid.ConfirmDeleteing = true;
        divJurnalDetailGrid.InsertionMode = JsGridInsertionMode.Binding;
        divJurnalDetailGrid.OnItemEditing = ChangeSelectToSearchable;
        divJurnalDetailGrid.OnItemUpdating = UpdateGrid;
        divJurnalDetailGrid.OnItemInserting = InsertGrid;
        divJurnalDetailGrid.OnItemDeleting = DeleteGrid;
        divJurnalDetailGrid.OnRowSelected = function () { };
        divJurnalDetailGrid.OnRefreshed = function () { };
        divJurnalDetailGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Code, type: "text", css: "ColumPadding", name: "AccountCode", id: "AccountCode",
                itemTemplate: function (data, row) {
                    var account = AllAccounts.filter(function (x) { return x.AccountCode == data; })[0];
                    return account === null || account === void 0 ? void 0 : account.AccountNameA;
                },
                editTemplate: function (data, item) {
                    var txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetAccountFromDrobDownInGrid(trId, $(e.target).val(), "CodeCurrency");
                    };
                    txt.id = "AccountCode";
                    txt.value = data;
                    return txt;
                },
                insertTemplate: function (data, item) {
                    var txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetAccountFromDrobDownInGrid(trId, $(e.target).val(), "CodeCurrency");
                    };
                    txt.id = "AccountCode";
                    txt.value = data;
                    return txt;
                },
            },
            {
                title: Resource.Code2 + " " + Resource.AssistantAccount, type: "text", name: "SubAccountCode", id: "SubAccountCode",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "SubAccountCode", null);
                    txt.id = "SubAccountCode";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "SubAccountCode", null);
                    txt.id = "SubAccountCode";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: Resource.Name_Arabic, type: "text", css: "ColumPadding", name: "AccountNameA", id: "AccountNameA",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AccountNameA", null, true);
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AccountNameA", null, true);
                    return txt;
                }
            },
            {
                title: Resource.App_Creditor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", name: "CurrencyCreditor",
                id: "CurrencyCreditor",
                editTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "CurrencyCreditor", null);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        calculat(trId, e);
                    };
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "CurrencyCreditor", null);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        calculat(trId, e);
                    };
                    return txt;
                },
            },
            {
                title: Resource.App_Debtor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", name: "CurrencyDebtor",
                id: "CurrencyDebtor",
                editTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "CurrencyDebtor", null);
                    txt.id = "CurrencyDebtor";
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        calculat(trId, e);
                    };
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "CurrencyDebtor", null);
                    txt.id = "CurrencyDebtor";
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        calculat(trId, e);
                    };
                    return txt;
                },
            },
            {
                title: Resource.Code2 + " " + Resource.Currency, css: "ColumPadding", type: "select", name: "CodeCurrency", items: Currencies,
                valueField: "CurrencyCode", textField: (language ? "CurrencyDescA" : "CurrencyDescE"), id: "CodeCurrency", Typefun: "change",
                fun: function (e) {
                    var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                    SetCurrency(trId, Number($(e.target).val()), this);
                    calculat(trId, e);
                },
                editTemplate: function (data, row) {
                    var txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetCurrency(trId, Number($(e.target).val()), txt);
                        calculat(trId, e);
                    };
                    txt.id = "CodeCurrency";
                    txt.value = data;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetCurrency(trId, Number($(e.target).val()), txt);
                        calculat(trId, e);
                    };
                    txt.id = "CodeCurrency";
                    txt.value = data;
                    return txt;
                }
            },
            {
                title: Resource.Name + " " + Resource.Currency, css: "ColumPadding", type: "text", name: "NameCurrency", id: "NameCurrency",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "NameCurrency", null);
                    txt.id = "NameCurrency";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "NameCurrency", null);
                    txt.id = "NameCurrency";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: Resource.ConversionFactor, css: "ColumPadding", type: "text", name: "Rate", id: "Rate", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Rate", null);
                    txt.id = "Rate";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Rate", null);
                    txt.id = "Rate";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: Resource.App_Creditor, css: "ColumPadding", name: "Creditor", type: "text", id: "Creditor", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "Creditor", null);
                    txt.id = "Creditor";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "Creditor", null);
                    txt.id = "Creditor";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: Resource.App_Debtor, css: "ColumPadding", type: "text", name: "Debtor", id: "Debtor", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "Debtor", null);
                    txt.id = "Debtor";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("number", null, data, null, "Debtor", null);
                    txt.id = "Debtor";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: Resource.description, css: "ColumPadding", type: "text", name: "Descriptions", id: "Descriptions",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Descriptions", null);
                    txt.id = "Descriptions";
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Descriptions", null);
                    txt.id = "Descriptions";
                    return txt;
                }
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", type: "text", id: "Remarks",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Descriptions", null);
                    txt.id = "Descriptions";
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Descriptions", null);
                    txt.id = "Descriptions";
                    return txt;
                }
            },
            {
                title: Resource.Code2 + Resource.Costcenter_name, css: "ColumPadding", type: "text", name: "CostCenterCode", id: "CostCenterCode",
                editTemplate: function (data, row) {
                    var txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetCostCentersFromDrobDownInGrid(trId, $(e.target).val());
                    };
                    txt.id = "CostCenterCode";
                    txt.value = data;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    txt.onchange = function (e) {
                        var trId = '#' + $(e.currentTarget).parent().parent()[0].id;
                        SetCostCentersFromDrobDownInGrid(trId, $(e.target).val());
                    };
                    txt.id = "CostCenterCode";
                    txt.value = data;
                    return txt;
                }
            },
            {
                title: Resource.Costcenter_name + 1, css: "ColumPadding", type: "text", name: "CostCenterNameA", id: "CostCenterNameA", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CostCenterNameA", null);
                    txt.id = "CostCenterNameA";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CostCenterNameA", null);
                    txt.id = "CostCenterNameA";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", id: "Flag",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Flag", null);
                    txt.id = "Flag";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "Flag", null);
                    txt.id = "Flag";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "CostCenterId1", css: "ColumPadding hide", type: "text", name: "CostCenterId1", id: "CostCenterId1", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CostCenterId1", null);
                    txt.id = "CostCenterId1";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CostCenterId1", null);
                    txt.id = "CostCenterId1";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "AccountId", css: "ColumPadding hide", type: "text", name: "AccountId", id: "AccountId",
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AccountId", null);
                    txt.id = "AccountId";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AccountId", null);
                    txt.id = "AccountId";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "CurrencyId", css: "ColumPadding hide", name: "CurrencyId", id: "CurrencyId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CurrencyId", null);
                    txt.id = "CurrencyId";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CurrencyId", null);
                    txt.id = "CurrencyId";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "JurnalId", css: "ColumPadding disable hidden", name: "JurnalId", id: "JurnalId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "JurnalId", null);
                    txt.id = "JurnalId";
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "JurnalId", null);
                    txt.id = "JurnalId";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "JurnalDetailId", css: "ColumPadding disable hidden", name: "JurnalDetailId", id: "JurnalDetailId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "JurnalDetailId", null, true);
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "JurnalDetailId", null, true);
                    return txt;
                }
            },
            ////////////////////////////////////////// ///////////////////
            {
                title: "BusinessPartnerAccId", css: "ColumPadding disable hidden", name: "BusinessPartnerAccId", id: "BusinessPartnerAccId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "BusinessPartnerAccId", null, true);
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "BusinessPartnerAccId", null, true);
                    return txt;
                }
            },
            {
                title: "AssetAccountId", css: "ColumPadding disable hidden", name: "AssetAccountId", id: "AssetAccountId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AssetAccountId", null, true);
                    txt.disabled = true;
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "AssetAccountId", null, true);
                    txt.id = "AssetAccountId";
                    txt.disabled = true;
                    return txt;
                }
            },
            {
                title: "EmpAccountId", css: "ColumPadding disable hidden", name: "EmpAccountId", id: "EmpAccountId", disabled: true,
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "EmpAccountId", null, true);
                    return txt;
                },
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "EmpAccountId", null, true);
                    return txt;
                }
            },
            {
                title: "VendAccountId", css: "ColumPadding disable hidden", name: "VendAccountId", id: "VendAccountId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "VendAccountId", null, true);
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "VendAccountId", null, true);
                    return txt;
                }
            },
            {
                title: "CustAccountId", css: "ColumPadding disable hidden", name: "CustAccountId", id: "CustAccountId", disabled: true,
                editTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CustAccountId", null, true);
                    return txt;
                },
                insertTemplate: function (data, row) {
                    var txt = CreateElement("text", null, data, null, "CustAccountId", null, true);
                    return txt;
                }
            },
        ];
        divJurnalDetailGrid.Bind();
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }
    function GetModel(id) {
        Model = JurnalEntries.filter(function (x) { return x.JurnalId == id; })[0];
        return Model;
    }
    function GetAllAccountCode() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAllAccountCode"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllAccounts = result.Response;
                }
            }
        });
    }
    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCostCenters"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CostCenters = result.Response;
                }
            }
        });
    }
    function GetAllTerms(type) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Terms = result.Response;
                    DocumentActions.FillCombowithdefult(Terms, TermId, "TermId", "TermName", Resource.DocumentType);
                }
            }
        });
    }
    function GetCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Currencies = result.Response;
                }
            }
        });
    }
    function SetAccountFromDrobDownInGrid(trId, code, CurrencyId) {
        var account = AllAccounts.filter(function (x) { return x.AccountCode == code; })[0], elm = document.querySelector(trId + " #" + CurrencyId);
        if (account != null) {
            SetAccountData(trId, account.AccDesc2, code);
            rowId = '';
            if (code.split('-').length > 1) {
                $(trId + ' #SubAccountCode').val(code.split('-')[0]);
            }
            else {
                $(trId + ' #SubAccountCode').val('');
            }
            $(trId + ' #AccountNameA').val(account.AccountNameA);
            SetCurrencyById(trId, account.CurrencyId, elm);
            $('#' + CurrencyId).select2().trigger('change');
        }
    }
    function SetCostCentersFromDrobDownInGrid(trId, val) {
        var cost = CostCenters.filter(function (x) { return x.CostCenterCode == val; })[0];
        if (cost != null) {
            $(trId + ' #CostCenterId1').val(cost.CostCenterId);
            $(trId + ' #CostCenterNameA').val(cost.CostCenterNameA);
        }
        else {
            $(trId + ' #CostCenterId1').val('');
            $(trId + ' #CostCenterNameA').val('');
        }
    }
    function SetAccountData(trId, AccDesc2, code) {
        rowId = trId;
        switch (AccDesc2) {
            case 'GL Account': {
                AccountByCode(code);
                break;
            }
            case 'Customer': {
                CustomerByCode(code);
                break;
            }
            case 'Vendor': {
                VendorByCode(code);
                break;
            }
            case 'Employee': {
                EmployeeByCode(code);
                break;
            }
            case 'Fixed Asset': {
                FixedAssetByCode(code);
                break;
            }
            default: {
                BusinessPartnerAccountsByCode(code);
                break;
            }
        }
    }
    function AccountByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAccountChartByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                }
            }
        });
    }
    function CustomerByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCustAccountByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                    $(rowId + ' #CustAccountId').val(res.CustAccountId);
                }
            }
        });
    }
    function VendorByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendAccountByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                    $(rowId + ' #VendAccountId').val(res.VendAccountId);
                }
            }
        });
    }
    function EmployeeByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetEmpAccountsByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                    $(rowId + ' #VendAccountId').val(res.EmpAccountId);
                }
            }
        });
    }
    function FixedAssetByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAssetAccountsByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                    $(rowId + ' #VendAccountId').val(res.AssetAccountId);
                }
            }
        });
    }
    function BusinessPartnerAccountsByCode(code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBusinessPartnerAccByCode"),
            data: { code: code },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var res = result.Response;
                    AccountId = res.AccountId;
                    $(rowId + ' #AccountId').val(AccountId);
                    $(rowId + ' #VendAccountId').val(res.BusinessPartnerAccId);
                }
            }
        });
    }
    function SetCurrency(trId, code, element) {
        if (!isNaN(code) && code != 0 && !IsNullOrEmpty(trId)) {
            var Currency = Currencies.filter(function (x) { return x.CurrencyCode == code; })[0];
            $(trId + ' #CurrencyId').val(Currency.CurrencyId);
            $(trId + ' #' + element.id).val(Currency.CurrencyCode);
            $(trId + ' #Rate').val(Currency.Rate.toFixed(2));
            $(trId + ' #NameCurrency').val(Currency.CurrencyDescA);
        }
    }
    function SetCurrencyById(trId, id, element) {
        var Currency = Currencies.filter(function (x) { return x.CurrencyId == id; })[0];
        $(trId + ' #CurrencyId').val(Currency.CurrencyId);
        $(trId + ' #' + element.id).val(Currency.CurrencyCode);
        $(trId + ' #Rate').val(Currency.Rate.toFixed(2));
        $(trId + ' #NameCurrency').val(Currency.CurrencyDescA);
        $(trId + ' #CodeCurrency').select2().trigger('change');
    }
    function ClearGrids() {
        GetJurnalDetail = new Array();
        ClearBranchesGrid();
    }
    function ClearBranchesGrid() {
        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        divJurnalDetailGrid.Bind();
        $('div#TotalDebit span').text(0);
        $('div#TotalCredit span').text(0);
        $('div#def span').text(0);
    }
    function calculat(trId, e) {
        var CurrencyCreditor = $(trId + ' #CurrencyCreditor'), CurrencyDebtor = $(trId + ' #CurrencyDebtor'), Rate = Number($(trId + ' #Rate').val()), Creditor = $(trId + ' #Creditor'), Debtor = $(trId + ' #Debtor');
        if (e.target.id == "CurrencyCreditor") {
            Creditor.val(Number(CurrencyCreditor.val()) * Rate);
            Debtor.val('');
            CurrencyDebtor.val('');
        }
        else if (e.target.id == "CurrencyDebtor") {
            Debtor.val(Number(CurrencyDebtor.val()) * Rate);
            Creditor.val('');
            CurrencyCreditor.val('');
        }
        else if (e.target.id == "CodeCurrency") {
            if (Number(CurrencyCreditor.val()) > 0)
                Creditor.val(Number(CurrencyCreditor.val()) * Rate);
            if (Number(CurrencyDebtor.val()) > 0)
                Debtor.val(Number(CurrencyDebtor.val()) * Rate);
        }
    }
    function CalculatTotal() {
        var TotalDebit = 0, TotalCredit = 0, def = 0;
        GetJurnalDetail = GetJurnalDetail.filter(function (x) { return x.StatusFlag != 'd'; });
        for (var i = 0; i < GetJurnalDetail.length; i++) {
            TotalDebit += isNaN(GetJurnalDetail[i].CurrencyDebtor) ? 0 : Number(GetJurnalDetail[i].CurrencyDebtor);
            TotalCredit += isNaN(GetJurnalDetail[i].CurrencyCreditor) ? 0 : Number(GetJurnalDetail[i].CurrencyCreditor);
        }
        def = Number(TotalDebit.toFixed(3)) - Number(TotalCredit.toFixed(3));
        $('div#TotalDebit span').text(TotalDebit.toFixed(3));
        $('div#TotalCredit span').text(TotalCredit.toFixed(3));
        $('div#def span').text(def);
        if (def == 0)
            flagTotal = true;
        else {
            flagTotal = false;
        }
    }
    function MapDetails() {
        PostJurnalDetail.JurnalDetails = new Array();
        for (var i = 0; i < GetJurnalDetail.length; i++) {
            PostJurnalDetail.JurnalDetails.push(MapSingleRow(GetJurnalDetail[i]));
        }
        ;
    }
    function GetRowId(element) {
        var rowId = '';
        try {
            if (element.id.split('_')[0] == 'i') {
                rowId = '.jsgrid-insert-row ';
            }
            else if (element.id.split('_')[0] == 'u') {
                rowId = '#_idEdit ';
            }
            else
                rowId = $('#' + element.id).parent().parent()[0].id;
        }
        catch (e) {
        }
        return rowId;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Cal_JurnalEntry, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        ClearGrids();
        GetAll();
        GetByID(ObjectId);
    }
    function UpdateGrid(e) {
        debugger;
        var item = e.Item;
        item = DocumentActions.AssignToModelFormGridInEditMode(item);
        item.StatusFlag = 'u';
        var index = e.ItemIndex;
        GetJurnalDetail.splice(index, 1, item);
        //OldJurnalDetail.splice(index, 1);
        //OldJurnalDetail.unshift(item);
        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        CalculatTotal();
        //divJurnalDetailGrid.Bind();
        //UpdateRow(item);
    }
    function InsertGrid(e) {
        var item = e.Item;
        item.StatusFlag = 'i';
        GetJurnalDetail.push(item);
        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        divJurnalDetailGrid.Bind();
        CalculatTotal();
    }
    function DeleteGrid(e) {
        debugger;
        var item = e.Item;
        item.StatusFlag = 'd';
        CalculatTotal();
        GetJurnalDetail.push(item);
    }
    function ChangeSelectToSearchable(id) {
        if (IsNullOrEmpty(id))
            setTimeout(function () { $('#' + id).select2().trigger('change'); }, 5);
        else
            setTimeout(function () { $('#divJurnalDetailGrid select').select2().trigger('change'); }, 5);
    }
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    function ChangeBtnStyle(e) {
        if ($(e.target).hasClass("jsgrid-edit-button"))
            $(e.target).removeClass("jsgrid-edit-button").addClass("jsgrid-update-button");
        else if ($(e.target).hasClass("jsgrid-update-button"))
            $(e.target).removeClass("jsgrid-update-button").addClass("jsgrid-edit-button");
    }
    function MapSingleRow(data) {
        var NewJurnalDetail = new Cal_JurnalDetail();
        NewJurnalDetail.JurnalDetailId = data.JurnalDetailId;
        NewJurnalDetail.AccountId = data.AccountId;
        NewJurnalDetail.JurnalId = data.JurnalId;
        ;
        NewJurnalDetail.CustAccountId = data.CustAccountId;
        NewJurnalDetail.VendAccountId = data.VendAccountId;
        NewJurnalDetail.EmpAccountId = data.EmpAccountId;
        NewJurnalDetail.AssetAccountId = data.AssetAccountId;
        NewJurnalDetail.BusinessPartnerAccId = data.BusinessPartnerAccId;
        NewJurnalDetail.CostCenterId1 = data.CostCenterId1;
        NewJurnalDetail.Rate = data.Rate;
        NewJurnalDetail.DebitCurrency = data.CurrencyDebtor;
        NewJurnalDetail.CreditCurrency = data.CurrencyCreditor;
        NewJurnalDetail.DebitLocal = data.Debtor;
        NewJurnalDetail.CreditLocal = data.Creditor;
        NewJurnalDetail.JurDesc = data.Descriptions;
        NewJurnalDetail.CurrencyId = data.CurrencyId;
        NewJurnalDetail.Remarks = data.Remarks;
        NewJurnalDetail.StatusFlag = data.StatusFlag;
        return NewJurnalDetail;
    }
    function UpdateRow(data) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAllFroTree"),
            data: MapSingleRow(data),
            success: function (d) {
                var result = d;
                if (!result.IsSuccess) {
                    MessageBox.Toastr(Resource.ErrorOnSave, Resource.Error, ToastrTypes.error);
                }
            }
        });
    }
})(CalJurnalEntry || (CalJurnalEntry = {}));
//# sourceMappingURL=Cal_JurnalEntry.js.map