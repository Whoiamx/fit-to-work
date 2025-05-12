import ChatPage from "../components/chat/Chat";
import { WidgetItem } from "../components/Widgets/WidgetItem";

export default async function DashboardPage() {
  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem />
    </div>
  );
}
