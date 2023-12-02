import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { BiArrowBack, BiSolidPencil, BiTrash } from "react-icons/bi";

import { useNavigate, Link } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { editBulkInvoice } from "../redux/invoicesSlice";


const InvoiceList = () => {
  const { invoiceList, bulkList, } = useInvoiceListData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bulkData, setBulkData] = useState(bulkList);
  useEffect(() => {
    if(bulkList.length===0) {
      alert("No rows selected for bulk edit.")
      navigate('/');
    }
  })
  const handleSave = (event) => {
    const validate = () => {
      let flag = true;
      const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      bulkData.forEach((invoice) => {
          if(!emailPattern.test(invoice.billFromEmail) && !emailPattern.test(invoice.billToEmail)){
            flag = false;
          }
      })
      return flag;
    }
    if(!validate()) {
      alert('email invalid');
      return;
    }
    dispatch(editBulkInvoice(bulkData));
    alert("Bulk edit successfull 🥳");
    navigate('/')

  }
  return (
    <Row>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>
      <Col className="mx-auto" >
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Bulk Edit</h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">

          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>

              <div className="d-flex gap-2">
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th >Invoice No.</th>
                  <th>
                    <tr className="d-flex pd-7"
                    >Bill From
                    </tr>
                    <tr className="d-flex justify-content-around">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                    </tr>
                  </th>
                  <th>
                    <tr className="d-flex pd-7"> Bill To
                    </tr>
                    <tr className="d-flex justify-content-around">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                    </tr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bulkData?.map((invoice) => (
                  <InvoiceRow
                    key={invoice.id}
                    invoice={invoice}
                    navigate={navigate}
                    setBulkData={setBulkData}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const InvoiceRow = ({ invoice, navigate, setBulkData }) => {

  const [currentInvoice, setCurrentInvoice] = useState({
    id: invoice.id,
    billTo: invoice.billTo,
    billFrom: invoice.billFrom,
    billToAddress: invoice.billToAddress,
    billFrom: invoice.billFrom,
    billFromEmail: invoice.billFromAddress,
    billFromAddress: invoice.billFromAddress,
    dateOfIssue: invoice.dateOfIssue,
    items: invoice.items
  });

  const handleDelete = () => {
    setBulkData((row) =>{
      return row.filter((invoice) => invoice.id!==currentInvoice.id)
    })
  }

  const editFeild = (key) => {
    return  (
      <input type='text' key={key} value={currentInvoice[key]}
      style={{border: 'none',boxShadow: '1px 1px 0.5px'}} onChange={(event) => {
        setCurrentInvoice(prev => {
          return {...prev, [key]: event.target.value}
        })
        setBulkData((row) => {
          return row.map((invoice) => {
            if(invoice.id===currentInvoice.id) return currentInvoice;
            return invoice;
          })
        })
      }}/>
    )
  }
  return (
    <tr>
      <td>{invoice.invoiceNumber}</td>
      <td className="fw-normal">
        <tr>
          <td>{editFeild('billTo')}</td>
          <td>{editFeild('billToEmail')}</td>
          <td>{editFeild('billToAddress')}</td>
        </tr>
      </td>
      <td className="fw-normal">
        <tr>
          <td>{editFeild('billFrom')}</td>
          <td>{editFeild('billFromEmail')}</td>
          <td>{editFeild('billFromAddress')}</td>
        </tr>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="danger" onClick={handleDelete}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default InvoiceList;
