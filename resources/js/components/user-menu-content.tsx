import { Link, router, usePage } from '@inertiajs/react';
import { Building2, Check, LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import organizations from '@/routes/organizations';
import type { SharedData } from '@/types';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const { organization } = usePage<SharedData>().props;

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const matchOrganization = (org) => org.id === organization.id;

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user.organizations && user.organizations.length > 0 && (
                <>
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer inline-flex gap-2 w-full">
                                <Building2 className="mr-2 text-muted-foreground" size="16" />
                                Organizations
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {user.organizations.map((org) => (
                                        <DropdownMenuItem key={org.id} asChild>
                                            <Link
                                                className={`flex gap-2 justify-between w-full ${matchOrganization(org) ? 'bg-muted text-muted-foreground cursor-default' : 'cursor-pointer'}`}
                                                href={organizations.switch({ slug: org.slug })}
                                                method="post"
                                                onClick={cleanup}
                                                preserveScroll
                                                disabled={matchOrganization(org)}
                                            >
                                                {org.name}

                                                {matchOrganization(org) && (<Check />)}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </>
            )}

            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}