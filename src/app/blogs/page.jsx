import BlogCard from "../components/Blog-Card/BlogCard";
import "./blogs.css";

const getData = async function fetchBlogs() {
  const link = process.env.NEXT_PUBLIC_BASE_URL;
  const api = `${link}/api/blog-list`;

  const res = await fetch(api, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data;
};

export default async function Page() {
  let data = [];
  try {
    const result = await getData();
    data = await result.data;
    // console.log("result:", data);
  } catch (error) {
    console.error("Error while fetching blogs:", error);
  }

  return (
    <section className="blogs margin_navbar">
      <div className="container">
        <div className="card_div py-5">
          {data.map((item, index) => (
            <BlogCard key={item.id} content={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
