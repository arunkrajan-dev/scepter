this.TasksDetailsEditController = RouteController.extend({
	template: "TasksDetails",
	

	yieldTemplates: {
		'TasksDetailsEdit': { to: 'TasksDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("TasksDetails"); this.render("loading", { to: "TasksDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("task_worklog", this.params.worklogId),
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
			task_worklog: TaskWorklogs.findOne({_id:this.params.worklogId}, {}),
			task_details: Tasks.findOne({_id:this.params.taskId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});