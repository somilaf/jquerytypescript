var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './logo', './newlogo', '../shared'], function (require, exports, logo, logoform, shared) {
    "use strict";
    var ModifyLogo = (function (_super) {
        __extends(ModifyLogo, _super);
        function ModifyLogo(logoid) {
            var _this = this;
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Logo");
            this.pathroot = shared.picturePath;
            this.logoid = logoid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyLogo" type="submit">Izmeni</button>' +
                '<button id="deleteLogo" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteLogo").click(function (e) {
                e.preventDefault();
                _this.deleteLogo();
            });
            this.formbuttons.find("#modifyLogo").click(function (e) {
                e.preventDefault();
                _this.modifyLogo();
            });
        }
        ModifyLogo.prototype.deleteLogo = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Logo?', function () {
                var data = new FormData();
                data.append("LogoId", _this.logo.getLogoId());
                var deletelogopromise = _this.dbmodule.deleteLogoAjax(data);
                deletelogopromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Logo.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Loga.');
            });
        };
        ModifyLogo.prototype.modifyLogo = function () {
            var tmpPageid = [];
            this.logopage.find(".selected").each(function () {
                tmpPageid.push({ "sitepageid": this.id });
            });
            if (this.newlogoform.valid()) {
                var tmpLogo = new logo.Logo(this.logoname.val(), this.logopicture.attr("src"), tmpPageid, this.logo.getLogoId());
                var tmpPicturePath = this.logo.getLogoPicture();
                this.logo.setLogoPicture(window.location.origin + "\/" + this.pathroot + tmpPicturePath);
                //Proveravamo da li je nacinjena promena
                if (JSON.stringify(this.logo) !== JSON.stringify(tmpLogo)) {
                    this.logo = tmpLogo;
                    var modifylogopromise = this.dbmodule.modifyLogoAjax(this.logo.logoToFormData());
                    modifylogopromise.zahtev.done(function () {
                        alertify.success("Uspesno ste promenili Logo.");
                    });
                }
                else {
                    this.logo.setLogoPicture(tmpPicturePath);
                    alertify.error("Nije izvršena nikakva promena.");
                }
            }
        };
        ModifyLogo.prototype.getLogoPicture = function () {
            var _this = this;
            var data = new FormData();
            data.append("LogoId", this.logoid.toString());
            var logopicture = this.dbmodule.getLogoPictureAjax(data);
            logopicture.zahtev.done(function () {
                var picture = $.parseJSON(logopicture.zahtev.responseText);
                _this.logo.setLogoPicture(picture[0].logofilepath);
                _this.populateCategoryImages();
            });
        };
        ModifyLogo.prototype.populateCategoryImages = function () {
            var _this = this;
            var pictures = this.logo.getLogoPicture();
            if (this.logopicture != null && pictures != null) {
                var s = 0;
                var p = 0;
                $(this.logopicture).each(function () {
                    $(_this.logopicture[s]).removeAttr("src");
                    $(_this.logopicture[s]).removeAttr("id");
                    $(_this.logopicture[s]).parent().find(".updateButtons").remove();
                    $(_this.logopicture[s]).parent().append("<span class='updateButtons'>" +
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
                    var url = window.location.origin + "\/" + this.pathroot + pictures;
                    $(this.logopicture[p]).attr('src', url);
                    $("#btUkloni" + p).show();
                    p++;
                }
                ;
            }
        };
        ModifyLogo.prototype.deleteImage = function (button, img) {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', function () {
                var data = new FormData();
                data.append("PicturePath", _this.logo.getLogoPicture());
                data.append("LogoId", _this.logo.getLogoId());
                var deletepicture = _this.dbmodule.deleteLogoPictureAjax(data);
                deletepicture.zahtev.done(function () {
                    _this.getLogoPicture();
                    _this.populateFormFileds();
                    alertify.success('Uspešno ste obrisali sliku.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja slike.');
            });
        };
        //Mora drugaciji
        ModifyLogo.prototype.modifyImage = function (button, image, input) {
            var _this = this;
            console.log(input);
            var data = new FormData();
            data.append("LogoId", this.logo.getLogoId());
            data.append("LogoName", this.logo.getLogoName());
            data.append("OldPicture", this.logo.getLogoPicture());
            console.log(this.logo.getLogoPicture());
            if (image.attr("src") != null) {
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var updateimage = this.dbmodule.updateSingleImgeAjax(data);
                updateimage.zahtev.done(function () {
                    _this.getLogoPicture();
                    alertify.success("Uspešno ste promenili sliku.");
                });
            }
            else {
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var insertimage = this.dbmodule.updateSingleImgeAjax(data);
                insertimage.zahtev.done(function () {
                    console.log("tu sam");
                    _this.getLogoPicture();
                    alertify.success("Uspešno ste dodali sliku.");
                });
            }
        };
        ModifyLogo.prototype.modifyfillSitePageDD = function (pages, logopages) {
            if (pages) {
                for (var p in pages) {
                    this.logopage.append("<li id='" + pages[p].sitepageid + "'><a href='#'>" + pages[p].sitepagename + "</a></li>");
                    for (var lp in logopages) {
                        if (pages[p].sitepageid == logopages[lp].sitepageid) {
                            this.logopage.find("#" + pages[p].sitepageid).addClass("selected");
                            break;
                        }
                    }
                }
                this.logopage.find("li").click(function (e) {
                    e.preventDefault();
                    $(this).toggleClass("selected");
                });
            }
        };
        ;
        ModifyLogo.prototype.populateFormFileds = function () {
            this.logoname.val(this.logo.getLogoName());
        };
        ModifyLogo.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("LogoId", this.logoid.toString());
            var logoementpromise = this.dbmodule.singleLogoAjax(data);
            var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
            var pageslogospromise = this.dbmodule.getPagesLogosAjax(data);
            var combinepromise = $.when(logoementpromise.zahtev, pagesdropdownpromise.zahtev, pageslogospromise.zahtev);
            combinepromise.done(function () {
                var tmpPagesLogos = $.parseJSON(pageslogospromise.zahtev.responseText);
                _this.modifyfillSitePageDD($.parseJSON(pagesdropdownpromise.zahtev.responseText), tmpPagesLogos);
                var tmpLogo = $.parseJSON(logoementpromise.zahtev.responseText);
                _this.logo = new logo.Logo(tmpLogo[0].logoname, tmpLogo[0].logofilepath, tmpPagesLogos, tmpLogo[0].logoid);
                _this.populateFormFileds();
                _this.populateCategoryImages();
            });
        };
        return ModifyLogo;
    }(logoform.NewLogo));
    exports.ModifyLogo = ModifyLogo;
});
