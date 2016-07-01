var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsTaskInsert.rendered = function() {
	
};

Template.ContactsCustomersDetailsTaskInsert.events({
	
});

Template.ContactsCustomersDetailsTaskInsert.helpers({
	
});

Template.ContactsCustomersDetailsTaskInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsTaskInsertInsertFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsTaskInsertInsertFormErrorMessage", "");

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

Template.ContactsCustomersDetailsTaskInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsTaskInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsTaskInsertInsertFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsTaskInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsTaskInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsTaskInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsTaskInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details.tasks", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsTaskInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.customerId = self.params.customerId;

				newId = Tasks.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.customers.details.tasks", {customerId: this.params.customerId, type: this.params.type});
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

Template.ContactsCustomersDetailsTaskInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsTaskInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsTaskInsertInsertFormErrorMessage");
	}
	
});
