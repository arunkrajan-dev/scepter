var pageSession = new ReactiveDict();

Template.BillsInvoicesEdit.rendered = function() {
	
};

Template.BillsInvoicesEdit.events({
	
});

Template.BillsInvoicesEdit.helpers({
	
});

Template.BillsInvoicesEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsInvoicesEditEditFormInfoMessage", "");
	pageSession.set("billsInvoicesEditEditFormErrorMessage", "");

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

Template.BillsInvoicesEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsInvoicesEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsInvoicesEditEditFormInfoMessage", "");
		pageSession.set("billsInvoicesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsInvoicesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsInvoicesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsInvoicesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.invoices.details", {invoiceId: self.params.invoiceId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsInvoicesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Invoices.update({ _id: t.data.invoice_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.invoices", {});
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

Template.BillsInvoicesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsInvoicesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsInvoicesEditEditFormErrorMessage");
	}
	
});
