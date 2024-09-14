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
            <form action="/login" method="post" onSubmit={handleLogin}>
            <h2>Please Enter Password</h2>
            <div className="enter">
                    <input
                    type="password"
                    ref={ref}
                    onChange={(e) => addPassword()}
                    placeholder="Enter password" />
            </div>
            <div>
                <button>Log In</button>
                </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
                </section>
    );
}