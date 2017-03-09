import httprx = require('../httprq');
export class TextDB {
    private serverMenuModulePath = "textcontent/";
    newTextAjax(text): any {
        var functionurl: string = this.serverMenuModulePath + "new_TextContent_Ajax?" + Math.random();
        var newtextpromise = new httprx.DumilAjax(functionurl, text);
        return newtextpromise;
    }
    deleteTextAjax(textid): any {
        var functionurl: string = this.serverMenuModulePath + "delete_TextContent_Ajax?" + Math.random();
        var deletetextpromise = new httprx.DumilAjax(functionurl, textid);
        return deletetextpromise;
    }
    modifyTextAjax(textid): any {
        var functionurl: string = this.serverMenuModulePath + "modify_TextContent_Ajax?" + Math.random();
        var modifytextpromise = new httprx.DumilAjax(functionurl, textid);
        return modifytextpromise;
    }
    allTextsAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "get_AllTextContents_Ajax?" + Math.random();
        var allmenuesspromise = new httprx.DumilAjax(functionurl);
        return allmenuesspromise;
    }
    singleTextAjax(textid): any {
        var functionurl: string = this.serverMenuModulePath + "get_SingleTextContent_Ajax?" + Math.random();
        var gallerypromise = new httprx.DumilAjax(functionurl, textid);
        return gallerypromise;
    }
    getTextPicturesAjax(galleryid): any {
        var functionurl: string = this.serverMenuModulePath + "get_Picture_Paths?" + Math.random();
        var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
        return picturepathpromise;
    }

    deleteTextPictureAjax(data): any {
        var functionurl: string = this.serverMenuModulePath + "delete_SingleImage_Ajax?" + Math.random();
        var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
        return deleteimagepromise;
    }

    updateSingleImgeAjax(data): any {
        var functionurl: string = this.serverMenuModulePath + "update_SingleImage_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
    insertSingleImgeAjax(data): any {
        var functionurl: string = this.serverMenuModulePath + "insert_SingleImage_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
    getPagesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }
    getTextPosition(pageid): any {
        var functionurl: string = this.serverMenuModulePath + "get_TextPosition_DropDown?" + Math.random();
        var textpositionpromise = new httprx.DumilAjax(functionurl, pageid);
        return textpositionpromise;
    }
    getPageText(pageposition): any {
        var functionurl: string = this.serverMenuModulePath + "get_Text?" + Math.random();
        var textpositionpromise = new httprx.DumilAjax(functionurl, pageposition);
        return textpositionpromise;
    }
    removeTextFromPage(pagetextposition) {
        var functionurl: string = this.serverMenuModulePath + "remove_TextFromPage_Ajax?" + Math.random();
        var textpositionpromise = new httprx.DumilAjax(functionurl, pagetextposition);
        return textpositionpromise;
    }
    showTextOnPage(pagetextposition) {
        var functionurl: string = this.serverMenuModulePath + "insert_Page_Text_Ajax?" + Math.random();
        var textpositionpromise = new httprx.DumilAjax(functionurl, pagetextposition);
        return textpositionpromise;
    }

}



