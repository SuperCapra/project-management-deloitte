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
        'id' : 1,
        'required' : true,
        'name' : 'name',
        'apiName' : 'Name',
        'label' : undefined,
        'value' : undefined,
        'isText' : true,
        'isLarge' : true,
        'isVisible' : true,
    },{
        'id' : 2,
        'required' : true,
        'name' : 'analysisCost',
        'apiName' : 'AnalysisCost__c',
        'label' : undefined,
        'value' : undefined,
        'isCurrency' : true,
        'currency' : '€',
        'step': '0.01',
        'isSmall' : true,
        'isVisible' : true
    },{
        'id' : 3,
        'required' : true,
        'name' : 'developCost',
        'apiName' : 'DevelopCost__c',
        'label' : undefined,
        'value' : undefined,
        'isCurrency' : true,
        'currency' : '€',
        'step': '0.01',
        'isSmall' : true,
        'isVisible' : true
    },{
        'id' : 4,
        'required' : true,
        'name' : 'testCost',
        'apiName' : 'TestCost__c',
        'label' : undefined,
        'value' : undefined,
        'isCurrency' : true,
        'currency' : '€',
        'step': '0.01',
        'isSmall' : true,
        'isVisible' : true
    },{
        'id' : 5,
        'required' : true,
        'name' : 'macroArguments',
        'apiName' : 'MacroArguments__c',
        'label' : undefined,
        'isLarge' : true,
        'value' : undefined,
        'isDual' : true,
        'options' : [],
        'isNumber' : true,
        'isVisible' : true
    }]

    // for the macro arguments si potrebbe fare un oggetto e vado a prendere i macro argomenti da lì, così si può gestire il tutto da lì, quindi l'aggiunta e via dicendo

    connectedCallback() {
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

    handleSetValue(event) {
        let detail = event.detail
        console.log('handleSetValue: ', JSON.parse(JSON.stringify(event.detail)))
        let indexName = this.quoteInformation.findIndex(x => x.name === detail.name)
        if(indexName > -1) this.quoteInformation[indexName].value = detail.value
        console.log('quoteInformation: ', JSON.parse(JSON.stringify(this.quoteInformation)))
        this.checkCanSave()
    }

    checkCanSave() {
        let canSave = true
        for(let element of this.quoteInformation) {
            if(element.required && !element.value) canSave = false
        }
        this.disableCreate = !canSave
    }

    navigateBack() {
        history.back()
    }
}