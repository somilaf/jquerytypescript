import newbutton = require("./actionoptions/actionbutton");
import selectbutton = require("./actionoptions/selectbutton");
import advanceselect = require("./actionoptions/advanceselect");
import logo = require('../logo/newlogo');
export class AdminOption {
    parentcontainer: JQuery;
    private optiondescription: string;
    private optionobject: string;
    option: any;
    constructor(optiondescription, obj) {
        this.parentcontainer = $("#selectOption");
        this.optiondescription = optiondescription;
        this.optionobject = obj;
        this.option = $("<li><a href='#'>" + this.optiondescription + "</a></li>");
        $(this.option).click((event) => {
            event.preventDefault();
            this.clickOption();
            this.scrollToParent();
        });
    }
    scrollToParent() {
        var location = { "x": $(this.parentcontainer).offset().top, "y": $(this.parentcontainer).offset().left };
        console.log(location);
        $("html, body").animate({
            scrollTop: (location.y, location.x-50)
        }, 300);
    }
    createAdminOption() {
        return $(this.option);
    }
    clickOption(): void {
        this.parentcontainer.empty();
        var newForm = new newbutton.Actionbutton(this.optionobject);
        var selectForm = new selectbutton.Selectbutton(this.optionobject);
        var advanceSelect = new advanceselect.Advaceselect(this.optionobject);
        this.parentcontainer.append(newForm.createButton());
        this.parentcontainer.append(selectForm.createButton());
        this.parentcontainer.append(advanceSelect.createButton());
    }
}
