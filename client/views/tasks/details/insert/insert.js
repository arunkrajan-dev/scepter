var pageSession = new ReactiveDict();

Template.TasksDetailsInsert.rendered = function() {
	
};

Template.TasksDetailsInsert.events({
	
});

Template.TasksDetailsInsert.helpers({
	
});

Template.TasksDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("tasksDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("tasksDetailsInsertInsertFormErrorMessage", "");

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

Template.TasksDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_TasksDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tasksDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("tasksDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var tasksDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(tasksDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("tasksDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tasks.details", {taskId: self.params.taskId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("tasksDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.taskId = self.params.taskId;

				newId = TaskWorklogs.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tasks.details", {taskId: this.params.taskId});
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

Template.TasksDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tasksDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tasksDetailsInsertInsertFormErrorMessage");
	}
	
});
