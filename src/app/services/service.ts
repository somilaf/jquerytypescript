import categorydb = require("./servicedb");
export class Service {
    private serviceid: number;
    private servicename: string;
    private servicedescription: string;
    private categoryid: number
    private pageid: number;
    private servicepicture: any;
    constructor(servicename: string, servicedescription: string, categoryid: number, pageid: number,
        servicepicture = null, serviceid: number = 0) {
        this.servicename = servicename;
        this.servicedescription = servicedescription;
        this.pageid = pageid;
        this.categoryid = categoryid;
        this.servicepicture = servicepicture;
        this.serviceid = serviceid;
    }
    //Getters Setterssss
    setServiceId(serviceid: number) {
        this.serviceid = serviceid;
    }
    getServiceId(): number {
        return this.serviceid;
    }
    setServiceName(servicename: string) {
        this.servicename = servicename;
    }
    getServiceName(): string {
        return this.servicename;
    }
    setServiceDescription(servicedescription: string) {
        this.servicedescription = servicedescription;
    }
    getServiceDescription(): string {
        return this.servicedescription;
    }
    setCategoryId(categoryid: number) {
        this.categoryid = categoryid;
    }
    getCategoryId(): number {
        return this.categoryid;
    }
    setPageId(pageid: number) {
        this.pageid = pageid;
    }
    getPageId(): number {
        return this.pageid;
    }
    setServicePicture(pictures) {
        if (pictures != null) {
            this.servicepicture = [];
            for (var p in pictures) {
                this.servicepicture.push(
                    pictures[p]
                );
            }
        }
    }
    getServicePicture(): any {
        return this.servicepicture;
    }
    // end setters gettersssss.......
    compareService(service): boolean {
        if (typeof (this) === typeof (service)) {
            if (this.servicename !== service.servicename) { return false; }
            if (this.servicedescription !== service.servicedescription) { return false; }
            if (this.categoryid !== service.categoryid) { return false; }
            if (this.pageid !== service.pageid) { return false; }
            if (this.serviceid !== service.serviceid) { return false; }
        }
        return true;
    }
    serviceToFormData() {
        var data = new FormData;
        data.append("ServiceName", this.servicename);
        data.append("CategoryId", this.categoryid);
        data.append("PageId", this.pageid);
        data.append("ServiceDescription", this.servicedescription);
        data.append("ServiceId", this.serviceid)
        return data;
    }
    imagesToFormData(data: FormData): FormData {
        var prazan = 0;
        this.servicepicture.each(function () {
            if (this.files[prazan]) {
                console.log(this.files[prazan]);
                data.append("Image" + prazan, this.files[0]);
            }
            prazan++;
        });
        data.append("FileCount", prazan);
        return data;
    }



}
