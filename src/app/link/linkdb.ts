import httprx = require('../httprq');
export class LinkDB {
    private serverLinkModulePath = "pagelinks/"

    //Ajax za dohvatanje pojedinacnog Linka iz Baze.
    singleSiteLinkAjax(linkid): any {
        var functionurl: string = this.serverLinkModulePath + "get_SingleLink_Ajax?" + Math.random();
        var singlelinkpromise = new httprx.DumilAjax(functionurl, linkid);
        return singlelinkpromise;
    }

    //

    //Ajax za dohvatanej svih Linkova iz Baze.
    allSiteLinksAjax(): any {
        var functionurl: string = this.serverLinkModulePath + "allLinksAjax?" + Math.random();
        var allpagespromise = new httprx.DumilAjax(functionurl);
        return allpagespromise;
    }

    getPagesDropDownAjax(): any {
        var functionurl: string = this.serverLinkModulePath + "get_Pages_DropDown?" + Math.random();
        var pagespromise = new httprx.DumilAjax(functionurl);
        return pagespromise;
    }

    getParentLinksAjax() {
        var functionurl: string = this.serverLinkModulePath + "get_ParentLinks_Ajax?" + Math.random();
        var parentlinkspromise = new httprx.DumilAjax(functionurl);
        return parentlinkspromise;
    }

    getChildrenLinkAjax(parentlinkid) {
        var functionurl: string = this.serverLinkModulePath + "fill_DropDownList_Ajax?" + Math.random();
        var childrenlinkspromise = new httprx.DumilAjax(functionurl, parentlinkid);
        return childrenlinkspromise;
    }
    newLinkAjax(link) {
        var functionurl: string = this.serverLinkModulePath + "new_Link_Ajax?" + Math.random();
        var newlinkspromise = new httprx.DumilAjax(functionurl, link);
        return newlinkspromise;
    }
    deleteLinkAjax(linkid) {
        var functionurl: string = this.serverLinkModulePath + "delete_Link_Ajax?" + Math.random();
        var deletelinkpromise = new httprx.DumilAjax(functionurl, linkid);
        return deletelinkpromise;
    }
    modifyLinkAjax(linkid) {
        var functionurl: string = this.serverLinkModulePath + "modify_Link_Ajax?" + Math.random();
        var modifylinkpromise = new httprx.DumilAjax(functionurl, linkid);
        return modifylinkpromise;
    }
    notParentLinkAjax(linkid) {
        var functionurl: string = this.serverLinkModulePath + "not_Parent_Ajax?" + Math.random();
        var modifylinkpromise = new httprx.DumilAjax(functionurl, linkid);
        return modifylinkpromise;
    }
}



