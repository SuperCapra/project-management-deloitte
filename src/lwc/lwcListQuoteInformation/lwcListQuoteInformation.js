import { LightningElement, api } from 'lwc';
 
export default class LwcListQuoteInformation extends LightningElement {
    @api quoteInformation

    handleChange(event) {
        const dataChange = {
            detail : {
                name : event.target.name,
                value : event.target.value
            }
        }
        const changeEvent = new CustomEvent('change', dataChange)
        this.dispatchEvent(changeEvent)
    }
}