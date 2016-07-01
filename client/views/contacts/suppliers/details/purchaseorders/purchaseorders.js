var pageSession = new ReactiveDict();

Template.ContactsSuppliersDetailsPurchaseorders.rendered = function() {
	
};

Template.ContactsSuppliersDetailsPurchaseorders.events({
	
});

Template.ContactsSuppliersDetailsPurchaseorders.helpers({
	
});

var ContactsSuppliersDetailsPurchaseordersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSearchString");
	var sortBy = pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSortBy");
	var sortAscending = pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["purchaseorderNumber", "date", "supplierId", "supplier.name", "supplier.address", "totalAmount", "shipto", "shipvia", "term", "expectedDate", "note"];
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

var ContactsSuppliersDetailsPurchaseordersViewExport = function(cursor, fileType) {
	var data = ContactsSuppliersDetailsPurchaseordersViewItems(cursor);
	var exportFields = ["purchaseorderNumber", "date", "supplier.name", "supplier.address", "totalAmount", "shipto", "shipvia", "term", "expectedDate", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsSuppliersDetailsPurchaseordersView.rendered = function() {
	pageSession.set("ContactsSuppliersDetailsPurchaseordersViewStyle", "table");
	
};

Template.ContactsSuppliersDetailsPurchaseordersView.events({
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
				pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSearchString", searchString);
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
					pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSearchString", searchString);
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
					pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.purchaseorders.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsSuppliersDetailsPurchaseordersViewExport(this.purchaseorder_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsSuppliersDetailsPurchaseordersViewExport(this.purchaseorder_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsSuppliersDetailsPurchaseordersViewExport(this.purchaseorder_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsSuppliersDetailsPurchaseordersViewExport(this.purchaseorder_list_customer, "json");
	}

	
});

Template.ContactsSuppliersDetailsPurchaseordersView.helpers({

	"insertButtonClass": function() {
		return Purchaseorders.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.purchaseorder_list_customer || this.purchaseorder_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.purchaseorder_list_customer && this.purchaseorder_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.purchaseorder_list_customer && pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSearchString") && ContactsSuppliersDetailsPurchaseordersViewItems(this.purchaseorder_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsSuppliersDetailsPurchaseordersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsSuppliersDetailsPurchaseordersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsSuppliersDetailsPurchaseordersViewStyle") == "gallery";
	}

	
});


Template.ContactsSuppliersDetailsPurchaseordersViewTable.rendered = function() {
	
};

Template.ContactsSuppliersDetailsPurchaseordersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsSuppliersDetailsPurchaseordersViewSortAscending") || false;
			pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsSuppliersDetailsPurchaseordersViewSortAscending", true);
		}
	},
	
});

Template.ContactsSuppliersDetailsPurchaseordersViewTable.helpers({
	"tableItems": function() {
		return ContactsSuppliersDetailsPurchaseordersViewItems(this.purchaseorder_list_customer);
	}
});


Template.ContactsSuppliersDetailsPurchaseordersViewTableItems.rendered = function() {
	
};

Template.ContactsSuppliersDetailsPurchaseordersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("bills.purchaseorders.details", {purchaseorderId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Purchaseorders.update({ _id: this._id }, { $set: values });

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
					Purchaseorders.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.purchaseorders.edit", {purchaseorderId: this._id});
		return false;
	}
});

Template.ContactsSuppliersDetailsPurchaseordersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Purchaseorders.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Purchaseorders.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
