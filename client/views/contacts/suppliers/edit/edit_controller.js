this.ContactsSuppliersEditController = RouteController.extend({
	template: "ContactsSuppliersEdit",
	

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