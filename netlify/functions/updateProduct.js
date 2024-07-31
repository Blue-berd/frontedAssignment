
export const handler = async (event) => {
  const { id } = event.queryStringParameters;
  const { name, description, price, stockQuantity } = JSON.parse(event.body);
  const token = event.headers.authorization || "";

  try {
    const response = await fetch(`http://3.109.32.83:3000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ name, description, price, stockQuantity }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Failed to update product" }),
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
