this.ContactsSuppliersDetailsSummaryController = RouteController.extend({
	template: "ContactsSuppliersDetails",
	

	yieldTemplates: {
		'ContactsSuppliersDetailsSummary': { to: 'ContactsSuppliersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ContactsSuppliersDetails"); this.render("loading", { to: "ContactsSuppliersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("supplier_details", this.params.supplierId)
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
			supplier_details: Suppliers.findOne({_id:this.params.supplierId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});