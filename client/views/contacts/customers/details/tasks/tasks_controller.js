this.ContactsCustomersDetailsTasksController = RouteController.extend({
	template: "ContactsCustomersDetails",
	

	yieldTemplates: {
		'ContactsCustomersDetailsTasks': { to: 'ContactsCustomersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ContactsCustomersDetails"); this.render("loading", { to: "ContactsCustomersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("task_list_customer", this.params.customerId)
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
			task_list_customer: Tasks.find({customerId:this.params.customerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});