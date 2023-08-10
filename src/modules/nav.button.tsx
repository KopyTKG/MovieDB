'use client'


export default function Button(props:any) {
    const Show = () => {
        let element:any = document.getElementById(props.id);
        element.classList.remove("none");
    }
 
    return(
        <div className="b-div" onClick={() => Show()}>
            {props.children}
            <div className="point"/>
            <div ref={props.Ref} className="queries none" id={props.id}>

                _BN9AI5ZvOtYbMWUxO4kUAWKljuuepaGNCi5OPuOgxI
            </div>
        </div>
    )
} 