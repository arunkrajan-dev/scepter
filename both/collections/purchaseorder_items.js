this.PurchaseorderItems = new Mongo.Collection("purchaseorder_items");

this.PurchaseorderItems.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.PurchaseorderItems.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.PurchaseorderItems.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
