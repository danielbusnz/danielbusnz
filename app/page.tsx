import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
                    style={{ color: "#b5bfe2" }}
                >
                    Projects
                </h2>
                <p className="text-sm" style={{ color: "#737994" }}>
                    {projects.map(([name, url], i) => (
                        <span key={name}>
                            {i > 0 && ", "}
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#8caaee" }}
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
                    className="mt-4 h-auto w-full rounded-lg"
                />
                <p className="mt-2 text-center text-[13px] text-ctp-subtext0">
                    A place for my live notes. What I&apos;m building,
                    researching, and reading. Unedited, straight from the dome.
                </p>
            </section>
            {posts.length === 0 && (
                <p className="text-ctp-subtext0">No posts yet.</p>
            )}
            {posts.map((post) => (
                <article key={post.slug}>
                    <Link
                        href={`/posts/${post.slug}`}
                        className="text-2xl font-semibold tracking-tight no-underline"
                        style={{ color: "#ef9f76" }}
                    >
                        {formatDate(post.date)}
                    </Link>
                    <div className="prose prose-sm mt-4 max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </Markdown>
                    </div>
                </article>
            ))}
        </div>
    );
}
