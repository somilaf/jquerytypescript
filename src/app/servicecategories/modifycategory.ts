import categorydb = require("./categorydb");
import formval = require('../formval');
import category = require('./category');
import categoryform = require('./newcategory');
import shared = require('../shared');
export class ModifyCategory extends categoryform.NewCategory {
    dbmodule: categorydb.CategoryDB;
    private categoryid: number;
    private pathroot: string;
    constructor(categoryid = 0) {
        super();
        this.elementtitle.empty().append("Izmenite Kategoriju");
        this.pathroot = shared.picturePath;
        this.categoryid = categoryid;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyCategory" type="submit">Izmeni</button>' +
            '<button id="deleteCategory" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteCategory").click((e) => {
            e.preventDefault();
            this.deleteCategory();
        });
        this.formbuttons.find("#modifyCategory").click((e) => {
            e.preventDefault();
            this.modifyCategory();
        });

    }

    deleteCategory() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Kategoriju?', () => {
            var data = new FormData();
            data.append("ServiceCategoryId", this.category.getCategoryId());
            var deletecategorypromise = this.dbmodule.deleteCategoryAjax(data);
            deletecategorypromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Logo.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Loga.');
        });
    }

    modifyCategory() {
        var tmpCategory = new category.Category(
            this.categoryname.val(),
            this.categorydescription.val(),
            parseInt(this.page.val()),
            null,
            this.category.getCategoryId()
        );
        if (this.category.compareCategory(tmpCategory)) {
            alertify.error("Nije izvršena nikakva promena.");
        }
        else {
            var modifycategorypromise = this.dbmodule.modifyCategoryAjax(tmpCategory.categoryToFormData());
            modifycategorypromise.zahtev.done(() => {
                alertify.success("Uspesno ste promenili Kategoriju.");
                this.removeFormFromParent();
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
            data.append("PicturePath", img.attr("src"));
            data.append("CategoryId", this.category.getCategoryId());
            var deletepicture = this.dbmodule.deleteCategoryPictureAjax(data);
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
    //Mora drugaciji
    modifyImage(button, image, input) {
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
            updateimage.zahtev.done(() => {
                this.getServicePicture();
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
                this.getServicePicture();
                alertify.success("Uspešno ste dodali sliku.");
            });
        }
    }
    //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
    populateFormFileds() {
        this.categoryname.val(this.category.getCategoryName());
        this.page.val(this.category.getPageId());
        this.categorydescription.val(this.category.getCategoryDescription());
    }

    populateCategoryImages() {
        var pictures = this.category.getCategoryPictures();
        if (this.categorypicture != null && pictures != null) {
            var s = 0;
            var p = 0;
            $(this.categorypicture).each(() => {
                $(this.categorypicture[s]).removeAttr("src");
                $(this.categorypicture[s]).removeAttr("id");
                $(this.categorypicture[s]).parent().find(".updateButtons").remove();
                $(this.categorypicture[s]).parent().append(
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
                        $(e.target).parentsUntil("div").find('input:file'));
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
            };
        }
    }

    getServicePicture() {
        var data = new FormData();
        data.append("CategoryId", this.categoryid.toString());
        var servicepicture = this.dbmodule.getCategoryPictureAjax(data);
        servicepicture.zahtev.done(() => {
            var picture = $.parseJSON(servicepicture.zahtev.responseText);
            this.category.setCategoryPicture(picture[0].picturepath);
            this.populateCategoryImages();
        });
    }
    //

    fillForm() {
        var data = new FormData();
        data.append("ServiceCategoryId", this.categoryid.toString());
        var categoryelementpromise = this.dbmodule.singleCategoryAjax(data);
        var tmppagespromise = this.dbmodule.getPagesAjax();
        var combainepromise = $.when(categoryelementpromise.zahtev, tmppagespromise.zahtev);
        combainepromise.done(() => {
            this.getPagesDD($.parseJSON(tmppagespromise.zahtev.responseText));
            var tmpcategory = $.parseJSON(categoryelementpromise.zahtev.responseText);
            this.category = new category.Category(
                tmpcategory[0].categoryname,
                tmpcategory[0].categorydescription,
                parseInt(tmpcategory[0].pageid),
                tmpcategory[0].picturepath,
                parseInt(tmpcategory[0].categoryid)
            )
            this.populateFormFileds();
            this.populateCategoryImages();
        });
    }
}
