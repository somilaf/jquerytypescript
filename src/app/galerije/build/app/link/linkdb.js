define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var LinkDB = (function () {
        function LinkDB() {
            this.serverLinkModulePath = "pagelinks/";
        }
        //Ajax za dohvatanje pojedinacnog Linka iz Baze.
        LinkDB.prototype.singleSiteLinkAjax = function (linkid) {
            var functionurl = this.serverLinkModulePath + "get_SingleLink_Ajax?" + Math.random();
            var singlelinkpromise = new httprx.DumilAjax(functionurl, linkid);
            return singlelinkpromise;
        };
        //
        //Ajax za dohvatanej svih Linkova iz Baze.
        LinkDB.prototype.allSiteLinksAjax = function () {
            var functionurl = this.serverLinkModulePath + "allLinksAjax?" + Math.random();
            var allpagespromise = new httprx.DumilAjax(functionurl);
            return allpagespromise;
        };
        LinkDB.prototype.getPagesDropDownAjax = function () {
            var functionurl = this.serverLinkModulePath + "get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        LinkDB.prototype.getParentLinksAjax = function () {
            var functionurl = this.serverLinkModulePath + "get_ParentLinks_Ajax?" + Math.random();
            var parentlinkspromise = new httprx.DumilAjax(functionurl);
            return parentlinkspromise;
        };
        LinkDB.prototype.getChildrenLinkAjax = function (parentlinkid) {
            var functionurl = this.serverLinkModulePath + "fill_DropDownList_Ajax?" + Math.random();
            var childrenlinkspromise = new httprx.DumilAjax(functionurl, parentlinkid);
            return childrenlinkspromise;
        };
        LinkDB.prototype.newLinkAjax = function (link) {
            var functionurl = this.serverLinkModulePath + "new_Link_Ajax?" + Math.random();
            var newlinkspromise = new httprx.DumilAjax(functionurl, link);
            return newlinkspromise;
        };
        LinkDB.prototype.deleteLinkAjax = function (linkid) {
            var functionurl = this.serverLinkModulePath + "delete_Link_Ajax?" + Math.random();
            var deletelinkpromise = new httprx.DumilAjax(functionurl, linkid);
            return deletelinkpromise;
        };
        LinkDB.prototype.modifyLinkAjax = function (linkid) {
            var functionurl = this.serverLinkModulePath + "modify_Link_Ajax?" + Math.random();
            var modifylinkpromise = new httprx.DumilAjax(functionurl, linkid);
            return modifylinkpromise;
        };
        LinkDB.prototype.notParentLinkAjax = function (linkid) {
            var functionurl = this.serverLinkModulePath + "not_Parent_Ajax?" + Math.random();
            var modifylinkpromise = new httprx.DumilAjax(functionurl, linkid);
            return modifylinkpromise;
        };
        return LinkDB;
    }());
    exports.LinkDB = LinkDB;
});
