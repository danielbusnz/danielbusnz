import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-10">
      {posts.length === 0 && <p className="text-zinc-500">No posts yet.</p>}
      {posts.map((post) => (
        <article key={post.slug}>
          <time className="text-sm text-zinc-500" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            <Link href={`/posts/${post.slug}`} className="no-underline">
              {post.title}
            </Link>
          </h2>
          {post.summary && (
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {post.summary}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
