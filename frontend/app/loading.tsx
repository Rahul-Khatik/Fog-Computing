import { Roller } from "react-css-spinners";

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Roller
          className="animate-spin"
          size={150}
          color="rgba(0,136,202,0.75)"
        />
      </div>
    </>
  );
};

export default Loading;
