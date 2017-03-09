define(["require", "exports"], function (require, exports) {
    "use strict";
    var Gallery = (function () {
        function Gallery(galleryname, pictures, galleryid) {
            if (pictures === void 0) { pictures = null; }
            if (galleryid === void 0) { galleryid = 0; }
            this.galleryname = galleryname;
            this.galleryid = galleryid;
            this.pictures = [];
            if (pictures != null) {
                for (var p in pictures) {
                    this.pictures.push(pictures[p]);
                }
            }
        }
        //Getters Setterssss
        Gallery.prototype.setGalleryId = function (linkid) {
            this.galleryid = linkid;
        };
        Gallery.prototype.getGalleryId = function () {
            return this.galleryid;
        };
        Gallery.prototype.setGalleryName = function (galleryname) {
            this.galleryname = galleryname;
        };
        Gallery.prototype.getGalleryName = function () {
            return this.galleryname;
        };
        Gallery.prototype.setGalleryPictures = function (pictures) {
            if (pictures != null) {
                this.pictures = [];
                for (var p in pictures) {
                    this.pictures.push(pictures[p]);
                }
            }
        };
        Gallery.prototype.getGalleryPictures = function () {
            return this.pictures;
        };
        // end setters gettersssss.......
        Gallery.prototype.compareGallery = function (gallery) {
            if (typeof (this) === typeof (gallery)) {
                if (this.galleryname !== gallery.galleryname) {
                    return false;
                }
                if (this.galleryid !== gallery.galleryid) {
                    return false;
                }
            }
            return true;
        };
        Gallery.prototype.galleryToFormData = function () {
            var data = new FormData;
            data.append("GalleryId", this.galleryid);
            data.append("GalleryName", this.galleryname);
            return data;
        };
        return Gallery;
    }());
    exports.Gallery = Gallery;
});
