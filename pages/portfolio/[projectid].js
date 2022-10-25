//getting the dynamic segmenet of value from the url

import { useRouter } from "next/router";

const PortFolioPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  return (
    <div>
      <h1>The Portfolio Page</h1>
    </div>
  );
};

export default PortFolioPage;
