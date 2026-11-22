"use client";

import { useState, useEffect } from "react";
import { getUserInfo } from "@/utils/helper/userFromToken";
import AccreditationBodyDashboard from "./AccreditationDashboard";
import AdminDashboard from "./SuperAdminDashboard";


// Main Dashboard Component with Role-Based Rendering
export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            </div>
        );
    }

    // Check if user role is accreditation-body
    if (user?.role === "accreditation-body") {
        return <AccreditationBodyDashboard />;
    }

    // Default to Admin Dashboard for other roles
    return <AdminDashboard />;
}