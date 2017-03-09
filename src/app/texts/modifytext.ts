import textdb = require("./textdb");
import formval = require('../formval');
import text = require('./text');
import textform = require('./newtext');
import shared = require('../shared');
export class ModifyText extends textform.NewText {
    dbmodule: textdb.TextDB;
    private textid: number;
    private pathroot: string;
    constructor(textid = 0) {
        super()
        this.elementtitle.empty().append("Izmenite Tekst");
        this.textid = textid;
        this.pathroot = shared.picturePath;
        this.formbuttons.empty();
        this.formbuttons.append(
            '<button id="modifyText" type="submit">Izmeni</button>' +
            '<button id="deleteText" type="submit">Obriši</button>'
        );
        this.formbuttons.find("#deleteText").click((e) => {
            e.preventDefault();
            this.deleteText();
        });
        this.formbuttons.find("#modifyText").click((e) => {
            e.preventDefault();
            this.modifyText();
        });

    }
    deleteText() {
        alertify.confirm('Dumil08', 'Da li želite da obrišete Tekst?', () => {
            var data = new FormData();
            data.append("TextContentId", this.text.getTextId());
            var deletetextpromise = this.dbmodule.deleteTextAjax(data);
            deletetextpromise.zahtev.done(() => {
                alertify.success('Uspešno ste obrisali Tekst.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od brisanja Teksta.');
        });

    }
    modifyText() {
        var tmpText = new text.Text
            (this.textname.val(),
            this.textlanguage.val(),
            this.texttext.val(),
            null,
            null,
            this.textid);
        if (this.text.compareText(tmpText)) {
            alertify.error("Nije izvršena nikakva promena.");
        }
        else {
            var modifytextpromise = this.dbmodule.modifyTextAjax(tmpText.textToFormData());
            modifytextpromise.zahtev.done(() => {
                alertify.success("Uspesno ste promenili Tekst.");
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
            data.append("TextContentId", this.text.getTextId());
            var deletepicture = this.dbmodule.deleteTextPictureAjax(data);
            deletepicture.zahtev.done(() => {
                this.getTextPictures();
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
        data.append("TextContentId", this.text.getTextId());
        if (image.attr("id") != null) {
            data.append("ImageId", image.attr("id"));
            if (input.val() != "") {
                data.append("fModifyImage", input[0].files[0]);
            }
            var updateimage = this.dbmodule.updateSingleImgeAjax(data);
            updateimage.zahtev.done(() => {
                this.getTextPictures();
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
                this.getTextPictures();
                alertify.success("Uspešno ste dodali sliku.");
            });
            console.log("Insert");
        }
    }
    //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
    populateFormFileds() {
        this.textname.val(this.text.getTextName());
        this.textlanguage.val(this.text.getTextLanguage());
        this.texttext.val(this.text.getTextContent());
    }

    populateTextImages() {
        var pictures = $(this.text.getTextPictures());
        var textid = this.text.getTextId();
        if (this.textimages != null && pictures != null) {
            var s = 0;
            var p = 0;
            $(this.textimages).each(() => {
                $(this.textimages[s]).removeAttr("src");
                $(this.textimages[s]).removeAttr("id");
                $(this.textimages[s]).parent().find(".updateButtons").remove();
                $(this.textimages[s]).parent().append(
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
                $(this.textimages[p]).attr('src', url);
                $(this.textimages[p]).attr('id', pictures[p].pictureid);
                $("#btUkloni" + p).show();
                p++;
            });
        }
    }

    getTextPictures() {
        var data = new FormData();
        data.append("TextContentId", this.textid.toString());
        var textpictures = this.dbmodule.getTextPicturesAjax(data);
        textpictures.zahtev.done(() => {
            var pictures = $.parseJSON(textpictures.zahtev.responseText);
            console.log(pictures);
            this.text.setTextPictures(pictures);
            this.populateTextImages();
        });
    }

    //
    fillForm() {
        var data = new FormData();
        data.append("TextContentId", this.textid.toString());
        var textelementpromise = this.dbmodule.singleTextAjax(data);
        var textpicturespromise = this.dbmodule.getTextPicturesAjax(data);
        var combinepromise = $.when(textelementpromise.zahtev, textpicturespromise.zahtev);
        combinepromise.done(() => {
            var tmpText = $.parseJSON(textelementpromise.zahtev.responseText);
            var tmpPictures = $.parseJSON(textpicturespromise.zahtev.responseText);
            this.text = new text.Text
                (tmpText[0].textname,
                tmpText[0].textlang,
                tmpText[0].text,
                null,
                null,
                parseInt(tmpText[0].textid));
            this.populateFormFileds();
            this.text.setTextPictures(tmpPictures);
            this.populateTextImages();
        });
    }

}