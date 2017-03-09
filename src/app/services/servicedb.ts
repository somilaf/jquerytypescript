import httprx = require('../httprq');
export class ServiceDB {
    private serverMenuModulePath = "services/";
    newServiceAjax(service): any {
        var functionurl: string = this.serverMenuModulePath + "new_Service_Ajax?" + Math.random();
        var newservicespromise = new httprx.DumilAjax(functionurl, service);
        return newservicespromise;
    }
    deleteServiceAjax(serviceid): any {
        var functionurl: string = this.serverMenuModulePath + "delete_Service_Ajax?" + Math.random();
        var deleteservicespromise = new httprx.DumilAjax(functionurl, serviceid);
        return deleteservicespromise;
    }
    modifyServiceAjax(serviceid): any {
        var functionurl: string = this.serverMenuModulePath + "modify_Service_Ajax?" + Math.random();
        var modifyservicespromise = new httprx.DumilAjax(functionurl, serviceid);
        return modifyservicespromise;
    }

    allServicessAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "all_Services_Ajax?" + Math.random();
        var allservicespromise = new httprx.DumilAjax(functionurl);
        return allservicespromise;
    }
    singleServiceAjax(serviceid): any {
        var functionurl: string = this.serverMenuModulePath + "get_SingleService_Ajax?" + Math.random();
        var servicepromise = new httprx.DumilAjax(functionurl, serviceid);
        return servicepromise;
    }
    getServicePictureAjax(serviceid): any {
        var functionurl: string = this.serverMenuModulePath + "get_Picture_Paths?" + Math.random();
        var picturepathpromise = new httprx.DumilAjax(functionurl, serviceid);
        return picturepathpromise;
    }
    getCategoriesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "get_Categories_DropDown?" + Math.random();
        var allcategoriespromise = new httprx.DumilAjax(functionurl);
        return allcategoriespromise;
    }
    getPagesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }

    delete_SingleImage_Ajax(data): any {
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

}



