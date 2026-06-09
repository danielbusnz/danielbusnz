import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-zinc-500 no-underline">
        ← back
      </Link>
      <header className="mt-6">
        <time className="text-sm text-zinc-500" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {post.title}
        </h1>
      </header>
      <div className="prose prose-zinc dark:prose-invert mt-8 max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>
    </article>
  );
}
