const OrdersList = ({ orders = {} }) => {
  console.log("orders------>", orders);

  // Check if orders data is present and if it's a valid object
  if (!orders || !orders._id) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-medium text-gray-600">
          No orders available.
        </p>
      </div>
    );
  }

  // Extract order details from the orders object
  const { _id, products, totalAmount, paymentStatus, orderDate } = orders;

  return (
    <div className="space-y-6">
      <div className="border rounded-lg shadow-md p-6 bg-white">
        <h3 className="text-xl font-semibold mb-4">Order ID: {_id}</h3>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <div className="flex items-center">
                <img
                  src={product.productId.image[0]}
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
                  <p className="text-gray-700">Quantity: {product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-semibold">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <p className="text-gray-600">Payment Status: {paymentStatus}</p>
          <p className="text-gray-600">
            Order Date: {new Date(orderDate).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
