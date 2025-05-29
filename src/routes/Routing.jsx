import HomePage from '../pages/HomePage';
import Layout from '../layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="*" element={<ErrorPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>

    );
}