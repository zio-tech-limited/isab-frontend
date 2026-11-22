import ProductCertificationPage from "@/components/home/Service/ProductCertificationPage";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Product Certification",
        description: "ISAB provides accreditation for Product Certification Bodies under ISO/IEC 17065. Services include PEFC Forest Certification, HALAL Certification, CE Marking, and more.",
        keywords: [
            "product certification", "ISO 17065", "PEFC", "HALAL certification", 
            "CE marking", "product certification bodies", "accreditation", "ISAB"
        ],
    });
}

export default function Page() {
    return <ProductCertificationPage />;
}