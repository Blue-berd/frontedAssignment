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
  encodedParams.set(
    "surl",
    "https://test-payment-middleware.payu.in/simulatorResponse"
  );
  encodedParams.set(
    "furl",
    "https://test-payment-middleware.payu.in/simulatorResponse"
  );
  encodedParams.set("hash", hash);

  // Add udf1-5 if necessary
  encodedParams.set("udf1", "udf1");
  encodedParams.set("udf2", "udf2");
  encodedParams.set("udf3", "udf3");
  encodedParams.set("udf4", "udf4");
  encodedParams.set("udf5", "udf5");

  // Redirect to PayU with the form data
  const form = document.createElement('form');
  form.action = "https://test.payu.in/merchant/_payment";
  form.method = "POST";
  for (const [key, value] of encodedParams.entries()) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
};

export default paymentHandler;
