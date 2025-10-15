import { useParams, Link } from "react-router-dom";
import { getPost } from "@/content/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug || "");

  if (!post) {
    return (
      <div className="lg:pl-56 pt-14">
        <main className="container mx-auto px-6 pb-12">
          <div className="max-w-3xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
            <h1 className="text-xl font-bold mb-2">Post not found</h1>
            <Link to="/blog" className="text-primary">Back to Blog</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="lg:pl-56 pt-14">
      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-3xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] px-2 py-0.5 rounded bg-primary/15 text-primary font-medium">{post.tag}</span>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">{post.subtitle}</p>
          <article className="prose prose-invert max-w-none">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
          <div className="mt-8">
            <Link to="/blog" className="text-primary">← Back to Blog</Link>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default BlogPost;


