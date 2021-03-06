import adminoption = require('../htmlcomponents/adminoption');
import range = require('../htmlcomponents/range');
import gallerydb = require("./gallerydb");
import formval = require('../formval');
import gallery = require('./gallery');
import shared = require('../shared');
export class galleryPage {
    protected dbmodule: gallerydb.GalleryDB;
    protected gallery: gallery.Gallery;
    protected page: JQuery;
    private gallerypictures: JQuery;
    private range: range.RangeDumil08;
    private rangecontainer: JQuery
    private newgallerypageobj: any;
    private galleryid: any;
    protected newgallerypageform: any;
    private formval: formval.FormVal;
    protected formbuttons: JQuery;
    private pathroot: string;
    constructor() {
        this.pathroot = shared.picturePath;
        this.dbmodule = new gallerydb.GalleryDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("newlogoname", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("fnewlogofile", { regfile: true });
        jQuery.validator.addClassRules("newlogopage", { regselect: true });
        this.newgallerypageobj = $(
            '<div class="newOption" id="newOptionGallery">' +
            '<h4 title="New gallery FORM">Povžite galerije sa Web Stranama</h4>' +
            '<section class="form">' +
            '<form id="advancePagegalleryContent" name="advancePagegalleryContent" action="" method="post" enctype="multipart/form-data">' +
            '<div class="inputgroup">' +
            '<label for="galleryPage">Izaberite Stranicu:</label>' +
            '<select id="galleryPage" name="galleryPage" class="newpageselect">' +
            '<option value="-1">Izaberite</option>' +
            '</select>' +
            '</div>' +
            '<div class="inputgroup">' +
            '<ul class="ulPictures">' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '<div class=" col-wd-4 col-md-6 col-sm-12">' +
            '<li>' +
            '<image height="100%" ></image>' +
            '</li>' +
            '</div>' +
            '</ul>' +
            '</div>' +
            '<div id="formButtons" name="formButtons" class="inputgroup">' +
            '<button id="modifygallery" type="submit">Prikaži</button>' +
            '<button id="deletegallery" type="submit">Ukloni</button>' +
            '</div>' +
            '</form>' +
            '</section>' +
            '<div class="row"><div id="galleryRange" class="rangeStyling col-wd-12"></div></div>' +
            '</div>'
        );
        this.newgallerypageform = this.newgallerypageobj.find("form");
        this.rangecontainer = this.newgallerypageobj.find("#galleryRange");
        this.page = this.newgallerypageform.find("#galleryPage");
        this.formbuttons = this.newgallerypageform.find("#formButtons");
        this.gallerypictures = this.newgallerypageform.find(".ulPictures img");
        this.formbuttons.find("#modifygallery").hide();
        this.formbuttons.hide();
        this.rangecontainer.hide();
        this.page.change((e) => {
            e.preventDefault();
            if ($(e.target).val() !== "-1") {
                this.galleryid = $(e.target).find(':selected').data("galleryid");
                this.getGalleryPictures();
                this.rangecontainer.show();
            }
            else {
                this.formbuttons.hide();
                this.rangecontainer.hide();
                this.gallerypictures.each(function () {
                    $(this).attr("src", "");
                    $(this).attr("id", "");
                });
            }
            //    this.creategallery();
        });
        this.formbuttons.find("#deletegallery").click((e) => {
            e.preventDefault();
            this.removegalleryfromPage();
        });
        this.formbuttons.find("#modifygallery").click((e) => {
            e.preventDefault();
            this.showgalleryonPage();
        });
    }

    showgalleryonPage() {
        var data = new FormData();
        data.append("GalleryId", this.galleryid);
        data.append("PageId", this.page.val());
        var showgallerypromise = this.dbmodule.showGalleryOnPage(data);
        showgallerypromise.zahtev.done(function () {
            alertify.success("Uspešno ste dodali Tekst na Web Stranu.");
        });
    }
    removegalleryfromPage() {
        alertify.confirm('Dumil08', 'Da li želite da uklonite Galeriju sa Web Strane?', () => {
            var data = new FormData();
            data.append("PageId", this.page.val());
            var deletegallerypromise = this.dbmodule.removeGalleryFromPage(data);
            deletegallerypromise.zahtev.done(() => {
                alertify.success('Uspešno ste uklonili Galeriju sa Web Strane.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od promene Galerije.');
        });
    }
    getGalleryPictures() {
        var data = new FormData();
        data.append("GalleryId", this.galleryid);
        var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
        galleriepicturespromise.zahtev.done(() => {
            console.log($.parseJSON(galleriepicturespromise.zahtev.responseText));
            this.createGallery($.parseJSON(galleriepicturespromise.zahtev.responseText));
        });
    }
    createGallery(pagegallerypictures) {
        if (pagegallerypictures && typeof pagegallerypictures[0] != 'undefined') {
            var p = 0;
            this.gallerypictures.each(function () {
                $(this).attr("src", "");
                $(this).attr("id", "");
            });
            if (pagegallerypictures) {
                $(pagegallerypictures).each(() => {
                    var url = window.location.origin + "\/" + this.pathroot + pagegallerypictures[p].picturepath;
                    $(this.gallerypictures[p]).attr('src', url);
                    $(this.gallerypictures[p]).attr('id', pagegallerypictures[p].pictureid);
                    p++;
                });
            };
            this.formbuttons.show();
            this.rangecontainer.show();
        }
        else {
            this.gallerypictures.each(function () {
                $(this).attr("src", "");
                $(this).attr("id", "");
            });
            this.formbuttons.hide();
            alertify.error("Galerija za ovu poziciju nije izabrana ili je galerija bez slika.");
        }
    }

    fillPagesDD(pages) {
        if (pages) {
            var p = 0;
            $(pages).each(() => {
                this.page.append("<option value=" + pages[p].sitepageid + " data-galleryid=" + pages[p].galleryid + ">" + pages[p].sitepagename + "</option>");
                p++;
            });
        }
    }

    protected fillForm() {
        var allpagespromise = this.dbmodule.getPagesAjax();
        var allgalleryspromise = this.dbmodule.allGalleriesAjax();
        var combinepromise = $.when(allpagespromise.zahtev, allgalleryspromise.zahtev);
        combinepromise.done(() => {
            console.log($.parseJSON(allpagespromise.zahtev.responseText));
            this.fillPagesDD($.parseJSON(allpagespromise.zahtev.responseText));
            this.range = new range.RangeDumil08(
                "Odaberite novi tekst za izabranu poziciju.",
                $.parseJSON(allgalleryspromise.zahtev.responseText),
                this.setgallery,
                null,
                this
            )
            this.range.createInParent(this.rangecontainer, true);
        });
    }
    setgallery(gallerycontentid = null, object: galleryPage = null): any {
        if (gallerycontentid && object) {
            var data = new FormData();
            data.append("GalleryId", gallerycontentid.toString());
            object.galleryid = gallerycontentid.toString();
            var galleryelementpromise = object.dbmodule.getGalleriePicturesAjax(data);
            galleryelementpromise.zahtev.done(function () {
                object.createGallery($.parseJSON(galleryelementpromise.zahtev.responseText));
                object.formbuttons.slideDown();
                object.formbuttons.find("#modifyGAllery").show();
            });
        }
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newgallerypageobj));
    }
    protected removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Tekstovi Admin", "gallery");
        $(tmpAdminOption.option).trigger("click");
    }

}