import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
import { Link } from 'react-router';

const NotFound = () => (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>
        <h1>404 - Page Not Found</h1>
        <p style={{ color: '#a0a0b0', marginBottom: '2rem' }}>We can't find the page you're looking for.</p>
        <Link to="/" style={{ padding: '10px 20px', background: '#6366f1', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Go Home
        </Link>
    </div>
);


const RouteError = () => (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>
        <h1>Something went wrong loading this page.</h1>
        <button 
            onClick={() => window.location.href = '/'} 
            style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '1rem' }}
        >
            Reload Application
        </button>
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        errorElement: <RouteError />
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <RouteError />
    },
    {
        path:'/',
        element: <Protected> <Home /> </Protected>,
        errorElement: <RouteError />
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>,
        errorElement: <RouteError />
    },
    {
        path: '*',                            // 404 Catch-All Undefined Routes
        element: <NotFound />
    }
])