var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsTasks.rendered = function() {
	
};

Template.ContactsCustomersDetailsTasks.events({
	
});

Template.ContactsCustomersDetailsTasks.helpers({
	
});

var ContactsCustomersDetailsTasksViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsCustomersDetailsTasksViewSearchString");
	var sortBy = pageSession.get("ContactsCustomersDetailsTasksViewSortBy");
	var sortAscending = pageSession.get("ContactsCustomersDetailsTasksViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["type", "priority", "title", "Description", "date", "expectedCompltion", "customerId", "customer.name", "userId", "user.profile.name", "status"];
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

var ContactsCustomersDetailsTasksViewExport = function(cursor, fileType) {
	var data = ContactsCustomersDetailsTasksViewItems(cursor);
	var exportFields = ["type", "priority", "title", "Description", "date", "expectedCompltion", "customer.name", "user.profile.name"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsCustomersDetailsTasksView.rendered = function() {
	pageSession.set("ContactsCustomersDetailsTasksViewStyle", "table");
	
};

Template.ContactsCustomersDetailsTasksView.events({
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
				pageSession.set("ContactsCustomersDetailsTasksViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsTasksViewSearchString", searchString);
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
					pageSession.set("ContactsCustomersDetailsTasksViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.details.task_insert", {customerId: this.params.customerId, type: this.params.type});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsTasksViewExport(this.task_list_customer, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsTasksViewExport(this.task_list_customer, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsTasksViewExport(this.task_list_customer, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsCustomersDetailsTasksViewExport(this.task_list_customer, "json");
	}

	
});

Template.ContactsCustomersDetailsTasksView.helpers({

	"insertButtonClass": function() {
		return Tasks.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.task_list_customer || this.task_list_customer.count() == 0;
	},
	"isNotEmpty": function() {
		return this.task_list_customer && this.task_list_customer.count() > 0;
	},
	"isNotFound": function() {
		return this.task_list_customer && pageSession.get("ContactsCustomersDetailsTasksViewSearchString") && ContactsCustomersDetailsTasksViewItems(this.task_list_customer).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsCustomersDetailsTasksViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsCustomersDetailsTasksViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsCustomersDetailsTasksViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsCustomersDetailsTasksViewStyle") == "gallery";
	}

	
});


Template.ContactsCustomersDetailsTasksViewTable.rendered = function() {
	
};

Template.ContactsCustomersDetailsTasksViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsCustomersDetailsTasksViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsCustomersDetailsTasksViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsCustomersDetailsTasksViewSortAscending") || false;
			pageSession.set("ContactsCustomersDetailsTasksViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsCustomersDetailsTasksViewSortAscending", true);
		}
	},
	
});

Template.ContactsCustomersDetailsTasksViewTable.helpers({
	"tableItems": function() {
		return ContactsCustomersDetailsTasksViewItems(this.task_list_customer);
	}
});


Template.ContactsCustomersDetailsTasksViewTableItems.rendered = function() {
	
};

Template.ContactsCustomersDetailsTasksViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("tasks.details", {taskId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Tasks.update({ _id: this._id }, { $set: values });

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
					Tasks.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers.details.task_edit", {customerId: UI._parentData(1).params.customerId, type: UI._parentData(1).params.type, taskId: this._id});
		return false;
	}
});

Template.ContactsCustomersDetailsTasksViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Tasks.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Tasks.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
