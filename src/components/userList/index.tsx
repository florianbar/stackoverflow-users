import { useEffect, useMemo } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux'; 
import { User } from '../../types/user';
import UserListItem from './item';
import { 
    setUsers, 
    followUser, 
    unfollowUser, 
    blockUser, 
    unblockUser,
    incrementPageNumber,
    decrementPageNumber, 
    setPageNumber,
    setErrorMessage,
    setUsersLoading
} from '../../store/slices/usersSlice';
import Alert from '../alert';
import EmptyList from './emptyList';
import Button from '../button';
import Pagination from './pagination';
import { getUsers } from '../../utils/api';

const UserList = () => {
    const {
        users,
        usersLoading,
        pageNumber,
        followedUsers,
        blockedUsers,
        errorMessage
    } = useAppSelector((state: any) => state.users);
    const dispatch = useAppDispatch();

    const clearUsersFromLocalStorage = () => {
        localStorage.removeItem("users");
        dispatch(setPageNumber(1));
    };

    const showEmptyList = useMemo(() => {
        if (users && users.length === 0) return true;
        if (usersLoading) return true;
        if (errorMessage) return true;
        return false;
    }, [usersLoading, users, errorMessage]);

    useEffect(() => {
        let paginatedUsers: any[] = [];

        if (localStorage.getItem("users")) {
            paginatedUsers = JSON.parse(localStorage.getItem("users") || "") || [];
        }
            
        if (paginatedUsers[pageNumber-1] && paginatedUsers[pageNumber-1]?.users) {
            console.log("[paginatedUsers[pageNumber].users]", paginatedUsers[pageNumber-1].users);
            dispatch(setUsers(paginatedUsers[pageNumber-1].users));
            return;
        }

        console.log("axios call");

        dispatch(setUsers(null));
        dispatch(setUsersLoading(true));

        async function fetchUserData() {
            try {
                const response = await getUsers(pageNumber);
                const userData = response.data.items.map((item: User) => {
                    return {
                        user_id: item.user_id,
                        display_name: item.display_name,
                        profile_image: item.profile_image,
                        reputation: item.reputation
                    }
                });
                dispatch(setUsers(userData));
                dispatch(setUsersLoading(false));

                paginatedUsers[pageNumber-1] = { users: userData };
                localStorage.setItem("users", JSON.stringify(paginatedUsers));
            } catch (error: any) {
                console.log("[error]", error);
                dispatch(setErrorMessage(error.message));
                dispatch(setUsersLoading(false));
            }
        }
        fetchUserData();
    }, [dispatch, pageNumber]);

    return (
        <div className="py-5">
            <div className="sm:flex sm:justify-between items-center mb-8 text-center sm:text-left">
                <h1 className="text-2xl text-gray-900 mb-1 sm:mb-0">
                    StackOverflow Users
                </h1>
                <Button 
                    buttonType="primary"
                    onClick={() => clearUsersFromLocalStorage()}
                >
                    Clear cached data
                </Button>
            </div>

            {errorMessage && <Alert type="danger">{errorMessage}</Alert>}

            <Pagination
                pageNumber={pageNumber}
                usersLoading={usersLoading}
                prevPage={() => dispatch(decrementPageNumber())}
                nextPage={() => dispatch(incrementPageNumber())}
            />

            {showEmptyList && <EmptyList />}

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

            <Pagination
                pageNumber={pageNumber}
                usersLoading={usersLoading}
                prevPage={() => dispatch(decrementPageNumber())}
                nextPage={() => dispatch(incrementPageNumber())}
            />
        </div>
    );
}

export default UserList;