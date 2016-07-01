this.ContactsOthersDetailsController = RouteController.extend({
	template: "ContactsOthersDetails",
	

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
			Meteor.subscribe("other_details", this.params.otherId)
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
			other_details: Others.findOne({_id:this.params.otherId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});