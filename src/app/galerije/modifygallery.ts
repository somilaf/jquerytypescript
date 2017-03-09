import gallerydb = require("./gallerydb");
import formval = require('../formval');
import gallery = require('./gallery');
import galleryform = require('./newgallery');
import shared = require('../shared');
export class ModifyGallery extends galleryform.NewGallery {
    private galleryid: number;
    private pathroot: string;
   constructor(galleryid = 0) {
        super();
        this.elementtitle.empty().append("Izmenite Galeriju");
        this.pathroot = shared.picturePath;
        this.galleryid = galleryid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyGallery" type="submit">Izmeni</button>' +
            '<button id="deleteGallery" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteGallery").click((e) => {
            e.preventDefault();
            this.deleteGallery();
        });
        this.formbuttons.find("#modifyGallery").click((e) => {
            e.preventDefault();
            this.modifyGallery();
        });

    }
    deleteGallery() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Logo?', () => {
            var data = new FormData();
            data.append("GalleryId", this.gallery.getGalleryId());
            var deletegallerypromise = this.dbmodule.deleteGalleryAjax(data);
            deletegallerypromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Galeriju.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Galerije.');
        });

    }

    modifyGallery() {
        var tmpGallery = new gallery.Gallery(
            this.galleryname.val(),
            null,
            this.gallery.getGalleryId()
        );
        if (this.gallery.compareGallery(tmpGallery)) {
             alertify.error("Nije izvršena nikakva promena.");
        }
        else {
            var modifygallerypromise = this.dbmodule.modifyGalleryAjax(tmpGallery.galleryToFormData());
            modifygallerypromise.zahtev.done(() => {
                alertify.success("Uspesno ste promenili Galeriju.");
                this.removeFormFromParent();
            });

        }
    }

    deleteImage(button, img) {
        alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', () => {
            var data = new FormData();
            data.append("ImageId", img.attr("id"));
            data.append("GalleryId", this.gallery.getGalleryId());
            var deletepicturepromise = this.dbmodule.deleteGalleryPictureAjax(data);
            deletepicturepromise.zahtev.done(() => {
                this.getGalleryPictures();

                alertify.success('Uspešno ste obrisali sliku.')
            });
        }
            , function () {
                alertify.error('Odustali ste od brisanja slike.')
            });
    }
    modifyImage(button, image, input) {
        console.log(input);
        var data = new FormData();
        data.append("GalleryId", this.gallery.getGalleryId());
        if (image.attr("id") != null) {
            data.append("ImageId", image.attr("id"));
            if (input.val() != "") {
                data.append("fModifyImage", input[0].files[0]);
            }
            var updateimage = this.dbmodule.updateSingleImgeAjax(data);
            updateimage.zahtev.done(() => {
                this.getGalleryPictures();
                alertify.success("Uspešno ste promenili sliku.");
            });
            console.log("Update " + image.attr("id"));
        }
        else {
            if (input.val() != "") {
                data.append("fModifyImage", input[0].files[0]);
            }
            var insertimage = this.dbmodule.insertSingleImgeAjax(data);
            insertimage.zahtev.done(() => {
                console.log("tu sam");
                this.getGalleryPictures();

                alertify.success("Uspešno ste dodali sliku.");
            });
            console.log("Insert");
        }
    }
    //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
    populateFormFileds() {
        this.galleryname.val(this.gallery.getGalleryName());
    }

    populateGalleryImages() {
        var pictures = this.gallery.getGalleryPictures();
        if (this.gallerypictures != null && pictures != null) {
            var s = 0;
            var p = 0;
            $(this.gallerypictures).each(() => {
                $(this.gallerypictures[s]).removeAttr("src");
                $(this.gallerypictures[s]).removeAttr("id");
                $(this.gallerypictures[s]).parent().find(".updateButtons").remove();
                $(this.gallerypictures[s]).parent().append(
                    "<span class='updateButtons'>" +
                    "<button id='btUkloni" + s + "' class='btUkloni' data-position='" + s + "'type='submit'>X</button>" +
                    "<button id='btIzmeni" + s + "' class='btIzmeni' data-position='" + s + "' type='submit'>Izmeni</button>" +
                    "<input id='imgPosition" + s + "' type='hidden' val='" + s + "'>" +
                    "</span>");
                $("#btUkloni" + s).click((e) => {
                    e.preventDefault();
                    this.deleteImage($(e.target), $(e.target).parentsUntil("div").find("img"));
                });

                $("#btIzmeni" + s).click((e) => {

                    e.preventDefault();
                    this.modifyImage(
                        $(e.target),
                        $(e.target).parentsUntil("div").find("img"),
                        $(e.target).parents("li").find('input:file'));
                });
                $("#btUkloni" + s).hide();
                $("#btIzmeni" + s).hide();
                s++;
            });
            if (pictures) {
                $(pictures).each(() => {
                    var url = window.location.origin + "\/" + this.pathroot + pictures[p].picturepath;
                    $(this.gallerypictures[p]).attr('src', url);
                    $(this.gallerypictures[p]).attr('id', pictures[p].pictureid);
                    $("#btUkloni" + p).show();
                    p++;
                });
            };
        }
    }
    getGalleryPictures() {
        var data = new FormData();
        data.append("GalleryId", this.galleryid.toString());
        var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
        galleriepicturespromise.zahtev.done(() => {
            var pictures = $.parseJSON(galleriepicturespromise.zahtev.responseText);
            console.log(this.gallery.getGalleryPictures());
            this.gallery.setGalleryPictures(pictures);
            this.populateGalleryImages();
        });
    }



    fillForm() {
        var data = new FormData();
        data.append("GalleryId", this.galleryid.toString());
        var galleryelementpromise = this.dbmodule.singleGalleryAjax(data);
        var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
        var combinepromise = $.when(
            galleryelementpromise.zahtev,
            galleriepicturespromise.zahtev);
        combinepromise.done(() => {
            var tmpGallery = $.parseJSON(galleryelementpromise.zahtev.responseText);
            var tmpGalleryPictures = $.parseJSON(galleriepicturespromise.zahtev.responseText);
            this.gallery = new gallery.Gallery(
                tmpGallery[0].galleryname,
                null,
                parseInt(tmpGallery[0].galleryid)
            );
            this.gallery.setGalleryPictures(tmpGalleryPictures);
            this.populateFormFileds();
            this.populateGalleryImages();
        });
    }

}