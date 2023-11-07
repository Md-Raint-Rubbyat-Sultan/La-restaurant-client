import { Link } from "react-router-dom";

const OurBlogs = () => {
  return (
    <div className="container mx-auto px-4 xl:px-0 my-28 xl:my-40">
      <div className="flex flex-col md:flex-row-reverse items-center gap-6">
        <div className="flex-1">
          <figure>
            <img
              className="w-full h-full"
              src="https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </figure>
        </div>
        <div className="space-y-5 flex-1">
          <h3 className="text-3xl font-semibold">Lá Blogs</h3>
          <p>
            Our restaurant is famous for our extra curriculum and knowledge
            about other filed. Our most priority is Programming. Read some blogs
            about it in out blogs page. To visit click See Blogs.
          </p>
          <div>
            <Link to={"blogs"}>
              <button className="btn-banner px-6 py-2">See Blogs</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBlogs;
