"use strict";
var global_config_1 = require('../global/global.config');
var GlobalUtil = (function () {
    function GlobalUtil() {
    }
    GlobalUtil.setSession = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    GlobalUtil.getSession = function (key) {
        return sessionStorage.getItem(key);
    };
    GlobalUtil.clearSession = function (key) {
        sessionStorage.removeItem(key);
    };
    GlobalUtil.setAppSession = function (key, value) {
        //sessionStorage.setItem(key, JSON.stringify(value));
        localStorage.setItem(key, JSON.stringify(value));
    };
    GlobalUtil.getAppSession = function (key) {
        //return JSON.parse(sessionStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key));
    };
    GlobalUtil.clearAppSession = function (key) {
        //sessionStorage.clear();
        //localStorage.clear();
        localStorage.removeItem(key);
    };
    GlobalUtil.getBasePath = function (key) {
        var completeUrl = "";
        completeUrl = "http://" + window.location.hostname;
        if (window.location.port != "" && window.location.port != null && window.location.port.trim().length > 0) {
            completeUrl += ":" + window.location.port;
        }
        completeUrl += window.location.pathname;
        if (global_config_1.GlobalConfig.environment == global_config_1.Constants.qaEnvironment) {
            completeUrl += "src/";
        }
        return completeUrl;
        //evs01tst05/syngentatest/
    };
    GlobalUtil.getFileExtension = function (fileName) {
        return fileName.split('.').pop();
    };
    GlobalUtil.getFormattedDate = function () {
        var d = new Date();
        var cDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return cDate;
    };
    GlobalUtil.getCurrentDate = function () {
        var d = new Date();
        var cDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        return cDate;
    };
    GlobalUtil.GroupBy = function (propName, arrayToGroup) {
        return arrayToGroup.reduce(function (groups, item) {
            var val = item[propName];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    };
    return GlobalUtil;
}());
exports.GlobalUtil = GlobalUtil;
//# sourceMappingURL=global.util.js.map