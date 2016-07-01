Meteor.publish("quotation_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Quotations.publishJoinedCursors(Quotations.find({}, {sort:[["quotationNumber","desc"]]}));
	}
	return Quotations.publishJoinedCursors(Quotations.find({ownerId:this.userId}, {sort:[["quotationNumber","desc"]]}));
});

Meteor.publish("quotation_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Quotations.publishJoinedCursors(Quotations.find({customerId:customerId}, {sort:[["quotationNumber","desc"]]}));
	}
	return Quotations.publishJoinedCursors(Quotations.find({customerId:customerId,ownerId:this.userId}, {sort:[["quotationNumber","desc"]]}));
});

Meteor.publish("quotations_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Quotations.publishJoinedCursors(Quotations.find({_id:"null"}, {}));
	}
	return Quotations.publishJoinedCursors(Quotations.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("quotation_details", function(quotationId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Quotations.publishJoinedCursors(Quotations.find({_id:quotationId}, {}));
	}
	return Quotations.publishJoinedCursors(Quotations.find({_id:quotationId,ownerId:this.userId}, {}));
});

