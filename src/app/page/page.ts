//Putanje do neophodnih fajlova
import pagesdb = require("./pagedb");
//kraj 


export class Page {
    private sitepageid: number;
    private pageseodataid: number;
    private linkid:number;
    private sitepagename: string;
    private sitepagetypeid: number;
    private pagetitle: string;
    private metakeywords: string;
    private metadescription: string;
    dbmodule: pagesdb.PagesDB;
    constructor(sitepagename: string = "", sitepagetypeid: number , pagetitle: string = "", metakeywords: string = "", metadescription: string = "", linkid:number=null,sitepageid: number = null, pageseodataid: number = null) {
        this.sitepageid = sitepageid;
        this.pageseodataid = pageseodataid;
        this.linkid=linkid;
        this.sitepagename = sitepagename;
        this.sitepagetypeid = sitepagetypeid;
        this.pagetitle = pagetitle;
        this.metakeywords = metakeywords;
        this.metadescription = metadescription;
    }

    //Getters Setterssss
    setPageId(pageid: number) {
        this.sitepageid = pageid;
    }
    getPageId(): number {
        return this.sitepageid;
    }
    setPageSeoDataId(seoid: number) {
        this.pageseodataid = seoid;
    }
    setPageLinkId(linkid:number){
        this.linkid=linkid;
    }
    getPageLinkId():number{
        return this.linkid;
    }
    getPageSeoDataId(): number {
        return this.pageseodataid;
    }

    getPageName(): string {
        return this.sitepagename;
    }
    setPageName(name: string) {
        this.sitepagename = name;
    }
    getSitePageTypeId(): number {
        return this.sitepagetypeid;
    }
    setSitePageTypeId(id: number) {
        this.sitepagetypeid = id;
    }
    getPageTitle(): string {
        return this.pagetitle;
    }
    setPageTitle(title: string) {
        this.pagetitle = title;
    }
    getPageMetaKeyWords(): string {
        return this.metakeywords;
    }
    setPageMetaKeyWords(keywords: string) {
        this.metakeywords = keywords;
    }
    getPageMetaDesciption(): string {
        return this.metadescription;
    }
    setPageMetaDescription(description: string) {
        this.metadescription = description;
    }
    // end setters gettersssss.......

    pageToFormData() {
        var data = new FormData();
        data.append("SitePageId",this.sitepageid);
        data.append("SitePageSeoDataId",this.pageseodataid);
        data.append("SitePageName", this.sitepagename);
        data.append('SitePageTypeId', this.sitepagetypeid);
        data.append('PageTitle', this.pagetitle);
        data.append('MetaKeyWords', this.metakeywords);
        data.append('MetaDescription', this.metadescription);
        return data;
    }
 
}
