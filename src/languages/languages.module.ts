import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LangComponent } from "./languages.component";

@NgModule({
    declarations: [
        //LangComponent  //DISABLED due to npm run dist error message.
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [LangComponent]
})
export class LangModule { }