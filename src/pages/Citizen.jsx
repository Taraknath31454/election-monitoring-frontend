import { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../layouts/DashboardLayout";
import { useReportStore } from "../store/reportStore";
import { REPORT_STATUS, REPORT_SEVERITY, REPORT_CATEGORIES } from "../constants";
import { AlertTriangle, MapPin, Tag, FileText, Send } from "lucide-react";

function Citizen() {
  const { addReport } = useReportStore();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    severity: REPORT_SEVERITY.MEDIUM
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError(t('citizen.errorTitle'));
      return;
    }
    if (!formData.description.trim()) {
      setError(t('citizen.errorDescription'));
      return;
    }
    if (!formData.category) {
      setError(t('citizen.errorCategory'));
      return;
    }
    if (!formData.location.trim()) {
      setError(t('citizen.errorLocation'));
      return;
    }

    const newReport = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      severity: formData.severity,
      location: formData.location,
    };

    addReport(newReport);

    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      severity: REPORT_SEVERITY.MEDIUM
    });
    setSuccess(true);
    
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout role="citizen">
      <h1 className="text-3xl font-bold mb-6">{t('citizen.dashboard')}</h1>

      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          {t('citizen.reportIssue')}
        </h2>

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6">
            {t('citizen.reportSuccess')}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              {t('citizen.reportTitle')}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('citizen.reportTitlePlaceholder')}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              {t('citizen.description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder={t('citizen.descriptionPlaceholder')}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              {t('citizen.category')}
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('citizen.selectCategory')}</option>
              {REPORT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              {t('citizen.location')}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t('citizen.locationPlaceholder')}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              {t('citizen.severity')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(REPORT_SEVERITY).map(sev => {
                const severityKey = {
                  [REPORT_SEVERITY.LOW]: 'severity.low',
                  [REPORT_SEVERITY.MEDIUM]: 'severity.medium',
                  [REPORT_SEVERITY.HIGH]: 'severity.high',
                  [REPORT_SEVERITY.CRITICAL]: 'severity.critical'
                }[sev];
                return (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, severity: sev }))}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.severity === sev
                        ? sev === REPORT_SEVERITY.CRITICAL 
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : sev === REPORT_SEVERITY.HIGH 
                            ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                            : sev === REPORT_SEVERITY.MEDIUM 
                              ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                              : 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {t(severityKey)}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {t('citizen.submitReport')}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Citizen;
