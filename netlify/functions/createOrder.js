export const handler = async (event) => {
  try {
    const parsedBody = JSON.parse(event.body);
    console.log("Parsed Body:", parsedBody); // Add this line for debugging

    const { products } = parsedBody;
    const token = event.headers.authorization || "";

    const response = await fetch("http://3.109.32.83:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(parsedBody),
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
