import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ActionsBtns from "../ActionsBtns";
const PrintingDate = [
  {
    id: 1,
    productName: "Product1",
    category: "cat1",
    productSize: "12 x 12",
    supplierName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    PrintingDate: "12-Dec-2024",
    invoiceNo: 12,
    supplierContact: "03017518822",
    status: "printed",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t ert er  ert ",
  },
  {
    id: 2,
    productName: "Product2",
    category: "cat2",
    productSize: "12 x 12",
    supplierName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    PrintingDate: "12-Dec-2024",
    invoiceNo: 12,
    supplierContact: "03017518822",
    status: "processing",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t",
  },
];
export default function PrintingTable() {
  const [printing, setPrinting] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    supplierName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [statuses] = useState(["processing", "printed"]);

  const getSeverity = (status) => {
    switch (status) {
      case "processing":
        return "info";

      case "printed":
        return "success";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    // CustomerService.getCustomersMedium().then((data) => {
    //     setCustomers(getCustomers(data));
    //     setLoading(false);
    // });
    // setSales(getCustomers(salesDate))
    setPrinting(PrintingDate);
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const handleEdit = (data) => {
    console.log("Edit clicked for:", data);
    // Custom edit logic here
  };

  const handleDelete = (data) => {
    console.log("Delete clicked for:", data);
    // Custom delete logic here
  };

  const handleView = (data) => {
    console.log("View clicked for:", data);
    // Custom view logic here
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <ActionsBtns
        rowData={rowData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    );
  };
  const header = renderHeader();
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <div className="card">
      <DataTable
        value={printing}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "invoiceNo",
          "productName",
          "category",
          "supplierName",
        ]}
        header={header}
        emptyMessage="No printing found."
      >
        <Column header="#" body={snoBodyTemplate} />
        <Column header="Action" body={actionBodyTemplate} />
        <Column
          field="productName"
          header="Product Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="productSize"
          header=" Size"
          style={{ minWidth: "11rem" }}
        />
       
        <Column
          field="productQuantity"
          header="Quantity"
          style={{ minWidth: "11rem" }}
        />
       
        <Column
          field="PrintingDate"
          header="Printing Date"
          style={{ minWidth: "11rem" }}
        />
       
        <Column field="Note" header="Note" style={{ minWidth: "14rem" }} />
        <Column
          field="status"
          header="Status"
          showFilterMenu={false}
          filterMenuStyle={{ width: "6rem" }}
          style={{ minWidth: "6rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusRowFilterTemplate}
        />
      </DataTable>
    </div>
  );
}