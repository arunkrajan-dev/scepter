Meteor.publish("invoice_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Invoices.publishJoinedCursors(Invoices.find({}, {sort:[["invoiceNumber","desc"]]}));
	}
	return Invoices.publishJoinedCursors(Invoices.find({ownerId:this.userId}, {sort:[["invoiceNumber","desc"]]}));
});

Meteor.publish("invoice_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Invoices.publishJoinedCursors(Invoices.find({customerId:customerId}, {sort:[["invoiceNumber","desc"]]}));
	}
	return Invoices.publishJoinedCursors(Invoices.find({customerId:customerId,ownerId:this.userId}, {sort:[["invoiceNumber","desc"]]}));
});

Meteor.publish("invoices_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Invoices.publishJoinedCursors(Invoices.find({_id:"null"}, {}));
	}
	return Invoices.publishJoinedCursors(Invoices.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("invoice_details", function(invoiceId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Invoices.publishJoinedCursors(Invoices.find({_id:invoiceId}, {}));
	}
	return Invoices.publishJoinedCursors(Invoices.find({_id:invoiceId,ownerId:this.userId}, {}));
});

