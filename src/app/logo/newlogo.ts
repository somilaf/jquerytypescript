import adminoption = require('../htmlcomponents/adminoption');
import logodb = require('./logodb');
import formval = require('../formval');
import logo = require('./logo');
export class NewLogo {
    protected dbmodule: logodb.LogoDB;
    protected elementtitle: JQuery;
    protected logopicture: JQuery;
    protected logoname: JQuery;
    protected logo: logo.Logo;
    protected logopage: JQuery;
    protected formbuttons: JQuery;
    private newLogoobj:JQuery;
    protected newlogoform: JQuery;
    private formval: formval.FormVal;
    constructor() {
        this.dbmodule = new logodb.LogoDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("basicfile", { regfile: true });
        jQuery.validator.addClassRules("basicselect", { regselect: true });
        this.newLogoobj = $(
            '<div class="newOption" id="newOptionLogo">' +
            '<h4>Napravite novi Logo</h4>' +
            '<section class="form">' +
            '<form id="PageLogo" name="PageLogo" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
            '<label>Izaberite Sliku:</label>' +
            '<ul class="ulPictures">' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
            '<image></image>' +
            '</li>' +
            '</div>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label>Naziv:</label>' +
            '<input id="LogoName" name="LogoName" class="basictext" type="text" />' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="modifyLinkPosition">Postavite Logo na Stranice:</label>' +
            '<ul id="LogoPage" name="LogoPage"class="sortable inlinelist"></ul>' +
            '</div>' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="newLogo" type="submit">Dodaj</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '</div>');
        this.newlogoform = $(this.newLogoobj).find('form');
        this.elementtitle=$(this.newLogoobj).find("h4");
        this.logoname = this.newlogoform.find("#LogoName");
        this.logopage = this.newlogoform.find("#LogoPage");
        this.logopicture = $(this.newlogoform).find(".ulPictures img");
        this.newlogoform.find(".galleryimages").change((e) => {
            var li = $(e.target.parentNode);
            var div = $(li.find('div'));
            var slika = $(li.find('img'));
            this.readURL(slika, e.target);
            li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
        });
        this.formbuttons = $(this.newlogoform).find("#formButtons");
        this.formbuttons.find("#newLogo").click((e) => {
            e.preventDefault();
            this.formSubmit();
        });

    }
    formSubmit() {
        var tmpPageid = [];
        this.logopage.find(".selected").each(function () {
            tmpPageid.push({ "sitepageid": this.id });
        });
        if (this.newlogoform.valid()) {
            var tmpLogo = new logo.Logo(
                this.logoname.val(),
                this.newlogoform.find(".galleryimages")[0].files[0],
                tmpPageid,
                null
            );
            var newpgepromise = this.dbmodule.newLogoAjax(tmpLogo.logoToFormData());
            newpgepromise.zahtev.done(() => {
                alertify.success("Uspešno ste kreirali novi Logo.");
            });
        }
    }
    readURL($image, input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $image.attr('src', reader.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    fillSitePageDD(pages) {
        if (pages) {
            for (var p in pages) {
                this.logopage.append("<li id='" + pages[p].sitepageid + "'><a href='#'>" + pages[p].sitepagename + "</a></li>");
            }
            this.logopage.find("li").click(function (e) {
                e.preventDefault();
                $(this).toggleClass("selected");
            });
        }

    };
    fillForm() {
        var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
        pagesdropdownpromise.zahtev.done(() => {
            this.fillSitePageDD($.parseJSON(pagesdropdownpromise.zahtev.responseText));
        });
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newLogoobj));
    }
    removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Logo Admin", "Logo");
        $(tmpAdminOption.option).trigger("click");
    }

}