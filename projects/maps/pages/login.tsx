import { signIn } from 'next-auth/client';

export default function Login() {
  const handleLogin = async () => {
    await signIn();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}
