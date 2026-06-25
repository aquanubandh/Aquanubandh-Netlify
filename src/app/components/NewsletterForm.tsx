"use client";

import React, { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing! We will notify you when the blog is launched.");
    setEmail("");
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="signup-input"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="signup-btn">Notify Me</button>
    </form>
  );
}
