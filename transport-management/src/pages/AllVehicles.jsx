import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// * Import Komponen Kartu
import VehicleCard from "../components/VehicleCard";

// * Export default function AllVehicles
export default function AllVehicles() {
    // * State untuk menyimpan data kendaraan, status loading, dan error
    const [vehicles, setVehicles] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // * useEffect untuk mengambil data kendaraan dari API saat komponen dimuat
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                // * Fetch data dari API
                const response = await axios.get("/vehicles");
                const vehiclesData = response.data.data; // * Ambil data kendaraan dari API

                console.log(vehiclesData); // * Log data kendaraan untuk debugging

                setVehicles(vehiclesData); // * Set vehicles dengan data kendaraan

                setLoading(false); // * Update status loading
            } catch (error) {
                // * Tampilkan error di console
                console.error("Error fetching vehicles:", error);

                // * Tampilkan pesan error di web
                setError("Gagal mengambil data kendaraan.");

                setLoading(false);

                // * Tampilkan notifikasi error menggunakan swal
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch vehicles data",
                    confirmButtonText: "OK",
                });
            }
        };
        // * Panggil fungsi fetchVehicles untuk mengambil data kendaraan
        fetchVehicles();
    }, []);

    // * Jika loading, tampilkan pesan loading
    if (loading) return <p className="text-center py-4">🔄 Memuat data kendaraan...</p>;

    // * Error state
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Sistem Manajemen Armada</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
}