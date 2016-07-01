var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsSummary.rendered = function() {
	
};

Template.ContactsCustomersDetailsSummary.events({
	
});

Template.ContactsCustomersDetailsSummary.helpers({
	
});

Template.ContactsCustomersDetailsSummaryDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsSummaryDetailsFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsSummaryDetailsFormErrorMessage", "");

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

Template.ContactsCustomersDetailsSummaryDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsSummaryDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsSummaryDetailsFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsSummaryDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsSummaryDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsSummaryDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsSummaryDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsSummaryDetailsFormErrorMessage", message);
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ContactsCustomersDetailsSummaryDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsSummaryDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsSummaryDetailsFormErrorMessage");
	}
	
});
