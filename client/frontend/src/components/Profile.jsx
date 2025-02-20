import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Languages,
  LogOut,
  Edit,
  Trash,
} from "lucide-react";

const Profile = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${API_URL}/api/user/view/${userId}`);
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone || "",
        });
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `${API_URL}/api/user/update/${userId}`,
        formData
      );
      setUser(response.data.user);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      )
    )
      return;
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`${API_URL}/api/user/delete/${userId}`);
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (err) {
      setError("Failed to delete account.");
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userId");
    alert("Logged out successfully.");
    window.location.href = "/login";
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {/* Profile Picture Placeholder */}
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold uppercase">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-500 mt-4">{user.name}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
            <User className="text-green-500" size={20} />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            ) : (
              <div>
                <h3 className="text-gray-700 font-semibold">Full Name</h3>
                <p className="text-gray-600">{user.name}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
            <Mail className="text-green-500" size={20} />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            ) : (
              <div>
                <h3 className="text-gray-700 font-semibold">Email</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
            <Phone className="text-green-500" size={20} />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md w-full"
                placeholder="Enter phone number"
              />
            ) : (
              <div>
                <h3 className="text-gray-700 font-semibold">Phone</h3>
                <p className="text-gray-600">{user.phone || "Not provided"}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
            <Languages className="text-green-500" size={20} />
            <div>
              <h3 className="text-gray-700 font-semibold">Languages</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.languages.length > 0 ? (
                  user.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No languages selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between">
            {isEditing ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400 transition"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} /> Edit Profile
              </button>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-800 transition"
            onClick={handleDelete}
          >
            <Trash size={16} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   User,
//   Mail,
//   Phone,
//   Languages,
//   LogOut,
//   Edit,
//   Trash,
// } from "lucide-react";

// const Profile = () => {
//   const API_URL = import.meta.env.VITE_BASE_URL;
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const response = await axios.get(`${API_URL}/api/user/view/${userId}`);
//         setUser(response.data.user);
//         setFormData({
//           name: response.data.user.name,
//           email: response.data.user.email,
//           phone: response.data.user.phone || "",
//         });
//       } catch (err) {
//         setError("Failed to load user details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       const response = await axios.put(
//         `${API_URL}/api/user/update/${userId}`,
//         formData
//       );
//       setUser(response.data.user);
//       setIsEditing(false);
//     } catch (err) {
//       setError("Failed to update profile.");
//     }
//   };

//   const handleDelete = async () => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete your account? This action cannot be undone!"
//       )
//     )
//       return;
//     try {
//       const userId = localStorage.getItem("userId");
//       await axios.delete(`${API_URL}/api/user/delete/${userId}`);
//       localStorage.removeItem("userId");
//       window.location.href = "/";
//     } catch (err) {
//       setError("Failed to delete account.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     localStorage.removeItem("userId");
//     alert("Logged out successfully.");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700 px-6">
//       <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
//         <div className="flex flex-col items-center">
//           <div className="bg-green-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold uppercase">
//             {user.name.charAt(0)}
//           </div>
//           <h2 className="text-2xl font-bold text-gray-500 mt-4">{user.name}</h2>
//           <p className="text-gray-300">{user.email}</p>
//         </div>

//         <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
//           {isEditing ? (
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition w-full sm:w-auto"
//               onClick={handleUpdate}
//             >
//               Save Changes
//             </button>
//           ) : (
//             <button
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400 transition w-full sm:w-auto"
//               onClick={() => setIsEditing(true)}
//             >
//               <Edit size={16} /> Edit Profile
//             </button>
//           )}
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition w-full sm:w-auto"
//             onClick={handleLogout}
//           >
//             <LogOut size={16} /> Logout
//           </button>
//           <button
//             className="bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-800 transition w-full sm:w-auto"
//             onClick={handleDelete}
//           >
//             <Trash size={16} /> Delete Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
