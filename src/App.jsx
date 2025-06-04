import SessionProvider from './context/SessionProvider';
import { ProfileProvider } from './context/ProfileProvider';
import './global.css';
import Routing from './routes/Routing';


function App() {

  return (
    <SessionProvider>
      <ProfileProvider>
        <Routing />
      </ProfileProvider>
    </SessionProvider>
  )
}

export default App
