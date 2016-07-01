var pageSession = new ReactiveDict();

Template.BillsPurchaseordersDetailsItems.rendered = function() {
	
};

Template.BillsPurchaseordersDetailsItems.events({
	
});

Template.BillsPurchaseordersDetailsItems.helpers({
	
});

var BillsPurchaseordersDetailsItemsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BillsPurchaseordersDetailsItemsViewSearchString");
	var sortBy = pageSession.get("BillsPurchaseordersDetailsItemsViewSortBy");
	var sortAscending = pageSession.get("BillsPurchaseordersDetailsItemsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["description", "unit", "quantity", "price", "amount"];
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

var BillsPurchaseordersDetailsItemsViewExport = function(cursor, fileType) {
	var data = BillsPurchaseordersDetailsItemsViewItems(cursor);
	var exportFields = ["description", "quantity", "price", "amount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.BillsPurchaseordersDetailsItemsView.rendered = function() {
	pageSession.set("BillsPurchaseordersDetailsItemsViewStyle", "table");
	
};

Template.BillsPurchaseordersDetailsItemsView.events({
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
				pageSession.set("BillsPurchaseordersDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsPurchaseordersDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsPurchaseordersDetailsItemsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.purchaseorders.details.insert", {purchaseorderId: this.params.purchaseorderId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BillsPurchaseordersDetailsItemsViewExport(this.purchaseorder_items, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BillsPurchaseordersDetailsItemsViewExport(this.purchaseorder_items, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BillsPurchaseordersDetailsItemsViewExport(this.purchaseorder_items, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BillsPurchaseordersDetailsItemsViewExport(this.purchaseorder_items, "json");
	}

	
});

Template.BillsPurchaseordersDetailsItemsView.helpers({

	"insertButtonClass": function() {
		return PurchaseorderItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.purchaseorder_items || this.purchaseorder_items.count() == 0;
	},
	"isNotEmpty": function() {
		return this.purchaseorder_items && this.purchaseorder_items.count() > 0;
	},
	"isNotFound": function() {
		return this.purchaseorder_items && pageSession.get("BillsPurchaseordersDetailsItemsViewSearchString") && BillsPurchaseordersDetailsItemsViewItems(this.purchaseorder_items).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BillsPurchaseordersDetailsItemsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BillsPurchaseordersDetailsItemsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BillsPurchaseordersDetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BillsPurchaseordersDetailsItemsViewStyle") == "gallery";
	}

	
});


Template.BillsPurchaseordersDetailsItemsViewTable.rendered = function() {
	
};

Template.BillsPurchaseordersDetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BillsPurchaseordersDetailsItemsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BillsPurchaseordersDetailsItemsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BillsPurchaseordersDetailsItemsViewSortAscending") || false;
			pageSession.set("BillsPurchaseordersDetailsItemsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BillsPurchaseordersDetailsItemsViewSortAscending", true);
		}
	},
	
});

Template.BillsPurchaseordersDetailsItemsViewTable.helpers({
	"tableItems": function() {
		return BillsPurchaseordersDetailsItemsViewItems(this.purchaseorder_items);
	}
});


Template.BillsPurchaseordersDetailsItemsViewTableItems.rendered = function() {
	
};

Template.BillsPurchaseordersDetailsItemsViewTableItems.events({
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

		PurchaseorderItems.update({ _id: this._id }, { $set: values });

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
					PurchaseorderItems.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.purchaseorders.details.edit", {purchaseorderId: UI._parentData(1).params.purchaseorderId, itemId: this._id});
		return false;
	}
});

Template.BillsPurchaseordersDetailsItemsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return PurchaseorderItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PurchaseorderItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
