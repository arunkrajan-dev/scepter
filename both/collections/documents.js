this.Documents = new Mongo.Collection("documents");

this.Documents.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Documents.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Documents.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};
