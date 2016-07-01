var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsExpenditures.rendered = function() {
	
};

Template.ContactsCustomersDetailsExpenditures.events({
	
});

Template.ContactsCustomersDetailsExpenditures.helpers({
	
});

var ContactsCustomersDetailsExpendituresViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersDetailsExpendituresViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersDetailsExpendituresViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersDetailsExpendituresViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["type", "subType", "date", "totalAmount", "customerId", "customer.name", "userId", "user.profile.name"];
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

var ContactsCustomersDetailsExpendituresViewExport = function(cursor, fileType) {
	var data = ContactsCustomersDetailsExpendituresViewItems(cursor);
	var exportFields = ["subType", "date", "totalAmount", "customer.name", "user.profile.name"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersDetailsExpendituresView.rendered = function() {
	pageSession.set("ContactsCustomersDetailsExpendituresViewStyle", "table");
	
};

Template.ContactsCustomersDetailsExpendituresView.events({
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
				pageSession.set("ContactsCustomersDetailsExpendituresViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsExpendituresViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsExpendituresViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.details.expenditure_insert", {customerId: this.params.customerId, type: this.params.type});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsExpendituresViewExport(this.expenditure_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsExpendituresViewExport(this.expenditure_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsExpendituresViewExport(this.expenditure_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsExpendituresViewExport(this.expenditure_list_customer, "json");
	}

	
});

Template.ContactsCustomersDetailsExpendituresView.helpers({

	"insertButtonClass": function() {
		return Expenditure.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.expenditure_list_customer || this.expenditure_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.expenditure_list_customer && this.expenditure_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.expenditure_list_customer && pageSession.get("ContactsCustomersDetailsExpendituresViewSearchString") && ContactsCustomersDetailsExpendituresViewItems(this.expenditure_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersDetailsExpendituresViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersDetailsExpendituresViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersDetailsExpendituresViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersDetailsExpendituresViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersDetailsExpendituresViewTable.rendered = function() {
	
};

Template.ContactsCustomersDetailsExpendituresViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersDetailsExpendituresViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersDetailsExpendituresViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersDetailsExpendituresViewSortAscending") || false;
			pageSession.set("ContactsCustomersDetailsExpendituresViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersDetailsExpendituresViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersDetailsExpendituresViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersDetailsExpendituresViewItems(this.expenditure_list_customer);
	}
});


Template.ContactsCustomersDetailsExpendituresViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersDetailsExpendituresViewTableItems.events({
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

		Expenditure.update({ _id: this._id }, { $set: values });

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
					Expenditure.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.details.expenditure_edit", {customerId: UI._parentData(1).params.customerId, type: UI._parentData(1).params.type, expenditureId: this._id});
		return false;
	}
});

Template.ContactsCustomersDetailsExpendituresViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Expenditure.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Expenditure.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
