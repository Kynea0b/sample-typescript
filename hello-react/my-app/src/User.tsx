import useSWR from "swr";
import { fetcher } from "./api";
import { User, UserProps, UserNameAndMailProps } from "./types";

export const UserIdComponent: React.FC<UserNameAndMailProps> = ({
  userName,
  userMail,
}) => {
  console.log(`Api is called, Name:${userName}`);
  console.log(`Api is called, Mail:${userMail}`);

  // /api/user/<string:name>/email/<string:email>
  const { data, error, isLoading } = useSWR<User>(
    `/api/user/${userName}/email/${userMail}`, // APIエンドポイントを変更
    fetcher,
  );

  console.log(`Api is called, response:${data?.id}`);

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
      <h2>User ID</h2>
      <p>UserID: {data.id}</p>
    </div>
  );
};

export const UserComponent: React.FC<UserProps> = ({ userId }) => {
  console.log(`Api is called, userId:${userId}`);

  const { data, error, isLoading } = useSWR<User>(
    `api/users/${userId}`, // APIエンドポイントを変更
    fetcher,
  );

  console.log(`Api is called, response:${data?.id}`);
  console.log(`Api is called, response:${data?.name}`);

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
