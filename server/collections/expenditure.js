Expenditure.allow({
	insert: function (userId, doc) {
		return Expenditure.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Expenditure.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Expenditure.userCanRemove(userId, doc);
	}
});

Expenditure.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(Users.isInRoles(userId, ['employee'])) {doc.status = 'review'} else {doc.status='active'};
});

Expenditure.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Expenditure.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Expenditure.before.remove(function(userId, doc) {
	
});

Expenditure.after.insert(function(userId, doc) {
	
});

Expenditure.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Expenditure.after.remove(function(userId, doc) {
	
});
