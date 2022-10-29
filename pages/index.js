import path from "path";
import fs from "fs/promises";
import styles from "../styles/Home.module.css";

const Home = (props) => {
  const { products } = props;
  return (
    <div className={styles.container}>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async (context) => {
  console.log("re-generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  // converts the json object into a js object
  const data = JSON.parse(jsonData);
  // console.log(data);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default Home;

//readsync reads the file and block the execution until its done
