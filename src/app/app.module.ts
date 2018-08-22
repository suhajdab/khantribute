import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LangComponent } from "../languages/languages.component";
import { UserComponent } from "../user/user.component";
import { ControlsComponent } from "../controls/controls.component";
import { HttpClientModule } from "@angular/common/http";
import { AppServiceModule } from "../services/app.service.module";
import { AppService } from "../services/app.service";

@NgModule({
    declarations: [
        AppComponent,
        LangComponent,
        UserComponent,
        ControlsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppServiceModule
    ],
    providers: [ AppService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
