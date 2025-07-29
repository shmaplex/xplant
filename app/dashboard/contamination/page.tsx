import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";
import ContaminationList from "@/components/dashboard/contamination/ContaminationList";
import ContaminationStats from "@/components/dashboard/contamination/ContaminationStats";

export default function ContaminationPage() {
  return (
    <div className="space-y-6">
      <ContaminationForm />
      <ContaminationList />
      <ContaminationStats />
    </div>
  );
}
