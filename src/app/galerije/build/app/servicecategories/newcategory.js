define(["require", "exports", '../htmlcomponents/adminoption', "./categorydb", '../formval', './category'], function (require, exports, adminoption, categorydb, formval, category) {
    "use strict";
    var NewCategory = (function () {
        function NewCategory() {
            var _this = this;
            this.dbmodule = new categorydb.CategoryDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("basicfile", { regfile: true });
            jQuery.validator.addClassRules("basicselect", { regselect: true });
            this.newcategoryobj = $('<div class="newOption" id="newOptionCategory">' +
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
                '<image height="100%" ></image>' +
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
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>');
            this.newcategoryform = $(this.newcategoryobj).find('form');
            this.categoryname = $(this.newcategoryform).find("#CategoryName");
            this.categorypicture = $(this.newcategoryform).find(".ulPictures img");
            this.page = $(this.newcategoryform).find("#CategoryPage");
            this.categorydescription = $(this.newcategoryform).find("#CategoryDescription");
            this.formbuttons = this.newcategoryform.find("#formButtons");
            this.newcategoryform.find(".galleryimages").change(function (e) {
                var li = $(e.target.parentNode);
                var div = $(li.find('div'));
                var slika = $(li.find('img'));
                _this.readURL(slika, e.target);
                li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
            });
            this.formbuttons.find("#newCategory").click(function (e) {
                e.preventDefault();
                _this.formSubmit();
            });
        }
        NewCategory.prototype.formSubmit = function () {
            if (this.newcategoryform.valid()) {
                var tmpCategory = new category.Category(this.categoryname.val(), this.categorydescription.val(), this.page.val(), this.newcategoryform.find(".galleryimages")[0].files[0], null);
                var newcategorypromise = this.dbmodule.newCategoryAjax(tmpCategory.categoryToFormData());
                newcategorypromise.zahtev.done(function () {
                    alertify.success("Uspešno ste kreirali novi Logo.");
                });
            }
        };
        NewCategory.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        NewCategory.prototype.getPagesDD = function (pages) {
            var _this = this;
            if (pages) {
                var p = 0;
                $(pages).each(function () {
                    _this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                    p++;
                });
            }
        };
        NewCategory.prototype.fillForm = function () {
            var _this = this;
            var pagespromise = this.dbmodule.getPagesAjax();
            pagespromise.zahtev.done(function () {
                var pages = $.parseJSON(pagespromise.zahtev.responseText);
                _this.getPagesDD(pages);
            });
        };
        NewCategory.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newcategoryobj));
        };
        NewCategory.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Kategorije Admin", "Category");
            $(tmpAdminOption.option).trigger("click");
        };
        return NewCategory;
    }());
    exports.NewCategory = NewCategory;
});
