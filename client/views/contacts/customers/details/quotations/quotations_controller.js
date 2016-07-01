this.ContactsCustomersDetailsQuotationsController = RouteController.extend({
	template: "ContactsCustomersDetails",
	

	yieldTemplates: {
		'ContactsCustomersDetailsQuotations': { to: 'ContactsCustomersDetailsSubcontent'}
		
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
			Meteor.subscribe("quotation_list_customer", this.params.customerId)
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
			quotation_list_customer: Quotations.find({customerId:this.params.customerId}, {sort:[["quotationNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});