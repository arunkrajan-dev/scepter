Quotations.allow({
	insert: function (userId, doc) {
		return Quotations.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Quotations.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Quotations.userCanRemove(userId, doc);
	}
});

Quotations.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
});

Quotations.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Quotations.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Quotations.before.remove(function(userId, doc) {
	
});

Quotations.after.insert(function(userId, doc) {
	
});

Quotations.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Quotations.after.remove(function(userId, doc) {
	
});
