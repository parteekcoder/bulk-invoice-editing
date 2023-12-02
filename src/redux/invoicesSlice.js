import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    bulkEdit: [],
  },
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      return state;
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload.updatedInvoice;
      }
    },
    addBulkInvoice: (state, action) => {
      state.bulkEdit = action.payload
    },
    editBulkInvoice: (state, action) => {
      state.invoices = state.invoices.map((invoice) => {
        const row = action.payload.filter((row) => row.id===invoice.id);
        console.log(row);
        if(row.length===0) return invoice;
        return {...invoice,...row[0]};
      })
      return state;
    }
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  addBulkInvoice,
  editBulkInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices.invoices;
export const selectBulkList = (state) => state.invoices.bulkEdit;


export default invoicesSlice.reducer;
