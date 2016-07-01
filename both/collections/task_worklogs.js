this.TaskWorklogs = new Mongo.Collection("task_worklogs");

this.TaskWorklogs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","sales","client"]);
};

this.TaskWorklogs.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin","manager","client"]));
};

this.TaskWorklogs.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
