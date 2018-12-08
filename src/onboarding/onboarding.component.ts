import { Component } from "@angular/core";
import M from "materialize-css";
import ls from "../util/ls";
import { lskeys } from "../data/lskeys";

@Component({
    selector: "onboarding",
    templateUrl: "./onboarding.component.html",
    styleUrls: ["./onboarding.component.css"]
})
export class OnboardingComponent {
    private modal;
    public hideModal = false;
    constructor() {}
    ngOnInit() {
        this.modal = M.Modal.init(document.getElementById("onboarding-modal"), {
            onCloseStart: this.handleModalClose.bind(this)
        });
        if (!ls.getItem(lskeys.MODAL)) this.modal.open();
    }
    handleModalClose() {
        if (this.hideModal) ls.setItem(lskeys.MODAL, true);
    }
}