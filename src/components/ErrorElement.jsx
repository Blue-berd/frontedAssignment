import { useRouteError } from "react-router-dom";

const ErrorElement = ({ message }) => {
  const error = useRouteError();
  console.log(error);

  return (
    <h4 className="font-bold text-4xl">{message || "There was an error..."}</h4>
  );
};
export default ErrorElement;
