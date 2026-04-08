import { useTranslation } from "react-i18next";
import DashboardLayout from "../layouts/DashboardLayout";

function Observer() {
  const { t } = useTranslation();
  
  return (
    <DashboardLayout role="observer">
      <h1 className="text-3xl font-bold mb-6">{t('observer.dashboard')}</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl">{t('observer.anomaliesReported')}</h2>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl">{t('observer.fairnessScore')}</h2>
          <p className="text-2xl font-bold mt-2 text-green-500">87%</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Observer
