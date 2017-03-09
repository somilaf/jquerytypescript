define(["require", "exports", '../htmlcomponents/adminoption', '../htmlcomponents/range', "./gallerydb", '../formval'], function (require, exports, adminoption, range, gallerydb, formval) {
    "use strict";
    var galleryPage = (function () {
        function galleryPage() {
            var _this = this;
            this.pathroot = "dumil08/";
            this.dbmodule = new gallerydb.GalleryDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("newlogoname", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("fnewlogofile", { regfile: true });
            jQuery.validator.addClassRules("newlogopage", { regselect: true });
            this.newgallerypageobj = $('<div class="newOption" id="newOptionGallery">' +
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
                '</div>');
            this.newgallerypageform = this.newgallerypageobj.find("form");
            this.rangecontainer = this.newgallerypageobj.find("#galleryRange");
            this.page = this.newgallerypageform.find("#galleryPage");
            this.formbuttons = this.newgallerypageform.find("#formButtons");
            this.gallerypictures = this.newgallerypageform.find(".ulPictures img");
            this.formbuttons.find("#modifygallery").hide();
            this.formbuttons.hide();
            this.rangecontainer.hide();
            this.page.change(function (e) {
                e.preventDefault();
                if ($(e.target).val() !== "-1") {
                    _this.galleryid = $(e.target).find(':selected').data("galleryid");
                    _this.getGalleryPictures();
                    _this.rangecontainer.show();
                }
                else {
                    _this.formbuttons.hide();
                    _this.rangecontainer.hide();
                    _this.gallerypictures.each(function () {
                        $(this).attr("src", "");
                        $(this).attr("id", "");
                    });
                }
                //    this.creategallery();
            });
            this.formbuttons.find("#deletegallery").click(function (e) {
                e.preventDefault();
                _this.removegalleryfromPage();
            });
            this.formbuttons.find("#modifygallery").click(function (e) {
                e.preventDefault();
                _this.showgalleryonPage();
            });
        }
        galleryPage.prototype.showgalleryonPage = function () {
            var data = new FormData();
            data.append("GalleryId", this.galleryid);
            data.append("PageId", this.page.val());
            var showgallerypromise = this.dbmodule.showGalleryOnPage(data);
            showgallerypromise.zahtev.done(function () {
                alertify.success("Uspešno ste dodali Tekst na Web Stranu.");
            });
        };
        galleryPage.prototype.removegalleryfromPage = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da uklonite Galeriju sa Web Strane?', function () {
                var data = new FormData();
                data.append("PageId", _this.page.val());
                var deletegallerypromise = _this.dbmodule.removeGalleryFromPage(data);
                deletegallerypromise.zahtev.done(function () {
                    alertify.success('Uspešno ste uklonili Galeriju sa Web Strane.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od promene Galerije.');
            });
        };
        galleryPage.prototype.getGalleryPictures = function () {
            var _this = this;
            var data = new FormData();
            data.append("GalleryId", this.galleryid);
            var galleriepicturespromise = this.dbmodule.getGalleriePicturesAjax(data);
            galleriepicturespromise.zahtev.done(function () {
                console.log($.parseJSON(galleriepicturespromise.zahtev.responseText));
                _this.createGallery($.parseJSON(galleriepicturespromise.zahtev.responseText));
            });
        };
        galleryPage.prototype.createGallery = function (pagegallerypictures) {
            var _this = this;
            if (pagegallerypictures && typeof pagegallerypictures[0] != 'undefined') {
                var p = 0;
                this.gallerypictures.each(function () {
                    $(this).attr("src", "");
                    $(this).attr("id", "");
                });
                if (pagegallerypictures) {
                    $(pagegallerypictures).each(function () {
                        var url = window.location.origin + "\/" + _this.pathroot + pagegallerypictures[p].picturepath;
                        $(_this.gallerypictures[p]).attr('src', url);
                        $(_this.gallerypictures[p]).attr('id', pagegallerypictures[p].pictureid);
                        p++;
                    });
                }
                ;
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
        };
        galleryPage.prototype.fillPagesDD = function (pages) {
            var _this = this;
            if (pages) {
                var p = 0;
                $(pages).each(function () {
                    _this.page.append("<option value=" + pages[p].sitepageid + " data-galleryid=" + pages[p].galleryid + ">" + pages[p].sitepagename + "</option>");
                    p++;
                });
            }
        };
        galleryPage.prototype.fillForm = function () {
            var _this = this;
            var allpagespromise = this.dbmodule.getPagesAjax();
            var allgalleryspromise = this.dbmodule.allGalleriesAjax();
            var combinepromise = $.when(allpagespromise.zahtev, allgalleryspromise.zahtev);
            combinepromise.done(function () {
                console.log($.parseJSON(allpagespromise.zahtev.responseText));
                _this.fillPagesDD($.parseJSON(allpagespromise.zahtev.responseText));
                _this.range = new range.RangeDumil08("Odaberite novi tekst za izabranu poziciju.", $.parseJSON(allgalleryspromise.zahtev.responseText), _this.setgallery, null, _this);
                _this.range.createInParent(_this.rangecontainer, true);
            });
        };
        galleryPage.prototype.setgallery = function (gallerycontentid, object) {
            if (gallerycontentid === void 0) { gallerycontentid = null; }
            if (object === void 0) { object = null; }
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
        };
        galleryPage.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newgallerypageobj));
        };
        galleryPage.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Tekstovi Admin", "gallery");
            $(tmpAdminOption.option).trigger("click");
        };
        return galleryPage;
    }());
    exports.galleryPage = galleryPage;
});
