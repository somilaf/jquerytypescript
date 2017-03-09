var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../texts/textpage', '../../galerije/gallerypage', '../../menu/menupage', "./actionbutton"], function (require, exports, text, gallery, menu, actionbutton) {
    "use strict";
    var Advaceselect = (function (_super) {
        __extends(Advaceselect, _super);
        function Advaceselect(elem, img) {
            if (img === void 0) { img = "./assets/images/adminimages/new.jpg"; }
            _super.call(this, elem, img);
            this.labelText.empty();
            this.labelText.append("Napredne opcije");
            this.actionbuttonobj.attr("id", "addElement");
            this.actionbuttonobj.addClass("col-sm-6");
        }
        Advaceselect.prototype.elementOnclick = function () {
            switch (this.element) {
                case "Text":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new text.TextPage().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Gallery":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new gallery.galleryPage().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Menu":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new menu.menuPage().createFormInParent(this.parentcontainer);
                    }
                    break;
                default:
                    alertify.error("Ne postoje napredne opcije za izabranu kategoriju.");
            }
        };
        return Advaceselect;
    }(actionbutton.Actionbutton));
    exports.Advaceselect = Advaceselect;
});
