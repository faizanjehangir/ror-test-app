import { useState, useEffect, useMemo } from 'react';

const useSession = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/current_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
          },
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const memoizedUser = useMemo(() => user, [user]);

  return { user: memoizedUser, setUser };
};

export default useSession;
