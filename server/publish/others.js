Meteor.publish("other_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Others.find({}, {sort:["name"]});
	}
	return Others.find({ownerId:this.userId}, {sort:["name"]});
});

Meteor.publish("other_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Others.find({_id:null}, {});
	}
	return Others.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("other_details", function(otherId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Others.find({_id:otherId}, {});
	}
	return Others.find({_id:otherId,ownerId:this.userId}, {});
});

