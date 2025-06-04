import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabase/supabase-client';
import SessionContext from './SessionContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { session } = useContext(SessionContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error) setProfile(data);
      else console.error(error);
    };

    getProfile();
  }, [session]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
