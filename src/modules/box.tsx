export default function Box(props: any) {
    return(
        <>
            <div className="box">
                <div className="backsplash">
                    {props.children}
                </div>
            </div>
        </>
    )
}