var pageSession = new ReactiveDict();

Template.BillsDeliveryslipsInsert.rendered = function() {
	
};

Template.BillsDeliveryslipsInsert.events({
	
});

Template.BillsDeliveryslipsInsert.helpers({
	
});

Template.BillsDeliveryslipsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsDeliveryslipsInsertInsertFormInfoMessage", "");
	pageSession.set("billsDeliveryslipsInsertInsertFormErrorMessage", "");

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

Template.BillsDeliveryslipsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsDeliveryslipsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsDeliveryslipsInsertInsertFormInfoMessage", "");
		pageSession.set("billsDeliveryslipsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsDeliveryslipsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsDeliveryslipsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsDeliveryslipsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.deliveryslips.details", {deliveryslipId: newId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsDeliveryslipsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Deliveryslips.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.deliveryslips", {});
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

Template.BillsDeliveryslipsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsDeliveryslipsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsDeliveryslipsInsertInsertFormErrorMessage");
	}, 
	'nextdeliveryslipNumber': function() { var max = 0; var deliveryslipNumbers = Deliveryslips.find({}, { fields: { deliveryslipNumber: 1 }}).fetch(); _.each(deliveryslipNumbers, function(doc) { var intNum = parseInt(doc.deliveryslipNumber); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});
