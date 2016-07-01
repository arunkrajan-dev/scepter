var pageSession = new ReactiveDict();

Template.ContactsOthersDetails.rendered = function() {
	
};

Template.ContactsOthersDetails.events({
	
});

Template.ContactsOthersDetails.helpers({
	
});

Template.ContactsOthersDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsOthersDetailsDetailsFormInfoMessage", "");
	pageSession.set("contactsOthersDetailsDetailsFormErrorMessage", "");

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

Template.ContactsOthersDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsOthersDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsOthersDetailsDetailsFormInfoMessage", "");
		pageSession.set("contactsOthersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsOthersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contactsOthersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsOthersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsOthersDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("contacts.others", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("contacts.others", {});
	}

	
});

Template.ContactsOthersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsOthersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsOthersDetailsDetailsFormErrorMessage");
	}
	
});
