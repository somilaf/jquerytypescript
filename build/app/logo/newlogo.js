define(["require", "exports", '../htmlcomponents/adminoption', './logodb', '../formval', './logo'], function (require, exports, adminoption, logodb, formval, logo) {
    "use strict";
    var NewLogo = (function () {
        function NewLogo() {
            var _this = this;
            this.dbmodule = new logodb.LogoDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("basicfile", { regfile: true });
            jQuery.validator.addClassRules("basicselect", { regselect: true });
            this.newLogoobj = $('<div class="newOption" id="newOptionLogo">' +
                '<h4>Napravite novi Logo</h4>' +
                '<section class="form">' +
                '<form id="PageLogo" name="PageLogo" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label>Izaberite Sliku:</label>' +
                '<ul class="ulPictures">' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image></image>' +
                '</li>' +
                '</div>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label>Naziv:</label>' +
                '<input id="LogoName" name="LogoName" class="basictext" type="text" />' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="modifyLinkPosition">Postavite Logo na Stranice:</label>' +
                '<ul id="LogoPage" name="LogoPage"class="sortable inlinelist"></ul>' +
                '</div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="newLogo" type="submit">Dodaj</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>');
            this.newlogoform = $(this.newLogoobj).find('form');
            this.elementtitle = $(this.newLogoobj).find("h4");
            this.logoname = this.newlogoform.find("#LogoName");
            this.logopage = this.newlogoform.find("#LogoPage");
            this.logopicture = $(this.newlogoform).find(".ulPictures img");
            this.newlogoform.find(".galleryimages").change(function (e) {
                var li = $(e.target.parentNode);
                var div = $(li.find('div'));
                var slika = $(li.find('img'));
                _this.readURL(slika, e.target);
                li.parent().attr("id", "ulPictures") ? li.find(".btIzmeni").show() : console.log("false");
            });
            this.formbuttons = $(this.newlogoform).find("#formButtons");
            this.formbuttons.find("#newLogo").click(function (e) {
                e.preventDefault();
                _this.formSubmit();
            });
        }
        NewLogo.prototype.formSubmit = function () {
            var tmpPageid = [];
            this.logopage.find(".selected").each(function () {
                tmpPageid.push({ "sitepageid": this.id });
            });
            if (this.newlogoform.valid()) {
                var tmpLogo = new logo.Logo(this.logoname.val(), this.newlogoform.find(".galleryimages")[0].files[0], tmpPageid, null);
                var newpgepromise = this.dbmodule.newLogoAjax(tmpLogo.logoToFormData());
                newpgepromise.zahtev.done(function () {
                    alertify.success("Uspešno ste kreirali novi Logo.");
                });
            }
        };
        NewLogo.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        NewLogo.prototype.fillSitePageDD = function (pages) {
            if (pages) {
                for (var p in pages) {
                    this.logopage.append("<li id='" + pages[p].sitepageid + "'><a href='#'>" + pages[p].sitepagename + "</a></li>");
                }
                this.logopage.find("li").click(function (e) {
                    e.preventDefault();
                    $(this).toggleClass("selected");
                });
            }
        };
        ;
        NewLogo.prototype.fillForm = function () {
            var _this = this;
            var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
            pagesdropdownpromise.zahtev.done(function () {
                _this.fillSitePageDD($.parseJSON(pagesdropdownpromise.zahtev.responseText));
            });
        };
        NewLogo.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newLogoobj));
        };
        NewLogo.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Logo Admin", "Logo");
            $(tmpAdminOption.option).trigger("click");
        };
        return NewLogo;
    }());
    exports.NewLogo = NewLogo;
});
