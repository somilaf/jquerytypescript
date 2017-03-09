define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var TextDB = (function () {
        function TextDB() {
            this.serverMenuModulePath = "textcontent/";
        }
        TextDB.prototype.newTextAjax = function (text) {
            var functionurl = this.serverMenuModulePath + "new_TextContent_Ajax?" + Math.random();
            var newtextpromise = new httprx.DumilAjax(functionurl, text);
            return newtextpromise;
        };
        TextDB.prototype.deleteTextAjax = function (textid) {
            var functionurl = this.serverMenuModulePath + "delete_TextContent_Ajax?" + Math.random();
            var deletetextpromise = new httprx.DumilAjax(functionurl, textid);
            return deletetextpromise;
        };
        TextDB.prototype.modifyTextAjax = function (textid) {
            var functionurl = this.serverMenuModulePath + "modify_TextContent_Ajax?" + Math.random();
            var modifytextpromise = new httprx.DumilAjax(functionurl, textid);
            return modifytextpromise;
        };
        TextDB.prototype.allTextsAjax = function () {
            var functionurl = this.serverMenuModulePath + "get_AllTextContents_Ajax?" + Math.random();
            var allmenuesspromise = new httprx.DumilAjax(functionurl);
            return allmenuesspromise;
        };
        TextDB.prototype.singleTextAjax = function (textid) {
            var functionurl = this.serverMenuModulePath + "get_SingleTextContent_Ajax?" + Math.random();
            var gallerypromise = new httprx.DumilAjax(functionurl, textid);
            return gallerypromise;
        };
        TextDB.prototype.getTextPicturesAjax = function (galleryid) {
            var functionurl = this.serverMenuModulePath + "get_Picture_Paths?" + Math.random();
            var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
            return picturepathpromise;
        };
        TextDB.prototype.deleteTextPictureAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "delete_SingleImage_Ajax?" + Math.random();
            var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
            return deleteimagepromise;
        };
        TextDB.prototype.updateSingleImgeAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "update_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        TextDB.prototype.insertSingleImgeAjax = function (data) {
            var functionurl = this.serverMenuModulePath + "insert_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        TextDB.prototype.getPagesAjax = function () {
            var functionurl = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        TextDB.prototype.getTextPosition = function (pageid) {
            var functionurl = this.serverMenuModulePath + "get_TextPosition_DropDown?" + Math.random();
            var textpositionpromise = new httprx.DumilAjax(functionurl, pageid);
            return textpositionpromise;
        };
        TextDB.prototype.getPageText = function (pageposition) {
            var functionurl = this.serverMenuModulePath + "get_Text?" + Math.random();
            var textpositionpromise = new httprx.DumilAjax(functionurl, pageposition);
            return textpositionpromise;
        };
        TextDB.prototype.removeTextFromPage = function (pagetextposition) {
            var functionurl = this.serverMenuModulePath + "remove_TextFromPage_Ajax?" + Math.random();
            var textpositionpromise = new httprx.DumilAjax(functionurl, pagetextposition);
            return textpositionpromise;
        };
        TextDB.prototype.showTextOnPage = function (pagetextposition) {
            var functionurl = this.serverMenuModulePath + "insert_Page_Text_Ajax?" + Math.random();
            var textpositionpromise = new httprx.DumilAjax(functionurl, pagetextposition);
            return textpositionpromise;
        };
        return TextDB;
    }());
    exports.TextDB = TextDB;
});
