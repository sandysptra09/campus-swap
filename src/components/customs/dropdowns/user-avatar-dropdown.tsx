import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Link,
} from '@heroui/react';
import { Home, User, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function UserAvatarDropdown() {

    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Dropdown>
            <DropdownTrigger className='cursor-pointer'>
                <Avatar
                    src='https://i.pravatar.cc/150?img=1'
                    onClick={() => { }}
                    size='sm'
                />
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
                <DropdownItem
                    className='font-semibold'
                    key='coins'
                >
                    <Link
                        href='/user/dashboard/points'
                        className='text-base w-full'
                    >
                        {user.points} pts
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='dashboard'
                    startContent={<Home size={18} />}
                >
                    <Link
                        href='/user/profile'
                        className='text-base w-full'
                    >
                        Dashboard
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='profile'
                    startContent={<User size={18} />}
                >
                    <Link
                        href='/user/dashboard/profile'
                        className='text-base w-full'
                    >
                        My Profile
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='profile'
                >
                    <Link
                        href='/user/dashboard/my-items'
                        className='text-base w-full'
                    >
                        My Items
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='profile'
                    startContent={<Heart size={18} />}
                >
                    <Link
                        href='/user/dashboard/wishlist'
                        className='text-base w-full'
                    >
                        Wishlist
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='settings'
                    startContent={<Settings size={18} />}
                >
                    <Link
                        href='/user/settings'
                        className='text-base w-full'
                    >
                        Settings
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold text-danger'
                    key='delete'
                    color='danger'
                    startContent={<LogOut size={18} />}
                    onClick={logout}
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}