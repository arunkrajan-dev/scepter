var pageSession = new ReactiveDict();

Template.BillsPurchaseordersDetailsInsert.rendered = function() {
	
};

Template.BillsPurchaseordersDetailsInsert.events({
	
});

Template.BillsPurchaseordersDetailsInsert.helpers({
	
});

Template.BillsPurchaseordersDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsPurchaseordersDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("billsPurchaseordersDetailsInsertInsertFormErrorMessage", "");

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

Template.BillsPurchaseordersDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsPurchaseordersDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsPurchaseordersDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("billsPurchaseordersDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsPurchaseordersDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsPurchaseordersDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsPurchaseordersDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.purchaseorders.details", {purchaseorderId: self.params.purchaseorderId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsPurchaseordersDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.purchaseorderId = self.params.purchaseorderId;

				newId = PurchaseorderItems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsPurchaseordersDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsPurchaseordersDetailsInsertInsertFormErrorMessage");
	}
	
});
