import logo = require('../../logo/newlogo');
import page = require('../../page/newpage');
import link = require('../../link/newlink');
import menu = require('../../menu/newmenu');
import gallery = require('../../galerije/newgallery');
import text = require('../../texts/newtext');
import category = require('../../servicecategories/newcategory');
import service = require('../../services/newservice');
export class Actionbutton {
    protected parentcontainer: JQuery;
    protected rangecontainer: JQuery;
    private buttonimg: any;
    protected actionbuttonobj: JQuery;
    protected labelText: JQuery;
    protected element: string;
    constructor(elem, img = "./assets/images/adminimages/new.jpg") {
        this.element = elem;
        this.buttonimg = img;
        this.parentcontainer = $("#makeAction").empty();
        this.rangecontainer = $("#pickElement").empty();
        this.actionbuttonobj = $(
            '<div id="newElement" class="col-wd-4 col-md-4 ">' +
            '<div class="row"><label>Dodajte novi ' + this.element + '</label></div>' +
            '<div class="row"><img src="' + this.buttonimg + '" alt=""></div>' +
            '</div>'
        );
        this.labelText = this.actionbuttonobj.find("label");
        $(this.actionbuttonobj).click((e) => {
            e.preventDefault();
            this.elementOnclick();

        });
    }
    elementOnclick() {
        switch (this.element) {
            case "Logo": {
                this.rangecontainer.empty(); this.parentcontainer.empty(); new logo.NewLogo().createFormInParent(this.parentcontainer);
            }
                break;
            case "Link": { this.rangecontainer.empty(); this.parentcontainer.empty(); new link.NewLink().createFormInParent(this.parentcontainer); }
                break;
            case "Page": { this.rangecontainer.empty(); this.parentcontainer.empty(); new page.NewPage().createFormInParent(this.parentcontainer); }
                break;
            case "Menu": { this.rangecontainer.empty(); this.parentcontainer.empty(); new menu.NewMenu().createFormInParent(this.parentcontainer); }
                break;
            case "Gallery": { this.rangecontainer.empty(); this.parentcontainer.empty(); new gallery.NewGallery().createFormInParent(this.parentcontainer); }
                break;
            case "Text": { this.rangecontainer.empty(); this.parentcontainer.empty(); new text.NewText().createFormInParent(this.parentcontainer); }
                break;
            case "Category": { this.rangecontainer.empty(); this.parentcontainer.empty(); new category.NewCategory().createFormInParent(this.parentcontainer); }
                break;
            case "Service": { this.rangecontainer.empty(); this.parentcontainer.empty(); new service.NewService().createFormInParent(this.parentcontainer); }
                break;
        }
        this.scrollToParent();
    };
    scrollToParent() {
        var location = { "x": $(this.parentcontainer).offset().top, "y": $(this.parentcontainer).offset().left };
        $("html, body").animate({
            scrollTop: (location.y, location.x-20)
        }, 500);
    }

    createButton() {
        return $(this.actionbuttonobj);
    }
    callbackfunction(adminelement) {
        this.element = adminelement;
    }
}