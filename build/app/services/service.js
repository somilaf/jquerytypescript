define(["require", "exports"], function (require, exports) {
    "use strict";
    var Service = (function () {
        function Service(servicename, servicedescription, categoryid, pageid, servicepicture, serviceid) {
            if (servicepicture === void 0) { servicepicture = null; }
            if (serviceid === void 0) { serviceid = 0; }
            this.servicename = servicename;
            this.servicedescription = servicedescription;
            this.pageid = pageid;
            this.categoryid = categoryid;
            this.servicepicture = servicepicture;
            this.serviceid = serviceid;
        }
        //Getters Setterssss
        Service.prototype.setServiceId = function (serviceid) {
            this.serviceid = serviceid;
        };
        Service.prototype.getServiceId = function () {
            return this.serviceid;
        };
        Service.prototype.setServiceName = function (servicename) {
            this.servicename = servicename;
        };
        Service.prototype.getServiceName = function () {
            return this.servicename;
        };
        Service.prototype.setServiceDescription = function (servicedescription) {
            this.servicedescription = servicedescription;
        };
        Service.prototype.getServiceDescription = function () {
            return this.servicedescription;
        };
        Service.prototype.setCategoryId = function (categoryid) {
            this.categoryid = categoryid;
        };
        Service.prototype.getCategoryId = function () {
            return this.categoryid;
        };
        Service.prototype.setPageId = function (pageid) {
            this.pageid = pageid;
        };
        Service.prototype.getPageId = function () {
            return this.pageid;
        };
        Service.prototype.setServicePicture = function (pictures) {
            if (pictures != null) {
                this.servicepicture = [];
                for (var p in pictures) {
                    this.servicepicture.push(pictures[p]);
                }
            }
        };
        Service.prototype.getServicePicture = function () {
            return this.servicepicture;
        };
        // end setters gettersssss.......
        Service.prototype.compareService = function (service) {
            if (typeof (this) === typeof (service)) {
                if (this.servicename !== service.servicename) {
                    return false;
                }
                if (this.servicedescription !== service.servicedescription) {
                    return false;
                }
                if (this.categoryid !== service.categoryid) {
                    return false;
                }
                if (this.pageid !== service.pageid) {
                    return false;
                }
                if (this.serviceid !== service.serviceid) {
                    return false;
                }
            }
            return true;
        };
        Service.prototype.serviceToFormData = function () {
            var data = new FormData;
            data.append("ServiceName", this.servicename);
            data.append("CategoryId", this.categoryid);
            data.append("PageId", this.pageid);
            data.append("ServiceDescription", this.servicedescription);
            data.append("ServiceId", this.serviceid);
            return data;
        };
        Service.prototype.imagesToFormData = function (data) {
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
        };
        return Service;
    }());
    exports.Service = Service;
});
