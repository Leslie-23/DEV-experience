import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <h1 className="text-7xl font-extrabold text-green-500 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-green-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-white text-center max-w-md mb-6">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-white bg-gray-500 rounded-lg shadow-lg hover:bg-white hover:text-green-500 "
        // className="transition-transform transform hover:scale-105"
      >
        Go Home
      </button>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 m-2 bg-gray-500 text-white p-2 rounded-md hover:bg-white hover:text-green-500 "
      >
        Go Back (previous page)
      </button>
    </div>
  );
};

export default NotFound;
