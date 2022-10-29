import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SwrPage = ({ serversidesales }) => {
  const [sales, setSales] = useState(serversidesales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  //   console.log(data);

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          // username: data[key].username,
          // volume: data[key].volume,
          ...data[key],
        });
      }
      console.log(transformedSales);
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     // Send http request...
  //     setIsLoading(true);
  //     fetch(
  //       "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             // username: data[key].username,
  //             // volume: data[key].volume,
  //             ...data[key],
  //           });
  //         }
  //         console.log(transformedSales);

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

// fetch(
//       "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/sales.json"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const transformedSales = [];
//         for (const key in data) {
//           transformedSales.push({
//             id: key,
//             // username: data[key].username,
//             // volume: data[key].volume,
//             ...data[key],
//           });
//         }
//         console.log(transformedSales);

export const getStaticProps = async () => {
  const response = await fetch(
    "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      // username: data[key].username,
      // volume: data[key].volume,
      ...data[key],
    });
  }
  console.log(transformedSales);
  return {
    props: {
      serversidesales: transformedSales,
    },
  };
};

export default SwrPage;
