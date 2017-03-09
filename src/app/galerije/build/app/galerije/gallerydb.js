define(["require", "exports", '../httprq'], function (require, exports, httprx) {
    "use strict";
    var GalleryDB = (function () {
        function GalleryDB() {
            this.serverGalleryModulePath = "galleries/";
        }
        GalleryDB.prototype.newGalleryAjax = function (gallery) {
            var functionurl = this.serverGalleryModulePath + "new_Gallery_Ajax?" + Math.random();
            var newgallerypromise = new httprx.DumilAjax(functionurl, gallery);
            return newgallerypromise;
        };
        GalleryDB.prototype.deleteGalleryAjax = function (galleryid) {
            var functionurl = this.serverGalleryModulePath + "delete_Gallery_Ajax?" + Math.random();
            var deletegallerypromise = new httprx.DumilAjax(functionurl, galleryid);
            return deletegallerypromise;
        };
        GalleryDB.prototype.modifyGalleryAjax = function (galleryid) {
            var functionurl = this.serverGalleryModulePath + "modify_Gallery_Ajax?" + Math.random();
            var modifygallerypromise = new httprx.DumilAjax(functionurl, galleryid);
            return modifygallerypromise;
        };
        GalleryDB.prototype.allGalleriesAjax = function () {
            var functionurl = this.serverGalleryModulePath + "allGalleriesAjax?" + Math.random();
            var allmenuesspromise = new httprx.DumilAjax(functionurl);
            return allmenuesspromise;
        };
        GalleryDB.prototype.singleGalleryAjax = function (galleryid) {
            var functionurl = this.serverGalleryModulePath + "get_Galleries_Ajax?" + Math.random();
            var gallerypromise = new httprx.DumilAjax(functionurl, galleryid);
            return gallerypromise;
        };
        GalleryDB.prototype.getGalleriePicturesAjax = function (galleryid) {
            var functionurl = this.serverGalleryModulePath + "get_Picture_Paths?" + Math.random();
            var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
            return picturepathpromise;
        };
        GalleryDB.prototype.deleteGalleryPictureAjax = function (data) {
            var functionurl = this.serverGalleryModulePath + "delete_SingleImage_Ajax?" + Math.random();
            var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
            return deleteimagepromise;
        };
        GalleryDB.prototype.updateSingleImgeAjax = function (data) {
            var functionurl = this.serverGalleryModulePath + "update_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        GalleryDB.prototype.insertSingleImgeAjax = function (data) {
            var functionurl = this.serverGalleryModulePath + "insert_SingleImage_Ajax?" + Math.random();
            var updateimagepromise = new httprx.DumilAjax(functionurl, data);
            return updateimagepromise;
        };
        GalleryDB.prototype.getPagesAjax = function () {
            var functionurl = this.serverGalleryModulePath + "get_Pages_DropDown?" + Math.random();
            var pagespromise = new httprx.DumilAjax(functionurl);
            return pagespromise;
        };
        GalleryDB.prototype.removeGalleryFromPage = function (pagegallery) {
            var functionurl = this.serverGalleryModulePath + "remove_GalleryPage_Ajax?" + Math.random();
            var pagegallerypromise = new httprx.DumilAjax(functionurl, pagegallery);
            return pagegallerypromise;
        };
        GalleryDB.prototype.showGalleryOnPage = function (pagegallery) {
            var functionurl = this.serverGalleryModulePath + "add_GalleryPage_Ajax?" + Math.random();
            var pagegallerypromise = new httprx.DumilAjax(functionurl, pagegallery);
            return pagegallerypromise;
        };
        return GalleryDB;
    }());
    exports.GalleryDB = GalleryDB;
});
