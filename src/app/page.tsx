import Category from "@/modules/category.display";
import Latest from "@/modules/latest.display";

export default function Home() {

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold underline mb-5">Latest addition</h1>
        <Latest/>
        <Category/>
      </div>
    </>
  );
}
