this.BillsDeliveryslipsDetailsEditController = RouteController.extend({
	template: "BillsDeliveryslipsDetails",
	

	yieldTemplates: {
		'BillsDeliveryslipsDetailsEdit': { to: 'BillsDeliveryslipsDetailsSubcontent'}
		
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
			Meteor.subscribe("product_list"),
			Meteor.subscribe("deliveryslip_item", this.params.itemId),
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
			product_list: Products.find({}, {sort:["name"]}),
			deliveryslip_item: DeliveryslipItems.findOne({_id:this.params.itemId}, {}),
			deliveryslip_details: Deliveryslips.findOne({_id:this.params.deliveryslipId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});