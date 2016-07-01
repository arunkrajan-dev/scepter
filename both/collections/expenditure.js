this.Expenditure = new Mongo.Collection("expenditure");

this.Expenditure.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","sales"]);
};

this.Expenditure.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};

this.Expenditure.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
