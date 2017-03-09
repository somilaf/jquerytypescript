define(["require", "exports"], function (require, exports) {
    "use strict";
    var Text = (function () {
        function Text(textname, textlanguage, textcontent, pictures, pagepositionactiv, textid) {
            if (pictures === void 0) { pictures = null; }
            if (pagepositionactiv === void 0) { pagepositionactiv = null; }
            if (textid === void 0) { textid = 0; }
            this.textname = textname;
            this.textlanguage = textlanguage;
            this.textcontent = textcontent;
            this.textpictures = pictures;
            this.pagepositionactiv = [];
            if (pagepositionactiv != null) {
                for (var p in pagepositionactiv) {
                    this.pagepositionactiv.push(pagepositionactiv[p]);
                }
            }
            this.textid = textid;
        }
        //Getters Setterssss
        Text.prototype.setTextId = function (textid) {
            this.textid = textid;
        };
        Text.prototype.getTextId = function () {
            return this.textid;
        };
        Text.prototype.setTextName = function (textname) {
            this.textname = textname;
        };
        Text.prototype.getTextName = function () {
            return this.textname;
        };
        Text.prototype.setTextLanguage = function (language) {
            this.textlanguage = language;
        };
        Text.prototype.getTextLanguage = function () {
            return this.textlanguage;
        };
        Text.prototype.setTextContent = function (text) {
            this.textcontent = text;
        };
        Text.prototype.getTextContent = function () {
            return this.textcontent;
        };
        Text.prototype.setTextPictures = function (pictures) {
            if (pictures != null) {
                this.textpictures = [];
                for (var p in pictures) {
                    this.textpictures.push(pictures[p]);
                }
            }
        };
        Text.prototype.getTextPictures = function () {
            return this.textpictures;
        };
        // end setters gettersssss.......
        Text.prototype.compareText = function (text) {
            if (typeof (this) === typeof (text)) {
                if (this.textname !== text.textname) {
                    return false;
                }
                if (this.textcontent !== text.textcontent) {
                    return false;
                }
                if (this.textlanguage !== text.textlanguage) {
                    return false;
                }
                if (this.textid !== text.textid) {
                    return false;
                }
            }
            return true;
        };
        Text.prototype.textToFormData = function () {
            var data = new FormData;
            data.append("TextContentName", this.textname);
            data.append("TextContentText", this.textcontent);
            data.append("TextLang", this.textlanguage);
            data.append("TextContentId", this.textid);
            return data;
        };
        Text.prototype.imagesToFormData = function (data) {
            var prazan = 0;
            this.textpictures.each(function () {
                if (this.value != "") {
                    data.append("Image" + prazan, this.files[0]);
                    prazan++;
                }
            });
            data.append("FileCount", prazan);
            return data;
        };
        return Text;
    }());
    exports.Text = Text;
});
