this.ContactsCustomersDetailsLogEditController = RouteController.extend({
	template: "ContactsCustomersDetailsLogEdit",
	

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
			Meteor.subscribe("log_details", this.params.logId)
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
			log_details: Logs.findOne({_id:this.params.logId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});