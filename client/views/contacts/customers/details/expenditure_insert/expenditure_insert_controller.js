this.ContactsCustomersDetailsExpenditureInsertController = RouteController.extend({
	template: "ContactsCustomersDetailsExpenditureInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("customer_list_select"),
			Meteor.subscribe("admin_users"),
			Meteor.subscribe("expenditure_empty"),
			Meteor.subscribe("expenditure_list_customer", this.params.customerId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			customer_list_select: Customers.find({}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			admin_users: Users.find({}, {}),
			expenditure_empty: Expenditure.findOne({_id:null}, {}),
			expenditure_list_customer: Expenditure.find({customerId:this.params.customerId}, {sort:["type"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});