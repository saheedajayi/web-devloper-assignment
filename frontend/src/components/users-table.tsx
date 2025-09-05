"use client"

import {useState, memo} from "react"
import ReactPaginate from "react-paginate"
import {useUsers} from "@/hooks/use-users"
import {User, UserFromAPI} from "@/types/user";
import Loader from "@/components/loader";
import {ArrowLeft, ArrowRight} from "lucide-react";

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

                <div className="overflow-hidden rounded-lg border border-gray-200 ">
                    <table className="table-fixed w-full ">
                        <thead>
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Full Name</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 hidden sm:table-cell">
                                Email Address
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 hidden md:table-cell">Address</th>
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
                                        <div>
                                            <div className="text-gray-900 font-medium">{user.name}</div>
                                            <div className="text-gray-600 text-sm sm:hidden">{user.email}</div>
                                            {/* Show address on mobile when email is hidden */}
                                            <div className="text-gray-600 text-sm md:hidden mt-1">
                                                {/*{formatAddress(user)}*/}
                                                {user.address}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-gray-600 hidden sm:table-cell">{user.email}</td>
                                    <td className="p-6 text-gray-600 hidden md:table-cell max-w-0">
                                        <div className="truncate" title={user.address}>
                                            {user.address}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && !error && pageCount > 1 && (
                    <div className="flex justify-end mt-8">
                        <ReactPaginate
                            previousLabel={
                                <div className="flex gap-2">
                                    <ArrowLeft size={20}/>
                                    Previous
                                </div>
                            }
                            nextLabel={
                                <div className="flex gap-2">
                                    Next
                                    <ArrowRight size={20}/>
                                </div>
                            }
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            forcePage={currentPage}
                            containerClassName="flex items-center space-x-1 sm:space-x-2"
                            pageClassName="px-2 sm:px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                            activeClassName="bg-blue-50 text-blue-600 font-medium"
                            previousClassName="px-2 sm:px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                            nextClassName="px-2 sm:px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            breakClassName="px-2 sm:px-3 py-2 text-sm text-gray-700"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(UsersTable)