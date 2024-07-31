export const handler = async (event) => {
  const id = event.path.split("/").pop();

  try {
    const response = await fetch(`http://3.109.32.83:3000/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Failed to fetch product" }),
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
