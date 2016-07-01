var pageSession = new ReactiveDict();

Template.BillsQuotationsDetailsItems.rendered = function() {
	
};

Template.BillsQuotationsDetailsItems.events({
	
});

Template.BillsQuotationsDetailsItems.helpers({
	
});

var BillsQuotationsDetailsItemsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BillsQuotationsDetailsItemsViewSearchString");
	var sortBy = pageSession.get("BillsQuotationsDetailsItemsViewSortBy");
	var sortAscending = pageSession.get("BillsQuotationsDetailsItemsViewSortAscending");
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

var BillsQuotationsDetailsItemsViewExport = function(cursor, fileType) {
	var data = BillsQuotationsDetailsItemsViewItems(cursor);
	var exportFields = ["product.name", "product.url", "quantity", "price", "discount", "net", "amount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.BillsQuotationsDetailsItemsView.rendered = function() {
	pageSession.set("BillsQuotationsDetailsItemsViewStyle", "table");
	
};

Template.BillsQuotationsDetailsItemsView.events({
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
				pageSession.set("BillsQuotationsDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsQuotationsDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsQuotationsDetailsItemsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.quotations.details.insert", {quotationId: this.params.quotationId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BillsQuotationsDetailsItemsViewExport(this.quotation_items, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BillsQuotationsDetailsItemsViewExport(this.quotation_items, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BillsQuotationsDetailsItemsViewExport(this.quotation_items, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BillsQuotationsDetailsItemsViewExport(this.quotation_items, "json");
	}

	
});

Template.BillsQuotationsDetailsItemsView.helpers({

	"insertButtonClass": function() {
		return QuotationItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.quotation_items || this.quotation_items.count() == 0;
	},
	"isNotEmpty": function() {
		return this.quotation_items && this.quotation_items.count() > 0;
	},
	"isNotFound": function() {
		return this.quotation_items && pageSession.get("BillsQuotationsDetailsItemsViewSearchString") && BillsQuotationsDetailsItemsViewItems(this.quotation_items).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BillsQuotationsDetailsItemsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BillsQuotationsDetailsItemsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BillsQuotationsDetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BillsQuotationsDetailsItemsViewStyle") == "gallery";
	}

	
});


Template.BillsQuotationsDetailsItemsViewTable.rendered = function() {
	
};

Template.BillsQuotationsDetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BillsQuotationsDetailsItemsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BillsQuotationsDetailsItemsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BillsQuotationsDetailsItemsViewSortAscending") || false;
			pageSession.set("BillsQuotationsDetailsItemsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BillsQuotationsDetailsItemsViewSortAscending", true);
		}
	},
	
});

Template.BillsQuotationsDetailsItemsViewTable.helpers({
	"tableItems": function() {
		return BillsQuotationsDetailsItemsViewItems(this.quotation_items);
	}
});


Template.BillsQuotationsDetailsItemsViewTableItems.rendered = function() {
	
};

Template.BillsQuotationsDetailsItemsViewTableItems.events({
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

		QuotationItems.update({ _id: this._id }, { $set: values });

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
					QuotationItems.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.quotations.details.edit", {quotationId: UI._parentData(1).params.quotationId, itemId: this._id});
		return false;
	}
});

Template.BillsQuotationsDetailsItemsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return QuotationItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return QuotationItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
