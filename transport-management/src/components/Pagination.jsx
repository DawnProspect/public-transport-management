export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // * Batasan halaman pagination
    const pageWindowSize = 10;
    const windowStart = Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
    const windowEnd = Math.min(windowStart + pageWindowSize - 1, totalPages);

    return (
        <div className="flex flex-col gap-4 mb-4">
            {/* Info dan Dropdown */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <p>
                    Menampilkan {startIndex + 1}–{endIndex} dari {totalItems} data
                </p>
    
                <div className="flex items-center gap-2">
                    <label htmlFor="itemsPerPage">Data per halaman:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="border p-1 rounded"
                    >
                        {[5, 10, 15, 20].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
    
            {/* Pagination */}
            <div className="flex justify-center flex-wrap gap-2">
                {/* Tombol Prev */}
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
    
                {(() => {
                    const pageWindowSize = 10;
                    const windowStart = Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
                    const windowEnd = Math.min(windowStart + pageWindowSize - 1, totalPages);
    
                    return (
                        <>
                            {windowStart > 1 && (
                                <button
                                    className="px-3 py-1 border rounded"
                                    onClick={() => onPageChange(windowStart - 1)}
                                >
                                    ...
                                </button>
                            )}
    
                            {Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => {
                                const page = windowStart + i;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={`px-3 py-1 border rounded ${
                                            currentPage === page ? "bg-blue-500 text-white" : ""
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
    
                            {windowEnd < totalPages && (
                                <button
                                    className="px-3 py-1 border rounded"
                                    onClick={() => onPageChange(windowEnd + 1)}
                                >
                                    ...
                                </button>
                            )}
                        </>
                    );
                })()}
    
                {/* Tombol Next */}
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );    
}