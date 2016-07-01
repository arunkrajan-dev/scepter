this.BillsPurchaseordersDetailsItemsController = RouteController.extend({
	template: "BillsPurchaseordersDetails",
	

	yieldTemplates: {
		'BillsPurchaseordersDetailsItems': { to: 'BillsPurchaseordersDetailsSubcontent'}
		
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
			Meteor.subscribe("purchaseorder_items", this.params.purchaseorderId),
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
			purchaseorder_items: PurchaseorderItems.find({purchaseorderId:this.params.purchaseorderId}, {}),
			purchaseorder_details: Purchaseorders.findOne({_id:this.params.purchaseorderId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});