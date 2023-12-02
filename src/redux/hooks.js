import { useSelector } from "react-redux";
import { selectBulkList, selectInvoiceList } from "./invoicesSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);
  const bulkList = useSelector(selectBulkList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    bulkList,
    getOneInvoice,
    listSize,
  };
};
