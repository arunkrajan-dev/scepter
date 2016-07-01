var pageSession = new ReactiveDict();

Template.BillsQuotationsDetails.rendered = function() {
	
};

Template.BillsQuotationsDetails.events({
	
});

Template.BillsQuotationsDetails.helpers({
	
});

Template.BillsQuotationsDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsQuotationsDetailsDetailsFormInfoMessage", "");
	pageSession.set("billsQuotationsDetailsDetailsFormErrorMessage", "");

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

Template.BillsQuotationsDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsQuotationsDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsQuotationsDetailsDetailsFormInfoMessage", "");
		pageSession.set("billsQuotationsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsQuotationsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(billsQuotationsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsQuotationsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsQuotationsDetailsDetailsFormErrorMessage", message);
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

		Router.go("bills.quotations", {});
	}

	
});

Template.BillsQuotationsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsQuotationsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsQuotationsDetailsDetailsFormErrorMessage");
	}
	
});
