/**
Created by gmaggi on 07/12/2021
*/
public with sharing class QuoteWizardCtrl {
    @AuraEnabled
    public static String retrieveInfoQuote(String quoteId) {
        QuoteWrapper qw = new QuoteWrapper(quoteId);
        if(quoteId != '') {
            qw.quote = [SELECT Name, 
                        Id,
                        AnalysisCost__c,
                        DevelopCost__c,
                        TestCost__c,
                        TotalDays__c,
                        MacroArguments__c
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
        }
        qw.labelQuoteMap = getLabelByApiName(new List<String>{'Name','AnalysisCost__c', 'DevelopCost__c', 'TestCost__c', 'TotalDays__c', 'MacroArguments__c'}, 'Quote');
        qw.labelQuoteLineItemMap = getLabelByApiName(new List<String>{'Description', 'UnitPrice', 'TotalPrice', 'MacroArgument__c', 'AnalysisDays__c', 'DevelopDays__c', 'TestDays__c', 'isStandard__c', 'isMustToHave__c'}, 'QuoteLineItem');
        return JSON.serialize(qw);
    } 

    // @AuraEnabled
    // public static String getMacroArguments() {
    //     return JSON.serialize(getListMacroArguments());
    // }

    private static List<PicklistWrapper> getListMacroArguments() {
        List<PicklistWrapper> plw = new List<PicklistWrapper>();
        for (PicklistEntry entry : Quote.MacroArguments__c.getDescribe().getPicklistValues()) {
            plw.add(new PicklistWrapper(entry.getLabel(),entry.getValue()));
        }
        return plw;
    }

    private static Map<String,String> getLabelByApiName(List<String> fieldList, String ObjectName) {
        Map<String,String> result = new Map<String,String>();

        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType leadSchema = schemaMap.get(ObjectName);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
        for (String fieldName: fieldList) {
            result.put(fieldName, fieldMap.get(fieldName).getDescribe().getLabel());
        }
        return result;
    }

    public class QuoteWrapper {
        Quote quote {get;set;}
        String quoteId {get;set;}
        List<QuoteLineItem> quoteLineItemList {get;set;}
        List<PicklistWrapper> macroArguments {get;set;}
        Map<String,String> labelQuoteMap {get;set;}
        Map<String,String> labelQuoteLineItemMap {get;set;}

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