// project imports
import MainLayout from 'layout/MainLayout';
import AnalyseReview from 'views/services/analyseReview';
import CompareProducts from 'views/services/compareProducts';
import CompareAmazonFlipkart from 'views/services/compareAmazonFlipkart';
import AboutPage from 'views/About';
import HomePage from 'views/Home/HomePage';
import GuidePage from 'views/About/Guide';
import { Navigate } from 'react-router';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'home',
            element: <HomePage />
        },
        {
            path: '/',
            children: [
                {
                    path: 'analyseReview',
                    element: <AnalyseReview />
                },
                {
                    path: 'compareProducts',
                    element: <CompareProducts />
                },
                {
                    path: 'amazonFlipkartComparison',
                    element: <CompareAmazonFlipkart />
                }
            ]
        },
        {
            path: 'about',
            element: <AboutPage />
        },
        {
            path: 'guide',
            element: <GuidePage />
        },
        {
            path: '*',
            element: <Navigate to="/home" />
        }
    ]
};

export default MainRoutes;
