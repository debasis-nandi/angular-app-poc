"use strict";
var router_1 = require('@angular/router');
var admin_component_1 = require('./admin.component');
exports.manageUserRoutes = [
    { path: '', component: admin_component_1.AdminComponent, data: { id: "Manage User", formtype: "manageuser" } },
];
exports.ManageUserRouting = router_1.RouterModule.forChild(exports.manageUserRoutes);
//# sourceMappingURL=manageuser.routing.js.map