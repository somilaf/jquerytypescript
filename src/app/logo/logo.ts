import logodb = require("./logodb");
export class Logo {
    private logoid: number;
    private logoname: string;
    private logopicture: any;
    private pageid: number[];
    protected dbmodule: logodb.LogoDB;
    constructor(logoname: string, logopicture: string, pageid:any=null, logoid: number = 0) {
        this.logoid = logoid;
        this.logoname = logoname;
        this.logopicture = logopicture;
        this.setPageId(pageid);
    }
    setLogoId(logoid: number) {
        this.logoid = logoid;
    }
    getLogoId(): number {
        return this.logoid;
    }
    getLogoName(): string {
        return this.logoname;
    }
    setLogoName(logoname: string) {
        this.logoname = logoname;
    }
    getLogoPicture(): any {
        return this.logopicture;
    }
    setLogoPicture(picture: any) {
        this.logopicture = picture;
    }
    setPageId(pages){
            if (pages != null) {
            this.pageid = [];
            for (var p in pages) {
                this.pageid.push(
                    pages[p]
                );
            }
        }
    }
    getPageId(){
        return this.pageid;
    }

    logoToFormData() {
        var data = new FormData;
        data.append("LogoId", this.logoid);
        data.append("fNewLogoFile", this.logopicture);
        data.append("LogoName", this.logoname);
        data.append("PageId", JSON.stringify(this.pageid));
        return data;
    }

}
