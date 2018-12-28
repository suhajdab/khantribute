import { NgModule } from "@angular/core";
import { CardComponent } from "./card.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        //CardComponent //DISABLED due to npm run dist error message.
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [ CardComponent ]
})
export class CardModule { }