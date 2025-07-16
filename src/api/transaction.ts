import { InvoiceGenT } from "@/types/transactionGen.type";
import { apiClient, ApiResponse } from ".";
import { format } from "date-fns";

export const getAllTransaction = async (ownerId: number) => {
  try {
    const response: ApiResponse<InvoiceGenT[]> = await apiClient(
      "/transaction/getAll",
      {
        method: "POST",
        body: JSON.stringify({ user_id: ownerId }),
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const downloadInvoice = async ({
  ownerId,
  invoiceId,
}: {
  ownerId: number;
  invoiceId: number;
}) => {
  const response = await apiClient(
    "/setting/template/generate",
    {
      method: "POST",
      body: JSON.stringify({ user_id: ownerId, invoice_id: invoiceId }),
    },
    true,
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to download invoice");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${invoiceId}-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
  return true;
};

export const addSale = (data: any) =>
  apiClient("/transaction/sale/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
