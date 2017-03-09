define(["require", "exports", '../htmlcomponents/adminoption', "./servicedb", '../formval', './service'], function (require, exports, adminoption, servicedb, formval, service) {
    "use strict";
    var NewService = (function () {
        function NewService() {
            var _this = this;
            this.dbmodule = new servicedb.ServiceDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("basictext", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("basicfile", { regfile: true });
            jQuery.validator.addClassRules("basicselect", { regselect: true });
            this.newserviceobj = $('<div class="newOption" id="newOptionCategory">' +
                '<h4 title="New service FORM">Napravite novu uslugu</h4>' +
                '<section class="form">' +
                '<form id="newService" name="newService" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label>Izaberite Sliku:</label>' +
                '<ul class="ulPictures">' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image></image>' +
                '</li>' +
                '</div>' +
                '<div class=" col-wd-4 col-md-6 col-sm-12">' +
                '<li>' +
                '<input type="file" class="galleryimages" name="galleryimages" multiple="multiple" />' +
                '<image></image>' +
                '</li>' +
                '</div>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="ServiceName">Naziv Usluge:</label>' +
                '<input id="ServiceName" name="ServiceName" class="basictext" type="text"/>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="ServiceCategory">U Kategoriji Usluga:</label>' +
                '<select id="ServiceCategory" name="ServicePage" class="basicselect">' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="ServicePage">Za Stranicu:</label>' +
                '<select id="ServicePage" name="ServicePage" class="basicselect">' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="ServiceDescription">Opis Usluge:</label>' +
                '<textarea rows="5"  resize="false" id="ServceDescription" name="ServceDescription"></textarea>' +
                '</div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="newCategory" type="submit">Dodaj</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>');
            this.newserviceform = $(this.newserviceobj).find('form');
            this.elementtitle = $(this.newserviceobj).find("h4");
            this.servicename = $(this.newserviceform).find("#ServiceName");
            this.servicepicture = $(this.newserviceform).find(".ulPictures img");
            this.page = $(this.newserviceform).find("#ServicePage");
            this.category = $(this.newserviceform).find("#ServiceCategory");
            this.servicedescription = $(this.newserviceform).find("#ServceDescription");
            this.formbuttons = $(this.newserviceform).find("#formButtons");
            this.newserviceform.find(".galleryimages").change(function (e) {
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
        NewService.prototype.formSubmit = function () {
            if (this.newserviceform.valid()) {
                var tmpService = new service.Service(this.servicename.val(), this.servicedescription.val(), this.category.val(), this.page.val(), this.newserviceform.find(".galleryimages"), null);
                var data = tmpService.imagesToFormData(tmpService.serviceToFormData());
                var newservicepromise = this.dbmodule.newServiceAjax(data);
                newservicepromise.zahtev.done(function () {
                    alertify.success("Uspešno ste kreirali novu Uslugu.");
                });
            }
        };
        NewService.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        NewService.prototype.getCategoryDD = function (categories) {
            var _this = this;
            if (categories) {
                var p = 0;
                $(categories).each(function () {
                    _this.category.append("<option value='" + categories[p].categoryid + "'>" + categories[p].categoryname + "</option>");
                    p++;
                });
            }
        };
        NewService.prototype.getPagesDD = function (pages) {
            var _this = this;
            if (pages) {
                var p = 0;
                $(pages).each(function () {
                    _this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                    p++;
                });
            }
        };
        NewService.prototype.fillForm = function () {
            var _this = this;
            var categoriespromise = this.dbmodule.getCategoriesAjax();
            var pagespromise = this.dbmodule.getPagesAjax();
            var combinepromise = $.when(categoriespromise.zahtev, pagespromise.zahtev);
            combinepromise.done(function () {
                _this.getCategoryDD($.parseJSON(categoriespromise.zahtev.responseText));
                _this.getPagesDD($.parseJSON(pagespromise.zahtev.responseText));
            });
        };
        NewService.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newserviceobj));
        };
        NewService.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Usluge Admin", "Service");
            ;
            $(tmpAdminOption.option).trigger("click");
        };
        return NewService;
    }());
    exports.NewService = NewService;
});
