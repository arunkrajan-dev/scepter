Meteor.publish("purchaseorder_items", function(purchaseorderId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return PurchaseorderItems.find({purchaseorderId:purchaseorderId}, {});
	}
	return PurchaseorderItems.find({purchaseorderId:purchaseorderId,ownerId:this.userId}, {});
});

Meteor.publish("purchaseorder_items_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return PurchaseorderItems.find({_id:"null"}, {});
	}
	return PurchaseorderItems.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("purchaseorder_item", function(itemId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return PurchaseorderItems.find({_id:itemId}, {});
	}
	return PurchaseorderItems.find({_id:itemId,ownerId:this.userId}, {});
});

