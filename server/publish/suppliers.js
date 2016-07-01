Meteor.publish("supplier_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Suppliers.find({}, {sort:["name"]});
	}
	return Suppliers.find({ownerId:this.userId}, {sort:["name"]});
});

Meteor.publish("supplier_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Suppliers.find({_id:null}, {});
	}
	return Suppliers.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("supplier_details", function(supplierId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Suppliers.find({_id:supplierId}, {});
	}
	return Suppliers.find({_id:supplierId,ownerId:this.userId}, {});
});

