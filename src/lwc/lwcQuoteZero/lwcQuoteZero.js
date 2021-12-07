import { LightningElement, api, track } from 'lwc';
 
export default class LwcQuoteZero extends LightningElement {
    @api macroArguments
    @api labelFields

    @track labelCreate = 'Create'
    @track disableCreate = true
    @track title = 'Initial Quote Information'
    @track isLoading = true

    @track quoteInformation = [{
        'name' : 'Name',
        'apiName' : 'Name',
        'label' : undefined,
        'value' : undefined,
        'isText' : true,
    },{
        'name' : 'analysisCost',
        'apiName' : 'AnalysisCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
    },{
        'name' : 'developCost',
        'apiName' : 'DevelopCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
    },{
        'name' : 'testCost',
        'apiName' : 'TestCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
    }]

    connectedCallback() {
        console.log('hey fromzero!')
        console.log('hey fromzero!', JSON.parse(JSON.stringify(this.macroArguments)))
        for(let element of this.quoteInformation) {
            element.label = this.labelFields[element.apiName]
        }
        console.log('hey fromzero!', JSON.parse(JSON.stringify(this.quoteInformation)))
        this.isLoading = false
    }

    closeModal() {
        this.navigateBack()
    }

    handleBack() {
        this.navigateBack()
    }

    handleCreate() {

    }

    navigateBack() {
        history.back()
    }
}