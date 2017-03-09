var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './service', './newservice'], function (require, exports, service, serviceform) {
    "use strict";
    var ModifyService = (function (_super) {
        __extends(ModifyService, _super);
        function ModifyService(serviceid) {
            var _this = this;
            if (serviceid === void 0) { serviceid = 0; }
            _super.call(this);
            this.pathroot = "dumil08/";
            this.serviceid = serviceid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyService" type="submit">Izmeni</button>' +
                '<button id="deleteService" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteService").click(function (e) {
                e.preventDefault();
                _this.deleteService();
            });
            this.formbuttons.find("#modifyService").click(function (e) {
                e.preventDefault();
                _this.modifyService();
            });
        }
        ModifyService.prototype.deleteService = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Uslugu?', function () {
                var data = new FormData();
                data.append("ServiceId", _this.service.getServiceId());
                var deleteservicepromise = _this.dbmodule.deleteServiceAjax(data);
                deleteservicepromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Galeriju.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Galerije.');
            });
        };
        ModifyService.prototype.modifyService = function () {
            var tmpService = new service.Service(this.servicename.val(), this.servicedescription.val(), parseInt(this.category.val()), parseInt(this.page.val()), null, this.serviceid);
            if (this.service.compareService(tmpService)) {
                alertify.error("Nije izvršena nikakva promena.");
            }
            else {
                var modifyservicepromise = this.dbmodule.modifyServiceAjax(tmpService.serviceToFormData());
                modifyservicepromise.zahtev.done(function () {
                    alertify.success("Uspesno ste promenili Uslugu.");
                });
            }
        };
        ModifyService.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        ModifyService.prototype.deleteImage = function (button, img) {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', function () {
                var data = new FormData();
                data.append("ImageId", img.attr("id"));
                data.append("ServiceId", _this.service.getServiceId());
                var deletepicture = _this.dbmodule.delete_SingleImage_Ajax(data);
                deletepicture.zahtev.done(function () {
                    _this.getServicePicture();
                    _this.populateFormFileds();
                    alertify.success('Uspešno ste obrisali sliku.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja slike.');
            });
        };
        ModifyService.prototype.modifyImage = function (button, image, input) {
            var _this = this;
            console.log(input);
            var data = new FormData();
            data.append("ServiceId", this.service.getServiceId());
            if (image.attr("id") != null) {
                data.append("ImageId", image.attr("id"));
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var updateimage = this.dbmodule.updateSingleImgeAjax(data);
                updateimage.zahtev.done(function () {
                    _this.getServicePicture();
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
                    _this.getServicePicture();
                    alertify.success("Uspešno ste dodali sliku.");
                });
                console.log("Insert");
            }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModifyService.prototype.populateFormFileds = function () {
            this.servicename.val(this.service.getServiceName());
            this.category.val(this.service.getCategoryId().toString());
            this.page.val(this.service.getPageId().toString());
            this.servicedescription.val(this.service.getServiceDescription());
        };
        ModifyService.prototype.populateServiceImages = function () {
            var _this = this;
            var pictures = $(this.service.getServicePicture());
            if (this.servicepicture != null && pictures != null) {
                var s = 0;
                var p = 0;
                $(this.servicepicture).each(function () {
                    $(_this.servicepicture[s]).removeAttr("src");
                    $(_this.servicepicture[s]).removeAttr("id");
                    $(_this.servicepicture[s]).parent().find(".updateButtons").remove();
                    $(_this.servicepicture[s]).parent().append("<span class='updateButtons'>" +
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
                $(pictures).each(function () {
                    var url = window.location.origin + "\/" + _this.pathroot + pictures[p].picturepath;
                    $(_this.servicepicture[p]).attr('src', url);
                    $(_this.servicepicture[p]).attr('id', pictures[p].pictureid);
                    $("#btUkloni" + p).show();
                    p++;
                });
            }
        };
        ModifyService.prototype.getServicePicture = function () {
            var _this = this;
            var data = new FormData();
            data.append("ServiceId", this.serviceid.toString());
            var servicepicture = this.dbmodule.getServicePictureAjax(data);
            servicepicture.zahtev.done(function () {
                var picture = $.parseJSON(servicepicture.zahtev.responseText);
                _this.service.setServicePicture(picture);
                _this.populateServiceImages();
            });
        };
        ModifyService.prototype.modifyGallery = function () {
            var tmppictures = [];
            $(this.servicepicture).each(function () {
                if ($(this).attr("id") !== undefined && $(this).attr("src") !== undefined) {
                    var slika = { "pictureid": $(this).attr("id"), "picturepath": $(this).attr("src") };
                    tmppictures.push(slika);
                }
            });
            var tmpService = new service.Service(this.servicename.val(), this.servicedescription.val(), parseInt(this.category.val()), parseInt(this.page.val()), tmppictures, this.serviceid);
            if (!this.text.compareGallery(tmpText)) {
                console.log("Update");
            }
            else {
                alertify.confirm('Confirm Title', 'Confirm Message', function () {
                    console.log("Milos");
                    alertify.success('Ok');
                }, function () { alertify.error('Cancel'); });
            }
        };
        ModifyService.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("ServiceId", this.serviceid.toString());
            var serviceelementpromise = this.dbmodule.singleServiceAjax(data);
            var categoriespromise = this.dbmodule.getCategoriesAjax();
            var pagespromise = this.dbmodule.getPagesAjax();
            var servicepicturepromise = this.dbmodule.getServicePictureAjax(data);
            var combinepromise = $.when(serviceelementpromise.zahtev, categoriespromise.zahtev, pagespromise.zahtev, servicepicturepromise.zahtev);
            combinepromise.done(function () {
                _this.getCategoryDD($.parseJSON(categoriespromise.zahtev.responseText));
                _this.getPagesDD($.parseJSON(pagespromise.zahtev.responseText));
                var tmpService = $.parseJSON(serviceelementpromise.zahtev.responseText);
                var tmpPictures = $.parseJSON(servicepicturepromise.zahtev.responseText);
                _this.service = new service.Service(tmpService[0].servicename, tmpService[0].servicedescription, parseInt(tmpService[0].servicecategoryid), parseInt(tmpService[0].pageid), null, parseInt(tmpService[0].serviceid));
                _this.service.setServicePicture(tmpPictures);
                _this.populateServiceImages();
                _this.populateFormFileds();
            });
        };
        return ModifyService;
    }(serviceform.NewService));
    exports.ModifyService = ModifyService;
});
