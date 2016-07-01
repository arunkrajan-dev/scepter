Meteor.publish("product_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales","client"])) {
		return Products.find({}, {sort:["name"]});
	}
	return Products.find({ownerId:this.userId}, {sort:["name"]});
});

Meteor.publish("product_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales","client"])) {
		return Products.find({_id:null}, {});
	}
	return Products.find({_id:"null",ownerId:this.userId}, {});
});

Meteor.publish("product_details", function(productId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales","client"])) {
		return Products.find({_id:productId}, {});
	}
	return Products.find({_id:productId,ownerId:this.userId}, {});
});

