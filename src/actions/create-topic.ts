'use server';

import { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'name must containe lowercase and dashes' }),
  description: z.string().min(10),
});

// this type to satisfied formState object
interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  data: FormData
): Promise<CreateTopicFormState> {
  //await new Promise((resolve) => setTimeout(resolve, 2500));

  const result = createTopicSchema.safeParse({
    name: data.get('name'),
    description: data.get('description'),
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

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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

  // TODO: revalidate the home page
  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));

  // return {
  //   errors: {},
  // };
}
