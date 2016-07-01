var pageSession = new ReactiveDict();

Template.ContactsCustomersDetailsExpenditureEdit.rendered = function() {
	
};

Template.ContactsCustomersDetailsExpenditureEdit.events({
	
});

Template.ContactsCustomersDetailsExpenditureEdit.helpers({
	
});

Template.ContactsCustomersDetailsExpenditureEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersDetailsExpenditureEditEditFormInfoMessage", "");
	pageSession.set("contactsCustomersDetailsExpenditureEditEditFormErrorMessage", "");

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

Template.ContactsCustomersDetailsExpenditureEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersDetailsExpenditureEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersDetailsExpenditureEditEditFormInfoMessage", "");
		pageSession.set("contactsCustomersDetailsExpenditureEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersDetailsExpenditureEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersDetailsExpenditureEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersDetailsExpenditureEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers.details.expenditures", {customerId: self.params.customerId, type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersDetailsExpenditureEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Expenditure.update({ _id: t.data.expenditure_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ContactsCustomersDetailsExpenditureEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersDetailsExpenditureEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersDetailsExpenditureEditEditFormErrorMessage");
	}
	
});
