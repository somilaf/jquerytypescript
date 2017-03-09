define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var PagesDB = (function () {
        function PagesDB() {
            this.serverLogoModulePath = "pages/";
        }
        PagesDB.prototype.newPageAjax = function (page) {
            var functionurl = this.serverLogoModulePath + "new_WebPage_Ajax?" + Math.random();
            var newpagepromise = new httprx.DumilAjax(functionurl, page);
            return newpagepromise;
        };
        //Ajax za azurianje izmena Web Stranica
        PagesDB.prototype.modifyPageAjax = function (page) {
            var functionurl = this.serverLogoModulePath + "modify_WebPage_Ajax?" + Math.random();
            ;
            var modifyWebPagePromise = new httprx.DumilAjax(functionurl, page);
            return modifyWebPagePromise;
        };
        //Ajax za brisanje postojece Web Strane
        PagesDB.prototype.deletePageAjax = function (pageid) {
            var functionurl = this.serverLogoModulePath + "delete_WebPage_Ajax?" + Math.random();
            ;
            var modifyWebPagePromise = new httprx.DumilAjax(functionurl, pageid);
            return modifyWebPagePromise;
        };
        //Ajax za dohvatanej svih Web Stranica iz Baze.
        PagesDB.prototype.allSitePagesAjax = function () {
            var functionurl = this.serverLogoModulePath + "allSitePagesAjax?" + Math.random();
            var allpagespromise = new httprx.DumilAjax(functionurl);
            return allpagespromise;
        };
        //Ajax za dohvatanje jedne kompletne Web Stranice iz baze
        PagesDB.prototype.singleSitePageAjax = function (pageid) {
            var functionurl = this.serverLogoModulePath + "get_SingleWebPage_Ajax?" + Math.random();
            var singlepagepromise = new httprx.DumilAjax(functionurl, pageid);
            return singlepagepromise;
        };
        //Ajax za dohvatanje svih tipova Web Stranica iz Baze.
        PagesDB.prototype.sitePageTypesAjax = function () {
            var functionurl = this.serverLogoModulePath + "getSitePageTypesAjax?" + Math.random();
            var axlinks = new httprx.DumilAjax(functionurl);
            return axlinks;
        };
        return PagesDB;
    }());
    exports.PagesDB = PagesDB;
});
