var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './gallery', './newgallery', '../shared'], function (require, exports, gallery, galleryform, shared) {
    "use strict";
    var ModifyGallery = (function (_super) {
        __extends(ModifyGallery, _super);
        function ModifyGallery(galleryid) {
            var _this = this;
            if (galleryid === void 0) { galleryid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Galeriju");
            this.pathroot = shared.picturePath;
            this.galleryid = galleryid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyGallery" type="submit">Izmeni</button>' +
                '<button id="deleteGallery" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteGallery").click(function (e) {
                e.preventDefault();
                _this.deleteGallery();
            });
            this.formbuttons.find("#modifyGallery").click(function (e) {
                e.preventDefault();
                _this.modifyGallery();
            });
        }
        ModifyGallery.prototype.deleteGallery = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Logo?', function () {
                var data = new FormData();
                data.append("GalleryId", _this.gallery.getGalleryId());
                var deletegallerypromise = _this.dbmodule.deleteGalleryAjax(data);
                deletegallerypromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Galeriju.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Galerije.');
            });
        };
        ModifyGallery.prototype.modifyGallery = function () {
            var _this = this;
            var tmpGallery = new gallery.Gallery(this.galleryname.val(), null, this.gallery.getGalleryId());
            if (this.gallery.compareGallery(tmpGallery)) {
                alertify.error("Nije izvršena nikakva promena.");
            }
            else {
                var modifygallerypromise = this.dbmodule.modifyGalleryAjax(tmpGallery.galleryToFormData());
                modifygallerypromise.zahtev.done(function () {
                    alertify.success("Uspesno ste promenili Galeriju.");
                    _this.removeFormFromParent();
                });
            }
        };
        ModifyGallery.prototype.deleteImage = function (button, img) {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', function () {
                var data = new FormData();
                data.append("ImageId", img.attr("id"));
                data.append("GalleryId", _this.gallery.getGalleryId());
                var deletepicturepromise = _this.dbmodule.deleteGalleryPictureAjax(data);
                deletepicturepromise.zahtev.done(function () {
                    _this.getGalleryPictures();
                    alertify.success('Uspešno ste obrisali sliku.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja slike.');
            });
        };
        ModifyGallery.prototype.modifyImage = function (button, image, input) {
            var _this = this;
            console.log(input);
            var data = new FormData();
            data.append("GalleryId", this.gallery.getGalleryId());
            if (image.attr("id") != null) {
                data.append("ImageId", image.attr("id"));
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var updateimage = this.dbmodule.updateSingleImgeAjax(data);
                updateimage.zahtev.done(function () {
                    _this.getGalleryPictures();
                    alertify.success("Uspešno ste promenili sliku.");
                });
                console.log("Update " + image.attr("id"));
            }
            else {
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var insertimage = this.dbmodule.insertSingleImgeAjax(data);
                insertimage.zahtev.done(function () {
                    console.log("tu sam");
                    _this.getGalleryPictures();
                    alertify.success("Uspešno ste dodali sliku.");
                });
                console.log("Insert");
            }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModifyGallery.prototype.populateFormFileds = function () {
            this.galleryname.val(this.gallery.getGalleryName());
        };
        ModifyGallery.prototype.populateGalleryImages = function () {
            var _this = this;
            var pictures = this.gallery.getGalleryPictures();
            if (this.gallerypictures != null && pictures != null) {
                var s = 0;
                var p = 0;
                $(this.gallerypictures).each(function () {
                    $(_this.gallerypictures[s]).removeAttr("src");
                    $(_this.gallerypictures[s]).removeAttr("id");
                    $(_this.gallerypictures[s]).parent().find(".updateButtons").remove();
                    $(_this.gallerypictures[s]).parent().append("<span class='updateButtons'>" +
                        "<button id='btUkloni" + s + "' class='btUkloni' data-position='" + s + "'type='submit'>X</button>" +
                        "<button id='btIzmeni" + s + "' class='btIzmeni' data-position='" + s + "' type='submit'>Izmeni</button>" +
                        "<input id='imgPosition" + s + "' type='hidden' val='" + s + "'>" +
                        "</span>");
                    $("#btUkloni" + s).click(function (e) {
                        e.preventDefault();
                        _this.deleteImage($(e.target), $(e.target).parentsUntil("div").find("img"));
                    });
                    $("#btIzmeni" + s).click(function (e) {
                        e.preventDefault();
                        _this.modifyImage($(e.target), $(e.target).parentsUntil("div").find("img"), $(e.target).parents("li").find('input:file'));
                    });
                    $("#btUkloni" + s).hide();
                    $("#btIzmeni" + s).hide();
                    s++;
                });
                if (pictures) {
                    $(pictures).each(function () {
                        var url = window.location.origin + "\/" + _this.pathroot + pictures[p].picturepath;
                        $(_this.gallerypictures[p]).attr('src', url);
                        $(_this.gallerypictures[p]).attr('id', pictures[p].pictureid);
                        $("#btUkloni" + p).show();
                        p++;
                    });
                }
                ;
            }
        };
        ModifyGallery.prototype.getGalleryPictures = function () {
            var _this = this;
            var data = new FormData();
            data.append("GalleryId", this.galleryid.toString());
            var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
            galleriepicturespromise.zahtev.done(function () {
                var pictures = $.parseJSON(galleriepicturespromise.zahtev.responseText);
                console.log(_this.gallery.getGalleryPictures());
                _this.gallery.setGalleryPictures(pictures);
                _this.populateGalleryImages();
            });
        };
        ModifyGallery.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("GalleryId", this.galleryid.toString());
            var galleryelementpromise = this.dbmodule.singleGalleryAjax(data);
            var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
            var combinepromise = $.when(galleryelementpromise.zahtev, galleriepicturespromise.zahtev);
            combinepromise.done(function () {
                var tmpGallery = $.parseJSON(galleryelementpromise.zahtev.responseText);
                var tmpGalleryPictures = $.parseJSON(galleriepicturespromise.zahtev.responseText);
                _this.gallery = new gallery.Gallery(tmpGallery[0].galleryname, null, parseInt(tmpGallery[0].galleryid));
                _this.gallery.setGalleryPictures(tmpGalleryPictures);
                _this.populateFormFileds();
                _this.populateGalleryImages();
            });
        };
        return ModifyGallery;
    }(galleryform.NewGallery));
    exports.ModifyGallery = ModifyGallery;
});
