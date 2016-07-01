this.TasksDetailsInsertController = RouteController.extend({
	template: "TasksDetails",
	

	yieldTemplates: {
		'TasksDetailsInsert': { to: 'TasksDetailsSubcontent'}
		
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
			Meteor.subscribe("task_worklogs_empty"),
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
			task_worklogs_empty: TaskWorklogs.findOne({_id:null}, {}),
			task_details: Tasks.findOne({_id:this.params.taskId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});