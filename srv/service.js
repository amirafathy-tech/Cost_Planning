const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

  // Update costing model type & total surcharge
  this.on('updateCostingModel', async (req) => {
    const { ID, costingModelType } = req.data;

    const item = await SELECT.one.from('my.costplan.CostItem').where({ ID });
    if (!item) return req.error(404, 'Item not found');

    // Example: surcharge rate based on type
    const rates = {
      "E and D": 0.05,
      "Material": 0.12,
      "Cables": 0.08,
      "Indirect Cost": 0.15
    };
    const rate = rates[costingModelType] || 0;

    // You may need to read extra details for calculation
    let basePrice = 0;
    if (item.Category === 'E and D') {
      const details = await SELECT.one.from('my.costplan.EngineeringDesignEntry').where({ item_ID: ID });
      basePrice = (details?.Salary || 0) * (details?.Months || 0);
    }
    // Similar for other categories...

    const totalSurcharge = basePrice * rate;

    await UPDATE('my.costplan.CostItem')
      .set({ CostingModelType: costingModelType, TotalSurcharge: totalSurcharge })
      .where({ ID });

    return { message: 'Updated successfully' };
  });

});
