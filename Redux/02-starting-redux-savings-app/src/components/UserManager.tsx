import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addUser, deleteUser, selectUser, clearError, selectAllUsers } from '../store/savingsSlice'

const UserManager: React.FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const selectedUserId = useAppSelector(state => state.savings.selectedUserId)
  const error = useAppSelector(state => state.savings.error)
  
  const [newUserName, setNewUserName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddUser = () => {
    if (newUserName.trim()) {
      dispatch(addUser({ name: newUserName.trim() }))
      setNewUserName('')
      setShowAddForm(false)
    }
  }

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}" and all their data?`)) {
      dispatch(deleteUser(userId))
    }
  }

  const handleSelectUser = (userId: string) => {
    dispatch(selectUser(userId))
    if (error) {
      dispatch(clearError())
    }
  }

  return (
    <div className="user-manager">
      <div className="user-manager-header">
        <h2>👥 User Management</h2>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-user-form">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
            onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
            autoFocus
          />
          <button onClick={handleAddUser} disabled={!newUserName.trim()}>
            Add User
          </button>
        </div>
      )}

      {users.length === 0 ? (
        <div className="no-users">
          <p>No users yet. Add your first user to get started!</p>
        </div>
      ) : (
        <div className="users-list">
          {users.map(user => (
            <div 
              key={user.id} 
              className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
            >
              <div className="user-info" onClick={() => handleSelectUser(user.id)}>
                <div className="user-name">{user.name}</div>
                <div className="user-balance">${user.balance.toFixed(2)}</div>
                <div className="user-created">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button 
                className="delete-user-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteUser(user.id, user.name)
                }}
                title="Delete user"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedUserId && (
        <div className="selected-user-info">
          <p>✅ Selected: {users.find(u => u.id === selectedUserId)?.name}</p>
        </div>
      )}
    </div>
  )
}

export default UserManager
