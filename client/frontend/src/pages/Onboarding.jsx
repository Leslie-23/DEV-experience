import { useState } from "react";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Set Reminder Time</h2>
          <input type="time" />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2: Set Difficulty Level</h2>
          <select>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 3: Set Programming Language</h2>
          <select>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Onboarding Complete!</h2>
          <button onClick={redirectToDashboard}>Go to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
