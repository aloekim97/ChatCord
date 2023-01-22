import { NavLink } from "react-router-dom";
import "./index.css";
import ComingSoonIndexItem from "./ComingSoonindex";
import DmBar from "../Message/allDms";

function ComingSoon(){
    return (
        <div className="coming-soon-container">
            <DmBar />
            <div className="coming-soon-components-container">
                <h1 className="coming-soon-h1">
                <i class="fa-regular fa-calendar"></i> Coming Soon
                </h1>
                <div className="coming-soon-components-background">
                    <div className="coming-soon-components-container" >
                        <div className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Roles and Permissions' />
                        </div>
                        <div className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Voice Chat' />
                        </div>
                        <div className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Themes' />
                        </div>
                    {/* </div>
                    <div className="coming-soon-components-right"> */}
                        <div  className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Friends' />
                        </div>
                        <div className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Comprehensive Search' />
                        </div>
                        <div className="Coming-soon-index-container">
                            <ComingSoonIndexItem name='Emotes' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon
