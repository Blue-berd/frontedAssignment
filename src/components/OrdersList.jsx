const OrdersList = ({ orders = {} }) => {
  console.log("orders------>", orders);
  if (orders._id === null) {
    return <p>No orders available.</p>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <div key={orders._id} className="order-item">
          <div>
            {orders.products.map((product) => (
              <div key={product._id} className="product-item border p-4 mb-4">
                <h4 className="font-medium">
                  Product Name: {product.productId.name}
                </h4>
                <img
                  src={product.productId.image[0]} // Assuming image is an array
                  alt={product.productId.name}
                  className="w-24 h-24 object-cover"
                />
                <p>Price: ${product.productId.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
          </div>
          <p>Total Amount: ${orders.totalAmount.toFixed(2)}</p>
          <p>Payment Status: {orders.paymentStatus}</p>
          <p>Order Date: {new Date(orders.orderDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
