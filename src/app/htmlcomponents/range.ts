//Pozivanje klasa objekata koje koristimo
import modifylogo = require('../logo/modifylogo');
import modifypage = require('../page/modifypage');
import modifylink = require('../link/modifylink');
import modifymeni = require('../menu/modifymenu');
import modifygallery = require('../galerije/modifygallery');
import modifytext = require('../texts/modifytext');
import modifyservice = require('../services/modifyservice');
import modifycategory = require('../servicecategories/modifycategory');

//Klasa za generisanje range selektora za pojedinacne komponente koju zelimo da modifikujemo
export class RangeDumil08 {

    //Opis kategorija
    label: string;
    //Vrsta admin objekta ili callback funkcija
    option: any;
    //Json objekat sa elementima  
    elements: any;
    //Trenutno izabrani element
    selectedelement: string;
    //Html-Jquery objekat koji sadrzi HTML komponente
    dumilrange: Object;
    //Funkcija koja treba da se izvrski kao CallBack nakon odabira
    newoptionparent: JQuery;
    //Index selektovanog elemenat u range
    index: any;
    //Object
    object: any;
    constructor(label: string, elements: any = 0, option: any, newoptionparent, object: any = null) {
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
                '<form>'+
                '<div class="inputgroup">' +
                '<label>' + this.label + ':</label>' +
                '<input type="range" id="rnLogos" name="rnLogos" value="0" min="0" max="' + (this.countElements() >= 1 ? this.countElements() - 1 : this.countElements()) + '" />' +
                '<output id="opLogos" name="opLogos" for="rnLogos">' + this.selectedelement + ' </output>' +
                '<input type="hidden" value="' + this.getElement(0)[0] + '"/>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<button type="submit">Izaberi</input></div>' +
                '</form>');

        $((this.dumilrange)[1]).change(() => {
            this.changeRange();
        });
        $((this.dumilrange)[1][3]).click((event) => {
            event.preventDefault();
            this.clickRange();
            this.scrollToParent();
        });
    }

    scrollToParent() {
        var location = { "x": $(this.newoptionparent).offset().top, "y": $(this.newoptionparent).offset().left };
        $("html, body").animate({
            scrollTop: (location.y, location.x)
        }, 500);
    }
    //Metoda za ispisvanje komponente u HTML formi
    createRange() {
        return $(this.dumilrange);
    }
    createInParent(parent: JQuery, parentEmpty: boolean = true) {
        parentEmpty == true ? parent.empty() : false;
        parent.append($(this.dumilrange));
    }
    //Broj elemenata koji su prosledjeni selektoru
    countElements(): number {
        return Object.keys(this.elements).length;
    }
    //Pretvaranje selektovanog JSON elementa u Array radi dinamickog ispisa
    getElement(index): Object {
        var ell = this.elements[index];
        var elementasarray = [];
        for (var attr in ell) {
            elementasarray.push(ell[attr]);
        }
        return elementasarray;
    }
    //Azuriranje komponente usled promene pozijie selektora
    changeRange(): void {
        this.index = $((this.dumilrange)[1][0]).val();
        var ell = this.getElement(this.index);
        $((this.dumilrange)[1][1]).val(ell[1]);
        $((this.dumilrange)[1][2]).val(ell[0])
    }
    //Akcija koja ce se odigrati nakon klika na dugme
    clickRange(): any {
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
    }
    removeRange(): void {
        $(this.dumilrange).parent().slideUp();
        $(this.dumilrange).parent().empty();
    }
}