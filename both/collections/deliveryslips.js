this.Deliveryslips = new Mongo.Collection("deliveryslips");

this.Deliveryslips.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Deliveryslips.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Deliveryslips.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
