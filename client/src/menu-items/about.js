// assets
import { IconBrandChrome, IconHelp, IconInfoCircle } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconInfoCircle };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const about = {
    id: 'about-roadmap',
    type: 'group',
    children: [
        {
            id: 'guide-page',
            title: 'Guide',
            type: 'item',
            url: '/guide',
            icon: icons.IconHelp,
            breadcrumbs: false
        },
        {
            id: 'about-page',
            title: 'About',
            type: 'item',
            url: '/about',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        }
    ]
};

export default about;
