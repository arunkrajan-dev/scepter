var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsLogInsert.rendered = function() {
	
};

Template.ContactsCustomersDetailsLogInsert.events({
	
});

Template.ContactsCustomersDetailsLogInsert.helpers({
	
});

Template.ContactsCustomersDetailsLogInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsLogInsertInsertFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsLogInsertInsertFormErrorMessage", "");

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

Template.ContactsCustomersDetailsLogInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsLogInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsLogInsertInsertFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsLogInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsLogInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsLogInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsLogInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details.logs", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsLogInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.customerId = self.params.customerId;

				newId = Logs.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.customers.details.logs", {customerId: this.params.customerId, type: this.params.type});
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

Template.ContactsCustomersDetailsLogInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsLogInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsLogInsertInsertFormErrorMessage");
	}
	
});
