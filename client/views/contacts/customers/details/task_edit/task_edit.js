var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsTaskEdit.rendered = function() {
	
};

Template.ContactsCustomersDetailsTaskEdit.events({
	
});

Template.ContactsCustomersDetailsTaskEdit.helpers({
	
});

Template.ContactsCustomersDetailsTaskEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsTaskEditEditFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsTaskEditEditFormErrorMessage", "");

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

Template.ContactsCustomersDetailsTaskEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsTaskEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsTaskEditEditFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsTaskEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsTaskEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsTaskEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsTaskEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details.tasks", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsTaskEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Tasks.update({ _id: t.data.task_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ContactsCustomersDetailsTaskEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsTaskEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsTaskEditEditFormErrorMessage");
	}
	
});
