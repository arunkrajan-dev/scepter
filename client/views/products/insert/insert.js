var pageSession = new ReactiveDict();

Template.ProductsInsert.rendered = function() {
	
};

Template.ProductsInsert.events({
	
});

Template.ProductsInsert.helpers({
	
});

Template.ProductsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("productsInsertInsertFormInfoMessage", "");
	pageSession.set("productsInsertInsertFormErrorMessage", "");

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

Template.ProductsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ProductsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productsInsertInsertFormInfoMessage", "");
		pageSession.set("productsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(productsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("products", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Products.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("products", {});
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

Template.ProductsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productsInsertInsertFormErrorMessage");
	}
	
});