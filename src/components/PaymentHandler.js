import CryptoJS from "crypto-js";

const paymentHandler = async (orderData, cartTotal) => {
  console.log("payment handler order data", orderData);

  const encodedParams = new URLSearchParams();
  const testKey = "L3s8iR";
  const merchantSalt = "W8EwWT8CEDYO2QGDgE0dd6CoLPJc2ESx";

  const txnid = "txnid" + Date.now();
  
  // Calculate totalAmount using cartTotal
  const totalAmount = cartTotal.orderTotal.toFixed(2);

  // Join product names correctly
  const productName = orderData.map((p) => p.productId.name).join(", ");

  const hashString = `${testKey}|${txnid}|${totalAmount}|${productName}|John|john@example.com|||||||${merchantSalt}`;
  const hash = CryptoJS.SHA512(hashString).toString();

  encodedParams.set("key", testKey);
  encodedParams.set("amount", totalAmount);
  encodedParams.set("txnid", txnid);
  encodedParams.set("firstname", "John");
  encodedParams.set("email", "john@example.com");
  encodedParams.set("phone", "1234567890");
  encodedParams.set("productinfo", productName);
  encodedParams.set("surl", "https://test-payment-middleware.payu.in/simulatorResponse");
  encodedParams.set("furl", "https://test-payment-middleware.payu.in/simulatorResponse");
  encodedParams.set("pg", "cc");
  encodedParams.set("bankcode", "cc");
  encodedParams.set("ccnum", "5123456789012346"); // Replace with actual card number
  encodedParams.set("ccexpmon", "05"); // Replace with actual expiry month
  encodedParams.set("ccexpyr", "2024"); // Replace with actual expiry year
  encodedParams.set("ccvv", "123"); // Replace with actual CVV
  encodedParams.set("ccname", "John Doe"); // Replace with actual cardholder name
  encodedParams.set("hash", hash);

  const url = 'https://test.payu.in/merchant/_payment';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodedParams
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("payment handler payment data", data);

    if (data.status === "success") {
      return { success: true, data: data.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
};

export default paymentHandler;
