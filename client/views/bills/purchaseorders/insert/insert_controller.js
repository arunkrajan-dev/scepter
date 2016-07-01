this.BillsPurchaseordersInsertController = RouteController.extend({
	template: "BillsPurchaseordersInsert",
	

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
			Meteor.subscribe("purchaseorders_empty"),
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
			supplier_list: Suppliers.find({}, {sort:["name"]}),
			purchaseorders_empty: Purchaseorders.findOne({_id:null}, {}),
			purchaseorder_list: Purchaseorders.find({}, {sort:[["purchaseorderNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});