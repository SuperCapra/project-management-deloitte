/**
Created by gmaggi on 07/12/2021
*/
public with sharing class QuoteWizardCtrl {
    public static String quoteId {get;set;}
    // public static String contactId {get;set;}
    // public static String masterError {get;set;}
    // public static Map<String,List<String>> valuesMap;

    public QuoteWizardCtrl(){
        quoteId = null;
        // serialNumber = ApexPages.currentPage().getParameters().get('id');
        // contactId = ApexPages.currentPage().getParameters().get('cid');
        // masterError = ApexPages.currentPage().getParameters().get('error');
        // serialNumber = serialNumber == null || serialNumber == '' ? 'NA' : serialNumber.replaceAll('\\\\','-');
    } 
}