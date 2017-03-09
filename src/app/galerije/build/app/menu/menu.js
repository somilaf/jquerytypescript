define(["require", "exports", "../link/link"], function (require, exports, link) {
    "use strict";
    var Menu = (function () {
        function Menu(menuname, sitepageid, menuposition, links, menuid) {
            if (menuid === void 0) { menuid = 0; }
            this.menuname = menuname;
            this.sitepageid = sitepageid;
            this.menuposition = menuposition;
            this.links = [];
            if (links != null) {
                console.log("Tu sam.");
                for (var l in links) {
                    this.links.push(new link.Link(links[l].linkname, links[l].linkdescription, links[l].autt, parseInt(links[l].parentlinkid), links[l].linkposition, links[l].linkid, links[l].sitepageid, parseInt(links[l].isparent)));
                }
            }
            this.menuid = menuid;
        }
        //Getters Setterssss
        Menu.prototype.setMenuId = function (menuid) {
            this.menuid = menuid;
        };
        Menu.prototype.getMenuId = function () {
            return this.menuid;
        };
        Menu.prototype.setMenuName = function (menuname) {
            this.menuname = menuname;
        };
        Menu.prototype.getMenuName = function () {
            return this.menuname;
        };
        Menu.prototype.setSitePageId = function (sitepageid) {
            this.sitepageid = sitepageid;
        };
        Menu.prototype.getSitePageId = function () {
            return this.sitepageid;
        };
        Menu.prototype.setMenuPosition = function (menuposition) {
            this.menuposition = menuposition;
        };
        Menu.prototype.getMenuPosition = function () {
            return this.menuposition;
        };
        Menu.prototype.setMenuLinks = function (links) {
            if (links != null && links.lenght > 0) {
                for (var l in links) {
                    this.links.push(new link.Link(links[l].linkname, links[l].linkdescription, links[l].autt, links[l].parentlinkid, links[l].linkposition, links[l].linkid, links[l].sitepageid, links[l].isparent));
                }
            }
        };
        Menu.prototype.getMenuLinks = function () {
            return this.links;
        };
        return Menu;
    }());
    exports.Menu = Menu;
});
