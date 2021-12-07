/**
Created by gmaggi on 07/12/2021
*/
public with sharing class QuoteWizardCtrl {
    @AuraEnabled
    public static Quote retrieveInfoQuote(String quoteId) {
        return [SELECT Name, Id FROM Quote WHERE id = :quoteId];
    } 
}