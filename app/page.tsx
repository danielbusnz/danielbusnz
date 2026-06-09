import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
    const posts = getAllPosts();

    return (
        <div className="flex flex-col gap-10">
            <Image
                src="/space.png"
                alt=""
                width={1600}
                height={900}
                priority
                className="h-auto w-full rounded-lg"
            />
            {posts.length === 0 && (
                <p className="text-ctp-subtext0">No posts yet.</p>
            )}
            {posts.map((post) => (
                <article key={post.slug}>
                    <time className="text-sm text-ctp-subtext0" dateTime={post.date}>
                        {formatDate(post.date)}
                    </time>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">
                        <Link
                            href={`/posts/${post.slug}`}
                            className="text-ctp-text no-underline hover:text-ctp-blue"
                        >
                            {post.title}
                        </Link>
                    </h2>
                    {post.summary && (
                        <p className="mt-2 text-ctp-subtext1">{post.summary}</p>
                    )}
                </article>
            ))}
        </div>
    );
}
