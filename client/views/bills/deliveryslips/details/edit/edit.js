var pageSession = new ReactiveDict();

Template.BillsDeliveryslipsDetailsEdit.rendered = function() {
	
};

Template.BillsDeliveryslipsDetailsEdit.events({
	
});

Template.BillsDeliveryslipsDetailsEdit.helpers({
	
});

Template.BillsDeliveryslipsDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsDeliveryslipsDetailsEditEditFormInfoMessage", "");
	pageSession.set("billsDeliveryslipsDetailsEditEditFormErrorMessage", "");

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

Template.BillsDeliveryslipsDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsDeliveryslipsDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsDeliveryslipsDetailsEditEditFormInfoMessage", "");
		pageSession.set("billsDeliveryslipsDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsDeliveryslipsDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsDeliveryslipsDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsDeliveryslipsDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.deliveryslips.details", {deliveryslipId: self.params.deliveryslipId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsDeliveryslipsDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				DeliveryslipItems.update({ _id: t.data.deliveryslip_item._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsDeliveryslipsDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsDeliveryslipsDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsDeliveryslipsDetailsEditEditFormErrorMessage");
	}
	
});
