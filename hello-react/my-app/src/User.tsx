
import useSWR from 'swr';
import {fetcher} from './api'
import {User, UserProps} from './types'

// export function Profile() {
//   const { data, error, isLoading } = useSWR<User>('/api/user', fetcher);

//   if (error) return <div>failed to load</div>;
//   if (isLoading) return <div>loading...</div>;
//   if (!data) return null;
//   return <div>hello {data.name}!</div>;
// }



export const UserComponent: React.FC<UserProps> = ({ userId }) => {
  console.log(`Api is called, userId:${userId}`)
  
  const { data, error, isLoading } = useSWR<User>(
    `/api/user/${userId}:profile`, // APIエンドポイントを変更
    fetcher
  );

  console.log(`Api is called, response:${data?.id}`)
  console.log(`Api is called, response:${data?.name}`)

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  if (!data) {
    return <div>User profile not found</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {data.name}</p>
      <p>Email: {data.email}</p>
      {/* 他のプロフィール情報を表示 */}
    </div>
  );
};
