Meteor.publish("deliveryslip_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Deliveryslips.publishJoinedCursors(Deliveryslips.find({}, {sort:[["deliveryslipNumber","desc"]]}));
	}
	return Deliveryslips.publishJoinedCursors(Deliveryslips.find({ownerId:this.userId}, {sort:[["deliveryslipNumber","desc"]]}));
});

Meteor.publish("deliveryslip_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Deliveryslips.publishJoinedCursors(Deliveryslips.find({customerId:customerId}, {sort:[["deliveryslipNumber","desc"]]}));
	}
	return Deliveryslips.publishJoinedCursors(Deliveryslips.find({customerId:customerId,ownerId:this.userId}, {sort:[["deliveryslipNumber","desc"]]}));
});

Meteor.publish("deliveryslips_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Deliveryslips.publishJoinedCursors(Deliveryslips.find({_id:"null"}, {}));
	}
	return Deliveryslips.publishJoinedCursors(Deliveryslips.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("deliveryslip_details", function(deliveryslipId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Deliveryslips.publishJoinedCursors(Deliveryslips.find({_id:deliveryslipId}, {}));
	}
	return Deliveryslips.publishJoinedCursors(Deliveryslips.find({_id:deliveryslipId,ownerId:this.userId}, {}));
});

