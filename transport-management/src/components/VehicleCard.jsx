import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility

export default function VehicleCard({ vehicle }) {
    // * Sementara data deconstructuring dari vehicle
    const attr = vehicle.attributes;
    const rel = vehicle.relationships;

    // * State untuk modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // * Fungsi untuk membuka modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // * Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // * Penampilan card kendaraan sementara
    return (
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="text-2xl mr-2">🚍</span> 
                    Kendaraan #{attr.label}
                </h2>
            </div>
            <p><strong>Status:</strong> {attr.current_status}</p>
            <p><strong>Latitude:</strong> {attr.latitude}</p>
            <p><strong>Longitude:</strong> {attr.longitude}</p>
            <p className="text-sm text-gray-400 mt-2">
                Updated at: {new Date(attr.updated_at).toLocaleString()}
            </p>
            
            {/* Button untuk membuka modal */}
            <button
                onClick={openModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Lihat Detail
            </button>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Detail Kendaraan"
                className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
            >
                {/* Isi Modal */}
                <h2 className="text-2xl font-semibold mb-4">Detail Kendaraan #{attr.label}</h2>
                <div className="p-5">
                <div className="grid gap-3">
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{attr.current_status}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Latitude:</span>
                        <span className="text-gray-800">{attr.latitude}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Longitude:</span>
                        <span className="text-gray-800">{attr.longitude}</span>
                    </div>
                </div>
                </div>
                <p><strong>Rute:</strong> {rel.route?.data?.id || "Tidak ada rute"}</p>
                <p><strong>Trip:</strong> {rel.trip?.data?.id || "Tidak ada trip"}</p>
                
                {/* Tombol untuk menutup modal */}
                <button
                    onClick={closeModal}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Tutup
                </button>
            </Modal>
        </div>
    );
}

/*

return (
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="text-2xl mr-2">🚍</span> 
                    Kendaraan #{attr.label}
                </h2>
            </div>
            
            <div className="p-5">
                <div className="grid gap-3">
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{attr.current_status}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Latitude:</span>
                        <span className="text-gray-800">{attr.latitude}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <span className="font-medium text-gray-600">Longitude:</span>
                        <span className="text-gray-800">{attr.longitude}</span>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4 italic">
                    Updated at: {new Date(attr.updated_at).toLocaleString()}
                </p>
                
//                 // * Tombol untuk membuka modal */
//                 <button
//                     onClick={openModal}
//                     className="w-full mt-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
//                 >
//                     <span>Lihat Detail</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                 </button>

//             {/* Modal */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Detail Kendaraan"
//                 className="bg-white p-0 rounded-xl shadow-xl max-w-lg mx-auto mt-20 overflow-hidden"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50 p-4"
//             >
//                 {/* Header Modal */}
//                 <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-white">
//                     <h2 className="text-2xl font-bold flex items-center">
//                         <span className="text-3xl mr-2">🚍</span> 
//                         Detail Kendaraan #{attr.label}
//                     </h2>
//                 </div>
                
//                 {/* Isi Modal */}
//                 <div className="p-6">
//                     <div className="grid gap-4">
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Status:</span>
//                             <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full inline-block mt-1 sm:mt-0">{attr.current_status}</span>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Latitude:</span>
//                             <span className="text-gray-800">{attr.latitude}</span>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Longitude:</span>
//                             <span className="text-gray-800">{attr.longitude}</span>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Updated At:</span>
//                             <span className="text-gray-800">{new Date(attr.updated_at).toLocaleString()}</span>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Rute:</span>
//                             <span className="text-gray-800">{rel.route?.data?.id || "Tidak ada rute"}</span>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-3">
//                             <span className="font-semibold text-blue-600">Trip:</span>
//                             <span className="text-gray-800">{rel.trip?.data?.id || "Tidak ada trip"}</span>
//                         </div>
//                     </div>
                    
//                     {/* Tombol untuk menutup modal */}
//                     <div className="flex justify-end mt-6">
//                         <button
//                             onClick={closeModal}
//                             className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 mr-3"
//                         >
//                             Tutup
//                         </button>
//                         <button
//                             className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
//                         >
//                             Lihat Peta
//                         </button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// }
// */