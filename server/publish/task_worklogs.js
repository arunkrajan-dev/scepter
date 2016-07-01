Meteor.publish("task_worklogs", function(taskId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return TaskWorklogs.find({taskId:taskId}, {});
	}
	return TaskWorklogs.find({taskId:taskId,ownerId:this.userId}, {});
});

Meteor.publish("task_worklogs_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return TaskWorklogs.find({_id:"null"}, {});
	}
	return TaskWorklogs.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("task_worklog", function(worklogId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return TaskWorklogs.find({_id:worklogId}, {});
	}
	return TaskWorklogs.find({_id:worklogId,ownerId:this.userId}, {});
});

