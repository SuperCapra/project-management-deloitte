import { LightningElement, api, track } from 'lwc';
 
export default class LwcQuoteWizard extends LightningElement {
    @api quoteId

    connectedCallback() {
        console.log('mannaggia', this.quoteId)
    }

    @api
    reloadComponent() {
        this.connectedCallback()
    }
}