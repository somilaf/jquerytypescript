import actionbutton = require("./actionbutton");
import range = require('../range');
import page = require('../../page/pagedb');
import link = require('../../link/linkdb');
import logo = require('../../logo/logodb')
import menu = require('../../menu/menudb');
import gallery = require('../../galerije/gallerydb');
import text = require('../../texts/textdb');
import category = require('../../servicecategories/categorydb');
import service = require('../../services/servicedb');
export class Selectbutton extends actionbutton.Actionbutton {
    private selectrange: range.RangeDumil08;
    rangecontainer: JQuery;
    //Objekat za rad sa bazom
    dbmodule: any
    //Json objekat sa elementima  
    elements: any;
    constructor(elem, img = "./assets/images/adminimages/select.jpg") {
        super(elem, img);
        this.labelText.empty();
        this.labelText.append("Izmenite "+this.element);
        this.actionbuttonobj.attr("id", "selectElement");
        this.actionbuttonobj.addClass("col-sm-6");
    }
    scrollToParent() {
        var location = { "x": $(this.rangecontainer).offset().top, "y": $(this.rangecontainer).offset().left };
        $("html, body").animate({
            scrollTop: (location.y, location.x)
        }, 300);
    }
    elementOnclick() {
        console.log(this.element);
        switch (this.element) {
            case "Logo":
                this.dbmodule = new logo.LogoDB;
                this.elements = this.dbmodule.allLogosAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Logo", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
            case "Page":
                this.dbmodule = new page.PagesDB;
                this.elements = this.dbmodule.allSitePagesAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite WebStranicu", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;

            case "Link":
                this.dbmodule = new link.LinkDB;
                this.elements = this.dbmodule.allSiteLinksAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Link", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;

            case "Menu":
                this.dbmodule = new menu.MenuDB;
                this.elements = this.dbmodule.allSiteMenuesAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Meni", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
            case "Gallery":
                this.dbmodule = new gallery.GalleryDB;
                this.elements = this.dbmodule.allGalleriesAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Galeriju", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
            case "Text":
                this.dbmodule = new text.TextDB;
                this.elements = this.dbmodule.allTextsAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Tekst", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
            case "Category":
                this.dbmodule = new category.CategoryDB;
                this.elements = this.dbmodule.allCategoriesAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Kategoriju", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
            case "Service":
                this.dbmodule = new service.ServiceDB;
                this.elements = this.dbmodule.allServicessAjax();
                this.elements.zahtev.done(() => {
                    new range.RangeDumil08("Izaberite Usluge", $.parseJSON(this.elements.zahtev.responseText), this.element, this.parentcontainer).createInParent(this.rangecontainer, true);
                });
                break;
                
            default:
                this.rangecontainer.empty();
        }
        this.scrollToParent();

    };


}