import { Outlet, useLocation } from 'react-router';
import Footer from '.././components/Footer'
import { StickyNavbar } from '.././components/Navbar'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Layout = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])
    
    return (
        <>
            <>
                <StickyNavbar />
                {<Outlet/>}
                <Footer />
            </>
        </>
    )
}
Layout.propTypes = {
    children: PropTypes.node // Specify children prop type
};

export default Layout