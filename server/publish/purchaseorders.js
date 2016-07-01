Meteor.publish("purchaseorder_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({}, {sort:[["purchaseorderNumber","desc"]]}));
	}
	return Purchaseorders.publishJoinedCursors(Purchaseorders.find({ownerId:this.userId}, {sort:[["purchaseorderNumber","desc"]]}));
});

Meteor.publish("purchaseorder_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({customerId:customerId}, {sort:[["purchaseorderNumber","desc"]]}));
	}
	return Purchaseorders.publishJoinedCursors(Purchaseorders.find({customerId:customerId,ownerId:this.userId}, {sort:[["purchaseorderNumber","desc"]]}));
});

Meteor.publish("purchaseorders_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:"null"}, {}));
	}
	return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("purchaseorder_details", function(purchaseorderId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:purchaseorderId}, {}));
	}
	return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:purchaseorderId,ownerId:this.userId}, {}));
});

