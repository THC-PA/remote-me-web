export class HowToApply {
    isEmailLink: boolean = false;
    applyUrl: string = '';
    applyText: string = '';

    constructor(isEmailLink: boolean, applyUrl: string, applyText: string) {
        this.isEmailLink = isEmailLink;
        this.applyText = applyText;
        this.applyUrl = applyUrl;
    }
}