define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var MenuDB = (function () {
        function MenuDB() {
            this.serverMenuModulePath = "sitemenues/";
        }
        MenuDB.prototype.newSiteMenuAjax = function (menu) {
            var functionurl = this.serverMenuModulePath + "new_Menu_Ajax?" + Math.random();
            var allmenuesspromise = new httprx.DumilAjax(functionurl, menu);
            return allmenuesspromise;
        };
        MenuDB.prototype.deleteSiteMenuAjax = function (menuid) {
            var functionurl = this.serverMenuModulePath + "delete_Menu_Ajax?" + Math.random();
            var deletemenuespromise = new httprx.DumilAjax(functionurl, menuid);
            return deletemenuespromise;
        };
        MenuDB.prototype.modifySiteMenuAjax = function (menuid) {
            var functionurl = this.serverMenuModulePath + "modify_Menu_Ajax?" + Math.random();
            var modifymenuespromise = new httprx.DumilAjax(functionurl, menuid);
            return modifymenuespromise;
        };
        MenuDB.prototype.allSiteMenuesAjax = function () {
            var functionurl = this.serverMenuModulePath + "allMenuesAjax?" + Math.random();
            var allmenuesspromise = new httprx.DumilAjax(functionurl);
            return allmenuesspromise;
        };
        MenuDB.prototype.singleSiteMenuAjax = function (menuid) {
            var functionurl = this.serverMenuModulePath + "get_CompleteMenu_Ajax?" + Math.random();
            var childrenlinkspromise = new httprx.DumilAjax(functionurl, menuid);
            return childrenlinkspromise;
        };
        MenuDB.prototype.getMenuPagesAjax = function (menuid) {
            var functionurl = this.serverMenuModulePath + "get_Pages_Menu_Ajax?" + Math.random();
            var menupagespromise = new httprx.DumilAjax(functionurl, menuid);
            return menupagespromise;
        };
        MenuDB.prototype.getPagesDropDownAjax = function () {
            var functionurl = "pagelinks/get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        MenuDB.prototype.getParentLinksAjax = function () {
            var functionurl = this.serverMenuModulePath + "getFirstRowLinksAjax?" + Math.random();
            var parentlinkspromise = new httprx.DumilAjax(functionurl);
            return parentlinkspromise;
        };
        MenuDB.prototype.getChildrenLinks = function (parentlinkid) {
            var functionurl = "pagelinks/fill_DropDownList_Ajax?" + Math.random();
            var childrenlinkspromise = new httprx.DumilAjax(functionurl, parentlinkid);
            return childrenlinkspromise;
        };
        MenuDB.prototype.getMenuLinks = function (menuid) {
            var functionurl = this.serverMenuModulePath + "get_MenuLinksAjax?" + Math.random();
            var menulinkspromise = new httprx.DumilAjax(functionurl, menuid);
            return menulinkspromise;
        };
        MenuDB.prototype.getPageMenuLinks = function (menupageposition) {
            var functionurl = this.serverMenuModulePath + "get_PageMenuLinksAjax?" + Math.random();
            var menulinkspromise = new httprx.DumilAjax(functionurl, menupageposition);
            return menulinkspromise;
        };
        MenuDB.prototype.getMenuByPosition = function (menuposition) {
            var functionurl = this.serverMenuModulePath + "getMenuByPositionAjax?" + Math.random();
            var menuespromise = new httprx.DumilAjax(functionurl, menuposition);
            return menuespromise;
        };
        MenuDB.prototype.removePageMenu = function (pageposition) {
            var functionurl = this.serverMenuModulePath + "delete_Page_Menu_Ajax?" + Math.random();
            var menuespromise = new httprx.DumilAjax(functionurl, pageposition);
            return menuespromise;
        };
        MenuDB.prototype.showPageMenu = function (pagemenu) {
            var functionurl = this.serverMenuModulePath + "modify_Page_Menu_Ajax?" + Math.random();
            var menuespromise = new httprx.DumilAjax(functionurl, pagemenu);
            return menuespromise;
        };
        return MenuDB;
    }());
    exports.MenuDB = MenuDB;
});
