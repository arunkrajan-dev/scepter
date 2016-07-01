var pageSession = new ReactiveDict();

Template.BillsInvoicesDetailsItems.rendered = function() {
	
};

Template.BillsInvoicesDetailsItems.events({
	
});

Template.BillsInvoicesDetailsItems.helpers({
	
});

var BillsInvoicesDetailsItemsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BillsInvoicesDetailsItemsViewSearchString");
	var sortBy = pageSession.get("BillsInvoicesDetailsItemsViewSortBy");
	var sortAscending = pageSession.get("BillsInvoicesDetailsItemsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["productId", "product.name", "product.url", "unit", "quantity", "price", "discount", "net", "amount"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var BillsInvoicesDetailsItemsViewExport = function(cursor, fileType) {
	var data = BillsInvoicesDetailsItemsViewItems(cursor);
	var exportFields = ["product.name", "product.url", "quantity", "price", "discount", "net", "amount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.BillsInvoicesDetailsItemsView.rendered = function() {
	pageSession.set("BillsInvoicesDetailsItemsViewStyle", "table");
	
};

Template.BillsInvoicesDetailsItemsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("BillsInvoicesDetailsItemsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("BillsInvoicesDetailsItemsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("BillsInvoicesDetailsItemsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.invoices.details.insert", {invoiceId: this.params.invoiceId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BillsInvoicesDetailsItemsViewExport(this.invoice_items, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BillsInvoicesDetailsItemsViewExport(this.invoice_items, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BillsInvoicesDetailsItemsViewExport(this.invoice_items, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BillsInvoicesDetailsItemsViewExport(this.invoice_items, "json");
	}

	
});

Template.BillsInvoicesDetailsItemsView.helpers({

	"insertButtonClass": function() {
		return InvoiceItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.invoice_items || this.invoice_items.count() == 0;
	},
	"isNotEmpty": function() {
		return this.invoice_items && this.invoice_items.count() > 0;
	},
	"isNotFound": function() {
		return this.invoice_items && pageSession.get("BillsInvoicesDetailsItemsViewSearchString") && BillsInvoicesDetailsItemsViewItems(this.invoice_items).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BillsInvoicesDetailsItemsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BillsInvoicesDetailsItemsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BillsInvoicesDetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BillsInvoicesDetailsItemsViewStyle") == "gallery";
	}

	
});


Template.BillsInvoicesDetailsItemsViewTable.rendered = function() {
	
};

Template.BillsInvoicesDetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BillsInvoicesDetailsItemsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BillsInvoicesDetailsItemsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BillsInvoicesDetailsItemsViewSortAscending") || false;
			pageSession.set("BillsInvoicesDetailsItemsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BillsInvoicesDetailsItemsViewSortAscending", true);
		}
	},
	
});

Template.BillsInvoicesDetailsItemsViewTable.helpers({
	"tableItems": function() {
		return BillsInvoicesDetailsItemsViewItems(this.invoice_items);
	}
});


Template.BillsInvoicesDetailsItemsViewTableItems.rendered = function() {
	
};

Template.BillsInvoicesDetailsItemsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		InvoiceItems.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();

		var me = this,
			el = $('.modal');

		el.openModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			ready: function() {
				el.find('.modal-confirm').on('click', function() {
					InvoiceItems.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.invoices.details.edit", {invoiceId: UI._parentData(1).params.invoiceId, itemId: this._id});
		return false;
	}
});

Template.BillsInvoicesDetailsItemsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InvoiceItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InvoiceItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
