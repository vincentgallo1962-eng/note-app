import { atom } from 'jotai';
import { User } from '../users/user.entity';

export const currentUserAtom = atom<User>();

// const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
// const currentUser = useAtomValue(currentUserAtom);
// const setCurrentUser = useSetAtom(currentUserAtom);