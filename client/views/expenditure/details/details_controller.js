this.ExpenditureDetailsController = RouteController.extend({
	template: "ExpenditureDetails",
	

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
			Meteor.subscribe("expenditure_details", this.params.expenditureId)
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
			expenditure_details: Expenditure.findOne({_id:this.params.expenditureId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});