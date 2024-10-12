import { TopicCreateForm } from '@/components/topic/topic-create-form';
import TopicList from '@/components/topic/topic-list';
import { Divider } from '@nextui-org/react';
import PostList from '@/components/post/post-list';
import { fetchTopPost } from '@/db/queries/posts';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl m-2 font-bold">Top Posts</h1>
        <PostList fetchData={fetchTopPost} />
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-3" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
