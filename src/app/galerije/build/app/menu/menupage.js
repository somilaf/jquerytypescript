define(["require", "exports", '../htmlcomponents/adminoption', '../htmlcomponents/range', "./menudb", '../formval'], function (require, exports, adminoption, range, menudb, formval) {
    "use strict";
    var menuPage = (function () {
        function menuPage() {
            var _this = this;
            this.dbmodule = new menudb.MenuDB;
            this.formval = new formval.FormVal();
            jQuery.validator.addClassRules("newlogoname", { required: true, regnaziv: true });
            jQuery.validator.addClassRules("fnewlogofile", { regfile: true });
            jQuery.validator.addClassRules("newlogopage", { regselect: true });
            this.newmenupageobj = $('<div class="newOption" id="advanceOptionMenuPage">' +
                '<h4 title="Advance menu FORM">Povžite menije sa Web Stranama</h4>' +
                '<section class="form">' +
                '<form id="advanceMenuPage" name="advanceMenuPage" action="" method="post" enctype="multipart/form-data">' +
                '<div class="inputgroup">' +
                '<label for="menuPage">Izaberite Stranicu:</label>' +
                '<select id="menuPage" name="menuPage" class="newpageselect">' +
                '<option value="-1">Izaberite</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup">' +
                '<label for="menuPosition">Pozicija menija:</label>' +
                '<select id="menuPosition" name="menuPosition" class="newpageselect" disabled>' +
                '<option value="-1">Izaberite</option>' +
                '<option value="1">Header</option>' +
                '<option value="2">Footer</option>' +
                '<option value="3">RightSide</option>' +
                '<option value="4">LeftSide</option>' +
                '</select>' +
                '</div>' +
                '<div class="inputgroup"><ul id="menuPreview"></ul>' +
                '</div>' +
                '<div id="formButtons" name="formButtons" class="inputgroup">' +
                '<button id="modifyMenu" type="submit">Prikaži</button>' +
                '<button id="deleteMenu" type="submit">Ukloni</button>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '<div class="row"><div id="menuRange" class="rangeStyling col-wd-12 "></div></div>' +
                '</div>');
            this.newmenupageform = this.newmenupageobj.find("form");
            this.menuposition = this.newmenupageform.find("#menuPosition");
            this.rangecontainer = this.newmenupageobj.find("#menuRange");
            this.menusample = this.newmenupageform.find("#menuPreview");
            this.page = this.newmenupageform.find("#menuPage");
            this.formbuttons = this.newmenupageform.find("#formButtons");
            this.formbuttons.find("#modifyMenu").hide();
            this.formbuttons.hide();
            this.page.change(function (e) {
                e.preventDefault();
                if ($(e.target).val() !== "-1") {
                    _this.menuposition.prop("disabled", false);
                }
                else {
                    _this.formbuttons.hide();
                    _this.menuposition.val("-1");
                    _this.menuposition.prop("disabled", true);
                    _this.rangecontainer.empty();
                    _this.menusample.empty();
                }
            });
            this.menuposition.change(function (e) {
                e.preventDefault();
                if ($(e.target).val() !== "-1") {
                    _this.getMemuPagePosition();
                    _this.formbuttons.show();
                }
                else {
                    _this.formbuttons.hide();
                    _this.rangecontainer.empty();
                    _this.menusample.empty();
                }
            });
            this.formbuttons.find("#deleteMenu").click(function (e) {
                e.preventDefault();
                _this.removeMenuFromPage();
            });
            this.formbuttons.find("#modifyMenu").click(function (e) {
                e.preventDefault();
                _this.showMenuPage();
            });
        }
        menuPage.prototype.getMemuPagePosition = function () {
            var _this = this;
            var data = new FormData;
            data.append("PageId", this.page.val());
            data.append("MenuPosition", this.menuposition.val());
            var linkpromise = this.dbmodule.getPageMenuLinks(data);
            linkpromise.zahtev.done(function () {
                var tmplinks = $.parseJSON(linkpromise.zahtev.responseText);
                _this.menusample.empty();
                _this.buildMenu(tmplinks);
                _this.getRangeByPosition();
            });
            linkpromise.zahtev.fail(function () {
                _this.menusample.empty();
                alertify.error("Nije odabran meni za datu poziciju.");
                _this.getRangeByPosition();
            });
        };
        menuPage.prototype.getRangeByPosition = function () {
            var _this = this;
            this.rangecontainer.empty();
            var data = new FormData;
            data.append("MenuPosition", this.menuposition.val());
            var menuesrangepromise = this.dbmodule.getMenuByPosition(data);
            menuesrangepromise.zahtev.done(function () {
                _this.range = new range.RangeDumil08("Odaberite novi meni", $.parseJSON(menuesrangepromise.zahtev.responseText), _this.setMenu, null, _this);
                _this.range.createInParent(_this.rangecontainer, true);
            });
            menuesrangepromise.zahtev.fail(function () {
                alertify.error("Ne postoji nijedan meni za odabranu poziciju.");
            });
        };
        menuPage.prototype.buildMenu = function (links) {
            this.menusample.empty();
            var meni = "";
            var row = -1;
            for (var link in links) {
                if (parseInt(links[link].row) !== row) {
                    row = parseInt(links[link].row);
                    meni += '<li id="' + links[link].linkid + '" class="firstLink"">' + links[link].linkdescription;
                    meni += hasKids(links[link], links);
                }
            }
            this.menusample.append(meni);
            function hasKids(parent, array) {
                meni = "";
                if (parseInt(parent.isparent) === 1) {
                    meni += '<ul>';
                    for (var link in array) {
                        if (array[link].parentlinkid === parent.linkid) {
                            if (parseInt(array[link].isparent) === 1) {
                                meni += '<li id="' + links[link].linkid + '" class="sublink parentLink">' + array[link].linkdescription;
                                meni += hasKids(array[link], array);
                            }
                            else {
                                meni += '<li id="' + links[link].linkid + '" class="sublink">' + array[link].linkdescription + '</li>';
                            }
                        }
                    }
                    meni += "</ul>";
                }
                meni += "</li>";
                return meni;
            }
        };
        menuPage.prototype.showMenuPage = function () {
            var data = new FormData();
            data.append("PageId", this.page.val());
            data.append("MenuId", this.menuid);
            data.append("MenuPosition", this.menuposition.val());
            var showmenupromise = this.dbmodule.showPageMenu(data);
            showmenupromise.zahtev.done(function () {
                alertify.success("Uspešno ste dodali Tekst na Web Stranu.");
            });
        };
        menuPage.prototype.removeMenuFromPage = function () {
            var _this = this;
            alertify.confirm('Dumil08', 'Da li želite da uklonite Meni sa Web Strane?', function () {
                var data = new FormData();
                data.append("PageId", _this.page.val());
                data.append("MenuPosition", _this.menuposition.val());
                var removemenupromise = _this.dbmodule.removePageMenu(data);
                removemenupromise.zahtev.done(function () {
                    alertify.success('Uspešno ste uklonili Meni sa Web Strane.');
                    _this.removeFormFromParent();
                });
            }, function () {
                alertify.error('Odustali ste od promene Menija.');
            });
        };
        menuPage.prototype.fillPagesDD = function (pages) {
            var _this = this;
            if (pages) {
                var p = 0;
                $(pages).each(function () {
                    _this.page.append("<option value=" + pages[p].sitepageid + " data-galleryid=" + pages[p].galleryid + ">" + pages[p].sitepagename + "</option>");
                    p++;
                });
            }
        };
        menuPage.prototype.setMenu = function (menuid, object) {
            if (menuid === void 0) { menuid = null; }
            if (object === void 0) { object = null; }
            if (menuid && object) {
                var data = new FormData();
                data.append("MenuId", menuid.toString());
                var menulinkspromise = object.dbmodule.getMenuLinks(data);
                menulinkspromise.zahtev.done(function () {
                    object.menuid = menuid;
                    var tmpLinks = $.parseJSON(menulinkspromise.zahtev.responseText);
                    object.buildMenu(tmpLinks);
                    object.formbuttons.slideDown();
                    object.formbuttons.find("#modifyMenu").show();
                });
            }
        };
        menuPage.prototype.fillForm = function () {
            var _this = this;
            var allpagespromise = this.dbmodule.getPagesDropDownAjax();
            var allmenuespromise = this.dbmodule.allSiteMenuesAjax();
            var combinepromise = $.when(allpagespromise.zahtev, allmenuespromise.zahtev);
            combinepromise.done(function () {
                _this.fillPagesDD($.parseJSON(allpagespromise.zahtev.responseText));
            });
        };
        menuPage.prototype.setgallery = function (gallerycontentid, object) {
            if (gallerycontentid === void 0) { gallerycontentid = null; }
            if (object === void 0) { object = null; }
            if (gallerycontentid && object) {
                var data = new FormData();
                data.append("GalleryId", gallerycontentid.toString());
                object.galleryid = gallerycontentid.toString();
                var galleryelementpromise = object.dbmodule.getGalleriePicturesAjax(data);
                galleryelementpromise.zahtev.done(function () {
                    object.createGallery($.parseJSON(galleryelementpromise.zahtev.responseText));
                    object.formbuttons.slideDown();
                    object.formbuttons.find("#modifyGAllery").show();
                });
            }
        };
        menuPage.prototype.createFormInParent = function (parent, parentempty) {
            if (parentempty === void 0) { parentempty = true; }
            parentempty === true ? parent.empty() : false;
            this.fillForm();
            parent.append($(this.newmenupageobj));
        };
        menuPage.prototype.removeFormFromParent = function () {
            var tmpAdminOption = new adminoption.AdminOption("Meniji Admin", "Menu");
            $(tmpAdminOption.option).trigger("click");
        };
        return menuPage;
    }());
    exports.menuPage = menuPage;
});
