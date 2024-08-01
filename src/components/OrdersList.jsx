import React from "react";

const OrdersList = ({ orders = [] }) => {
  console.log("orders------>", orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-medium text-gray-600">
          No orders available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg shadow-md p-6 bg-white">
          <h3 className="text-xl font-semibold mb-4">Order ID: {order._id}</h3>
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product.productId._id}
                className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center">
                  <img
                    src={product.productId.image[0]} // Assuming image is an array
                    alt={product.productId.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">
                      Product Name: {product.productId.name}
                    </h4>
                    <p className="text-gray-700">
                      Price: ${product.productId.price.toFixed(2)}
                    </p>
                    <p className="text-gray-700">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-lg font-semibold">
              Total Amount: ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Payment Status: {order.paymentStatus}
            </p>
            <p className="text-gray-600">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
