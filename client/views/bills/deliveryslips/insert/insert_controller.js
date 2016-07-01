this.BillsDeliveryslipsInsertController = RouteController.extend({
	template: "BillsDeliveryslipsInsert",
	

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
			Meteor.subscribe("deliveryslips_empty"),
			Meteor.subscribe("deliveryslip_list")
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
			deliveryslips_empty: Deliveryslips.findOne({_id:null}, {}),
			deliveryslip_list: Deliveryslips.find({}, {sort:[["deliveryslipNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});