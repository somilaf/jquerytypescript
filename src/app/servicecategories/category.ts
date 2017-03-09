

import categorydb = require("./categorydb");
export class Category {
    private categoryid: number;
    private categoryname: string;
    private categorydescription: string;
    private pageid: number;
    private categorypicture: string;
    constructor(categoryname: string, categorydescription: string, pageid: number,
        categorypicture = null, categoryid: number = 0) {
        this.categoryname = categoryname;
        this.categorydescription = categorydescription;
        this.pageid = pageid;
        this.categorypicture = categorypicture;
        this.categoryid = categoryid;
    }
    //Getters Setterssss
    setCategoryId(categoryid: number) {
        this.categoryid = categoryid;
    }
    getCategoryId(): number {
        return this.categoryid;
    }
    setCategoryName(categoryname: string) {
        this.categoryname = categoryname;
    }
    getCategoryName(): string {
        return this.categoryname;
    }
    setCategoryDescription(categorydescription: string) {
        this.categorydescription = categorydescription;
    }
    getCategoryDescription(): string {
        return this.categorydescription;
    }
    setPageId(pageid: number) {
        this.pageid = pageid;
    }
    getPageId(): number {
        return this.pageid;
    }
    setCategoryPicture(picture) {
        this.categorypicture = picture;
    }
    getCategoryPictures(): string {
        return this.categorypicture;
    }
    // end setters gettersssss.......
    categoryToFormData() {
        var data = new FormData;
        data.append("ServiceCategoryName", this.categoryname);
        data.append("ServiceCategoryDescription", this.categorydescription);
        data.append("PageId", this.pageid);
        data.append("fNewServiceCategoryFile", this.categorypicture);
        data.append("CategoryId", this.categoryid)
        return data;
    }
    compareCategory(category): boolean {
        if (typeof (this) === typeof (category)) {
            if (this.categoryname !== category.categoryname) { return false; }
            if (this.categorydescription !== category.categorydescription) { return false; }
            if (this.pageid !== category.pageid) { return false; }
            if (this.categoryid !== category.categoryid) { return false; }
        }
        return true;
    }

}
