Template.ContactsCustomersDetails.rendered = function() {
	
};

Template.ContactsCustomersDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.customers", { type: this.params.type });
	}
});

Template.ContactsCustomersDetails.helpers({
	
});

Template.ContactsCustomersDetailsTabMenu.rendered = function() {
	$(".dropdown-button").dropdown();
	
};

Template.ContactsCustomersDetailsTabMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ContactsCustomersDetailsTabMenu.helpers({
	
});
