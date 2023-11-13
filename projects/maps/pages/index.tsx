import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn, signOut } from 'next-auth/client';

type Url = {
  id: number;
  name: string;
  url: string;
};

type User = {
  name: string;
  email: string;
};

type HomeProps = {
  user: User;
  urls: Url[];
};

export default function Home({ user, urls }: HomeProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [submittedUrls, setSubmittedUrls] = useState(urls);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, url }),
    });

    if (response.ok) {
      const newUrl = await response.json();
      setSubmittedUrls([...submittedUrls, newUrl]);
      setName('');
      setUrl('');
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {submittedUrls.map((submittedUrl) => (
          <li key={submittedUrl.id}>
            <a href={submittedUrl.url}>{submittedUrl.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const response = await fetch('/api/urls');
  const urls = await response.json();

  return {
    props: {
      user: session.user,
      urls,
    },
  };
}
