import textdb = require("./textdb");
export class Text {
    private textid: number;
    private textname: string;
    private textlanguage: string;
    private textcontent: string;
    private textpictures: any;
    private pagepositionactiv: any[];
    constructor(textname: string, textlanguage: string, textcontent: string,
        pictures: any = null, pagepositionactiv: any = null, textid: number = 0) {
        this.textname = textname;
        this.textlanguage = textlanguage;
        this.textcontent = textcontent;
        this.textpictures = pictures;
        this.pagepositionactiv = [];
        if (pagepositionactiv != null) {
            for (var p in pagepositionactiv) {
                this.pagepositionactiv.push(
                    pagepositionactiv[p]
                )
            }
        }
        this.textid = textid;
    }
    //Getters Setterssss
    setTextId(textid: number) {
        this.textid = textid;
    }
    getTextId(): number {
        return this.textid;
    }
    setTextName(textname: string) {
        this.textname = textname;
    }
    getTextName(): string {
        return this.textname;
    }
    setTextLanguage(language: string) {
        this.textlanguage = language;
    }
    getTextLanguage(): string {
        return this.textlanguage;
    }
    setTextContent(text: string) {
        this.textcontent = text;
    }
    getTextContent(): string {
        return this.textcontent;
    }
    setTextPictures(pictures) {
        if (pictures != null) {
            this.textpictures = [];
            for (var p in pictures) {
                this.textpictures.push(
                    pictures[p]
                );
            }
        }
    }
    getTextPictures(): any {
        return this.textpictures;
    }
    // end setters gettersssss.......
    compareText(text: Text): boolean {
        if (typeof (this) === typeof (text)) {
            if (this.textname !== text.textname) { return false; }
            if (this.textcontent !== text.textcontent) { return false; }
            if (this.textlanguage !== text.textlanguage) { return false; }
            if (this.textid !== text.textid) { return false; }
        }
        return true;
    }
    textToFormData() {
        var data = new FormData;
        data.append("TextContentName", this.textname);
        data.append("TextContentText", this.textcontent);
        data.append("TextLang", this.textlanguage);
        data.append("TextContentId", this.textid);
        return data;
    }
    imagesToFormData(data: FormData): FormData {
        var prazan = 0;
        this.textpictures.each(function () {
            if (this.value != "") {
                data.append("Image" + prazan, this.files[0]);
                prazan++;
            }
        });
        data.append("FileCount", prazan);
        return data;
    }




}
