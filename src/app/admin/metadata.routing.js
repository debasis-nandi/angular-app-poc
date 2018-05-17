"use strict";
var router_1 = require('@angular/router');
var metadata_component_1 = require('./metadata.component');
var admin_component_1 = require('./admin.component');
exports.metadataRoutes = [
    { path: '', component: metadata_component_1.MetadataComponent },
    { path: 'segment', component: admin_component_1.AdminComponent, data: { id: "Segment", formtype: "master" } },
    { path: 'region', component: admin_component_1.AdminComponent, data: { id: "Region", formtype: "master" } },
    { path: 'productLines', component: admin_component_1.AdminComponent, data: { id: "Product line", formtype: "master" } },
    { path: 'crop', component: admin_component_1.AdminComponent, data: { id: "Crop", formtype: "master" } },
    { path: 'documenttype', component: admin_component_1.AdminComponent, data: { id: "Document Type", formtype: "master" } },
    { path: 'newstype', component: admin_component_1.AdminComponent, data: { id: "News Type", formtype: "master" } },
    { path: 'currencies', component: admin_component_1.AdminComponent, data: { id: "Currencies", formtype: "master" } },
    { path: 'competitor', component: admin_component_1.AdminComponent, data: { id: "Competitor", formtype: "master" } },
    { path: 'restrictedgroup', component: admin_component_1.AdminComponent, data: { id: "Restricted Group", formtype: "master" } }
];
exports.MetaDataRouting = router_1.RouterModule.forChild(exports.metadataRoutes);
//# sourceMappingURL=metadata.routing.js.map