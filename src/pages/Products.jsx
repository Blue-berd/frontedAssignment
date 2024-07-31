import { PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";

const allProductsQuery = () => {
  return {
    queryKey: ["products"],
    queryFn: () => customFetch(url),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const response = await queryClient.ensureQueryData(allProductsQuery());
    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta };
  };

const Products = () => {
  return (
    <>
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
