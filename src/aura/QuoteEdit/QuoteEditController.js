/**
* Created by gmaggi on 07/12/2021
*/
({
    doInit: function(component) {
        var recordId = component.get("v.recordId");
        component.set('v.isLoading', true);
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": "/apex/QuoteWizard?Id=" + recordId
        });
        urlEvent.fire();
    }
});