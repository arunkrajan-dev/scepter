Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"home_private",
	"contacts",
	"contacts.customers",
	"contacts.customers.insert",
	"contacts.customers.details",
	"contacts.customers.details.summary",
	"contacts.customers.details.logs",
	"contacts.customers.details.log_insert",
	"contacts.customers.details.log_edit",
	"contacts.customers.details.tasks",
	"contacts.customers.details.task_insert",
	"contacts.customers.details.task_edit",
	"contacts.customers.details.expenditures",
	"contacts.customers.details.expenditure_insert",
	"contacts.customers.details.expenditure_edit",
	"contacts.customers.details.invoices",
	"contacts.customers.details.quotations",
	"contacts.customers.details.deliveryslips",
	"contacts.customers.edit",
	"contacts.suppliers",
	"contacts.suppliers.insert",
	"contacts.suppliers.details",
	"contacts.suppliers.details.summary",
	"contacts.suppliers.details.purchaseorders",
	"contacts.suppliers.edit",
	"contacts.others",
	"contacts.others.insert",
	"contacts.others.details",
	"contacts.others.edit",
	"bills",
	"bills.invoices",
	"bills.invoices.insert",
	"bills.invoices.details",
	"bills.invoices.details.items",
	"bills.invoices.details.insert",
	"bills.invoices.details.edit",
	"bills.invoices.edit",
	"bills.quotations",
	"bills.quotations.insert",
	"bills.quotations.details",
	"bills.quotations.details.items",
	"bills.quotations.details.insert",
	"bills.quotations.details.edit",
	"bills.quotations.edit",
	"bills.purchaseorders",
	"bills.purchaseorders.insert",
	"bills.purchaseorders.details",
	"bills.purchaseorders.details.items",
	"bills.purchaseorders.details.insert",
	"bills.purchaseorders.details.edit",
	"bills.purchaseorders.edit",
	"bills.deliveryslips",
	"bills.deliveryslips.insert",
	"bills.deliveryslips.details",
	"bills.deliveryslips.details.items",
	"bills.deliveryslips.details.insert",
	"bills.deliveryslips.details.edit",
	"bills.deliveryslips.edit",
	"products",
	"products.insert",
	"products.details",
	"products.edit",
	"documents",
	"documents.insert",
	"documents.details",
	"documents.edit",
	"expenditure",
	"expenditure.insert",
	"expenditure.details",
	"expenditure.edit",
	"tasks",
	"tasks.insert",
	"tasks.details",
	"tasks.details.task_worklogs",
	"tasks.details.insert",
	"tasks.details.edit",
	"tasks.edit",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

var freeRoutes = [
	
];

var roleMap = [
	{ route: "contacts.customers.insert",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.summary",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.logs",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.log_insert",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.log_edit",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.tasks",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.task_insert",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.task_edit",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.expenditures",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.expenditure_insert",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.expenditure_edit",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.invoices",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.quotations",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.details.deliveryslips",	roles: ["admin","manager","sales"] },
	{ route: "contacts.customers.edit",	roles: ["admin","manager","sales"] },
	{ route: "contacts.suppliers.insert",	roles: ["admin","manager"] },
	{ route: "contacts.suppliers.details",	roles: ["admin","manager"] },
	{ route: "contacts.suppliers.details.summary",	roles: ["admin","manager"] },
	{ route: "contacts.suppliers.details.purchaseorders",	roles: ["admin","manager"] },
	{ route: "contacts.suppliers.edit",	roles: ["admin","manager"] },
	{ route: "contacts.others.insert",	roles: ["admin","manager"] },
	{ route: "contacts.others.edit",	roles: ["admin","manager"] },
	{ route: "bills.invoices",	roles: ["admin","manager","sales"] },
	{ route: "bills.invoices.insert",	roles: ["admin","manager"] },
	{ route: "bills.invoices.details",	roles: ["admin","manager","sales"] },
	{ route: "bills.invoices.details.items",	roles: ["admin","manager","sales"] },
	{ route: "bills.invoices.details.insert",	roles: ["admin","manager","sales"] },
	{ route: "bills.invoices.details.edit",	roles: ["admin","manager"] },
	{ route: "bills.invoices.edit",	roles: ["admin","manager"] },
	{ route: "bills.quotations",	roles: ["admin","manager","sales"] },
	{ route: "bills.quotations.insert",	roles: ["admin","manager"] },
	{ route: "bills.quotations.details",	roles: ["admin","manager","sales"] },
	{ route: "bills.quotations.details.items",	roles: ["admin","manager","sales"] },
	{ route: "bills.quotations.details.insert",	roles: ["admin","manager","sales"] },
	{ route: "bills.quotations.details.edit",	roles: ["admin","manager"] },
	{ route: "bills.quotations.edit",	roles: ["admin","manager"] },
	{ route: "bills.purchaseorders",	roles: ["admin","manager","sales"] },
	{ route: "bills.purchaseorders.insert",	roles: ["admin","manager"] },
	{ route: "bills.purchaseorders.details",	roles: ["admin","manager","sales"] },
	{ route: "bills.purchaseorders.details.items",	roles: ["admin","manager","sales"] },
	{ route: "bills.purchaseorders.details.insert",	roles: ["admin","manager","sales"] },
	{ route: "bills.purchaseorders.details.edit",	roles: ["admin","manager"] },
	{ route: "bills.purchaseorders.edit",	roles: ["admin","manager"] },
	{ route: "bills.deliveryslips",	roles: ["admin","manager","sales"] },
	{ route: "bills.deliveryslips.insert",	roles: ["admin","manager"] },
	{ route: "bills.deliveryslips.details",	roles: ["admin","manager","sales"] },
	{ route: "bills.deliveryslips.details.items",	roles: ["admin","manager","sales"] },
	{ route: "bills.deliveryslips.details.insert",	roles: ["admin","manager","sales"] },
	{ route: "bills.deliveryslips.details.edit",	roles: ["admin","manager"] },
	{ route: "bills.deliveryslips.edit",	roles: ["admin","manager"] },
	{ route: "products.insert",	roles: ["admin","manager"] },
	{ route: "products.edit",	roles: ["admin","manager"] },
	{ route: "documents",	roles: ["admin","manager"] },
	{ route: "documents.insert",	roles: ["admin","manager"] },
	{ route: "documents.details",	roles: ["admin","manager"] },
	{ route: "documents.edit",	roles: ["admin","manager"] },
	{ route: "expenditure",	roles: ["admin","manager","sales"] },
	{ route: "expenditure.insert",	roles: ["admin","manager","sales"] },
	{ route: "expenditure.details",	roles: ["admin","manager","sales"] },
	{ route: "expenditure.edit",	roles: ["admin","manager","sales"] },
	{ route: "tasks",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.insert",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.details",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.details.task_worklogs",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.details.insert",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.details.edit",	roles: ["admin","manager","sales","client"] },
	{ route: "tasks.edit",	roles: ["admin","manager","sales","client"] },
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("home_private");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("home_private");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("contacts", {path: "/contacts", controller: "ContactsController"});
	this.route("contacts.customers", {path: "/contacts/customers/:type", controller: "ContactsCustomersController"});
	this.route("contacts.customers.insert", {path: "/contacts/customers/:type/insert", controller: "ContactsCustomersInsertController"});
	this.route("contacts.customers.details", {path: "/contacts/customers/:type/details/:customerId", controller: "ContactsCustomersDetailsController"});
	this.route("contacts.customers.details.summary", {path: "/contacts/customers/:type/details/:customerId/summary", controller: "ContactsCustomersDetailsSummaryController"});
	this.route("contacts.customers.details.logs", {path: "/contacts/customers/:type/details/:customerId/logs", controller: "ContactsCustomersDetailsLogsController"});
	this.route("contacts.customers.details.log_insert", {path: "/contacts/customers/:type/details/:customerId/log_insert", controller: "ContactsCustomersDetailsLogInsertController"});
	this.route("contacts.customers.details.log_edit", {path: "/contacts/customers/:type/details/:customerId/log_edit/:logId", controller: "ContactsCustomersDetailsLogEditController"});
	this.route("contacts.customers.details.tasks", {path: "/contacts/customers/:type/details/:customerId/tasks", controller: "ContactsCustomersDetailsTasksController"});
	this.route("contacts.customers.details.task_insert", {path: "/contacts/customers/:type/details/:customerId/task_insert", controller: "ContactsCustomersDetailsTaskInsertController"});
	this.route("contacts.customers.details.task_edit", {path: "/contacts/customers/:type/details/:customerId/task_edit/:taskId", controller: "ContactsCustomersDetailsTaskEditController"});
	this.route("contacts.customers.details.expenditures", {path: "/contacts/customers/:type/details/:customerId/expenditures", controller: "ContactsCustomersDetailsExpendituresController"});
	this.route("contacts.customers.details.expenditure_insert", {path: "/contacts/customers/:type/details/:customerId/expenditure_insert", controller: "ContactsCustomersDetailsExpenditureInsertController"});
	this.route("contacts.customers.details.expenditure_edit", {path: "/contacts/customers/:type/details/:customerId/expenditure_edit/:expenditureId", controller: "ContactsCustomersDetailsExpenditureEditController"});
	this.route("contacts.customers.details.invoices", {path: "/contacts/customers/:type/details/:customerId/invoices", controller: "ContactsCustomersDetailsInvoicesController"});
	this.route("contacts.customers.details.quotations", {path: "/contacts/customers/:type/details/:customerId/quotations", controller: "ContactsCustomersDetailsQuotationsController"});
	this.route("contacts.customers.details.deliveryslips", {path: "/contacts/customers/:type/details/:customerId/deliveryslips", controller: "ContactsCustomersDetailsDeliveryslipsController"});
	this.route("contacts.customers.edit", {path: "/contacts/customers/:type/edit/:customerId", controller: "ContactsCustomersEditController"});
	this.route("contacts.suppliers", {path: "/contacts/suppliers", controller: "ContactsSuppliersController"});
	this.route("contacts.suppliers.insert", {path: "/contacts/suppliers/insert", controller: "ContactsSuppliersInsertController"});
	this.route("contacts.suppliers.details", {path: "/contacts/suppliers/details/:supplierId", controller: "ContactsSuppliersDetailsController"});
	this.route("contacts.suppliers.details.summary", {path: "/contacts/suppliers/details/:supplierId/summary", controller: "ContactsSuppliersDetailsSummaryController"});
	this.route("contacts.suppliers.details.purchaseorders", {path: "/contacts/suppliers/details/:supplierId/purchaseorders", controller: "ContactsSuppliersDetailsPurchaseordersController"});
	this.route("contacts.suppliers.edit", {path: "/contacts/suppliers/edit/:supplierId", controller: "ContactsSuppliersEditController"});
	this.route("contacts.others", {path: "/contacts/others", controller: "ContactsOthersController"});
	this.route("contacts.others.insert", {path: "/contacts/others/insert", controller: "ContactsOthersInsertController"});
	this.route("contacts.others.details", {path: "/contacts/others/details/:otherId", controller: "ContactsOthersDetailsController"});
	this.route("contacts.others.edit", {path: "/contacts/others/edit/:otherId", controller: "ContactsOthersEditController"});
	this.route("bills", {path: "/bills", controller: "BillsController"});
	this.route("bills.invoices", {path: "/bills/invoices", controller: "BillsInvoicesController"});
	this.route("bills.invoices.insert", {path: "/bills/invoices/insert", controller: "BillsInvoicesInsertController"});
	this.route("bills.invoices.details", {path: "/bills/invoices/details/:invoiceId", controller: "BillsInvoicesDetailsController"});
	this.route("bills.invoices.details.items", {path: "/bills/invoices/details/:invoiceId/items", controller: "BillsInvoicesDetailsItemsController"});
	this.route("bills.invoices.details.insert", {path: "/bills/invoices/details/:invoiceId/insert", controller: "BillsInvoicesDetailsInsertController"});
	this.route("bills.invoices.details.edit", {path: "/bills/invoices/details/:invoiceId/edit/:itemId", controller: "BillsInvoicesDetailsEditController"});
	this.route("bills.invoices.edit", {path: "/bills/invoices/edit/:invoiceId", controller: "BillsInvoicesEditController"});
	this.route("bills.quotations", {path: "/bills/quotations", controller: "BillsQuotationsController"});
	this.route("bills.quotations.insert", {path: "/bills/quotations/insert", controller: "BillsQuotationsInsertController"});
	this.route("bills.quotations.details", {path: "/bills/quotations/details/:quotationId", controller: "BillsQuotationsDetailsController"});
	this.route("bills.quotations.details.items", {path: "/bills/quotations/details/:quotationId/items", controller: "BillsQuotationsDetailsItemsController"});
	this.route("bills.quotations.details.insert", {path: "/bills/quotations/details/:quotationId/insert", controller: "BillsQuotationsDetailsInsertController"});
	this.route("bills.quotations.details.edit", {path: "/bills/quotations/details/:quotationId/edit/:itemId", controller: "BillsQuotationsDetailsEditController"});
	this.route("bills.quotations.edit", {path: "/bills/quotations/edit/:quotationId", controller: "BillsQuotationsEditController"});
	this.route("bills.purchaseorders", {path: "/bills/purchaseorders", controller: "BillsPurchaseordersController"});
	this.route("bills.purchaseorders.insert", {path: "/bills/purchaseorders/insert", controller: "BillsPurchaseordersInsertController"});
	this.route("bills.purchaseorders.details", {path: "/bills/purchaseorders/details/:purchaseorderId", controller: "BillsPurchaseordersDetailsController"});
	this.route("bills.purchaseorders.details.items", {path: "/bills/purchaseorders/details/:purchaseorderId/items", controller: "BillsPurchaseordersDetailsItemsController"});
	this.route("bills.purchaseorders.details.insert", {path: "/bills/purchaseorders/details/:purchaseorderId/insert", controller: "BillsPurchaseordersDetailsInsertController"});
	this.route("bills.purchaseorders.details.edit", {path: "/bills/purchaseorders/details/:purchaseorderId/edit/:itemId", controller: "BillsPurchaseordersDetailsEditController"});
	this.route("bills.purchaseorders.edit", {path: "/bills/purchaseorders/edit/:purchaseorderId", controller: "BillsPurchaseordersEditController"});
	this.route("bills.deliveryslips", {path: "/bills/deliveryslips", controller: "BillsDeliveryslipsController"});
	this.route("bills.deliveryslips.insert", {path: "/bills/deliveryslips/insert", controller: "BillsDeliveryslipsInsertController"});
	this.route("bills.deliveryslips.details", {path: "/bills/deliveryslips/details/:deliveryslipId", controller: "BillsDeliveryslipsDetailsController"});
	this.route("bills.deliveryslips.details.items", {path: "/bills/deliveryslips/details/:deliveryslipId/items", controller: "BillsDeliveryslipsDetailsItemsController"});
	this.route("bills.deliveryslips.details.insert", {path: "/bills/deliveryslips/details/:deliveryslipId/insert", controller: "BillsDeliveryslipsDetailsInsertController"});
	this.route("bills.deliveryslips.details.edit", {path: "/bills/deliveryslips/details/:deliveryslipId/edit/:itemId", controller: "BillsDeliveryslipsDetailsEditController"});
	this.route("bills.deliveryslips.edit", {path: "/bills/deliveryslips/edit/:deliveryslipId", controller: "BillsDeliveryslipsEditController"});
	this.route("products", {path: "/products", controller: "ProductsController"});
	this.route("products.insert", {path: "/products/insert", controller: "ProductsInsertController"});
	this.route("products.details", {path: "/products/details/:productId", controller: "ProductsDetailsController"});
	this.route("products.edit", {path: "/products/edit/:productId", controller: "ProductsEditController"});
	this.route("documents", {path: "/documents", controller: "DocumentsController"});
	this.route("documents.insert", {path: "/documents/insert", controller: "DocumentsInsertController"});
	this.route("documents.details", {path: "/documents/details/:documentId", controller: "DocumentsDetailsController"});
	this.route("documents.edit", {path: "/documents/edit/:documentId", controller: "DocumentsEditController"});
	this.route("expenditure", {path: "/expenditure", controller: "ExpenditureController"});
	this.route("expenditure.insert", {path: "/expenditure/insert", controller: "ExpenditureInsertController"});
	this.route("expenditure.details", {path: "/expenditure/details/:expenditureId", controller: "ExpenditureDetailsController"});
	this.route("expenditure.edit", {path: "/expenditure/edit/:expenditureId", controller: "ExpenditureEditController"});
	this.route("tasks", {path: "/tasks", controller: "TasksController"});
	this.route("tasks.insert", {path: "/tasks/insert", controller: "TasksInsertController"});
	this.route("tasks.details", {path: "/tasks/details/:taskId", controller: "TasksDetailsController"});
	this.route("tasks.details.task_worklogs", {path: "/tasks/details/:taskId/task_worklogs", controller: "TasksDetailsTaskWorklogsController"});
	this.route("tasks.details.insert", {path: "/tasks/details/:taskId/insert", controller: "TasksDetailsInsertController"});
	this.route("tasks.details.edit", {path: "/tasks/details/:taskId/edit/:worklogId", controller: "TasksDetailsEditController"});
	this.route("tasks.edit", {path: "/tasks/edit/:taskId", controller: "TasksEditController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
});
