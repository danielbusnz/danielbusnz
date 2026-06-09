import Link from "next/link";
import { getPostTree } from "@/lib/posts";

export function PostTree() {
  const tree = getPostTree();

  if (tree.length === 0) {
    return <p className="text-sm text-ctp-subtext0">No posts yet.</p>;
  }

  return (
    <nav className="tree font-mono text-sm">
      {tree.map((year) => (
        <details key={year.year} open>
          <summary>{year.year}</summary>
          <div className="tree-children">
            {year.months.map((month) => (
              <details key={month.key} open>
                <summary>{month.label}</summary>
                <div className="tree-children">
                  {month.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="tree-file"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </details>
      ))}
    </nav>
  );
}
