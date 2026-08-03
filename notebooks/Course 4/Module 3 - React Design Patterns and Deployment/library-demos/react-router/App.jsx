// The single page application from the "Single Page Applications (SPAs) with
// React Router" video, restaged to run with no build step. To watch it run,
// right-click index.html in this folder and choose "Show Preview", then click
// the nav links and watch the URL change without a page reload.
//
// In the video, each page component lived in its own file (HomePage.jsx,
// AboutPage.jsx, NotFoundPage.jsx, with Layout and Post inside App.jsx) and a
// bundler wired the imports together. The in-browser compiler used here can
// only load one JSX file per page, so all of the components share this file,
// with a comment marking where each one came from.

// #region globals
// React Router is loaded by index.html as a browser global
// (window.ReactRouterDOM) from a script tag. In the video's project, a
// bundler loaded the library instead, and this line was an import:
//
//     import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';
//
// There is no build step here, so we destructure the pieces off the global.
// The packaged copy is version 5 of the library, which spells two of those
// names differently: Switch instead of Routes, and (for reasons the reading
// covers) this page uses HashRouter in place of BrowserRouter.
const { HashRouter, Switch, Route, Link, useParams } = ReactRouterDOM;
// #endregion

// #region page-components
// One component per screen. In the video these were the separate files
// HomePage.jsx, AboutPage.jsx, and NotFoundPage.jsx. (There, each one also
// set the browser tab title by rendering a <title> element -- the element
// hoisting we met earlier. Hoisting needs React 19, and the packaged React
// here is version 18, so these copies leave those lines out.)
function HomePage() {
  return <div>
    <h1>Home Page</h1>
    <p>Welcome to my site!</p>
  </div>;
}

function AboutPage() {
  return <div>
    <h1>About Page</h1>
    <p>This is the "about" page</p>
  </div>;
}

function NotFoundPage() {
  return <div>
    <h1>Page Not Found</h1>
    <p>Sorry, we could not find that page</p>
  </div>;
}
// #endregion

// #region post-page
// In the video, Post was defined inside App.jsx, next to Layout.
function Post() {
  const { postId } = useParams();

  return <div>
    <h1>Post {postId}</h1>
  </div>;
}
// #endregion

// #region layout
// The pieces every screen shares. In the video, Layout rendered an
// <Outlet /> element to mark where the matched page should appear; version 5
// has no Outlet, so here Layout wraps the routes and props.children is that
// hole instead.
function Layout(props) {
  return <div>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/posts/123">Post 123</Link>
    </nav>
    {props.children}
  </div>;
}
// #endregion

// #region app-component
function App() {
  return <HashRouter>
    <Layout>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route path="/about"><AboutPage /></Route>
        <Route path="/posts/:postId"><Post /></Route>
        <Route path="*"><NotFoundPage /></Route>
      </Switch>
    </Layout>
  </HashRouter>;
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);
// #endregion
