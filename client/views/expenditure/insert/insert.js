var pageSession = new ReactiveDict();

Template.ExpenditureInsert.rendered = function() {
	
};

Template.ExpenditureInsert.events({
	
});

Template.ExpenditureInsert.helpers({
	
});

Template.ExpenditureInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("expenditureInsertInsertFormInfoMessage", "");
	pageSession.set("expenditureInsertInsertFormErrorMessage", "");

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

Template.ExpenditureInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ExpenditureInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenditureInsertInsertFormInfoMessage", "");
		pageSession.set("expenditureInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenditureInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(expenditureInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenditureInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("expenditure", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenditureInsertInsertFormErrorMessage", message);
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

		

		Router.go("expenditure", {});
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

Template.ExpenditureInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenditureInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenditureInsertInsertFormErrorMessage");
	}
	
});
