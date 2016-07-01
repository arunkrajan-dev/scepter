var pageSession = new ReactiveDict();

Template.BillsDeliveryslipsDetailsInsert.rendered = function() {
	
};

Template.BillsDeliveryslipsDetailsInsert.events({
	
});

Template.BillsDeliveryslipsDetailsInsert.helpers({
	
});

Template.BillsDeliveryslipsDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsDeliveryslipsDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("billsDeliveryslipsDetailsInsertInsertFormErrorMessage", "");

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

Template.BillsDeliveryslipsDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsDeliveryslipsDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsDeliveryslipsDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("billsDeliveryslipsDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsDeliveryslipsDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsDeliveryslipsDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsDeliveryslipsDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.deliveryslips.details", {deliveryslipId: self.params.deliveryslipId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsDeliveryslipsDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.deliveryslipId = self.params.deliveryslipId;

				newId = DeliveryslipItems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.deliveryslips.details", {deliveryslipId: this.params.deliveryslipId});
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

Template.BillsDeliveryslipsDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsDeliveryslipsDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsDeliveryslipsDetailsInsertInsertFormErrorMessage");
	}
	
});
