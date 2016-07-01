Logs.allow({
	insert: function (userId, doc) {
		return Logs.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Logs.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Logs.userCanRemove(userId, doc);
	}
});

Logs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(Users.isInRoles(userId, ['sales'])) {doc.status = 'review'} else {doc.status='active'};
});

Logs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Logs.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Logs.before.remove(function(userId, doc) {
	
});

Logs.after.insert(function(userId, doc) {
	
});

Logs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Logs.after.remove(function(userId, doc) {
	
});
