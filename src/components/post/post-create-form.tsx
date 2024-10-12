'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  // we have to bind the slug to useFormState hook
  // without this hook we will do
  // action = actions.createPost.bind(null, slug)
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );
  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">create post</Button>
        </PopoverTrigger>
        <PopoverContent className="block mt-14">
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80 bg-slate-200">
              <Input
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(', ')}
                labelPlacement="outside"
                label="Title"
                name="title"
                placeholder="post title"
              />
              <Textarea
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(', ')}
                labelPlacement="outside"
                label="Content"
                name="content"
                placeholder="post description"
              />
              {formState.errors._form && (
                <div className="p-2 bg-red-50 border border-red-200 rounded text-red-500">
                  {formState.errors._form?.join(', ')}
                </div>
              )}
              <FormButton>Create topic</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
