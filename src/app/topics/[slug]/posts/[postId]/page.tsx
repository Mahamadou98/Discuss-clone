import Link from 'next/link';
import { Suspense } from 'react';
import PostShow from '@/components/post/post-show';
import CommentList from '@/components/comments/comment-list';
import { PostShowLoading } from '@/components/post/post-show-loading';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/paths';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
        <CommentCreateForm postId={postId} startOpen />
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}
