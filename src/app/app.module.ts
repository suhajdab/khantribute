import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LangComponent } from "../languages/languages.component";
import { UserComponent } from "../user/user.component";

@NgModule({
    declarations: [
        AppComponent,
        LangComponent,
        UserComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
