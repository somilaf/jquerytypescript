define(["require", "exports"], function (require, exports) {
    "use strict";
    var FormVal = (function () {
        function FormVal() {
            this.rename = "regnaziv";
            this.onefile = "regfile";
            this.selectreg = "regselect";
            $.validator.messages['required'] = "Polje ne sme biti prazno.";
            jQuery.validator.addMethod(this.selectreg, function name(value, element) {
                return value === "-1" ? false : true;
            }, "Morate izabrati neku od opcija.");
            jQuery.validator.addMethod(this.onefile, function name(value, element) {
                return value ? true : false;
            }, "Izaberite sliku i predjite na sledeće polje.");
            jQuery.validator.addMethod(this.rename, function (value, element) {
                return this.optional(element) || /^([a-zA-ZšŠđĐžŽčČćĆ10-9\s\-,]{3,})$/.test(value);
            }, 'Samo slova i brojevi, minimum 2 karaktera.');
            jQuery.validator.setDefaults({
                errorClass: "has-error",
                validClass: "has-success",
                success: function (label) {
                    label.addClass('label-noerror').html("<i class='fa  fa-check'>");
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parent().addClass(errorClass).removeClass(validClass);
                    $(element).parent().next("label").addClass('label-error').removeClass('label-noerror');
                },
                unhighlight: function (element, errorClass, validClass) {
                    var roditelj = $(element).parent();
                    roditelj.removeClass(errorClass).addClass(validClass);
                },
                errorPlacement: function (error, element) {
                    //error.insertAfter(element.parent()).css("color", "red");
                    error.insertAfter(element.parent()).addClass('label-error');
                },
                errorElement: "label",
                debug: true
            });
        }
        FormVal.prototype.functionValidate = function (form) {
            $(form).validate({});
        };
        return FormVal;
    }());
    exports.FormVal = FormVal;
});
