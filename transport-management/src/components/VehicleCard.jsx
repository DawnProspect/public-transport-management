export default function VehicleCard({ vehicle }) {
    // * Sementara data deconstructuring dari vehicle
    const attr = vehicle.attributes;
    const rel = vehicle.relationships;

    // * Penampilan card kendaraan sementara
    return (
        <div className="bg-black text-white shadow-md rounded-lg p-4 border">
            <h2 className="text-lg font-semibold mb-2">🚍 Kendaraan #{attr.label}</h2>
            <p><strong>Status:</strong> {attr.current_status}</p>
            <p><strong>Latitude:</strong> {attr.latitude}</p>
            <p><strong>Longitude:</strong> {attr.longitude}</p>
            <p className="text-sm text-gray-400 mt-2">
                Updated at: {new Date(attr.updated_at).toLocaleString()}
            </p>
        </div>
    );
}