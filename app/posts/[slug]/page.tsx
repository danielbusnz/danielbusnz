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
    title: formatDate(post.date),
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
      <Link
        href="/"
        className="text-sm text-ctp-subtext0 no-underline hover:text-ctp-blue"
      >
        ← back
      </Link>
      <header className="mt-6">
        <time
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "#8caaee" }}
          dateTime={post.date}
        >
          {formatDate(post.date)}
        </time>
      </header>
      <div className="prose mt-8 max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>
    </article>
  );
}
