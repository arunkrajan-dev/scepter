var pageSession = new ReactiveDict();

Template.BillsQuotationsEdit.rendered = function() {
	
};

Template.BillsQuotationsEdit.events({
	
});

Template.BillsQuotationsEdit.helpers({
	
});

Template.BillsQuotationsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsQuotationsEditEditFormInfoMessage", "");
	pageSession.set("billsQuotationsEditEditFormErrorMessage", "");

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

Template.BillsQuotationsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsQuotationsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsQuotationsEditEditFormInfoMessage", "");
		pageSession.set("billsQuotationsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsQuotationsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsQuotationsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsQuotationsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.quotations.details", {quotationId: self.params.quotationId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsQuotationsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Quotations.update({ _id: t.data.quotation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.quotations", {});
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

Template.BillsQuotationsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsQuotationsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsQuotationsEditEditFormErrorMessage");
	}
	
});
