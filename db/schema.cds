namespace my.costplan;

using {
    cuid,
    managed
} from '@sap/cds/common';


// E and D Category
entity EngineeringDesignEntry {
    key ID            : UUID;
        ShortText     : String(100); // 👈 Add this line
        item          : Association to CostItem;

        Salesdocument : String(20);
        ItemNumber    : String(10);
        description   : String(30);
        Salary        : Decimal(13, 2);
        Months        : Integer;
        NoOfPersons   : Integer;
        Amount        : Decimal(10, 2);
        CreatedAt     : Timestamp;
}

// // Indirect Cost Category
entity IndirectCostEntry {
    key ID            : UUID;
        ShortText     : String(100); // 👈 Add this line
        item          : Association to CostItem;

        Salesdocument : String(20);
        ItemNumber    : String(10);
        Description   : String(100);
        Unit          : String(10);
        Qty           : Decimal(10, 2);
        Cost          : Decimal(10, 2);
        Labour        : String(50);
        Total         : Decimal(4, 2);
        CreatedAt     : Timestamp;
}

// // Material Category
entity MaterialEntry {
    key ID                      : UUID;
        ShortText               : String(100); // 👈 Add this
        item                    : Association to CostItem;
        Salesdocument           : String(20);
        ItemNumber              : String(10);
        Description             : String(100);
        VendorDetails           : String(100);
        QuotationDate           : Date;
        QuotationPrice          : Decimal(13, 2);
        PaymentTerms            : String(20);
        FreightClearanceCharges : Decimal(13, 2);
        TransportationCharges   : Decimal(13, 2);
        Saber                   : Decimal(13, 2);
        TotalSubCharges         : Decimal(13, 2);
        TotalPrice              : Decimal(15, 2);
        CreatedAt               : Timestamp;
}

// // Cables Category
entity CablesEntry {
    key ID               : UUID;
        ShortText        : String(100); // 👈 Add this line
        item             : Association to CostItem;

        Salesdocument    : String(20);
        ItemNumber       : String(10);
        Description      : String(100);
        Circuit          : Integer;
        Runs             : Integer;
        NoOfPh           : Integer;
        ApproximateMeter : Decimal(13, 2);
        Total            : Decimal(13, 2);
        UnitPrice        : Decimal(13, 2);
        TotalPrice       : Decimal(15, 2);
        CreatedAt        : Timestamp;
}

entity CostItem : cuid, managed {
    Salesdocument    : String(20);
    ItemNumber       : String(10);
    ShortText        : String(100);

    // Shared fields
    CostingModelType : String(50); // Material, Indirect Cost, etc.
    TotalSurcharge   : Decimal(15, 2); // Calculated or entered
    Category         : String(50); // e.g., "E and D", "Material"

    // Associations to category-specific details
    engDesignDetails : Composition of one EngineeringDesignEntry
                           on engDesignDetails.item = $self;

    indirectDetails  : Composition of one IndirectCostEntry
                           on indirectDetails.item = $self;

    materialDetails  : Composition of one MaterialEntry
                           on materialDetails.item = $self;

    cablesDetails    : Composition of one CablesEntry
                           on cablesDetails.item = $self;
}
