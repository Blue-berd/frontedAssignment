import CryptoJS from "crypto-js";

const paymentHandler = async (order) => {
  const encodedParams = new URLSearchParams();
  const testKey = "L3s8iR";
  const merchantSalt = "W8EwWT8CEDYO2QGDgE0dd6CoLPJc2ESx";

  const txnid = "txnid" + Date.now();
  const hashString = `${testKey}|${txnid}|${order.quantity * 10.0}|${
    order.productName
  }|John|john@example.com|${order.productId}|||||||${merchantSalt}`;
  const hash = CryptoJS.SHA512(hashString).toString();

  encodedParams.set("key", testKey);
  encodedParams.set("amount", (order.quantity * 10.0).toFixed(2));
  encodedParams.set("txnid", txnid);
  encodedParams.set("firstname", "John");
  encodedParams.set("email", "john@example.com");
  encodedParams.set("phone", "1234567890");
  encodedParams.set("productinfo", order.productName);
  encodedParams.set("surl", "https://cbjs.payu.in/sdk/success");
  encodedParams.set("furl", "https://cbjs.payu.in/sdk/failure");
  encodedParams.set("hash", hash);
  encodedParams.set("udf1", order.productId);
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
    console.log(data);
    // Handle the response as needed
  } catch (error) {
    console.error("Error:", error);
  }
}; 

export default paymentHandler;
