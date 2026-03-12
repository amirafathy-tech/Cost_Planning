/* checksum : c055b472ff9a3ccbc46019ee36c8be20 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZAPI_SALES_QUOTATION_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'Sales Quotation Header'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  SalesQuotationType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Organization'
  SalesOrganization : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distribution Channel'
  DistributionChannel : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Division'
  OrganizationDivision : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Group'
  SalesGroup : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Office'
  SalesOffice : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales District'
  SalesDistrict : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-to Party'
  SoldToParty : String(10);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  @sap.quickinfo : 'Record Creation Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created By'
  @sap.quickinfo : 'Name of Person Responsible for Creating the Object'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Last Changed On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDate : Date;
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.label : 'Time Stamp'
  @sap.quickinfo : 'UTC Time Stamp in Long Form (YYYYMMDDhhmmssmmmuuun)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  @sap.label : 'Customer Reference'
  PurchaseOrderByCustomer : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Order Type'
  @sap.quickinfo : 'Customer Purchase Order Type'
  CustomerPurchaseOrderType : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Customer Ref. Date'
  @sap.quickinfo : 'Customer Reference Date'
  CustomerPurchaseOrderDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Document Date'
  @sap.quickinfo : 'Document Date (Date Received/Sent)'
  SalesQuotationDate : Date;
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Net Value'
  @sap.quickinfo : 'Net Value of the Sales Document in Document Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TotalNetAmount : Decimal(16, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Currency'
  @sap.quickinfo : 'SD Document Currency'
  @sap.semantics : 'currency-code'
  TransactionCurrency : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Reason'
  @sap.quickinfo : 'Order Reason (Reason for the Business Transaction)'
  SDDocumentReason : String(3);
  @sap.display.format : 'Date'
  @sap.label : 'Pricing Date'
  @sap.quickinfo : 'Date for Pricing and Exchange Rate'
  PricingDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Requested Delivery Date'
  RequestedDeliveryDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipping Conditions'
  ShippingCondition : String(2);
  @sap.label : 'Complete Delivery'
  @sap.quickinfo : 'Complete Delivery Defined for Each Sales Order'
  CompleteDeliveryIsDefined : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipping Type'
  ShippingType : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Billing Block'
  @sap.quickinfo : 'Billing Block in SD Document'
  HeaderBillingBlockReason : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Block'
  @sap.quickinfo : 'Delivery Block (Document Header)'
  DeliveryBlockReason : String(2);
  @sap.display.format : 'Date'
  @sap.label : 'Quotation Valid From'
  @sap.quickinfo : 'Quotation/Inquiry is Valid From'
  BindingPeriodValidityStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Quotation Valid To'
  @sap.quickinfo : 'Date Until Which Bid/Quotation is Binding (Valid-To Date)'
  BindingPeriodValidityEndDate : Date;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Probability'
  @sap.quickinfo : 'Sales probability'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  HdrOrderProbabilityInPercent : String(3);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Expd Ord Net Amt'
  @sap.quickinfo : 'Expected Order Net Amount'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ExpectedOrderNetAmount : Decimal(16, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  IncotermsClassification : String(3);
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms Version'
  IncotermsVersion : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Terms of Payment'
  @sap.quickinfo : 'Terms of Payment Key'
  CustomerPaymentTerms : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Price Group'
  CustomerPriceGroup : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Price List Type'
  PriceListType : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Payment Method'
  PaymentMethod : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Alt.Tax Classific.'
  @sap.quickinfo : 'Alternative Tax Classification'
  CustomerTaxClassification1 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.2 Customer'
  @sap.quickinfo : 'Tax Classification 2 for Customer'
  CustomerTaxClassification2 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.3 Customer'
  @sap.quickinfo : 'Tax Classification 3 for Customer'
  CustomerTaxClassification3 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.4 Customer'
  @sap.quickinfo : 'Tax Classification 4 for Customer'
  CustomerTaxClassification4 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.5 Customer'
  @sap.quickinfo : 'Tax Classification 5 for Customer'
  CustomerTaxClassification5 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.6 Customer'
  @sap.quickinfo : 'Tax Classification 6 for Customer'
  CustomerTaxClassification6 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.7 Customer'
  @sap.quickinfo : 'Tax Classification 7 for Customer'
  CustomerTaxClassification7 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.8 Customer'
  @sap.quickinfo : 'Tax Classification 8 for Customer'
  CustomerTaxClassification8 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Class.9 Customer'
  @sap.quickinfo : 'Tax Classification 9 for Customer'
  CustomerTaxClassification9 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Document'
  @sap.quickinfo : 'Document Number of Reference Document'
  ReferenceSDDocument : String(10);
  @sap.label : 'Preceding Doc.Categ.'
  @sap.quickinfo : 'Document Category of Preceding SD Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ReferenceSDDocumentCategory : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Approval Request Reason'
  @sap.quickinfo : 'Approval Request Reason ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SalesQuotationApprovalReason : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Approval Status'
  @sap.quickinfo : 'Document Approval Status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SalesDocApprovalStatus : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Overall Status'
  @sap.quickinfo : 'Overall Processing Status (Header/All Items)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  OverallSDProcessStatus : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Credit Status'
  @sap.quickinfo : 'Overall Status of Credit Checks'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TotalCreditCheckStatus : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Rejection Status'
  @sap.quickinfo : 'Rejection Status (All Items)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  OverallSDDocumentRejectionSts : String(1);
  @sap.label : 'cust_field_1'
  ZZ1_cust_field_1_SDH : String(20);
  to_Item : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
  to_Partner : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationPartner {  };
  to_PrecedingProcFlowDoc : Association to many ZAPI_SALES_QUOTATION_SRV.A_SlsQtanPrecdgProcFlow {  };
  to_PricingElement : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationPrcgElmnt {  };
  to_RelatedObject : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationRelatedObject {  };
  to_SubsequentProcFlowDoc : Association to many ZAPI_SALES_QUOTATION_SRV.A_SlsQtanSubsqntProcFlow {  };
  to_Text : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationText {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'Sales Quotation Item'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.text : 'SalesQuotationItemText'
  @sap.label : 'Sales Quotation Item'
  key SalesQuotationItem : String(6) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Higher-Level Item'
  @sap.quickinfo : 'Higher-Level Item in Bill of Material Structures'
  HigherLevelItem : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Category'
  @sap.quickinfo : 'Sales Document Item Category'
  SalesQuotationItemCategory : String(4);
  @sap.label : 'Item Description'
  @sap.quickinfo : 'Short text for sales order item'
  SalesQuotationItemText : String(40);
  @sap.label : 'Customer Reference'
  PurchaseOrderByCustomer : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Material'
  @sap.quickinfo : 'Material Number Used by Customer'
  MaterialByCustomer : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Pricing Ref. Matl'
  @sap.quickinfo : 'Pricing Reference Material'
  PricingReferenceMaterial : String(40);
  @sap.unit : 'RequestedQuantitySAPUnit'
  @sap.label : 'Requested Quantity'
  RequestedQuantity : Decimal(15, 3);
  @sap.label : 'Requested Qty Unit'
  @sap.quickinfo : 'Unit of the Requested Quantity'
  @sap.semantics : 'unit-of-measure'
  RequestedQuantityUnit : String(3);
  @sap.label : 'SAP Code Req. Qty'
  @sap.quickinfo : 'SAP Unit Code for Requested Quantity'
  @sap.semantics : 'unit-of-measure'
  RequestedQuantitySAPUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO Code Req. Qty'
  @sap.quickinfo : 'ISO Unit Code for Requested Quantity'
  RequestedQuantityISOUnit : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Probability'
  @sap.quickinfo : 'Order Probability of the Item'
  ItemOrderProbabilityInPercent : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Alternative to Item'
  @sap.quickinfo : 'Item for Which this Item is an Alternative'
  AlternativeToItem : String(6);
  @sap.unit : 'ItemWeightSAPUnit'
  @sap.label : 'Gross Weight'
  @sap.quickinfo : 'Gross Weight of the Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ItemGrossWeight : Decimal(15, 3);
  @sap.unit : 'ItemWeightSAPUnit'
  @sap.label : 'Net Weight'
  @sap.quickinfo : 'Net Weight of the Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ItemNetWeight : Decimal(15, 3);
  @sap.label : 'Unit of Weight'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  ItemWeightUnit : String(3);
  @sap.label : 'SAP Code Item Weight'
  @sap.quickinfo : 'SAP Unit Code for Item Weight'
  @sap.semantics : 'unit-of-measure'
  ItemWeightSAPUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO Code Item Weight'
  @sap.quickinfo : 'ISO Unit Code for Item Weight'
  ItemWeightISOUnit : String(3);
  @sap.unit : 'ItemVolumeSAPUnit'
  @sap.label : 'Volume'
  @sap.quickinfo : 'Volume of the item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ItemVolume : Decimal(15, 3);
  @sap.label : 'Volume Unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  ItemVolumeUnit : String(3);
  @sap.label : 'SAP Code f Item Vol.'
  @sap.quickinfo : 'SAP Unit Code for Item Volume'
  @sap.semantics : 'unit-of-measure'
  ItemVolumeSAPUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO Unit Item Volume'
  @sap.quickinfo : 'ISO Unit Code for Item Volume'
  ItemVolumeISOUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Currency'
  @sap.quickinfo : 'SD Document Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'currency-code'
  TransactionCurrency : String(5);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Net Value'
  @sap.quickinfo : 'Net Value of the Document Item in Document Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  NetAmount : Decimal(16, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  MaterialGroup : String(9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product Price Group'
  MaterialPricingGroup : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Batch'
  @sap.quickinfo : 'Batch Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Batch : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  @sap.quickinfo : 'Plant (Own or External)'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  IncotermsClassification : String(3);
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Terms of Payment'
  @sap.quickinfo : 'Terms of Payment Key'
  CustomerPaymentTerms : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification1 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification2 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification3 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification4 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification5 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification6 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification7 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification8 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Classifc. Mat.'
  @sap.quickinfo : 'Tax Classification for Material'
  ProductTaxClassification9 : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reason for Rejection'
  @sap.quickinfo : 'Reason for Rejection of Sales Documents'
  SalesDocumentRjcnReason : String(2);
  @sap.display.format : 'NonNegative'
  @sap.label : 'WBS Element'
  @sap.quickinfo : 'Work Breakdown Structure Element (WBS Element)'
  WBSElement : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Profit Center'
  ProfitCenter : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Document'
  @sap.quickinfo : 'Document Number of Reference Document'
  ReferenceSDDocument : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reference Item'
  @sap.quickinfo : 'Item number of the reference item'
  ReferenceSDDocumentItem : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Overall Status'
  @sap.quickinfo : 'Overall Processing Status (Item)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SDProcessStatus : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Requirement Segment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  RequirementSegment : String(40);
  to_Partner : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemPartner {  };
  to_PrecedingProcFlowDocItem : Association to many ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItmPrecdgProcFlow {  };
  to_PricingElement : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemPrcgElmnt {  };
  to_RelatedObject : Association to many ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItemRelatedObject {  };
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SubsequentProcFlowDocItem : Association to many ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItmSubsqntProcFlow {  };
  to_Text : Association to many ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemText {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Partner'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemPartner {
  @sap.display.format : 'UpperCase'
  @sap.label : 'SD Document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item (SD)'
  @sap.quickinfo : 'Item number of the SD document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotationItem : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Partner Function'
  key PartnerFunction : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Customer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier'
  @sap.quickinfo : 'Account Number of Supplier'
  Supplier : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Personnel Number'
  Personnel : String(8);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Contact Person'
  @sap.quickinfo : 'Number of Contact Person'
  ContactPerson : String(10);
  @sap.label : 'GUID of a Business Partner Address'
  @sap.heading : ''
  BusinessPartnerAddressUUID : UUID;
  @sap.label : 'GUID of a Business Partner Address'
  @sap.heading : ''
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BPRefAddrForDocSpcfcAddrUUID : UUID;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Pricing Element'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemPrcgElmnt {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Condition item number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotationItem : String(6) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Step Number'
  key PricingProcedureStep : String(3) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Counter'
  @sap.quickinfo : 'Condition Counter'
  key PricingProcedureCounter : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Type'
  ConditionType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Valid From'
  @sap.quickinfo : 'Timestamp for Pricing'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingDateTime : String(14);
  @sap.display.format : 'Date'
  @sap.label : 'Cndn Pricing Date'
  @sap.quickinfo : 'Condition Pricing Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PriceConditionDeterminationDte : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculation Type'
  @sap.quickinfo : 'Calculation Type for Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionCalculationType : String(3);
  @sap.label : 'Condition Basis'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionBaseValue : Decimal(24, 9);
  @sap.label : 'Amount'
  @sap.quickinfo : 'Condition Amount or Percentage'
  ConditionRateValue : Decimal(24, 9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  ConditionCurrency : String(5);
  @sap.unit : 'ConditionQuantitySAPUnit'
  @sap.label : 'Pricing Unit'
  @sap.quickinfo : 'Condition Pricing Unit'
  ConditionQuantity : Decimal(5, 0);
  @sap.label : 'Condition Unit'
  @sap.quickinfo : 'Condition Unit in the Document'
  @sap.semantics : 'unit-of-measure'
  ConditionQuantityUnit : String(3);
  @sap.label : 'SAP Condition Qty'
  @sap.quickinfo : 'SAP Unit Code for Condition Quantity'
  @sap.semantics : 'unit-of-measure'
  ConditionQuantitySAPUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO Condition Qty'
  @sap.quickinfo : 'ISO Unit Code for Condition Quantity'
  ConditionQuantityISOUnit : String(3);
  @sap.label : 'Condition Category'
  @sap.quickinfo : 'Condition Category (Examples: Tax, Freight, Price, Cost)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionCategory : String(1);
  @sap.label : 'Statistical'
  @sap.quickinfo : 'Condition is used for statistics'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsForStatistics : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingScaleType : String(1);
  @sap.label : 'Accruals'
  @sap.quickinfo : 'Condition is Relevant for Accrual (e.g. Freight)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsRelevantForAccrual : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Invoice List Cond.'
  @sap.quickinfo : 'Condition for Invoice List'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CndnIsRelevantForInvoiceList : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Origin'
  @sap.quickinfo : 'Origin of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Group Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsGroupCondition : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Record No.'
  @sap.quickinfo : 'Number of Condition Record'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionRecord : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequent.No. of Cond.'
  @sap.quickinfo : 'Sequential Number of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionSequentialNumber : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Code'
  @sap.quickinfo : 'Tax on sales/purchases code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'W/Tax Code'
  @sap.quickinfo : 'Withholding Tax Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  WithholdingTaxCode : String(2);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Cond.Rounding Diff.'
  @sap.quickinfo : 'Rounding-Off Difference of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CndnRoundingOffDiffAmount : Decimal(6, 3);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Condition Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionAmount : Decimal(16, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Currency'
  @sap.quickinfo : 'SD Document Currency'
  @sap.semantics : 'currency-code'
  TransactionCurrency : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Control'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionControl : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inactive Condition'
  @sap.quickinfo : 'Condition is Inactive'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionInactiveReason : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Class'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionClass : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Counter'
  @sap.quickinfo : 'Condition Counter (Header)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PrcgProcedureCounterForHeader : String(3);
  @sap.label : 'Condition Factor'
  @sap.quickinfo : 'Factor for Condition Base Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FactorForConditionBasisValue : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Structure Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  StructureCondition : String(1);
  @sap.label : 'Condition Factor'
  @sap.quickinfo : 'Factor for Condition Basis (Period)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PeriodFactorForCndnBasisValue : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Basis'
  @sap.quickinfo : 'Scale Basis Indicator'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingScaleBasis : String(3);
  @sap.label : 'Scale Base Val.'
  @sap.quickinfo : 'Scale Base Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionScaleBasisValue : Decimal(24, 9);
  @sap.label : 'Scale Unit of Meas.'
  @sap.quickinfo : 'Condition Scale Unit of Measure'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  ConditionScaleBasisUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'currency-code'
  ConditionScaleBasisCurrency : String(5);
  @sap.label : 'Intercomp.Billing'
  @sap.quickinfo : 'Condition for Intercompany Billing'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CndnIsRelevantForIntcoBilling : Boolean;
  @sap.label : 'Changed Manually'
  @sap.quickinfo : 'Condition Changed Manually'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsManuallyChanged : Boolean;
  @sap.label : 'UsedforVariantConfig'
  @sap.quickinfo : 'Condition Used for Variant Configuration'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsForConfiguration : Boolean;
  @sap.label : 'Variant Key'
  @sap.quickinfo : 'Variant Condition Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  VariantCondition : String(26);
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Text'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItemText {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Quotation Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotationItem : String(6) not null;
  @sap.label : 'Language Key'
  key Language : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Text ID'
  key LongTextID : String(4) not null;
  @sap.label : 'String'
  @sap.heading : ''
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : String;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Partner'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationPartner {
  @sap.display.format : 'UpperCase'
  @sap.label : 'SD Document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Partner Function'
  key PartnerFunction : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Customer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier'
  @sap.quickinfo : 'Account Number of Supplier'
  Supplier : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Personnel Number'
  Personnel : String(8);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Contact Person'
  @sap.quickinfo : 'Number of Contact Person'
  ContactPerson : String(10);
  @sap.label : 'GUID of a Business Partner Address'
  @sap.heading : ''
  BusinessPartnerAddressUUID : UUID;
  @sap.label : 'GUID of a Business Partner Address'
  @sap.heading : ''
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BPRefAddrForDocSpcfcAddrUUID : UUID;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Pricing Element'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationPrcgElmnt {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Step Number'
  key PricingProcedureStep : String(3) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Counter'
  @sap.quickinfo : 'Condition Counter'
  key PricingProcedureCounter : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Type'
  ConditionType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Valid From'
  @sap.quickinfo : 'Timestamp for Pricing'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingDateTime : String(14);
  @sap.display.format : 'Date'
  @sap.label : 'Cndn Pricing Date'
  @sap.quickinfo : 'Condition Pricing Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PriceConditionDeterminationDte : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculation Type'
  @sap.quickinfo : 'Calculation Type for Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionCalculationType : String(3);
  @sap.label : 'Condition Basis'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionBaseValue : Decimal(24, 9);
  @sap.label : 'Amount'
  @sap.quickinfo : 'Condition Amount or Percentage'
  ConditionRateValue : Decimal(24, 9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  ConditionCurrency : String(5);
  @sap.unit : 'ConditionQuantitySAPUnit'
  @sap.label : 'Pricing Unit'
  @sap.quickinfo : 'Condition Pricing Unit'
  ConditionQuantity : Decimal(5, 0);
  @sap.label : 'Condition Unit'
  @sap.quickinfo : 'Condition Unit in the Document'
  @sap.semantics : 'unit-of-measure'
  ConditionQuantityUnit : String(3);
  @sap.label : 'SAP Condition Qty'
  @sap.quickinfo : 'SAP Unit Code for Condition Quantity'
  @sap.semantics : 'unit-of-measure'
  ConditionQuantitySAPUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO Condition Qty'
  @sap.quickinfo : 'ISO Unit Code for Condition Quantity'
  ConditionQuantityISOUnit : String(3);
  @sap.label : 'Condition Category'
  @sap.quickinfo : 'Condition Category (Examples: Tax, Freight, Price, Cost)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionCategory : String(1);
  @sap.label : 'Statistical'
  @sap.quickinfo : 'Condition is used for statistics'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsForStatistics : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingScaleType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Origin'
  @sap.quickinfo : 'Origin of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Group Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsGroupCondition : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Record No.'
  @sap.quickinfo : 'Number of Condition Record'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionRecord : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequent.No. of Cond.'
  @sap.quickinfo : 'Sequential Number of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionSequentialNumber : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Code'
  @sap.quickinfo : 'Tax on sales/purchases code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'W/Tax Code'
  @sap.quickinfo : 'Withholding Tax Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  WithholdingTaxCode : String(2);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Cond.Rounding Diff.'
  @sap.quickinfo : 'Rounding-Off Difference of the Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CndnRoundingOffDiffAmount : Decimal(6, 3);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Condition Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionAmount : Decimal(16, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Currency'
  @sap.quickinfo : 'SD Document Currency'
  @sap.semantics : 'currency-code'
  TransactionCurrency : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Control'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionControl : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inactive Condition'
  @sap.quickinfo : 'Condition is Inactive'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionInactiveReason : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Class'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionClass : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Counter'
  @sap.quickinfo : 'Condition Counter (Header)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PrcgProcedureCounterForHeader : String(3);
  @sap.label : 'Condition Factor'
  @sap.quickinfo : 'Factor for Condition Base Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FactorForConditionBasisValue : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Structure Condition'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  StructureCondition : String(1);
  @sap.label : 'Condition Factor'
  @sap.quickinfo : 'Factor for Condition Basis (Period)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PeriodFactorForCndnBasisValue : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Basis'
  @sap.quickinfo : 'Scale Basis Indicator'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PricingScaleBasis : String(3);
  @sap.label : 'Scale Base Val.'
  @sap.quickinfo : 'Scale Base Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionScaleBasisValue : Decimal(24, 9);
  @sap.label : 'Scale Unit of Meas.'
  @sap.quickinfo : 'Condition Scale Unit of Measure'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  ConditionScaleBasisUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'currency-code'
  ConditionScaleBasisCurrency : String(5);
  @sap.label : 'Intercomp.Billing'
  @sap.quickinfo : 'Condition for Intercompany Billing'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CndnIsRelevantForIntcoBilling : Boolean;
  @sap.label : 'Changed Manually'
  @sap.quickinfo : 'Condition Changed Manually'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsManuallyChanged : Boolean;
  @sap.label : 'UsedforVariantConfig'
  @sap.quickinfo : 'Condition Used for Variant Configuration'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConditionIsForConfiguration : Boolean;
  @sap.label : 'Variant Key'
  @sap.quickinfo : 'Variant Condition Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  VariantCondition : String(26);
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.updatable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Related Object'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationRelatedObject {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequence Number'
  @sap.quickinfo : 'Sequence Number of the Related Object of an SD Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SDDocRelatedObjectSequenceNmbr : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Related Object Type'
  @sap.quickinfo : 'Type of the Related Object of an SD Document'
  SDDocumentRelatedObjectType : String(5);
  @sap.label : 'System of Reltd Obj.'
  @sap.quickinfo : 'System of the Related Object of an SD Document'
  SDDocRelatedObjectSystem : String(60);
  @sap.label : 'Reltd Obj. Reference'
  @sap.quickinfo : 'Reference of the Related Object of an SD Document'
  SDDocRelatedObjectReference1 : String(60);
  @sap.label : 'Reltd Obj. Reference'
  @sap.quickinfo : 'Reference of the Related Object of an SD Document'
  SDDocRelatedObjectReference2 : String(60);
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Text'
entity ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationText {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.label : 'Language Key'
  key Language : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Text ID'
  key LongTextID : String(4) not null;
  @sap.label : 'String'
  @sap.heading : ''
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : String;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.updatable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Related Object'
entity ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItemRelatedObject {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Quotation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Quotation Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SalesQuotationItem : String(6) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequence Number'
  @sap.quickinfo : 'Sequence Number of the Related Object of an SD Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key SDDocRelatedObjectSequenceNmbr : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Related Object Type'
  @sap.quickinfo : 'Type of the Related Object of an SD Document'
  SDDocumentRelatedObjectType : String(5);
  @sap.label : 'System of Reltd Obj.'
  @sap.quickinfo : 'System of the Related Object of an SD Document'
  SDDocRelatedObjectSystem : String(60);
  @sap.label : 'Reltd Obj. Reference'
  @sap.quickinfo : 'Reference of the Related Object of an SD Document'
  SDDocRelatedObjectReference1 : String(60);
  @sap.label : 'Reltd Obj. Reference'
  @sap.quickinfo : 'Reference of the Related Object of an SD Document'
  SDDocRelatedObjectReference2 : String(60);
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Preceding Process Flow'
entity ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItmPrecdgProcFlow {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Subsequent Document'
  @sap.quickinfo : 'Subsequent Sales and Distribution Document'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Subsequent Item'
  @sap.quickinfo : 'Subsequent Item of an SD Document'
  key SalesQuotationItem : String(6) not null;
  @sap.label : 'DocRelationshipUUID'
  @sap.quickinfo : 'SD Unique Document Relationship Identification'
  key DocRelationshipUUID : UUID not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Preceding Document'
  @sap.quickinfo : 'Preceding sales and distribution document'
  PrecedingDocument : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Preceding Item'
  @sap.quickinfo : 'Preceding Item of an SD Document'
  PrecedingDocumentItem : String(6);
  @sap.label : 'Preceding Doc.Categ.'
  @sap.quickinfo : 'Document Category of Preceding SD Document'
  PrecedingDocumentCategory : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Level'
  @sap.quickinfo : 'Level of the document flow record'
  ProcessFlowLevel : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'General SD status'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StatusCode : String(1);
  @sap.label : 'Description'
  @sap.quickinfo : 'Status Description'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SDDocumentStatusDesc : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  @sap.quickinfo : 'Record Creation Date'
  CreationDate : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Entry time'
  CreationTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Last Changed On'
  LastChangeDate : Date;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Item Subsequent Process Flow'
entity ZAPI_SALES_QUOTATION_SRV.A_SlsQtanItmSubsqntProcFlow {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Preceding Document'
  @sap.quickinfo : 'Preceding sales and distribution document'
  key SalesQuotation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Preceding Item'
  @sap.quickinfo : 'Preceding Item of an SD Document'
  key SalesQuotationItem : String(6) not null;
  @sap.label : 'DocRelationshipUUID'
  @sap.quickinfo : 'SD Unique Document Relationship Identification'
  key DocRelationshipUUID : UUID not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Subsequent Document'
  @sap.quickinfo : 'Subsequent Sales and Distribution Document'
  SubsequentDocument : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Subsequent Item'
  @sap.quickinfo : 'Subsequent Item of an SD Document'
  SubsequentDocumentItem : String(6);
  @sap.label : 'Subsequent Doc. Cat.'
  @sap.quickinfo : 'Document Category of Subsequent Document'
  SubsequentDocumentCategory : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Level'
  @sap.quickinfo : 'Level of the document flow record'
  ProcessFlowLevel : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'General SD status'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StatusCode : String(1);
  @sap.label : 'Description'
  @sap.quickinfo : 'Status Description'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SDDocumentStatusDesc : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  @sap.quickinfo : 'Record Creation Date'
  CreationDate : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Entry time'
  CreationTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Last Changed On'
  LastChangeDate : Date;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
  to_SalesQuotationItem : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotationItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Preceding Process Flow'
entity ZAPI_SALES_QUOTATION_SRV.A_SlsQtanPrecdgProcFlow {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Subsequent Document'
  @sap.quickinfo : 'Subsequent Sales and Distribution Document'
  key SalesQuotation : String(10) not null;
  @sap.label : 'DocRelationshipUUID'
  @sap.quickinfo : 'SD Unique Document Relationship Identification'
  key DocRelationshipUUID : UUID not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Preceding Document'
  @sap.quickinfo : 'Preceding sales and distribution document'
  PrecedingDocument : String(10);
  @sap.label : 'Preceding Doc.Categ.'
  @sap.quickinfo : 'Document Category of Preceding SD Document'
  PrecedingDocumentCategory : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Level'
  @sap.quickinfo : 'Level of the document flow record'
  ProcessFlowLevel : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'General SD status'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StatusCode : String(1);
  @sap.label : 'Description'
  @sap.quickinfo : 'Status Description'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SDDocumentStatusDesc : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  @sap.quickinfo : 'Record Creation Date'
  CreationDate : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Entry time'
  CreationTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Last Changed On'
  LastChangeDate : Date;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Header Subsequent Process Flow'
entity ZAPI_SALES_QUOTATION_SRV.A_SlsQtanSubsqntProcFlow {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Preceding Document'
  @sap.quickinfo : 'Preceding sales and distribution document'
  key SalesQuotation : String(10) not null;
  @sap.label : 'DocRelationshipUUID'
  @sap.quickinfo : 'SD Unique Document Relationship Identification'
  key DocRelationshipUUID : UUID not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Subsequent Document'
  @sap.quickinfo : 'Subsequent Sales and Distribution Document'
  SubsequentDocument : String(10);
  @sap.label : 'Subsequent Doc. Cat.'
  @sap.quickinfo : 'Document Category of Subsequent Document'
  SubsequentDocumentCategory : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Level'
  @sap.quickinfo : 'Level of the document flow record'
  ProcessFlowLevel : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'General SD status'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StatusCode : String(1);
  @sap.label : 'Description'
  @sap.quickinfo : 'Status Description'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SDDocumentStatusDesc : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  @sap.quickinfo : 'Record Creation Date'
  CreationDate : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Entry time'
  CreationTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Last Changed On'
  LastChangeDate : Date;
  to_SalesQuotation : Association to ZAPI_SALES_QUOTATION_SRV.A_SalesQuotation {  };
};

@cds.external : true
type ZAPI_SALES_QUOTATION_SRV.FunctionResult {
  @sap.label : 'Indicator'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Boolean : Boolean not null;
};

@cds.external : true
action ZAPI_SALES_QUOTATION_SRV.releaseApprovalRequest(
  SalesQuotation : String(11000)
) returns ZAPI_SALES_QUOTATION_SRV.FunctionResult;

@cds.external : true
action ZAPI_SALES_QUOTATION_SRV.rejectApprovalRequest(
  SalesQuotation : String(11000)
) returns ZAPI_SALES_QUOTATION_SRV.FunctionResult;

