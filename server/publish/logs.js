Meteor.publish("log_list", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Logs.find({customerId:customerId}, {});
	}
	return Logs.find({customerId:customerId,ownerId:this.userId}, {});
});

Meteor.publish("log_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Logs.find({_id:"null"}, {});
	}
	return Logs.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("log_details", function(logId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Logs.find({_id:logId}, {});
	}
	return Logs.find({_id:logId,ownerId:this.userId}, {});
});

Meteor.publish("customer_logs", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager","sales"])) {
		return Logs.find({customerId:customerId}, {});
	}
	return Logs.find({customerId:customerId,ownerId:this.userId}, {});
});

