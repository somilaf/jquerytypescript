import adminoption = require('../htmlcomponents/adminoption');
import servicedb = require("./servicedb");
import formval = require('../formval');
import service = require('./service');
export class NewService {
    dbmodule: servicedb.ServiceDB;
    protected elementtitle: JQuery;
    protected service: service.Service;
    private newserviceobj: JQuery;
    protected newserviceform: JQuery;
    protected servicename: JQuery;
    protected servicepicture: JQuery;
    protected category: JQuery;
    protected page: JQuery;
    protected servicedescription: JQuery;
    private formval: formval.FormVal;
    protected formbuttons: JQuery;
    constructor() {
        this.dbmodule = new servicedb.ServiceDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("basicfile", { regfile: true });
        jQuery.validator.addClassRules("basicselect", { regselect: true });
        this.newserviceobj = $(
            '<div class="newOption" id="newOptionCategory">' +
            '<h4 title="New service FORM">Napravite novu uslugu</h4>' +
            '<section class="form">' +
            '<form id="newService" name="newService" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
            '<label>Izaberite Sliku:</label>' +
            '<ul class="ulPictures">' +
            
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
            '<image></image>' +
            '</li>' +
            '</div>' +

            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
            '<image></image>' +
            '</li>' +
            '</div>' +
            
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="ServiceName">Naziv Usluge:</label>' +
            '<input id="ServiceName" name="ServiceName" class="basictext" type="text"/>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="ServiceCategory">U Kategoriji Usluga:</label>' +
            '<select id="ServiceCategory" name="ServicePage" class="basicselect">' +
            '<option value="-1">Izaberite</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="ServicePage">Za Stranicu:</label>' +
            '<select id="ServicePage" name="ServicePage" class="basicselect">' +
            '<option value="-1">Izaberite</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="ServiceDescription">Opis Usluge:</label>' +
            '<textarea rows="5"  resize="false" id="ServceDescription" name="ServceDescription"></textarea>' +
            '</div>' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="newCategory" type="submit">Dodaj</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '</div>');

        this.newserviceform = $(this.newserviceobj).find('form');
        this.elementtitle = $(this.newserviceobj).find("h4");
        this.servicename = $(this.newserviceform).find("#ServiceName");
        this.servicepicture = $(this.newserviceform).find(".ulPictures img");
        this.page = $(this.newserviceform).find("#ServicePage");
        this.category = $(this.newserviceform).find("#ServiceCategory");
        this.servicedescription = $(this.newserviceform).find("#ServceDescription");
        this.formbuttons = $(this.newserviceform).find("#formButtons");
        this.newserviceform.find(".galleryimages").change((e) => {
            var li = $(e.target.parentNode);
            var div = $(li.find('div'));
            var slika = $(li.find('img'));
            this.readURL(slika, e.target);
            li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
        });
        this.formbuttons.find("#newCategory").click((e) => {
            e.preventDefault();
            this.formSubmit();
        });
    }

    formSubmit() {
        if (this.newserviceform.valid()) {
            var tmpService = new service.Service(
                this.servicename.val(),
                this.servicedescription.val(),
                this.category.val(),
                this.page.val(),
                this.newserviceform.find(".galleryimages"),
                null
            );
            var data = tmpService.imagesToFormData(tmpService.serviceToFormData());
            var newservicepromise = this.dbmodule.newServiceAjax(data);
            newservicepromise.zahtev.done(() => {
                alertify.success("Uspešno ste kreirali novu Uslugu.");
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
    getCategoryDD(categories) {
        if (categories) {
            var p = 0;
            $(categories).each(() => {
                this.category.append("<option value='" + categories[p].categoryid + "'>" + categories[p].categoryname + "</option>");
                p++;
            });
        }
    }
    getPagesDD(pages) {
        if (pages) {
            var p = 0;
            $(pages).each(() => {
                this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                p++;
            });
        }
    }

    fillForm() {
        var categoriespromise = this.dbmodule.getCategoriesAjax();
        var pagespromise = this.dbmodule.getPagesAjax();
        var combinepromise = $.when(categoriespromise.zahtev, pagespromise.zahtev);
        combinepromise.done(() => {
            this.getCategoryDD($.parseJSON(categoriespromise.zahtev.responseText));
            this.getPagesDD($.parseJSON(pagespromise.zahtev.responseText));
        });
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newserviceobj));
    }
    removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Usluge Admin", "Service");;
        $(tmpAdminOption.option).trigger("click");
    }

}