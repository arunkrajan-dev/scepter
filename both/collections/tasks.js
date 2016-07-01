this.Tasks = new Mongo.Collection("tasks");

this.Tasks.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","sales","client"]);
};

this.Tasks.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin","manager","client"]));
};

this.Tasks.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
