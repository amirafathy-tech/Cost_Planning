sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/SelectDialog",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/thirdparty/jquery",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/ui/core/library",
    "sap/m/MessageToast",

    "sap/ui/table/TreeTable",
    "sap/ui/table/Column"
], (Controller, JSONModel, SelectDialog, MessageToast, Filter, FilterOperator, MessageBox, jQuery, Dialog, Button, Table, Column, Text, Input, Label, VBox, coreLibrary, TreeTable) => {
    "use strict";

    return Controller.extend("costplan.controller.mainPage", {
        onInit() {
            var oModel = new JSONModel({
                quotationNumber: "",
                itemNumber: "",
                quotationItemsNumbers: [],
                tableBusy: false,
                categories: [
                    { key: "EAndD", text: "E and D" },
                    { key: "Material", text: "Material" },
                    { key: "Cables", text: "Cables" },
                    { key: "Testing", text: "Testing" },
                    { key: "TAndCBOM", text: "T and C BOM" },
                    { key: "IndirectCost", text: "Indirect Cost" }
                ],
                Vendor_Details: [], // Array to store selected vendor keys
                Description: "",
                selectedVendor: null,
                selectedCategory: null,
                selectedService: null,
                simulateButtonEnabled: false,
                selectedCostingModelType: "",// start empty

                simulationData: [],
                indirectCostData: [], // New array for Indirect Cost data
                totalAmount: "0.00"
            });
            this.getView().setModel(oModel, "viewModel");

            const oComponent = this.getOwnerComponent();
            const oODataModel = oComponent.getModel("ZBTP_POST_QUOT_SRVSampleService");

        },
        loadQuotationItems: async function (sQuotation) {
            if (!sQuotation) {
                MessageBox.error("Quotation number is missing.");
                return [];
            }
            try {
                const oModel = this.getOwnerComponent().getModel();
                const oBinding = oModel.bindList("/A_SalesQuotationItem", null, null, [
                    new sap.ui.model.Filter("SalesQuotation", sap.ui.model.FilterOperator.EQ, sQuotation)
                ]);
                const aContexts = await oBinding.requestContexts(0, 100);
                const aItems = aContexts.map(oContext => oContext.getObject());
                console.log("Filtered Items:", aItems);
                this.quotationItemsNumbers = aItems;
                console.log(this.quotationItemsNumbers);
                const oQuotationItemsModel = new sap.ui.model.json.JSONModel({ quotationItemsNumbers: aItems });
                // Set model to view
                this.getView().setModel(oQuotationItemsModel, "QuotationItemsModel");
                return aItems;
            } catch (err) {
                console.error("Failed to fetch quotation items:", err);
                MessageBox.error("Failed to load quotation items.");
                return [];
            }
        },
        onIconTabSelect: function (oEvent) {
            const sSelectedKey = oEvent.getParameter("key");
            console.log(sSelectedKey);
            this.getView().getModel("viewModel").setProperty("/itemNumber", sSelectedKey);
            this.updateServiceLinesTable();
            this.updateSimulateButtonState();
        },
        itemCloseHandler: function (oEvent) {
            // prevent the tab being closed by default
            oEvent.preventDefault();

            var oTabContainer = this.byId("myTabContainer");
            var oItemToClose = oEvent.getParameter('item');

            MessageBox.confirm("Do you want to close the tab '" + oItemToClose.getName() + "'?", {
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oTabContainer.removeItem(oItemToClose);
                        MessageToast.show("Item closed: " + oItemToClose.getName(), { duration: 500 });
                    } else {
                        MessageToast.show("Item close canceled: " + oItemToClose.getName(), { duration: 500 });
                    }
                }
            });
        },

        onValueHelpRequest(oEvent) {



            if (!this._oValueHelpDialog) {
                this._oValueHelpDialog = new sap.m.Dialog({
                    title: "Select Quotation Number",
                    content: [
                        new sap.m.Table({
                            id: this.createId("quotationTable"),
                            mode: "SingleSelectMaster",
                            growing: true,
                            growingThreshold: 50,
                            columns: [
                                new sap.m.Column({ header: new sap.m.Label({ text: "Quotation Number" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "PurchaseOrderByCustomer" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "CustomerPurchaseOrderDate" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "SoldToParty" }) })
                            ],
                            items: {
                                path: "/A_SalesQuotation",
                                parameters: {
                                    $count: true
                                },
                                template: new sap.m.ColumnListItem({
                                    type: "Active",
                                    cells: [
                                        new sap.m.Text({ text: "{SalesQuotation}" }),
                                        new sap.m.Text({ text: "{PurchaseOrderByCustomer}" }),
                                        new sap.m.Text({ text: "{CustomerPurchaseOrderDate}" }),
                                        new sap.m.Text({ text: "{SoldToParty}" })
                                    ]
                                }),
                                events: {
                                    dataReceived: (oEvent) => {
                                        const oBinding = oEvent.getSource();
                                        const oTable = this.byId("quotationTable");
                                        const aItems = oTable.getItems();
                                        const oContext = oEvent.getParameter("data");
                                        console.log("Total items received:", aItems.length);
                                        console.log("Total count from server:", oContext?.__count || "N/A");
                                        if (aItems.length === 0) {
                                            sap.m.MessageBox.warning("No data found in A_SalesQuotation.");
                                        }
                                    }
                                }
                            }
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Confirm",
                        press: (oEvent) => {
                            const oTable = this.byId("quotationTable");
                            const oSelectedItem = oTable.getSelectedItem();
                            if (oSelectedItem) {
                                const sQuotation = oSelectedItem.getCells()[0].getText();
                                this.byId("quotationInput").setValue(sQuotation);
                                this.getView().getModel("viewModel").setProperty("/quotationNumber", sQuotation);
                                this.updateSimulateButtonState();
                                this._oValueHelpDialog.close();
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: () => {
                            this._oValueHelpDialog.close();
                        }
                    })
                });

                var oODataModel = this.getOwnerComponent().getModel();
                this._oValueHelpDialog.setModel(oODataModel);
                this.getView().addDependent(this._oValueHelpDialog);
            }
            this._oValueHelpDialog.open();
        },

        // worked for input and selection 
        async onValueDescHelpRequest(oEvent) {
            const oInput = oEvent.getSource();
            const sCurrentValue = oInput.getValue();
            const oViewModel = this.getView().getModel("viewModel");
            const oContext = oInput.getBindingContext("viewModel");

            // Store input and context to avoid stale event issues
            this._oCurrentDescInput = oInput;
            this._oCurrentDescContext = oContext;

            if (!this._oDescValueHelpDialog) {
                this._oDescValueHelpDialog = new sap.m.Dialog({
                    title: "Select Product Description",
                    content: [
                        new sap.m.SearchField({
                            width: "100%",
                            placeholder: "Search Descriptions",
                            liveChange: (oEvent) => {
                                const sQuery = oEvent.getParameter("newValue");
                                const oComboBox = this.byId(this.createId("desComboBox"));
                                const oBinding = oComboBox.getBinding("items");
                                if (sQuery) {
                                    const oFilter = new sap.ui.model.Filter("ProductDescription", sap.ui.model.FilterOperator.Contains, sQuery);
                                    oBinding.filter([oFilter]);
                                } else {
                                    oBinding.filter([]);
                                }
                            }
                        }),
                        new sap.m.ComboBox({
                            id: this.createId("desComboBox"),
                            width: "100%",
                            showSecondaryValues: true,
                            filterSuggest: true,
                            items: {
                                path: "/A_ProductDescription",
                                parameters: { $count: true },
                                template: new sap.ui.core.ListItem({
                                    key: "{Product}",
                                    text: "{ProductDescription}",
                                    additionalText: "{Product}"
                                }),
                                events: {
                                    dataReceived: (oEvent) => {
                                        const oContext = oEvent.getParameter("data");
                                        console.log("Product data count:", oContext?.__count || "N/A");
                                        if (oContext && oContext.__count === 0) {
                                            sap.m.MessageBox.warning("No data found in Product Description.");
                                        }
                                    }
                                }
                            }
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Confirm",
                        press: () => {
                            const oComboBox = this.byId(this.createId("desComboBox"));
                            const oSelectedItem = oComboBox.getSelectedItem();
                            if (oSelectedItem) {
                                const sText = oSelectedItem.getText();
                                const oInput = this._oCurrentDescInput;
                                const oContext = this._oCurrentDescContext;

                                if (oContext) {
                                    const sPath = oContext.getPath();
                                    const iIndex = parseInt(sPath.split("/").pop(), 10);
                                    let aMaterialData = oViewModel.getProperty("/materialData") || [];

                                    console.log("materialData before update:", JSON.parse(JSON.stringify(aMaterialData)));

                                    aMaterialData[iIndex] = {
                                        ...aMaterialData[iIndex],
                                        Description: sText
                                    };

                                    oViewModel.setProperty("/materialData", [...aMaterialData]);
                                    oInput.setValue(sText);
                                    console.log("materialData after update:", JSON.parse(JSON.stringify(aMaterialData)));
                                    this.byId("materialTable").getBinding("items").refresh(true);

                                    this._oDescValueHelpDialog.close();
                                } else {
                                    console.warn("No binding context found for input");
                                    sap.m.MessageBox.warning("Unable to update description.");
                                }
                            } else {
                                sap.m.MessageBox.warning("Please select a product description.");
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: () => {
                            this._oCurrentDescInput.setValue(sCurrentValue);
                            this._oDescValueHelpDialog.close();
                        }
                    })
                });

                const oProductModel = this.getOwnerComponent().getModel("productModel");
                this._oDescValueHelpDialog.setModel(oProductModel);
                this._oDescValueHelpDialog.setModel(oViewModel, "viewModel");
                this.getView().addDependent(this._oDescValueHelpDialog);
            }

            const oComboBox = this.byId(this.createId("desComboBox"));
            if (oComboBox && this._oCurrentDescContext) {
                const sPath = this._oCurrentDescContext.getPath() + "/Description";
                const sKey = oViewModel.getProperty(sPath) || "";
                oComboBox.setSelectedKey(sKey);
                console.log("Setting ComboBox key:", sKey);
            }

            this._oDescValueHelpDialog.open();
        },

        // worked for input and selection 
        async onValueVendorsHelpRequest(oEvent) {
            const oInput = oEvent.getSource();
            const oItem = oInput.getParent();
            const oBindingContext = oItem.getBindingContext("viewModel");
            const oData = oBindingContext.getObject();
            const sDescription = oData.Description;

            console.log("Description:", sDescription);

            if (!sDescription) {
                sap.m.MessageBox.warning("Please enter a material description before selecting a vendor.");
                return;
            }

            const oViewModel = this.getView().getModel("viewModel");
            const sCurrentValue = oInput.getValue();

            // Store input and context for use in Confirm button
            this._oCurrentVendorInput = oInput;
            this._oCurrentVendorContext = oBindingContext;

            if (!this._oVendorValueHelpDialog) {
                this._oVendorValueHelpDialog = new sap.m.Dialog({
                    title: "Select Vendor",
                    content: [
                        new sap.m.SearchField({
                            width: "100%",
                            placeholder: "Search Vendors",
                            liveChange: (oEvent) => {
                                const sQuery = oEvent.getParameter("newValue");
                                const oComboBox = this.byId(this.createId("vendorComboBox"));
                                const oBinding = oComboBox.getBinding("items");
                                if (sQuery) {
                                    const oFilter = new sap.ui.model.Filter("SupplierName", sap.ui.model.FilterOperator.Contains, sQuery);
                                    oBinding.filter([oFilter]);
                                } else {
                                    oBinding.filter([]);
                                }
                            }
                        }),
                        new sap.m.ComboBox({
                            id: this.createId("vendorComboBox"),
                            width: "100%",
                            showSecondaryValues: true,
                            filterSuggest: true,
                            items: {
                                path: "/A_Supplier",
                                parameters: { $count: true },
                                template: new sap.ui.core.ListItem({
                                    key: "{Supplier}",
                                    text: "{SupplierName}",
                                    additionalText: "{Supplier}"
                                }),
                                events: {
                                    dataReceived: (oEvent) => {
                                        const oContext = oEvent.getParameter("data");
                                        console.log("Total count from server:", oContext?.__count || "N/A");
                                        if (oContext && oContext.__count === 0) {
                                            sap.m.MessageBox.warning("No data found in A_Supplier.");
                                        }
                                    }
                                }
                            },
                            change: (oEvent) => {
                                const oComboBox = oEvent.getSource();
                                const sSelectedKey = oComboBox.getSelectedKey();
                                console.log("Selected Vendor:", sSelectedKey);
                            }
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Confirm",
                        press: () => {
                            const oComboBox = this.byId(this.createId("vendorComboBox"));
                            const oSelectedItem = oComboBox.getSelectedItem();
                            if (oSelectedItem) {
                                const sSelectedText = oSelectedItem.getText();
                                const oInput = this._oCurrentVendorInput;
                                const oBindingContext = this._oCurrentVendorContext;

                                if (oBindingContext) {
                                    const sPath = oBindingContext.getPath();
                                    const iIndex = parseInt(sPath.split("/").pop(), 10);
                                    let aMaterialData = oViewModel.getProperty("/materialData") || [];

                                    console.log("materialData before update:", JSON.parse(JSON.stringify(aMaterialData)));

                                    aMaterialData[iIndex] = {
                                        ...aMaterialData[iIndex],
                                        Vendor_Details: sSelectedText
                                    };

                                    oViewModel.setProperty("/materialData", [...aMaterialData]);
                                    oInput.setValue(sSelectedText);
                                    console.log("materialData after update:", JSON.parse(JSON.stringify(aMaterialData)));
                                    this.byId("materialTable").getBinding("items").refresh(true);

                                    this._oVendorValueHelpDialog.close();
                                } else {
                                    console.warn("No binding context found for input");
                                    sap.m.MessageBox.warning("Unable to update vendor details.");
                                }
                            } else {
                                sap.m.MessageBox.warning("Please select a vendor.");
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: () => {
                            this._oCurrentVendorInput.setValue(sCurrentValue);
                            this._oVendorValueHelpDialog.close();
                        }
                    })
                });

                const oODataModel = this.getOwnerComponent().getModel("supplierModel");
                this._oVendorValueHelpDialog.setModel(oODataModel);
                this._oVendorValueHelpDialog.setModel(oViewModel, "viewModel");
                this.getView().addDependent(this._oVendorValueHelpDialog);
            }

            const oComboBox = this.byId(this.createId("vendorComboBox"));
            if (oComboBox && this._oCurrentVendorContext) {
                const sPath = this._oCurrentVendorContext.getPath() + "/Vendor_Details";
                const sKey = oViewModel.getProperty(sPath) || "";
                oComboBox.setSelectedKey(sKey);
                console.log("Setting Vendor ComboBox key:", sKey);
            }

            this._oVendorValueHelpDialog.open();
        },


        async onMaterialDescSubmit(oEvent) {
            var sDesc = oEvent.getSource().getValue().trim();
            console.log(sDesc);

            if (!sDesc) {
                MessageBox.error("Please enter a valid description.");
                return;
            }
            this.byId("materialDescInput").setValue(sDesc);
            this.getView().getModel("viewModel").setProperty("/Description", sDesc);
        },
        async onQuotationSubmit(oEvent) {
            var sQuotation = oEvent.getSource().getValue().trim();
            console.log(sQuotation);

            if (!sQuotation) {
                MessageBox.error("Please enter a valid quotation number.");
                return;
            }
            this.byId("quotationInput").setValue(sQuotation);
            this.getView().getModel("viewModel").setProperty("/quotationNumber", sQuotation);

            // load QuotationItems:
            const aItems = await this.loadQuotationItems(sQuotation);
            if (aItems.length === 0) {
                MessageBox.information("No items found for this quotation.");
                return;
            }
            this.updateSimulateButtonState();
        },

        onItemValueHelpRequest(oEvent) {
            var sQuotation = this.getView().getModel("viewModel").getProperty("/quotationNumber");
            if (!sQuotation) {
                MessageBox.error("Please select a quotation number first.");
                return;
            }

            if (!this._oItemValueHelpDialog) {
                this._oItemValueHelpDialog = new sap.m.Dialog({
                    title: "Select Item Number",
                    content: [
                        new sap.m.Table({
                            id: this.createId("itemTable"),
                            mode: "SingleSelectMaster",
                            growing: true,
                            growingThreshold: 10,
                            columns: [
                                new sap.m.Column({ header: new sap.m.Label({ text: "Item Number" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "Material" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "Item Text" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "WBS Element" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "Rejection Reason" }) })
                            ],
                            items: {
                                path: "/A_SalesQuotationItem",
                                template: new sap.m.ColumnListItem({
                                    type: "Active",
                                    cells: [
                                        new sap.m.Text({ text: "{SalesQuotationItem}" }),
                                        new sap.m.Text({ text: "{Material}" }),
                                        new sap.m.Text({ text: "{SalesQuotationItemText}" }),
                                        new sap.m.Text({ text: "{WBSElement}" }),
                                        new sap.m.Text({ text: "{SalesDocumentRjcnReason}" })
                                    ]
                                }),
                                parameters: {
                                    $count: true
                                },
                                events: {
                                    dataReceived: (oEvent) => {
                                        const oTable = this.byId("itemTable");
                                        const aItems = oTable.getItems();
                                        const oContext = oEvent.getParameter("data");
                                        console.log("Total items received for A_SalesQuotationItem:", aItems.length);
                                        console.log("Total count from server:", oContext?.__count || "N/A");
                                        if (aItems.length === 0) {
                                            sap.m.MessageBox.warning("No items found for the selected quotation.");
                                        }
                                    }
                                }
                            }
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Confirm",
                        press: (oEvent) => {
                            const oTable = this.byId("itemTable");
                            const oSelectedItem = oTable.getSelectedItem();
                            if (oSelectedItem) {
                                const sItemNumber = oSelectedItem.getCells()[0].getText();
                                this.byId("itemInput").setValue(sItemNumber);
                                this.getView().getModel("viewModel").setProperty("/itemNumber", sItemNumber);
                                this.updateServiceLinesTable();
                                this.updateSimulateButtonState();
                                this._oItemValueHelpDialog.close();
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: () => {
                            this._oItemValueHelpDialog.close();
                        }
                    })
                });

                var oODataModel = this.getOwnerComponent().getModel();
                this._oItemValueHelpDialog.setModel(oODataModel);
                this.getView().addDependent(this._oItemValueHelpDialog);
            }

            var oFilter = new Filter("SalesQuotation", FilterOperator.EQ, sQuotation);
            this.byId("itemTable").getBinding("items").filter([oFilter]);
            this._oItemValueHelpDialog.open();
        },

        onItemQuotationSubmit(oEvent) {
            var sQuotationItemNumber = oEvent.getSource().getValue().trim();
            if (!sQuotationItemNumber) {
                MessageBox.error("Please enter a valid quotation item number.");
                return;
            }
            this.byId("itemInput").setValue(sQuotationItemNumber);
            this.getView().getModel("viewModel").setProperty("/itemNumber", sQuotationItemNumber);
            this.updateServiceLinesTable();
            this.updateSimulateButtonState();
        },

        onCategoryChange(oEvent) {
            // const sSelectedKey = oEvent.getSource().getSelectedKey();
            const sSelectedKey = oEvent.getParameter("item").getKey(); // For TabContainer
            this.getView().getModel("viewModel").setProperty("/selectedCategory", sSelectedKey);
            this.updateSimulateButtonState();
        },

        onRowSelectionChange(oEvent) {
            const oTable = oEvent.getSource();
            const aSelectedIndices = oTable.getSelectedIndices();
            const oSelectedService = aSelectedIndices.length > 0
                ? oTable.getContextByIndex(aSelectedIndices[0]).getObject()
                : null;
            this.getView().getModel("viewModel").setProperty("/selectedService", oSelectedService);
            this.updateSimulateButtonState();
        },

        updateSimulateButtonState() {
            const oViewModel = this.getView().getModel("viewModel").getData();
            const bEnabled = !!oViewModel.quotationNumber &&
                !!oViewModel.itemNumber &&
                !!oViewModel.selectedCategory &&
                !!oViewModel.selectedService;
            this.getView().getModel("viewModel").setProperty("/simulateButtonEnabled", bEnabled);
        },

        onConfirmVendorSelection: function () {
            const oViewModel = this.getView().getModel("viewModel");
            const aVendors = oViewModel.getProperty("/materialData");
            console.log("Confirm Vendors", aVendors);
            const aSelectedVendors = []; // To store selected vendor objects

            if (!aVendors.length) {
                return sap.m.MessageBox.warning("No vendor entries available to confirm.");
            }

            // Count occurrences of each Description
            const descriptionCount = aVendors.reduce((acc, vendor) => {
                const desc = vendor.Description || 'Unknown';
                acc[desc] = (acc[desc] || 0) + 1;
                console.log(acc);

                return acc;
            }, {});

            // Filter vendors to include only those with duplicate descriptions
            const aFilteredVendors = aVendors.filter(vendor => {
                const desc = vendor.Description || 'Unknown';
                return descriptionCount[desc] > 1;
            });

            console.log(aFilteredVendors);


            if (!aFilteredVendors.length) {
                return sap.m.MessageBox.warning("No materials with duplicate descriptions to confirm.");
            }

            const oVBox = new sap.m.VBox({ renderType: "Bare" });
            const aSelectedIndices = []; // To store indices of selected vendors
            let totalAmount = 0;

            // Create a list of all vendors (ignoring material grouping for multi-selection)
            aFilteredVendors.forEach((vendor, idx) => {
                const oCheckBox = new sap.m.CheckBox({
                    text: `Material: ${vendor.Description || 'Unknown'} | Vendor: ${vendor.Vendor_Details || 'N/A'} | Price: ${vendor.Quotation_Price || 'N/A'}`,
                    customData: [
                        new sap.ui.core.CustomData({
                            key: "vendorIndex",
                            value: idx
                        })
                    ],
                    select: (oEvent) => {
                        const bSelected = oEvent.getParameter("selected");
                        if (bSelected) {
                            console.log(bSelected);
                            console.log(aFilteredVendors[idx]);

                            aSelectedVendors.push({ vendor, idx });

                            aSelectedIndices.push(idx);
                            // if (vendor.Quotation_Price) {
                            //     totalAmount += parseFloat(vendor.Quotation_Price) || 0;
                            // }
                        } else {
                            const indexToRemove = aSelectedIndices.indexOf(idx);
                            if (indexToRemove > -1) {
                                aSelectedIndices.splice(indexToRemove, 1);
                                // if (vendor.Quotation_Price) {
                                //     totalAmount -= parseFloat(vendor.Quotation_Price) || 0;
                                // }
                            }
                        }
                        console.log("cofimed vendors", aSelectedIndices);
                        console.log("Selected Vendors:", aSelectedVendors);
                        // oViewModel.setProperty("/totalAmount", totalAmount.toFixed(2));
                    }
                });
                oVBox.addItem(oCheckBox);
            });

            const oDialog = new sap.m.Dialog({
                title: "Confirm Vendors",
                contentWidth: "600px",
                content: [oVBox],
                beginButton: new sap.m.Button({
                    text: "Confirm",
                    press: () => {

                        // Get all vendors with unique descriptions
                        const aUniqueVendors = aVendors.filter(vendor => {
                            const desc = vendor.Description || 'Unknown';
                            return descriptionCount[desc] === 1;
                        });

                        // Get selected vendors with their Total_Price updated
                        const aSelectedMaterialData = aSelectedVendors.map(item => ({
                            ...item.vendor,
                            Total_Price: item.vendor.Quotation_Price || ""
                        }));

                        // Combine unique vendors and selected vendors
                        const aNewMaterialData = [...aUniqueVendors, ...aSelectedMaterialData];
                        oViewModel.setProperty("/materialData", aNewMaterialData);
                        const aData = this.getView().getModel("viewModel").getProperty("/materialData");
                        console.log(aData);

                        const totalAmount = aData.reduce((sum, row) => sum + (parseFloat(row.Total_Price) || 0), 0).toFixed(2);
                        console.log(totalAmount);

                        oViewModel.setProperty("/totalAmount", totalAmount);

                        // Optional: Update service model Gross Price
                        const oServiceModel = this.getView().getModel("serviceModel");
                        const oServiceData = oServiceModel?.getProperty("/serviceLines/0");
                        if (oServiceData) {
                            oServiceData.GrPrice = totalAmount.toFixed(2);
                            oServiceModel.setProperty("/serviceLines/0", oServiceData);
                        }

                        // Show success message
                        sap.m.MessageBox.success("Vendor selection confirmed successfully.", {
                            title: "Success",
                            onClose: () => oDialog.close()
                        });
                    }
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: () => oDialog.close()
                })
            });

            this.getView().addDependent(oDialog);
            oDialog.open();
        },

        //Retrieve the SAVED ITEMS
        onOpenSimulation: async function () {
            const oView = this.getView();
            const oViewModel = oView.getModel("viewModel");
            const oServiceModel = oView.getModel("serviceModel");
            const oSelectedService = oViewModel.getProperty("/selectedService");
            const oSimModel = oView.getModel("simulationModel");
            const sSalesDoc = oViewModel.getProperty("/quotationNumber");
            const sItemNum = oViewModel.getProperty("/itemNumber");
            const sCategory = oViewModel.getProperty("/selectedCategory");
            const categoryMap = {
                "EAndD": "E and D",
                "Material": "Material",
                "Cables": "Cables",
                "IndirectCost": "Indirect Cost",
                "Testing": "Testing",
                "TAndCBOM": "T and C BOM"
            };
            const sCostingModelType = categoryMap[sCategory] || sCategory;

            // Check if this item already has a costing model assigned
            const aServices = oServiceModel.getData();
            const existingService = aServices.find(service =>
                service.ExtLine === oSelectedService.ExtLine &&
                service.CostingModelType &&
                service.CostingModelType !== sCostingModelType
            );

            if (existingService) {
                sap.m.MessageBox.warning(
                    `This item already has a different costing model assigned: ${existingService.CostingModelType}`
                );
                return; // Stop opening the simulation dialog
            }

            // ✅ Save selected costing model type to the view model (for later save)
            oViewModel.setProperty("/selectedCostingModelType", sCostingModelType);

            // Validate required parameters
            if (!sSalesDoc || !sItemNum || !sCategory) {
                console.error(`Invalid parameters - Salesdocument: ${sSalesDoc}, ItemNumber: ${sItemNum}, Category: ${sCategory}`);
                sap.m.MessageBox.error("Cannot load data: Missing quotation number, item number, or category.");
                return;
            }

            // Initialize view model properties
            oViewModel.setProperty("/simulationData", []);
            oViewModel.setProperty("/indirectCostData", []);
            oViewModel.setProperty("/materialData", []);
            oViewModel.setProperty("/cablesData", []);
            oViewModel.setProperty("/selectedMaterialDesc", "");
            oViewModel.setProperty("/totalAmount", "0.00");

            if (this._oSimulationDialog) {
                this._oSimulationDialog.destroy();
                this._oSimulationDialog = null;
            }

            // Destroy materialTable if it already exists
            const oOldMaterialTable = sap.ui.getCore().byId(this.createId("materialTable"));
            if (oOldMaterialTable) {
                oOldMaterialTable.destroy();
            }

            // E & D Table
            const oEDTable = new sap.m.Table({
                visible: sCategory === "EAndD",
                columns: [
                    new sap.m.Column({ header: new sap.m.Text({ text: "Design and Engineering" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Salary" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Months" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "No. Of Persons" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Amount (SAR)" }) })
                ],
                items: {
                    path: "viewModel>/simulationData",
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Input({
                                value: "{viewModel>description}", editable: "{= ${viewModel>__isNew} === true }"
                                , change: this.onSimulationInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Salary}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onSimulationInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Months}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onSimulationInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>NoOfPersons}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onSimulationInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Amount}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onAmountDirectChange.bind(this)
                            })
                        ]
                    })
                }
            });

            // Indirect Cost Table
            const oIndirectTable = new sap.m.Table({
                visible: sCategory === "IndirectCost",
                columns: [
                    new sap.m.Column({ header: new sap.m.Text({ text: "Description" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Unit" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Qty" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Cost" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Labour" }) }),
                    new sap.m.Column({ header: new sap.m.Text({ text: "Total (SAR)" }) })
                ],
                items: {
                    path: "viewModel>/indirectCostData",
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Input({
                                value: "{viewModel>Description}", editable: "{= ${viewModel>__isNew} === true }",
                                change: this.onIndirectCostInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Unit}", editable: "{= ${viewModel>__isNew} === true }",
                                change: this.onIndirectCostInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Qty}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onIndirectCostInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Cost}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onIndirectCostInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Labour}", editable: "{= ${viewModel>__isNew} === true }",
                                change: this.onIndirectCostInputChange.bind(this)
                            }),
                            new sap.m.Input({ editable: false, value: "{viewModel>Total}", type: "Number", change: this.onTotalDirectChange.bind(this) })
                        ]
                    })
                }
            });

            // Material Header
            const oMaterialHeader = new sap.m.VBox({
                width: "100%",
                alignItems: "Center",
                items: [
                    new sap.m.Label({ text: "Material Description (Required):" }).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin sapUiSizeCompact"),
                    new sap.m.HBox({
                        alignItems: "Center",
                        items: [
                            new sap.m.Button({
                                text: "Confirm Vendor Selection",
                                icon: "sap-icon://accept",
                                press: this.onConfirmVendorSelection.bind(this)
                            }).addStyleClass("sapUiResponsiveMargin sapUiSizeCompact")
                        ]
                    }).addStyleClass("sapUiSmallMarginBegin sapUiSizeCompact")
                ]
            });

            // Material Table
            const oMaterialTable = new sap.m.Table({
                id: this.createId("materialTable"),
                keyboardMode: "Edit",
                visible: sCategory === "Material",
                inset: false,
                width: "auto",
                columns: [
                    "Material", "Vendor Details", "Quotation Date", "Quotation Price", "Payment Terms",
                    "Freight & Clearance Charges(%)", "Freight & Clearance Charges", "Transportation Charges", "SABER", "Total Sub-Charges", "Total Price"
                ].map(text => new sap.m.Column({
                    header: new sap.m.Text({ text }),
                    demandPopin: true,
                    minScreenWidth: "Tablet"
                })),
                items: {
                    path: "viewModel>/materialData",
                    factory: this._createMaterialRow.bind(this)
                }
            }).addStyleClass("sapUiResponsiveMargin sapUiSizeCompact");

            // Cables Table
            const oCablesTable = new sap.m.Table({
                visible: sCategory === "Cables",
                columns: [
                    "Description", "Circuit", "Runs", "No of ph", "Approximate Meter", "Total", "Unit Price", "Total Price (SAR)"
                ].map(text => new sap.m.Column({ header: new sap.m.Text({ text }) })),
                items: {
                    path: "viewModel>/cablesData",
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Input({
                                value: "{viewModel>Description}", editable: "{= ${viewModel>__isNew} === true }",
                                change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Circuit}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Runs}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>No_of_ph}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({
                                value: "{viewModel>Approximate_Meter}", editable: "{= ${viewModel>__isNew} === true }",
                                change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({ editable: false, value: "{viewModel>Total}", type: "Number", change: this.onCablesTotalPriceChange.bind(this) }),
                            new sap.m.Input({
                                value: "{viewModel>Unit_Price}", editable: "{= ${viewModel>__isNew} === true }",
                                type: "Number", change: this.onCablesInputChange.bind(this)
                            }),
                            new sap.m.Input({ editable: false, value: "{viewModel>Total_Price}", type: "Number", change: this.onCablesTotalPriceChange.bind(this) })
                        ]
                    })
                }
            });

            // Dialog Setup
            this._oSimulationDialog = new sap.m.Dialog({
                title: "Simulation Table",
                contentWidth: "auto",
                contentHeight: "80%",
                content: new sap.m.VBox({
                    items: [
                        sCategory === "Material" ? oMaterialHeader : null,
                        sCategory === "EAndD" ? oEDTable : null,
                        sCategory === "IndirectCost" ? oIndirectTable : null,
                        sCategory === "Material" ? oMaterialTable : null,
                        sCategory === "Cables" ? oCablesTable : null,
                        new sap.m.Text({
                            visible: !["EAndD", "IndirectCost", "Material", "Cables"].includes(sCategory),
                            text: "This category is not available now and will be available shortly."
                        })
                    ].filter(Boolean)
                }),
                buttons: [
                    new sap.m.Button({
                        text: "Save",
                        press: this.onSaveSimulation.bind(this)
                    }),
                    new sap.m.Button({
                        text: "Add New Line",
                        press: this.onAddNewLine.bind(this),
                        visible: sCategory === "EAndD" || sCategory === "IndirectCost" || sCategory === "Material" || sCategory === "Cables"
                    }),
                    new sap.m.Button({
                        text: "Close",
                        press: () => this._oSimulationDialog.close()
                    })
                ]
            });

            this.getView().addDependent(this._oSimulationDialog);

            // Helper function to fetch data for a given entity and set it to the correct view model path
            const fetchData = async (entityPath, viewModelPath, defaultRow) => {
                console.log(`Fetching data for ${sCategory} (${entityPath}) with Salesdocument: ${sSalesDoc}, ItemNumber: ${sItemNum}`);
                const oListBinding = oSimModel.bindList(entityPath, null, null, [
                    new sap.ui.model.Filter("Salesdocument", "EQ", sSalesDoc),
                    new sap.ui.model.Filter("ItemNumber", "EQ", sItemNum)
                ]);
                try {
                    const oContextList = await oListBinding.requestContexts();
                    const aResults = oContextList.map(ctx => {
                        const obj = ctx.getObject();
                        console.log(`Fetched row for ${entityPath}:`, obj);
                        // Map backend field names to view model field names
                        if (entityPath === "/MaterialEntry") {
                            return {
                                Description: obj.Description || "",
                                Vendor_Details: obj.VendorDetails || obj.Vendor_Details || "",
                                Quotation_Date: obj.QuotationDate || obj.Quotation_Date || "",
                                Quotation_Price: obj.QuotationPrice || obj.Quotation_Price || "",
                                Payment_Terms: obj.PaymentTerms || obj.Payment_Terms || "",
                                Freight_Clearance_Charges_Percentage: obj.FreightClearanceChargesPercentage || obj.Freight_Clearance_Charges_Percentage || "",
                                Freight_Clearance_Charges: obj.FreightClearanceCharges || obj.Freight_Clearance_Charges || "",
                                Transportation_Charges: obj.TransportationCharges || obj.Transportation_Charges || "",
                                SABER: obj.Saber || obj.SABER || "",
                                Total_Sub_Charges: obj.TotalSubCharges || obj.Total_Sub_Charges || "",
                                Total_Price: obj.TotalPrice || obj.Total_Price || "",
                                __isNew: false
                            };
                        } else if (entityPath === "/CablesEntry") {
                            return {
                                Description: obj.Description || "",
                                Circuit: obj.Circuit || "",
                                Runs: obj.Runs || "",
                                No_of_ph: obj.NoOfPh || obj.No_of_ph || "",
                                Approximate_Meter: obj.ApproximateMeter || obj.Approximate_Meter || "",
                                Total: obj.Total || "",
                                Unit_Price: obj.UnitPrice || obj.Unit_Price || "",
                                Total_Price: obj.TotalPrice || obj.Total_Price || "",
                                __isNew: false
                            };
                        } else if (entityPath === "/IndirectCostEntry") {
                            return {
                                Description: obj.Description || "",
                                Unit: obj.Unit || "",
                                Qty: obj.Qty || "",
                                Cost: obj.Cost || "",
                                Labour: obj.Labour || "",
                                Total: obj.Total || "",
                                __isNew: false
                            };
                        } else {
                            return { ...obj, __isNew: false }; // For EAndD
                        }
                    });
                    oViewModel.setProperty(viewModelPath, aResults.length ? aResults : [defaultRow]);
                    console.log(`Set ${viewModelPath} for ${sCategory}:`, oViewModel.getProperty(viewModelPath));
                    oViewModel.refresh(true); // Ensure UI updates
                } catch (e) {
                    console.error(`Failed to fetch saved data for ${sCategory} (${entityPath}):`, e);
                    sap.m.MessageBox.error(`Could not load saved data for ${sCategory}: ${e.message}`);
                    oViewModel.setProperty(viewModelPath, [defaultRow]);
                    oViewModel.refresh(true);
                }
            };

            // Fetch data or set default row for each category
            if (sCategory === "EAndD") {
                await fetchData("/EngineeringDesignEntry", "/simulationData", {
                    description: "", Salary: "", Months: "", NoOfPersons: "", Amount: "", __isNew: true
                });
            } else if (sCategory === "IndirectCost") {
                await fetchData("/IndirectCostEntry", "/indirectCostData", {
                    Description: "", Unit: "", Qty: "", Cost: "", Labour: "", Total: "", __isNew: true
                });
            } else if (sCategory === "Material") {
                await fetchData("/MaterialEntry", "/materialData", {
                    Description: "", Vendor_Details: "", Quotation_Date: "", Quotation_Price: "",
                    Payment_Terms: "", Freight_Clearance_Charges_Percentage: "", Freight_Clearance_Charges: "",
                    Transportation_Charges: "", SABER: "", Total_Sub_Charges: "", Total_Price: "", __isNew: true
                });
            } else if (sCategory === "Cables") {
                await fetchData("/CablesEntry", "/cablesData", {
                    Description: "", Circuit: "", Runs: "", No_of_ph: "", Approximate_Meter: "",
                    Total: "", Unit_Price: "", Total_Price: "", __isNew: true
                });
            } else {
                console.warn(`Unsupported category: ${sCategory}`);
                sap.m.MessageBox.warning("Category not supported.");
                oViewModel.setProperty("/simulationData", []);
            }

            this._oSimulationDialog.open();
        },

        _createMaterialRow: function (sId, oContext) {
            return new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Input({
                        id: this.createId("materialDescInput" + sId),
                        placeholder: "Enter or Select Material Description",
                        showValueHelp: true,
                        required: true,
                        // width: "300px",
                        //value: "{viewModel>/selectedMaterialDesc}",
                        value: "{viewModel>Description}",
                        editable: "{= ${viewModel>__isNew} === true }",

                        valueHelpRequest: this.onValueDescHelpRequest.bind(this),
                        // change: this.onMaterialInputChange.bind(this),
                        change: (oEvent) => {
                            const sValue = oEvent.getSource().getValue();
                            console.log("Change triggered:", sValue, "Context:", oContext.getObject());
                            this.onMaterialInputChange(oEvent);
                        },
                        submit: (oEvent) => {
                            const sValue = oEvent.getSource().getValue();
                            const oInput = oEvent.getSource();
                            const oBindingContext = oInput.getBindingContext("viewModel");
                            const oRowData = oBindingContext ? oBindingContext.getObject() : {};
                            console.log("Submit triggered:", sValue, "Row Data:", oRowData);
                            this.onMaterialInputChange(oEvent);
                        },
                        valueState: "None",
                    }),

                    new sap.m.Input({
                        id: this.createId("vendorDetailsInput" + sId),
                        placeholder: "Enter or Select Vendor",
                        editable: "{= ${viewModel>__isNew} === true }",

                        value: "{viewModel>Vendor_Details}",
                        showValueHelp: true,
                        valueHelpRequest: this.onValueVendorsHelpRequest.bind(this),
                        // change: this.onMaterialInputChange.bind(this)
                        change: (oEvent) => {
                            const sValue = oEvent.getSource().getValue();
                            console.log("Vendor Change triggered:", sValue, "Context:", oContext.getObject());
                            this.onMaterialInputChange(oEvent);
                        },
                        submit: (oEvent) => {
                            const oInput = oEvent.getSource();
                            const sValue = oInput.getValue().trim();
                            const oBindingContext = oInput.getBindingContext("viewModel");
                            const oRowData = oBindingContext ? oBindingContext.getObject() : {};
                            console.log("Vendor Submit triggered:", sValue, "Row Data:", oRowData);
                            if (!oRowData.Description) {
                                sap.m.MessageBox.warning("Please enter a material description before submitting vendor details.");
                                return;
                            }
                            this.onMaterialInputChange(oEvent);
                        },
                        valueState: "None"
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Quotation_Date}",
                        type: "Date",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialInputChange.bind(this)
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Quotation_Price}",
                        type: "Number",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialInputChange.bind(this)
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Payment_Terms}",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialInputChange.bind(this)
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Freight_Clearance_Charges_Percentage}",
                        type: "Number",
                        editable: "{= ${viewModel>__isNew} === true }",

                        placeholder: "Enter Percentage",
                        change: this.onMaterialInputChange.bind(this),
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Freight_Clearance_Charges}",
                        type: "Number",
                        change: this.onMaterialInputChange.bind(this),
                        editable: false
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Transportation_Charges}",
                        type: "Number",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialInputChange.bind(this)
                    }),
                    new sap.m.Input({
                        value: "{viewModel>SABER}",
                        type: "Number",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialInputChange.bind(this)
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Total_Sub_Charges}",
                        type: "Number",

                        change: this.onMaterialInputChange.bind(this),
                        editable: false
                    }),
                    new sap.m.Input({
                        value: "{viewModel>Total_Price}",
                        type: "Number",
                        editable: "{= ${viewModel>__isNew} === true }",

                        change: this.onMaterialTotalPriceChange.bind(this)
                    })
                ]
            });
        },

        //Worked
        onMaterialInputChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const oViewModel = this.getView().getModel("viewModel");

            if (oContext) {
                const sPath = oContext.getPath();
                const iIndex = parseInt(sPath.split("/").pop(), 10);
                let oData = oViewModel.getProperty("/materialData");

                const sProperty = oInput.getBinding("value").getPath();
                const sValue = oInput.getValue();
                oData = oData.map((item, index) =>
                    index === iIndex ? { ...item, [sProperty]: oInput.getValue() } : { ...item }
                );
                oData[iIndex] = {
                    ...oData[iIndex],
                    [sProperty]: sValue,
                    Description: oData[iIndex].Description || "",
                    Vendor_Details: oData[iIndex].Vendor_Details || "",
                    Quotation_Date: oData[iIndex].Quotation_Date || "",
                    Quotation_Price: oData[iIndex].Quotation_Price || "",
                    Payment_Terms: oData[iIndex].Payment_Terms || "",
                    Freight_Clearance_Charges_Percentage: oData[iIndex].Freight_Clearance_Charges_Percentage || "",
                    // Freight_Clearance_Charges: oData[iIndex].Frieght_Clearance_Charges || "",

                    // Freight_Clearance_Charges: oData[iIndex].Quotation_Price ? (oData[iIndex].Quotation_Price * 17 / 100) : "" || "",
                    Transportation_Charges: oData[iIndex].Transportation_Charges || "",
                    SABER: oData[iIndex].SABER || "",
                    Total_Sub_Charges: oData[iIndex].Total_Sub_Charges || "",
                    // Total_Sub_Charges: oData[iIndex].Quotation_Price && oData[iIndex].Transportation_Charges && oData[iIndex].SABER ? (oData[iIndex].Quotation_Price * 17 / 100) : 0 || 0 + oData[iIndex].Transportation_Charges + oData[iIndex].SABER || "",
                    Total_Price: oData[iIndex].Quotation_Price || ""
                };

                // Calculate Freight_Clearance_Charges (Quotation_Price * Freight_Clearance_Charges_Percentage / 100)
                const fQuotationPrice = parseFloat(oData[iIndex].Quotation_Price) || 0;
                const fClearancePercentage = parseFloat(oData[iIndex].Freight_Clearance_Charges_Percentage) || 0;
                oData[iIndex].Freight_Clearance_Charges = fQuotationPrice && fClearancePercentage
                    ? (fQuotationPrice * (fClearancePercentage / 100)).toFixed(2)
                    : "";

                // Calculate Total_Sub_Charges (sum of Freight_Clearance_Charges, Transportation_Charges, SABER)
                const fFreightCharges = parseFloat(oData[iIndex].Freight_Clearance_Charges) || 0;
                const fTransportationCharges = parseFloat(oData[iIndex].Transportation_Charges) || 0;
                const fSABER = parseFloat(oData[iIndex].SABER) || 0;
                oData[iIndex].Total_Sub_Charges = (fFreightCharges + fTransportationCharges + fSABER).toFixed(2);

                oViewModel.setProperty("/materialData", oData);
                console.log("materialData after input change:", JSON.parse(JSON.stringify(oData)));
                this.byId("materialTable").getBinding("items").refresh(true); // Force refresh
            } else {
                console.warn("No binding context found for input");
            }

            this.updateTotalAmount();
        },

        // onMaterialTotalPriceChange(oEvent) {
        //     const oInput = oEvent.getSource();
        //     const oContext = oInput.getBindingContext("viewModel");
        //     const sPath = oContext.getPath();
        //     const iIndex = parseInt(sPath.split("/").pop(), 10);
        //     const oData = this.getView().getModel("viewModel").getProperty("/materialData");

        //     const quotation_Price = parseFloat(oData[iIndex].Quotation_Price) || 0;


        //     if (quotation_Price) {
        //         const total = quotation_Price.toFixed(2);
        //         oData[iIndex].Total_Price = total;
        //     } else {
        //         oData[iIndex].Total_Price = "";
        //     }

        //     this.getView().getModel("viewModel").setProperty("/materialData", oData);
        //     this.updateTotalAmount();
        // },

        onMaterialTotalPriceChange: function (oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const oViewModel = this.getView().getModel("viewModel");
            const oData = oViewModel.getProperty("/materialData");
            const iIndex = parseInt(sPath.split("/").pop(), 10);

            const fQuotationPrice = parseFloat(oData[iIndex].Quotation_Price) || 0;

            // Set Total_Price to Quotation_Price
            oData[iIndex].Total_Price = fQuotationPrice.toFixed(2);

            // Refresh the model to update the table
            oViewModel.setProperty("/materialData", [...oData]);

            // Update the total amount (if applicable)
            this.updateTotalAmount();
        },

        /*
        for Cables */

        onCablesInputChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/cablesData");

            oData[iIndex].Description = oData[iIndex].Description || "";
            oData[iIndex].Circuit = oData[iIndex].Circuit || "";
            oData[iIndex].Runs = oData[iIndex].Runs || "";
            oData[iIndex].No_of_ph = oData[iIndex].No_of_ph || "";
            oData[iIndex].Approximate_Meter = oData[iIndex].Approximate_Meter || "";
            oData[iIndex].Unit_Price = oData[iIndex].Unit_Price || "";
            //TotalPrice Calculations
            const circuit = parseFloat(oData[iIndex].Circuit) || 0;
            const runs = parseFloat(oData[iIndex].Runs) || 0;
            const noOfPh = parseFloat(oData[iIndex].No_of_ph) || 0;
            const Approximate_Meter = parseFloat(oData[iIndex].Approximate_Meter) || 0;
            const Unit_Price = parseFloat(oData[iIndex].Unit_Price) || 0;

            if (circuit && runs && noOfPh && Approximate_Meter) {
                const total = (circuit * runs * noOfPh * Approximate_Meter).toFixed(2);
                oData[iIndex].Total = total;
                if (Unit_Price) {
                    const total_price = (circuit * runs * noOfPh * Approximate_Meter * Unit_Price).toFixed(2);
                    oData[iIndex].Total_Price = total_price;
                }
                else {
                    oData[iIndex].Total_Price = "";
                }
            } else {
                oData[iIndex].Total = "";
            }


            this.getView().getModel("viewModel").setProperty("/cablesData", oData);
            this.updateTotalAmount();
        },

        onCablesTotalPriceChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/cablesData");

            //TotalPrice Calculations
            const circuit = parseFloat(oData[iIndex].Circuit) || 0;
            const runs = parseFloat(oData[iIndex].Runs) || 0;
            const noOfPh = parseFloat(oData[iIndex].No_of_ph) || 0;
            const Approximate_Meter = parseFloat(oData[iIndex].Approximate_Meter) || 0;
            const Unit_Price = parseFloat(oData[iIndex].Unit_Price) || 0;

            if (circuit && runs && noOfPh && Approximate_Meter) {
                const total = (circuit * runs * noOfPh * Approximate_Meter).toFixed(2);
                oData[iIndex].Total = total;
                if (Unit_Price) {
                    const total_price = (circuit * runs * noOfPh * Approximate_Meter * Unit_Price).toFixed(2);
                    oData[iIndex].Total_Price = total_price;
                }
                else {
                    oData[iIndex].Total_Price = "";
                }
            } else {
                oData[iIndex].Total = "";
            }

            this.getView().getModel("viewModel").setProperty("/cablesData", oData);
            this.updateTotalAmount();
        },
        ////
        onSimulationInputChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/simulationData");

            const salary = parseFloat(oData[iIndex].Salary) || 0;
            const months = parseFloat(oData[iIndex].Months) || 0;
            const noOfPersons = parseFloat(oData[iIndex].NoOfPersons) || 0;

            if (salary && months && noOfPersons) {
                const amount = (salary * months * noOfPersons).toFixed(2);
                oData[iIndex].Amount = amount;
            } else {
                oData[iIndex].Amount = "";
            }

            this.getView().getModel("viewModel").setProperty("/simulationData", oData);
            this.updateTotalAmount();
        },

        onAmountDirectChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/simulationData");

            oData[iIndex].Salary = "";
            oData[iIndex].Months = "";
            oData[iIndex].NoOfPersons = "";

            this.getView().getModel("viewModel").setProperty("/simulationData", oData);
            this.updateTotalAmount();
        },

        onIndirectCostInputChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/indirectCostData");

            const qty = parseFloat(oData[iIndex].Qty) || 0;
            const cost = parseFloat(oData[iIndex].Cost) || 0;

            if (qty && cost) {
                const total = (qty * cost).toFixed(2);
                oData[iIndex].Total = total;
            } else {
                oData[iIndex].Total = "";
            }

            this.getView().getModel("viewModel").setProperty("/indirectCostData", oData);
            this.updateTotalAmount();
        },

        onTotalDirectChange(oEvent) {
            const oInput = oEvent.getSource();
            const oContext = oInput.getBindingContext("viewModel");
            const sPath = oContext.getPath();
            const iIndex = parseInt(sPath.split("/").pop(), 10);
            const oData = this.getView().getModel("viewModel").getProperty("/indirectCostData");

            oData[iIndex].Qty = "";
            oData[iIndex].Cost = "";

            this.getView().getModel("viewModel").setProperty("/indirectCostData", oData);
            this.updateTotalAmount();
        },

        updateTotalAmount() {
            const sCategory = this.getView().getModel("viewModel").getProperty("/selectedCategory");
            let totalAmount = 0;

            if (sCategory === "EAndD") {
                const aData = this.getView().getModel("viewModel").getProperty("/simulationData");
                totalAmount = aData.reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0).toFixed(2);
            } else if (sCategory === "IndirectCost") {
                const aData = this.getView().getModel("viewModel").getProperty("/indirectCostData");
                totalAmount = aData.reduce((sum, row) => sum + (parseFloat(row.Total) || 0), 0).toFixed(2);
            } else if (sCategory === "Material") {
                const aData = this.getView().getModel("viewModel").getProperty("/materialData");
                console.log(aData);

                totalAmount = aData.reduce((sum, row) => sum + (parseFloat(row.Total_Price) || 0), 0).toFixed(2);
            }
            else if (sCategory === "Cables") {
                const aData = this.getView().getModel("viewModel").getProperty("/cablesData");
                totalAmount = aData.reduce((sum, row) => sum + (parseFloat(row.Total_Price) || 0), 0).toFixed(2);
            }


            this.getView().getModel("viewModel").setProperty("/totalAmount", totalAmount);
        },

        // onAddNewLine() {
        //     const sCategory = this.getView().getModel("viewModel").getProperty("/selectedCategory");
        //     if (sCategory === "EAndD") {
        //         const aData = this.getView().getModel("viewModel").getProperty("/simulationData");
        //         aData.push({
        //             description: "",
        //             Salary: "",
        //             Months: "",
        //             NoOfPersons: "",
        //             Amount: "",
        //             __isNew: true // ✅ Flag new rows
        //         });
        //         this.getView().getModel("viewModel").setProperty("/simulationData", aData);
        //     } else if (sCategory === "IndirectCost") {
        //         const aData = this.getView().getModel("viewModel").getProperty("/indirectCostData");
        //         aData.push({
        //             Description: "",
        //             Unit: "",
        //             Qty: "",
        //             Cost: "",
        //             Labour: "",
        //             Total: "",
        //             __isNew: true
        //         });
        //         this.getView().getModel("viewModel").setProperty("/indirectCostData", aData);



        //     } else if (sCategory === "Material") {
        //         const oViewModel = this.getView().getModel("viewModel");
        //         //oViewModel.setProperty("/selectedMaterialDesc","");

        //         let aData = oViewModel.getProperty("/materialData") || [];
        //         // Create a new object with all properties
        //         const newRow = {
        //             //selectedMaterialDesc:"",
        //             Description: "",
        //             Vendor_Details: "",
        //             Quotation_Date: "",
        //             Quotation_Price: "",
        //             Payment_Terms: "",
        //             Transportation_Charges: "",
        //             Freight_Clearance_Charges: "", 
        //             SABER: "",
        //             Total_Sub_Charges: "",
        //             Total_Price: "",
        //             __isNew: true
        //         };
        //         aData.push(newRow);
        //         oViewModel.setProperty("/materialData", [...aData]); // Spread to create a new array
        //         console.log("materialData after add:", JSON.parse(JSON.stringify(oViewModel.getProperty("/materialData"))));



        //     } else if (sCategory === "Cables") {
        //         const aData = this.getView().getModel("viewModel").getProperty("/cablesData");
        //         aData.push({
        //             Description: "",
        //             Circuit: "",
        //             Runs: "",
        //             No_of_ph: "",
        //             Approximate_Meter: "",
        //             Total: "",
        //             Unit_Price: "",
        //             Total_Price: "",
        //             __isNew: true
        //         });
        //         this.getView().getModel("viewModel").setProperty("/cablesData", aData);
        //     }
        // },
        // Save at Entities Successfully

        //UI Change
        
        
        onAddNewLine: function () {
            const oViewModel = this.getView().getModel("viewModel");
            const sCategory = oViewModel.getProperty("/selectedCategory");
            let viewModelPath, newRow;

            switch (sCategory) {
                case "EAndD":
                    viewModelPath = "/simulationData";
                    newRow = {
                        description: "", Salary: "", Months: "", NoOfPersons: "", Amount: "", __isNew: true
                    };
                    break;
                case "IndirectCost":
                    viewModelPath = "/indirectCostData";
                    newRow = {
                        Description: "", Unit: "", Qty: "", Cost: "", Labour: "", Total: "", __isNew: true
                    };
                    break;
                case "Material":
                    viewModelPath = "/materialData";
                    newRow = {
                        Description: "", Vendor_Details: "", Quotation_Date: "", Quotation_Price: "",
                        Payment_Terms: "", Freight_Clearance_Charges_Percentage: "", Freight_Clearance_Charges: "",
                        Transportation_Charges: "", SABER: "", Total_Sub_Charges: "", Total_Price: "", __isNew: true
                    };
                    break;
                case "Cables":
                    viewModelPath = "/cablesData";
                    newRow = {
                        Description: "", Circuit: "", Runs: "", No_of_ph: "", Approximate_Meter: "",
                        Total: "", Unit_Price: "", Total_Price: "", __isNew: true
                    };
                    break;
                default:
                    sap.m.MessageBox.warning("Category not supported.");
                    return;
            }

            // Check if an editable row already exists
            const aData = oViewModel.getProperty(viewModelPath);
            const hasNewRow = aData.some(row => row.__isNew);
            if (!hasNewRow) {
                aData.push(newRow);
                oViewModel.setProperty(viewModelPath, aData);
                oViewModel.refresh(true);
                console.log(`Added new row to ${viewModelPath}:`, newRow);
            } else {
                sap.m.MessageToast.show("An editable row already exists.");
            }
        },

        onSaveSimulation: async function () {
            const oView = this.getView();
            const oViewModel = oView.getModel("viewModel");
            const oSimModel = oView.getModel("simulationModel"); // Must be OData V4 model
            const oServiceModel = oView.getModel("serviceModel");
            const oODataModel = oView.getModel("ZBTP_POST_QUOT_SRVSampleService");

            const sCategory = oViewModel.getProperty("/selectedCategory");
            const sSalesDoc = oViewModel.getProperty("/quotationNumber");
            const sItemNum = oViewModel.getProperty("/itemNumber");
            const oSelectedService = oViewModel.getProperty("/selectedService");
            const sTimestamp = new Date().toISOString();

            let aDataToSave = [];
            let sEntityPath = "";
            let totalAmount = 0;

            switch (sCategory) {
                case "EAndD":
                    aDataToSave = oViewModel.getProperty("/simulationData")
                        .filter(row => row.__isNew) // ✅ Only new
                        .map(row => ({
                            ShortText: oSelectedService.ShortText,
                            Salesdocument: sSalesDoc,
                            ItemNumber: sItemNum,
                            description: row.description,
                            Salary: row.Salary,
                            Months: row.Months,
                            NoOfPersons: row.NoOfPersons,
                            Amount: row.Amount,
                            CreatedAt: sTimestamp
                        }));
                    sEntityPath = "/EngineeringDesignEntry";
                    break;

                case "IndirectCost":
                    aDataToSave = oViewModel.getProperty("/indirectCostData").filter(row => row.__isNew)
                        .map(row => {
                            totalAmount += parseFloat(row.Total) || 0;
                            return {
                                ShortText: oSelectedService.ShortText,
                                Salesdocument: sSalesDoc,
                                ItemNumber: sItemNum,
                                Description: row.Description,
                                Unit: row.Unit,
                                Qty: row.Qty,
                                Cost: row.Cost,
                                Labour: row.Labour,
                                Total: row.Total,
                                CreatedAt: sTimestamp
                            };
                        });
                    sEntityPath = "/IndirectCostEntry";
                    break;

                case "Material":
                    aDataToSave = oViewModel.getProperty("/materialData").filter(row => row.__isNew)
                        .map(row => {
                            totalAmount += parseFloat(row.Total_Price) || 0;
                            return {
                                ShortText: oSelectedService.ShortText,
                                Salesdocument: sSalesDoc,
                                ItemNumber: sItemNum,
                                Description: row.Description,
                                VendorDetails: row.Vendor_Details,
                                QuotationDate: row.Quotation_Date,
                                QuotationPrice: row.Quotation_Price,
                                PaymentTerms: row.Payment_Terms,
                                FreightClearanceCharges: row.Freight_Clearance_Charges,
                                TransportationCharges: row.Transportation_Charges,
                                Saber: row.SABER,
                                TotalSubCharges: row.Total_Sub_Charges,
                                TotalPrice: row.Total_Price,
                                CreatedAt: sTimestamp
                            };
                        });

                    sEntityPath = "/MaterialEntry";

                    // ✅ Update main table’s TotalSubCharges immediately
                    const aServices = oServiceModel.getData();
                    const iIndex = aServices.findIndex(s => s.ExtLine === oSelectedService.ExtLine);

                    if (iIndex !== -1) {
                        // Calculate sum from ALL rows in materialData
                        const newTotal = oViewModel.getProperty("/materialData")
                            .reduce((sum, r) => sum + (parseFloat(r.Total_Sub_Charges) || 0), 0);

                        aServices[iIndex].TotalSubCharges = newTotal.toFixed(2);
                        oServiceModel.setData(aServices);
                        oServiceModel.refresh(true);
                    }
                    break;


                case "Cables":
                    aDataToSave = oViewModel.getProperty("/cablesData").filter(row => row.__isNew)
                        .map(row => {
                            totalAmount += parseFloat(row.Total_Price) || 0;
                            return {
                                ShortText: oSelectedService.ShortText,
                                Salesdocument: sSalesDoc,
                                ItemNumber: sItemNum,
                                Description: row.Description,
                                Circuit: row.Circuit,
                                Runs: row.Runs,
                                NoOfPh: row.No_of_ph,
                                ApproximateMeter: row.Approximate_Meter,
                                Total: row.Total,
                                UnitPrice: row.Unit_Price,
                                TotalPrice: row.Total_Price,
                                CreatedAt: sTimestamp
                            };
                        });
                    sEntityPath = "/CablesEntry";
                    break;

                default:
                    return sap.m.MessageBox.warning("Category not supported.");
            }

            try {
                const sBatchGroupId = "simSaveGroup_" + Date.now();
                const oBinding = oSimModel.bindList(sEntityPath, null, null, null, {
                    $$groupId: sBatchGroupId
                });

                for (const row of aDataToSave) {
                    await oBinding.create(row);
                }

                await oSimModel.submitBatch(sBatchGroupId);

                // Update GrPrice in view model and service model (frontend only for now)
                // Map key to display text
                const categoryMap = {
                    "EAndD": "E and D",
                    "Material": "Material",
                    "Cables": "Cables",
                    "IndirectCost": "Indirect Cost",
                    "Testing": "Testing",
                    "TAndCBOM": "T and C BOM"
                };

                const sCostingModelType = categoryMap[sCategory] || sCategory;

                const aServices = oServiceModel.getData();
                const iIndex = aServices.findIndex(service =>
                    service.ExtLine === oSelectedService.ExtLine &&
                    service.ShortText === oSelectedService.ShortText
                );

                if (iIndex !== -1) {
                    aServices[iIndex].CostingModelType = sCostingModelType; // New column in table
                    aServices[iIndex].GrPrice = totalAmount.toFixed(2); // Existing code
                    oServiceModel.setData(aServices);
                    oServiceModel.refresh(true);
                }


                sap.m.MessageToast.show("Saved successfully to CAP.");
                this._oSimulationDialog.close();

            } catch (error) {
                console.error("Save error:", error);
                sap.m.MessageBox.error("Save failed: " + error.message);
            }
        },
       
        //     const oView = this.getView();
        //     const oViewModel = oView.getModel("viewModel");
        //     const oSimModel = oView.getModel("simulationModel");
        //     const oServiceModel = oView.getModel("serviceModel");
        //     const oODataModel = oView.getModel("ZBTP_POST_QUOT_SRVSampleService");

        //     // Debug model
        //     console.log("OData Model:", oODataModel);
        //     // console.log("Model Type:", oODataModel.getMetadata ? oODataModel.getMetadata().getServiceMetadata() : "Not an OData model");

        //     const sCategory = oViewModel.getProperty("/selectedCategory");
        //     const sSalesDoc = oViewModel.getProperty("/quotationNumber");
        //     const sItemNum = oViewModel.getProperty("/itemNumber");
        //     const sTimestamp = new Date().toISOString();
        //     const oSelectedService = oViewModel.getProperty("/selectedService");

        //     let aDataToSave = [];
        //     let totalAmount = 0;

        //     switch (sCategory) {
        //       case "EAndD":
        //         aDataToSave = oViewModel.getProperty("/simulationData").map(row => {
        //           totalAmount += parseFloat(row.Amount) || 0;
        //           return {
        //             ShortText: oSelectedService.ShortText,
        //             ItemNumber: sItemNum,
        //             Salary: row.Salary,
        //             Months: row.Months,
        //             NoOfPersons: row.NoOfPersons,
        //             Amount: row.Amount,
        //             CreatedAt: sTimestamp
        //           };
        //         });
        //         break;
        //       case "IndirectCost":
        //         aDataToSave = oViewModel.getProperty("/indirectCostData").map(row => {
        //           totalAmount += parseFloat(row.Total) || 0;
        //           return {
        //             ShortText: oSelectedService.ShortText,
        //             ItemNumber: sItemNum,
        //             Description: row.Description,
        //             Unit: row.Unit,
        //             Qty: row.Qty,
        //             Cost: row.Cost,
        //             Labour: row.Labour,
        //             Total: row.Total,
        //             CreatedAt: sTimestamp
        //           };
        //         });
        //         break;
        //       case "Material":
        //         aDataToSave = oViewModel.getProperty("/materialData").map(row => {
        //           totalAmount += parseFloat(row.Total_Price) || 0;
        //           return {
        //             ShortText: oSelectedService.ShortText,
        //             ItemNumber: sItemNum,
        //             Description: row.Description,
        //             VendorDetails: row.Vendor_Details,
        //             QuotationDate: row.Quotation_Date,
        //             QuotationPrice: row.Quotation_Price,
        //             PaymentTerms: row.Payment_Terms,
        //             FreightClearanceCharges: row.Frieght_Clearance_Charges,
        //             TransportationCharges: row.Transportation_Charges,
        //             Saber: row.SABER,
        //             TotalSubCharges: row.Total_Sub_Charges,
        //             TotalPrice: row.Total_Price,
        //             CreatedAt: sTimestamp
        //           };
        //         });
        //         break;
        //       case "Cables":
        //         aDataToSave = oViewModel.getProperty("/cablesData").map(row => {
        //           totalAmount += parseFloat(row.Total_Price) || 0;
        //           return {
        //             ShortText: oSelectedService.ShortText,
        //             ItemNumber: sItemNum,
        //             Description: row.Description,
        //             Circuit: row.Circuit,
        //             Runs: row.Runs,
        //             NoOfPh: row.No_of_ph,
        //             ApproximateMeter: row.Approximate_Meter,
        //             Total: row.Total,
        //             UnitPrice: row.Unit_Price,
        //             TotalPrice: row.Total_Price,
        //             CreatedAt: sTimestamp
        //           };
        //         });
        //         break;
        //       default:
        //         return sap.m.MessageBox.warning("Category not supported.");
        //     }

        //     const entityMap = {
        //       EAndD: "/EngineeringDesignEntry",
        //       IndirectCost: "/IndirectCostEntry",
        //       Material: "/MaterialEntry",
        //       Cables: "/CablesEntry"
        //     };

        //     try {
        //       const sEntityPath = entityMap[sCategory];
        //       const oBinding = oSimModel.bindList(sEntityPath, undefined, [], null, {
        //         $$groupId: "$direct"
        //       });

        //       for (const row of aDataToSave) {
        //         await oBinding.create(row);
        //       }

        //       // Update GrPrice in serviceModel and persist to backend
        //       if (oSelectedService && sCategory === "EAndD") {
        //         const aServices = oServiceModel.getData();
        //         const iIndex = aServices.findIndex(service =>
        //           service.ExtLine === oSelectedService.ExtLine &&
        //           service.ShortText === oSelectedService.ShortText
        //         );

        //         if (iIndex !== -1) {
        //           aServices[iIndex].GrPrice = totalAmount.toFixed(2);
        //           oServiceModel.setData(aServices);

        //           // Check if model supports V4 update
        //           if (oODataModel.update) {
        //             await oODataModel.update(`/BOSSet(Salesdocument='${sSalesDoc}',PckgNo='${oSelectedService.PckgNo}',LineNo='${oSelectedService.LineNo}')`, {
        //               GrPrice: totalAmount.toFixed(2)
        //             }, {
        //               success: function () {
        //                 console.log("GrPrice updated successfully in backend (V4)");
        //                 oServiceModel.refresh(true);
        //               },
        //               error: function (oError) {
        //                 console.error("Failed to update GrPrice (V4):", oError);
        //                 sap.m.MessageBox.error("Failed to update Gross Price in backend.");
        //               }
        //             });
        //           } else if (oODataModel.updateEntity) {
        //             // Fallback for OData V2
        //             oODataModel.updateEntity(
        //               `/BOSSet(Salesdocument='${sSalesDoc}',PckgNo='${oSelectedService.PckgNo}',LineNo='${oSelectedService.LineNo}')`,
        //               null,
        //               { GrPrice: totalAmount.toFixed(2) },
        //               {
        //                 success: function (oData, response) {
        //                   console.log("GrPrice updated successfully in backend (V2)", response);
        //                   oServiceModel.refresh(true);
        //                 },
        //                 error: function (oError) {
        //                   console.error("Failed to update GrPrice (V2):", oError);
        //                   sap.m.MessageBox.error("Failed to update Gross Price in backend.");
        //                 }
        //               }
        //             );
        //           } else {
        //             throw new Error("OData model does not support update operations.");
        //           }
        //         }
        //       }

        //       sap.m.MessageToast.show("Saved successfully to CAP and updated Gross Price.");
        //       this._oSimulationDialog.close();
        //     } catch (e) {
        //       console.error(e);
        //       sap.m.MessageBox.error("Save failed: " + e.message);
        //     }
        //   },
        
        
        updateServiceLinesTable() {
            var sQuotation = this.getView().getModel("viewModel").getProperty("/quotationNumber");
            var sItemNumber = this.getView().getModel("viewModel").getProperty("/itemNumber");



            console.log(sQuotation);
            console.log(sItemNumber);
            var oTable = this.byId("serviceLinesTable");

            // try to access the table inside the tab container
            // var oTabContainer = this.byId("myTabContainer");
            // var oSelectedItem = oTabContainer.getSelectedItem();
            // if (!oSelectedItem) {
            //     console.warn("No tab selected yet.");
            //     return;
            // }

            // var oTable = oSelectedItem.getContent()[0];
            // if (!oTable) {
            //     console.warn("Table not yet rendered in tab content.");
            //     return;
            // }
            // const oTable = oSelectedItem?.getContent().find(control => control.getId().includes("serviceLinesTable"));

            // if (!oTable) {
            //     console.warn("Table not found in selected tab.");
            //     return;
            // }
            if (!sQuotation || !sItemNumber) {
                oTable.bindRows({ path: "" });
                return;
            }
            this.getView().getModel("viewModel").setProperty("/tableBusy", true);
            const normalizedItemNumber = sItemNumber.replace(/^0+/, '') || sItemNumber;
            console.log("normalizedItemNumber", normalizedItemNumber);


            //const sCondUrl = `https://port4004-workspaces-ws-vosfl.us10.trial.applicationstudio.cloud.sap/odata/v4/zbtp-srvsample/BOS_CONDSet?$filter=Salesdocument eq '${sQuotation}'&$top=50`;
            const sCondUrl = `/odata/v4/zbtp-srvsample/BOS_CONDSet?$filter=Salesdocument eq '${sQuotation}'&$top=50`;
            sap.ui.require(["sap/ui/thirdparty/jquery", "sap/m/MessageBox"], (jQuery, MessageBox) => {
                jQuery.ajax({
                    url: sCondUrl,
                    method: "GET",
                    success: (oData) => {
                        if (oData.value && oData.value.length > 0) {
                            console.log("OData is", oData.value);

                            const aMatchingConds = oData.value.filter(cond => {
                                const normalizedCondItemNumber = cond.ItmNumber.replace(/^0+/, '') || cond.ItmNumber;
                                console.log("normalizedCondItemNumber", normalizedCondItemNumber);

                                return normalizedCondItemNumber === normalizedItemNumber;
                            });
                            console.log("matching conds", aMatchingConds);

                            if (aMatchingConds.length === 0) {
                                oTable.bindRows({ path: "" });
                                MessageBox.warning("No matching conditions found for the selected item number.");
                                return;
                            }

                            const aPckgNos = [...new Set(aMatchingConds.map(cond => cond.PckgNo))];

                           // const sServiceUrl = `https://port4004-workspaces-ws-vosfl.us10.trial.applicationstudio.cloud.sap/odata/v4/zbtp-srvsample/BOSSet?$filter=Salesdocument eq '${sQuotation}'&$top=100`;
                            const sServiceUrl = `/odata/v4/zbtp-srvsample/BOSSet?$filter=Salesdocument eq '${sQuotation}'&$top=100`;
                            sap.ui.require(["sap/ui/thirdparty/jquery", "sap/m/MessageBox"], (jQuery, MessageBox) => {
                                jQuery.ajax({
                                    url: sServiceUrl,
                                    method: "GET",
                                    success: (oServiceData) => {
                                        if (oServiceData.value && oServiceData.value.length > 0) {
                                            console.log("oServiceData", oServiceData.value);

                                            const aMatchingServices = oServiceData.value.filter(service => aPckgNos.includes(service.PckgNo));
                                            console.log("aMatchingServices", aMatchingServices);


                                            if (aMatchingServices.length === 0) {
                                                oTable.bindRows({ path: "" });

                                                this.getView().getModel("viewModel").setProperty("/tableBusy", false);
                                                MessageBox.warning("No matching services found for the selected package.");
                                                return;
                                            }

                                            const oServiceModel = new JSONModel(aMatchingServices);
                                            this.getView().setModel(oServiceModel, "serviceModel");
                                            oTable.bindRows({
                                                path: "serviceModel>/"
                                            });
                                            const displayservicemodel = this.getView().getModel("serviceModel");
                                            console.log("serviceModel", displayservicemodel);


                                            oTable.attachRowSelectionChange(this.onRowSelectionChange.bind(this));
                                            this.getView().getModel("viewModel").setProperty("/tableBusy", false);
                                        } else {
                                            oTable.bindRows({ path: "" });

                                            this.getView().getModel("viewModel").setProperty("/tableBusy", false);
                                            MessageBox.warning("No services found for the selected quotation.");
                                        }
                                    },
                                    error: (oError) => {
                                        MessageBox.error("Failed to load service data: " + (oError.responseText || oError.message));
                                    }
                                });
                            })
                        } else {
                            oTable.bindRows({ path: "" });
                            this.getView().getModel("viewModel").setProperty("/tableBusy", false);
                            MessageBox.warning("No conditions found for the selected quotation.");

                        }
                    },
                    error: (oError) => {
                        MessageBox.error("Failed to load condition data: " + (oError.responseText || oError.message));
                    }
                });
            });
        },

        onSendToERP: async function () {
            try {
                // 1. Get OData V4 model
                const oModel = this.getView().getModel("ZBTP_POST_QUOT_SRVSampleService");

                // 2. Prepare dynamic payload
                const oViewModel = this.getView().getModel("viewModel").getData();
                const oServiceModel = this.getView().getModel("serviceModel");
                const aServices = oServiceModel ? oServiceModel.getData() : [];

                if (!aServices.length) {
                    sap.m.MessageBox.error("No service data available to send to ERP.");
                    return;
                }

                const payload = {
                    Salesdocument: oViewModel.quotationNumber,
                    headertoitem: []
                };

                const item = {
                    Salesdocument: oViewModel.quotationNumber,
                    ItmNumber: oViewModel.itemNumber,
                    Material: oViewModel.selectedService.Material,
                    PckgNo: oViewModel.selectedService.PckgNo,
                    LineNo: oViewModel.selectedService.LineNo,
                    SubpckgNo: oViewModel.selectedService.SubpckgNo || "",
                    Quantity: oViewModel.selectedService.Quantity || "",
                    GrPrice: oViewModel.selectedService.GrPrice || ""
                };

                payload.headertoitem.push(item);

                // 3. Create a fresh binding with a unique batch group
                const sBatchGroupId = "sendToERPGroup_" + Date.now(); // Unique batch group for each call
                const oBinding = oModel.bindList("/headerSet", null, null, null, { $$groupId: sBatchGroupId });

                // 4. Create the entity
                const oCreatedContext = await oBinding.create(payload);
                console.log("Create operation initiated for payload:", payload);

                // 5. Submit the batch and wait for completion
                await oModel.submitBatch(sBatchGroupId).then(() => {
                    console.log("Batch submitted successfully for group:", sBatchGroupId);
                }, (oError) => {
                    throw new Error("Batch submission failed: " + oError.message);
                });

                sap.m.MessageBox.success("Sent to ERP successfully!");
            } catch (error) {
                sap.m.MessageBox.error("Failed: " + error.message);
                console.error("ERP Submit Error:", error);
            }
        }

       
    });
});