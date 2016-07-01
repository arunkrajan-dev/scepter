this.Purchaseorders = new Mongo.Collection("purchaseorders");

this.Purchaseorders.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Purchaseorders.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Purchaseorders.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
