import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { products } = JSON.parse(event.body);
    const token = event.headers.authorization || "";

    const response = await fetch("http://3.109.32.83:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Order creation failed" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};
