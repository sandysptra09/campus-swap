import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Divider,
    Link,
} from '@heroui/react';
import { Home, User, Heart, Package, Settings, LogOut } from 'lucide-react';
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
                        className='text-sm w-full'
                    >
                        0 pts
                    </Link>
                    <Divider className='mt-2' />
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='dashboard'
                    startContent={<Home size={16} />}
                >
                    <Link
                        href='/user/dashboard'
                        className='text-sm w-full'
                    >
                        Dashboard
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='profile'
                    startContent={<User size={16} />}
                >
                    <Link
                        href='/user/dashboard/profile'
                        className='text-sm w-full'
                    >
                        My Profile
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='my-items'
                    startContent={<Package size={16} />}
                >
                    <Link
                        href='/user/dashboard/my-items'
                        className='text-sm w-full'
                    >
                        My Items
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='wishlist'
                    startContent={<Heart size={16} />}
                >
                    <Link
                        href='/user/dashboard/wishlist'
                        className='text-sm w-full'
                    >
                        Wishlist
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold'
                    key='settings'
                    startContent={<Settings size={16} />}
                >
                    <Link
                        href='/user/dashboard/settings'
                        className='text-sm w-full'
                    >
                        Settings
                    </Link>
                </DropdownItem>
                <DropdownItem
                    className='font-semibold text-danger'
                    key='delete'
                    color='danger'
                    startContent={<LogOut size={16} />}
                    onClick={logout}
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}