
function ComingSoonIndexItem({name, src}){

    src = 'https://www.electronicshub.org/wp-content/uploads/2022/10/Seven-Ways-to-Solve-the-Discord-Loading-Image-Error.png'
    return(
        <div className="index-item-container">
            <h2 className="index-item-h2">
                {name}
            </h2>
            <div className="coming-soon-image-contaiiner">
                <img className="coming-soon-image" src={src}></img>
            </div>
        </div>
    )
}

export default ComingSoonIndexItem
