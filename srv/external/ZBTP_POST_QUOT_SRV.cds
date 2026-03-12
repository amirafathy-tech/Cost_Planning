/* checksum : 199eec4a5350ba8fdd46a0c7f8d532ae */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_POST_QUOT_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZBTP_POST_QUOT_SRV.headerSet {
  @sap.unicode : 'false'
  @sap.label : 'SD Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Salesdocument : String(10) not null;
  headertoitem : Association to many ZBTP_POST_QUOT_SRV.ItemsSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZBTP_POST_QUOT_SRV.ItemsSet {
  @sap.unicode : 'false'
  @sap.label : 'SD Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Salesdocument : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ItmNumber : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Package number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key PckgNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'Internal line no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LineNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Package'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SubpckgNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Quantity'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Quantity : String(13) not null;
  @sap.unicode : 'false'
  @sap.label : 'Gross price'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  GrPrice : String(23) not null;
};

