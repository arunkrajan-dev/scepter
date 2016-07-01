var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsInvoices.rendered = function() {
	
};

Template.ContactsCustomersDetailsInvoices.events({
	
});

Template.ContactsCustomersDetailsInvoices.helpers({
	
});

var ContactsCustomersDetailsInvoicesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersDetailsInvoicesViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersDetailsInvoicesViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersDetailsInvoicesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["invoiceNumber", "date", "note", "customerId", "customer.name", "customer.address", "totalAmount"];
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

var ContactsCustomersDetailsInvoicesViewExport = function(cursor, fileType) {
	var data = ContactsCustomersDetailsInvoicesViewItems(cursor);
	var exportFields = ["invoiceNumber", "date", "note", "customer.name", "customer.address", "totalAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersDetailsInvoicesView.rendered = function() {
	pageSession.set("ContactsCustomersDetailsInvoicesViewStyle", "table");
	
};

Template.ContactsCustomersDetailsInvoicesView.events({
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
				pageSession.set("ContactsCustomersDetailsInvoicesViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsInvoicesViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsInvoicesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.invoices.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsInvoicesViewExport(this.invoice_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsInvoicesViewExport(this.invoice_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsInvoicesViewExport(this.invoice_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsInvoicesViewExport(this.invoice_list_customer, "json");
	}

	
});

Template.ContactsCustomersDetailsInvoicesView.helpers({

	"insertButtonClass": function() {
		return Invoices.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.invoice_list_customer || this.invoice_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.invoice_list_customer && this.invoice_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.invoice_list_customer && pageSession.get("ContactsCustomersDetailsInvoicesViewSearchString") && ContactsCustomersDetailsInvoicesViewItems(this.invoice_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersDetailsInvoicesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersDetailsInvoicesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersDetailsInvoicesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersDetailsInvoicesViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersDetailsInvoicesViewTable.rendered = function() {
	
};

Template.ContactsCustomersDetailsInvoicesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersDetailsInvoicesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersDetailsInvoicesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersDetailsInvoicesViewSortAscending") || false;
			pageSession.set("ContactsCustomersDetailsInvoicesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersDetailsInvoicesViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersDetailsInvoicesViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersDetailsInvoicesViewItems(this.invoice_list_customer);
	}
});


Template.ContactsCustomersDetailsInvoicesViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersDetailsInvoicesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("bills.invoices.details", {invoiceId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Invoices.update({ _id: this._id }, { $set: values });

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
					Invoices.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.invoices.edit", {invoiceId: this._id});
		return false;
	}
});

Template.ContactsCustomersDetailsInvoicesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Invoices.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Invoices.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
