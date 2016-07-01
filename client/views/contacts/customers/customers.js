var pageSession = new ReactiveDict();

Template.ContactsCustomers.rendered = function() {
	
};

Template.ContactsCustomers.events({
	
});

Template.ContactsCustomers.helpers({
	
});

var ContactsCustomersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["industry", "name", "phone", "email", "website", "address", "note"];
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

var ContactsCustomersViewExport = function(cursor, fileType) {
	var data = ContactsCustomersViewItems(cursor);
	var exportFields = ["industry", "name", "phone", "email", "website", "address", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersView.rendered = function() {
	pageSession.set("ContactsCustomersViewStyle", "table");
	
};

Template.ContactsCustomersView.events({
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
				pageSession.set("ContactsCustomersViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.insert", {type: this.params.type});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersViewExport(this.customer_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersViewExport(this.customer_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersViewExport(this.customer_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersViewExport(this.customer_list, "json");
	}

	
});

Template.ContactsCustomersView.helpers({

	"insertButtonClass": function() {
		return Customers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.customer_list || this.customer_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.customer_list && this.customer_list.count() > 0;
	},
	"isNotFound": function() {
		return this.customer_list && pageSession.get("ContactsCustomersViewSearchString") && ContactsCustomersViewItems(this.customer_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersViewTable.rendered = function() {
	
};

Template.ContactsCustomersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersViewSortAscending") || false;
			pageSession.set("ContactsCustomersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersViewItems(this.customer_list);
	}
});


Template.ContactsCustomersViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("contacts.customers.details", {customerId: this._id, type: this.type});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Customers.update({ _id: this._id }, { $set: values });

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
					Customers.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.edit", {customerId: this._id, type: this.type});
		return false;
	}
});

Template.ContactsCustomersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Customers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Customers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
