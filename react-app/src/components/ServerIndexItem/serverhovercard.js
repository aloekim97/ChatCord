import { useEffect } from "react";



function ServerNameCard({server}){
    return (
        <div className="server-cardname-container" >
            <div>
                {server.name}
            </div>
        </div>
    )
}

export default ServerNameCard
