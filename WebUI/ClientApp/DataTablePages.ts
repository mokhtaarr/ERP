class DataTablePages {
    public ElementName: string;
    public dataScr: Array<any> = new Array<any>();
    public Columns: Array<datatableColumn> = new Array<datatableColumn>();
    public column_defs: Array<datatableColumn> = new Array<datatableColumn>();
    public OnRowSlected: () => void;
    public OnDoubleClick: () => void;
    public SelectedIndex: number;
    public SelectedKey: any;
    public SelectedItem: any;
    public EnableSorting: boolean = false;
    public EnableFiltring: boolean = false;
    public EnablePaging: boolean = false;
    public PageSize: number = 50;
    public language_app:any;

	public PrimaryKey: string;

    public OnFiltering: (evt, ui) => void;

	private Initalized: boolean = false;

	public Env = GetSystemEnvironment();

    private InitalizeEvents(e: JQueryEventObject) {
		let row = $("#" + this.ElementName + " tbody tr td").DataTable();

        let currentIndex: number = row.index;
        let index: number = 0;
        if (this.EnablePaging == true) {
			let currentPageIndex: number = $('#' + this.ElementName).DataTable('option', 'currentPageIndex');
            let prevPagesCount: number = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }

    private Initalize() {
    }

    public Dispose() {
        $("#" + this.ElementName).off();
    }

    public Bind() {
        this.Initalize();

        var selectionCloumn: string = JsDataTablePages.JsDataTable.PrimaryKey;
        if (selectionCloumn != null) { }

        this.Columns = this.Columns.filter(row => row.hidden != true);
        for (var index = 0; index < this.Columns.length; index++) {
            let ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var itm of this.dataScr) {
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn: datatableColumn = {
				"render": this.Columns[index].render,
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
		}

        this.dataScr = this.dataScr.filter(row => row.hidden != true);
        var tableHeaders ="";
        this.column_defs.forEach(col => {
            var _width: string = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
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
                }
        } else {
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
            }
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
            } catch (e) {
            }
        });
    }

    public closeSearch() {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    }
}

namespace JCB {
	export enum SortStyle {
		String,
		Numeric,
		CaseSensitiveString
	}

	export enum SortOrder {
		ASC,
		DESC
	}

	export class SortArgument {
		public key: string = null;
		public order: SortOrder = SortOrder.ASC;
		public style: SortStyle = SortStyle.String;

		constructor(key: string = null, order: SortOrder = SortOrder.ASC, style: SortStyle = SortStyle.String) {
			this.key = key;
			this.order = order;
			this.style = style;
		}

		private numericCompare(valueA: number, valueB: number): number {
			if (valueA == valueB) {
				return 0;
			}
			return (this.order == SortOrder.ASC) ?
				valueA - valueB :
				valueB - valueA;
		}

		private stringCompare(valueA: string, valueB: string): number {
			if (valueA == valueB) {
				return 0;
			}
			return (this.order == SortOrder.ASC) ?
				((valueA < valueB) ? -1 : 1) :
				((valueA < valueB) ? 1 : -1);
		}

		public compare(a, b): number {
			// Get values to compare
			a = DataTable.isObject(a) && this.key ? a[this.key] : a;
			b = DataTable.isObject(b) && this.key ? b[this.key] : b;
			// Numeric sort
			if (this.style == SortStyle.Numeric) {
				return this.numericCompare(
					Number(a),
					Number(b)
				);
			}
			// Case-insensitive string sort
			else if (this.style == SortStyle.String) {
				return this.stringCompare(
					a.toLocaleString().toLocaleLowerCase(),
					b.toLocaleString().toLocaleLowerCase()
				);
			}
			// Case-sensitive string sort
			else if (this.style = SortStyle.CaseSensitiveString) {
				return this.stringCompare(
					a.toLocaleString(),
					b.toLocaleString()
				);
			}
			return 0;
		}
	}

	export class DataTable {

		private items: Array<any> = [];

		private sortBy: Array<SortArgument> = [];

		constructor(items: Array<any>) {
			this.items = items || [];
		}

		public static isObject(item): boolean {
			return (item instanceof Object);
		}

		private sorter(table: DataTable) {
			return function (a: any, b: any) {
				let val: number = 0;
				if (table.sortBy.length > 0) {
					table.sortBy.some(
						function (sortField: SortArgument) {
							val = sortField.compare(a, b);
							// If we got a value then break out
							return (val != 0);
						}
					);
				}
				return val || 0;
			}
		};

		private static matches(row: any, key: string, pattern: any) {
			let value = DataTable.isObject(row) ? row[key] : row;
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
		}

		private sort(): DataTable {
			if (this.sortBy.length > 0) {
				this.items.sort(this.sorter(this));
			}
			return this;
		}

		public add(row: any): DataTable {
			this.items.push(row);
			return this;
		}

		public remove(index: number): DataTable {
			this.items = this.items.splice(index, 1);
			return this;
		}

		public getSort(): Array<SortArgument> {
			return this.sortBy;
		}

		public clear(): DataTable {
			this.items = [];
			return this;
		}

		public clearSort(): DataTable {
			this.sortBy = [];
			return this;
		}

		public asc(fieldName: string, style: SortStyle = SortStyle.String): DataTable {
			this.sortBy.push(
				new SortArgument(fieldName, SortOrder.ASC, style)
			);
			return this;
		}

		public desc(fieldName: string, style: SortStyle = SortStyle.String): DataTable {
			this.sortBy.push(
				new SortArgument(fieldName, SortOrder.DESC, style)
			);
			return this;
		}

		public getFirst(n: number): Array<any> {
			return this.getAll().slice(0, n);
		}

		public getLast(n: number): Array<any> {
			return this.getAll().slice(n * -1);
		}

		public getFrom(offset: number, limit: number): Array<any> {
			return this.getAll().slice(offset, (offset + limit));
		}

		public getAll(): Array<any> {
			return this.sort().items;
		}

		public filter(key: string, pattern: any): DataTable {
			this.items = this.search(key, pattern);
			return this;
		}

		public search(key: string, pattern: any): Array<any> {
			let matching: Array<any> = [];
			this.sort().items.forEach(function (row) {
				if (DataTable.matches(row, key, pattern)) {
					matching.push(row);
				}
			});
			return matching;
		}

		public indexOf(key: string, pattern: any): number {
			let index = 0,
				firstMatch: number = -1;
			this.sort().items.some(function (row) {
				if (DataTable.matches(row, key, pattern)) {
					firstMatch = index;
					return true;
				}
				index++;
				return false;
			});
			return firstMatch;
		}

		public lastIndexOf(key: string, pattern: any): number {
			let index: number = 0,
				lastMatch: number = -1;
			this.sort().items.forEach(function (row) {
				if (DataTable.matches(row, key, pattern)) {
					lastMatch = index;
				}
				index++;
			});
			return lastMatch;
		}
	}
}