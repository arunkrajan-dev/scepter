this.Logs = new Mongo.Collection("logs");

this.Logs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","sales"]);
};

this.Logs.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin","manager"]));
};

this.Logs.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
