var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./actionbutton", '../range', '../../page/pagedb', '../../link/linkdb', '../../logo/logodb', '../../menu/menudb', '../../galerije/gallerydb', '../../texts/textdb', '../../servicecategories/categorydb', '../../services/servicedb'], function (require, exports, actionbutton, range, page, link, logo, menu, gallery, text, category, service) {
    "use strict";
    var Selectbutton = (function (_super) {
        __extends(Selectbutton, _super);
        function Selectbutton(elem, img) {
            if (img === void 0) { img = "./assets/images/adminimages/select.jpg"; }
            _super.call(this, elem, img);
            this.labelText.empty();
            this.labelText.append("Izmenite " + this.element);
            this.actionbuttonobj.attr("id", "selectElement");
            this.actionbuttonobj.addClass("col-sm-6");
        }
        Selectbutton.prototype.scrollToParent = function () {
            var location = { "x": $(this.rangecontainer).offset().top, "y": $(this.rangecontainer).offset().left };
            $("html, body").animate({
                scrollTop: (location.y, location.x)
            }, 300);
        };
        Selectbutton.prototype.elementOnclick = function () {
            var _this = this;
            console.log(this.element);
            switch (this.element) {
                case "Logo":
                    this.dbmodule = new logo.LogoDB;
                    this.elements = this.dbmodule.allLogosAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Logo", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Page":
                    this.dbmodule = new page.PagesDB;
                    this.elements = this.dbmodule.allSitePagesAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite WebStranicu", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Link":
                    this.dbmodule = new link.LinkDB;
                    this.elements = this.dbmodule.allSiteLinksAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Link", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Menu":
                    this.dbmodule = new menu.MenuDB;
                    this.elements = this.dbmodule.allSiteMenuesAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Meni", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Gallery":
                    this.dbmodule = new gallery.GalleryDB;
                    this.elements = this.dbmodule.allGalleriesAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Galeriju", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Text":
                    this.dbmodule = new text.TextDB;
                    this.elements = this.dbmodule.allTextsAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Tekst", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Category":
                    this.dbmodule = new category.CategoryDB;
                    this.elements = this.dbmodule.allCategoriesAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Kategoriju", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                case "Service":
                    this.dbmodule = new service.ServiceDB;
                    this.elements = this.dbmodule.allServicessAjax();
                    this.elements.zahtev.done(function () {
                        new range.RangeDumil08("Izaberite Usluge", $.parseJSON(_this.elements.zahtev.responseText), _this.element, _this.parentcontainer).createInParent(_this.rangecontainer, true);
                    });
                    break;
                default:
                    this.rangecontainer.empty();
            }
            this.scrollToParent();
        };
        ;
        return Selectbutton;
    }(actionbutton.Actionbutton));
    exports.Selectbutton = Selectbutton;
});
