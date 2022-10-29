import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.name}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { pid } = params; //www.localhost:300.com/productId

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  // converts the json object into a js object
  const data = JSON.parse(jsonData);
  // console.log(data);

  const product = data.products.find((product) => product.id === pid);

  return {
    props: {
      loadedProduct: product,
    },
  };
};

//getStaticpath is required to tell nextjs which concrete instances of this
//dynamic page should be pre-generated

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { pid: "1" } }],
    // fallback: true,
    fallback: "blocking",
  };
};

export default ProductDetailPage;
