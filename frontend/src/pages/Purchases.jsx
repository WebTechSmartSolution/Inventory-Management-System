import React, { useState } from "react";
import PurchaseTable from "../components/tables/PurchaseTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetPurchases, UpdatePruchase } from "../services/Api";
import { Dialog } from "primereact/dialog";
import { FormColumn, FormRow } from "../components/layoutComponent";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { Button } from "primereact/button";
import CDatePicker from "../components/FormComponents/CDatePicker";
import { notify } from "../utils/notification";

const Purchases = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { data: purchases, refetch: refetchPurchases } = useQuery({
    queryKey: ["purchases"],
    queryFn: GetPurchases,
  });
  const method = useForm({
    defaultValues: {
      purchaseId: null,
      remainingAmount: 0,
      givenAmount: 0,
      updatedDate: null,
    },
  });
  const editPurchaseMutation = useMutation({
    mutationFn: UpdatePruchase,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        setVisible(false);
        method.reset();
        refetchPurchases();
      }
    },
  });
  const onSubmit = (data) => {
    if (method.getValues("remainingAmount") < data.givenAmount) {
      notify(
        "error",
        "remaining amount is " + method.getValues("remainingAmount")
      );
    } else {
      editPurchaseMutation.mutate({
        purchaseId: method.getValues("purchaseId"),
        updatedDate: data.updatedDate,
        givenAmount: parseInt(data.givenAmount),
      });
    }
  };
  const handleEdit = (data) => {
    // navigate(`newpurchase?id=${data.purchaseID}`)
    // Custom view logic here
    console.log(data);
    method.setValue("purchaseId", data.purchaseID);
    method.setValue("remainingAmount", data.remainingAmount);
    setVisible(true);
  };
  return (
    <>
      <div className="purchasepage">
        <div className="page_top">
          <h2>Purchases</h2>
          <button className="btn" onClick={() => navigate(ROUTES.NEWPURCHASE)}>
            New Purchases
          </button>
        </div>
        <div className="all_purchases">
          <PurchaseTable data={purchases} handleEdit={handleEdit} />
        </div>
      </div>
      <Dialog
        header={"Update Amount"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="remainingAmount"
                label="Total Payable"
                isEnable={false}
                type="number"
                placeholder="Enter purchase name"
              />
            </FormColumn>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="givenAmount"
                required={true}
                label="Given Amount"
                isEnable={true}
                type="number"
                placeholder="Enter purchase name"
              />
            </FormColumn>
            <FormColumn sm={12} md={12} lg={12} xl={12}>
              <CDatePicker
                control={method.control}
                name="updatedDate"
                required={true}
                isEnable={true}
                placeholder="Enter paying date"
                label="Pay Date"
              />
            </FormColumn>
            <FormColumn>
              <Button label="Pay" type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Purchases;
