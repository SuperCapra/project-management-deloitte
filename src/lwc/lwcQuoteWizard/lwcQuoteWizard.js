import { LightningElement, api, track } from 'lwc';
import retrieveInfoQuote from '@salesforce/apex/QuoteWizardCtrl.retrieveInfoQuote'
import getMacroArguments from '@salesforce/apex/QuoteWizardCtrl.getMacroArguments'
 
export default class LwcQuoteWizard extends LightningElement {
    @api quoteId

    @track quoteWrapper
    @track macroArguments
    @track isLoading = true
    @track fromZero = false

    connectedCallback() {
        console.log('Quote Id: ', this.quoteId)
        if(this.quoteId) {
            retrieveInfoQuote({
                quoteId: this.quoteId
            }).then(res => {
                if(res) {
                    console.log('mannaggia')
                    this.quoteWrapper = JSON.parse(res)
                    console.log(JSON.parse(JSON.stringify(this.quoteWrapper)))
                    this.fromZero = false
                    this.isLoading = false
                }
            }).catch(e => {
                console.log('Exception: ', e)
            })
        } else {
            getMacroArguments({}).then(res => {
                if(res) {
                    console.log('mannaggina')
                    this.macroArguments = JSON.parse(res)
                    console.log(JSON.parse(JSON.stringify(this.macroArguments)))
                    this.fromZero = true
                    this.isLoading = false
                }
            }).catch(e => {
                console.log('Exception: ', e)
            })
        }
    }

    @api
    reloadComponent() {
        this.connectedCallback()
    }
}