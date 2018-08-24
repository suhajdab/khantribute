import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LangComponent } from "./languages.component";

@NgModule({
    declarations: [
        LangComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [LangComponent]
})
export class LangModule { }