Meteor.publish("document_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Documents.find({}, {sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("document_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Documents.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("document_details", function(documentId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Documents.find({_id:documentId}, {});
	}
	return this.ready();
});

