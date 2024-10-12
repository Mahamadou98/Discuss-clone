'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/react';
import * as actions from '@/actions';

export function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={actions.search}>
      <Input
        name="term"
        defaultValue={searchParams.get('term') || ''}
        placeholder="search something here..."
      />
    </form>
  );
}
