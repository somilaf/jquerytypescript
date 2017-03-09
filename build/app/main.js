define(["require", "exports", './htmlcomponents/adminoption'], function (require, exports, adminoption) {
    "use strict";
    var baseurlsservera = "pagelinks/get_Id_Name";
    $(document).ready(function () {
        var mainenav = $("#mainNav");
        var mobilebutton = mainenav.find(".mobileNav");
        mobilebutton.click(function (e) {
            e.preventDefault();
            mainenav.find("ul li").slideToggle();
        });
        mainenav.find("li").click(function (e) {
            e.preventDefault();
            alertify.error("Ovo su Demo Linkovi.");
            if (mobilebutton.is(":visible")) {
                mainenav.find("ul li").slideToggle();
            }
        });
        var aside = $("#asidenav ul").empty();
        $("#pickElement").empty();
        var main = $("#makeAction").empty();
        var actionbuttoncontainer = $("#selectOption").empty();
        var pageadminoption = new adminoption.AdminOption("Page Admin", "Page");
        var linkadminoption = new adminoption.AdminOption("Link Admin", "Link");
        var logoadminoption = new adminoption.AdminOption("Logo Admin", "Logo");
        var menuadminoption = new adminoption.AdminOption("Meniji Admin", "Menu");
        var galleryadminoption = new adminoption.AdminOption("Galerije Admin", "Gallery");
        var textadminoption = new adminoption.AdminOption("Tekstovi Admin", "Text");
        var categoryadminoption = new adminoption.AdminOption("Kategorije Admin", "Category");
        var serviceadminoption = new adminoption.AdminOption("Usluge Admin", "Service");
        aside.append(pageadminoption.createAdminOption());
        aside.append(linkadminoption.createAdminOption());
        aside.append(logoadminoption.createAdminOption());
        aside.append(menuadminoption.createAdminOption());
        aside.append(galleryadminoption.createAdminOption());
        aside.append(textadminoption.createAdminOption());
        aside.append(categoryadminoption.createAdminOption());
        aside.append(serviceadminoption.createAdminOption());
        pageadminoption.clickOption();
    });
});
