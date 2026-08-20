function Login({
  form,
  handleChange,
  handleAuth,
  onSwitch,
  message,
}) {
  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to BookMyStay
        </p>

        <form onSubmit={(e) => handleAuth(e, "login")}>
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
            Login
          </button>
        </form>

        <button
          className="switch-btn"
          onClick={onSwitch}
        >
          Don't have an account? Register
        </button>

        {message && (
          <p className="message">{message}</p>
        )}
      </div>
    </section>
  );
}

export default Login;