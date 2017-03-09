define(["require", "exports"], function (require, exports) {
    "use strict";
    //kraj 
    var Page = (function () {
        function Page(sitepagename, sitepagetypeid, pagetitle, metakeywords, metadescription, linkid, sitepageid, pageseodataid) {
            if (sitepagename === void 0) { sitepagename = ""; }
            if (pagetitle === void 0) { pagetitle = ""; }
            if (metakeywords === void 0) { metakeywords = ""; }
            if (metadescription === void 0) { metadescription = ""; }
            if (linkid === void 0) { linkid = null; }
            if (sitepageid === void 0) { sitepageid = null; }
            if (pageseodataid === void 0) { pageseodataid = null; }
            this.sitepageid = sitepageid;
            this.pageseodataid = pageseodataid;
            this.linkid = linkid;
            this.sitepagename = sitepagename;
            this.sitepagetypeid = sitepagetypeid;
            this.pagetitle = pagetitle;
            this.metakeywords = metakeywords;
            this.metadescription = metadescription;
        }
        //Getters Setterssss
        Page.prototype.setPageId = function (pageid) {
            this.sitepageid = pageid;
        };
        Page.prototype.getPageId = function () {
            return this.sitepageid;
        };
        Page.prototype.setPageSeoDataId = function (seoid) {
            this.pageseodataid = seoid;
        };
        Page.prototype.setPageLinkId = function (linkid) {
            this.linkid = linkid;
        };
        Page.prototype.getPageLinkId = function () {
            return this.linkid;
        };
        Page.prototype.getPageSeoDataId = function () {
            return this.pageseodataid;
        };
        Page.prototype.getPageName = function () {
            return this.sitepagename;
        };
        Page.prototype.setPageName = function (name) {
            this.sitepagename = name;
        };
        Page.prototype.getSitePageTypeId = function () {
            return this.sitepagetypeid;
        };
        Page.prototype.setSitePageTypeId = function (id) {
            this.sitepagetypeid = id;
        };
        Page.prototype.getPageTitle = function () {
            return this.pagetitle;
        };
        Page.prototype.setPageTitle = function (title) {
            this.pagetitle = title;
        };
        Page.prototype.getPageMetaKeyWords = function () {
            return this.metakeywords;
        };
        Page.prototype.setPageMetaKeyWords = function (keywords) {
            this.metakeywords = keywords;
        };
        Page.prototype.getPageMetaDesciption = function () {
            return this.metadescription;
        };
        Page.prototype.setPageMetaDescription = function (description) {
            this.metadescription = description;
        };
        // end setters gettersssss.......
        Page.prototype.pageToFormData = function () {
            var data = new FormData();
            data.append("SitePageId", this.sitepageid);
            data.append("SitePageSeoDataId", this.pageseodataid);
            data.append("SitePageName", this.sitepagename);
            data.append('SitePageTypeId', this.sitepagetypeid);
            data.append('PageTitle', this.pagetitle);
            data.append('MetaKeyWords', this.metakeywords);
            data.append('MetaDescription', this.metadescription);
            return data;
        };
        return Page;
    }());
    exports.Page = Page;
});
