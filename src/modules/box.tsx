export default function Box(props: any) {
    return(
        <>
            <div className="box" style={{backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+props.poster+")"}}>
                <div className="backsplash">
                    {props.children}
                </div>
            </div>
        </>
    )
}