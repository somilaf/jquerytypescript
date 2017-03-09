export class DumilAjax {
        zahtev: any;
        requesturl: string;
        requesttype: string;
        serverurl: string = "/dumil08new/";
        data: Object;
        constructor(requiesturl, data: FormData = null, requesttype: string = "POST") {
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
                        beforeSend: function () {
                               $(".animation").show();
                        },
                        complete: function () {
                               $(".animation").hide();
                        },
                        url: this.requesturl,
                        type: this.requesttype,
                        data: this.data,
                        timeout: 50000,
                        dataType: "json",
                        processData: false,
                        contentType: false
                }

                );


        }

}