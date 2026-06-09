import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
};

export type Post = PostMeta & { content: string };

// A short label for the sidebar tree. Uses the `title` frontmatter if set,
// otherwise derives ~2 words from the first line of the body.
function treeLabel(title: unknown, content: string): string {
  if (typeof title === "string" && title.trim()) return title.trim();
  const firstLine =
    content
      .split("\n")
      .map((l) => l.trim())
      .find(Boolean) ?? "";
  const words = firstLine
    .replace(/^#+\s*/, "") // strip markdown heading marks
    .replace(/[*_`>[\]()]/g, "") // strip inline markdown
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .join(" ");
  return words || "untitled";
}

function readPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: treeLabel(data.title, content),
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    summary: data.summary ?? "",
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export type PostTree = {
  year: string;
  months: { key: string; label: string; posts: PostMeta[] }[];
}[];

// Group posts into a year -> month -> posts tree, newest first at every level.
export function getPostTree(): PostTree {
  const years = new Map<string, Map<string, PostMeta[]>>();
  for (const post of getAllPosts()) {
    const year = post.date.slice(0, 4);
    const month = post.date.slice(0, 7); // yyyy-mm
    const months = years.get(year) ?? new Map();
    years.set(year, months);
    months.set(month, [...(months.get(month) ?? []), post]);
  }
  const desc = (a: string, b: string) => (a < b ? 1 : -1);
  return [...years.entries()]
    .sort(([a], [b]) => desc(a, b))
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort(([a], [b]) => desc(a, b))
        .map(([key, posts]) => ({
          key,
          label: new Date(`${key}-01T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
          }),
          posts,
        })),
    }));
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readPost(`${slug}.md`);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
