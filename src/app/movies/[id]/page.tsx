export default function Movie({params}: {params: {id: string}}) {

  return (
    <>
      <h1>  Movie : {params.id}</h1>
    </>
  )
}