import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopic = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}{' '}
          </Chip>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-wrap flex-row gap-2 mt-6">{renderedTopic}</div>
  );
}
