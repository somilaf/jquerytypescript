var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './text', './newtext', '../shared'], function (require, exports, text, textform, shared) {
    "use strict";
    var ModifyText = (function (_super) {
        __extends(ModifyText, _super);
        function ModifyText(textid) {
            var _this = this;
            if (textid === void 0) { textid = 0; }
            _super.call(this);
            this.elementtitle.empty().append("Izmenite Tekst");
            this.textid = textid;
            this.pathroot = shared.picturePath;
            this.formbuttons.empty();
            this.formbuttons.append('<button id="modifyText" type="submit">Izmeni</button>' +
                '<button id="deleteText" type="submit">Obriši</button>');
            this.formbuttons.find("#deleteText").click(function (e) {
                e.preventDefault();
                _this.deleteText();
            });
            this.formbuttons.find("#modifyText").click(function (e) {
                e.preventDefault();
                _this.modifyText();
            });
        }
        ModifyText.prototype.deleteText = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete Tekst?', function () {
                var data = new FormData();
                data.append("TextContentId", _this.text.getTextId());
                var deletetextpromise = _this.dbmodule.deleteTextAjax(data);
                deletetextpromise.zahtev.done(function () {
                    alertify.success('Uspešno ste obrisali Tekst.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od brisanja Teksta.');
            });
        };
        ModifyText.prototype.modifyText = function () {
            var tmpText = new text.Text(this.textname.val(), this.textlanguage.val(), this.texttext.val(), null, null, this.textid);
            if (this.text.compareText(tmpText)) {
                alertify.error("Nije izvršena nikakva promena.");
            }
            else {
                var modifytextpromise = this.dbmodule.modifyTextAjax(tmpText.textToFormData());
                modifytextpromise.zahtev.done(function () {
                    alertify.success("Uspesno ste promenili Tekst.");
                });
            }
        };
        ModifyText.prototype.readURL = function ($image, input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', reader.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        ModifyText.prototype.deleteImage = function (button, img) {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da obrišete sliku?', function () {
                var data = new FormData();
                data.append("ImageId", img.attr("id"));
                data.append("TextContentId", _this.text.getTextId());
                var deletepicture = _this.dbmodule.deleteTextPictureAjax(data);
                deletepicture.zahtev.done(function () {
                    _this.getTextPictures();
                    _this.populateFormFileds();
                    alertify.success('Uspešno ste obrisali sliku.');
                });
            }, function () {
                alertify.error('Odustali ste od brisanja slike.');
            });
        };
        ModifyText.prototype.modifyImage = function (button, image, input) {
            var _this = this;
            console.log(input);
            var data = new FormData();
            data.append("TextContentId", this.text.getTextId());
            if (image.attr("id") != null) {
                data.append("ImageId", image.attr("id"));
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var updateimage = this.dbmodule.updateSingleImgeAjax(data);
                updateimage.zahtev.done(function () {
                    _this.getTextPictures();
                    alertify.success("Uspešno ste promenili sliku.");
                });
                console.log("Update " + image.attr("id"));
            }
            else {
                if (input.val() != "") {
                    data.append("fModifyImage", input[0].files[0]);
                }
                var insertimage = this.dbmodule.insertSingleImgeAjax(data);
                insertimage.zahtev.done(function () {
                    console.log("tu sam");
                    _this.getTextPictures();
                    alertify.success("Uspešno ste dodali sliku.");
                });
                console.log("Insert");
            }
        };
        //Metoda za populaciju polja forme na osnovu objekta kreiranog iz baze
        ModifyText.prototype.populateFormFileds = function () {
            this.textname.val(this.text.getTextName());
            this.textlanguage.val(this.text.getTextLanguage());
            this.texttext.val(this.text.getTextContent());
        };
        ModifyText.prototype.populateTextImages = function () {
            var _this = this;
            var pictures = $(this.text.getTextPictures());
            var textid = this.text.getTextId();
            if (this.textimages != null && pictures != null) {
                var s = 0;
                var p = 0;
                $(this.textimages).each(function () {
                    $(_this.textimages[s]).removeAttr("src");
                    $(_this.textimages[s]).removeAttr("id");
                    $(_this.textimages[s]).parent().find(".updateButtons").remove();
                    $(_this.textimages[s]).parent().append("<span class='updateButtons'>" +
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
                $(pictures).each(function () {
                    var url = window.location.origin + "\/" + _this.pathroot + pictures[p].picturepath;
                    $(_this.textimages[p]).attr('src', url);
                    $(_this.textimages[p]).attr('id', pictures[p].pictureid);
                    $("#btUkloni" + p).show();
                    p++;
                });
            }
        };
        ModifyText.prototype.getTextPictures = function () {
            var _this = this;
            var data = new FormData();
            data.append("TextContentId", this.textid.toString());
            var textpictures = this.dbmodule.getTextPicturesAjax(data);
            textpictures.zahtev.done(function () {
                var pictures = $.parseJSON(textpictures.zahtev.responseText);
                console.log(pictures);
                _this.text.setTextPictures(pictures);
                _this.populateTextImages();
            });
        };
        //
        ModifyText.prototype.fillForm = function () {
            var _this = this;
            var data = new FormData();
            data.append("TextContentId", this.textid.toString());
            var textelementpromise = this.dbmodule.singleTextAjax(data);
            var textpicturespromise = this.dbmodule.getTextPicturesAjax(data);
            var combinepromise = $.when(textelementpromise.zahtev, textpicturespromise.zahtev);
            combinepromise.done(function () {
                var tmpText = $.parseJSON(textelementpromise.zahtev.responseText);
                var tmpPictures = $.parseJSON(textpicturespromise.zahtev.responseText);
                _this.text = new text.Text(tmpText[0].textname, tmpText[0].textlang, tmpText[0].text, null, null, parseInt(tmpText[0].textid));
                _this.populateFormFileds();
                _this.text.setTextPictures(tmpPictures);
                _this.populateTextImages();
            });
        };
        return ModifyText;
    }(textform.NewText));
    exports.ModifyText = ModifyText;
});
