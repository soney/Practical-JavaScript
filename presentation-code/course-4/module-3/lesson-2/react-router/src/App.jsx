import React from "react";
import Navbar from './Navbar';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';
import { BrowserRouter, Link, Route, Routes, useParams, Outlet } from 'react-router';

function Layout() {
  return <div>
    <nav>
      <Link to="/">Home</Link> |&nbsp;
      <Link to="/about">About</Link> |&nbsp;
      <Link to="/posts/123">Post 123</Link>
    </nav>
    <Outlet />
  </div>
}

function Post() {
  const {postId} = useParams();
  return <div>
    <h1>Post {postId}</h1>
  </div>;
}

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}