this.BillsDeliveryslipsDetailsItemsController = RouteController.extend({
	template: "BillsDeliveryslipsDetails",
	

	yieldTemplates: {
		'BillsDeliveryslipsDetailsItems': { to: 'BillsDeliveryslipsDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BillsDeliveryslipsDetails"); this.render("loading", { to: "BillsDeliveryslipsDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("deliveryslip_items", this.params.deliveryslipId),
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
			deliveryslip_items: DeliveryslipItems.find({deliveryslipId:this.params.deliveryslipId}, {}),
			deliveryslip_details: Deliveryslips.findOne({_id:this.params.deliveryslipId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});