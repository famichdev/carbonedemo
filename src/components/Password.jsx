import { useRef } from 'react';

useRef;
export default function Password({
  password,
  setPassword,
  correctPassword,
  setIsLoggedIn,
  error,
  setError,
}) {
  const ref = useRef();

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsLoggedIn(true);
      setError(''); // Clear any previous errors
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const addPassword = () => {
    setPassword(ref.current.value);
  };

  return (

    <section className="welcome">
            <h2>Please enter password</h2>

      <div className="enter">
        <input
          type="password"
          ref={ref}
          onChange={(e) => addPassword()}
          placeholder="Enter password"
        />
      </div>
      <div>
        <button onClick={handleLogin}>LOG IN</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}
