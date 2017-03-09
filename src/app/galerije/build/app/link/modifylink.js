var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './link', './newlink'], function (require, exports, links, linkform) {
    "use strict";
    var ModifyLink = (function (_super) {
        __extends(ModifyLink, _super);
        function ModifyLink(linkid) {
            var _this = this;
            if (linkid === void 0) { linkid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Link");
            this.linkid = linkid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyLink" type="submit">Izmeni</button>' +
                '<button id="deleteLink" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteLink").click(function (e) {
                e.preventDefault();
                _this.deleteLink();
            });
            this.formbuttons.find("#modifyLink").click(function (e) {
                e.preventDefault();
                _this.modifyLink();
            });
        }
        //Metoda za brisanje Web Stranice
        ModifyLink.prototype.deleteLink = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Link Web Stranice?', function () {
                var data = new FormData();
                data.append("LinkId", _this.link.getLinkId());
                var deletelinkpromise = _this.dbmodule.deleteLinkAjax(data);
                deletelinkpromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Link Web Stranice.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Web Strane.');
            });
        };
        //Metoda za proveru i submit nakon izmene
        ModifyLink.prototype.modifyLink = function () {
            var tmp = [];
            var tmpLink;
            tmpLink = new links.Link(this.linkname.val(), this.linkdescription.val(), this.autt.val(), 0, 0, this.link.getLinkId(), parseInt(this.page.val()));
            if (this.ischild.is(':checked')) {
                var l = 1;
                tmpLink.setParentLinkId(this.parentlinks[parseInt(this.parentlink.val())].linkid);
                this.linkposition.children().each(function () {
                    var pozicija = { "linkid": this.id, "linkposition": l };
                    tmp.push(pozicija);
                    l++;
                });
                tmpLink.setLinkPositions(JSON.stringify(tmp));
            }
            //Proveravamo da li je nacinjena promena
            if (JSON.stringify(this.link) !== JSON.stringify(tmpLink)) {
                if (this.link.getParentLinkId() !== tmpLink.getParentLinkId()) {
                    var parentlinkid = new FormData;
                    parentlinkid.append("ParentLinkId", this.link.getParentLinkId());
                    this.link = tmpLink;
                    console.log(tmpLink.getParentLinkId());
                    var modifyPagepromise = this.dbmodule.modifyLinkAjax(this.link.linkToFormData());
                    var isStillParentPromise = this.dbmodule.notParentLinkAjax(parentlinkid);
                    var combinepromise = $.when(modifyPagepromise.zahtev, isStillParentPromise.zahtev);
                }
                else {
                    this.link = tmpLink;
                    var modifyPagepromise = this.dbmodule.modifyLinkAjax(this.link.linkToFormData());
                    var combinepromise = $.when(modifyPagepromise.zahtev);
                }
                combinepromise.done(function () {
                    alertify.success("Uspešno ste izmenili izmenili Web Stranu.");
                });
            }
            else {
                alertify.error("Nije izvršena nikakva promena.");
            }
            //  }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModifyLink.prototype.populateFormFileds = function (linkObj) {
            var _this = this;
            this.linkname.val(linkObj.getLinkName());
            this.linkdescription.val(linkObj.getLinkDescription());
            this.page.val(linkObj.getSitePageId());
            this.autt.val(linkObj.getAutt());
            if (linkObj.getParentLinkId() != 0) {
                this.ischild.prop("checked", true);
                for (var link in this.parentlinks) {
                    if (this.parentlinks[link].linkid === linkObj.getParentLinkId()) {
                        this.childrenlinks = this.dbmodule.getChildrenLinkAjax(linkObj.parentLinkIdToFormData());
                        this.parentlink.val(link);
                        $("#opParentLinks").text(this.parentlinks[link].linkdescription);
                        this.childrenlinks.zahtev.done(function () {
                            _this.fillChildrenLinkPositionDD($.parseJSON(_this.childrenlinks.zahtev.responseText));
                        });
                    }
                }
            }
            else {
                this.ischild.prop("checked", false).trigger("change");
            }
        };
        //
        //Metoda za dohvatanje objekta iz baze i popunjavanje polja forme
        ModifyLink.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("LinkId", this.linkid.toString());
            var pagelementpromise = this.dbmodule.singleSiteLinkAjax(data);
            var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
            var parentlinkspromise = this.dbmodule.getParentLinksAjax();
            var combinepromise = $.when(pagesdropdownpromise.zahtev, parentlinkspromise.zahtev, pagelementpromise.zahtev);
            combinepromise.done(function () {
                var tmpLink = $.parseJSON(pagelementpromise.zahtev.responseText);
                _this.link = new links.Link(tmpLink[0].linkname, tmpLink[0].linkdescription, tmpLink[0].autt, tmpLink[0].parentlinkid, tmpLink[0].linkposition, tmpLink[0].linkid, tmpLink[0].sitepageid);
                _this.parentlinks = $.parseJSON(parentlinkspromise.zahtev.responseText);
                _this.fillParentLinkRange();
                _this.fillSitePageDD($.parseJSON(pagesdropdownpromise.zahtev.responseText));
                _this.populateFormFileds(_this.link);
            });
            pagelementpromise.zahtev.fail(function () {
                console.log("Greska");
            });
        };
        //
        ModifyLink.prototype.formSubmit = function () {
            event.preventDefault;
        };
        return ModifyLink;
    }(linkform.NewLink));
    exports.ModifyLink = ModifyLink;
});
