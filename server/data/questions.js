const mcqQuestions = [
  {
    question:
      "What is the output of `console.log(typeof null);` in JavaScript?",
    options: ["null", "object", "undefined", "number"],
    correctAnswer: "object",
    difficulty: "Easy",
  },
  {
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["String", "Number", "Boolean", "Object"],
    correctAnswer: "Object",
    difficulty: "Easy",
  },
  {
    question: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "toString()",
      "JSON.encode()",
    ],
    correctAnswer: "JSON.stringify()",
    difficulty: "Easy",
  },
  {
    question:
      "Which operator is used to check both value and type equality in JavaScript?",
    options: ["==", "===", "!=", "!=="],
    correctAnswer: "===",
    difficulty: "Easy",
  },
  {
    question: "What does the `map()` function return in JavaScript?",
    options: ["A modified array", "The same array", "A boolean", "An object"],
    correctAnswer: "A modified array",
    difficulty: "Easy",
  },
  {
    question:
      "Which keyword is used to declare a variable in JavaScript that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
    difficulty: "Easy",
  },
  {
    question: "What will `console.log(2 + '2' - 1);` output?",
    options: ["21", "3", "NaN", "22"],
    correctAnswer: "21",
    difficulty: "Medium",
  },
  {
    question: "Which function removes the last element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "pop()",
    difficulty: "Easy",
  },
  {
    question: "Which statement is used to exit a loop in JavaScript?",
    options: ["break", "stop", "return", "continue"],
    correctAnswer: "break",
    difficulty: "Easy",
  },
  {
    question:
      "Which built-in object in JavaScript allows you to work with dates and times?",
    options: ["Date", "Time", "Clock", "Moment"],
    correctAnswer: "Date",
    difficulty: "Easy",
  },
  {
    question: "What is the result of `typeof NaN` in JavaScript?",
    options: ["number", "NaN", "undefined", "string"],
    correctAnswer: "number",
    difficulty: "Medium",
  },
  {
    question: "Which JavaScript function is used to delay execution?",
    options: ["setTimeout()", "setInterval()", "setDelay()", "delay()"],
    correctAnswer: "setTimeout()",
    difficulty: "Easy",
  },
  {
    question:
      "Which of the following methods removes the first element from an array?",
    options: ["pop()", "shift()", "splice()", "unshift()"],
    correctAnswer: "shift()",
    difficulty: "Easy",
  },
  {
    question: "What does `Promise.all([])` do?",
    options: [
      "Waits for all promises to resolve or one to reject",
      "Runs promises one by one",
      "Rejects all promises immediately",
      "Executes promises in parallel but ignores results",
    ],
    correctAnswer: "Waits for all promises to resolve or one to reject",
    difficulty: "Medium",
  },
  {
    question: "What does the `bind()` method do in JavaScript?",
    options: [
      "Binds a function to an object",
      "Executes a function immediately",
      "Creates a new function with a different return value",
      "Merges two objects",
    ],
    correctAnswer: "Binds a function to an object",
    difficulty: "Medium",
  },
  {
    question: "Which method is used to merge two or more arrays?",
    options: ["concat()", "push()", "merge()", "join()"],
    correctAnswer: "concat()",
    difficulty: "Easy",
  },
  {
    question: "Which keyword is used to define an asynchronous function?",
    options: ["async", "await", "promise", "setTimeout"],
    correctAnswer: "async",
    difficulty: "Easy",
  },
  {
    question: "What is the difference between `null` and `undefined`?",
    options: [
      "null is an object, undefined is a type",
      "They are the same",
      "undefined means variable is declared but not assigned",
      "null is for missing objects, undefined is for missing variables",
    ],
    correctAnswer:
      "null is for missing objects, undefined is for missing variables",
    difficulty: "Medium",
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    options: ["for", "while", "do-while", "forEach"],
    correctAnswer: "do-while",
    difficulty: "Easy",
  },
  {
    question: "Which method checks if an array includes a specific value?",
    options: ["contains()", "includes()", "hasValue()", "search()"],
    correctAnswer: "includes()",
    difficulty: "Easy",
  },
  {
    question: "What is the purpose of `localStorage` in JavaScript?",
    options: [
      "To store data that persists across sessions",
      "To store temporary data",
      "To handle cookies",
      "To cache files",
    ],
    correctAnswer: "To store data that persists across sessions",
    difficulty: "Medium",
  },
  {
    question:
      "Which function is used to execute a function repeatedly at intervals?",
    options: [
      "setTimeout()",
      "setInterval()",
      "requestAnimationFrame()",
      "loop()",
    ],
    correctAnswer: "setInterval()",
    difficulty: "Easy",
  },
  {
    question: "Which method converts an array into a string?",
    options: ["toString()", "join()", "concat()", "split()"],
    correctAnswer: "join()",
    difficulty: "Easy",
  },
  {
    question: "What does `Object.freeze()` do?",
    options: [
      "Prevents modifications to an object",
      "Deletes an object",
      "Creates a deep copy of an object",
      "Locks the object in memory",
    ],
    correctAnswer: "Prevents modifications to an object",
    difficulty: "Medium",
  },
  {
    question: "Which symbol is used to destructure arrays?",
    options: ["{}", "[]", "()", "<>"],
    correctAnswer: "[]",
    difficulty: "Easy",
  },
  {
    question: "What will `console.log(0.1 + 0.2 === 0.3);` output?",
    options: ["true", "false", "undefined", "NaN"],
    correctAnswer: "false",
    difficulty: "Hard",
  },
  {
    question: "Which of these is NOT a falsy value in JavaScript?",
    options: ["0", "false", "{}", "null"],
    correctAnswer: "{}",
    difficulty: "Medium",
  },
  {
    question: "What does `reduce()` do in JavaScript?",
    options: [
      "Reduces an array to a single value",
      "Removes duplicate values",
      "Filters an array",
      "Sorts an array",
    ],
    correctAnswer: "Reduces an array to a single value",
    difficulty: "Medium",
  },
  {
    question: "Which method is used to find an item in an array?",
    options: ["map()", "filter()", "find()", "includes()"],
    correctAnswer: "find()",
    difficulty: "Easy",
  },
];
