import { useEffect } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../../hooks/redux'; 
import { STACK_EXCHANGE_USERS_API } from '../../constants/api';
import { User } from '../../types/user';
import UserListItem from './item';
import { 
    setUsers, 
    followUser, 
    unfollowUser, 
    blockUser, 
    unblockUser, 
    setErrorMessage
} from '../../store/slices/usersSlice';
import ErrorAlert from '../errorAlert';

const UserList = () => {
    const {
        users,
        followedUsers,
        blockedUsers,
        errorMessage
    } = useAppSelector((state: any) => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem("users")) {
            const cachedUsers = JSON.parse(localStorage.getItem("users") || "");
            dispatch(setUsers(cachedUsers));
            console.log("[cachedUsers]", cachedUsers);
        }

        const mockedUsers: User[] = [
            {
                user_id: 1,
                display_name: "John Doe",
                profile_image: "https://via.placeholder.com/150",
                reputation: 100
            },
            {
                user_id: 2,
                display_name: "Jane Doe",
                profile_image: "https://via.placeholder.com/150",
                reputation: 200
            },
            {
                user_id: 3,
                display_name: "John Smith",
                profile_image: "https://via.placeholder.com/150",
                reputation: 300
            },
        ];
        dispatch(setUsers(mockedUsers));

        axios.get(STACK_EXCHANGE_USERS_API)
            .then(function (response) {
                // handle success
                const userData = response.data.items.map((item: User) => {
                    return {
                        user_id: item.user_id,
                        display_name: item.display_name,
                        profile_image: item.profile_image,
                        reputation: item.reputation
                    }
                });
                console.log("[userData]", userData);
                dispatch(setUsers(userData));
                localStorage.setItem("users", JSON.stringify(userData));
            })
            .catch(function (error) {
                // handle error
                console.log("[error]", error);
                dispatch(setErrorMessage(error.message));
            })
            .finally(function () {
                // always executed
            });
    }, [dispatch]);

    return (
        <div className="py-5">
            <h1 className="text-2xl text-gray-900 mb-2">Users</h1>

            {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

            {users && users.length > 0 && users.map((user: User) => {
                const followed = followedUsers ? followedUsers.includes(user.user_id) : false;
                const blocked = blockedUsers ? blockedUsers.includes(user.user_id) : false;

                return (
                    <div key={user.user_id}>
                        <UserListItem
                            user={user}
                            followed={followed}
                            blocked={blocked}
                            followUser={() => dispatch(followUser(user.user_id))}
                            unfollowUser={() => dispatch(unfollowUser(user.user_id))}
                            blockUser={() => dispatch(blockUser(user.user_id))}
                            unblockUser={() => dispatch(unblockUser(user.user_id))}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default UserList;