import { useRouter } from "next/router";
const SelectedClientPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Selected Client Page</h1>
    </div>
  );
};

export default SelectedClientPage;
