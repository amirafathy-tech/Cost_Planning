

using my.costplan as my from  '../db/schema';

service SimulationService {
  entity EngineeringDesignEntry as projection on my.EngineeringDesignEntry;
  entity IndirectCostEntry      as projection on my.IndirectCostEntry;
  entity MaterialEntry          as projection on my.MaterialEntry;
  entity CablesEntry            as projection on my.CablesEntry;
}
