import { LightningElement, api, track } from 'lwc';
import retrieveInfoQuote from '@salesforce/apex/QuoteWizardCtrl.retrieveInfoQuote'
// import getMacroArguments from '@salesforce/apex/QuoteWizardCtrl.getMacroArguments'
 
export default class LwcQuoteWizard extends LightningElement {
    @api quoteId

    @track quoteWrapper
    @track macroArguments
    @track isLoading = true
    @track fromZero = false
    @track labelFieldsQuote

    connectedCallback() {
        console.log('Quote Id: ', this.quoteId)
        retrieveInfoQuote({
            quoteId: this.quoteId
        }).then(res => {
            if(res) {
                console.log('mannaggia')
                this.quoteWrapper = JSON.parse(res)
                // this.labelFieldsQuote = this.quoteWrapper.labelQuoteMap
                this.getMacroArguments = this.quoteWrapper.macroArguments
                console.log('QuoteWrapper: ', JSON.parse(JSON.stringify(this.quoteWrapper)))
                if(this.quoteId) {
                    this.fromZero = false
                } else {
                    this.fromZero = true
                }
                this.isLoading = false
            }
        }).catch(e => {
            console.log('Exception: ', e)
        })
    }

    @api
    reloadComponent() {
        this.connectedCallback()
    }
}