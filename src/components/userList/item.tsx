import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className={`relative mb-2 p-3 pr-10 cursor-pointer rounded-2xl border ${blocked ? "bg-gray-100 border-gray-100" : "bg-white border-gray-200/75 shadow-sm hover:shadow-md"}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {followed && (
                <button 
                    type="button" 
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        unfollowUser(user.user_id);
                    }}
                    title="Unfollow user"
                    className="absolute top-2 right-2"
                >
                    <CheckCircleIcon className="w-6 h-6 text-green-500 hover:text-green-600" />
                </button>
            )}

            {blocked && (
                <button 
                    type="button" 
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        unblockUser(user.user_id);
                    }}
                    title="Unblock user"
                    className="absolute top-2 right-2"
                >
                    <XCircleIcon className="w-6 h-6 text-red-500 hover:text-red-600" />
                </button>
            )}

            <div className={`flex space-x-4 items-top ${blocked ? "opacity-40" : ""}`}>
                <div>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={user.profile_image} alt={user.display_name} />
                    </div>
                </div>
                <div className="flex-grow">
                    <p className="text-md font-bold text-gray-600 mt-1 -mb-0.5 line-clamp-1">
                        {user.display_name}
                    </p>
                    <p className="text-sm text-gray-400 font-medium">
                        <span className="font-medium">Reputation:</span>{" "}
                        {user.reputation}
                    </p>

                    {isOpen && !blocked && (
                        <div className="space-x-1.5 mt-2">
                            {followed ? (
                                <Button 
                                    onClick={() => unfollowUser(user.user_id)}
                                    buttonType="primary"
                                >
                                    Unfollow
                                </Button>
                            ) : (
                                <Button 
                                    onClick={() => followUser(user.user_id)}
                                    buttonType="success"
                                >
                                    Follow
                                </Button>
                            )}
                            
                            <Button 
                                onClick={() => {
                                    blockUser(user.user_id);
                                    setIsOpen(false);
                                }}
                                buttonType="danger"
                            >
                                Block
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListItem;