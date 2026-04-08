import { useTranslation } from "react-i18next";
import DashboardLayout from "../layouts/DashboardLayout";

function Analyst() {
  const { t } = useTranslation();
  
  return (
    <DashboardLayout role="analyst">
      <h1 className="text-3xl font-bold mb-6">{t('analyst.dashboard')}</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl">{t('analyst.totalVotes')}</h2>
          <p className="text-2xl font-bold mt-2">12,540</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl">{t('analyst.voterTurnout')}</h2>
          <p className="text-2xl font-bold mt-2 text-green-500">68%</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl">{t('analyst.leadingCandidate')}</h2>
          <p className="text-2xl font-bold mt-2">Candidate A</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Analyst
