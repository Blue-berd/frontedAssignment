import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { email, password, role = "user", phone } = JSON.parse(event.body);

    const response = await fetch("http://3.109.32.83:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role, phone }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Registration failed" }),
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
