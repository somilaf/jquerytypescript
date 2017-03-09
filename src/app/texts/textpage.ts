import adminoption = require('../htmlcomponents/adminoption');
import range = require('../htmlcomponents/range');
import textdb = require("./textdb");
import formval = require('../formval');
import text = require('./text');
export class TextPage {
    protected dbmodule: textdb.TextDB;
    protected text: text.Text;
    protected page: JQuery;
    protected textposition: JQuery;
    private textpreview: JQuery;
    private range: range.RangeDumil08;
    private rangecontainer: JQuery
    private newtextpageobj: any;
    protected newtextpageform: any;
    private formval: formval.FormVal;
    protected formbuttons: JQuery;
    constructor() {
        this.dbmodule = new textdb.TextDB;
        this.formval = new formval.FormVal();
        jQuery.validator.addClassRules("newlogoname", { required: true, regnaziv: true });
        jQuery.validator.addClassRules("fnewlogofile", { regfile: true });
        jQuery.validator.addClassRules("newlogopage", { regselect: true });
        this.newtextpageobj = $(
            '<div class="newOption" id="newOptionGallery">' +
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
            '</div>'
        );
        this.newtextpageform = this.newtextpageobj.find("form");
        this.textpreview = this.newtextpageobj.find("#TextPreview");
        this.rangecontainer = this.newtextpageobj.find("#TextRange");
        this.page = this.newtextpageform.find("#TextPage");
        this.textposition = this.newtextpageform.find("#TextPosition");
        this.formbuttons = this.newtextpageform.find("#formButtons");
        this.formbuttons.find("#modifyText").hide();
        this.formbuttons.hide();
        this.rangecontainer.hide();
        this.page.change((e) => {
            e.preventDefault();
            if ($(e.target).val() !== "-1") {
                this.getTextPosition();
            }
            else {
                this.textposition.val("-1");
                this.textposition.prop("disabled", true);
            }
        });
        this.textposition.change((e) => {
            e.preventDefault();
            if ($(e.target).val() !== "-1") {
                this.getText();
                this.formbuttons.show();
                this.rangecontainer.show();
            }
            else {
                this.rangecontainer.hide();
                this.formbuttons.hide();
            }
        });
        this.formbuttons.find("#deleteText").click((e) => {
            e.preventDefault();
            this.removeTextfromPage();
        });
        this.formbuttons.find("#modifyText").click((e) => {
            e.preventDefault();
            this.showTextonPage();
        });
    }
    showTextonPage() {
        var data = new FormData();
        data.append("TextId", this.text.getTextId());
        data.append("TextPosition", this.textposition.val());
        data.append("PageId", this.page.val());
        var showtextpromise = this.dbmodule.showTextOnPage(data);
        showtextpromise.zahtev.done(function () {
            alertify.success("Uspešno ste dodali Tekst na Web Stranu.");
        });
    }
    removeTextfromPage() {
        alertify.confirm('Dumil08', 'Da li želite da uklonite Tekst sa Web Strane?', () => {
            var data = new FormData();
            data.append("TextId", this.text.getTextId());
            data.append("TextPosition", this.textposition.val());
            data.append("PageId", this.page.val());
            var deletetextpromise = this.dbmodule.removeTextFromPage(data);
            deletetextpromise.zahtev.done(() => {
                alertify.success('Uspešno ste uklonili Tekst.')
                this.removeFormFromParent();
            })
        }, function () {
            alertify.error('Odustali ste od promene Teksta.');
        });
    }
    getText() {
        var data = new FormData();
        data.append("PageId", this.page.val());
        data.append("TextPosition", this.textposition.val());
        var textpromise = this.dbmodule.getPageText(data);
        textpromise.zahtev.done(() => {
            var tmpText = $.parseJSON(textpromise.zahtev.responseText);
            this.createText(tmpText);
        });
    }
    createText(pagetext) {
        if (typeof pagetext[0] != 'undefined') {
            this.text = new text.Text(
                pagetext[0].textname,
                pagetext[0].textlang,
                pagetext[0].text,
                null,
                this.textposition.val(),
                pagetext[0].textid
            );
            this.textpreview.empty();
            this.textpreview.hide();
            var paragrafs = this.text.getTextContent().split("$$")
            this.textpreview.append("<h3>" + this.text.getTextName() + "</h3>");
            for (var p in paragrafs) {
                this.textpreview.append("<p>" + paragrafs[p] + "</p>")
            }
            this.textpreview.slideDown();
        }
        else {
            this.textpreview.empty();
            this.formbuttons.hide();
            alertify.error("Tekst za ovu poziciju nije izabran.");
        }
    }
    getTextPosition() {
        this.textposition.prop("disabled", false);
        var data = new FormData();
        console.log(this.page.val());
        data.append("PageId", this.page.val());
        var textpositionpromise = this.dbmodule.getTextPosition(data);
        textpositionpromise.zahtev.done(() => {
            var textpositions = $.parseJSON(textpositionpromise.zahtev.responseText);
            this.fillTextPositionDD(textpositions);
        });
    }
    fillTextPositionDD(textpositions) {
        if (textpositions) {
            this.textposition.children().not(":eq(0)").remove();
            var p = 0;
            $(textpositions).each(() => {
                this.textposition.append("<option value='" + (p + 1) + "'>" + textpositions[p] + "</option>");
                p++;
            });
        }
    }
    fillPagesDD(pages) {
        if (pages) {
            var p = 0;
            $(pages).each(() => {
                this.page.append("<option value='" + pages[p].sitepageid + "'>" + pages[p].sitepagename + "</option>");
                p++;
            });
        }
    }
    protected fillForm() {
        var allpagespromise = this.dbmodule.getPagesAjax();
        var alltextspromise = this.dbmodule.allTextsAjax();
        var combinepromise = $.when(allpagespromise.zahtev, alltextspromise.zahtev);
        combinepromise.done(() => {
            this.fillPagesDD($.parseJSON(allpagespromise.zahtev.responseText));
            this.range = new range.RangeDumil08(
                "Odaberite novi tekst za izabranu poziciju.",
                $.parseJSON(alltextspromise.zahtev.responseText),
                this.setText,
                null,
                this
            )
            this.range.createInParent(this.rangecontainer, true);
        });
    }
    setText(textcontentid = null, object: TextPage = null): any {
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
    }
    createFormInParent(parent, parentempty: boolean = true) {
        parentempty === true ? parent.empty() : false;
        this.fillForm();
        parent.append($(this.newtextpageobj));
    }
    protected removeFormFromParent() {
        var tmpAdminOption = new adminoption.AdminOption("Tekstovi Admin", "Text");
        $(tmpAdminOption.option).trigger("click");
    }

}