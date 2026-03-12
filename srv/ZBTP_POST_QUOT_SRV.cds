// using ZBTP_POST_QUOT_SRV from './external/ZBTP_POST_QUOT_SRV.cds';

// service ZBTP_POST_QUOT_SRVSampleService {
    
//     entity headerSet as projection on ZBTP_POST_QUOT_SRV.headerSet
//     {        key Salesdocument     }    
// ;
// }

using ZBTP_POST_QUOT_SRV from './external/ZBTP_POST_QUOT_SRV.cds';

service ZBTP_POST_QUOT_SRVSampleService {
    @Capabilities.Insertable
    entity headerSet as projection on ZBTP_POST_QUOT_SRV.headerSet {
        key Salesdocument,
        headertoitem
    };
    action sendToERP(param : headerSet) returns headerSet;
}