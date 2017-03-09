define(["require", "exports"], function (require, exports) {
    "use strict";
    var Logo = (function () {
        function Logo(logoname, logopicture, pageid, logoid) {
            if (pageid === void 0) { pageid = null; }
            if (logoid === void 0) { logoid = 0; }
            this.logoid = logoid;
            this.logoname = logoname;
            this.logopicture = logopicture;
            this.setPageId(pageid);
        }
        Logo.prototype.setLogoId = function (logoid) {
            this.logoid = logoid;
        };
        Logo.prototype.getLogoId = function () {
            return this.logoid;
        };
        Logo.prototype.getLogoName = function () {
            return this.logoname;
        };
        Logo.prototype.setLogoName = function (logoname) {
            this.logoname = logoname;
        };
        Logo.prototype.getLogoPicture = function () {
            return this.logopicture;
        };
        Logo.prototype.setLogoPicture = function (picture) {
            this.logopicture = picture;
        };
        Logo.prototype.setPageId = function (pages) {
            if (pages != null) {
                this.pageid = [];
                for (var p in pages) {
                    this.pageid.push(pages[p]);
                }
            }
        };
        Logo.prototype.getPageId = function () {
            return this.pageid;
        };
        Logo.prototype.logoToFormData = function () {
            var data = new FormData;
            data.append("LogoId", this.logoid);
            data.append("fNewLogoFile", this.logopicture);
            data.append("LogoName", this.logoname);
            data.append("PageId", JSON.stringify(this.pageid));
            return data;
        };
        return Logo;
    }());
    exports.Logo = Logo;
});
