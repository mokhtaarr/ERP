var DataTablePages = /** @class */ (function () {
    function DataTablePages() {
        this.dataScr = new Array();
        this.Columns = new Array();
        this.column_defs = new Array();
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
        this.Env = GetSystemEnvironment();
    }
    DataTablePages.prototype.InitalizeEvents = function (e) {
        var row = $("#" + this.ElementName + " tbody tr td").DataTable();
        var currentIndex = row.index;
        var index = 0;
        if (this.EnablePaging == true) {
            var currentPageIndex = $('#' + this.ElementName).DataTable('option', 'currentPageIndex');
            var prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    };
    DataTablePages.prototype.Initalize = function () {
    };
    DataTablePages.prototype.Dispose = function () {
        $("#" + this.ElementName).off();
    };
    DataTablePages.prototype.Bind = function () {
        this.Initalize();
        var selectionCloumn = JsDataTablePages.JsDataTable.PrimaryKey;
        if (selectionCloumn != null) { }
        this.Columns = this.Columns.filter(function (row) { return row.hidden != true; });
        for (var index = 0; index < this.Columns.length; index++) {
            var ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var _i = 0, _a = this.dataScr; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn = {
                "render": this.Columns[index].render,
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        this.dataScr = this.dataScr.filter(function (row) { return row.hidden != true; });
        var tableHeaders = "";
        this.column_defs.forEach(function (col) {
            var _width = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });
        if (this.Env.ScreenLanguage == "ar") {
            this.language_app =
                {
                    "sProcessing": "جارٍ التحميل...",
                    "sLengthMenu": "أظهر _MENU_ مدخلات",
                    "sZeroRecords": "لم يعثر على أية سجلات",
                    "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                    "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                    "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                    "sInfoPostFix": "",
                    "sSearch": "ابحث:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "الأول",
                        "sPrevious": "السابق",
                        "sNext": "التالي",
                        "sLast": "الأخير"
                    }
                };
        }
        else {
            this.language_app = {
                "sProcessing": "Processing",
                "sLengthMenu": "Show _MENU_ Enties",
                "sZeroRecords": "Not Found",
                "sInfo": "Show _START_ To _END_ From _TOTAL_ Enties",
                "sInfoEmpty": "View 0 To 0 From 0 Record",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "Search:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "First",
                    "sPrevious": "Previous",
                    "sNext": "Next",
                    "sLast": "Last"
                }
            };
        }
        //$("#tableDiv").empty();
        //$("#tableDiv").append('<table id="SearchDataTable" class="table table-bordered display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        var table = $('#' + this.ElementName).DataTable({
            "destroy": true,
            "data": this.dataScr,
            "columns": this.column_defs,
            language: this.language_app
        });
        table.on('click', 'tr', function () {
            //console.log(table.row(this).data());
            //console.log("SelectedKey: " + JsDataTablePages.JsDataTable.PrimaryKey);
            //console.log(JsDataTablePages.JsDataTable.SelectedKey);
            try {
                JsDataTablePages.JsDataTable.SelectedKey = table.row(this).data()[JsDataTablePages.JsDataTable.PrimaryKey];
                JsDataTablePages.JsDataTable.OnDoubleClick();
            }
            catch (e) {
            }
        });
    };
    DataTablePages.prototype.closeSearch = function () {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    };
    return DataTablePages;
}());
var JCB;
(function (JCB) {
    var SortStyle;
    (function (SortStyle) {
        SortStyle[SortStyle["String"] = 0] = "String";
        SortStyle[SortStyle["Numeric"] = 1] = "Numeric";
        SortStyle[SortStyle["CaseSensitiveString"] = 2] = "CaseSensitiveString";
    })(SortStyle = JCB.SortStyle || (JCB.SortStyle = {}));
    var SortOrder;
    (function (SortOrder) {
        SortOrder[SortOrder["ASC"] = 0] = "ASC";
        SortOrder[SortOrder["DESC"] = 1] = "DESC";
    })(SortOrder = JCB.SortOrder || (JCB.SortOrder = {}));
    var SortArgument = /** @class */ (function () {
        function SortArgument(key, order, style) {
            if (key === void 0) { key = null; }
            if (order === void 0) { order = SortOrder.ASC; }
            if (style === void 0) { style = SortStyle.String; }
            this.key = null;
            this.order = SortOrder.ASC;
            this.style = SortStyle.String;
            this.key = key;
            this.order = order;
            this.style = style;
        }
        SortArgument.prototype.numericCompare = function (valueA, valueB) {
            if (valueA == valueB) {
                return 0;
            }
            return (this.order == SortOrder.ASC) ?
                valueA - valueB :
                valueB - valueA;
        };
        SortArgument.prototype.stringCompare = function (valueA, valueB) {
            if (valueA == valueB) {
                return 0;
            }
            return (this.order == SortOrder.ASC) ?
                ((valueA < valueB) ? -1 : 1) :
                ((valueA < valueB) ? 1 : -1);
        };
        SortArgument.prototype.compare = function (a, b) {
            // Get values to compare
            a = DataTable.isObject(a) && this.key ? a[this.key] : a;
            b = DataTable.isObject(b) && this.key ? b[this.key] : b;
            // Numeric sort
            if (this.style == SortStyle.Numeric) {
                return this.numericCompare(Number(a), Number(b));
            }
            // Case-insensitive string sort
            else if (this.style == SortStyle.String) {
                return this.stringCompare(a.toLocaleString().toLocaleLowerCase(), b.toLocaleString().toLocaleLowerCase());
            }
            // Case-sensitive string sort
            else if (this.style = SortStyle.CaseSensitiveString) {
                return this.stringCompare(a.toLocaleString(), b.toLocaleString());
            }
            return 0;
        };
        return SortArgument;
    }());
    JCB.SortArgument = SortArgument;
    var DataTable = /** @class */ (function () {
        function DataTable(items) {
            this.items = [];
            this.sortBy = [];
            this.items = items || [];
        }
        DataTable.isObject = function (item) {
            return (item instanceof Object);
        };
        DataTable.prototype.sorter = function (table) {
            return function (a, b) {
                var val = 0;
                if (table.sortBy.length > 0) {
                    table.sortBy.some(function (sortField) {
                        val = sortField.compare(a, b);
                        // If we got a value then break out
                        return (val != 0);
                    });
                }
                return val || 0;
            };
        };
        ;
        DataTable.matches = function (row, key, pattern) {
            var value = DataTable.isObject(row) ? row[key] : row;
            // Regular expression compare
            if (pattern instanceof RegExp) {
                if (pattern.test(value.toString())) {
                    return true;
                }
            }
            // Equality
            else if (value == pattern) {
                return true;
            }
            return false;
        };
        DataTable.prototype.sort = function () {
            if (this.sortBy.length > 0) {
                this.items.sort(this.sorter(this));
            }
            return this;
        };
        DataTable.prototype.add = function (row) {
            this.items.push(row);
            return this;
        };
        DataTable.prototype.remove = function (index) {
            this.items = this.items.splice(index, 1);
            return this;
        };
        DataTable.prototype.getSort = function () {
            return this.sortBy;
        };
        DataTable.prototype.clear = function () {
            this.items = [];
            return this;
        };
        DataTable.prototype.clearSort = function () {
            this.sortBy = [];
            return this;
        };
        DataTable.prototype.asc = function (fieldName, style) {
            if (style === void 0) { style = SortStyle.String; }
            this.sortBy.push(new SortArgument(fieldName, SortOrder.ASC, style));
            return this;
        };
        DataTable.prototype.desc = function (fieldName, style) {
            if (style === void 0) { style = SortStyle.String; }
            this.sortBy.push(new SortArgument(fieldName, SortOrder.DESC, style));
            return this;
        };
        DataTable.prototype.getFirst = function (n) {
            return this.getAll().slice(0, n);
        };
        DataTable.prototype.getLast = function (n) {
            return this.getAll().slice(n * -1);
        };
        DataTable.prototype.getFrom = function (offset, limit) {
            return this.getAll().slice(offset, (offset + limit));
        };
        DataTable.prototype.getAll = function () {
            return this.sort().items;
        };
        DataTable.prototype.filter = function (key, pattern) {
            this.items = this.search(key, pattern);
            return this;
        };
        DataTable.prototype.search = function (key, pattern) {
            var matching = [];
            this.sort().items.forEach(function (row) {
                if (DataTable.matches(row, key, pattern)) {
                    matching.push(row);
                }
            });
            return matching;
        };
        DataTable.prototype.indexOf = function (key, pattern) {
            var index = 0, firstMatch = -1;
            this.sort().items.some(function (row) {
                if (DataTable.matches(row, key, pattern)) {
                    firstMatch = index;
                    return true;
                }
                index++;
                return false;
            });
            return firstMatch;
        };
        DataTable.prototype.lastIndexOf = function (key, pattern) {
            var index = 0, lastMatch = -1;
            this.sort().items.forEach(function (row) {
                if (DataTable.matches(row, key, pattern)) {
                    lastMatch = index;
                }
                index++;
            });
            return lastMatch;
        };
        return DataTable;
    }());
    JCB.DataTable = DataTable;
})(JCB || (JCB = {}));
//# sourceMappingURL=DataTablePages.js.map