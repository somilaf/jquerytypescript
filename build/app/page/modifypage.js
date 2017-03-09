var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './page', './newpage'], function (require, exports, page, pageform) {
    "use strict";
    // kraj 
    //Klasa za azuriranje postojecih Web Strana
    var ModiffyPage = (function (_super) {
        __extends(ModiffyPage, _super);
        function ModiffyPage(pageid) {
            var _this = this;
            if (pageid === void 0) { pageid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite WebStranu");
            this.pageid = pageid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyPage" type="submit">Izmeni</button>');
            this.newpageform.find("#modifyPage").click(function (e) {
                e.preventDefault();
                _this.modifyWebPage();
            });
        }
        //Metoda za brisanje Web Stranice
        ModiffyPage.prototype.deleteWebPage = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Web Stranu?', function () {
                var data = new FormData();
                data.append("SitePageId", _this.page.getPageId());
                data.append("SitePageSeoId", _this.page.getPageSeoDataId());
                _this.page.getPageLinkId() !== null ? data.append("PageLinkId", _this.page.getPageLinkId()) : false;
                var deletepage = _this.dbmodule.deletePageAjax(data);
                deletepage.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Web Stranu.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Web Strane.');
            });
        };
        //Metoda za proveru i submit nakon izmene
        ModiffyPage.prototype.modifyWebPage = function () {
            event.preventDefault;
            //Metoda valid proverava da li su svi unosi u formi korektni
            if (this.newpageform.valid()) {
                var tmpPage = new page.Page(this.pagename.val(), parseInt(this.pagetype.val()), this.pagetitle.val(), this.keywords.val(), this.pagedescription.val(), this.page.getPageLinkId(), this.pageid, this.page.getPageSeoDataId());
                //Proveravamo da li je nacinjena promena
                if (JSON.stringify(this.page) !== JSON.stringify(tmpPage)) {
                    this.page = tmpPage;
                    var data = this.page.pageToFormData();
                    console.log(data);
                    var modifyPage = this.dbmodule.modifyPageAjax(this.page.pageToFormData());
                    modifyPage.zahtev.done(function () {
                        alertify.success("Uspešno ste izmenili izmenili Web Stranu.");
                    });
                }
                else {
                    alertify.error("Nije izvršena nikakva promena.");
                }
            }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModiffyPage.prototype.populateFormFileds = function (pageObj) {
            console.log(pageObj.getPageName());
            this.pagename.val(pageObj.getPageName());
            this.pagetype.val(pageObj.getSitePageTypeId());
            this.pagetitle.val(pageObj.getPageTitle());
            this.pagedescription.val(pageObj.getPageMetaDesciption());
            this.keywords.val(pageObj.getPageMetaKeyWords());
        };
        ModiffyPage.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("WebPageId", this.pageid);
            var pagelementpromise = this.dbmodule.singleSitePageAjax(data);
            var sitepagetypepromise = this.dbmodule.sitePageTypesAjax();
            var combinepromise = $.when(pagelementpromise.zahtev, sitepagetypepromise.zahtev);
            combinepromise.done(function () {
                _this.sitePageTypesDD($.parseJSON(sitepagetypepromise.zahtev.responseText));
                var tmpPage = $.parseJSON(pagelementpromise.zahtev.responseText);
                _this.page = new page.Page(tmpPage[0]['sitepagename'], parseInt(tmpPage[0]['sitepagetypeid']), tmpPage[0]['pagetitle'], tmpPage[0]['metakeywords'], tmpPage[0]['metadescription'], parseInt(tmpPage[0]['linkid']), _this.pageid, parseInt(tmpPage[0]['pageseodataid']));
                _this.populateFormFileds(_this.page);
            });
        };
        ModiffyPage.prototype.formSubmit = function () {
            event.preventDefault();
        };
        return ModiffyPage;
    }(pageform.NewPage));
    exports.ModiffyPage = ModiffyPage;
});
