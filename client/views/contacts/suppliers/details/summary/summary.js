var pageSession = new ReactiveDict();

Template.ContactsSuppliersDetailsSummary.rendered = function() {
	
};

Template.ContactsSuppliersDetailsSummary.events({
	
});

Template.ContactsSuppliersDetailsSummary.helpers({
	
});

Template.ContactsSuppliersDetailsSummaryDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsSuppliersDetailsSummaryDetailsFormInfoMessage", "");
	pageSession.set("contactsSuppliersDetailsSummaryDetailsFormErrorMessage", "");

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

Template.ContactsSuppliersDetailsSummaryDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsSuppliersDetailsSummaryDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsSuppliersDetailsSummaryDetailsFormInfoMessage", "");
		pageSession.set("contactsSuppliersDetailsSummaryDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsSuppliersDetailsSummaryDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contactsSuppliersDetailsSummaryDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsSuppliersDetailsSummaryDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsSuppliersDetailsSummaryDetailsFormErrorMessage", message);
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

		Router.go("contacts.suppliers", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ContactsSuppliersDetailsSummaryDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsSuppliersDetailsSummaryDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsSuppliersDetailsSummaryDetailsFormErrorMessage");
	}
	
});
