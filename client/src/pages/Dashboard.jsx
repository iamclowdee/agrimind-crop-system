import { useEffect, useState, } from "react";
import { getCurrentLocation } from "../services/currentLocationService";
import { reverseGeocode } from "../services/locationService";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import OverviewSection from "../components/dashboard/OverviewSection";
import RecommendationSection from "../components/dashboard/recommendation/RecommendationSection";
import MapSection from "../components/dashboard/MapSection";
import ReportSection from "../components/dashboard/ReportSection";
import Footer from "../components/Footer";

import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] =
    useState("overview");

  const [ liveLocation, setLiveLocation ] = useState("Detecting...");
      useEffect(() => {
          const loadLocation = async () => {
              try {
                  const coords =
                      await getCurrentLocation();
                  const address =
                      await reverseGeocode(
                          coords.latitude,
                          coords.longitude
                      );
                  setLiveLocation(
                      `${address.location}, ${address.region}`
                  );
              }
              catch {
                  setLiveLocation(
                      "Location unavailable"
                  );
              }
          };
          loadLocation();
      }, []);

  return (
    <>
    <div className="dash-layout">
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}/>

      <div className="dash-main">
        <DashboardTopbar />

        {activeSection === "overview" && (
          <OverviewSection />
        )}

        {activeSection === "rec" && (
          <RecommendationSection />
        )}

        {activeSection === "map" && (
          <MapSection />
        )}

        {activeSection === "report" && (
          <ReportSection />
        )}
      </div>
    </div>
    <Footer />
  </>
  );
}

export default Dashboard;