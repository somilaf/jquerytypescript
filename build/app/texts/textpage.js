define(["require", "exports", '../htmlcomponents/adminoption', '../htmlcomponents/range', "./textdb", '../formval', './text'], function (require, exports, adminoption, range, textdb, formval, text) {
    "use strict";
    var TextPage = (function () {
        function TextPage() {
            var _this = this;
            this.dbmodule = new textdb.TextDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("newlogoname", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("fnewlogofile", { regfile: true });
            jQuery.validator.addClassRules("newlogopage", { regselect: true });
            this.newtextpageobj = $('<div class="newOption" id="newOptionGallery">' +
                '<h4 title="New text FORM">Povžite tekstove sa Web Stranama</h4>' +
                '<section class="form">' +
                '<form id="advancePageTextContent" name="advancePageTextContent" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label for="TextPage">Izaberite Stranicu:</label>' +
                '<select id="TextPage" name="TextPage" class="newpageselect">' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="TextPosition">Pozicija Teksta:</label>' +
                '<select id="TextPosition" name="TextPosition" class="newpageselect" disabled>' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="row"><div id="TextPreview" class="col-wd-12"></div></div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="modifyText" type="submit">Prikaži</button>' +
                '<button id="deleteText" type="submit">Ukloni</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '<div class="row"><div id="TextRange" class="rangeStyling col-wd-12"></div></div>' +
                '</div>');
            this.newtextpageform = this.newtextpageobj.find("form");
            this.textpreview = this.newtextpageobj.find("#TextPreview");
            this.rangecontainer = this.newtextpageobj.find("#TextRange");
            this.page = this.newtextpageform.find("#TextPage");
            this.textposition = this.newtextpageform.find("#TextPosition");
            this.formbuttons = this.newtextpageform.find("#formButtons");
            this.formbuttons.find("#modifyText").hide();
            this.formbuttons.hide();
            this.rangecontainer.hide();
            this.page.change(function (e) {
                e.preventDefault();
                if ($(e.target).val() !== "-1") {
                    _this.getTextPosition();
                }
                else {
                    _this.textposition.val("-1");
                    _this.textposition.prop("disabled", true);
                }
            });
            this.textposition.change(function (e) {
                e.preventDefault();
                if ($(e.target).val() !== "-1") {
                    _this.getText();
                    _this.formbuttons.show();
                    _this.rangecontainer.show();
                }
                else {
                    _this.rangecontainer.hide();
                    _this.formbuttons.hide();
                }
            });
            this.formbuttons.find("#deleteText").click(function (e) {
                e.preventDefault();
                _this.removeTextfromPage();
            });
            this.formbuttons.find("#modifyText").click(function (e) {
                e.preventDefault();
                _this.showTextonPage();
            });
        }
        TextPage.prototype.showTextonPage = function () {
            var data = new FormData();
            data.append("TextId", this.text.getTextId());
            data.append("TextPosition", this.textposition.val());
            data.append("PageId", this.page.val());
            var showtextpromise = this.dbmodule.showTextOnPage(data);
            showtextpromise.zahtev.done(function () {
                alertify.success("Uspešno ste dodali Tekst na Web Stranu.");
            });
        };
        TextPage.prototype.removeTextfromPage = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da uklonite Tekst sa Web Strane?', function () {
                var data = new FormData();
                data.append("TextId", _this.text.getTextId());
                data.append("TextPosition", _this.textposition.val());
                data.append("PageId", _this.page.val());
                var deletetextpromise = _this.dbmodule.removeTextFromPage(data);
                deletetextpromise.zahtev.done(function () {
                    alertify.success('Uspešno ste uklonili Tekst.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od promene Teksta.');
            });
        };
        TextPage.prototype.getText = function () {
            var _this = this;
            var data = new FormData();
            data.append("PageId", this.page.val());
            data.append("TextPosition", this.textposition.val());
            var textpromise = this.dbmodule.getPageText(data);
            textpromise.zahtev.done(function () {
                var tmpText = $.parseJSON(textpromise.zahtev.responseText);
                _this.createText(tmpText);
            });
        };
        TextPage.prototype.createText = function (pagetext) {
            if (typeof pagetext[0] != 'undefined') {
                this.text = new text.Text(pagetext[0].textname, pagetext[0].textlang, pagetext[0].text, null, this.textposition.val(), pagetext[0].textid);
                this.textpreview.empty();
                this.textpreview.hide();
                var paragrafs = this.text.getTextContent().split("$$");
                this.textpreview.append("<h3>" + this.text.getTextName() + "</h3>");
                for (var p in paragrafs) {
                    this.textpreview.append("<p>" + paragrafs[p] + "</p>");
                }
                this.textpreview.slideDown();
            }
            else {
                this.textpreview.empty();
                this.formbuttons.hide();
                alertify.error("Tekst za ovu poziciju nije izabran.");
            }
        };
        TextPage.prototype.getTextPosition = function () {
            var _this = this;
            this.textposition.prop("disabled", false);
            var data = new FormData();
            console.log(this.page.val());
            data.append("PageId", this.page.val());
            var textpositionpromise = this.dbmodule.getTextPosition(data);
            textpositionpromise.zahtev.done(function () {
                var textpositions = $.parseJSON(textpositionpromise.zahtev.responseText);
                _this.fillTextPositionDD(textpositions);
            });
        };
        TextPage.prototype.fillTextPositionDD = function (textpositions) {
            var _this = this;
            if (textpositions) {
                this.textposition.children().not(":eq(0)").remove();
                var p = 0;
                $(textpositions).each(function () {
                    _this.textposition.append("<option value='" + (p + 1) + "'>" + textpositions[p] + "</option>");
                    p++;
                });
            }
        };
        TextPage.prototype.fillPagesDD = function (pages) {
            var _this = this;
            if (pages) {
                var p = 0;
                $(pages).each(function () {
                    _this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                    p++;
                });
            }
        };
        TextPage.prototype.fillForm = function () {
            var _this = this;
            var allpagespromise = this.dbmodule.getPagesAjax();
            var alltextspromise = this.dbmodule.allTextsAjax();
            var combinepromise = $.when(allpagespromise.zahtev, alltextspromise.zahtev);
            combinepromise.done(function () {
                _this.fillPagesDD($.parseJSON(allpagespromise.zahtev.responseText));
                _this.range = new range.RangeDumil08("Odaberite novi tekst za izabranu poziciju.", $.parseJSON(alltextspromise.zahtev.responseText), _this.setText, null, _this);
                _this.range.createInParent(_this.rangecontainer, true);
            });
        };
        TextPage.prototype.setText = function (textcontentid, object) {
            if (textcontentid === void 0) { textcontentid = null; }
            if (object === void 0) { object = null; }
            if (textcontentid && object) {
                var data = new FormData();
                data.append("TextContentId", textcontentid.toString());
                var textelementpromise = object.dbmodule.singleTextAjax(data);
                textelementpromise.zahtev.done(function () {
                    var tmpText = $.parseJSON(textelementpromise.zahtev.responseText);
                    object.createText(tmpText);
                    object.formbuttons.slideDown();
                    object.formbuttons.find("#modifyText").show();
                });
            }
        };
        TextPage.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newtextpageobj));
        };
        TextPage.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Tekstovi Admin", "Text");
            $(tmpAdminOption.option).trigger("click");
        };
        return TextPage;
    }());
    exports.TextPage = TextPage;
});
