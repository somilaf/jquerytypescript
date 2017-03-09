define(["require", "exports", '../../logo/newlogo', '../../page/newpage', '../../link/newlink', '../../menu/newmenu', '../../galerije/newgallery', '../../texts/newtext', '../../servicecategories/newcategory', '../../services/newservice'], function (require, exports, logo, page, link, menu, gallery, text, category, service) {
    "use strict";
    var Actionbutton = (function () {
        function Actionbutton(elem, img) {
            var _this = this;
            if (img === void 0) { img = "./assets/images/adminimages/new.jpg"; }
            this.element = elem;
            this.buttonimg = img;
            this.parentcontainer = $("#makeAction").empty();
            this.rangecontainer = $("#pickElement").empty();
            this.actionbuttonobj = $('<div id="newElement" class="col-wd-4 col-md-4 ">' +
                '<div class="row"><label>Dodajte novi ' + this.element + '</label></div>' +
                '<div class="row"><img src="' + this.buttonimg + '" alt=""></div>' +
                '</div>');
            this.labelText = this.actionbuttonobj.find("label");
            $(this.actionbuttonobj).click(function (e) {
                e.preventDefault();
                _this.elementOnclick();
            });
        }
        Actionbutton.prototype.elementOnclick = function () {
            switch (this.element) {
                case "Logo":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new logo.NewLogo().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Link":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new link.NewLink().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Page":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new page.NewPage().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Menu":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new menu.NewMenu().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Gallery":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new gallery.NewGallery().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Text":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new text.NewText().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Category":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new category.NewCategory().createFormInParent(this.parentcontainer);
                    }
                    break;
                case "Service":
                    {
                        this.rangecontainer.empty();
                        this.parentcontainer.empty();
                        new service.NewService().createFormInParent(this.parentcontainer);
                    }
                    break;
            }
            this.scrollToParent();
        };
        ;
        Actionbutton.prototype.scrollToParent = function () {
            var location = { "x": $(this.parentcontainer).offset().top, "y": $(this.parentcontainer).offset().left };
            $("html, body").animate({
                scrollTop: (location.y, location.x - 20)
            }, 500);
        };
        Actionbutton.prototype.createButton = function () {
            return $(this.actionbuttonobj);
        };
        Actionbutton.prototype.callbackfunction = function (adminelement) {
            this.element = adminelement;
        };
        return Actionbutton;
    }());
    exports.Actionbutton = Actionbutton;
});
