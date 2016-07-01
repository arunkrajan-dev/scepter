Meteor.publish("customer_list", function(type) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Customers.find({type:type}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
	}
	return Customers.find({type:type,ownerId:this.userId}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
});

Meteor.publish("customer_list_select", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Customers.find({}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
	}
	return Customers.find({ownerId:this.userId}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
});

Meteor.publish("customers_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Customers.find({_id:null}, {});
	}
	return Customers.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("customer_details", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Customers.find({_id:customerId}, {transform:function(doc) { var sum = 0; Expenditure.find({ customerId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
	}
	return Customers.find({_id:customerId,ownerId:this.userId}, {transform:function(doc) { var sum = 0; Expenditure.find({ customerId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
});

