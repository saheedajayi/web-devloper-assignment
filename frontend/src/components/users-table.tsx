"use client"

import {useState, memo} from "react"
import {useUsers} from "@/hooks/use-users"
import {User, UserFromAPI} from "@/types/user";
import Loader from "@/components/loader";
import TablePagination from "@/components/table-pagination";

interface UsersTableProps {
    onUserClick: (user: User) => void
}

function UsersTable({onUserClick}: UsersTableProps) {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 4

    const {data, isLoading, error} = useUsers(currentPage, itemsPerPage)

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected)
    }

    const mapUserFromAPI = (user: UserFromAPI): User => ({
        id: user.id,
        name: user.name,
        email: user.email,
        address: [user.street, user.city, user.state, user.zipcode].filter(Boolean).join(', ')
    })

    const users = data?.users.map(mapUserFromAPI) || []
    const totalCount = data?.totalCount || 0
    const pageCount = Math.ceil(totalCount / itemsPerPage)

    return (
        <div className="bg-white">
            <div className="p-6">
                <h1 className="text-5xl font-[500] text-gray-900 mb-8">Users</h1>

                {/* Horizontal scroll container */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg  ">
                    <div className="min-w-full">
                        <table className="w-full min-w-[640px]"> {/* Set minimum width for the table */}
                            <thead>
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 min-w-[200px]">
                                    Full Name
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 min-w-[250px]">
                                    Email Address
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 min-w-[200px]">
                                    Address
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="py-12">
                                        <div className="flex justify-center items-center">
                                            <Loader/>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={3} className="py-12">
                                        <div className="flex justify-center items-center">
                                            <div className="text-red-600 text-center">
                                                <p className="font-medium">Error loading users</p>
                                                <p className="text-sm text-gray-600 mt-1">Please try again later</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => onUserClick(user)}
                                    >
                                        <td className="p-6">
                                            <div className="text-gray-900 font-medium">{user.name}</div>
                                        </td>
                                        <td className="p-6 text-gray-600">{user.email}</td>
                                        <td className="p-6 text-gray-600">
                                            <div className="max-w-[200px] truncate" title={user.address}>
                                                {user.address}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {!isLoading && !error && pageCount > 1 && (
                    <TablePagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        isLoading={isLoading}
                        error={error}
                        onPageChange={handlePageClick}
                    />
                )}
            </div>
        </div>
    )
}

export default memo(UsersTable)