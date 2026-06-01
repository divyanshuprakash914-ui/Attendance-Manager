import { useState } from "react";
import { API_URL } from "../../lib/api";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendLoginLink = async () => {
    if (!email.trim()) {
      alert("Enter your email");
      return;
    }

    setIsSending(true);

    try {
      console.log("Sending email login request:", email);

      const res = await fetch(`${API_URL}/auth/email/request-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await res.json();

      console.log("Backend response:", data);

      if (!res.ok) {
        alert(data.detail || "Something went wrong");
        return;
      }

      alert("Login link sent. Check your email.");
    } catch (error) {
      console.error("Email login error:", error);
      alert("Failed to send login link");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-login-shell">
      <form
        className="login-form email-login-form"
        onSubmit={(event) => {
          event.preventDefault();
          sendLoginLink();
        }}
      >
        <label className="login-input-shell">
          <span className="sr-only">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <button type="submit" className="login-continue-button" disabled={isSending}>
          {isSending ? "Sending link..." : "Continue with Email"}
        </button>
      </form>
    </div>
  );
}
