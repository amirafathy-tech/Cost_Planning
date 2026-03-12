using ZAPI_PRODUCT_SRV from './external/ZAPI_PRODUCT_SRV.cds';

service ZAPI_PRODUCT_SRVSampleService {
    @readonly
    entity A_ProductDescription as projection on ZAPI_PRODUCT_SRV.A_ProductDescription
    {        key Product, key Language, ProductDescription     }    
;
}