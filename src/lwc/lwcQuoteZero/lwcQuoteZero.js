import { LightningElement, api, track } from 'lwc';
 
export default class LwcQuoteZero extends LightningElement {
    @api macroArguments

    connectedCallback() {
        console.log('hey fromzero!')
        console.log('hey fromzero!', JSON.parse(JSON.stringify(this.macroArguments)))
    }
}