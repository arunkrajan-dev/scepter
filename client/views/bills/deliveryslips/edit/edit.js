var pageSession = new ReactiveDict();

Template.BillsDeliveryslipsEdit.rendered = function() {
	
};

Template.BillsDeliveryslipsEdit.events({
	
});

Template.BillsDeliveryslipsEdit.helpers({
	
});

Template.BillsDeliveryslipsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsDeliveryslipsEditEditFormInfoMessage", "");
	pageSession.set("billsDeliveryslipsEditEditFormErrorMessage", "");

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

Template.BillsDeliveryslipsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsDeliveryslipsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsDeliveryslipsEditEditFormInfoMessage", "");
		pageSession.set("billsDeliveryslipsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsDeliveryslipsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsDeliveryslipsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsDeliveryslipsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.deliveryslips.details", {deliveryslipId: self.params.deliveryslipId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsDeliveryslipsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Deliveryslips.update({ _id: t.data.deliveryslip_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsDeliveryslipsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsDeliveryslipsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsDeliveryslipsEditEditFormErrorMessage");
	}
	
});
