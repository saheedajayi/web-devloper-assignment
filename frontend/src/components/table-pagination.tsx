import type React from "react"
import { memo } from "react"
import PaginationControls from "@/components/pagination-controls"
import {useIsMobile} from "@/hooks/use-mobile";

interface TablePaginationProps {
    currentPage: number
    pageCount: number
    isLoading: boolean
    error: Error | null
    onPageChange: (event: { selected: number }) => void
}

const TablePagination: React.FC<TablePaginationProps> = memo(
    ({ currentPage, pageCount, isLoading, error, onPageChange }) => {
        const isMobile = useIsMobile()

        if (isLoading || error || pageCount <= 1) {
            return null
        }

        return (
            <div>
                <div className="flex justify-center md:justify-end mt-8 ">
                    <PaginationControls
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={onPageChange}
                        isMobile={isMobile}
                    />
                </div>
            </div>
        )
    },
)

TablePagination.displayName = "TablePagination"

export default TablePagination
