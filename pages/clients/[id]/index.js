import { useRouter } from "next/router";

const ClientId = () => {
  const router = useRouter();
  console.log(router.query);

  const loadProjectHandler = () => {
    // load data...
    router.push({
      pathname: "/clients/[id]/[selectedclientid]",
      query: { id: "rawwr1", selectedclientid: "projecta" },
    });
  };
  return (
    <div>
      <h1>The Client ID Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientId;
