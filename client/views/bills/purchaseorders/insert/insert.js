var pageSession = new ReactiveDict();

Template.BillsPurchaseordersInsert.rendered = function() {
	
};

Template.BillsPurchaseordersInsert.events({
	
});

Template.BillsPurchaseordersInsert.helpers({
	
});

Template.BillsPurchaseordersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsPurchaseordersInsertInsertFormInfoMessage", "");
	pageSession.set("billsPurchaseordersInsertInsertFormErrorMessage", "");

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

Template.BillsPurchaseordersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsPurchaseordersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsPurchaseordersInsertInsertFormInfoMessage", "");
		pageSession.set("billsPurchaseordersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsPurchaseordersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(billsPurchaseordersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsPurchaseordersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.purchaseorders.details", {purchaseorderId: newId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsPurchaseordersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Purchaseorders.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BillsPurchaseordersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsPurchaseordersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsPurchaseordersInsertInsertFormErrorMessage");
	}, 
	'nextpurchaseorderNumber': function() { var max = 0; var purchaseorderNumbers = Purchaseorders.find({}, { fields: { purchaseorderNumber: 1 }}).fetch(); _.each(purchaseorderNumbers, function(doc) { var intNum = parseInt(doc.purchaseorderNumber); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});
