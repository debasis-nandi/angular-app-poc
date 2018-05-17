"use strict";
var router_1 = require('@angular/router');
var mapping_component_1 = require('./mapping.component');
var admin_component_1 = require('./admin.component');
exports.mappingRoutes = [
    { path: '', component: mapping_component_1.MappingComponent },
    { path: 'competitorsegment', component: admin_component_1.AdminComponent, data: { id: "Competitor Segment Mapping", formtype: "mapping" } },
    { path: 'competitorProductLine', component: admin_component_1.AdminComponent, data: { id: "Competitor Product Line Mapping", formtype: "mapping" } },
    { path: 'competitorregion', component: admin_component_1.AdminComponent, data: { id: "Competitor Region Mapping", formtype: "mapping" } },
    { path: 'moduledocumenttype', component: admin_component_1.AdminComponent, data: { id: "Module Document Type Mapping", formtype: "mapping" } }
];
exports.MappingRouting = router_1.RouterModule.forChild(exports.mappingRoutes);
//# sourceMappingURL=mapping.routing.js.map