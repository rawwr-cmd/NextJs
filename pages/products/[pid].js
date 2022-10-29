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

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  // converts the json object into a js object
  const data = JSON.parse(jsonData);
  // console.log(data);

  return data;
};

const getStaticProps = async (context) => {
  const { params } = context;
  const { pid } = params; //www.localhost:300.com/productId

  const data = await getData();

  const product = data.products.find((product) => product.id === pid);

  if (!product) {
    return {
      notFound: true, //404
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

//getStaticpath is required to tell nextjs which concrete instances of this
//dynamic page should be pre-generated

const getStaticPaths = async () => {
  const data = await getData();
  //   console.log(data);
  //   The map() method creates a new array populated with the results of
  //   calling a provided function on every element in the calling array.
  const ids = data.products.map((product) => product.id); //['1', '2', '3']
  //   console.log(ids);
  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));
  //   console.log(pathWithParams);

  return {
    paths: pathWithParams,
    // fallback: true,
    // fallback: "blocking",
    fallback: true,
  };
};

export { getStaticProps, getStaticPaths };

export default ProductDetailPage;
