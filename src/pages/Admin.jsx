import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ROLE_TYPES, ROLE_LABELS, ROLE_COLORS } from '../constants/roleTypes';
import DashboardLayout from '../layouts/DashboardLayout';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import PrimaryButton from '../components/ui/PrimaryButton';

function Admin() {
  const { t } = useTranslation();
  const { success, error: toastError } = useToast();

  // All users state
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState('');

  // Pending users state
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [pendingError, setPendingError] = useState('');

  // Election state
  const [electionName, setElectionName] = useState('');
  const [creatingElection, setCreatingElection] = useState(false);
  const [electionError, setElectionError] = useState('');
  const [electionSuccess, setElectionSuccess] = useState('');

  // Current user role for headers
  const currentUserRole = 'ADMIN'; // From auth context in production

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        setUsersError('');
        const response = await fetch('http://localhost:8085/api/users');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setUsersError(err.message);
        toastError('Failed to load users');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [toastError]);

  // Fetch pending users
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        setLoadingPending(true);
        setPendingError('');
        const response = await fetch('http://localhost:8085/api/admin/pending-users');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch pending users: ${response.status}`);
        }
        
        const data = await response.json();
        setPendingUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setPendingError(err.message);
        toastError('Failed to load pending users');
      } finally {
        setLoadingPending(false);
      }
    };

    fetchPendingUsers();
  }, [toastError]);

  // Approve user
  const handleApproveUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8085/api/admin/approve-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': currentUserRole
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to approve user: ${response.status}`);
      }

      // Refresh pending users
      const pendingResponse = await fetch('http://localhost:8085/api/admin/pending-users');
      const pendingData = await pendingResponse.json();
      setPendingUsers(Array.isArray(pendingData) ? pendingData : []);

      success('User approved successfully!');
    } catch (err) {
      toastError(err.message);
    }
  };

  // Create election
  const handleCreateElection = async (e) => {
    e.preventDefault();
    if (!electionName.trim()) return;

    setCreatingElection(true);
    setElectionError('');
    setElectionSuccess('');

    try {
      const response = await fetch('http://localhost:8085/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: electionName.trim() })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to create election: ${response.status}`);
      }

      const data = await response.json();
      setElectionSuccess(`Election "${electionName}" created successfully!`);
      setElectionName('');
      success(t('admin.electionCreated'));
    } catch (err) {
      setElectionError(err.message);
      toastError(err.message);
    } finally {
      setCreatingElection(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Pending Users Section */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Pending Approvals ({pendingUsers.length})
            </h2>
          </div>

          {loadingPending ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" color="orange" />
            </div>
          ) : pendingError ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg mb-4">{pendingError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl text-white font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-4">No pending users</p>
              <p className="text-sm">All users approved or registered as Citizen</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Requested Role</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white max-w-md truncate">{user.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-md truncate">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          ROLE_COLORS[user.requestedRole?.toLowerCase()] 
                            ? `bg-${ROLE_COLORS[user.requestedRole?.toLowerCase()]}-500/20 text-${ROLE_COLORS[user.requestedRole?.toLowerCase()]}-400 border border-${ROLE_COLORS[user.requestedRole?.toLowerCase()]}-500/30`
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {ROLE_LABELS[user.requestedRole?.toLowerCase()] || user.requestedRole || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PrimaryButton 
                          onClick={() => handleApproveUser(user.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </PrimaryButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* All Users Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('admin.allUsers')} ({users.length})
            </h2>
          </div>

          {loadingUsers ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : usersError ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg mb-4">{usersError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-4">No users found</p>
              <p className="text-sm">Users will appear here once registered</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white max-w-md truncate">{user.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-md truncate">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          user.role?.toLowerCase() === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          user.role?.toLowerCase() === 'citizen' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          user.role?.toLowerCase() === 'observer' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {user.role || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Election Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('admin.addElection')}
            </h2>
          </div>

          <form onSubmit={handleCreateElection} className="space-y-4 max-w-md">
            <div>
              <input
                type="text"
                placeholder="Election Name (e.g. 2024 General Election)"
                value={electionName}
                onChange={(e) => setElectionName(e.target.value)}
                disabled={creatingElection}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-200"
              />
            </div>

            {electionError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {electionError}
              </div>
            )}

            {electionSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                {electionSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={creatingElection || !electionName.trim()}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {creatingElection ? (
                <>
                  <LoadingSpinner size="sm" color="black" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create Election</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Admin;
