import { User } from '../../types/user';
import Button from '../button';

interface UserListItemProps {
    user: User;
    blocked?: boolean;
    followed?: boolean;
    unfollowUser: (userId: number) => void;
    followUser: (userId: number) => void;
    blockUser: (userId: number) => void;
    unblockUser: (userId: number) => void;
};

const UserListItem = ({ 
    user,
    followed = false, 
    blocked = false,
    unfollowUser,
    followUser,
    blockUser,
    unblockUser
}: UserListItemProps) => {
    return (
        <div className="mb-2 p-4 bg-gray-100 rounded-2xl">
            <div className="flex space-x-4 items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                        src={user.profile_image} 
                        alt={user.display_name} 
                    />
                </div>
                <div>
                    <p className="text-lg font-bold text-gray-800">{user.display_name}</p>
                    <p className="mb-2">Reputation: {user.reputation}</p>

                    {followed && <p>Followed</p>}
                    {blocked && <p>Blocked</p>}

                    <div className="space-x-1">
                        {!blocked && (
                            <>
                                {followed ? (
                                    <Button onClick={() => unfollowUser(user.user_id)}>Unfollow</Button>
                                ) : (
                                    <Button onClick={() => followUser(user.user_id)}>Follow</Button>
                                )}
                            </>
                        )}
                        
                        {blocked ? (
                            <Button onClick={() => unblockUser(user.user_id)}>Unblock</Button>
                        ) : (
                            <Button onClick={() => blockUser(user.user_id)}>Block</Button>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListItem;