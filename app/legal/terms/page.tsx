// app/legal/terms/page.tsx
import LegalPageLayout from "@/layouts/LegalPage";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p>This is placeholder text for your Terms & Conditions page.</p>
      <h2>1. Introduction</h2>
      <p>
        Welcome to our website. These terms and conditions outline the rules and
        regulations for the use of our services.
      </p>
      <h2>2. Intellectual Property</h2>
      <p>
        The content published on this site is the intellectual property of
        Shmaplex unless otherwise stated.
      </p>
      <h2>3. Purchasing</h2>
      <p>
        All sales are final unless otherwise stated. Products are provided
        as-is.
      </p>
    </LegalPageLayout>
  );
}
