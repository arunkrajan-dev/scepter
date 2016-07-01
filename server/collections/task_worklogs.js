TaskWorklogs.allow({
	insert: function (userId, doc) {
		return TaskWorklogs.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TaskWorklogs.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TaskWorklogs.userCanRemove(userId, doc);
	}
});

TaskWorklogs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TaskWorklogs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TaskWorklogs.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

TaskWorklogs.before.remove(function(userId, doc) {
	
});

TaskWorklogs.after.insert(function(userId, doc) {
	
});

TaskWorklogs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TaskWorklogs.after.remove(function(userId, doc) {
	
});
