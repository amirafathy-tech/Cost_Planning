using ZAPI_BUSINESS_PARTNER from './external/ZAPI_BUSINESS_PARTNER.cds';

service ZAPI_BUSINESS_PARTNERSampleService {
    @readonly
    entity A_Supplier as projection on ZAPI_BUSINESS_PARTNER.A_Supplier
    {        key Supplier, AlternativePayeeAccountNumber, AuthorizationGroup, CreatedByUser, CreationDate, Customer, PaymentIsBlockedForSupplier, PostingIsBlocked, PurchasingIsBlocked, SupplierAccountGroup, SupplierFullName, SupplierName, VATRegistration, BirthDate, ConcatenatedInternationalLocNo, DeletionIndicator, FiscalAddress, Industry, InternationalLocationNumber1, InternationalLocationNumber2, InternationalLocationNumber3, IsNaturalPerson, PaymentReason, ResponsibleType, SuplrQltyInProcmtCertfnValidTo, SuplrQualityManagementSystem, SupplierCorporateGroup, SupplierProcurementBlock, TaxNumber1, TaxNumber2, TaxNumber3, TaxNumber4, TaxNumber5, TaxNumberResponsible, TaxNumberType, SuplrProofOfDelivRlvtCode, BR_TaxIsSplit, DataExchangeInstructionKey     }    
;
}