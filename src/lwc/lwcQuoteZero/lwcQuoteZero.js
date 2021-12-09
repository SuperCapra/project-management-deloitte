import { LightningElement, api, track } from 'lwc';
 
export default class LwcQuoteZero extends LightningElement {
    @api macroArguments
    @api labelFields

    @track labelCreate = 'Create'
    @track disableCreate = true
    @track title = 'Initial Quote Information'
    @track isLoading = true

    @track macroArgumentsSelected = []
    @track quoteInformation = [{
        'name' : 'name',
        'apiName' : 'Name',
        'label' : undefined,
        'value' : undefined,
        'isText' : true,
        'isLarge' : true,
        'isVisible' : true,
    },{
        'name' : 'analysisCost',
        'apiName' : 'AnalysisCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
        'isSmall' : true,
        'isVisible' : true
    },{
        'name' : 'developCost',
        'apiName' : 'DevelopCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
        'isSmall' : true,
        'isVisible' : true
    },{
        'name' : 'testCost',
        'apiName' : 'TestCost__c',
        'label' : undefined,
        'value' : undefined,
        'isNumber' : true,
        'isSmall' : true,
        'isVisible' : true
    },{
        'name' : 'macroArguments',
        'apiName' : 'MacroArguments__c',
        'label' : undefined,
        'value' : undefined,
        'isCombobox' : true,
        'options' : [],
        'isNumber' : true,
        'isVisible' : true
    }]

    connectedCallback() {
        console.log('hey fromzero!')
        console.log('hey fromzero!', JSON.parse(JSON.stringify(this.macroArguments)))
        for(let element of this.quoteInformation) {
            element.label = this.labelFields[element.apiName]
            if(element.apiName === 'MacroArguments__c') element.options = this.macroArguments
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