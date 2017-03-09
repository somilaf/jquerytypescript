import menudb = require("./gallerydb");
import link = require("../link/link");
export class Gallery {
    private galleryid: number;
    private galleryname: string;
    private pictures: any[];
    constructor(galleryname: string, pictures: any = null, galleryid: number = 0) {
        this.galleryname = galleryname;
        this.galleryid = galleryid;
        this.pictures = [];
        if (pictures != null) {
            for (var p in pictures) {
                this.pictures.push(
                    pictures[p]
                );
            }
        }
    }
    //Getters Setterssss
    setGalleryId(linkid: number) {
        this.galleryid = linkid;
    }
    getGalleryId(): number {
        return this.galleryid;
    }
    setGalleryName(galleryname: string) {
        this.galleryname = galleryname;
    }
    getGalleryName(): string {
        return this.galleryname;
    }
    setGalleryPictures(pictures) {
        if (pictures != null) {
            this.pictures = [];
            for (var p in pictures) {
                this.pictures.push(
                    pictures[p]
                );
            }
        }
    }
    getGalleryPictures(): any {
        return this.pictures;
    }
    // end setters gettersssss.......
    compareGallery(gallery): boolean {
        if (typeof (this) === typeof (gallery)) {
            if (this.galleryname !== gallery.galleryname) { return false; }
            if (this.galleryid !== gallery.galleryid) { return false; }
        }
        return true;
    }

    galleryToFormData() {
        var data = new FormData;
        data.append("GalleryId", this.galleryid);
        data.append("GalleryName", this.galleryname);
        return data;
    }




}
