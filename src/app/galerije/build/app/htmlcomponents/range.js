define(["require", "exports", '../logo/modifylogo', '../page/modifypage', '../link/modifylink', '../menu/modifymenu', '../galerije/modifygallery', '../texts/modifytext', '../services/modifyservice', '../servicecategories/modifycategory'], function (require, exports, modifylogo, modifypage, modifylink, modifymeni, modifygallery, modifytext, modifyservice, modifycategory) {
    "use strict";
    //Klasa za generisanje range selektora za pojedinacne komponente koju zelimo da modifikujemo
    var RangeDumil08 = (function () {
        function RangeDumil08(label, elements, option, newoptionparent, object) {
            var _this = this;
            if (elements === void 0) { elements = 0; }
            if (object === void 0) { object = null; }
            this.label = label;
            this.option = option;
            if (newoptionparent !== null) {
                this.newoptionparent = newoptionparent;
                this.newoptionparent.empty();
            }
            this.elements = elements;
            this.object = object;
            this.index = 0;
            this.elements != 0 ? this.selectedelement = this.getElement(this.index)[1] : this.selectedelement = "Ne postoji";
            this.dumilrange =
                $('<h4>' + this.label + '</h4>' +
                    '<form>' +
                    '<div class="inputgroup">' +
                    '<label>' + this.label + ':</label>' +
                    '<input type="range" id="rnLogos" name="rnLogos" value="0" min="0" max="' + (this.countElements() >= 1 ? this.countElements() - 1 : this.countElements()) + '" />' +
                    '<output id="opLogos" name="opLogos" for="rnLogos">' + this.selectedelement + ' </output>' +
                    '<input type="hidden" value="' + this.getElement(0)[0] + '"/>' +
                    '</div>' +
                    '<div class="inputgroup">' +
                    '<button type="submit">Izaberi</input></div>' +
                    '</form>');
            $((this.dumilrange)[1]).change(function () {
                _this.changeRange();
            });
            $((this.dumilrange)[1][3]).click(function (event) {
                event.preventDefault();
                _this.clickRange();
                _this.scrollToParent();
            });
        }
        RangeDumil08.prototype.scrollToParent = function () {
            var location = { "x": $(this.newoptionparent).offset().top, "y": $(this.newoptionparent).offset().left };
            $("html, body").animate({
                scrollTop: (location.y, location.x)
            }, 500);
        };
        //Metoda za ispisvanje komponente u HTML formi
        RangeDumil08.prototype.createRange = function () {
            return $(this.dumilrange);
        };
        RangeDumil08.prototype.createInParent = function (parent, parentEmpty) {
            if (parentEmpty === void 0) { parentEmpty = true; }
            parentEmpty == true ? parent.empty() : false;
            parent.append($(this.dumilrange));
        };
        //Broj elemenata koji su prosledjeni selektoru
        RangeDumil08.prototype.countElements = function () {
            return Object.keys(this.elements).length;
        };
        //Pretvaranje selektovanog JSON elementa u Array radi dinamickog ispisa
        RangeDumil08.prototype.getElement = function (index) {
            var ell = this.elements[index];
            var elementasarray = [];
            for (var attr in ell) {
                elementasarray.push(ell[attr]);
            }
            return elementasarray;
        };
        //Azuriranje komponente usled promene pozijie selektora
        RangeDumil08.prototype.changeRange = function () {
            this.index = $((this.dumilrange)[1][0]).val();
            var ell = this.getElement(this.index);
            $((this.dumilrange)[1][1]).val(ell[1]);
            $((this.dumilrange)[1][2]).val(ell[0]);
        };
        //Akcija koja ce se odigrati nakon klika na dugme
        RangeDumil08.prototype.clickRange = function () {
            switch (this.option) {
                case ("Logo"): {
                    var ell = this.getElement(this.index);
                    new modifylogo.ModifyLogo(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                }
                case ("Page"):
                    var ell = this.getElement(this.index);
                    new modifypage.ModiffyPage(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                case ("Link"):
                    var ell = this.getElement(this.index);
                    new modifylink.ModifyLink(parseInt(ell[0])).createFormInParent(this.newoptionparent, true);
                    break;
                case ("Menu"):
                    var ell = this.getElement(this.index);
                    new modifymeni.ModifyMenu(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                case ("Gallery"):
                    var ell = this.getElement(this.index);
                    new modifygallery.ModifyGallery(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                case ("Text"):
                    var ell = this.getElement(this.index);
                    new modifytext.ModifyText(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                case ("Category"):
                    var ell = this.getElement(this.index);
                    new modifycategory.ModifyCategory(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                case ("Service"):
                    var ell = this.getElement(this.index);
                    new modifyservice.ModifyService(parseInt(ell[0])).createFormInParent(this.newoptionparent);
                    break;
                //Opcija kojom se Range moze koristiti po potrebi    
                default:
                    var ell = this.getElement(this.index);
                    this.option(ell[0], this.object);
            }
        };
        RangeDumil08.prototype.removeRange = function () {
            $(this.dumilrange).parent().slideUp();
            $(this.dumilrange).parent().empty();
        };
        return RangeDumil08;
    }());
    exports.RangeDumil08 = RangeDumil08;
});
