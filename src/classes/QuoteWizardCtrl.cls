/**
Created by gmaggi on 07/12/2021
*/
public with sharing class QuoteWizardCtrl {
    @AuraEnabled
    public static String retrieveInfoQuote(String quoteId) {
        QuoteWrapper qw = new QuoteWrapper(quoteId);
        qw.quote = [SELECT Name, 
                    Id,
                    AnalysisCost__c,
                    DevelopCost__c,
                    TestCost__c,
                    TotalDays__c
                    FROM Quote WHERE id = :quoteId];
        qw.quoteLineItemList = [SELECT Description, 
                                Id,
                                QuoteId,
                                UnitPrice,
                                TotalPrice,
                                MacroArgument__c,
                                AnalysisDays__c,
                                DevelopDays__c,
                                TestDays__c,
                                isStandard__c,
                                isMustToHave__c FROM QuoteLineItem WHERE QuoteId = :quoteId];
        return JSON.serialize(qw);
    } 

    @AuraEnabled
    public static String getMacroArguments() {
        return JSON.serialize(getListMacroArguments());
    }

    private static List<PicklistWrapper> getListMacroArguments() {
        List<PicklistWrapper> plw = new List<PicklistWrapper>();
        for (PicklistEntry entry : QuoteLineItem.MacroArgument__c.getDescribe().getPicklistValues()) {
            plw.add(new PicklistWrapper(entry.getLabel(),entry.getValue()));
        }
        return plw;
    }

    public class QuoteWrapper {
        Quote quote {get;set;}
        String quoteId {get;set;}
        List<QuoteLineItem> quoteLineItemList {get;set;}
        List<PicklistWrapper> macroArguments {get;set;}

        public QuoteWrapper(String quoteId) {
            this.quoteId = quoteId;
            this.macroArguments = getListMacroArguments();
        }
    }

    public class PicklistWrapper{
        public String label {get;set;}
        public String value {get;set;}

        public PicklistWrapper(String label, String value){
            this.label = label;
            this.value = value;
        }
    }
}