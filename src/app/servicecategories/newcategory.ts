import adminoption = require('../htmlcomponents/adminoption');
import categorydb = require("./categorydb");
import formval = require('../formval');
import category = require('./category');
export class NewCategory {
    dbmodule: categorydb.CategoryDB;
    protected elementtitle: JQuery;
    protected category: category.Category;
    private newcategoryobj: any;
    protected newcategoryform: any;
    protected categoryname: JQuery;
    protected categorypicture: JQuery;
    protected page: JQuery;
    protected categorydescription: JQuery;
    protected formbuttons: JQuery;
    private formval: formval.FormVal;
    constructor() {
        this.dbmodule = new categorydb.CategoryDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("basicfile", { regfile: true });
        jQuery.validator.addClassRules("basicselect", { regselect: true });
        this.newcategoryobj = $(
            '<div class="newOption" id="newOptionCategory">' +
            '<h4 title="New category FORM">Napravite novu kategoriju usluga</h4>' +
            '<section class="form">' +
            '<form id="newCategory" name="newCategory" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
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
            '<label for="CategoryName">Naziv Kategorije:</label>' +
            '<input id="CategoryName" name="CategoryName" class="basictext" type="text"/>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="CategoryPage">Za Stranicu:</label>' +
            '<select id="CategoryPage" name="CategoryPage" class="basicselect">' +
            '<option value="-1">Izaberite</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<label for="CategoryDescription">Opis Kategorije:</label>' +
            '<textarea rows="5"  resize="false" id="CategoryDescription" name="CategoryDescription"></textarea>' +
            '</div>' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="newCategory" type="submit">Dodaj</button>' +
            '</div>'+
            '</form>' +
            '</section>' +
            '</div>');

        this.newcategoryform = $(this.newcategoryobj).find('form');
        this.elementtitle = $(this.newcategoryobj).find("h4");
        this.categoryname = $(this.newcategoryform).find("#CategoryName");
        this.categorypicture = $(this.newcategoryform).find(".ulPictures img");
        this.page = $(this.newcategoryform).find("#CategoryPage");
        this.categorydescription = $(this.newcategoryform).find("#CategoryDescription");
        this.formbuttons = this.newcategoryform.find("#formButtons");
        this.newcategoryform.find(".galleryimages").change((e) => {
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
        if (this.newcategoryform.valid()) {
            var tmpCategory = new category.Category(
                this.categoryname.val(),
                this.categorydescription.val(),
                this.page.val(),
                this.newcategoryform.find(".galleryimages")[0].files[0],
                null
            );
            var newcategorypromise = this.dbmodule.newCategoryAjax(tmpCategory.categoryToFormData());
            newcategorypromise.zahtev.done(() => {
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
        var pagespromise = this.dbmodule.getPagesAjax();
        pagespromise.zahtev.done(() => {
            var pages = $.parseJSON(pagespromise.zahtev.responseText);
            this.getPagesDD(pages);
        });
    }

    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newcategoryobj));
    }
    removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Kategorije Admin", "Category");
        $(tmpAdminOption.option).trigger("click");
    }

}