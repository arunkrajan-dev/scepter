var pageSession = new ReactiveDict();

Template.ContactsOthersEdit.rendered = function() {
	
};

Template.ContactsOthersEdit.events({
	
});

Template.ContactsOthersEdit.helpers({
	
});

Template.ContactsOthersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsOthersEditEditFormInfoMessage", "");
	pageSession.set("contactsOthersEditEditFormErrorMessage", "");

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

Template.ContactsOthersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsOthersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsOthersEditEditFormInfoMessage", "");
		pageSession.set("contactsOthersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsOthersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactsOthersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsOthersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.others.details", {otherId: self.pamams.otherId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsOthersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Others.update({ _id: t.data.other_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.suppliers", {});
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

Template.ContactsOthersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsOthersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsOthersEditEditFormErrorMessage");
	}
	
});
