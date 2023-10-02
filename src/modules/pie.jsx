export default function Pie(props) {
    const colors = [
        "#57bb8a",
        "#73b87e",
        "#94bd77",
        "#b0be6e",
        "#d4c86a",
        "#f5ce62",
        "#e9b861",
        "#ecac67",
        "#e79a69",
        "#e2886c",
        "#dd776e"
        ];
    let a = props.rating
    return (
        <div className="pie" style={{"--p": a, "--c": colors[(10-Math.round(a/10))]}}>
          {Math.round(a)}%
        </div>
    )
}
