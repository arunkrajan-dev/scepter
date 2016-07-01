this.BillsPurchaseordersEditController = RouteController.extend({
	template: "BillsPurchaseordersEdit",
	

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
			Meteor.subscribe("supplier_list"),
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
			supplier_list: Suppliers.find({}, {sort:["name"]}),
			purchaseorder_details: Purchaseorders.findOne({_id:this.params.purchaseorderId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});