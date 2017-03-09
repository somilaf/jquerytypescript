define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var ServiceDB = (function () {
        function ServiceDB() {
            this.serverMenuModulePath = "services/";
        }
        ServiceDB.prototype.newServiceAjax = function (service) {
            var functionurl = this.serverMenuModulePath + "new_Service_Ajax?" + Math.random();
            var newservicespromise = new httprx.DumilAjax(functionurl, service);
            return newservicespromise;
        };
        ServiceDB.prototype.deleteServiceAjax = function (serviceid) {
            var functionurl = this.serverMenuModulePath + "delete_Service_Ajax?" + Math.random();
            var deleteservicespromise = new httprx.DumilAjax(functionurl, serviceid);
            return deleteservicespromise;
        };
        ServiceDB.prototype.modifyServiceAjax = function (serviceid) {
            var functionurl = this.serverMenuModulePath + "modify_Service_Ajax?" + Math.random();
            var modifyservicespromise = new httprx.DumilAjax(functionurl, serviceid);
            return modifyservicespromise;
        };
        ServiceDB.prototype.allServicessAjax = function () {
            var functionurl = this.serverMenuModulePath + "all_Services_Ajax?" + Math.random();
            var allservicespromise = new httprx.DumilAjax(functionurl);
            return allservicespromise;
        };
        ServiceDB.prototype.singleServiceAjax = function (serviceid) {
            var functionurl = this.serverMenuModulePath + "get_SingleService_Ajax?" + Math.random();
            var servicepromise = new httprx.DumilAjax(functionurl, serviceid);
            return servicepromise;
        };
        ServiceDB.prototype.getServicePictureAjax = function (serviceid) {
            var functionurl = this.serverMenuModulePath + "get_Picture_Paths?" + Math.random();
            var picturepathpromise = new httprx.DumilAjax(functionurl, serviceid);
            return picturepathpromise;
        };
        ServiceDB.prototype.getCategoriesAjax = function () {
            var functionurl = this.serverMenuModulePath + "get_Categories_DropDown?" + Math.random();
            var allcategoriespromise = new httprx.DumilAjax(functionurl);
            return allcategoriespromise;
        };
        ServiceDB.prototype.getPagesAjax = function () {
            var functionurl = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        ServiceDB.prototype.delete_SingleImage_Ajax = function (data) {
            var functionurl = this.serverMenuModulePath + "delete_SingleImage_Ajax?" + Math.random();
            var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
            return deleteimagepromise;
        };
        ServiceDB.prototype.updateSingleImgeAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "update_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        ServiceDB.prototype.insertSingleImgeAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "insert_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        return ServiceDB;
    }());
    exports.ServiceDB = ServiceDB;
});
