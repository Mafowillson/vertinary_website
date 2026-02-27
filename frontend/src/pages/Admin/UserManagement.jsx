import { useState, useEffect } from 'react'
import {
  FiUsers,
  FiSearch,
  FiX,
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiShield,
  FiUser,
  FiMail,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical,
  FiFilter,
} from 'react-icons/fi'
import { formatDate } from '../../utils/formatters'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all') // 'all', 'admin', 'user'
  const [statusFilter, setStatusFilter] = useState('all') // 'all', 'active', 'inactive'
  const [sortBy, setSortBy] = useState('recent') // 'recent', 'name', 'email'
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterAndSortUsers()
  }, [users, searchQuery, roleFilter, statusFilter, sortBy])

  const loadUsers = async () => {
    try {
      // This would fetch from admin endpoint
      // For now, using mock data
      const mockUsers = [
        {
          id: 1,
          name: 'TCHOUALA FODEM BODRIC',
          email: 'bodric@academie.com',
          role: 'admin',
          is_active: true,
          created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 12,
        },
        {
          id: 2,
          name: 'Marc Kasem',
          email: 'marc@example.com',
          role: 'user',
          is_active: true,
          created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 5,
        },
        {
          id: 3,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'user',
          is_active: true,
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 8,
        },
        {
          id: 4,
          name: 'Ahmed Hassan',
          email: 'ahmed@example.com',
          role: 'user',
          is_active: true,
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 3,
        },
        {
          id: 5,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          role: 'user',
          is_active: false,
          created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 0,
        },
        {
          id: 6,
          name: 'Marie Leclerc',
          email: 'marie@example.com',
          role: 'user',
          is_active: true,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          orders_count: 2,
        },
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortUsers = () => {
    let filtered = [...users]

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((u) =>
        statusFilter === 'active' ? u.is_active : !u.is_active
      )
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.name?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'email':
          return (a.email || '').localeCompare(b.email || '')
        case 'recent':
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

    setFilteredUsers(filtered)
  }

  const handleToggleStatus = async (userId) => {
    try {
      // This would call API to toggle user status
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_active: !u.is_active } : u
        )
      )
    } catch (error) {
      console.error('Failed to update user status:', error)
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // This would call API to delete user
        setUsers((prev) => prev.filter((u) => u.id !== userId))
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  const getUserInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Calculate statistics
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === 'admin').length,
    active: users.filter((u) => u.is_active).length,
    newThisMonth: users.filter(
      (u) => new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm">
          <FiUserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={stats.total}
          icon={FiUsers}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Administrators"
          value={stats.admins}
          icon={FiShield}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          label="Active Users"
          value={stats.active}
          icon={FiCheckCircle}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="New This Month"
          value={stats.newThisMonth}
          icon={FiUserPlus}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {['all', 'admin', 'user'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                  roleFilter === role
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {role === 'all' ? 'All Roles' : role}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                  statusFilter === status
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status === 'all' ? 'All Status' : status}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name (A-Z)</option>
            <option value="email">Email (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Users Display */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                getUserInitials={getUserInitials}
                formatDate={formatDate}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onView={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Users will appear here once they register'}
          </p>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          getUserInitials={getUserInitials}
          formatDate={formatDate}
          onClose={() => setSelectedUser(null)}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  )
}

// Stat Card Component
const StatCard = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

// User List Item Component
const UserListItem = ({
  user,
  getUserInitials,
  formatDate,
  onToggleStatus,
  onDelete,
  onView,
}) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-primary-700">
            {getUserInitials(user.name)}
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                  <FiMail className="w-3 h-3" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Role Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {user.role === 'admin' ? (
                  <FiShield className="w-3 h-3" />
                ) : (
                  <FiUser className="w-3 h-3" />
                )}
                <span className="capitalize">{user.role}</span>
              </span>
              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                  user.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {user.is_active ? (
                  <FiCheckCircle className="w-3 h-3" />
                ) : (
                  <FiXCircle className="w-3 h-3" />
                )}
                <span>{user.is_active ? 'Active' : 'Inactive'}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Orders</p>
              <p className="font-medium text-gray-900">{user.orders_count || 0} orders</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Member Since</p>
              <p className="font-medium text-gray-900 flex items-center space-x-1">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(user.created_at)}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">User ID</p>
              <p className="font-medium text-gray-900">#{user.id}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleStatus(user.id)}
            className={`p-2 rounded-lg transition-colors ${
              user.is_active
                ? 'text-orange-600 hover:bg-orange-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={user.is_active ? 'Deactivate' : 'Activate'}
          >
            {user.is_active ? <FiXCircle className="w-5 h-5" /> : <FiCheckCircle className="w-5 h-5" />}
          </button>
          <button
            onClick={onView}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="View Details"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>
          {user.role !== 'admin' && (
            <button
              onClick={() => onDelete(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// User Detail Modal
const UserDetailModal = ({ user, getUserInitials, formatDate, onClose, onToggleStatus }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Header */}
          <div className="flex items-center space-x-4 pb-6 border-b">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-700">
                {getUserInitials(user.name)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <span
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {user.role === 'admin' ? (
                  <FiShield className="w-4 h-4" />
                ) : (
                  <FiUser className="w-4 h-4" />
                )}
                <span className="capitalize">{user.role}</span>
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  user.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {user.is_active ? (
                  <FiCheckCircle className="w-4 h-4" />
                ) : (
                  <FiXCircle className="w-4 h-4" />
                )}
                <span>{user.is_active ? 'Active' : 'Inactive'}</span>
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-medium text-gray-900">#{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-medium text-gray-900 flex items-center space-x-2">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(user.created_at)}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="font-medium text-gray-900">{user.orders_count || 0} orders</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onToggleStatus(user.id)
                onClose()
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                user.is_active
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {user.is_active ? 'Deactivate User' : 'Activate User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
