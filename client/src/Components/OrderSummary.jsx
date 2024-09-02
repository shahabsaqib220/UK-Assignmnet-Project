import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const orderDetails = useSelector((state) => state.orderDetails);

  return (
    <div>
      <h2>Order Summary</h2>
      <p>
        <strong>Name:</strong> {orderDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {orderDetails.email}
      </p>
      <p>
        <strong>Phone:</strong> {orderDetails.phone}
      </p>
      <p>
        <strong>Paper Type:</strong> {orderDetails.paperType}
      </p>
      <p>
        <strong>Academic Level:</strong> {orderDetails.academicLevel}
      </p>
      <p>
        <strong>Word Count:</strong> {orderDetails.wordCount}
      </p>
      <p>
        <strong>Deadline:</strong> {orderDetails.deadline}
      </p>
      <p>
        <strong>File:</strong>{" "}
        {orderDetails.file ? orderDetails.file.name : "No File"}
      </p>
    </div>
  );
};

export default OrderSummary;
