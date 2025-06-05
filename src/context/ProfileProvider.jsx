import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabase/supabase-client';
import SessionContext from './SessionContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { session } = useContext(SessionContext);
  const [profile, setProfile] = useState(null);
  const [avatarImgUrl, setAvatarImgUrl] = useState(null);// stato che conterrà l'url dell immagine

  useEffect(() => {
    const getProfile = async () => {
      // controlla che ci siano dati di sesssione, ovvero che l'utente sia loggato
      if (!session?.user) {
        return;
      }

      // tramite Supabase vengono scaricati tutti i dati del profilo
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error("errore nel recuper del file", error);
      } else {
        setProfile(data);
      }
      // tramite Supabase viene scaricata l'immagine da avatars
      if (data.avatar_url) {
        const { data: imageData, error: imageError } = await supabase
          .storage
          .from('avatars')
          .download(data.avatar_url);

        //se non c'è errore e è presente l'immagine, setta l'url
        if (!imageError && imageData) {
          const url = URL.createObjectURL(imageData);
          setAvatarImgUrl(url);
          // altrimenti stampa l'errore
        } else {
          console.error("Errore nel download dell'immagine:", imageError?.message);
        }
      }
    };

    if(session) getProfile();
  }, [session]);

  return (
    //ogni componente che utilizza il provider ProfileContext, avrà accesso a questi stati
    <ProfileContext.Provider value={{ profile, setProfile, avatarImgUrl, setAvatarImgUrl }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

