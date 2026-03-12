// const cds = require('@sap/cds');

// module.exports = async (srv) => 
// {        
//     // Using CDS API      
//     const ZBTP_POST_QUOT_SRV = await cds.connect.to("ZBTP_POST_QUOT_SRV"); 
//       srv.on('READ', 'headerSet', req => ZBTP_POST_QUOT_SRV.run(req.query)); 
// }

const cds = require('@sap/cds');

module.exports = async (srv) => {
    const ZBTP_POST_QUOT_SRV = await cds.connect.to("ZBTP_POST_QUOT_SRV");

    srv.on('READ', 'headerSet', req => ZBTP_POST_QUOT_SRV.run(req.query));

    srv.on('CREATE', 'headerSet', async (req) => {
        try {
            const { Salesdocument, headertoitem } = req.data;
            const result = await ZBTP_POST_QUOT_SRV.tx(req).post('/headerSet', req.data);
            return result;
        } catch (error) {
            req.error(500, "Error creating headerSet: ${error.message}");
        }
    });

    // Handle the sendToERP action (bound action)
    srv.on('sendToERP', 'headerSet', async (req) => {
        try {
            const { Salesdocument, headertoitem } = req.data;
            // Forward to S/4HANA (adjust based on your needs)
            await ZBTP_POST_QUOT_SRV.tx(req).post('/headerSet', req.data);
            return "Data successfully sent to ERP";
        } catch (error) {
            req.error(500, "ERP Submission Failed: ${error.message}");
        }
    });
};