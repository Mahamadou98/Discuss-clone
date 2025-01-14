import PostCreateForm from '@/components/post/post-create-form';
import PostList from '@/components/post/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-2">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

export default TopicShowPage;
