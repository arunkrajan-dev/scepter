var pageSession = new ReactiveDict();

Template.BillsQuotationsDetailsEdit.rendered = function() {
	
};

Template.BillsQuotationsDetailsEdit.events({
	
});

Template.BillsQuotationsDetailsEdit.helpers({
	
});

Template.BillsQuotationsDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsQuotationsDetailsEditEditFormInfoMessage", "");
	pageSession.set("billsQuotationsDetailsEditEditFormErrorMessage", "");

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

Template.BillsQuotationsDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsQuotationsDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsQuotationsDetailsEditEditFormInfoMessage", "");
		pageSession.set("billsQuotationsDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsQuotationsDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsQuotationsDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsQuotationsDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.quotations.details", {quotationId: self.params.quotationId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsQuotationsDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				QuotationItems.update({ _id: t.data.quotation_item._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsQuotationsDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsQuotationsDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsQuotationsDetailsEditEditFormErrorMessage");
	}
	
});
