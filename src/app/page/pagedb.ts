import httprx = require('../httprq');
export class PagesDB {
    private serverLogoModulePath = "pages/";

    newPageAjax(page: FormData) {
        var functionurl: string = this.serverLogoModulePath + "new_WebPage_Ajax?" + Math.random();
        var newpagepromise = new httprx.DumilAjax(functionurl, page);
        return newpagepromise;
    }

    //Ajax za azurianje izmena Web Stranica
    modifyPageAjax(page: FormData): any {
        var functionurl: string = this.serverLogoModulePath + "modify_WebPage_Ajax?" + Math.random();;
        var modifyWebPagePromise = new httprx.DumilAjax(functionurl, page);
        return modifyWebPagePromise;
    }

    //Ajax za brisanje postojece Web Strane
    deletePageAjax(pageid: FormData): any {
        var functionurl: string = this.serverLogoModulePath + "delete_WebPage_Ajax?" + Math.random();;
        var modifyWebPagePromise = new httprx.DumilAjax(functionurl, pageid);
        return modifyWebPagePromise;
    }

    //Ajax za dohvatanej svih Web Stranica iz Baze.
    allSitePagesAjax(): any {
        var functionurl: string = this.serverLogoModulePath + "allSitePagesAjax?" + Math.random();
        var allpagespromise = new httprx.DumilAjax(functionurl);
        return allpagespromise;
    }
    //Ajax za dohvatanje jedne kompletne Web Stranice iz baze
    singleSitePageAjax(pageid): any {
        var functionurl: string = this.serverLogoModulePath + "get_SingleWebPage_Ajax?" + Math.random();
        var singlepagepromise = new httprx.DumilAjax(functionurl, pageid);
        return singlepagepromise;
    }

    //Ajax za dohvatanje svih tipova Web Stranica iz Baze.
    sitePageTypesAjax(): any {
        var functionurl: string = this.serverLogoModulePath + "getSitePageTypesAjax?" + Math.random();
        var axlinks = new httprx.DumilAjax(functionurl);
        return axlinks;
    }




}



