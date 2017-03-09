import formval = require('../formval');
import logo = require('./logo');
import logoform = require('./newlogo');
import shared = require('../shared')
export class ModifyLogo extends logoform.NewLogo {
    private logoid: number;
    private pathroot: string;
    constructor(logoid) {
        super();
         this.elementtitle.empty().append("Izmenite Logo");
        this.pathroot = shared.picturePath;
        this.logoid = logoid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyLogo" type="submit">Izmeni</button>' +
            '<button id="deleteLogo" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteLogo").click((e) => {
            e.preventDefault();
            this.deleteLogo();
        });
        this.formbuttons.find("#modifyLogo").click((e) => {
            e.preventDefault();
            this.modifyLogo();
        });
    }
    deleteLogo() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Logo?', () => {
            var data = new FormData();
            data.append("LogoId", this.logo.getLogoId());
            var deletelogopromise = this.dbmodule.deleteLogoAjax(data);
            deletelogopromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Logo.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Loga.');
        });
    }
    modifyLogo() {
        var tmpPageid = [];
        this.logopage.find(".selected").each(function () {
            tmpPageid.push({ "sitepageid": this.id });
        });
        if (this.newlogoform.valid()) {
            var tmpLogo = new logo.Logo(
                this.logoname.val(),
                this.logopicture.attr("src"),
                tmpPageid,
                this.logo.getLogoId()
            );
            var tmpPicturePath = this.logo.getLogoPicture();
            this.logo.setLogoPicture(window.location.origin + "\/" + this.pathroot + tmpPicturePath);
            //Proveravamo da li je nacinjena promena
            if (JSON.stringify(this.logo) !== JSON.stringify(tmpLogo)) {
                this.logo = tmpLogo;
                var modifylogopromise = this.dbmodule.modifyLogoAjax(this.logo.logoToFormData());
                modifylogopromise.zahtev.done(() => {
                    alertify.success("Uspesno ste promenili Logo.")
                });
            }
            else {
                this.logo.setLogoPicture(tmpPicturePath);
                alertify.error("Nije izvršena nikakva promena.")
            }
        }
    }

    getLogoPicture() {
        var data = new FormData();
        data.append("LogoId", this.logoid.toString());
        var logopicture = this.dbmodule.getLogoPictureAjax(data);
        logopicture.zahtev.done(() => {
            var picture = $.parseJSON(logopicture.zahtev.responseText);
            this.logo.setLogoPicture(picture[0].logofilepath);
            this.populateCategoryImages();
        });
    }

    populateCategoryImages() {
        var pictures = this.logo.getLogoPicture();
        if (this.logopicture != null && pictures != null) {
            var s = 0;
            var p = 0;
            $(this.logopicture).each(() => {
                $(this.logopicture[s]).removeAttr("src");
                $(this.logopicture[s]).removeAttr("id");
                $(this.logopicture[s]).parent().find(".updateButtons").remove();
                $(this.logopicture[s]).parent().append(
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
            if (pictures) {
                var url = window.location.origin + "\/" + this.pathroot + pictures;
                $(this.logopicture[p]).attr('src', url);
                $("#btUkloni" + p).show();
                p++;
            };
        }
    }

    deleteImage(button, img) {
        alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', () => {
            var data = new FormData();
            data.append("PicturePath", this.logo.getLogoPicture());
            data.append("LogoId", this.logo.getLogoId());
            var deletepicture = this.dbmodule.deleteLogoPictureAjax(data);
            deletepicture.zahtev.done(() => {
                this.getLogoPicture();
                this.populateFormFileds();
                alertify.success('Uspešno ste obrisali sliku.')
            });
        }
            , function () {
                alertify.error('Odustali ste od brisanja slike.')
            });
    }
    //Mora drugaciji
    modifyImage(button, image, input) {
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
            updateimage.zahtev.done(() => {
                this.getLogoPicture();
                alertify.success("Uspešno ste promenili sliku.");
            });
        }
        else {
            if (input.val() != "") {
                data.append("fModifyImage", input[0].files[0]);
            }
            var insertimage = this.dbmodule.updateSingleImgeAjax(data);
            insertimage.zahtev.done(() => {
                console.log("tu sam");
                this.getLogoPicture();
                alertify.success("Uspešno ste dodali sliku.");
            });
        }
    }

    modifyfillSitePageDD(pages, logopages) {
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
    populateFormFileds() {
        this.logoname.val(this.logo.getLogoName());
    }


    fillForm() {
        var data = new FormData();
        data.append("LogoId", this.logoid.toString());
        var logoementpromise = this.dbmodule.singleLogoAjax(data);
        var pagesdropdownpromise = this.dbmodule.getPagesDropDownAjax();
        var pageslogospromise = this.dbmodule.getPagesLogosAjax(data);
        var combinepromise = $.when(logoementpromise.zahtev, pagesdropdownpromise.zahtev, pageslogospromise.zahtev);
        combinepromise.done(() => {
            var tmpPagesLogos = $.parseJSON(pageslogospromise.zahtev.responseText);
            this.modifyfillSitePageDD(
                $.parseJSON(pagesdropdownpromise.zahtev.responseText),
                tmpPagesLogos);
            var tmpLogo = $.parseJSON(logoementpromise.zahtev.responseText);
            this.logo = new logo.Logo(
                tmpLogo[0].logoname,
                tmpLogo[0].logofilepath,
                tmpPagesLogos,
                tmpLogo[0].logoid
            )
            this.populateFormFileds();
            this.populateCategoryImages();
        });
    }

}