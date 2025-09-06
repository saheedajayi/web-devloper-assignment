import type React from "react"
import { memo } from "react"
import ReactPaginate from "react-paginate"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface PaginationControlsProps {
    currentPage: number
    pageCount: number
    onPageChange: (event: { selected: number }) => void
    isMobile?: boolean
}

const PaginationControls: React.FC<PaginationControlsProps> = memo(
    ({ currentPage, pageCount, onPageChange, isMobile = false }) => {
        const baseClasses = {
            containerClassName: "flex items-center gap-1",
            pageClassName: "inline-block",
            pageLinkClassName: `block px-${isMobile ? "2" : "3"} py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200`,
            activeClassName: "bg-blue-50 border-blue-200 rounded-md",
            activeLinkClassName: "!text-blue-600 font-medium rounded-md",
            previousClassName: "inline-block",
            previousLinkClassName: `block px-${isMobile ? "2" : "3"} py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200`,
            nextClassName: "inline-block",
            nextLinkClassName: `block px-${isMobile ? "2" : "3"} py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200`,
            disabledClassName: "opacity-50 cursor-not-allowed pointer-events-none",
            breakClassName: "inline-block",
            breakLinkClassName: "block px-2 py-2 text-sm text-gray-400",
        }

        return (
            <ReactPaginate
                previousLabel={
                    <div className="flex gap-2 items-center">
                        <ArrowLeft size={16} />
                        {!isMobile && <span>Previous</span>}
                    </div>
                }
                nextLabel={
                    <div className="flex gap-2 items-center">
                        {!isMobile && <span>Next</span>}
                        <ArrowRight size={16} />
                    </div>
                }
                pageCount={pageCount}
                onPageChange={onPageChange}
                forcePage={currentPage}
                pageRangeDisplayed={isMobile ? 1 : 3}
                marginPagesDisplayed={1}
                {...baseClasses}
            />
        )
    },
)

PaginationControls.displayName = "PaginationControls"

export default PaginationControls
