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

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            {/* Info jumlah data yang ditampilkan */}
            <p>
                Menampilkan {startIndex + 1}–{endIndex} dari {totalItems} data
            </p>

            {/* Dropdown jumlah per halaman */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
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

            {/* Tombol halaman */}
            <div className="flex justify-center mt-4 md:mt-0 gap-2 flex-wrap">
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

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