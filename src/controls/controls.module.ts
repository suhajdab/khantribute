import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ControlsComponent } from "./controls.component";

@NgModule({
    declarations: [
        ControlsComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [ControlsComponent]
})
export class ControlsModule { }