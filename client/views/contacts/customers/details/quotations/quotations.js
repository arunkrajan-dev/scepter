var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsQuotations.rendered = function() {
	
};

Template.ContactsCustomersDetailsQuotations.events({
	
});

Template.ContactsCustomersDetailsQuotations.helpers({
	
});

var ContactsCustomersDetailsQuotationsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersDetailsQuotationsViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersDetailsQuotationsViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersDetailsQuotationsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["quotationNumber", "date", "customerId", "customer.name", "customer.address", "totalAmount", "note"];
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

var ContactsCustomersDetailsQuotationsViewExport = function(cursor, fileType) {
	var data = ContactsCustomersDetailsQuotationsViewItems(cursor);
	var exportFields = ["quotationNumber", "date", "customer.name", "customer.address", "totalAmount", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersDetailsQuotationsView.rendered = function() {
	pageSession.set("ContactsCustomersDetailsQuotationsViewStyle", "table");
	
};

Template.ContactsCustomersDetailsQuotationsView.events({
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
				pageSession.set("ContactsCustomersDetailsQuotationsViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsQuotationsViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsQuotationsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.quotations.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsQuotationsViewExport(this.quotation_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsQuotationsViewExport(this.quotation_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsQuotationsViewExport(this.quotation_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsQuotationsViewExport(this.quotation_list_customer, "json");
	}

	
});

Template.ContactsCustomersDetailsQuotationsView.helpers({

	"insertButtonClass": function() {
		return Quotations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.quotation_list_customer || this.quotation_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.quotation_list_customer && this.quotation_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.quotation_list_customer && pageSession.get("ContactsCustomersDetailsQuotationsViewSearchString") && ContactsCustomersDetailsQuotationsViewItems(this.quotation_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersDetailsQuotationsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersDetailsQuotationsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersDetailsQuotationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersDetailsQuotationsViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersDetailsQuotationsViewTable.rendered = function() {
	
};

Template.ContactsCustomersDetailsQuotationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersDetailsQuotationsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersDetailsQuotationsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersDetailsQuotationsViewSortAscending") || false;
			pageSession.set("ContactsCustomersDetailsQuotationsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersDetailsQuotationsViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersDetailsQuotationsViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersDetailsQuotationsViewItems(this.quotation_list_customer);
	}
});


Template.ContactsCustomersDetailsQuotationsViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersDetailsQuotationsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("bills.quotations.details", {quotationId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Quotations.update({ _id: this._id }, { $set: values });

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
					Quotations.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.quotations.edit", {quotationId: this._id});
		return false;
	}
});

Template.ContactsCustomersDetailsQuotationsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Quotations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Quotations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
