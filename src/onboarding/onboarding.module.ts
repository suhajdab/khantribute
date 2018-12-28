import { NgModule } from "@angular/core";
import { OnboardingComponent } from "./onboarding.component";
import { BrowserModule } from "@angular/platform-browser";
import M from "materialize-css";

@NgModule({
    declarations: [
        //OnboardingComponent  //DISABLED due to npm run dist error message.
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [ OnboardingComponent ]
})
export class OnboardingModule { }
