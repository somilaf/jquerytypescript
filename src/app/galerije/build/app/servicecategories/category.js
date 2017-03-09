define(["require", "exports"], function (require, exports) {
    "use strict";
    var Category = (function () {
        function Category(categoryname, categorydescription, pageid, categorypicture, categoryid) {
            if (categorypicture === void 0) { categorypicture = null; }
            if (categoryid === void 0) { categoryid = 0; }
            this.categoryname = categoryname;
            this.categorydescription = categorydescription;
            this.pageid = pageid;
            this.categorypicture = categorypicture;
            this.categoryid = categoryid;
        }
        //Getters Setterssss
        Category.prototype.setCategoryId = function (categoryid) {
            this.categoryid = categoryid;
        };
        Category.prototype.getCategoryId = function () {
            return this.categoryid;
        };
        Category.prototype.setCategoryName = function (categoryname) {
            this.categoryname = categoryname;
        };
        Category.prototype.getCategoryName = function () {
            return this.categoryname;
        };
        Category.prototype.setCategoryDescription = function (categorydescription) {
            this.categorydescription = categorydescription;
        };
        Category.prototype.getCategoryDescription = function () {
            return this.categorydescription;
        };
        Category.prototype.setPageId = function (pageid) {
            this.pageid = pageid;
        };
        Category.prototype.getPageId = function () {
            return this.pageid;
        };
        Category.prototype.setCategoryPicture = function (picture) {
            this.categorypicture = picture;
        };
        Category.prototype.getCategoryPictures = function () {
            return this.categorypicture;
        };
        // end setters gettersssss.......
        Category.prototype.categoryToFormData = function () {
            var data = new FormData;
            data.append("ServiceCategoryName", this.categoryname);
            data.append("ServiceCategoryDescription", this.categorydescription);
            data.append("PageId", this.pageid);
            data.append("fNewServiceCategoryFile", this.categorypicture);
            data.append("CategoryId", this.categoryid);
            return data;
        };
        Category.prototype.compareCategory = function (category) {
            if (typeof (this) === typeof (category)) {
                if (this.categoryname !== category.categoryname) {
                    return false;
                }
                if (this.categorydescription !== category.categorydescription) {
                    return false;
                }
                if (this.pageid !== category.pageid) {
                    return false;
                }
                if (this.categoryid !== category.categoryid) {
                    return false;
                }
            }
            return true;
        };
        return Category;
    }());
    exports.Category = Category;
});
