import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { UserComponent } from "./user.component";

@NgModule({
    declarations: [
        //UserComponent //DISABLED due to npm run dist error message.
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [UserComponent]
})
export class UserModule { }