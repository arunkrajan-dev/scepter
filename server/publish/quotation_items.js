Meteor.publish("quotation_items", function(quotationId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return QuotationItems.publishJoinedCursors(QuotationItems.find({quotationId:quotationId}, {}));
	}
	return QuotationItems.publishJoinedCursors(QuotationItems.find({quotationId:quotationId,ownerId:this.userId}, {}));
});

Meteor.publish("quotation_items_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return QuotationItems.publishJoinedCursors(QuotationItems.find({_id:"null"}, {}));
	}
	return QuotationItems.publishJoinedCursors(QuotationItems.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("quotation_item", function(itemId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return QuotationItems.publishJoinedCursors(QuotationItems.find({_id:itemId}, {}));
	}
	return QuotationItems.publishJoinedCursors(QuotationItems.find({_id:itemId,ownerId:this.userId}, {}));
});

