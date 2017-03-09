define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var CategoryDB = (function () {
        function CategoryDB() {
            this.serverMenuModulePath = "servicecategories/";
        }
        CategoryDB.prototype.newCategoryAjax = function (category) {
            var functionurl = this.serverMenuModulePath + "new_ServiceCategory_Ajax?" + Math.random();
            var newcategorypromise = new httprx.DumilAjax(functionurl, category);
            return newcategorypromise;
        };
        CategoryDB.prototype.deleteCategoryAjax = function (categoryid) {
            var functionurl = this.serverMenuModulePath + "delete_ServiceCategory_Ajax?" + Math.random();
            var deletecategorypromise = new httprx.DumilAjax(functionurl, categoryid);
            return deletecategorypromise;
        };
        CategoryDB.prototype.modifyCategoryAjax = function (categoryid) {
            var functionurl = this.serverMenuModulePath + "modify_ServiceCategory_Ajax?" + Math.random();
            var modifycategorypromise = new httprx.DumilAjax(functionurl, categoryid);
            return modifycategorypromise;
        };
        CategoryDB.prototype.allCategoriesAjax = function () {
            var functionurl = this.serverMenuModulePath + "all_Categories_Ajax?" + Math.random();
            var allmenuesspromise = new httprx.DumilAjax(functionurl);
            return allmenuesspromise;
        };
        CategoryDB.prototype.singleCategoryAjax = function (textid) {
            var functionurl = this.serverMenuModulePath + "get_SingleServiceCategory_Ajax?" + Math.random();
            var gallerypromise = new httprx.DumilAjax(functionurl, textid);
            return gallerypromise;
        };
        CategoryDB.prototype.getCategoryPictureAjax = function (galleryid) {
            var functionurl = this.serverMenuModulePath + "get_Picture_Path?" + Math.random();
            var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
            return picturepathpromise;
        };
        CategoryDB.prototype.getPagesAjax = function () {
            var functionurl = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        CategoryDB.prototype.deleteCategoryPictureAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "delete_Picture_Ajax?" + Math.random();
            var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
            return deleteimagepromise;
        };
        CategoryDB.prototype.updateSingleImgeAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "update_Picture_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        CategoryDB.prototype.getParentLinksAjax = function () {
            var functionurl = this.serverMenuModulePath + "getFirstRowLinksAjax?" + Math.random();
            var parentlinkspromise = new httprx.DumilAjax(functionurl);
            return parentlinkspromise;
        };
        CategoryDB.prototype.getChildrenLinks = function (parentlinkid) {
            var functionurl = "pagelinks/fill_DropDownList_Ajax?" + Math.random();
            var childrenlinkspromise = new httprx.DumilAjax(functionurl, parentlinkid);
            return childrenlinkspromise;
        };
        CategoryDB.prototype.buildMenu = function (links) {
            var functionurl = this.serverMenuModulePath + "loadSiteMapMeni?" + Math.random();
            var menupromise = new httprx.DumilAjax(functionurl, links);
            return menupromise;
        };
        return CategoryDB;
    }());
    exports.CategoryDB = CategoryDB;
});
