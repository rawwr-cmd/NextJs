const userIdPage = (props) => {
  return <h1>{props.id}</h1>;
};

export default userIdPage; //export default is required to export the component

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { uid } = params;

  console.log("server side code");
  return {
    props: {
      id: "userId-" + uid,
    },
  };
};
