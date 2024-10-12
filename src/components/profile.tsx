'use client';

import { useSession } from 'next-auth/react';

function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return (
      <div className="bg-green-300 text-green-800 p-3 rounded-md border w-60">
        from client: {JSON.stringify(session.data.user)}
      </div>
    );
  }

  return (
    <div className="bg-red-300 text-red-800 p-3 rounded-md border w-60">
      from cient: user is not signed in
    </div>
  );
}

export default Profile;
