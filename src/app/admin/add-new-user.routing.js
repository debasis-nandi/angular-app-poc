"use strict";
var router_1 = require('@angular/router');
var admin_component_1 = require('./admin.component');
exports.manageUserRoutes = [
    { path: '', component: admin_component_1.AdminComponent, data: { id: "Manage User", formtype: "adduser" } },
];
exports.AddNewUserRouting = router_1.RouterModule.forChild(exports.manageUserRoutes);
//# sourceMappingURL=add-new-user.routing.js.map