import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

const projects: [string, string][] = [
    ["timemachine", "https://github.com/danielbusnz-lgtm/timemachine"],
    ["routelet", "https://github.com/danielbusnz-lgtm/routelet"],
    ["hindsight", "https://github.com/danielbusnz-lgtm/hindsight"],
    ["loomglass", "https://github.com/danielbusnz-lgtm/loomglass"],
    ["Peeky", "https://github.com/danielbusnz-lgtm/Peeky"],
];

export default function Home() {
    const posts = getAllPosts();

    return (
        <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-3">
                <h2
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "#8caaee" }}
                >
                    Projects
                </h2>
                <p className="text-sm" style={{ color: "#99d1db" }}>
                    {projects.map(([name, url], i) => (
                        <span key={name}>
                            {i > 0 && ", "}
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#99d1db" }}
                            >
                                {name}
                            </a>
                        </span>
                    ))}
                </p>
                <Image
                    src="/space.png"
                    alt=""
                    width={1600}
                    height={900}
                    priority
                    className="h-auto w-full rounded-lg"
                />
            </section>
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
