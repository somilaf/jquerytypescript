var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './menu', './newmenu'], function (require, exports, menu, menuform) {
    "use strict";
    var ModifyMenu = (function (_super) {
        __extends(ModifyMenu, _super);
        function ModifyMenu(menuid) {
            var _this = this;
            if (menuid === void 0) { menuid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Meni");
            this.menuid = menuid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyMenu" type="submit">Izmeni</button>' +
                '<button id="deleteMenu" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteMenu").click(function (e) {
                e.preventDefault();
                _this.deleteMenu();
            });
            this.formbuttons.find("#modifyMenu").click(function (e) {
                e.preventDefault();
                _this.modifyMenu();
            });
        }
        ModifyMenu.prototype.deleteMenu = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Meni?', function () {
                var data = new FormData();
                console.log(_this.menu);
                data.append("MenuId", _this.menu.getMenuId());
                var deletelinkpromise = _this.dbmodule.deleteSiteMenuAjax(data);
                deletelinkpromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Meni.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Menija.');
            });
        };
        ModifyMenu.prototype.modifyMenu = function () {
            var isok = true;
            var linkcount = [];
            var links = this.menusample.children();
            var row = 0;
            links.each(function () {
                buildMenu(this);
                row++;
            });
            //?Sto li sam ovo ostavi.... Proveriti
            row = 0;
            if (this.compareMenu(linkcount)) {
                alertify.error("Nije izvršena nikakva promena.");
            }
            else {
                var data = new FormData;
                data.append("MenuId", this.menu.getMenuId());
                data.append("MenuPosition", this.menuposition.val());
                data.append("MenuName", this.menuname.val());
                data.append("Linkovi", JSON.stringify(linkcount));
                var newmenupromise = this.dbmodule.modifySiteMenuAjax(data);
                newmenupromise.zahtev.done(function () {
                    alertify.success("Uspešno ste promenili meni.");
                });
            }
            function buildMenu(link) {
                if (link && link.childElementCount > 0) {
                    if (link.tagName == "LI") {
                        linkcount.push({ "linkid": link.id, "row": row });
                    }
                    ;
                    var links = $(link).children();
                    links.each(function () {
                        buildMenu(this);
                    });
                }
                else {
                    console.log("dete");
                    linkcount.push({ "linkid": link.id, "row": row });
                }
            }
        };
        ModifyMenu.prototype.compareMenu = function (linkcount) {
            if (this.menu.getMenuName() !== this.menuname.val()) {
                return false;
            }
            if (this.menu.getMenuPosition() !== parseInt(this.menuposition.val())) {
                return false;
            }
            if (this.menulinks.length !== linkcount.length) {
                return false;
            }
            else {
                for (var l in this.menulinks) {
                    if (this.menulinks[l].linkid !== linkcount[l].linkid) {
                        return false;
                    }
                }
            }
            return true;
        };
        ModifyMenu.prototype.populateFormFileds = function (menulinks) {
            var _this = this;
            this.menuname.val(this.menu.getMenuName());
            this.menuposition.val(this.menu.getMenuPosition());
            var parentlinks = this.parentlinks.getMenuLinks();
            if (menulinks) {
                for (var l in parentlinks) {
                    var pl = 0;
                    $(menulinks).each(function () {
                        if (parentlinks[l].getLinkId() == parseInt(menulinks[pl].linkid)) {
                            console.log(_this.parentlinkss.find("#" + l).addClass("selectedoption"));
                        }
                        pl++;
                    });
                }
            }
        };
        ModifyMenu.prototype.buildMenu = function (links) {
            var meni = "";
            var row = -1;
            for (var link in links) {
                if (parseInt(links[link].row) !== row) {
                    row = parseInt(links[link].row);
                    meni += '<li id="' + links[link].linkid + '" class="firstLink"">' + links[link].linkdescription;
                    meni += hasKids(links[link], links);
                }
            }
            this.menusample.append(meni);
            function hasKids(parent, array) {
                meni = "";
                if (parseInt(parent.isparent) === 1) {
                    meni += '<ul>';
                    for (var link in array) {
                        if (array[link].parentlinkid === parent.linkid) {
                            if (parseInt(array[link].isparent) === 1) {
                                meni += '<li id="' + links[link].linkid + '" class="sublink parentLink">' + array[link].linkdescription;
                                meni += hasKids(array[link], array);
                            }
                            else {
                                meni += '<li id="' + links[link].linkid + '" class="sublink">' + array[link].linkdescription + '</li>';
                            }
                        }
                    }
                    meni += "</ul>";
                }
                meni += "</li>";
                return meni;
            }
        };
        ModifyMenu.prototype.hasChildren = function (parent) {
            var _this = this;
            var data = new FormData;
            data.append("ParentLinkId", parent.getLinkId());
            var links = this.dbmodule.getChildrenLinks(data);
            links.zahtev.done(function () {
                parent.setChildrenLinks($.parseJSON(links.zahtev.responseText));
                var link = parent.getChildrenLinks();
                var menusegment = $("<ul></ul>");
                for (var l in link) {
                    //Proveravamo da li je link roditeljski i ako nije ispisujemo ga 
                    if (link[l].getIsParent() == 0) {
                        var subLink = $('<li id=' + link[l].getLinkId() + ' class="sublink">' + link[l].getLinkDescription() + '</li>');
                        subLink.click(function (e) {
                            _this.subLinkRemove(e.target);
                        });
                        menusegment.append(subLink);
                    }
                    else {
                        var subLink = $('<li id=' + link[l].getLinkId() + ' class="sublink parentLink">' + link[l].getLinkDescription() + '</li>');
                        subLink.click(function (e) {
                            _this.subLinkRemove(e.target);
                        });
                        menusegment.append(subLink);
                        _this.hasChildren(link[l]);
                    }
                }
                _this.menusample.find("#" + link[l].getParentLinkId()).append(menusegment);
            });
        };
        ModifyMenu.prototype.parentChild = function (parent, links, row) {
            if (parent.isparent == 1) {
                this.menusample.append("<ul id=" + parent.linkid + ">" + parent.linkdescription + "</ul>");
                for (var l in links) {
                    if (links[l].parentlinkid == parent.linkid) {
                        this.menusample.find("#" + parent.linkid).append("<li id=" + links[l].linkid + ">" + links[l].linkdescription + "</li>");
                    }
                }
            }
            else {
                this.menusample.append("<li id=" + links[l].linkid + ">" + links[l].linkdescription + "</li>");
            }
        };
        ModifyMenu.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("MenuId", this.menuid.toString());
            var menuelementpromise = this.dbmodule.singleSiteMenuAjax(data);
            var parentlinkspromise = this.dbmodule.getParentLinksAjax();
            var menulinkspromise = this.dbmodule.getMenuLinks(data);
            var combinepromise = $.when(menuelementpromise.zahtev, parentlinkspromise.zahtev, menulinkspromise.zahtev);
            combinepromise.done(function () {
                var links = $.parseJSON(parentlinkspromise.zahtev.responseText);
                _this.menulinks = $.parseJSON(menulinkspromise.zahtev.responseText);
                _this.parentlinks = new menu.Menu("ParentLinksMenu", 0, 0, links);
                _this.fillParentLinkList();
                var pagesmenuespromise = _this.dbmodule.getMenuPagesAjax(data);
                var tmpMenu = $.parseJSON(menuelementpromise.zahtev.responseText);
                _this.menu = new menu.Menu(tmpMenu.menuname, null, parseInt(tmpMenu.menuposition), null, parseInt(tmpMenu.menuid));
                console.log(_this.menu);
                _this.populateFormFileds(_this.menulinks);
                _this.buildMenu(_this.menulinks);
            });
        };
        return ModifyMenu;
    }(menuform.NewMenu));
    exports.ModifyMenu = ModifyMenu;
});
