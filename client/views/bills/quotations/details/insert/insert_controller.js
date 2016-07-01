this.BillsQuotationsDetailsInsertController = RouteController.extend({
	template: "BillsQuotationsDetails",
	

	yieldTemplates: {
		'BillsQuotationsDetailsInsert': { to: 'BillsQuotationsDetailsSubcontent'}
		
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
			Meteor.subscribe("quotation_items_empty"),
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
			quotation_items_empty: QuotationItems.findOne({_id:null}, {}),
			quotation_details: Quotations.findOne({_id:this.params.quotationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});