export default function AdminLayout(props: any) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => props.setLogin(false)}>Logout</button>
    </div>
  );
}
