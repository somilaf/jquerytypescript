import adminoption = require('../htmlcomponents/adminoption');
import gallerydb = require("./gallerydb");
import formval = require('../formval');
import gallery = require('./gallery');
export class NewGallery {
    protected dbmodule: gallerydb.GalleryDB;
    protected elementtitle: JQuery;
    protected galleryname: JQuery;
    protected gallerypictures: JQuery;
    protected gallery: gallery.Gallery;
    private newgalleryobj: JQuery;
    protected newgalleryform: JQuery;
    protected formbuttons: JQuery;
    private formval: formval.FormVal;
    constructor() {
        this.dbmodule = new gallerydb.GalleryDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("basicfile", { regfile: true });
        jQuery.validator.addClassRules("basicselect", { regselect: true });
        this.newgalleryobj = $(
            '<div class="newOption" id="newOptionGallery">' +
            '<h4 title="New gallery FORM">Napravite novu galeriju</h4>' +
            '<section class="form">' +
            '<form id="newPageGallery" name="newPageGallery" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
            '<label for="GalleryName">Opis Galerije:</label>' +
            '<input id="GalleryName" name="newGalleryName" class="basictext" type="text"/>' +
            '</div>' +
            '<div class="inputgroup">'
            +
            '<ul class="ulPictures">' +

            '<div class="col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
            '<image></image>' +
            '</li>' +
            '</div>' +

            '<div class="col-wd-4 col-md-6 col-sm-12">' +
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

            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
            '<image></image>' +
            '</li>' +
            '</div>' +

            ' </ul>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="newGallery" type="submit">Dodaj</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '</div>');
        this.newgalleryform = $(this.newgalleryobj).find('form');
         this.elementtitle = $(this.newgalleryobj).find("h4");
        this.galleryname = this.newgalleryform.find('#GalleryName');
        this.gallerypictures = this.newgalleryform.find(".ulPictures img");
        this.newgalleryform.find(".galleryimages").change((e) => {
            var li = $(e.target.parentNode);
            var div = $(li.find('div'));
            var slika = $(li.find('img'));
            this.readURL(slika, e.target);
            li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
        });
        this.formbuttons = $(this.newgalleryform).find("#formButtons");
        this.formbuttons.find("#newGallery").click((e) => {
            e.preventDefault();
            this.formSubmit();
        });
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
    formSubmit() {
        if (this.newgalleryform.valid()) {
            var data = new FormData();
            data.append("GalleryName", this.galleryname.val());
            var prazan = 0;
            var galleryimages = this.newgalleryform.find(".galleryimages");
            data.append("galleryimages", galleryimages);
            for (var i = 0; i < galleryimages.length; i++) {
                if (galleryimages[i].value != "") {
                    data.append("Image" + prazan, galleryimages[i].files[0]);
                    prazan++;
                }
            }
            data.append("FileCount", prazan);
            var newgalllerypromise = this.dbmodule.newGalleryAjax(data);
            newgalllerypromise.zahtev.done(() => {
                alertify.success("Uspesno ste napravili novu galeriju.")
            })
        }
    }
    fillForm() { }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newgalleryobj));
    }
    removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Galerije Admin", "Gallery");
        $(tmpAdminOption.option).trigger("click");
    }

}