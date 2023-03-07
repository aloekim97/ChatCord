import { useSelector } from "react-redux";
import "./index.css";

function SearchPage(){

    const messages = useSelector(state => state.search)
    console.log(messages)
    if (!Object.values(messages)){
        return null
    }
    // const mappable = Object.values(messages.search)
    return (
        <div className="search-results-container">
            <div className="search-header">
                Results
            </div>
            {
                Object?.values(messages?.search).length < 1 ? <div className="search-no-results"> No results found</div> : <div className="search-body">
                {Object.values(messages.search).map(item => (
                    <div className="search-message-content-container">
                        <img className="search-profile-pic" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}} src={item.user.profileImg}></img>
                        <div className="search-message-name-date-container">
                            <div className="message-profile-name">
                                <h3 className="message-content-name">
                                    {item.user.username}
                                </h3>
                                <div className="message-content-date">
                                    {item.createdAt}
                                </div>
                            </div>
                            <div>
                                {item.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }


        </div>
    )
}

export default SearchPage
