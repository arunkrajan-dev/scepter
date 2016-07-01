var pageSession = new ReactiveDict();

Template.BillsDeliveryslipsDetailsItems.rendered = function() {
	
};

Template.BillsDeliveryslipsDetailsItems.events({
	
});

Template.BillsDeliveryslipsDetailsItems.helpers({
	
});

var BillsDeliveryslipsDetailsItemsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BillsDeliveryslipsDetailsItemsViewSearchString");
	var sortBy = pageSession.get("BillsDeliveryslipsDetailsItemsViewSortBy");
	var sortAscending = pageSession.get("BillsDeliveryslipsDetailsItemsViewSortAscending");
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

var BillsDeliveryslipsDetailsItemsViewExport = function(cursor, fileType) {
	var data = BillsDeliveryslipsDetailsItemsViewItems(cursor);
	var exportFields = ["product.name", "product.url", "quantity", "price", "discount", "net", "amount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.BillsDeliveryslipsDetailsItemsView.rendered = function() {
	pageSession.set("BillsDeliveryslipsDetailsItemsViewStyle", "table");
	
};

Template.BillsDeliveryslipsDetailsItemsView.events({
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
				pageSession.set("BillsDeliveryslipsDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsDeliveryslipsDetailsItemsViewSearchString", searchString);
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
					pageSession.set("BillsDeliveryslipsDetailsItemsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.deliveryslips.details.insert", {deliveryslipId: this.params.deliveryslipId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BillsDeliveryslipsDetailsItemsViewExport(this.deliveryslip_items, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BillsDeliveryslipsDetailsItemsViewExport(this.deliveryslip_items, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BillsDeliveryslipsDetailsItemsViewExport(this.deliveryslip_items, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BillsDeliveryslipsDetailsItemsViewExport(this.deliveryslip_items, "json");
	}

	
});

Template.BillsDeliveryslipsDetailsItemsView.helpers({

	"insertButtonClass": function() {
		return DeliveryslipItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.deliveryslip_items || this.deliveryslip_items.count() == 0;
	},
	"isNotEmpty": function() {
		return this.deliveryslip_items && this.deliveryslip_items.count() > 0;
	},
	"isNotFound": function() {
		return this.deliveryslip_items && pageSession.get("BillsDeliveryslipsDetailsItemsViewSearchString") && BillsDeliveryslipsDetailsItemsViewItems(this.deliveryslip_items).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BillsDeliveryslipsDetailsItemsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BillsDeliveryslipsDetailsItemsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BillsDeliveryslipsDetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BillsDeliveryslipsDetailsItemsViewStyle") == "gallery";
	}

	
});


Template.BillsDeliveryslipsDetailsItemsViewTable.rendered = function() {
	
};

Template.BillsDeliveryslipsDetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BillsDeliveryslipsDetailsItemsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BillsDeliveryslipsDetailsItemsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BillsDeliveryslipsDetailsItemsViewSortAscending") || false;
			pageSession.set("BillsDeliveryslipsDetailsItemsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BillsDeliveryslipsDetailsItemsViewSortAscending", true);
		}
	},
	
});

Template.BillsDeliveryslipsDetailsItemsViewTable.helpers({
	"tableItems": function() {
		return BillsDeliveryslipsDetailsItemsViewItems(this.deliveryslip_items);
	}
});


Template.BillsDeliveryslipsDetailsItemsViewTableItems.rendered = function() {
	
};

Template.BillsDeliveryslipsDetailsItemsViewTableItems.events({
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

		DeliveryslipItems.update({ _id: this._id }, { $set: values });

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
					DeliveryslipItems.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bills.deliveryslips.details.edit", {deliveryslipId: UI._parentData(1).params.deliveryslipId, itemId: this._id});
		return false;
	}
});

Template.BillsDeliveryslipsDetailsItemsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return DeliveryslipItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return DeliveryslipItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
