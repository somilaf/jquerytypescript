import pagedb = require("./pagedb");
import formval = require('../formval');
import page = require('./page');
export class NewPage {
    protected dbmodule: pagedb.PagesDB;
    protected elementtitle: JQuery;
    protected page: page.Page;
    protected pagename: JQuery;
    protected pagetype: JQuery;
    protected pagetitle: JQuery;
    protected pagedescription: JQuery;
    protected keywords: JQuery;
    protected formbuttons: JQuery;
    protected newpageform: JQuery;
    private newpageobj: any;
    private formval: formval.FormVal;
    constructor(Page = null) {
        this.formval = new formval.FormVal();
        this.dbmodule = new pagedb.PagesDB;
        jQuery.validator.addClassRules("newpagename", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("newpageselect", { regselect: true });
        this.newpageobj = $(
            '<div class="newOption" id="newOptionWebPage">' +
            '<h4 title="New WebPage FORM">Napravite novu WebStranu</h4>' +
            '<section class="form">' +
            '<form id="WebPage" name="WebPage" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
            '<label for="PageName">Naziv Stranice:</label>' +
            '<input id="PageName" name="PageName" class="newpagename" type="text" />' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="newPageType">Tip stranice:</label>' +
            '<select id="newPageType" name="newPageType" class="newpageselect">' +
            '<option value="-1">Izaberite</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="newWebPageTitle">WebPageTitle:</label>' +
            '<input id="newWebPageTitle" name="newWebPageTitle" class="newpagename" type="text" />' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="newWebPageDescription">WebPageDescription:</label>' +
            '<input id="newWebPageDescription" name="newWebPageDescription" class="newpagename" type="text" />' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="newWebPageKeyWords">WebPage KeyWords:</label>' +
            '<input id="newWebPageKeyWords" name="newWebPageKeyWords" class="newpagename" type="text" />' +
            '</div>' +
            '<div id="formButtons" class="inputgroup">' +
            '<button id="newPage" type="submit">Dodaj</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '</div>'
        );
        this.newpageform = $(this.newpageobj).find('form');
        this.elementtitle = $(this.newpageobj).find("h4");
        this.pagename = $(this.newpageform).find('#PageName');
        this.pagetype = $(this.newpageform).find('#newPageType');
        this.pagedescription = $(this.newpageobj).find('#newWebPageDescription');
        this.pagetitle = $(this.newpageform).find("#newWebPageTitle");
        this.keywords = $(this.newpageform).find("#newWebPageKeyWords");
        this.formbuttons = $(this.newpageform).find("#formButtons");
        this.formbuttons.find("#newPage").click((e) => {
            e.preventDefault();
            this.formSubmit();
        });
    }

    formSubmit() {
        if (this.newpageform.valid()) {
         var tmpPage=new page.Page(this.pagename.val(),
            parseInt(this.pagetype.val()),
            this.pagetitle.val(),
            this.keywords.val(),
            this.pagedescription.val()
             );
        var newpgepromise=this.dbmodule.newPageAjax(tmpPage.pageToFormData());
        newpgepromise.zahtev.done(()=>{
            alertify.success("Uspešno ste kreirali novu stranicu.");
         });
        }
    }

    sitePageTypesDD(sitepagetypes) {
        var p = 0;
        $(sitepagetypes).each(() => {
            $("#newPageType").append("<option value='" + sitepagetypes[p].sitepagetypeid + "'>" + sitepagetypes[p].sitepagetypename + "</option>");
            p++;
        });

    }

    fillForm() {
        var sitepagetypepromise = this.dbmodule.sitePageTypesAjax();
        sitepagetypepromise.zahtev.done(() => {
            this.sitePageTypesDD($.parseJSON(sitepagetypepromise.zahtev.responseText));
        });
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append(this.newpageobj);
    }


}