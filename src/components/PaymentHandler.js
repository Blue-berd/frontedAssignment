import CryptoJS from "crypto-js";

const paymentHandler = async (orderData, cartTotal, shipping, tax) => {
  console.log("payment handler order data", orderData);
  const encodedParams = new URLSearchParams();
  const testKey = "L3s8iR";
  const merchantSalt = "W8EwWT8CEDYO2QGDgE0dd6CoLPJc2ESx";

  const txnid = "txnid" + Date.now();

  // Calculate totalAmount using cartTotal, shipping, and tax
  const totalAmount = (cartTotal + shipping + tax).toFixed(2);

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
  encodedParams.set("surl", "https://ecom-task3-claw.netlify.app/checkout");
  encodedParams.set("furl", "https://ecom-task3-claw.netlify.app/cart");
  encodedParams.set("hash", hash);

  // Add udf1-5 if necessary
  encodedParams.set("udf1", "udf1");
  encodedParams.set("udf2", "udf2");
  encodedParams.set("udf3", "udf3");
  encodedParams.set("udf4", "udf4");
  encodedParams.set("udf5", "udf5");

  const url = "https://test.payu.in/merchant/_payment";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodedParams,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("payment handler payment data", data);

    // Simulate checking if payment was successful
    // Implement actual logic based on PayU response data
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
