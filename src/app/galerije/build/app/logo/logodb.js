define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var LogoDB = (function () {
        function LogoDB() {
            this.serverLogoModulePath = "dumillogos/";
        }
        LogoDB.prototype.newLogoAjax = function (logo) {
            var functionurl = this.serverLogoModulePath + "new_Logo_Ajax?" + Math.random();
            var newlogopromise = new httprx.DumilAjax(functionurl, logo);
            return newlogopromise;
        };
        LogoDB.prototype.deleteLogoAjax = function (logoid) {
            var functionurl = this.serverLogoModulePath + "delete_Logo_Ajax?" + Math.random();
            var deletelogopromise = new httprx.DumilAjax(functionurl, logoid);
            return deletelogopromise;
        };
        LogoDB.prototype.modifyLogoAjax = function (linkid) {
            var functionurl = this.serverLogoModulePath + "modify_Logo_Ajax?" + Math.random();
            var modifylogopromise = new httprx.DumilAjax(functionurl, linkid);
            return modifylogopromise;
        };
        //Ajax za dohvatanej svih Linkova iz Baze.
        LogoDB.prototype.allLogosAjax = function () {
            var functionurl = this.serverLogoModulePath + "get_AllLogo_Ajax?" + Math.random();
            var alllogospromise = new httprx.DumilAjax(functionurl);
            return alllogospromise;
        };
        LogoDB.prototype.singleLogoAjax = function (logoid) {
            var functionurl = this.serverLogoModulePath + "get_SingleLogo_Ajax?" + Math.random();
            var singlelogopromise = new httprx.DumilAjax(functionurl, logoid);
            return singlelogopromise;
        };
        LogoDB.prototype.getPagesDropDownAjax = function () {
            var functionurl = "pagelinks/get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        LogoDB.prototype.getPagesLogosAjax = function (logoid) {
            var functionurl = this.serverLogoModulePath + "get_PagesLogo_Ajax?" + Math.random();
            var pageslogospromise = new httprx.DumilAjax(functionurl, logoid);
            return pageslogospromise;
        };
        LogoDB.prototype.getLogoPictureAjax = function (logoid) {
            var functionurl = this.serverLogoModulePath + "get_Picture_Path?" + Math.random();
            var picturepathpromise = new httprx.DumilAjax(functionurl, logoid);
            return picturepathpromise;
        };
        LogoDB.prototype.deleteLogoPictureAjax = function (data) {
            var functionurl = this.serverLogoModulePath + "delete_Picture_Ajax?" + Math.random();
            var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
            return deleteimagepromise;
        };
        LogoDB.prototype.updateSingleImgeAjax = function (data) {
            var functionurl = this.serverLogoModulePath + "update_Picture_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        return LogoDB;
    }());
    exports.LogoDB = LogoDB;
});
