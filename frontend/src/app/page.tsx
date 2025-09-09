import UsersTable from "@/components/users-table"


export default function Home() {
    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto max-w-5xl p-4 sm:p-8">
                <UsersTable/>
            </div>
        </div>
    )
}
