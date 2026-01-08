'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(email, password);

    if (success) {
      router.push('/Student/student_dashboard'); // ✅ Next.js navigation
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
