import { Inter } from "next/font/google";
import Image from "next/image";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { type FC } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface BlogProps {
  posts: {
    slug: string;
    blogFront: {
      title: string;
      date: string;
      shortDescription: string;
      blogImage: string;
      category: string;
    };
  }[];
}
const blog: FC<BlogProps> = ({ posts }) => {
  const categoriesToShow = ["Highlight", "Development", "UXUI"];

  const filteredPosts: { [key: string]: any[] } = {
    Highlight: [],
    Development: [],
    UXUI: [],
  };
  posts.forEach((post) => {
    const { category } = post.blogFront;

    if (categoriesToShow.includes(category)) {
      filteredPosts[category].push(post);
    }
  });

  const filteredPostsArray = Object.values(filteredPosts);

  return (
    <main
      className={`${inter.className} w-full py-[40%] md:py-[15%] px-padXMobile md:px-padX flex flex-wrap items-center justify-center gap-10`}
    >
      {filteredPostsArray.map((arr, i) => {
        const id0 = Math.floor(Math.random() * 20);
        return (
          <div className="w-4/5 mx-auto" key={id0}>
            <div className="w-full flex items-start justify-between">
              <h2 className="text-4xl font-bold mb-10">
                {categoriesToShow[i]}
              </h2>
              <Link href={`categories/${categoriesToShow[i].toLowerCase()}`}>
                View all from {categoriesToShow[i].toLowerCase()}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center gap-4 flex-wrap">
              {arr.map(({ blogFront, slug }, j) => {
                const id = Math.floor(Math.random() * 20);
                const { title, date, shortDescription, blogImage } = blogFront;

                return (
                  <div key={id}>
                    <Image
                      alt={title}
                      src={blogImage}
                      width={320}
                      height={320}
                      className="rounded-xl w-[20rem] h-[20rem]"
                    />
                    <div>
                      <p className="my-2 text-gray-500 font-thin">
                        Posted on {date}
                      </p>
                      <h2 className="text-2xl font-semibold my-5 max-w-[20rem]">
                        {title}
                      </h2>
                      <p className="font-light mb-5 max-w-[20rem]">
                        {shortDescription}
                      </p>
                      <Link
                        style={{
                          background: "#ea7210",
                          padding: "10px",
                          borderRadius: "12px",
                          color: "white",
                        }}
                        href={`/blog/${slug}`}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: blogFront } = matter(markdownWithMeta);

    return {
      slug,
      blogFront,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default blog;
