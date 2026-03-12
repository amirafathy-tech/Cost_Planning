const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZBTP_SRV = await cds.connect.to("ZBTP_SRV"); 
      srv.on('READ', 'BOSSet', req => ZBTP_SRV.run(req.query)); 
      srv.on('READ', 'BOS_CONDSet', req => ZBTP_SRV.run(req.query)); 
}