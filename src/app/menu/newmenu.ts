import menudb = require("./menudb");
import formval = require('../formval');
import menu = require('./menu');
import link = require("../link/link");
import adminoption = require('../htmlcomponents/adminoption');
export class NewMenu {
    protected dbmodule: menudb.MenuDB;
    protected menu: menu.Menu;
    protected elementtitle: JQuery;
    private newmenuobj: JQuery;
    protected newmenuform: JQuery;
    protected menuname: JQuery;
    protected menuposition: JQuery;
    protected links: JQuery;
    protected parentlinkss: JQuery;
    protected parentlinks: menu.Menu;
    protected formbuttons: JQuery;
    private menupositiondd: any;
    protected menusample: JQuery;
    private formval: formval.FormVal;
    constructor() {
        this.dbmodule = new menudb.MenuDB();
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("basicfile", { regfile: true });
        jQuery.validator.addClassRules("basicselect", { regselect: true });
        this.newmenuobj = $(
            '<div class="newOption" id="newOptionWebPage">' +
            '<h4 title="New menu FORM">Napravite novi meni</h4>' +
            '<section class="form">' +
            '<form id="newPageMenu" name="newPageMenu" action="" method="post">' +
            '<div class="inputgroup">' +
            '<label for="MenuName">Naziv Menija:</label>' +
            '<input id="MenuName" name="MenuName" class="basictext" type="text"/>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="MenuPosition">Pozicija menija:</label>' +
            '<select id="MenuPosition" name="MenuPosition" class="basicselect">' +
            '<option value="-1">Izaberite</option>' +
            '<option value="1">Header</option>' +
            '<option value="2">Footer</option>' +
            '<option value="3">RightSide</option>' +
            '<option value="4">LeftSide</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="MenuParnetLinks">Odaberite linkove:</label>' +
            '<ul id="MenuParnetLinks" class="inlinelist"></ul>' +
            '</div>' +
            '<div ><ul id="menuPreview"></ul>' +
            '</div>' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="newMenu" type="submit">Dodaj</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '</div>');
        this.elementtitle = $(this.newmenuobj).find("h4");
        this.newmenuform = $(this.newmenuobj).find('form');
        this.menusample = this.newmenuform.find("#menuPreview");
        this.menuname = this.newmenuform.find("#MenuName");
        this.menuposition = this.newmenuform.find("#MenuPosition");
        this.parentlinkss = this.newmenuform.find("#MenuParnetLinks");
        this.menusample = this.newmenuform.find("#menuPreview");
        this.formbuttons = $(this.newmenuform).find("#formButtons");
        this.formbuttons.find("#newMenu").click((e) => {
            e.preventDefault();
            this.formSubmit();
        });
    }
    formSubmit() {
        if (this.newmenuform.valid()) {
            var linkcount = [];
            var links = this.menusample.children();
            var row = 0;
            links.each(function () {
                console.log(row);
                buildMenu(this);
                row++;
            });
            row = 0;
            var data = new FormData;
            data.append("MenuName", this.menuname.val());
            data.append("MenuPosition", this.menuposition.val());
            data.append("Linkovi", JSON.stringify(linkcount));
            var newmenupromise = this.dbmodule.newSiteMenuAjax(data);
            newmenupromise.zahtev.done(function () {
                alertify.success("Uspesno ste napravili novi meni.");
            });
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
    }

    fillParentLinkList() {
        if (this.parentlinks) {
            var links = this.parentlinks.getMenuLinks();
            for (var l in links) {
                this.parentlinkss.append("<li id=" + l + ">" + links[l].getLinkDescription() + "</li>");
            }
            this.parentlinkss.find("li").click((e) => {
                e.preventDefault();
                if ($(e.target).hasClass("selectedoption")) {
                    $(e.target).removeClass("selectedoption");
                    for (var l in this.parentlinks.getMenuLinks()) {
                        if (this.parentlinks.getMenuLinks()[l].getParentLinkId() == this.parentlinks.getMenuLinks()[e.target.id].getLinkId()) {
                            this.parentlinkss.find("#" + l).removeClass("selectedoption");
                        }
                    }
                    this.menusample.find("#" + this.parentlinks.getMenuLinks()[e.target.id].getLinkId()).remove();
                }
                else {
                    $(e.target).addClass("selectedoption");
                    this.createMenuSample(this.parentlinks.getMenuLinks()[e.target.id]);
                }

            });
        }
    }
    createMenuSample(parent: link.Link) {
        console.log(parent);
        if (this.menusample.find("#" + parent.getLinkId()).length !== 1) {
            this.menusample.append("<li id=" + parent.getLinkId() + " class='firstLink'>" + parent.getLinkDescription() + "</li>");
            if (parent.getIsParent() === 1) {
                this.hasChildren(parent);
            }
            else { console.log("Nije"); }
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
    subLinkRemove(link) {
        $(link).remove();
    }

    fillForm() {
        var parentlinkspromise = this.dbmodule.getParentLinksAjax();

        parentlinkspromise.zahtev.done(() => {
            var links = $.parseJSON(parentlinkspromise.zahtev.responseText);
            this.parentlinks = new menu.Menu("ParentLinksMenu", 0, 0, links);
            this.fillParentLinkList();
        })
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newmenuobj));
    }
    removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Meniji Admin", "Menu");
        $(tmpAdminOption.option).trigger("click");
    }
}