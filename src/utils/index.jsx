import axios from "axios";

// Determine the base URL based on the environment
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8888/.netlify/functions" // Local development URL
    : "/.netlify/functions"; // Production URL

export const customFetch = axios.create({
  baseURL: baseURL,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
export const getToken = () => {
  return localStorage.getItem("authToken");
};
