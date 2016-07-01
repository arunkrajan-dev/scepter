this.TasksDetailsController = RouteController.extend({
	template: "TasksDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('tasks.details.task_worklogs', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("task_details", this.params.taskId)
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
			task_details: Tasks.findOne({_id:this.params.taskId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});