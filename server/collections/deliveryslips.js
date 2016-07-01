Deliveryslips.allow({
	insert: function (userId, doc) {
		return Deliveryslips.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Deliveryslips.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Deliveryslips.userCanRemove(userId, doc);
	}
});

Deliveryslips.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
});

Deliveryslips.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Deliveryslips.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Deliveryslips.before.remove(function(userId, doc) {
	
});

Deliveryslips.after.insert(function(userId, doc) {
	
});

Deliveryslips.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Deliveryslips.after.remove(function(userId, doc) {
	
});
