this.ContactsSuppliersDetailsPurchaseordersController = RouteController.extend({
	template: "ContactsSuppliersDetails",
	

	yieldTemplates: {
		'ContactsSuppliersDetailsPurchaseorders': { to: 'ContactsSuppliersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ContactsSuppliersDetails"); this.render("loading", { to: "ContactsSuppliersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("purchaseorder_list_customer", this.params.customerId)
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
			purchaseorder_list_customer: Purchaseorders.find({customerId:this.params.customerId}, {sort:[["purchaseorderNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});