import { mockRoutesResponse } from "./data/MockRoutes";
import MapComponent from "./components/Map";

export default function ResultsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <h1 className="text-2xl font-semibold p-4 shrink-0">Results – Route map</h1>
      <div className="flex-1 min-h-[70vh] w-full px-4 pb-4">
        <MapComponent routes={mockRoutesResponse.routes} />
      </div>
    </main>
  );
}
