import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// A nother way of writting type definition
// but this way don't need a fetchPostsByTopicSlug function to have
// return type annotation
//export type PostWithData1 = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[];

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPost(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: {
      comments: { _count: 'desc' },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
