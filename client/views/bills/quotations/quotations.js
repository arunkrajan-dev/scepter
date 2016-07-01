var pageSession = new ReactiveDict();

Template.BillsQuotations.rendered = function() {
	
};

Template.BillsQuotations.events({
	
});

Template.BillsQuotations.helpers({
	
});

var BillsQuotationsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BillsQuotationsViewSearchString");
	var sortBy = pageSession.get("BillsQuotationsViewSortBy");
	var sortAscending = pageSession.get("BillsQuotationsViewSortAscending");
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

var BillsQuotationsViewExport = function(cursor, fileType) {
	var data = BillsQuotationsViewItems(cursor);
	var exportFields = ["quotationNumber", "date", "customer.name", "customer.address", "totalAmount", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.BillsQuotationsView.rendered = function() {
	pageSession.set("BillsQuotationsViewStyle", "table");
	
};

Template.BillsQuotationsView.events({
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
				pageSession.set("BillsQuotationsViewSearchString", searchString);
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
					pageSession.set("BillsQuotationsViewSearchString", searchString);
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
					pageSession.set("BillsQuotationsViewSearchString", "");
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
		BillsQuotationsViewExport(this.quotation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BillsQuotationsViewExport(this.quotation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BillsQuotationsViewExport(this.quotation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BillsQuotationsViewExport(this.quotation_list, "json");
	}

	
});

Template.BillsQuotationsView.helpers({

	"insertButtonClass": function() {
		return Quotations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.quotation_list || this.quotation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.quotation_list && this.quotation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.quotation_list && pageSession.get("BillsQuotationsViewSearchString") && BillsQuotationsViewItems(this.quotation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BillsQuotationsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BillsQuotationsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BillsQuotationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BillsQuotationsViewStyle") == "gallery";
	}

	
});


Template.BillsQuotationsViewTable.rendered = function() {
	
};

Template.BillsQuotationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BillsQuotationsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BillsQuotationsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BillsQuotationsViewSortAscending") || false;
			pageSession.set("BillsQuotationsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BillsQuotationsViewSortAscending", true);
		}
	},
	
});

Template.BillsQuotationsViewTable.helpers({
	"tableItems": function() {
		return BillsQuotationsViewItems(this.quotation_list);
	}
});


Template.BillsQuotationsViewTableItems.rendered = function() {
	
};

Template.BillsQuotationsViewTableItems.events({
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

Template.BillsQuotationsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Quotations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Quotations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
