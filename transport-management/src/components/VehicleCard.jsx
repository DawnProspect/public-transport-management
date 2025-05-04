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