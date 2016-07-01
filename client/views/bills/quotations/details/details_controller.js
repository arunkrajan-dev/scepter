this.BillsQuotationsDetailsController = RouteController.extend({
	template: "BillsQuotationsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('bills.quotations.details.items', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("quotation_details", this.params.quotationId)
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
			quotation_details: Quotations.findOne({_id:this.params.quotationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});