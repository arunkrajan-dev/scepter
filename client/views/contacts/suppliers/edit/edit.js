var pageSession = new ReactiveDict();

Template.ContactsSuppliersEdit.rendered = function() {
	
};

Template.ContactsSuppliersEdit.events({
	
});

Template.ContactsSuppliersEdit.helpers({
	
});

Template.ContactsSuppliersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsSuppliersEditEditFormInfoMessage", "");
	pageSession.set("contactsSuppliersEditEditFormErrorMessage", "");

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

Template.ContactsSuppliersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsSuppliersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsSuppliersEditEditFormInfoMessage", "");
		pageSession.set("contactsSuppliersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsSuppliersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactsSuppliersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsSuppliersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.suppliers.details", {supplierId: self.params.supplierId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsSuppliersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Suppliers.update({ _id: t.data.supplier_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ContactsSuppliersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsSuppliersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsSuppliersEditEditFormErrorMessage");
	}
	
});
