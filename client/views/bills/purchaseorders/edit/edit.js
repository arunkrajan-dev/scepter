var pageSession = new ReactiveDict();

Template.BillsPurchaseordersEdit.rendered = function() {
	
};

Template.BillsPurchaseordersEdit.events({
	
});

Template.BillsPurchaseordersEdit.helpers({
	
});

Template.BillsPurchaseordersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsPurchaseordersEditEditFormInfoMessage", "");
	pageSession.set("billsPurchaseordersEditEditFormErrorMessage", "");

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

Template.BillsPurchaseordersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsPurchaseordersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsPurchaseordersEditEditFormInfoMessage", "");
		pageSession.set("billsPurchaseordersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsPurchaseordersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsPurchaseordersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsPurchaseordersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.purchaseorders.details", {purchaseorderId: self.params.purchaseorderId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsPurchaseordersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Purchaseorders.update({ _id: t.data.purchaseorder_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.purchaseorders", {});
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

Template.BillsPurchaseordersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsPurchaseordersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsPurchaseordersEditEditFormErrorMessage");
	}
	
});
