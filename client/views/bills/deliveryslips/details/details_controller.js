this.BillsDeliveryslipsDetailsController = RouteController.extend({
	template: "BillsDeliveryslipsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('bills.deliveryslips.details.items', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("deliveryslip_details", this.params.deliveryslipId)
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
			deliveryslip_details: Deliveryslips.findOne({_id:this.params.deliveryslipId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});