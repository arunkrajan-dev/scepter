this.BillsQuotationsDetailsEditController = RouteController.extend({
	template: "BillsQuotationsDetails",
	

	yieldTemplates: {
		'BillsQuotationsDetailsEdit': { to: 'BillsQuotationsDetailsSubcontent'}
		
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
			Meteor.subscribe("product_list"),
			Meteor.subscribe("quotation_item", this.params.itemId),
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
			product_list: Products.find({}, {sort:["name"]}),
			quotation_item: QuotationItems.findOne({_id:this.params.itemId}, {}),
			quotation_details: Quotations.findOne({_id:this.params.quotationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});