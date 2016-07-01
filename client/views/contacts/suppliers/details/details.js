Template.ContactsSuppliersDetails.rendered = function() {
	
};

Template.ContactsSuppliersDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.suppliers", {  });
	}
});

Template.ContactsSuppliersDetails.helpers({
	
});

Template.ContactsSuppliersDetailsTabMenu.rendered = function() {
	$(".dropdown-button").dropdown();
	
};

Template.ContactsSuppliersDetailsTabMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ContactsSuppliersDetailsTabMenu.helpers({
	
});
