this.TasksInsertController = RouteController.extend({
	template: "TasksInsert",
	

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
			Meteor.subscribe("customer_list_select"),
			Meteor.subscribe("admin_users"),
			Meteor.subscribe("task_empty"),
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
			customer_list_select: Customers.find({}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			admin_users: Users.find({}, {}),
			task_empty: Tasks.findOne({_id:null}, {}),
			task_list_customer: Tasks.find({customerId:this.params.customerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});