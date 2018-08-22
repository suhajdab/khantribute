import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { LangComponent } from "./languages.component";
import { AppServiceModule } from "../services/app.service.module";

@NgModule({
    declarations: [
        LangComponent
    ],
    imports: [
        BrowserModule,
        AppServiceModule
    ],
    providers: [],
    bootstrap: [LangComponent]
})
export class LangModule { }