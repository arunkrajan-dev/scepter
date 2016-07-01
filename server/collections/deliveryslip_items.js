DeliveryslipItems.allow({
	insert: function (userId, doc) {
		return DeliveryslipItems.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return DeliveryslipItems.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return DeliveryslipItems.userCanRemove(userId, doc);
	}
});

DeliveryslipItems.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
doc.amount = doc.quantity * doc.price;
});

DeliveryslipItems.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
if(!modifier.$set) return; var quantity = modifier.$set.quantity || doc.quantity; var price = modifier.$set.price || doc.price; modifier.$set.amount = quantity * price;
});

DeliveryslipItems.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

DeliveryslipItems.before.remove(function(userId, doc) {
	
});

DeliveryslipItems.after.insert(function(userId, doc) {
	
var sum = 0; deliveryslipItems.find({ deliveryslipId: doc.deliveryslipId }).map(function(item) { sum += item.amount; }); deliveryslips.update({ _id: doc.deliveryslipId }, { $set: { totalAmount: sum }});
});

DeliveryslipItems.after.update(function(userId, doc, fieldNames, modifier, options) {
	
var sum = 0; deliveryslipItems.find({ deliveryslipId: doc.deliveryslipId }).map(function(item) { sum += item.amount; }); deliveryslips.update({ _id: doc.deliveryslipId }, { $set: { totalAmount: sum }});
});

DeliveryslipItems.after.remove(function(userId, doc) {
	
var sum = 0; deliveryslipItems.find({ deliveryslipId: doc.deliveryslipId }).map(function(item) { sum += item.amount; }); deliveryslips.update({ _id: doc.deliveryslipId }, { $set: { totalAmount: sum }});
});
