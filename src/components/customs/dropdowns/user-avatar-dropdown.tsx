import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
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
                    src={user.avatarUrl || 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'}
                    onClick={() => { }}
                    size='sm'

                />
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
                <DropdownSection showDivider>
                    <DropdownItem key='profile-info' className='h-14 gap-2 text-center opacity-100 cursor-default' isReadOnly>
                        <p className='font-semibold text-sm'>Signed in as</p>
                        <p className='font-semibold text-xs text-primary truncate max-w-[200px]'>
                            {user.email}
                        </p>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem
                        className='font-semibold'
                        key='points'
                    >
                        <Link
                            href='/user/dashboard/points'
                            className='text-sm w-full'
                        >
                            {user.points} pts
                        </Link>
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
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem
                        className='font-semibold text-danger'
                        key='delete'
                        color='danger'
                        startContent={<LogOut size={16} />}
                        onPress={logout}
                    >
                        Logout
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}