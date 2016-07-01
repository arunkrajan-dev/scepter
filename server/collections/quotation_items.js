QuotationItems.allow({
	insert: function (userId, doc) {
		return QuotationItems.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return QuotationItems.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return QuotationItems.userCanRemove(userId, doc);
	}
});

QuotationItems.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
doc.amount = doc.quantity * doc.price;
});

QuotationItems.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
if(!modifier.$set) return; var quantity = modifier.$set.quantity || doc.quantity; var price = modifier.$set.price || doc.price; modifier.$set.amount = quantity * price;
});

QuotationItems.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

QuotationItems.before.remove(function(userId, doc) {
	
});

QuotationItems.after.insert(function(userId, doc) {
	
var sum = 0; QuotationItems.find({ quotationId: doc.quotationId }).map(function(item) { sum += item.amount; }); Quotations.update({ _id: doc.quotationId }, { $set: { totalAmount: sum }});
});

QuotationItems.after.update(function(userId, doc, fieldNames, modifier, options) {
	
var sum = 0; QuotationItems.find({ quotationId: doc.quotationId }).map(function(item) { sum += item.amount; }); Quotations.update({ _id: doc.quotationId }, { $set: { totalAmount: sum }});
});

QuotationItems.after.remove(function(userId, doc) {
	
var sum = 0; QuotationItems.find({ quotationId: doc.quotationId }).map(function(item) { sum += item.amount; }); Quotations.update({ _id: doc.quotationId }, { $set: { totalAmount: sum }});
});
