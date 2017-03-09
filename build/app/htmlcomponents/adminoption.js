define(["require", "exports", "./actionoptions/actionbutton", "./actionoptions/selectbutton", "./actionoptions/advanceselect"], function (require, exports, newbutton, selectbutton, advanceselect) {
    "use strict";
    var AdminOption = (function () {
        function AdminOption(optiondescription, obj) {
            var _this = this;
            this.parentcontainer = $("#selectOption");
            this.optiondescription = optiondescription;
            this.optionobject = obj;
            this.option = $("<li><a href='#'>" + this.optiondescription + "</a></li>");
            $(this.option).click(function (event) {
                event.preventDefault();
                _this.clickOption();
                _this.scrollToParent();
            });
        }
        AdminOption.prototype.scrollToParent = function () {
            var location = { "x": $(this.parentcontainer).offset().top, "y": $(this.parentcontainer).offset().left };
            console.log(location);
            $("html, body").animate({
                scrollTop: (location.y, location.x - 50)
            }, 300);
        };
        AdminOption.prototype.createAdminOption = function () {
            return $(this.option);
        };
        AdminOption.prototype.clickOption = function () {
            this.parentcontainer.empty();
            var newForm = new newbutton.Actionbutton(this.optionobject);
            var selectForm = new selectbutton.Selectbutton(this.optionobject);
            var advanceSelect = new advanceselect.Advaceselect(this.optionobject);
            this.parentcontainer.append(newForm.createButton());
            this.parentcontainer.append(selectForm.createButton());
            this.parentcontainer.append(advanceSelect.createButton());
        };
        return AdminOption;
    }());
    exports.AdminOption = AdminOption;
});
