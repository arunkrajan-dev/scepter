this.BillsDeliveryslipsController = RouteController.extend({
	template: "BillsDeliveryslips",
	

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
			Meteor.subscribe("deliveryslip_list")
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
			deliveryslip_list: Deliveryslips.find({}, {sort:[["deliveryslipNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});