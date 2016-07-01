this.BillsInvoicesDetailsEditController = RouteController.extend({
	template: "BillsInvoicesDetails",
	

	yieldTemplates: {
		'BillsInvoicesDetailsEdit': { to: 'BillsInvoicesDetailsSubcontent'}
		
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
			Meteor.subscribe("product_list"),
			Meteor.subscribe("invoice_item", this.params.itemId),
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
			product_list: Products.find({}, {sort:["name"]}),
			invoice_item: InvoiceItems.findOne({_id:this.params.itemId}, {}),
			invoice_details: Invoices.findOne({_id:this.params.invoiceId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});