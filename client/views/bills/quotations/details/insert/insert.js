var pageSession = new ReactiveDict();

Template.BillsQuotationsDetailsInsert.rendered = function() {
	
};

Template.BillsQuotationsDetailsInsert.events({
	
});

Template.BillsQuotationsDetailsInsert.helpers({
	
});

Template.BillsQuotationsDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsQuotationsDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("billsQuotationsDetailsInsertInsertFormErrorMessage", "");

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

Template.BillsQuotationsDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsQuotationsDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsQuotationsDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("billsQuotationsDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsQuotationsDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsQuotationsDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsQuotationsDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.quotations.details", {quotationId: self.params.quotationId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsQuotationsDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.quotationId = self.params.quotationId;

				newId = QuotationItems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.quotations.details", {quotationId: this.params.quotationId});
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

Template.BillsQuotationsDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsQuotationsDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsQuotationsDetailsInsertInsertFormErrorMessage");
	}
	
});
