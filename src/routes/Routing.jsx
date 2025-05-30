import HomePage_index from '../pages/homepage/HomePage_index';
import GenrePage_index from '../pages/genrepage/GenrePage_index';
import GamePage_index from '../pages/gamepage/GamePage_index';
import SearchPage_index from '../pages/searchpage/SearchPage_index';
import Layout from '../layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage_index />} />
                    {/* <Route path="*" element={<ErrorPage />} /> */}
                    <Route path="/games/:genre" element={<GenrePage_index />} />
                    <Route path="/games/:slug/:id" element={<GamePage_index />} />
                    <Route path="/search" element={<SearchPage_index />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}