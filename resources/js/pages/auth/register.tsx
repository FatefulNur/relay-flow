import { Form, Head } from '@inertiajs/react';
import { Building2Icon, HashIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

const slugify = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40);

function SectionLabel({ children }: { children: string }) {
    return (
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {children}
        </p>
    );
}

export default function Register({ passwordRules }: Props) {
    const [organizationName, setOrganizationName] = useState('');
    const [organizationSlug, setOrganizationSlug] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);

    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-8"
            >
                {({ processing, errors }) => (
                    <Fragment>
                        <section className="grid gap-5 rounded-xl border border-border/70 bg-muted/30 p-5">
                            <div className="flex items-center gap-2.5">
                                <Building2Icon className="size-4 text-muted-foreground" />
                                <SectionLabel>Your workspace</SectionLabel>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="organization_name">
                                    Organization name
                                </Label>
                                <Input
                                    id="organization_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="organization"
                                    name="organization_name"
                                    placeholder="Acme Robotics"
                                    value={organizationName}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setOrganizationName(value);

                                        if (!slugTouched) {
                                            setOrganizationSlug(
                                                slugify(value),
                                            );
                                        }
                                    }}
                                />
                                <InputError
                                    message={errors.organization_name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="organization_slug">
                                    Workspace address
                                </Label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                        <HashIcon className="size-3.5" />
                                    </span>
                                    <Input
                                        id="organization_slug"
                                        type="text"
                                        tabIndex={2}
                                        autoComplete="off"
                                        spellCheck={false}
                                        name="organization_slug"
                                        placeholder="acme-robotics"
                                        className="pl-9 font-mono text-sm"
                                        value={organizationSlug}
                                        onChange={(event) => {
                                            setSlugTouched(true);
                                            setOrganizationSlug(
                                                event.target.value,
                                            );
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Lowercase letters, numbers and hyphens.
                                    We&apos;ll suggest one as you type.
                                </p>
                                <InputError message={errors.organization_slug} />
                            </div>
                        </section>

                        <section className="grid gap-6">
                            <SectionLabel>Your details</SectionLabel>

                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={4}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={5}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={6}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                            </div>
                        </section>

                        <Button
                            type="submit"
                            className="h-10 w-full"
                            tabIndex={7}
                            data-test="register-user-button"
                        >
                            {processing && <Spinner />}
                            Create account
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={8}>
                                Log in
                            </TextLink>
                        </div>
                    </Fragment>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create your workspace',
    description:
        'Set up your organization and account in one pass — it takes under a minute',
};
