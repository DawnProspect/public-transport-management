export default function VehicleCard({ vehicle }) {
    // * Sementara data deconstructuring dari vehicle
    const attr = vehicle.attributes;
    const rel = vehicle.relationships;

    // * Penampilan card kendaraan sementara
    return (
        <div className="bg-black shadow-md rounded-lg p-4 border">
            <h2 className="text-lg font-semibold mb-2">🚍 Kendaraan #{attr.label}</h2>
            <p><strong>ID:</strong> {vehicle.id}</p>
            <p><strong>Status:</strong> {attr.current_status}</p>
            <p><strong>Route ID:</strong> {rel.route?.data?.id || "N/A"}</p>
            <p><strong>Trip ID:</strong> {rel.trip?.data?.id || "N/A"}</p>
            <p><strong>Latitude:</strong> {attr.latitude}</p>
            <p><strong>Longitude:</strong> {attr.longitude}</p>
            <p className="text-sm text-gray-500 mt-2">
                Updated at: {new Date(attr.updated_at).toLocaleString()}
            </p>
        </div>
    );
}