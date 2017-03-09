import formval = require('../formval');
import menu = require('./menu');
import menuform = require('./newmenu');
export class ModifyMenu extends menuform.NewMenu {

    private menuid: number;
    private menulinks: any;
    constructor(menuid = 0) {
        super();
        this.elementtitle.empty().append("Izmenite Meni");
        this.menuid = menuid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyMenu" type="submit">Izmeni</button>' +
            '<button id="deleteMenu" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteMenu").click((e) => {
            e.preventDefault();
            this.deleteMenu();
        });
        this.formbuttons.find("#modifyMenu").click((e) => {
            e.preventDefault();
            this.modifyMenu();
        });
    }
    deleteMenu() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Meni?', () => {
            var data = new FormData();
            console.log(this.menu);
            data.append("MenuId", this.menu.getMenuId());
            var deletelinkpromise = this.dbmodule.deleteSiteMenuAjax(data);
            deletelinkpromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Meni.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Menija.');
        });
    }
    modifyMenu() {
        var isok: boolean = true;
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
                if (link.tagName == "LI") { linkcount.push({ "linkid": link.id, "row": row }) };
                var links = $(link).children();
                links.each(function () {
                    buildMenu(this);
                });

            } else {
                console.log("dete");
                linkcount.push({ "linkid": link.id, "row": row });
            }
        }

    }
    compareMenu(linkcount) {
        if (this.menu.getMenuName() !== this.menuname.val()) { return false; }
        if (this.menu.getMenuPosition() !== parseInt(this.menuposition.val())) { return false; }
        if (this.menulinks.length !== linkcount.length) { return false; }
        else {
            for (var l in this.menulinks) {
                if (this.menulinks[l].linkid !== linkcount[l].linkid) { return false; }
            }
        }
        return true;
    }

    populateFormFileds(menulinks) {
        this.menuname.val(this.menu.getMenuName());
        this.menuposition.val(this.menu.getMenuPosition());
        var parentlinks = this.parentlinks.getMenuLinks();
        if (menulinks) {
            for (var l in parentlinks) {
                var pl = 0;
                $(menulinks).each(() => {
                    if (parentlinks[l].getLinkId() == parseInt(menulinks[pl].linkid)) {
                        console.log(this.parentlinkss.find("#" + l).addClass("selectedoption"));
                    }
                    pl++;
                });
            }
        }
    }
    buildMenu(links) {
        var meni = "";
        var row = -1;
        for (var link in links) {
            if (parseInt(links[link].row) !== row) {
                row=parseInt(links[link].row);
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
    }

    hasChildren(parent) {
        var data = new FormData;
        data.append("ParentLinkId", parent.getLinkId());
        var links = this.dbmodule.getChildrenLinks(data);
        links.zahtev.done(() => {
            parent.setChildrenLinks($.parseJSON(links.zahtev.responseText));
            var link = parent.getChildrenLinks();
            var menusegment = $("<ul></ul>");
            for (var l in link) {
                //Proveravamo da li je link roditeljski i ako nije ispisujemo ga 
                if (link[l].getIsParent() == 0) {
                    var subLink = $('<li id=' + link[l].getLinkId() + ' class="sublink">' + link[l].getLinkDescription() + '</li>');
                    subLink.click((e) => {
                        this.subLinkRemove(e.target);
                    });
                    menusegment.append(subLink);
                }
                //Ako je link roditeljski pozivamo ponovo metod i ispisujemo linkove
                else {
                    var subLink = $('<li id=' + link[l].getLinkId() + ' class="sublink parentLink">' + link[l].getLinkDescription() + '</li>');
                    subLink.click((e) => {
                        this.subLinkRemove(e.target);
                    });
                    menusegment.append(subLink);
                    this.hasChildren(link[l]);
                }
            }
            this.menusample.find("#" + link[l].getParentLinkId()).append(menusegment);
        });

    }
    parentChild(parent, links, row) {
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
    }
    fillForm() {
        var data = new FormData();
        data.append("MenuId", this.menuid.toString());
        var menuelementpromise = this.dbmodule.singleSiteMenuAjax(data);
        var parentlinkspromise = this.dbmodule.getParentLinksAjax();
        var menulinkspromise = this.dbmodule.getMenuLinks(data);
        var combinepromise = $.when(
            menuelementpromise.zahtev,
            parentlinkspromise.zahtev,
            menulinkspromise.zahtev);
        combinepromise.done(() => {
            var links = $.parseJSON(parentlinkspromise.zahtev.responseText);
            this.menulinks = $.parseJSON(menulinkspromise.zahtev.responseText);
            this.parentlinks = new menu.Menu("ParentLinksMenu", 0, 0, links);
            this.fillParentLinkList();
            var pagesmenuespromise = this.dbmodule.getMenuPagesAjax(data);
            var tmpMenu = $.parseJSON(menuelementpromise.zahtev.responseText);
            this.menu = new menu.Menu(
                tmpMenu.menuname,
                null,
                parseInt(tmpMenu.menuposition),
                null,
                parseInt(tmpMenu.menuid)
            );
            console.log(this.menu);
            this.populateFormFileds(this.menulinks);
            this.buildMenu(this.menulinks);
        });
    }



}