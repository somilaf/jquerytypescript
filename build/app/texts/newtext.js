define(["require", "exports", '../htmlcomponents/adminoption', "./textdb", '../formval', './text'], function (require, exports, adminoption, textdb, formval, text) {
    "use strict";
    var NewText = (function () {
        function NewText() {
            var _this = this;
            this.dbmodule = new textdb.TextDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("basicfile", { regfile: true });
            jQuery.validator.addClassRules("basicselect", { regselect: true });
            this.newtextobj = $('<div class="newOption" id="newOptionGallery">' +
                '<h4 title="New text FORM">Napravite novi tekstualni sadržaj</h4>' +
                '<section class="form">' +
                '<form id="newPageTextContent" name="newPageTextContent" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label for="TextContentName">Naziv Teksta:</label>' +
                '<input id="TextContentName" name="TextContentName" class="basictext" type="text"/>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="TextLanguage">Jezik:</label>' +
                '<select id="TextLanguage" name="TextLanguage" class="basicselect">' +
                '<option value="-1">Izaberite</option>' +
                '<option value="srb">Srpski</option>' +
                '<option value="eng">Engleski</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="TextContentText">Tekst:</label>' +
                '<textarea rows="5"  resize="false" id="TextContentText" name="TextContentText"></textarea>' +
                '</div>' +
                '<div class="inputgroup">'
                +
                    '<ul class="ulPictures">' +
                '<div class="col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                '<div class="col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image height="100%" ></image>' +
                '</li>' +
                '</div>' +
                ' </ul>' +
                '</div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="newText" type="submit">Dodaj</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>');
            this.newtextform = $(this.newtextobj).find('form');
            this.elementtitle = $(this.newtextobj).find("h4");
            this.textname = $(this.newtextform).find("#TextContentName");
            this.textlanguage = $(this.newtextform).find("#TextLanguage");
            this.texttext = $(this.newtextform).find("#TextContentText");
            this.textimages = $(this.newtextform).find(".ulPictures img");
            this.newtextform.find(".galleryimages").change(function (e) {
                var li = $(e.target.parentNode);
                var div = $(li.find('div'));
                var slika = $(li.find('img'));
                _this.readURL(slika, e.target);
                li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
            });
            this.formbuttons = $(this.newtextform).find("#formButtons");
            this.formbuttons.find("#newText").click(function (e) {
                e.preventDefault();
                _this.formSubmit();
            });
        }
        NewText.prototype.formSubmit = function () {
            if (this.newtextform.valid()) {
                var tmpText = new text.Text(this.textname.val(), this.textlanguage.val(), this.texttext.val(), this.newtextform.find(".galleryimages"), null, null);
                var data = tmpText.imagesToFormData(tmpText.textToFormData());
                var newtextpromise = this.dbmodule.newTextAjax(data);
                newtextpromise.zahtev.done(function () {
                    alertify.success("Uspešno ste kreirali novu Tekst.");
                });
            }
        };
        NewText.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        NewText.prototype.fillForm = function () { };
        NewText.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newtextobj));
        };
        NewText.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Tekstovi Admin", "Text");
            $(tmpAdminOption.option).trigger("click");
        };
        return NewText;
    }());
    exports.NewText = NewText;
});
