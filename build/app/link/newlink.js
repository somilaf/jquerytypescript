define(["require", "exports", "./linkdb", '../formval', './link', '../htmlcomponents/adminoption'], function (require, exports, linkdb, formval, link, adminoption) {
    "use strict";
    var NewLink = (function () {
        function NewLink() {
            var _this = this;
            this.dbmodule = new linkdb.LinkDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("basicfile", { regfile: true });
            jQuery.validator.addClassRules("basicselect", { regselect: true });
            this.newlinkobj = $('<div class="newOption" id="newOptionPageLink">' +
                '<h4 title="New link FORM">Napravite novi Link za Web Stranu</h4>' +
                '<section class="form">' +
                '<form id="newPageLink" name="newPageLink" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label for="LinkName">Naziv Linka:</label>' +
                '<input id="LinkName" name="LinkName" class="basictext" type="text"/>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="LinkDescription">Opis Linka:</label>' +
                '<input id="LinkDescription" name="LinkDescription" class="basictext" type="text" />' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="LinkPath">Za Stranicu:</label>' +
                '<select id="LinkPath" name="LinkPath" class="basicselect">' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="auttLink">Nivo Pristupa:</label>' +
                '<select id="auttLink" name="auttLink" class="basicselect">' +
                '<option value="-1">Izberite</option>' +
                '<option value="1">Korisnik</option>' +
                '<option value="2">Moderator</option>' +
                '<option value="3">Admin</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="parnetLink">Da li pripada roditeljskom linku:</label>' +
                '<input type="checkbox" id="parnetLink" name="parnetLink" checked/><span> Da</span>' +
                '</div>' +
                '<div id="parentDiv">' +
                '<div class="inputgroup centeredText">' +
                '<label for="opParentLinks">Izaberite roditeljski link:</label>' +
                '<input type="range" id="rnParentLinks" name="rnLinks" value="0" min="0" max="0" />' +
                '<output id="opParentLinks" name="opParentLinks" for="rnLinks">Ne postoji</output>' +
                '<input type="hidden" id="rnParentLinkId" name="rnParentLinkId">' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="modifyLinkPosition">Izaberite poziciju linka:</label>' +
                '<ul id="LinkPosition" name="LinkPosition"class="sortable inlinelist"></ul>' +
                '</div>' +
                '</div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="newLink" type="submit">Dodaj</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>');
            this.elementtitle = $(this.newlinkobj).find("h4");
            this.newlinkform = $(this.newlinkobj).find('form');
            this.linkname = $(this.newlinkform).find("#LinkName");
            this.linkdescription = $(this.newlinkform).find("#LinkDescription");
            this.page = $(this.newlinkform).find("#LinkPath");
            this.autt = $(this.newlinkform).find("#auttLink");
            this.ischild = $(this.newlinkform).find("#parnetLink");
            this.parentlink = $(this.newlinkform).find("#rnParentLinks");
            this.linkposition = $(this.newlinkform).find("#LinkPosition");
            this.formbuttons = $(this.newlinkform).find("#formButtons");
            this.ischild.change(function () {
                _this.ischild.is(':checked') ? $("#parentDiv").toggle("slow") : $("#parentDiv").toggle("slow");
            });
            this.formbuttons.find("#newLink").click(function () {
                _this.formSubmit();
            });
        }
        NewLink.prototype.fillSitePageDD = function (pages) {
            if (pages) {
                for (var p in pages) {
                    this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                }
            }
        };
        ;
        NewLink.prototype.fillParentLinkRange = function () {
            var _this = this;
            if (this.parentlinks !== '') {
                $("#rnParentLinks").attr("max", this.parentlinks.length - 1);
                $("#opParentLinks").text(this.parentlinks[0].linkdescription);
                $("#rnParentLinkId").val(this.parentlinks[0].linkid);
                this.parentLinkRangeChange();
                $("#rnParentLinks").change(function () {
                    var index = $("#rnParentLinks").val();
                    $("#opParentLinks").text(_this.parentlinks[index].linkdescription);
                    $("#rnParentLinkId").val(_this.parentlinks[index].linkid);
                    _this.parentLinkRangeChange();
                });
            }
        };
        ;
        NewLink.prototype.parentLinkRangeChange = function () {
            var _this = this;
            var data = new FormData;
            data.append("ParentLinkId", this.parentlinks[parseInt(this.parentlink.val())].linkid);
            var childrenlinkspromise = this.dbmodule.getChildrenLinkAjax(data);
            var tmpIsParent = this.parentlinks[parseInt(this.parentlink.val())].isparent;
            if (this.parentlinks[parseInt(this.parentlink.val())].isparent == "1") {
                childrenlinkspromise.zahtev.done(function () {
                    _this.fillChildrenLinkPositionDD($.parseJSON(childrenlinkspromise.zahtev.responseText));
                });
                childrenlinkspromise.zahtev.fail(function () {
                    alertify.error("Doslo je do greske.");
                });
            }
            else {
                this.fillChildrenLinkPositionDD();
            }
        };
        ;
        NewLink.prototype.fillChildrenLinkPositionDD = function (links) {
            if (links === void 0) { links = null; }
            this.linkposition.empty();
            var ischild = false;
            var tmpLinkDescription = this.linkname.val() === "" ? "Novi Link" : this.linkname.val();
            if (links) {
                for (var l in links) {
                    if (this.link && links[l].linkid == this.link.getLinkId()) {
                        this.linkposition.append("<li id='" + links[l].linkid + "' class='selected'><a href='#'>" + links[l].linkdescription + "</a></li>");
                        ischild = true;
                    }
                    else {
                        this.linkposition.append("<li id='" + links[l].linkid + "'><a href='#'>" + links[l].linkdescription + "</a></li>");
                    }
                }
                this.linkposition.sortable();
                if (!ischild) {
                    if (this.link && this.link.getLinkId() !== null)
                        this.linkposition.append("<li id='" + this.link.getLinkId() + "' class='selected'><a href='#'>" + this.link.getLinkDescription() + "</a></li>");
                    else {
                        this.linkposition.append("<li id='-1' class='selected'><a href='#'>" + tmpLinkDescription + "</a></li>");
                    }
                }
            }
            else {
                if (this.link && this.link.getLinkId() !== null)
                    this.linkposition.append("<li id='" + this.link.getLinkId() + "' class='selected'><a href='#'>" + this.link.getLinkDescription() + "</a></li>");
                else {
                    this.linkposition.append("<li id='-1' class='selected'><a href='#'>" + tmpLinkDescription + "</a></li>");
                }
            }
        };
        NewLink.prototype.formSubmit = function () {
            var _this = this;
            if (this.newlinkform.valid()) {
                var tmp = [];
                this.link = new link.Link(this.linkname.val(), this.linkdescription.val(), this.autt.val(), 0, null, null, this.page.val());
                if (this.ischild.is(':checked')) {
                    var l = 1;
                    this.link.setParentLinkId(this.parentlinks[parseInt(this.parentlink.val())].linkid);
                    this.linkposition.children().each(function () {
                        var pozicija = { "linkid": this.id, "linkposition": l };
                        tmp.push(pozicija);
                        l++;
                    });
                    this.link.setLinkPositions(tmp);
                }
                var newlinkpromise = this.dbmodule.newLinkAjax(this.link.linkToFormData());
                newlinkpromise.zahtev.done(function () {
                    alertify.success("Uspesno ste dodali novi link.");
                    _this.removeFormFromParent();
                });
            }
        };
        NewLink.prototype.fillForm = function () {
            var _this = this;
            var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
            var parentlinkspromise = this.dbmodule.getParentLinksAjax();
            var combinepromise = $.when(pagesdropdownpromise.zahtev, parentlinkspromise.zahtev);
            combinepromise.done(function () {
                _this.fillSitePageDD($.parseJSON(pagesdropdownpromise.zahtev.responseText));
                _this.parentlinks = $.parseJSON(parentlinkspromise.zahtev.responseText);
                _this.fillParentLinkRange();
            });
        };
        NewLink.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newlinkobj));
        };
        NewLink.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Link Admin", "Link");
            $(tmpAdminOption.option).trigger("click");
        };
        NewLink.prototype.createForm = function () {
            return $(this.newlinkobj);
        };
        return NewLink;
    }());
    exports.NewLink = NewLink;
});
