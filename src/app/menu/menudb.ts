import httprx = require('../httprq');
export class MenuDB {
    private serverMenuModulePath = "sitemenues/";
    newSiteMenuAjax(menu): any {
        var functionurl: string = this.serverMenuModulePath + "new_Menu_Ajax?" + Math.random();
        var allmenuesspromise = new httprx.DumilAjax(functionurl, menu);
        return allmenuesspromise;
    }
    deleteSiteMenuAjax(menuid): any {
        var functionurl: string = this.serverMenuModulePath + "delete_Menu_Ajax?" + Math.random();
        var deletemenuespromise = new httprx.DumilAjax(functionurl, menuid);
        return deletemenuespromise;
    }
    modifySiteMenuAjax(menuid): any {
        var functionurl: string = this.serverMenuModulePath + "modify_Menu_Ajax?" + Math.random();
        var modifymenuespromise = new httprx.DumilAjax(functionurl, menuid);
        return modifymenuespromise;
    }
    allSiteMenuesAjax(): any {
        var functionurl: string = this.serverMenuModulePath + "allMenuesAjax?" + Math.random();
        var allmenuesspromise = new httprx.DumilAjax(functionurl);
        return allmenuesspromise;
    }
    singleSiteMenuAjax(menuid): any {
        var functionurl: string = this.serverMenuModulePath + "get_CompleteMenu_Ajax?" + Math.random();
        var childrenlinkspromise = new httprx.DumilAjax(functionurl, menuid);
        return childrenlinkspromise;
    }
    getMenuPagesAjax(menuid): any {
        var functionurl: string = this.serverMenuModulePath + "get_Pages_Menu_Ajax?" + Math.random();
        var menupagespromise = new httprx.DumilAjax(functionurl, menuid);
        return menupagespromise;
    }

    getPagesDropDownAjax(): any {
        var functionurl: string = "pagelinks/get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
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
    getMenuLinks(menuid): any {
        var functionurl: string = this.serverMenuModulePath + "get_MenuLinksAjax?" + Math.random();
        var menulinkspromise = new httprx.DumilAjax(functionurl, menuid);
        return menulinkspromise;
    }
    getPageMenuLinks(menupageposition): any {
        var functionurl: string = this.serverMenuModulePath + "get_PageMenuLinksAjax?" + Math.random();
        var menulinkspromise = new httprx.DumilAjax(functionurl, menupageposition);
        return menulinkspromise;
    }
    getMenuByPosition(menuposition): any {
        var functionurl: string = this.serverMenuModulePath + "getMenuByPositionAjax?" + Math.random();
        var menuespromise = new httprx.DumilAjax(functionurl, menuposition);
        return menuespromise;
    }
    removePageMenu(pageposition): any {
        var functionurl: string = this.serverMenuModulePath + "delete_Page_Menu_Ajax?" + Math.random();
        var menuespromise = new httprx.DumilAjax(functionurl, pageposition);
        return menuespromise;
    }
    showPageMenu(pagemenu): any {
        var functionurl: string = this.serverMenuModulePath + "modify_Page_Menu_Ajax?" + Math.random();
        var menuespromise = new httprx.DumilAjax(functionurl, pagemenu);
        return menuespromise;
    }

}



