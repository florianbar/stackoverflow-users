import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { STACK_EXCHANGE_USERS_API } from '../../constants/api';
import { User } from '../../types/user';

const UserList = () => {
    const [users, setUsers] = useState<User[] | null>(null);

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
    
    return (
        <div className="py-5">
            {users && users.length > 0 && users.map((user: User) => {
                return (
                    <div 
                        key={user.user_id}
                        className="mb-2 p-4 bg-gray-100 rounded-2xl"
                    >
                        <div className="flex space-x-4 items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img 
                                    src={user.profile_image} 
                                    alt={user.display_name} 
                                />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-800">{user.display_name}</p>
                                <p>Reputation: {user.reputation}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserList;