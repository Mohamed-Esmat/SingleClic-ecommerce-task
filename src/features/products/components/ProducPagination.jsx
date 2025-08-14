import { useSearchParams } from "react-router-dom";

const ProductPagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  totalItems,
  itemsPerPage = 8,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage);
    }

    setSearchParams(params); // This updates the URL with the new page number, allowing for proper navigation and bookmarking.
  };

  // Handle items per page change
  const updateItemsPerPage = (newLimit) => {
    const params = new URLSearchParams(searchParams);

    if (newLimit === 8) {
      params.delete("limit");
    } else {
      params.set("limit", newLimit);
    }

    params.delete("page"); // Reset to page 1 when items per page changes

    setSearchParams(params);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page links to show
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a range of pages around the current page
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);

      // Adjust start if we're near to the end
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      // If the start is greater than 1, add the first page and ellipsis
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      // Add the range of pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // If the end is less than total pages, add ellipsis and last page
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Don't render if only one page
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1; // Calculate the starting item index based on current page and items per page
  const endItem = Math.min(currentPage * itemsPerPage, totalItems); // Calculate the ending item index, ensuring it doesn't exceed total items

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm">
      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={!hasPreviousPage}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            hasPreviousPage
              ? "text-gray-700 bg-white hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={!hasNextPage}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            hasNextPage
              ? "text-gray-700 bg-white hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-700">
            showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>

          {/* Items per page selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              name=""
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => updateItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>

        {/* Page Navigation */}
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <button
            onClick={() => updatePage(currentPage - 1)}
            disabled={!hasPreviousPage}
            className={`relative inline-flex items-center px-2 rounded-l-md border border-gray-300 text-sm font-medium ${
              hasPreviousPage
                ? "text-gray-500 bg-white hover:bg-gray-50"
                : "text-gray-300 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => updatePage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => updatePage(currentPage + 1)}
            disabled={!hasNextPage}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
              hasNextPage
                ? "text-gray-500 bg-white hover:bg-gray-50"
                : "text-gray-300 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductPagination;
