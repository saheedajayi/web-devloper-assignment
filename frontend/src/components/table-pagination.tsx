import React from 'react';
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TablePaginationProps {
    currentPage: number;
    pageCount: number;
    isLoading: boolean;
    error: any;
    onPageChange: (event: { selected: number }) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
                                                             currentPage,
                                                             pageCount,
                                                             isLoading,
                                                             error,
                                                             onPageChange
                                                         }) => {
    return (
        <div>
            {!isLoading && !error && pageCount > 1 && (
                <>
                    {/* Mobile pagination - compact */}
                    <div className="flex justify-center mt-8 md:hidden">
                        <ReactPaginate
                            previousLabel={
                                <div className="flex gap-2 items-center">
                                    <ArrowLeft size={16}/>
                                </div>
                            }
                            nextLabel={
                                <div className="flex gap-2 items-center">
                                    <ArrowRight size={16}/>
                                </div>
                            }
                            pageCount={pageCount}
                            onPageChange={onPageChange}
                            forcePage={currentPage}
                            pageRangeDisplayed={1}
                            marginPagesDisplayed={1}
                            containerClassName="flex items-center gap-1"
                            pageClassName="inline-block"
                            pageLinkClassName="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            activeClassName="bg-blue-50 border-blue-200 rounded-md"
                            activeLinkClassName="!text-blue-600 font-medium rounded-md"
                            previousClassName="inline-block"
                            previousLinkClassName="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            nextClassName="inline-block"
                            nextLinkClassName="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
                            breakClassName="inline-block"
                            breakLinkClassName="block px-2 py-2 text-sm text-gray-400"
                        />
                    </div>

                    {/* Desktop pagination - expanded */}
                    <div className="hidden md:flex justify-end mt-8">
                        <ReactPaginate
                            previousLabel={
                                <div className="flex gap-2 items-center">
                                    <ArrowLeft size={16}/>
                                    <span>Previous</span>
                                </div>
                            }
                            nextLabel={
                                <div className="flex gap-2 items-center">
                                    <span>Next</span>
                                    <ArrowRight size={16}/>
                                </div>
                            }
                            pageCount={pageCount}
                            onPageChange={onPageChange}
                            forcePage={currentPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            containerClassName="flex items-center gap-1"
                            pageClassName="inline-block"
                            pageLinkClassName="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            activeClassName="bg-blue-50 border-blue-200 rounded-md"
                            activeLinkClassName="!text-blue-600 font-medium rounded-md"
                            previousClassName="inline-block"
                            previousLinkClassName="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            nextClassName="inline-block"
                            nextLinkClassName="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 border border-transparent hover:border-gray-200"
                            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
                            breakClassName="inline-block"
                            breakLinkClassName="block px-3 py-2 text-sm text-gray-400"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TablePagination;