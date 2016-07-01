this.BillsQuotationsController = RouteController.extend({
	template: "BillsQuotations",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("quotation_list")
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
			quotation_list: Quotations.find({}, {sort:[["quotationNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});