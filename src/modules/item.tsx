export default async function Item(props: any) {
    const poster = props.posters[0]
    return(
        <>
            <a href={"/movies/"+props.id} className="item" key={props.id}>
                {
                    poster != undefined ?
                
                <div className="backsplash" style={
                    {backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+poster.src+')' }}/>
                :
                <div className="backsplash"/>
                }
                <div className="info">
                    <div className="title">
                        {props.title}
                    </div>
                    <div className="year">
                        ({props.year})
                    </div>
                    <div className="quality">
                        {props.quality}
                    </div>
                </div>
            </a>
        </>
    )
}