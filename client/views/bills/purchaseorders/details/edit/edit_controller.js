this.BillsPurchaseordersDetailsEditController = RouteController.extend({
	template: "BillsPurchaseordersDetails",
	

	yieldTemplates: {
		'BillsPurchaseordersDetailsEdit': { to: 'BillsPurchaseordersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BillsPurchaseordersDetails"); this.render("loading", { to: "BillsPurchaseordersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("purchaseorder_item", this.params.itemId),
			Meteor.subscribe("purchaseorder_details", this.params.purchaseorderId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			purchaseorder_item: PurchaseorderItems.findOne({_id:this.params.itemId}, {}),
			purchaseorder_details: Purchaseorders.findOne({_id:this.params.purchaseorderId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});