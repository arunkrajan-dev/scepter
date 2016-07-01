var pageSession = new ReactiveDict();

Template.TasksDetailsTaskWorklogs.rendered = function() {
	
};

Template.TasksDetailsTaskWorklogs.events({
	
});

Template.TasksDetailsTaskWorklogs.helpers({
	
});

var TasksDetailsTaskWorklogsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TasksDetailsTaskWorklogsViewSearchString");
	var sortBy = pageSession.get("TasksDetailsTaskWorklogsViewSortBy");
	var sortAscending = pageSession.get("TasksDetailsTaskWorklogsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["note", "internal"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TasksDetailsTaskWorklogsViewExport = function(cursor, fileType) {
	var data = TasksDetailsTaskWorklogsViewItems(cursor);
	var exportFields = ["note", "internal"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TasksDetailsTaskWorklogsView.rendered = function() {
	pageSession.set("TasksDetailsTaskWorklogsViewStyle", "table");
	
};

Template.TasksDetailsTaskWorklogsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TasksDetailsTaskWorklogsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TasksDetailsTaskWorklogsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TasksDetailsTaskWorklogsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("tasks.details.insert", {taskId: this.params.taskId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TasksDetailsTaskWorklogsViewExport(this.task_worklogs, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TasksDetailsTaskWorklogsViewExport(this.task_worklogs, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TasksDetailsTaskWorklogsViewExport(this.task_worklogs, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TasksDetailsTaskWorklogsViewExport(this.task_worklogs, "json");
	}

	
});

Template.TasksDetailsTaskWorklogsView.helpers({

	"insertButtonClass": function() {
		return TaskWorklogs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.task_worklogs || this.task_worklogs.count() == 0;
	},
	"isNotEmpty": function() {
		return this.task_worklogs && this.task_worklogs.count() > 0;
	},
	"isNotFound": function() {
		return this.task_worklogs && pageSession.get("TasksDetailsTaskWorklogsViewSearchString") && TasksDetailsTaskWorklogsViewItems(this.task_worklogs).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TasksDetailsTaskWorklogsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TasksDetailsTaskWorklogsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TasksDetailsTaskWorklogsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TasksDetailsTaskWorklogsViewStyle") == "gallery";
	}

	
});


Template.TasksDetailsTaskWorklogsViewTable.rendered = function() {
	
};

Template.TasksDetailsTaskWorklogsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TasksDetailsTaskWorklogsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TasksDetailsTaskWorklogsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TasksDetailsTaskWorklogsViewSortAscending") || false;
			pageSession.set("TasksDetailsTaskWorklogsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TasksDetailsTaskWorklogsViewSortAscending", true);
		}
	},
	
});

Template.TasksDetailsTaskWorklogsViewTable.helpers({
	"tableItems": function() {
		return TasksDetailsTaskWorklogsViewItems(this.task_worklogs);
	}
});


Template.TasksDetailsTaskWorklogsViewTableItems.rendered = function() {
	
};

Template.TasksDetailsTaskWorklogsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		TaskWorklogs.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();

		var me = this,
			el = $('.modal');

		el.openModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			ready: function() {
				el.find('.modal-confirm').on('click', function() {
					TaskWorklogs.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("tasks.details.edit", {taskId: UI._parentData(1).params.taskId, worklogId: this._id});
		return false;
	}
});

Template.TasksDetailsTaskWorklogsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return TaskWorklogs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return TaskWorklogs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
