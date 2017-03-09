define(["require", "exports"], function (require, exports) {
    "use strict";
    var Link = (function () {
        function Link(linkname, linkdescription, autt, parentlinkid, linkposition, linkid, sitepageid, isparent) {
            if (autt === void 0) { autt = 0; }
            if (linkid === void 0) { linkid = 0; }
            if (sitepageid === void 0) { sitepageid = 0; }
            if (isparent === void 0) { isparent = 0; }
            this.linkid = linkid;
            this.linkname = linkname;
            this.linkdescription = linkdescription;
            this.autt = autt;
            this.parentlinkid = parentlinkid;
            this.linkposition = linkposition;
            this.sitepageid = sitepageid;
            this.isparent = isparent;
        }
        //Getters Setterssss
        Link.prototype.setLinkId = function (linkid) {
            this.linkid = linkid;
        };
        Link.prototype.getLinkId = function () {
            return this.linkid;
        };
        Link.prototype.setLinkName = function (linkname) {
            this.linkname = linkname;
        };
        Link.prototype.getLinkName = function () {
            return this.linkname;
        };
        Link.prototype.setLinkDescription = function (description) {
            this.linkdescription = description;
        };
        Link.prototype.getLinkDescription = function () {
            return this.linkdescription;
        };
        Link.prototype.setAutt = function (autt) {
            this.autt = autt;
        };
        Link.prototype.getAutt = function () {
            return this.autt;
        };
        Link.prototype.setParentLinkId = function (parentlinkid) {
            this.parentlinkid = parentlinkid;
        };
        Link.prototype.getParentLinkId = function () {
            return this.parentlinkid;
        };
        Link.prototype.setSitePageId = function (sitepageid) {
            this.sitepageid = sitepageid;
        };
        Link.prototype.getSitePageId = function () {
            return this.sitepageid;
        };
        Link.prototype.setChildrenLinks = function (childrenlinks) {
            this.childrenlinks = [];
            for (var l in childrenlinks) {
                this.childrenlinks.push(new Link(childrenlinks[l].linkname, childrenlinks[l].linkdescription, childrenlinks[l].autt, childrenlinks[l].parentlinkid, childrenlinks[l].linkposition, childrenlinks[l].linkid, childrenlinks[l].sitepageid, childrenlinks[l].isparent));
            }
        };
        Link.prototype.getChildrenLinks = function () {
            return this.childrenlinks;
        };
        Link.prototype.getIsParent = function () {
            return this.isparent;
        };
        Link.prototype.setIsParent = function (isparent) {
            this.isparent = isparent;
        };
        Link.prototype.setLinkPositions = function (positions) {
            this.linkpositions = positions;
        };
        // end setters gettersssss.......
        Link.prototype.linkToFormData = function () {
            var data = new FormData();
            data.append("LinkId", this.linkid);
            data.append("LinkDescription", this.linkdescription);
            data.append("LinkName", this.linkname);
            data.append('AuttLink', this.autt);
            data.append('ParentLinkId', this.parentlinkid);
            data.append('SitePageId', this.sitepageid);
            data.append('LinkPositions', this.linkpositions);
            return data;
        };
        Link.prototype.parentLinkIdToFormData = function () {
            var data = new FormData();
            data.append('ParentLinkId', this.parentlinkid);
            return data;
        };
        return Link;
    }());
    exports.Link = Link;
});
