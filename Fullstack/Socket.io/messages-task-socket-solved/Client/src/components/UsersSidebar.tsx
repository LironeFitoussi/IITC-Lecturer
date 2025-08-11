import React from 'react';
import type { User } from '../types/chat';

type UsersSidebarProps = {
  users: User[];
  selfId: string;
  selectedUserId: string | null;
  onSelect: (userId: string | null) => void; // null clears DM
};

const UsersSidebar: React.FC<UsersSidebarProps> = ({ users, selfId, selectedUserId, onSelect }) => {
  const count = users.length;

  return (
    <aside className="w-full sm:w-64 md:w-72 bg-white/60 backdrop-blur border rounded-xl p-3 h-[28rem] md:h-[32rem] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-gray-800">מחוברים ({count})</h2>
        <button
          className={`text-xs px-2 py-1 rounded border ${selectedUserId ? 'bg-gray-50 border-gray-300 text-gray-700' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
          onClick={() => onSelect(null)}
          title="נקה בחירה (Public)"
        >
          Public
        </button>
      </div>

      {/* Optional search/filter input for long lists */}
      {/* <input className="mb-2 px-2 py-1 border rounded" placeholder="חפש משתמש…" /> */}

      <ul role="listbox" aria-label="Connected users" className="flex-1 overflow-y-auto space-y-1 pr-1">
        {users.map((u) => {
          const isSelf = u.id === selfId;
          const isSelected = selectedUserId === u.id;
          return (
            <li key={u.id}>
              <button
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  if (isSelf) {
                    onSelect(null);
                    return;
                  }
                  onSelect(u.id);
                }}
                className={`w-full text-left px-2 py-2 rounded-lg border flex items-center justify-between transition-colors focus:outline-none focus:ring-2 ${
                  isSelected ? 'border-blue-300 ring-1 ring-blue-200 bg-blue-50/70' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" aria-hidden />
                  <span className="truncate text-sm">
                    {u.username}
                    {isSelf && <span className="text-gray-500"> (you)</span>}
                  </span>
                </span>
                {isSelected && !isSelf && <span className="text-[10px] text-blue-600">Active DM</span>}
              </button>
            </li>
          );
        })}
        {users.length === 0 && (
          <li className="text-sm text-gray-500">אין משתמשים מחוברים</li>
        )}
      </ul>
    </aside>
  );
};

export default UsersSidebar;


