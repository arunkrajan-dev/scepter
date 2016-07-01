this.BillsQuotationsDetailsItemsController = RouteController.extend({
	template: "BillsQuotationsDetails",
	

	yieldTemplates: {
		'BillsQuotationsDetailsItems': { to: 'BillsQuotationsDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BillsQuotationsDetails"); this.render("loading", { to: "BillsQuotationsDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("quotation_items", this.params.quotationId),
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
			quotation_items: QuotationItems.find({quotationId:this.params.quotationId}, {}),
			quotation_details: Quotations.findOne({_id:this.params.quotationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});