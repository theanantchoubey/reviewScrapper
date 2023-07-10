// assets
import { IconShoppingCart, IconCompass, IconReportSearch } from '@tabler/icons';

// constant
const icons = { IconShoppingCart, IconCompass, IconReportSearch };

// ==============================|| SERVICES MENU ITEMS ||============================== //

const services = {
    id: 'services',
    title: 'Our Services',
    type: 'group',
    children: [
        {
            id: 'analyseReview',
            title: 'Analyse Review',
            type: 'item',
            url: '/analyseReview',
            icon: icons.IconCompass,
            breadcrumbs: false
        },
        {
            id: 'compareProducts',
            title: 'Compare Products',
            type: 'item',
            url: '/compareProducts',
            icon: icons.IconReportSearch,
            breadcrumbs: false
        },
        {
            id: 'amazonFlipkartComparison',
            title: 'Compare Amazon & Flipkart',
            type: 'item',
            url: '/amazonFlipkartComparison',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        }
    ]
};

export default services;
