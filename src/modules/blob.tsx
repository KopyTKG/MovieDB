export default function Blob(props: any) {
  return (
    <div className="blob">
      <h3>{props.title}</h3>
      {props.type ? (
        <textarea
          value={props.value}
          disabled={true}
          placeholder={props.placeholder}
          rows={5}
        />
      ) : (
        <input
          type="text"
          disabled={true}
          value={props.value}
          placeholder={props.placeholder}
        />
      )}
    </div>
  );
}
