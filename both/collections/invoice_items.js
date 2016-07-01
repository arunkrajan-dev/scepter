this.InvoiceItems = new Mongo.Collection("invoice_items");

this.InvoiceItems.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.InvoiceItems.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.InvoiceItems.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
