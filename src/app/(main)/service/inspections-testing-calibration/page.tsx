import InspectionsTestingCalibrationPage from "@/components/home/Service/InspectionsTestingCalibrationPage";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Inspections, Testing & Calibration",
        description: "ISAB provides accreditation for Inspection Bodies under ISO/IEC 17020 and Laboratories under ISO/IEC 17025. Ensure compliance, reliability, and traceability of your inspection and testing services.",
        keywords: [
            "inspection bodies", "ISO 17020", "laboratory accreditation", "ISO 17025", 
            "calibration", "testing", "inspection", "accreditation", "ISAB"
        ],
    });
}

export default function Page() {
    return <InspectionsTestingCalibrationPage />;
}