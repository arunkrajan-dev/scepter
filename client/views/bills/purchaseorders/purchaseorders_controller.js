this.BillsPurchaseordersController = RouteController.extend({
	template: "BillsPurchaseorders",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("purchaseorder_list")
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
			purchaseorder_list: Purchaseorders.find({}, {sort:[["purchaseorderNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});