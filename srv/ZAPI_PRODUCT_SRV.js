const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZAPI_PRODUCT_SRV = await cds.connect.to("ZAPI_PRODUCT_SRV"); 
      srv.on('READ', 'A_ProductDescription', req => ZAPI_PRODUCT_SRV.run(req.query)); 
}