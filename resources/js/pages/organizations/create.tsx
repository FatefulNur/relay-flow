import { Form, Head } from '@inertiajs/react';
import { Building2Icon, HashIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/organizations';

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

export default function Create() {
    const [organizationName, setOrganizationName] = useState('');
    const [organizationSlug, setOrganizationSlug] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);

    return (
        <div className="sm:p-5 md:px-5 md:pt-8 flex justify-center">
            <Head title="Create Organization" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <Fragment>
                        <section className="grid gap-5 rounded-xl border border-border/70 bg-muted/30 p-5">
                            <div className="flex items-center gap-2.5">
                                <Building2Icon className="size-4 text-muted-foreground" />
                                <SectionLabel>Add workspace</SectionLabel>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="organization_name">
                                    name
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
                                            setOrganizationSlug(slugify(value));
                                        }
                                    }}
                                />
                                <InputError
                                    message={errors.organization_name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="organization_slug">
                                    address
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
                                <InputError
                                    message={errors.organization_slug}
                                />
                            </div>
                        </section>

                        <Button
                            type="submit"
                            className="h-10 w-full"
                            tabIndex={7}
                            data-test="register-user-button"
                        >
                            {processing && <Spinner />}
                            Create Workspace
                        </Button>
                    </Fragment>
                )}
            </Form>
        </div>
    );
}

Create.layout = {
    title: 'Create your workspace',
    description:
        'Set up your organization in one pass — it takes under a minute',
};
