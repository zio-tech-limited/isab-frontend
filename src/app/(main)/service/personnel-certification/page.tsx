import PersonnelCertificationPage from "@/components/home/Service/PersonnelCertificationPage";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Personnel Certification",
        description: "ISAB provides accreditation for Personnel Certification Bodies under ISO/IEC 17024. Accredited for 18 personnel certification schemes ensuring competence and credibility of certified professionals.",
        keywords: [
            "personnel certification", "ISO 17024", "professional certification", 
            "competence assessment", "personnel certification bodies", "accreditation", "ISAB"
        ],
    });
}

export default function Page() {
    return <PersonnelCertificationPage />;
}