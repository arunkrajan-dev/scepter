var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsDeliveryslips.rendered = function() {
	
};

Template.ContactsCustomersDetailsDeliveryslips.events({
	
});

Template.ContactsCustomersDetailsDeliveryslips.helpers({
	
});

var ContactsCustomersDetailsDeliveryslipsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["deliveryslipNumber", "date", "customerId", "customer.name", "customer.address", "totalAmount", "note"];
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

var ContactsCustomersDetailsDeliveryslipsViewExport = function(cursor, fileType) {
	var data = ContactsCustomersDetailsDeliveryslipsViewItems(cursor);
	var exportFields = ["deliveryslipNumber", "date", "customer.name", "customer.address", "totalAmount", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersDetailsDeliveryslipsView.rendered = function() {
	pageSession.set("ContactsCustomersDetailsDeliveryslipsViewStyle", "table");
	
};

Template.ContactsCustomersDetailsDeliveryslipsView.events({
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
				pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.deliveryslips.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsDeliveryslipsViewExport(this.deliveryslip_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsDeliveryslipsViewExport(this.deliveryslip_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsDeliveryslipsViewExport(this.deliveryslip_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsDeliveryslipsViewExport(this.deliveryslip_list_customer, "json");
	}

	
});

Template.ContactsCustomersDetailsDeliveryslipsView.helpers({

	"insertButtonClass": function() {
		return Deliveryslips.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.deliveryslip_list_customer || this.deliveryslip_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.deliveryslip_list_customer && this.deliveryslip_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.deliveryslip_list_customer && pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSearchString") && ContactsCustomersDetailsDeliveryslipsViewItems(this.deliveryslip_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersDetailsDeliveryslipsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersDetailsDeliveryslipsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersDetailsDeliveryslipsViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersDetailsDeliveryslipsViewTable.rendered = function() {
	
};

Template.ContactsCustomersDetailsDeliveryslipsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersDetailsDeliveryslipsViewSortAscending") || false;
			pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersDetailsDeliveryslipsViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersDetailsDeliveryslipsViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersDetailsDeliveryslipsViewItems(this.deliveryslip_list_customer);
	}
});


Template.ContactsCustomersDetailsDeliveryslipsViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersDetailsDeliveryslipsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("bills.deliveryslips.details", {deliveryslipId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Deliveryslips.update({ _id: this._id }, { $set: values });

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
					Deliveryslips.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.deliveryslips.edit", {deliveryslipId: this._id});
		return false;
	}
});

Template.ContactsCustomersDetailsDeliveryslipsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Deliveryslips.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Deliveryslips.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
