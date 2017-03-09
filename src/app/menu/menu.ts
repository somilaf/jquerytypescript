import menudb = require("./menudb");
import link = require("../link/link");
export class Menu {
    private menuid: number;
    private menuname: string;
    private sitepageid: number;
    private menuposition: number;
    private links: any;
    constructor(menuname: string, sitepageid: number, menuposition: number, links: any, menuid: number = 0) {
        this.menuname = menuname;
        this.sitepageid = sitepageid;
        this.menuposition = menuposition;
        this.links = [];
        if (links != null) {
            console.log("Tu sam.");
            for (var l in links) {
                this.links.push(
                    new link.Link(
                        links[l].linkname,
                        links[l].linkdescription,
                        links[l].autt,
                        parseInt(links[l].parentlinkid),
                        links[l].linkposition,
                        links[l].linkid,
                        links[l].sitepageid,
                        parseInt(links[l].isparent)
                ));
            }
        }
        this.menuid=menuid;
    }
    //Getters Setterssss
    setMenuId(menuid: number) {
        this.menuid = menuid;
    }
    getMenuId(): number {
        return this.menuid;
    }
    setMenuName(menuname: string) {
        this.menuname = menuname;
    }
    getMenuName(): string {
        return this.menuname;
    }
    setSitePageId(sitepageid: number) {
        this.sitepageid = sitepageid;
    }
    getSitePageId(): number {
        return this.sitepageid;
    }
    setMenuPosition(menuposition: number) {
        this.menuposition = menuposition;
    }
    getMenuPosition(): number {
        return this.menuposition;
    }
    setMenuLinks(links: any) {
        if (links != null && links.lenght > 0) {
            for (var l in links) {
                this.links.push(new link.Link(links[l].linkname, links[l].linkdescription,
                    links[l].autt, links[l].parentlinkid, links[l].linkposition, links[l].linkid, links[l].sitepageid, links[l].isparent));
            }
        }
    }
    getMenuLinks(): link.Link[] {
        return this.links;
    }


    // end setters gettersssss.......





}
