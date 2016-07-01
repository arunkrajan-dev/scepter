Meteor.publish("task_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Tasks.publishJoinedCursors(Tasks.find({customerId:customerId}, {}));
	}
	return Tasks.publishJoinedCursors(Tasks.find({customerId:customerId,ownerId:this.userId}, {}));
});

Meteor.publish("task_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Tasks.publishJoinedCursors(Tasks.find({}, {}));
	}
	return Tasks.publishJoinedCursors(Tasks.find({ownerId:this.userId}, {}));
});

Meteor.publish("task_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Tasks.publishJoinedCursors(Tasks.find({_id:null}, {}));
	}
	return Tasks.publishJoinedCursors(Tasks.find({_id:"null",ownerId:this.userId}, {}));
});

Meteor.publish("task_details", function(taskId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Tasks.publishJoinedCursors(Tasks.find({_id:taskId}, {}));
	}
	return Tasks.publishJoinedCursors(Tasks.find({_id:taskId,ownerId:this.userId}, {}));
});

