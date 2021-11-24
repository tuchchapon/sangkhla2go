import React from 'react'

export default function menu() {
    return (
        <div>

<div className="container-fluid px-0 h-100">
    <div className="row vh-100 collapse show no-gutters d-flex h-100 position-relative">
        <div className="col-3 p-0 vh-100 h-100 text-white w-sidebar navbar-collapse collapse d-none d-md-flex sidebar">
          
            <div className="navbar-dark bg-dark position-fixed h-100 w-sidebar">
                <h6 className="px-3 pt-3">Fixed Menu</h6>
                <ul className="nav flex-column flex-nowrap text-truncate">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</div>
        </div>
    )
}
