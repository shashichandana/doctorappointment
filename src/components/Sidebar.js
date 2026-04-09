import React from 'react';

function Sidebar({ menu }) {
  return (
    <aside className="sidebar">
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;