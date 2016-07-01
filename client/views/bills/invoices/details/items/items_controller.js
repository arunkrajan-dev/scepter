this.BillsInvoicesDetailsItemsController = RouteController.extend({
	template: "BillsInvoicesDetails",
	

	yieldTemplates: {
		'BillsInvoicesDetailsItems': { to: 'BillsInvoicesDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BillsInvoicesDetails"); this.render("loading", { to: "BillsInvoicesDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("invoice_items", this.params.invoiceId),
			Meteor.subscribe("invoice_details", this.params.invoiceId)
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
			invoice_items: InvoiceItems.find({invoiceId:this.params.invoiceId}, {}),
			invoice_details: Invoices.findOne({_id:this.params.invoiceId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});