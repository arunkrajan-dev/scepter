var pageSession = new ReactiveDict();

Template.BillsPurchaseordersDetailsEdit.rendered = function() {
	
};

Template.BillsPurchaseordersDetailsEdit.events({
	
});

Template.BillsPurchaseordersDetailsEdit.helpers({
	
});

Template.BillsPurchaseordersDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsPurchaseordersDetailsEditEditFormInfoMessage", "");
	pageSession.set("billsPurchaseordersDetailsEditEditFormErrorMessage", "");

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

Template.BillsPurchaseordersDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsPurchaseordersDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsPurchaseordersDetailsEditEditFormInfoMessage", "");
		pageSession.set("billsPurchaseordersDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsPurchaseordersDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsPurchaseordersDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsPurchaseordersDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.purchaseorders.details", {purchaseorderId: self.params.purchaseorderId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsPurchaseordersDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PurchaseorderItems.update({ _id: t.data.purchaseorder_item._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.purchaseorders.details", {purchaseorderId: this.params.purchaseorderId});
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

Template.BillsPurchaseordersDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsEditEditFormErrorMessage");
	}
	
});
