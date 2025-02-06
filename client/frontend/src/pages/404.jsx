import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-indigo-600 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
      >
        Go Home
      </button>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 m-2 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
      >
        Go Back (previous page)
      </button>
    </div>
  );
};

export default NotFound;
