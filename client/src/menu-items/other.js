// assets
import { IconBrandChrome, IconHelp, IconHome } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconHome };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'home-page',
            title: 'Home',
            type: 'item',
            url: '/home',
            icon: icons.IconHome,
            breadcrumbs: false
        }
    ]
};

export default other;
