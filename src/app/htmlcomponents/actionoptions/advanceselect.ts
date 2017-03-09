import text = require('../../texts/textpage');
import gallery = require('../../galerije/gallerypage');
import menu = require('../../menu/menupage');
import actionbutton = require("./actionbutton");

export class Advaceselect extends actionbutton.Actionbutton {
    constructor(elem, img = "./assets/images/adminimages/new.jpg") {
        super(elem, img);
        this.labelText.empty();
        this.labelText.append("Napredne opcije");
        this.actionbuttonobj.attr("id", "addElement");
        this.actionbuttonobj.addClass("col-sm-6");
    }
    elementOnclick() {
        switch (this.element) {
            case "Text": {
                this.rangecontainer.empty();
                this.parentcontainer.empty();
                new text.TextPage().createFormInParent(this.parentcontainer);
            }
                break;
            case "Gallery": {
                this.rangecontainer.empty();
                this.parentcontainer.empty();
                new gallery.galleryPage().createFormInParent(this.parentcontainer);
            }
                break;
            case "Menu": {
                this.rangecontainer.empty();
                this.parentcontainer.empty();
                new menu.menuPage().createFormInParent(this.parentcontainer);
            }
                break;
            default:
                alertify.error("Ne postoje napredne opcije za izabranu kategoriju.");

        }
    }
}