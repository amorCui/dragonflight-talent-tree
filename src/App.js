import { Outlet, Link, NavLink } from 'react-router-dom'

import { getDatas } from './data/datas'

import './App.css'
import './icon.css'

function App() {
    let professionalDatas = getDatas()
    console.log('professionalDatas', professionalDatas)
    return (
        <div>
            <h1 className="title">wow 10.0天赋模拟器</h1>
            <nav className="professional">
                {professionalDatas.map((professionalData) => (
                    <NavLink
                        className="professional-item"
                        style={{
                            backgroundColor: professionalData.color,
                        }}
                        to={{ pathname: `/talent/${professionalData.name.toLowerCase()}` }}
                        key={professionalData.id}>
                        <div className="GameIcon GameIcon--large">
                            <div className={'GameIcon-icon ' + professionalData.icon}></div>
                        </div>

                        <div>{professionalData.nameCh}</div>
                    </NavLink>
                ))}
            </nav>
            <Outlet />
        </div>
    )
}

export default App
