import Item from "@/modules/item";


export default function Movies(props:any) { 

    
    return (
        <div className="container" onClick={props.onClick}>
            {props.data.map((movie: any) => {
              return (
                <Item key={movie.id} {...movie} />
                )
              })}
        </div>
    )
}

