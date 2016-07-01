this.ContactsCustomersDetailsSummaryController = RouteController.extend({
	template: "ContactsCustomersDetails",
	

	yieldTemplates: {
		'ContactsCustomersDetailsSummary': { to: 'ContactsCustomersDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ContactsCustomersDetails"); this.render("loading", { to: "ContactsCustomersDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("customer_details", this.params.customerId),
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
			customer_details: Customers.findOne({_id:this.params.customerId}, {transform:function(doc) { var sum = 0; Expenditure.find({ customerId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }}),
			expenditure_list_customer: Expenditure.find({customerId:this.params.customerId}, {sort:["type"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});