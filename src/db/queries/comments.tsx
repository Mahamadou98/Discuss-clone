import type { Comment } from '@prisma/client';
import { db } from '@/db';
import { cache } from 'react';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

//we can also write this type as follow
//type CommentWithAuthor2 = Awaited<ReturnType<typeof fetchCommentsByPostId>>[];

// Another side note here: we use a react Querry memozation concept to make a single request
// in all component that call this query.
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
