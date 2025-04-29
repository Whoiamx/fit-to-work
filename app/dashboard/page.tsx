import { redirect } from "next/navigation";
import { WidgetItem } from "../components/WidgetItem";

export default async function DashboardPage() {
  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col"></div>
      </WidgetItem>
    </div>
  );
}
