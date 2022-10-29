const UserProfilePage = ({ user }) => {
  return <h1>{user}</h1>;
};

export default UserProfilePage;

export const getServerSideProps = (context) => {
  const { params, req, res } = context;

  return {
    props: {
      user: "Rawwr",
    },
  };
};
