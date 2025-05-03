import AsyncSelect from 'react-select/async';
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function RouteTripFilter({ onFilterChange }) {
    // * State untuk menyimpan data rute dan status loading
    const [selectedRoutes, setSelectedRoutes] = useState([])
    const [selectedTrips, setSelectedTrips] = useState([])
    const [isLoadingRoutes, setIsLoadingRoutes] = useState(false)
    const [isLoadingTrips, setIsLoadingTrips] = useState(false)

    // * Fungsi untuk mengambil data rute dari API
    // * Loadoptions untuk routes
    const loadRouteOptions = async (inputValue, callback) => {
        setIsLoadingRoutes(true);
        try {
            console.log("Loading route options with input:", inputValue);
            const res = await axios.get(`/routes`);
            console.log("Routes API response:", res.data);
            
            
            
            // * Ambil semua data rute dari API
            const allOptions = res.data.data.map((route) => {
                let label = '';
                if (route.attributes.short_name) {
                    label += route.attributes.short_name;
                }
                if (route.attributes.long_name) {
                    label += label ? ` - ${route.attributes.long_name}` : route.attributes.long_name;
                }
                if (!label) {
                    label = route.id;
                }
                
                return {
                    value: route.id,
                    label: label,
                    searchText: [
                        route.id,
                        route.attributes.short_name,
                        route.attributes.long_name,
                        route.attributes.description,
                        route.attributes.fare_class
                    ].filter(Boolean).join(' ').toLowerCase()
                };
            });
            
            const normalizedInput = (inputValue || '').trim().toLowerCase();
            let filteredOptions = allOptions;
            
            if (normalizedInput) {
                console.log("Filtering routes with normalized input:", normalizedInput);
                console.log("All routes before filtering:", allOptions);
                
                const searchTerms = normalizedInput.split(/\s+/).filter(term => term.length > 0);
                
                filteredOptions = allOptions.filter(option => {
                    
                    if (searchTerms.length === 0) return true;
                    
                    return searchTerms.every(term => option.searchText.includes(term));
                });
                
                console.log("Filtered routes:", filteredOptions);
                console.log(`Filtered from ${allOptions.length} to ${filteredOptions.length} routes`);
            }
            
            callback(filteredOptions);
        } catch (error) {
            console.error("Error fetching routes:", error);
            callback([]);
        } finally {
            setIsLoadingRoutes(false);
        }
    };

    const loadTripOptions = async (inputValue, callback) => {
        if (!selectedRoutes.length) {
            callback([]); 
            return;
        }
        setIsLoadingTrips(true);
        try {
            console.log("Loading trip options with input:", inputValue);
            const routeIds = selectedRoutes.map((r) => r.value).join(',');
            console.log("Selected route IDs:", routeIds);
            
            const res = await axios.get(`/trips?filter[route]=${routeIds}&page[limit]=100`);
            console.log("Trips API response:", res.data);
            
            
            
            
            const allOptions = res.data.data.map((trip) => {
                const label = trip.attributes.headsign ? 
                    `${trip.attributes.headsign} (${trip.id})` : 
                    trip.id;
                
                return {
                    value: trip.id,
                    label: label,
                    searchText: [
                        trip.id,
                        trip.attributes.headsign,
                        trip.attributes.name,
                        trip.attributes.direction_id
                    ].filter(Boolean).join(' ').toLowerCase()
                };
            });
            
            
            const normalizedInput = (inputValue || '').trim().toLowerCase();
            let filteredOptions = allOptions;
            
            if (normalizedInput) {
                console.log("Filtering trips with normalized input:", normalizedInput);
                console.log("All trips before filtering:", allOptions);
                
                
                const searchTerms = normalizedInput.split(/\s+/).filter(term => term.length > 0);
                
                filteredOptions = allOptions.filter(option => {
                    
                    if (searchTerms.length === 0) return true;
                    
                    
                    return searchTerms.every(term => option.searchText.includes(term));
                });
                
                console.log("Filtered trips:", filteredOptions);
                console.log(`Filtered from ${allOptions.length} to ${filteredOptions.length} trips`);
            }
            
            callback(filteredOptions);
        } catch (error) {
            console.error("Error fetching trips:", error);
            callback([]);
        } finally {
            setIsLoadingTrips(false);
        }
    };

    const handleRouteChange = (selected) => {
        setSelectedRoutes(selected || []);
        onFilterChange({ routes: selected || [], trips: selectedTrips });
    };

    const handleTripChange = (selected) => {
        setSelectedTrips(selected || []);
        onFilterChange({ routes: selectedRoutes, trips: selected || [] });
    };
    const handleClearRoutes = () => {
        setSelectedRoutes([]);
        onFilterChange({ routes: [], trips: selectedTrips });
    };

    const handleClearTrips = () => {
        setSelectedTrips([]);
        onFilterChange({ routes: selectedRoutes, trips: [] });
    };

    return (
        <div className="mb-4">
            <label className="font-semibold block mb-2">Filter berdasarkan Rute:</label>
            <div className="flex items-center mb-4">
                <div className="flex-grow">
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        loadOptions={loadRouteOptions}
                        onChange={handleRouteChange}
                        defaultOptions
                        placeholder="Pilih Rute..."
                        isLoading={isLoadingRoutes}
                        loadingMessage={() => "Memuat rute..."}
                        noOptionsMessage={() => "Tidak ada rute yang ditemukan"}
                        value={selectedRoutes}
                        classNamePrefix="route-select"
                        isClearable={false}
                    />
                </div>
                {selectedRoutes.length > 0 && (
                    <button 
                        className="ml-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                        onClick={handleClearRoutes}
                    >
                        Clear
                    </button>
                )}
            </div>

            <label className="font-semibold block mb-2">Filter berdasarkan Trip:</label>
            <div className="flex items-center">
                <div className="flex-grow">
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        loadOptions={loadTripOptions}
                        onChange={handleTripChange}
                        defaultOptions
                        placeholder="Pilih Trip..."
                        isLoading={isLoadingTrips}
                        loadingMessage={() => "Memuat trip..."}
                        noOptionsMessage={() => selectedRoutes.length ? "Tidak ada trip yang ditemukan" : "Pilih rute terlebih dahulu"}
                        value={selectedTrips}
                        classNamePrefix="trip-select"
                        isClearable={false}
                    />
                </div>
                {selectedTrips.length > 0 && (
                    <button 
                        className="ml-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                        onClick={handleClearTrips}
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}