function Register({
  form,
  handleChange,
  handleAuth,
  onSwitch,
  message,
}) {
  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Create Account</h2>

        <p className="subtitle">
          Create your BookMyStay account
        </p>

<form onSubmit={(e) => handleAuth(e, "register")}>          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Register
          </button>
        </form>

        <button
          className="switch-btn"
          onClick={onSwitch}
        >
          Already have an account? Login
        </button>

        {message && (
          <p className="message">{message}</p>
        )}
      </div>
    </section>
  );
}

export default Register;