import React from 'react'


function SideBarItem ({item}) {
    return (
        <div className="sidebar_link" to={item.route}>
            {item.icon}
            <div className="sidebar_label">
                {item.pageName}
            </div>
        </div>
    )
}

export default SideBarItem 