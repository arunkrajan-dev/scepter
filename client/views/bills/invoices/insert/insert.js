var pageSession = new ReactiveDict();

Template.BillsInvoicesInsert.rendered = function() {
	
};

Template.BillsInvoicesInsert.events({
	
});

Template.BillsInvoicesInsert.helpers({
	
});

Template.BillsInvoicesInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsInvoicesInsertInsertFormInfoMessage", "");
	pageSession.set("billsInvoicesInsertInsertFormErrorMessage", "");

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

Template.BillsInvoicesInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsInvoicesInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsInvoicesInsertInsertFormInfoMessage", "");
		pageSession.set("billsInvoicesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsInvoicesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsInvoicesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsInvoicesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.invoices.details", {invoiceId: newId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsInvoicesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Invoices.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsInvoicesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsInvoicesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsInvoicesInsertInsertFormErrorMessage");
	}, 
	'nextInvoiceNumber': function() { var max = 0; var invoiceNumbers = Invoices.find({}, { fields: { invoiceNumber: 1 }}).fetch(); _.each(invoiceNumbers, function(doc) { var intNum = parseInt(doc.invoiceNumber); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});
