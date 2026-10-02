import { auth } from '@/lib/auth';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    if (!user) {
        redirect('/auth/signin');
        return <div>Please sign in to access the dashboard.</div>
    }

    return (
        <div>
            Welcome to Dashboard, MF
        </div>
    );
};

export default Dashboard;