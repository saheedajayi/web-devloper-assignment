import type React from "react"
import { memo } from "react"
import PaginationControls from "@/components/pagination-controls"

interface TablePaginationProps {
    currentPage: number
    pageCount: number
    isLoading: boolean
    error: Error | null
    onPageChange: (event: { selected: number }) => void
}

const TablePagination: React.FC<TablePaginationProps> = memo(
    ({ currentPage, pageCount, isLoading, error, onPageChange }) => {
        if (isLoading || error || pageCount <= 1) {
            return null
        }

        return (
            <div>
                {/* Mobile pagination - compact */}
                <div className="flex justify-center mt-8 md:hidden">
                    <PaginationControls
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={onPageChange}
                        isMobile={true}
                    />
                </div>

                {/* Desktop pagination - expanded */}
                <div className="hidden md:flex justify-end mt-8">
                    <PaginationControls
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={onPageChange}
                        isMobile={false}
                    />
                </div>
            </div>
        )
    },
)

TablePagination.displayName = "TablePagination"

export default TablePagination
