var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsExpenditureInsert.rendered = function() {
	
};

Template.ContactsCustomersDetailsExpenditureInsert.events({
	
});

Template.ContactsCustomersDetailsExpenditureInsert.helpers({
	
});

Template.ContactsCustomersDetailsExpenditureInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormErrorMessage", "");

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

Template.ContactsCustomersDetailsExpenditureInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsExpenditureInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsExpenditureInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsExpenditureInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details.expenditures", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsExpenditureInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Expenditure.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.customers.details.expenditures", {customerId: this.params.customerId, type: this.params.type});
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

Template.ContactsCustomersDetailsExpenditureInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsExpenditureInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsExpenditureInsertInsertFormErrorMessage");
	}
	
});
