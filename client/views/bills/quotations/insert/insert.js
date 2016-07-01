var pageSession = new ReactiveDict();

Template.BillsQuotationsInsert.rendered = function() {
	
};

Template.BillsQuotationsInsert.events({
	
});

Template.BillsQuotationsInsert.helpers({
	
});

Template.BillsQuotationsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsQuotationsInsertInsertFormInfoMessage", "");
	pageSession.set("billsQuotationsInsertInsertFormErrorMessage", "");

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

Template.BillsQuotationsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsQuotationsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsQuotationsInsertInsertFormInfoMessage", "");
		pageSession.set("billsQuotationsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsQuotationsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsQuotationsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsQuotationsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.quotations.details", {quotationId: newId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsQuotationsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Quotations.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsQuotationsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsQuotationsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsQuotationsInsertInsertFormErrorMessage");
	}, 
	'nextquotationNumber': function() { var max = 0; var quotationNumbers = Quotations.find({}, { fields: { quotationNumber: 1 }}).fetch(); _.each(quotationNumbers, function(doc) { var intNum = parseInt(doc.quotationNumber); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});
