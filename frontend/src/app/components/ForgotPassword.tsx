// ForgotPasswordPopup.tsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

interface ForgotPasswordPopupProps {
  onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle forgot password submission here
    console.log("Forgot password submitted with email:", email);
    // Close the popup
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-zinc-200 p-6 rounded-lg shadow-md h-80 w-80">
          <h2 className="text-xl font-semibold mb-4">Forgot Password?</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              type="email"
              value={email}
              onChange={handleChange}
              required
              fullWidth
              id="forgot-password-email"
              label="Enter Your Email"
            />
            <div className="flex flex-col justify-end mt-4">
              <button
                type="button"
                className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                onClick={onClose}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
