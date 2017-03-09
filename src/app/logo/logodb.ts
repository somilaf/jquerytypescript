import httprx = require('../httprq');
export class LogoDB {
    private serverLogoModulePath:string = "dumillogos/"
    newLogoAjax(logo: FormData) {
        var functionurl: string = this.serverLogoModulePath + "new_Logo_Ajax?" + Math.random();
        var newlogopromise = new httprx.DumilAjax(functionurl, logo);
        return newlogopromise;
    }

    deleteLogoAjax(logoid: FormData) {
        var functionurl: string = this.serverLogoModulePath + "delete_Logo_Ajax?" + Math.random();
        var deletelogopromise = new httprx.DumilAjax(functionurl, logoid);
        return deletelogopromise;
    }
    modifyLogoAjax(linkid:FormData) {
        var functionurl: string = this.serverLogoModulePath + "modify_Logo_Ajax?" + Math.random();
        var modifylogopromise = new httprx.DumilAjax(functionurl, linkid);
        return modifylogopromise;
    }
    //Ajax za dohvatanej svih Linkova iz Baze.
    allLogosAjax(): any {
        var functionurl: string = this.serverLogoModulePath + "get_AllLogo_Ajax?" + Math.random();
        var alllogospromise = new httprx.DumilAjax(functionurl);
        return alllogospromise;
    }

    singleLogoAjax(logoid): any {
        var functionurl: string = this.serverLogoModulePath + "get_SingleLogo_Ajax?" + Math.random();
        var singlelogopromise = new httprx.DumilAjax(functionurl, logoid);
        return singlelogopromise;
    }

    getPagesDropDownAjax(): any {
        var functionurl: string = "pagelinks/get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }
    getPagesLogosAjax(logoid: FormData): any {
        var functionurl: string = this.serverLogoModulePath + "get_PagesLogo_Ajax?" + Math.random();
        var pageslogospromise = new httprx.DumilAjax(functionurl, logoid);
        return pageslogospromise;
    }
    getLogoPictureAjax(logoid): any {
        var functionurl: string = this.serverLogoModulePath + "get_Picture_Path?" + Math.random();
        var picturepathpromise = new httprx.DumilAjax(functionurl, logoid);
        return picturepathpromise;
    }
    deleteLogoPictureAjax(data): any {
        var functionurl: string = this.serverLogoModulePath + "delete_Picture_Ajax?" + Math.random();
        var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
        return deleteimagepromise;
    }

    updateSingleImgeAjax(data): any {
        var functionurl: string = this.serverLogoModulePath + "update_Picture_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
}



