import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import OrganizationsController from '@/routes/organizations';

type Organization = {
    name: string;
    slug: string;
};

export default function SwitchOrganization({ organizations }: { organizations: Organization[] }) {
    const [selectedSlug, setSelectedSlug] = useState<string>(organizations[0].slug);

    const selectedOrganization = organizations.find(
        (organization) => organization.slug === selectedSlug,
    );

    return (
        <>
            <Head title="Switch organization" />

            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <span className="text-sm text-muted-foreground">
                        Current organization
                    </span>
                    <p className="font-medium">{selectedOrganization?.name}</p>
                    <code className="text-xs text-muted-foreground">
                        Slug: {selectedOrganization?.slug}
                    </code>
                </div>

                <Form
                    {...(selectedOrganization &&
                        OrganizationsController.switch.form({
                            organization: selectedOrganization.slug,
                        }))}
                    disableWhileProcessing
                    className="flex flex-col gap-8"
                >
                    <div className="grid gap-2">

                        <Select
                            value={selectedSlug}
                            onValueChange={(value) => setSelectedSlug(value)}
                        >
                            <SelectTrigger
                                id="organization"
                                className="w-full"
                                aria-label="Select organization"
                            >
                                <SelectValue placeholder="Choose an organization" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Organizations</SelectLabel>
                                    {organizations.map((organization) => (
                                        <SelectItem
                                            key={organization.slug}
                                            value={organization.slug}
                                            disabled={
                                                organization.slug ===
                                                selectedOrganization?.slug
                                            }
                                        >
                                            {organization.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 h-10 w-full"
                        disabled={!selectedOrganization}
                    >
                        Switch organization
                    </Button>
                </Form>
            </div>
        </>
    );
}

SwitchOrganization.layout = {
    title: 'Switch organization',
    description: 'Pick which organization workspace you want to work in',
};
