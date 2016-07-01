this.TasksDetailsTaskWorklogsController = RouteController.extend({
	template: "TasksDetails",
	

	yieldTemplates: {
		'TasksDetailsTaskWorklogs': { to: 'TasksDetailsSubcontent'}
		
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
			Meteor.subscribe("task_worklogs", this.params.taskId),
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
			task_worklogs: TaskWorklogs.find({taskId:this.params.taskId}, {}),
			task_details: Tasks.findOne({_id:this.params.taskId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});