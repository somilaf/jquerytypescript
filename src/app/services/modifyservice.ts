import servicedb = require("./servicedb");
import formval = require('../formval');
import service = require('./service');
import serviceform = require('./newservice');
import shared = require('../shared');
export class ModifyService extends serviceform.NewService {
    private serviceid: number;
    private pathroot: string;
    constructor(serviceid = 0) {
        super();
        this.pathroot = shared.picturePath;
        this.elementtitle.empty().append("Izmenite Uslugu");
        this.serviceid = serviceid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyService" type="submit">Izmeni</button>' +
            '<button id="deleteService" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteService").click((e) => {
            e.preventDefault();
            this.deleteService();
        });
        this.formbuttons.find("#modifyService").click((e) => {
            e.preventDefault();
            this.modifyService();
        });

    }
    deleteService() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Uslugu?', () => {
            var data = new FormData();
            data.append("ServiceId", this.service.getServiceId());
            var deleteservicepromise = this.dbmodule.deleteServiceAjax(data);
            deleteservicepromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Galeriju.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Galerije.');
        });
    }
    modifyService() {
        var tmpService = new service.Service(
            this.servicename.val(),
            this.servicedescription.val(),
            parseInt(this.category.val()),
            parseInt(this.page.val()),
            null,
            this.serviceid
        );
        if (this.service.compareService(tmpService)) {
            alertify.error("Nije izvršena nikakva promena.");
        }
        else {
            var modifyservicepromise = this.dbmodule.modifyServiceAjax(tmpService.serviceToFormData());
            modifyservicepromise.zahtev.done(() => {
                alertify.success("Uspesno ste promenili Uslugu.");
            });
        }
    }
    readURL($image, input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $image.attr('src', reader.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    deleteImage(button, img) {
        alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', () => {
            var data = new FormData();
            data.append("ImageId", img.attr("id"));
            data.append("ServiceId", this.service.getServiceId());
            var deletepicture = this.dbmodule.delete_SingleImage_Ajax(data);
            deletepicture.zahtev.done(() => {
                this.getServicePicture();
                this.populateFormFileds();
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
        data.append("ServiceId", this.service.getServiceId());
        if (image.attr("id") != null) {
            data.append("ImageId", image.attr("id"));
            if (input.val() != "") {
                data.append("fModifyImage", input[0].files[0]);
            }
            var updateimage = this.dbmodule.updateSingleImgeAjax(data);
            updateimage.zahtev.done(() => {
                this.getServicePicture();
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
                this.getServicePicture();
                alertify.success("Uspešno ste dodali sliku.");
            });
            console.log("Insert");
        }
    }
    //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
    populateFormFileds() {
        this.servicename.val(this.service.getServiceName());
        this.category.val(this.service.getCategoryId().toString());
        this.page.val(this.service.getPageId().toString());
        this.servicedescription.val(this.service.getServiceDescription());
    }

    populateServiceImages() {
        var pictures = $(this.service.getServicePicture());
        if (this.servicepicture != null && pictures != null) {
            var s = 0;
            var p = 0;
            $(this.servicepicture).each(() => {
                $(this.servicepicture[s]).removeAttr("src");
                $(this.servicepicture[s]).removeAttr("id");
                $(this.servicepicture[s]).parent().find(".updateButtons").remove();
                $(this.servicepicture[s]).parent().append(
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
            $(pictures).each(() => {
                var url = window.location.origin + "\/" + this.pathroot + pictures[p].picturepath;
                $(this.servicepicture[p]).attr('src', url);
                $(this.servicepicture[p]).attr('id', pictures[p].pictureid);
                $("#btUkloni" + p).show();
                p++;
            });
        }
    }

    getServicePicture() {
        var data = new FormData();
        data.append("ServiceId", this.serviceid.toString());
        var servicepicture = this.dbmodule.getServicePictureAjax(data);
        servicepicture.zahtev.done(() => {
            var picture = $.parseJSON(servicepicture.zahtev.responseText);
            this.service.setServicePicture(picture);
            this.populateServiceImages();
        });
    }

    modifyGallery() {
        var tmppictures = [];
        $(this.servicepicture).each(function () {
            if ($(this).attr("id") !== undefined && $(this).attr("src") !== undefined) {
                var slika = { "pictureid": $(this).attr("id"), "picturepath": $(this).attr("src") };
                tmppictures.push(slika);
            }
        });
        var tmpService = new service.Service(
            this.servicename.val(),
            this.servicedescription.val(),
            parseInt(this.category.val()),
            parseInt(this.page.val()),
            tmppictures,
            this.serviceid)


        if (!this.text.compareGallery(tmpText)) {
            console.log("Update");
        }
        else {
            alertify.confirm('Confirm Title', 'Confirm Message', function () {
                console.log("Milos");
                alertify.success('Ok')
            }
                , function () { alertify.error('Cancel') });

        }
    }

    fillForm() {
        var data = new FormData();
        data.append("ServiceId", this.serviceid.toString());
        var serviceelementpromise = this.dbmodule.singleServiceAjax(data);
        var categoriespromise = this.dbmodule.getCategoriesAjax();
        var pagespromise = this.dbmodule.getPagesAjax();
        var servicepicturepromise = this.dbmodule.getServicePictureAjax(data);
        var combinepromise = $.when(
            serviceelementpromise.zahtev,
            categoriespromise.zahtev,
            pagespromise.zahtev,
            servicepicturepromise.zahtev);
        combinepromise.done(() => {
            this.getCategoryDD($.parseJSON(categoriespromise.zahtev.responseText));
            this.getPagesDD($.parseJSON(pagespromise.zahtev.responseText));
            var tmpService = $.parseJSON(serviceelementpromise.zahtev.responseText);
            var tmpPictures = $.parseJSON(servicepicturepromise.zahtev.responseText);
            this.service = new service.Service(
                tmpService[0].servicename,
                tmpService[0].servicedescription,
                parseInt(tmpService[0].servicecategoryid),
                parseInt(tmpService[0].pageid),
                null,
                parseInt(tmpService[0].serviceid));
            this.service.setServicePicture(tmpPictures);
            this.populateServiceImages();
            this.populateFormFileds();
        });
    }

}