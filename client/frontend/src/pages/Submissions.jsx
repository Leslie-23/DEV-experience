import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { EditorView, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import { keymap, drawSelection } from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/commands";
import { foldGutter, foldKeymap } from "@codemirror/language";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { defaultKeymap } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { Plus, MessageSquare, Brain } from "lucide-react";

const API_URL = import.meta.env.VITE_BASE_URL;
const Submissions = () => {
  const [userId, setUserId] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [code, setCode] = useState("// Write your JavaScript here...");
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/snippets`);
      setSnippets(res.data);
      console.log(res.data.user);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!code.trim() || !userId) return;
    try {
      const response = await axios.post(API_URL, {
        user: userId, // Send as string, backend should convert it properly
        code,
        language: "javascript", // Ensure language field is sent if required
      });

      // Update the UI immediately instead of waiting for fetchSnippets()
      setSnippets((prev) => [...prev, response.data]);

      setCode(""); // Clear editor after submission
    } catch (error) {
      console.error("Error submitting code:", error.response?.data || error);
    }
  };

  const getAISuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/ai-suggestions`, {
        code,
      });
      setAiSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (snippetId, text) => {
    setCommentInputs((prev) => ({ ...prev, [snippetId]: text }));
  };

  const addComment = async (snippetId) => {
    if (!commentInputs[snippetId]?.trim() || !userId) return;

    try {
      await axios.post(`${API_URL}/${snippetId}/comments`, {
        user: userId,
        text: commentInputs[snippetId],
      });

      setSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet._id === snippetId
            ? {
                ...snippet,
                comments: [
                  ...snippet.comments,
                  {
                    user: { _id: userId, username: "You" },
                    text: commentInputs[snippetId],
                  },
                ],
              }
            : snippet
        )
      );

      setCommentInputs((prev) => ({ ...prev, [snippetId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };

  const toggleComments = (snippetId) => {
    setShowComments((prevState) => {
      return { ...prevState, [snippetId]: !prevState[snippetId] };
    });
  };

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    const updateListener = EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.docChanged) {
        const newCode = viewUpdate.state.doc.toString();
        setCode(newCode);
      }
    });

    const state = EditorState.create({
      doc: code, // Use initial state
      extensions: [
        lineNumbers(),
        foldGutter(),
        drawSelection(),
        highlightActiveLine(),
        syntaxHighlighting(defaultHighlightStyle),
        autocompletion(),
        history(),
        javascript({ typescript: true }),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
        ]),
        oneDark,
        updateListener, // Add listener to sync state
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      viewRef.current.destroy();
      viewRef.current = null;
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-500 to-green-700">
      <div className="p-6 max-w-6xl mx-auto min-h-screen ">
        <h1 className="text-3xl font-bold text-white mb-6">Code Review</h1>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Code Editor & AI Suggestions */}
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg ">
              <h2 className="text-md font-semibold mb-2">Write Your Code</h2>
              <div ref={editorRef} className="h-64"></div>
              <button
                onClick={handleSubmit}
                className="w-full mt-3 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              >
                Submit Code
              </button>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Brain className="mr-2" size={20} /> AI Suggestions
              </h2>
              {loading ? (
                <p className="text-gray-500">Analyzing code...</p>
              ) : aiSuggestions ? (
                <ul className="space-y-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="bg-gray-100 p-3 rounded-md">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Click below to get AI feedback.</p>
              )}
              <button
                onClick={getAISuggestions}
                className="w-full mt-3 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
              >
                {/* <Brain className="mr-2" size={20} /> */}
                {loading ? "Analyzing..." : "Get AI Suggestions"}
              </button>
            </div>
          </div>

          {/* Right Column: Snippets & Comments */}
          <div className="space-y-6">
            {snippets.map((snippet) => (
              <div
                key={snippet._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-sm font-semibold">
                  {snippet.user && snippet.user.username
                    ? snippet.user.username
                    : `Post by: ${snippet.user?._id}` || "User"}
                </h2>
                <pre className="bg-gray-900 text-white p-3 rounded-md">
                  {snippet.code}
                </pre>

                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    value={commentInputs[snippet._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(snippet._id, e.target.value)
                    }
                    placeholder="Write a comment..."
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={() => addComment(snippet._id)}
                    className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-gray-50 shadow-md"
                  >
                    {" "}
                    <Plus size={18} />
                    {/* Post */}
                  </button>
                  <button
                    onClick={() => toggleComments(snippet._id)}
                    className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 flex items-center"
                  >
                    <MessageSquare size={16} className="mr-1" />
                    {/* Comments */}
                  </button>
                </div>

                {/* Comments Section (Only show if toggled on) */}
                {showComments[snippet._id] && (
                  <div className="mt-3">
                    <h3 className="text-md font-semibold text-gray-800">
                      Comments
                    </h3>
                    {snippet.comments.length === 0 ? (
                      <p className="text-gray-500 text-sm">No comments yet.</p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {snippet.comments.map((c) => (
                          <li
                            key={c._id}
                            className="bg-gray-100 p-3 rounded-md"
                          >
                            <strong>{c.user?.username || "User"}:</strong>{" "}
                            {c.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;

// stable build to fall back on in case of a err.
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { EditorView, lineNumbers, highlightActiveLine } from "@codemirror/view";
// import { EditorState } from "@codemirror/state";
// import { javascript } from "@codemirror/lang-javascript";
// import {
//   syntaxHighlighting,
//   defaultHighlightStyle,
// } from "@codemirror/language";
// import { keymap, drawSelection } from "@codemirror/view";
// import { history, historyKeymap } from "@codemirror/commands";
// import { foldGutter, foldKeymap } from "@codemirror/language";
// import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
// import { defaultKeymap } from "@codemirror/commands";
// import { oneDark } from "@codemirror/theme-one-dark";
// import { Plus, MessageSquare, Brain } from "lucide-react";

// const API_URL = "http://localhost:5000/api/snippets";
// const AI_API_URL = "http://localhost:5000/api/ai-suggestions";

// const Submissions = () => {
//   const [userId, setUserId] = useState(null);
//   const [snippets, setSnippets] = useState([]);
//   const [code, setCode] = useState("// Write your JavaScript here...");
//   const [commentInputs, setCommentInputs] = useState({});
//   const [showComments, setShowComments] = useState({});
//   const [aiSuggestions, setAiSuggestions] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const editorRef = useRef(null);
//   const viewRef = useRef(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) setUserId(storedUserId);
//   }, []);

//   useEffect(() => {
//     fetchSnippets();
//   }, []);

//   const fetchSnippets = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setSnippets(res.data);
//     } catch (error) {
//       console.error("Error fetching snippets:", error);
//     }
//     setLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!code.trim() || !userId) return;
//     try {
//       await axios.post(API_URL, { user: userId, code });
//       setCode("");
//       fetchSnippets();
//     } catch (error) {
//       console.error("Error submitting code:", error);
//     }
//   };

//   const getAISuggestions = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(AI_API_URL, { code });
//       setAiSuggestions(response.data.suggestions);
//     } catch (error) {
//       console.error("Error fetching AI suggestions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCommentChange = (snippetId, text) => {
//     setCommentInputs((prev) => ({ ...prev, [snippetId]: text }));
//   };

//   const addComment = async (snippetId) => {
//     if (!commentInputs[snippetId]?.trim() || !userId) return;

//     try {
//       await axios.post(`${API_URL}/${snippetId}/comments`, {
//         user: userId,
//         text: commentInputs[snippetId],
//       });

//       setSnippets((prevSnippets) =>
//         prevSnippets.map((snippet) =>
//           snippet._id === snippetId
//             ? {
//                 ...snippet,
//                 comments: [
//                   ...snippet.comments,
//                   { user: { _id: userId, username: "You" }, text: commentInputs[snippetId] },
//                 ],
//               }
//             : snippet
//         )
//       );

//       setCommentInputs((prev) => ({ ...prev, [snippetId]: "" }));
//     } catch (error) {
//       console.error("Error adding comment:", error.response?.data || error);
//     }
//   };

//   const toggleComments = (snippetId) => {
//     setShowComments((prev) => ({
//       ...prev,
//       [snippetId]: !prev[snippetId],
//     }));
//   };

//   useEffect(() => {
//     if (!editorRef.current || viewRef.current) return;

//     const state = EditorState.create({
//       doc: code,
//       extensions: [
//         lineNumbers(),
//         foldGutter(),
//         drawSelection(),
//         highlightActiveLine(),
//         syntaxHighlighting(defaultHighlightStyle),
//         autocompletion(),
//         history(),
//         javascript({ typescript: true }),
//         keymap.of([
//           ...defaultKeymap,
//           ...historyKeymap,
//           ...foldKeymap,
//           ...completionKeymap,
//         ]),
//         oneDark,
//       ],
//     });

//     viewRef.current = new EditorView({
//       state,
//       parent: editorRef.current,
//     });

//     return () => {
//       viewRef.current.destroy();
//       viewRef.current = null;
//     };
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-black mb-6">Code Review</h1>

//       {/* Responsive Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column: Code Editor & AI Suggestions */}
//         <div className="space-y-6">
//           <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-2">Write Your Code</h2>
//             <div ref={editorRef} className="h-64"></div>
//             <button
//               onClick={handleSubmit}
//               className="w-full mt-3 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
//             >
//               Submit Code
//             </button>
//           </div>

//           {/* AI Suggestions */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <Brain className="mr-2" size={20} /> AI Suggestions
//             </h2>
//             {loading ? (
//               <p className="text-gray-500">Analyzing code...</p>
//             ) : aiSuggestions ? (
//               <ul className="space-y-2">
//                 {aiSuggestions.map((suggestion, index) => (
//                   <li key={index} className="bg-gray-100 p-3 rounded-md">
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">Click below to get AI feedback.</p>
//             )}
//             <button
//               onClick={getAISuggestions}
//               className="w-full mt-3 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
//             >
//               {loading ? "Analyzing..." : "Get AI Suggestions"}
//             </button>
//           </div>
//         </div>

//         {/* Right Column: Snippets & Comments */}
//         <div className="space-y-6">
//           {snippets.map((snippet) => (
//             <div key={snippet._id} className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold">{snippet.user?.username || "Unknown User"}</h2>
//               <pre className="bg-gray-900 text-white p-3 rounded-md">{snippet.code}</pre>

//               <div className="flex space-x-2 mt-2">
//                 <input
//                   type="text"
//                   value={commentInputs[snippet._id] || ""}
//                   onChange={(e) => handleCommentChange(snippet._id, e.target.value)}
//                   placeholder="Write a comment..."
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//                 <button onClick={() => addComment(snippet._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                   Post
//                 </button>
//                 <button onClick={() => toggleComments(snippet._id)} className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 flex items-center">
//                   <MessageSquare size={16} className="mr-1" /> Comments
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Submissions;
