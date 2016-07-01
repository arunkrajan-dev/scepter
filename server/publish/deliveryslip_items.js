Meteor.publish("deliveryslip_items", function(deliveryslipId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({deliveryslipId:deliveryslipId}, {}));
	}
	return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({deliveryslipId:deliveryslipId,ownerId:this.userId}, {}));
});

Meteor.publish("deliveryslip_items_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({_id:"null"}, {}));
	}
	return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("deliveryslip_item", function(itemId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({_id:itemId}, {}));
	}
	return DeliveryslipItems.publishJoinedCursors(DeliveryslipItems.find({_id:itemId,ownerId:this.userId}, {}));
});

