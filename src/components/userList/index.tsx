import { useEffect, useState } from 'react';
import axios from 'axios';

import { STACK_EXCHANGE_USERS_API } from '../../constants/api';
import { User } from '../../types/user';
import UserListItem from './item';

const UserList = () => {
    const [users, setUsers] = useState<User[] | null>(null);

    const [followedUsers, setFollowedUsers] = useState<number[] | null>(null);
    const [blockedUsers, setBlockedUsers] = useState<number[] | null>(null);

    const { isOnline } = useNetworkStatusChecker();

    useEffect(() => {
        axios.get(STACK_EXCHANGE_USERS_API)
            .then(function (response) {
                // handle success
                console.log("success", response.data.items);
                const userData = response.data.items.map((item: User) => {
                    return {
                        user_id: item.user_id,
                        display_name: item.display_name,
                        profile_image: item.profile_image,
                        reputation: item.reputation
                    }
                });
                setUsers(userData);
            })
            .catch(function (error) {
                // handle error
                console.log("error", error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    const followUser = (userId: number) => {
        if (blockedUsers && blockedUsers.includes(userId)) {
            return;
        }

        if (followedUsers) {
            return setFollowedUsers([...followedUsers, userId]);
        }    
        setFollowedUsers([userId]);
    };

    const unfollowUser = (userId: number) => {
        if (followedUsers) {
            const filteredUsers = followedUsers.filter((id: number) => id !== userId);
            setFollowedUsers(filteredUsers);
        }
    };

    const blockUser = (userId: number) => {
        if (followedUsers && followedUsers.includes(userId)) {
            const filteredUsers = followedUsers.filter((id: number) => id !== userId);
            setFollowedUsers(filteredUsers);
        }

        if (blockedUsers) {
            return setBlockedUsers([...blockedUsers, userId]);
        }
        setBlockedUsers([userId]);
    };

    const unblockUser = (userId: number) => {
        if (blockedUsers) {
            const filteredUsers = blockedUsers.filter((id: number) => id !== userId);
            setBlockedUsers(filteredUsers);
        }
    };

    return (
        <div className="py-5">
            <h1 className="text-2xl text-gray-900 mb-2">
                Users
            </h1>

            {users && users.length > 0 && users.map((user: User) => {
                const followed = followedUsers ? followedUsers.includes(user.user_id) : false;
                const blocked = blockedUsers ? blockedUsers.includes(user.user_id) : false;

                return (
                    <div key={user.user_id}>
                        <UserListItem
                            user={user}
                            followed={followed}
                            blocked={blocked}
                            followUser={() => followUser(user.user_id)}
                            unfollowUser={() => unfollowUser(user.user_id)}
                            blockUser={() => blockUser(user.user_id)}
                            unblockUser={() => unblockUser(user.user_id)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default UserList;