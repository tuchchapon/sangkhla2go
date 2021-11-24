import React from 'react'
import Popup from 'reactjs-popup'
import styles from '../../styles/PublicTranspotation.module.scss'
function LocationPopup({open,location}) {
    return(
        <div>
            <Popup
            open={open}
            closeOnEscape={false}
            closeOnDocumentClick={false}
            
            >
               <div className={styles['win-popup']} >
                   <img src="/Quit.png" className={styles['popup-close-icon']} onClick={()=>{open=false,console.log(open);}}   alt="" />
               <h1>open location popup</h1>
               
                <h2>{location.location_name}</h2>
               </div>
            </Popup>
        </div>
    )
}


function win_location_create_popup() {

    return (
        <div>
            <Popup
            open={showWinPopup}
            closeOnEscape={false}
            closeOnDocumentClick={false}>

            </Popup>
        </div>
    )
}

function win_location_update_popup() {
    return (
        <div>
            <Popup
            open={showWinPopup}
            closeOnEscape={false}
            closeOnDocumentClick={false}>

            </Popup>
        </div>
    )
}

export {
    LocationPopup,
    win_location_create_popup,
    win_location_update_popup
}
