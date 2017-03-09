//Putanje do neophodnih fajlova
import page = require('./page');
import pagedb = require("./pagedb");
import pageform = require('./newpage');
import formval = require('../formval');
// kraj 


//Klasa za azuriranje postojecih Web Strana
export class ModiffyPage extends pageform.NewPage {

    private pageid: number;
    constructor(pageid = 0) {
        super();
        this.elementtitle.empty().append("Izmenite WebStranu");
        this.pageid = pageid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyPage" type="submit">Izmeni</button>'
        );
       this.newpageform.find("#modifyPage").click((e) => {
            e.preventDefault();
            this.modifyWebPage();
        });
    }
    //Metoda za brisanje Web Stranice
    deleteWebPage() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Web Stranu?', () => {
            var data = new FormData();
            data.append("SitePageId", this.page.getPageId());
            data.append("SitePageSeoId", this.page.getPageSeoDataId());
            this.page.getPageLinkId() !== null ? data.append("PageLinkId", this.page.getPageLinkId()) : false;
            var deletepage = this.dbmodule.deletePageAjax(data);
            deletepage.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Web Stranu.')
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Web Strane.');
        });
    }

    //Metoda za proveru i submit nakon izmene
    modifyWebPage() {
        event.preventDefault;
        //Metoda valid proverava da li su svi unosi u formi korektni
        if (this.newpageform.valid()) {
            var tmpPage=new page.Page(
                this.pagename.val(),
                parseInt(this.pagetype.val()),
                this.pagetitle.val(),
                this.keywords.val(),
                this.pagedescription.val(),
                this.page.getPageLinkId(),
                this.pageid,
                this.page.getPageSeoDataId()
            );
            //Proveravamo da li je nacinjena promena
            if (JSON.stringify(this.page) !== JSON.stringify(tmpPage)) {
                this.page = tmpPage;
                var data = this.page.pageToFormData();
                console.log(data);
                var modifyPage = this.dbmodule.modifyPageAjax(this.page.pageToFormData());
                modifyPage.zahtev.done(() => {
                alertify.success("Uspešno ste izmenili izmenili Web Stranu.");
                });
            }
            else {
              alertify.error("Nije izvršena nikakva promena.")
            }
        }
    }

    //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
    populateFormFileds(pageObj: page.Page) {
        console.log(pageObj.getPageName());
        this.pagename.val(pageObj.getPageName());
        this.pagetype.val(pageObj.getSitePageTypeId());
        this.pagetitle.val(pageObj.getPageTitle());
        this.pagedescription.val(pageObj.getPageMetaDesciption());
        this.keywords.val(pageObj.getPageMetaKeyWords());
    }

    fillForm() {
        var data = new FormData();
        data.append("WebPageId", this.pageid);
        var pagelementpromise = this.dbmodule.singleSitePageAjax(data);
        var sitepagetypepromise = this.dbmodule.sitePageTypesAjax();
        var combinepromise = $.when(pagelementpromise.zahtev, sitepagetypepromise.zahtev);
        combinepromise.done(() => {
            this.sitePageTypesDD($.parseJSON(sitepagetypepromise.zahtev.responseText));
            var tmpPage = $.parseJSON(pagelementpromise.zahtev.responseText);
            this.page = new page.Page(
                tmpPage[0]['sitepagename'],
                parseInt(tmpPage[0]['sitepagetypeid']),
                tmpPage[0]['pagetitle'],
                tmpPage[0]['metakeywords'],
                tmpPage[0]['metadescription'],
                parseInt(tmpPage[0]['linkid']),
                this.pageid,
                parseInt(tmpPage[0]['pageseodataid']));
            this.populateFormFileds(this.page);
        });
    }

    formSubmit() {
        event.preventDefault();
    }

}