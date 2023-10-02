export default function Box_Fallback(props: any) {
    return(
        <>
            <div className="box fallback">
                <div className="backsplash">
                    {props.children}
                </div>
            </div>
        </>
    )
}