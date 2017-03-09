define(["require", "exports"], function (require, exports) {
    "use strict";
    var DumilAjax = (function () {
        function DumilAjax(requiesturl, data, requesttype) {
            if (data === void 0) { data = null; }
            if (requesttype === void 0) { requesttype = "POST"; }
            this.serverurl = "/dumil08new/";
            this.requesturl = this.serverurl + requiesturl;
            console.log(this.requesturl);
            this.requesttype = requesttype;
            this.data = data;
            this.zahtev = $.ajax({
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                $("p").css("width", Math.ceil(evt.loaded / evt.total) * 80 + '%');
                                console.log(percentComplete);
                            }
                        }, false);
                        return xhr;
                    }
                },
                url: this.requesturl,
                type: this.requesttype,
                data: this.data,
                timeout: 50000,
                dataType: "json",
                processData: false,
                contentType: false
            });
        }
        return DumilAjax;
    }());
    exports.DumilAjax = DumilAjax;
});
