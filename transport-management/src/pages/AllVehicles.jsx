import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// Komponen
import VehicleCard from "../components/VehicleCard";
import Pagination from "../components/Pagination";
import RouteTripFilter from "../components/RouteTripFilter";

export default function AllVehicles() {
    // Grup state dalam satu objek untuk pengelolaan yang lebih baik
    const [state, setState] = useState({
        vehicles: [],
        loading: true,
        error: "",
        currentPage: 1,
        itemsPerPage: 5,
        filters: { routes: [], trips: [] }
    });
    
    // Destructure state untuk kemudahan penggunaan
    const { vehicles, loading, error, currentPage, itemsPerPage, filters } = state;
    
    // Helper function untuk mengupdate state secara parsial
    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    // Mengambil data kendaraan dari API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("/vehicles");
                const vehiclesData = response.data.data;
                
                console.log(vehiclesData);
                
                updateState({
                    vehicles: vehiclesData,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                
                updateState({
                    error: "Gagal mengambil data kendaraan.",
                    loading: false
                });
                
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch vehicles data",
                    confirmButtonText: "OK",
                    background: "#fff",
                    confirmButtonColor: "#3b82f6",
                    iconColor: "#ef4444",
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }
        };
        
        fetchVehicles();
    }, []);

    // Filter kendaraan berdasarkan route dan trip
    const filteredVehicles = vehicles.filter((vehicle) => {
        const routeMatch =
            filters.routes.length === 0 ||
            filters.routes.some((r) => r.value === vehicle.relationships.route?.data?.id);
        
        const tripMatch =
            filters.trips.length === 0 ||
            filters.trips.some((t) => t.value === vehicle.relationships.trip?.data?.id);
        
        return routeMatch && tripMatch;
    });
    
    // Menghitung pagination
    const totalItems = filteredVehicles.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
    
    // Handler untuk halaman
    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
            updateState({ currentPage: page });
        }
    };
    
    // Handler untuk jumlah item per halaman
    const handleItemsPerPageChange = (newLimit) => {
        updateState({ 
            itemsPerPage: newLimit,
            currentPage: 1 
        });
    };
    
    // Handler untuk perubahan filter
    const handleFilterChange = ({ routes, trips }) => {
        updateState({ 
            filters: { routes, trips },
            currentPage: 1 
        });
    };
    
    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Sistem Manajemen Armada</h1>
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="flex space-x-2 mb-2">
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // Tampilan error
    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-red-800">Terjadi Kesalahan</h3>
                            <p className="mt-2 text-red-700">{error}</p>
                            <button 
                                className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                                onClick={() => window.location.reload()}
                            >
                                Muat Ulang Halaman
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto transition-all duration-300 ease-in-out">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 hover:text-blue-600 transition-colors duration-300">
                Sistem Manajemen Armada
            </h1>

            {/* Statistics Panel */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-gray-500 text-sm">Total Kendaraan</p>
                        <p className="text-2xl font-bold text-blue-600">{vehicles.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-gray-500 text-sm">Difilter</p>
                        <p className="text-2xl font-bold text-indigo-600">{filteredVehicles.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-gray-500 text-sm">Halaman</p>
                        <p className="text-2xl font-bold text-purple-600">{currentPage}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-gray-500 text-sm">Item/Halaman</p>
                        <p className="text-2xl font-bold text-teal-600">{itemsPerPage}</p>
                    </div>
                </div>
            </div>
            
            {/* Filter Component */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 hover:shadow-lg transition-shadow duration-300">
                <RouteTripFilter onFilterChange={handleFilterChange} />
            </div>
            
            {/* No Vehicles Found State */}
            {currentVehicles.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-6 text-center">
                    <svg className="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-medium text-blue-800 mb-2">Tidak Ada Kendaraan Ditemukan</h3>
                    <p className="text-blue-600 mb-4">
                        Tidak ada kendaraan yang cocok dengan filter yang dipilih.
                    </p>
                    <button 
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                        onClick={() => updateState({ filters: { routes: [], trips: [] } })}
                    >
                        Reset Filter
                    </button>
                </div>
            )}
            
            {/* Vehicle Cards Grid */}
            {currentVehicles.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        </div>
                    ))}
                </div>
            )}
            
            {/* Pagination Component - only show when there are vehicles */}
            {filteredVehicles.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-md">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            )}
        </div>
    );
}
