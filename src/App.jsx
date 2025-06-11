import SessionProvider from './context/SessionProvider';
import  { ProfileProvider }  from './context/ProfileProvider';
import   FavoritesProvider   from './context/FavoritesProvider';
import GlobalProvider from './context/GlobalProvider';
import './global.css';
import Routing from './routes/Routing';


function App() {

  return (
    <SessionProvider>
      <ProfileProvider>
        <FavoritesProvider>
          <GlobalProvider>
        <Routing />
          </GlobalProvider>
        </FavoritesProvider>
      </ProfileProvider>
    </SessionProvider>
  )
}

export default App
