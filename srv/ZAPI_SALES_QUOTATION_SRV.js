const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZAPI_SALES_QUOTATION_SRV = await cds.connect.to("ZAPI_SALES_QUOTATION_SRV"); 
      srv.on('READ', 'A_SalesQuotation', req => ZAPI_SALES_QUOTATION_SRV.run(req.query)); 
      srv.on('READ', 'A_SalesQuotationItem', req => ZAPI_SALES_QUOTATION_SRV.run(req.query)); 
}