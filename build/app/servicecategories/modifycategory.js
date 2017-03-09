var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './category', './newcategory', '../shared'], function (require, exports, category, categoryform, shared) {
    "use strict";
    var ModifyCategory = (function (_super) {
        __extends(ModifyCategory, _super);
        function ModifyCategory(categoryid) {
            var _this = this;
            if (categoryid === void 0) { categoryid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Kategoriju");
            this.pathroot = shared.picturePath;
            this.categoryid = categoryid;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyCategory" type="submit">Izmeni</button>' +
                '<button id="deleteCategory" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteCategory").click(function (e) {
                e.preventDefault();
                _this.deleteCategory();
            });
            this.formbuttons.find("#modifyCategory").click(function (e) {
                e.preventDefault();
                _this.modifyCategory();
            });
        }
        ModifyCategory.prototype.deleteCategory = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Kategoriju?', function () {
                var data = new FormData();
                data.append("ServiceCategoryId", _this.category.getCategoryId());
                var deletecategorypromise = _this.dbmodule.deleteCategoryAjax(data);
                deletecategorypromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Logo.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Loga.');
            });
        };
        ModifyCategory.prototype.modifyCategory = function () {
            var _this = this;
            var tmpCategory = new category.Category(this.categoryname.val(), this.categorydescription.val(), parseInt(this.page.val()), null, this.category.getCategoryId());
            if (this.category.compareCategory(tmpCategory)) {
                alertify.error("Nije izvršena nikakva promena.");
            }
            else {
                var modifycategorypromise = this.dbmodule.modifyCategoryAjax(tmpCategory.categoryToFormData());
                modifycategorypromise.zahtev.done(function () {
                    alertify.success("Uspesno ste promenili Kategoriju.");
                    _this.removeFormFromParent();
                });
            }
        };
        ModifyCategory.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        ModifyCategory.prototype.deleteImage = function (button, img) {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', function () {
                var data = new FormData();
                data.append("PicturePath", img.attr("src"));
                data.append("CategoryId", _this.category.getCategoryId());
                var deletepicture = _this.dbmodule.deleteCategoryPictureAjax(data);
                deletepicture.zahtev.done(function () {
                    _this.getServicePicture();
                    _this.populateFormFileds();
                    alertify.success('Uspešno ste obrisali sliku.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja slike.');
            });
        };
        //Mora drugaciji
        ModifyCategory.prototype.modifyImage = function (button, image, input) {
            var _this = this;
            console.log(input);
            var data = new FormData();
            data.append("CategoryId", this.category.getCategoryId());
            data.append("CategoryName", this.category.getCategoryName());
            data.append("OldPicture", this.category.getCategoryPictures());
            if (image.attr("src") != null) {
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var updateimage = this.dbmodule.updateSingleImgeAjax(data);
                updateimage.zahtev.done(function () {
                    _this.getServicePicture();
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
                    _this.getServicePicture();
                    alertify.success("Uspešno ste dodali sliku.");
                });
            }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModifyCategory.prototype.populateFormFileds = function () {
            this.categoryname.val(this.category.getCategoryName());
            this.page.val(this.category.getPageId());
            this.categorydescription.val(this.category.getCategoryDescription());
        };
        ModifyCategory.prototype.populateCategoryImages = function () {
            var _this = this;
            var pictures = this.category.getCategoryPictures();
            if (this.categorypicture != null && pictures != null) {
                var s = 0;
                var p = 0;
                $(this.categorypicture).each(function () {
                    $(_this.categorypicture[s]).removeAttr("src");
                    $(_this.categorypicture[s]).removeAttr("id");
                    $(_this.categorypicture[s]).parent().find(".updateButtons").remove();
                    $(_this.categorypicture[s]).parent().append("<span class='updateButtons'>" +
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
                        _this.modifyImage($(e.target), $(e.target).parentsUntil("div").find("img"), $(e.target).parentsUntil("div").find('input:file'));
                    });
                    $("#btUkloni" + s).hide();
                    $("#btIzmeni" + s).hide();
                    s++;
                });
                if (pictures) {
                    var url = window.location.origin + "\/" + this.pathroot + pictures;
                    $(this.categorypicture[p]).attr('src', url);
                    $("#btUkloni" + p).show();
                    p++;
                }
                ;
            }
        };
        ModifyCategory.prototype.getServicePicture = function () {
            var _this = this;
            var data = new FormData();
            data.append("CategoryId", this.categoryid.toString());
            var servicepicture = this.dbmodule.getCategoryPictureAjax(data);
            servicepicture.zahtev.done(function () {
                var picture = $.parseJSON(servicepicture.zahtev.responseText);
                _this.category.setCategoryPicture(picture[0].picturepath);
                _this.populateCategoryImages();
            });
        };
        //
        ModifyCategory.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("ServiceCategoryId", this.categoryid.toString());
            var categoryelementpromise = this.dbmodule.singleCategoryAjax(data);
            var tmppagespromise = this.dbmodule.getPagesAjax();
            var combainepromise = $.when(categoryelementpromise.zahtev, tmppagespromise.zahtev);
            combainepromise.done(function () {
                _this.getPagesDD($.parseJSON(tmppagespromise.zahtev.responseText));
                var tmpcategory = $.parseJSON(categoryelementpromise.zahtev.responseText);
                _this.category = new category.Category(tmpcategory[0].categoryname, tmpcategory[0].categorydescription, parseInt(tmpcategory[0].pageid), tmpcategory[0].picturepath, parseInt(tmpcategory[0].categoryid));
                _this.populateFormFileds();
                _this.populateCategoryImages();
            });
        };
        return ModifyCategory;
    }(categoryform.NewCategory));
    exports.ModifyCategory = ModifyCategory;
});
