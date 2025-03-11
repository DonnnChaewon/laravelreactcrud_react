import React from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <React.Fragment>
            <nav className='navbar navbar-expand-lg bg-dark' >
                <div className='container'>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink to='/topicslist' className='nav-link' aria-current='page'>Topics List</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/addtopic' className='nav-link'>Add Topic</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header