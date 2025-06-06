import SessionProvider from './context/SessionProvider';
import  { ProfileProvider }  from './context/ProfileProvider';
import   FavoritesProvider   from './context/FavoritesProvider';
import './global.css';
import Routing from './routes/Routing';


function App() {

  return (
    <SessionProvider>
      <ProfileProvider>
        <FavoritesProvider>
        <Routing />
        </FavoritesProvider>
      </ProfileProvider>
    </SessionProvider>
  )
}

export default App
