import { useRef } from "react";

useRef
export default function Password({ password, setPassword, correctPassword, setIsLoggedIn, error, setError }) {
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
     }
    
    return ( 
      <section className="welcome">
<<<<<<< HEAD
            <h2>Please Enter Password</h2>
=======
            <h2>Please enter password</h2>
>>>>>>> cb22098 (Safe Version)
            <div className="enter">
                    <input
                    type="password"
                    ref={ref}
                    onChange={(e) => addPassword()}
                    placeholder="Enter password" />
            </div>
            <div>
<<<<<<< HEAD
                <button onClick={handleLogin}>Log In</button>
=======
                <button onClick={handleLogin}>LOG IN</button>
>>>>>>> cb22098 (Safe Version)
                </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
    );
}