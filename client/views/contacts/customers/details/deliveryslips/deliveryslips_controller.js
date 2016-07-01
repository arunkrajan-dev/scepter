this.ContactsCustomersDetailsDeliveryslipsController = RouteController.extend({
	template: "ContactsCustomersDetails",
	

	yieldTemplates: {
		'ContactsCustomersDetailsDeliveryslips': { to: 'ContactsCustomersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ContactsCustomersDetails"); this.render("loading", { to: "ContactsCustomersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("deliveryslip_list_customer", this.params.customerId)
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
			deliveryslip_list_customer: Deliveryslips.find({customerId:this.params.customerId}, {sort:[["deliveryslipNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});