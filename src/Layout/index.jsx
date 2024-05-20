import { Outlet } from 'react-router';
import Footer from '.././components/Footer'
import { StickyNavbar } from '.././components/Navbar'
import PropTypes from 'prop-types';

const Layout = () => {
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