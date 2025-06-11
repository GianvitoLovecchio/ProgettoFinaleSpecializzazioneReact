import HomePage_index from '../pages/homepage/HomePage_index';
import GenrePage_index from '../pages/genrepage/GenrePage_index';
import GamePage_index from '../pages/gamepage/GamePage_index';
import SearchPage_index from '../pages/searchpage/SearchPage_index';
import Register_index from '../pages/register/Register_index';
import Login_index from '../pages/login/Login_index';
import Error_page from '../pages/error/Error_page'; 
import AccountPage_index from '../pages/account/AccountPage_index';
import FavoritesPage_index from '../pages/favorites/FavoritesPage_index';
import PlatformPage_index from '../pages/platformpage/PlatformPage_index';
import DevPage_index from '../pages/devpage/DevPage_index';
import TagPage_index from '../pages/tagpage/TagPage_index';
import Layout from '../layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage_index />} />
                    <Route path="*" element={<Error_page />} />
                    <Route path="/games/:genre" element={<GenrePage_index />} />
                    <Route path="/games/:slug/:id" element={<GamePage_index />} />
                    <Route path="/search/" element={<SearchPage_index />} />
                    <Route path="/register" element={<Register_index />}></Route>
                    <Route path="/login" element={<Login_index />}></Route>
                    <Route path="/account" element={<AccountPage_index />}/>
                    <Route path="/favorites" element={<FavoritesPage_index />}/>
                    <Route path="/platform/:id" element={<PlatformPage_index />}/>
                    <Route path="/developer/:idDev/:nameDev" element={<DevPage_index />}/>
                    <Route path='/tag/:tagName' element={<TagPage_index />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}