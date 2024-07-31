
export const handler = async (event) => {
  try {
    const { productId, quantity } = JSON.parse(event.body);
    const token = event.headers.authorization || "";
    const response = await fetch("http://3.109.32.83:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Failed to add product to cart" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};
