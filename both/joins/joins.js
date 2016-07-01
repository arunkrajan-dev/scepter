// Tasks
Tasks.join(Customers, "customerId", "customer", ["name"]);
Tasks.join(Users, "userId", "user", ["profile.name"]);

// Expenditure
Expenditure.join(Customers, "customerId", "customer", ["name"]);
Expenditure.join(Users, "userId", "user", ["profile.name"]);

// Invoices
Invoices.join(Customers, "customerId", "customer", ["name", "address"]);

// InvoiceItems
InvoiceItems.join(Products, "productId", "product", ["name", "url"]);

// Quotations
Quotations.join(Customers, "customerId", "customer", ["name", "address"]);

// QuotationItems
QuotationItems.join(Products, "productId", "product", ["name", "url"]);

// Purchaseorders
Purchaseorders.join(Suppliers, "supplierId", "supplier", ["name", "address"]);

// Deliveryslips
Deliveryslips.join(Customers, "customerId", "customer", ["name", "address"]);

// DeliveryslipItems
DeliveryslipItems.join(Products, "productId", "product", ["name", "url"]);

