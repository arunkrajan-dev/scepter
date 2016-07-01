this.ContactsCustomersDetailsInvoicesController = RouteController.extend({
	template: "ContactsCustomersDetails",
	

	yieldTemplates: {
		'ContactsCustomersDetailsInvoices': { to: 'ContactsCustomersDetailsSubcontent'}
		
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
			Meteor.subscribe("invoice_list_customer", this.params.customerId)
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
			invoice_list_customer: Invoices.find({customerId:this.params.customerId}, {sort:[["invoiceNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});