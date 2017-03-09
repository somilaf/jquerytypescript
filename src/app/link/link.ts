import linkdb = require("./linkdb");
export class Link {
    private linkid: number;
    private linkname: string;
    private linkdescription: string;
    private autt: number;
    private parentlinkid: number;
    private sitepageid: number;
    private linkposition:any;
    private linkpositions:any;
    private isparent:number;
    private childrenlinks: any;
    constructor(linkname: string, linkdescription: string, autt: number = 0, parentlinkid: number,
        linkposition: number, linkid: number = 0, sitepageid: number = 0,isparent=0) {
        this.linkid = linkid;
        this.linkname = linkname;
        this.linkdescription = linkdescription;
        this.autt = autt;
        this.parentlinkid =parentlinkid;
        this.linkposition = linkposition;
        this.sitepageid = sitepageid;
        this.isparent=isparent;
    }
    //Getters Setterssss
    setLinkId(linkid: number) {
        this.linkid = linkid;
    }
    getLinkId(): number {
        return this.linkid;
    }
    setLinkName(linkname: string) {
        this.linkname = linkname;
    }
    getLinkName(): string {
        return this.linkname;
    }
    setLinkDescription(description: string) {
        this.linkdescription = description;
    }
    getLinkDescription(): string {
        return this.linkdescription;
    }
    setAutt(autt) {
        this.autt = autt;
    }
    getAutt(): number {
        return this.autt;
    }
    setParentLinkId(parentlinkid: number) {
        this.parentlinkid = parentlinkid;
    }
    getParentLinkId(): number {
        return this.parentlinkid;
    }
    setSitePageId(sitepageid: number) {
        this.sitepageid = sitepageid;
    }
    getSitePageId(): number {
        return this.sitepageid;
    }
    setChildrenLinks(childrenlinks) {
        this.childrenlinks = [];
        for (var l in childrenlinks) {
            this.childrenlinks.push(new Link(childrenlinks[l].linkname, childrenlinks[l].linkdescription, childrenlinks[l].autt, childrenlinks[l].parentlinkid, childrenlinks[l].linkposition,
             childrenlinks[l].linkid, childrenlinks[l].sitepageid,childrenlinks[l].isparent));
        }
    }
    getChildrenLinks(): Link[] {
        return this.childrenlinks;
    }
    getIsParent(){
        return this.isparent;
    }
    setIsParent(isparent){
        this.isparent=isparent;
    }
    setLinkPositions(positions){
        this.linkpositions=positions;
    }
    // end setters gettersssss.......

    linkToFormData() {
        var data = new FormData();
        data.append("LinkId", this.linkid);
        data.append("LinkDescription", this.linkdescription);
        data.append("LinkName", this.linkname);
        data.append('AuttLink', this.autt);
        data.append('ParentLinkId', this.parentlinkid);
        data.append('SitePageId', this.sitepageid);
        data.append('LinkPositions', this.linkpositions);
        return data;
    }

    parentLinkIdToFormData() {
        var data = new FormData();
        data.append('ParentLinkId', this.parentlinkid);
        return data;
    }

}
