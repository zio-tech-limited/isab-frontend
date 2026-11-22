import AlliancePage from "@/components/home/ApprovedOrganization";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Global Alliance",
        description: "Connect with ISAB's global network of accredited certification bodies and organizations committed to excellence in accreditation services.",
        keywords: [
            "alliance", "accreditation bodies", "certification bodies", "ISAB alliance",
            "global network", "accreditation partners", "certification partners"
        ],
    });
}

export default function Page() {
    return <AlliancePage />;
}