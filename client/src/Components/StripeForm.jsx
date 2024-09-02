import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OrderInfo from "./OrderInstructions";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";
import Topbar from "./TopBar";
import { storage } from "../config/firebase"; // Import Firebase storage functions
import { ref, uploadBytes, getDownloadURL } from "../config/firebase";

import { useTable } from 'react-table';

const bankDetails = [
  { field: 'Bank Name', detail: 'Barclays Bank' },
  { field: 'Account Name', detail: 'Mr Z Ali' },
  { field: 'Sort Code', detail: '20-78-58' },
  { field: 'Account Number', detail: '33887294' },
];

const columns = [
  {
    Header: 'Field',
    accessor: 'field',
  },
  {
    Header: 'Detail',
    accessor: 'detail',
  },
];

const StripeForm = () => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: bankDetails });
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // State for data loading
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState(null); // New state for payment receipt

  useEffect(() => {
    const totalAmount = orderDetails.wordCount * 0.05;
    setAmount(totalAmount);
    setDataLoading(false); // Set data loading to false once data is loaded
  }, [orderDetails.wordCount]);

  const uploadFileToFirebase = async (file) => {
    const storageRef = ref(storage, `files/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file to Firebase:", error);
      throw new Error("File upload failed");
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
  
    if (!paymentReceipt) {
      Swal.fire("No Payment Receipt", "Please upload the payment receipt.", "error");
      return;
    }
  
    // Confirm the selected payment receipt with SweetAlert2
    const result = await Swal.fire({
      title: "Confirm Payment Receipt",
      text: "Are you sure that you selected the correct payment receipt?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
  
    try {
      // Upload payment receipt to Firebase
      const paymentReceiptUrl = await uploadFileToFirebase(paymentReceipt);
  
      // Upload other files to Firebase Storage and get URLs
      const fileUploads = [];
      if (orderDetails.problemFile)
        fileUploads.push(uploadFileToFirebase(orderDetails.problemFile));
      if (orderDetails.requirementFile)
        fileUploads.push(uploadFileToFirebase(orderDetails.requirementFile));
      if (orderDetails.descriptionFile)
        fileUploads.push(uploadFileToFirebase(orderDetails.descriptionFile));
  
      const fileUrls = await Promise.all(fileUploads);
  
      const formData = {
        name: orderDetails.name,
        email: orderDetails.email,
        phone: orderDetails.phone,
        academicLevel: orderDetails.academicLevel,
        deadline: orderDetails.deadline,
        wordCount: orderDetails.wordCount,
        paperType: orderDetails.paperType,
        problemFileUrl: fileUrls[0] || "",
        requirementFileUrl: fileUrls[1] || "",
        descriptionFileUrl: fileUrls[2] || "",
        paymentReceiptUrl, // Include the payment receipt URL in the payload
      };
  
      const orderResponse = await fetch("https://uk-assignmnet-project.vercel.app/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!orderResponse.ok) {
        Swal.fire("Network Error", "There was a problem connecting to the server.", "error");
        setLoading(false);
        return;
      }
  
      const orderData = await orderResponse.json();
  
      // Treat pending payment approval as a successful order creation
      if (orderData.success || orderData.message === "Order created successfully and is pending payment approval") {
        Swal.fire("Order Created!", "Your order has been successfully created and is pending payment approval.", "success");
        setButtonDisabled(true);
      } else {
        Swal.fire("Order Failed", orderData.message || "There was an issue creating your order.", "error");
      }
    } catch (error) {
      console.error("Error during order creation:", error);
      Swal.fire("Order Failed", "There was a problem creating your order.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setPaymentReceipt(null); // Clear the selected file
  };

  return (
    <>
      <Ribbon />
      <TawkChat />
      <Topbar />
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Details</h2>
        <div className="overflow-x-auto">
          {dataLoading ? (
            <Skeleton count={7} height={40} />
          ) : (
            <table className="min-w-full bg-gray-200 border border-gray-300">
              <tbody>
                {/* Display order details as before */}
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2 font-bold">Name:</td>
                  <td className="border px-4 py-2">{orderDetails.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Email:</td>
                  <td className="border px-4 py-2">{orderDetails.email}</td>
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2 font-bold">Phone:</td>
                  <td className="border px-4 py-2">{orderDetails.phone}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Paper Type:</td>
                  <td className="border px-4 py-2">{orderDetails.paperType}</td>
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2 font-bold">Academic Level:</td>
                  <td className="border px-4 py-2">{orderDetails.academicLevel}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">No Of Words:</td>
                  <td className="border px-4 py-2">{orderDetails.wordCount}</td>
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2 font-bold">Deadline:</td>
                  <td className="border px-4 py-2">{orderDetails.deadline}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">File 1:</td>
                  <td className="border px-4 py-2">
                    {orderDetails.problemFile?.name || "No file uploaded"}
                  </td>
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2 font-bold">File 2:</td>
                  <td className="border px-4 py-2">
                    {orderDetails.requirementFile?.name || "No file uploaded"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">File 3:</td>
                  <td className="border px-4 py-2">
                    {orderDetails.descriptionFile?.name || "No file uploaded"}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <p className="font-semibold text-red-600">
          "Review your order details before proceeding with payment."
        </p>
        <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Bank Details</h2>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-gray-100 font-black font-bold border border-gray-300 rounded-lg shadow-lg">
       
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border px-4 py-2">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    <h1 className="text-black mt-6 font-bold">Instructions of Payment</h1>
      <p className="font-semibold text-red-600">
          "Please ensure that you make the payment for the correct amount to the bank account details provided above. If there are any discrepancies or issues with the payment, please contact us immediately to rectify the situation. Your prompt attention to this matter is greatly appreciated to ensure smooth processing of your transaction. Upon successful or declined payment, you will receive an email notification regarding payment."
        </p>
        <p className="font-semibold text-red-600 mt-5">Please upload a Payment Receipt.</p>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold font-moseo">
            Total Amount: £{amount.toFixed(2)}
          </h3>
        </div>
        <form onSubmit={handlePayment} className="mt-4 text-center">
          {/* File input for payment receipt */}
          <div className="relative max-w-md mx-auto">
          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        Swal.fire("Invalid File Type", "Please upload an image file (jpg, jpeg, png, gif).", "error");
        e.target.value = ""; // Reset the input value
      } else {
        setPaymentReceipt(file);
      }
    }
  }}
  className="border p-2 mb-4 w-full file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
/>
           
            <button
              type="button"
              onClick={handleClearFile}
              className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Clear File
            </button>
            
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
            disabled={loading || buttonDisabled}
          >
            {loading ? <ClipLoader size={24} color={"#fff"} /> : "Submit Payment Receipt"}
          </button>
        </form>
        <OrderInfo />
      </div>
      <Footer />
    </>
  );
};

export default StripeForm;
