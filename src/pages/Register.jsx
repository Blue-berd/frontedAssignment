import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    console.log({
      ...data,
      role: "user",
    });

    // Convert data to JSON string
    const response = await customFetch.post(
      "/auth/register",
      JSON.stringify({
        ...data,
        role: "user",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double-check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="tel" label="phone" name="phone" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
