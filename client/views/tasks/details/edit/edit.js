var pageSession = new ReactiveDict();

Template.TasksDetailsEdit.rendered = function() {
	
};

Template.TasksDetailsEdit.events({
	
});

Template.TasksDetailsEdit.helpers({
	
});

Template.TasksDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("tasksDetailsEditEditFormInfoMessage", "");
	pageSession.set("tasksDetailsEditEditFormErrorMessage", "");

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

Template.TasksDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_TasksDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tasksDetailsEditEditFormInfoMessage", "");
		pageSession.set("tasksDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var tasksDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(tasksDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("tasksDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tasks.details", {taskId: self.params.taskId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("tasksDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				TaskWorklogs.update({ _id: t.data.task_worklog._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TasksDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tasksDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tasksDetailsEditEditFormErrorMessage");
	}
	
});
