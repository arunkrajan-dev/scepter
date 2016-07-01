var pageSession = new ReactiveDict();

Template.ContactsCustomersEdit.rendered = function() {
	
};

Template.ContactsCustomersEdit.events({
	
});

Template.ContactsCustomersEdit.helpers({
	
});

Template.ContactsCustomersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersEditEditFormInfoMessage", "");
	pageSession.set("contactsCustomersEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

//	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ContactsCustomersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersEditEditFormInfoMessage", "");
		pageSession.set("contactsCustomersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Customers.update({ _id: t.data.customer_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.customers", {customerId: this.params.customerId, type: this.params.type});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ContactsCustomersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersEditEditFormErrorMessage");
	}
	
});
