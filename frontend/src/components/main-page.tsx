"use client"

import { useState, useCallback } from "react"
import UsersTable from "@/components/users-table"
import UserProfile from "@/components/user-profile"
import NewPostModal from "@/components/new-post-modal"
import type { User } from "@/types/user"

export default function MainPage() {
    const [currentView, setCurrentView] = useState<"users" | "profile">("users")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showNewPostModal, setShowNewPostModal] = useState(false)

    const handleUserClick = useCallback((user: User) => {
        setSelectedUser(user)
        setCurrentView("profile")
    }, [])

    const handleBackToUsers = useCallback(() => {
        setCurrentView("users")
        setSelectedUser(null)
    }, [])

    const handleCloseNewPostModal = useCallback(() => {
        setShowNewPostModal(false)
    }, [])

    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto max-w-5xl p-4 sm:p-8">
                {currentView === "users" ? (
                    <UsersTable onUserClick={handleUserClick} />
                ) : (
                    selectedUser && <UserProfile user={selectedUser} onBack={handleBackToUsers} />
                )}

                {selectedUser && (
                    <NewPostModal userId={selectedUser.id.toString()} open={showNewPostModal} onClose={handleCloseNewPostModal} />
                )}
            </div>
        </div>
    )
}
