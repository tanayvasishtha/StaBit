import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { list } from "@/content/blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <Sidebar />
      <div className="lg:pl-56 pt-14">
      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Starknet Blog</h1>
            <p className="text-sm text-muted-foreground">Short, clear posts to get you productive fast.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((p) => (
              <a key={p.title} href={`/blog/${p.slug}`} className="block group rounded-xl border border-border/30 bg-background/60 p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-primary/15 text-primary font-medium">{p.tag}</span>
                  <span className="text-xs text-muted-foreground">{p.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Blog;


