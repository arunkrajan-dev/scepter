var pageSession = new ReactiveDict();

Template.ExpenditureDetails.rendered = function() {
	
};

Template.ExpenditureDetails.events({
	
});

Template.ExpenditureDetails.helpers({
	
});

Template.ExpenditureDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("expenditureDetailsDetailsFormInfoMessage", "");
	pageSession.set("expenditureDetailsDetailsFormErrorMessage", "");

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

Template.ExpenditureDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ExpenditureDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenditureDetailsDetailsFormInfoMessage", "");
		pageSession.set("expenditureDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenditureDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(expenditureDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenditureDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenditureDetailsDetailsFormErrorMessage", message);
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

		Router.go("expenditure", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ExpenditureDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenditureDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenditureDetailsDetailsFormErrorMessage");
	}
	
});
