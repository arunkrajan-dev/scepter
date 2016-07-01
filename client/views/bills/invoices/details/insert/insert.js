var pageSession = new ReactiveDict();

Template.BillsInvoicesDetailsInsert.rendered = function() {
	
};

Template.BillsInvoicesDetailsInsert.events({
	
});

Template.BillsInvoicesDetailsInsert.helpers({
	
});

Template.BillsInvoicesDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsInvoicesDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("billsInvoicesDetailsInsertInsertFormErrorMessage", "");

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

Template.BillsInvoicesDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsInvoicesDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsInvoicesDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("billsInvoicesDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsInvoicesDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsInvoicesDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsInvoicesDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.invoices.details", {invoiceId: self.params.invoiceId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsInvoicesDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.invoiceId = self.params.invoiceId;

				newId = InvoiceItems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.invoices.details", {invoiceId: this.params.invoiceId});
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

Template.BillsInvoicesDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsInvoicesDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsInvoicesDetailsInsertInsertFormErrorMessage");
	}
	
});
