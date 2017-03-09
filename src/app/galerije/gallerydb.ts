import httprx = require('../httprq');
export class GalleryDB {
    private serverGalleryModulePath = "galleries/";
    newGalleryAjax(gallery) {
        var functionurl: string = this.serverGalleryModulePath + "new_Gallery_Ajax?" + Math.random();
        var newgallerypromise = new httprx.DumilAjax(functionurl, gallery);
        return newgallerypromise;
    }
    deleteGalleryAjax(galleryid) {
        var functionurl: string = this.serverGalleryModulePath + "delete_Gallery_Ajax?" + Math.random();
        var deletegallerypromise = new httprx.DumilAjax(functionurl, galleryid);
        return deletegallerypromise;
    }
    modifyGalleryAjax(galleryid) {
        var functionurl: string = this.serverGalleryModulePath + "modify_Gallery_Ajax?" + Math.random();
        var modifygallerypromise = new httprx.DumilAjax(functionurl, galleryid);
        return modifygallerypromise;
    }
    allGalleriesAjax(): any {
        var functionurl: string = this.serverGalleryModulePath + "allGalleriesAjax?" + Math.random();
        var allmenuesspromise = new httprx.DumilAjax(functionurl);
        return allmenuesspromise;
    }
    singleGalleryAjax(galleryid): any {
        var functionurl: string = this.serverGalleryModulePath + "get_Galleries_Ajax?" + Math.random();
        var gallerypromise = new httprx.DumilAjax(functionurl, galleryid);
        return gallerypromise;
    }
    getGalleriePicturesAjax(galleryid): any {
        var functionurl: string = this.serverGalleryModulePath + "get_Picture_Paths?" + Math.random();
        var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
        return picturepathpromise;
    }

    deleteGalleryPictureAjax(data): any {
        var functionurl: string = this.serverGalleryModulePath + "delete_SingleImage_Ajax?" + Math.random();
        var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
        return deleteimagepromise;
    }

    updateSingleImgeAjax(data): any {
        var functionurl: string = this.serverGalleryModulePath + "update_SingleImage_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
    insertSingleImgeAjax(data): any {
        var functionurl: string = this.serverGalleryModulePath + "insert_SingleImage_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
    getPagesAjax(): any {
        var functionurl: string = this.serverGalleryModulePath + "get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }
    removeGalleryFromPage(pagegallery) {
        var functionurl: string = this.serverGalleryModulePath + "remove_GalleryPage_Ajax?" + Math.random();
        var pagegallerypromise = new httprx.DumilAjax(functionurl, pagegallery);
        return pagegallerypromise;
    }
    showGalleryOnPage(pagegallery) {
        var functionurl: string = this.serverGalleryModulePath + "add_GalleryPage_Ajax?" + Math.random();
        var pagegallerypromise = new httprx.DumilAjax(functionurl, pagegallery);
        return pagegallerypromise;
    }
}



