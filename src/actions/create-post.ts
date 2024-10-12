'use server';

import { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { db } from '@/db';
import { z } from 'zod';
import paths from '@/paths';
import { redirect } from 'next/navigation';

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'name must containe lowercase and dashes' }),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session?.user) {
    return {
      errors: {
        _form: ['You must be sign in to do this'],
      },
    };
  }
  //retrieve topic with a specific slug
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: [`Can't find a topic with this ${slug}`],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(slug, post.id));
  // return {
  //   errors: {},
  // };
}
