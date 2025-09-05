"use client"

import { useState } from "react"
import UsersTable from "@/components/users-table"
import UserProfile from "@/components/user-profile"
import NewPostModal from "@/components/new-post-modal"
import {User} from "@/types/user";


export default function HomePage() {
    const [currentView, setCurrentView] = useState<"users" | "profile">("users")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showNewPostModal, setShowNewPostModal] = useState(false)

    const handleUserClick = (user: User) => {
        setSelectedUser(user)
        setCurrentView("profile")
    }

    const handleBackToUsers = () => {
        setCurrentView("users")
        setSelectedUser(null)
    }

    return (
        <div className="min-h-screen flex justify-center items-center mx-auto max-w-5xl  p-4 sm:p-8">
            {currentView === "users" ? (
                <UsersTable onUserClick={handleUserClick} />
            ) : (
                selectedUser && (
                    <UserProfile user={selectedUser} onBack={handleBackToUsers} onNewPost={() => setShowNewPostModal(true)} />
                )
            )}

            {showNewPostModal && selectedUser && (
                <NewPostModal userId={selectedUser.id.toString()} onClose={() => setShowNewPostModal(false)} />
            )}
        </div>
    )
}
