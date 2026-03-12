const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZAPI_BUSINESS_PARTNER = await cds.connect.to("ZAPI_BUSINESS_PARTNER"); 
      srv.on('READ', 'A_Supplier', req => ZAPI_BUSINESS_PARTNER.run(req.query)); 
}