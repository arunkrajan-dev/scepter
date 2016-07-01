Meteor.publish("expenditure_list_customer", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Expenditure.publishJoinedCursors(Expenditure.find({customerId:customerId}, {sort:["type"]}));
	}
	return Expenditure.publishJoinedCursors(Expenditure.find({customerId:customerId,ownerId:this.userId}, {sort:["type"]}));
});

Meteor.publish("expenditure_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Expenditure.publishJoinedCursors(Expenditure.find({}, {sort:["type"]}));
	}
	return Expenditure.publishJoinedCursors(Expenditure.find({ownerId:this.userId}, {sort:["type"]}));
});

Meteor.publish("expenditure_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Expenditure.publishJoinedCursors(Expenditure.find({_id:null}, {}));
	}
	return Expenditure.publishJoinedCursors(Expenditure.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("expenditure_details", function(expenditureId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Expenditure.publishJoinedCursors(Expenditure.find({_id:expenditureId}, {}));
	}
	return Expenditure.publishJoinedCursors(Expenditure.find({_id:expenditureId,ownerId:this.userId}, {}));
});

