import axios from "axios";

import { STACK_EXCHANGE_USERS_API } from '../constants/api';

export const getUsers = async (pageNumber: number) => {
    const response = await axios.get(`${STACK_EXCHANGE_USERS_API}&page=${pageNumber}`);
    return response;
}
