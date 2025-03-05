import { Link } from "react-router-dom";

interface IError {
  error: string;
  navigate?: string;
  navigateMsg?: string;
}
function Error({ error, navigate, navigateMsg }: IError) {
  return (
    <div className=" text-center flex flex-col justify-center items-center m-auto h-full">
      <p className="text-red-500">{error}</p>
      {navigate && navigateMsg && (
        <Link to={navigate} reloadDocument>
          {navigateMsg}
        </Link>
      )}
    </div>
  );
}

export default Error;
