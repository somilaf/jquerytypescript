import httprx = require('../httprq');
export class CategoryDB {
    private serverMenuModulePath = "servicecategories/";

    newCategoryAjax(category): any {
        var functionurl: string = this.serverMenuModulePath + "new_ServiceCategory_Ajax?" + Math.random();
        var newcategorypromise = new httprx.DumilAjax(functionurl, category);
        return newcategorypromise;
    }
    deleteCategoryAjax(categoryid): any {
        var functionurl: string = this.serverMenuModulePath + "delete_ServiceCategory_Ajax?" + Math.random();
        var deletecategorypromise = new httprx.DumilAjax(functionurl, categoryid);
        return deletecategorypromise;
    }
    modifyCategoryAjax(categoryid): any {
        var functionurl: string = this.serverMenuModulePath + "modify_ServiceCategory_Ajax?" + Math.random();
        var modifycategorypromise = new httprx.DumilAjax(functionurl, categoryid);
        return modifycategorypromise;
    }
    allCategoriesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "all_Categories_Ajax?" + Math.random();
        var allmenuesspromise = new httprx.DumilAjax(functionurl);
        return allmenuesspromise;
    }
    singleCategoryAjax(textid): any {
        var functionurl: string = this.serverMenuModulePath + "get_SingleServiceCategory_Ajax?" + Math.random();
        var gallerypromise = new httprx.DumilAjax(functionurl, textid);
        return gallerypromise;
    }
    getCategoryPictureAjax(galleryid): any {
        var functionurl: string = this.serverMenuModulePath + "get_Picture_Path?" + Math.random();
        var picturepathpromise = new httprx.DumilAjax(functionurl, galleryid);
        return picturepathpromise;
    }

    getPagesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }

    deleteCategoryPictureAjax(data): any {
        var functionurl: string = this.serverMenuModulePath + "delete_Picture_Ajax?" + Math.random();
        var deleteimagepromise = new httprx.DumilAjax(functionurl, data);
        return deleteimagepromise;
    }

    updateSingleImgeAjax(data): any {
        var functionurl: string = this.serverMenuModulePath + "update_Picture_Ajax?" + Math.random();
        var updateimagepromise = new httprx.DumilAjax(functionurl, data);
        return updateimagepromise;
    }
    getParentLinksAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "getFirstRowLinksAjax?" + Math.random();
        var parentlinkspromise = new httprx.DumilAjax(functionurl);
        return parentlinkspromise;
    }
    getChildrenLinks(parentlinkid): any {
        var functionurl: string = "pagelinks/fill_DropDownList_Ajax?" + Math.random();
        var childrenlinkspromise = new httprx.DumilAjax(functionurl, parentlinkid);
        return childrenlinkspromise;
    }
    buildMenu(links): any {
        var functionurl: string = this.serverMenuModulePath + "loadSiteMapMeni?" + Math.random();
        var menupromise = new httprx.DumilAjax(functionurl, links);
        return menupromise;
    }

}



