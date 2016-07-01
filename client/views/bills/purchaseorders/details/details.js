var pageSession = new ReactiveDict();

Template.BillsPurchaseordersDetails.rendered = function() {
	
};

Template.BillsPurchaseordersDetails.events({
	
});

Template.BillsPurchaseordersDetails.helpers({
	
});

Template.BillsPurchaseordersDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsPurchaseordersDetailsDetailsFormInfoMessage", "");
	pageSession.set("billsPurchaseordersDetailsDetailsFormErrorMessage", "");

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

Template.BillsPurchaseordersDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsPurchaseordersDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsPurchaseordersDetailsDetailsFormInfoMessage", "");
		pageSession.set("billsPurchaseordersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsPurchaseordersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(billsPurchaseordersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsPurchaseordersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsPurchaseordersDetailsDetailsFormErrorMessage", message);
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

		Router.go("bills.purchaseorders", {});
	}

	
});

Template.BillsPurchaseordersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsDetailsFormErrorMessage");
	}
	
});
