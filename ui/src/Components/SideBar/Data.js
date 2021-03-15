import React from 'react';

import * as AI from 'react-icons/ai';
import * as IO from 'react-icons/io';


export const Data = [
    {
        pageName: 'Dashboard',
        route: '/dashboard',
        icon: <AI.AiFillDashboard />
    },
    {
        pageName: 'Profile',
        route: '/profile',
        icon: <AI.AiFillProfile />
    },
    {
        pageName: 'Upload Data',
        route: '/uploadData',
        icon: <AI.AiFillFileAdd/>
    },
    {
        pageName: 'Support',
        route: '/support',
        icon: <IO.IoMdHelpCircle/>
    },
    {
        pageName: 'Sign Out',
        route: '/signout',
        icon: <AI.AiFillLayout/>
    }
]
