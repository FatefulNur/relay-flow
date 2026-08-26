import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const STAGE_BG = 'var(--relay-stage, #070c16)';
const ACCENT = 'var(--relay-accent, #f5a524)';

function RelayConstellation() {
    const links = [
        { path: 'M92 448 L232 336', dur: '5.2s', begin: '0s' },
        { path: 'M232 336 L398 402', dur: '4.4s', begin: '1.6s' },
        { path: 'M398 402 L508 252', dur: '6s', begin: '0.9s' },
        { path: 'M232 336 L306 168', dur: '5.6s', begin: '2.4s' },
        { path: 'M306 168 L508 252', dur: '4.8s', begin: '0.4s' },
        { path: 'M120 120 L306 168', dur: '5s', begin: '1.1s' },
    ];

    const nodes = [
        { cx: 92, cy: 448, r: 7 },
        { cx: 232, cy: 336, r: 10 },
        { cx: 398, cy: 402, r: 6 },
        { cx: 508, cy: 252, r: 9 },
        { cx: 306, cy: 168, r: 7 },
        { cx: 120, cy: 120, r: 5 },
    ];

    return (
        <svg
            viewBox="0 0 600 520"
            fill="none"
            className="pointer-events-none absolute top-1/2 left-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90"
            aria-hidden="true"
        >
            <g stroke={ACCENT} strokeOpacity="0.16" strokeWidth="1">
                {links.map((link) => (
                    <path key={link.path} d={`${link.path}`} />
                ))}
            </g>

            <g stroke={ACCENT} strokeOpacity="0.07" strokeWidth="1">
                <path d="M92 448 L120 120" />
                <path d="M120 120 L508 252" />
            </g>

            {links.map((link) => (
                <circle key={`pulse-${link.path}`} r="2.75" fill={ACCENT}>
                    <animateMotion
                        dur={link.dur}
                        begin={link.begin}
                        repeatCount="indefinite"
                        path={`${link.path}`}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="spline"
                        keySplines="0.35 0 0.65 1"
                    />
                    <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.15;0.85;1"
                        dur={link.dur}
                        begin={link.begin}
                        repeatCount="indefinite"
                    />
                </circle>
            ))}

            {nodes.map((node, index) => (
                <g key={`${node.cx}-${node.cy}`}>
                    <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill={STAGE_BG}
                        stroke={ACCENT}
                        strokeOpacity="0.55"
                        strokeWidth="1.25"
                    />
                    <circle cx={node.cx} cy={node.cy} r="2" fill={ACCENT} />
                    {(index === 1 || index === 3) && (
                        <>
                            <circle
                                cx={node.cx}
                                cy={node.cy}
                                r={node.r}
                                fill="none"
                                stroke={ACCENT}
                                strokeWidth="1"
                                opacity="0.4"
                            >
                                <animate
                                    attributeName="r"
                                    values={`${node.r};${node.r * 3.4}`}
                                    dur="4s"
                                    begin={`${index * 0.9}s`}
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0.45;0"
                                    dur="4s"
                                    begin={`${index * 0.9}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </>
                    )}
                </g>
            ))}
        </svg>
    );
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="flex min-h-svh bg-background lg:grid lg:h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <aside
                aria-hidden="true"
                className="relative hidden min-h-0 select-none overflow-hidden lg:flex lg:h-full lg:flex-col lg:justify-between xl:p-14"
                style={{
                    backgroundColor: STAGE_BG,
                    color: 'oklch(0.96 0.01 95)',
                }}
            >
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `radial-gradient(44rem 44rem at 14% 8%, color-mix(in oklab, ${ACCENT} 13%, transparent), transparent 62%), radial-gradient(38rem 38rem at 88% 94%, color-mix(in oklab, ${ACCENT} 7%, transparent), transparent 60%)`,
                    }}
                />

                <RelayConstellation />

                <div
                    className="pointer-events-none absolute inset-0 mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
                        opacity: 0.06,
                    }}
                />

                <div
                    className="relay-rise relative z-10 flex items-center gap-3 p-10 xl:p-0"
                    style={{ animationDelay: '0ms' }}
                >
                    <span
                        className="flex size-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: ACCENT }}
                    >
                        <AppLogoIcon className="size-5 fill-current text-[#070c16]" />
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight">
                        {name}
                    </span>
                </div>

                <div
                    className="relay-rise relative z-10 px-10 pb-12 xl:p-0"
                    style={{ animationDelay: '140ms' }}
                >
                    <p className="font-display text-[clamp(1.85rem,2.4vw,3rem)] leading-[1.12] font-semibold tracking-tight text-balance">
                        <span className="block">Signal in.</span>
                        <span className="block" style={{ color: ACCENT }}>
                            Motion out.
                        </span>
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
                        {name} routes your team&apos;s work from first ping to
                        final handoff — every hand-off clean, every hop fast.
                    </p>
                    <div className="mt-8 flex items-center gap-2.5">
                        <span className="relative flex size-2">
                            <span
                                className="absolute inline-flex size-full rounded-full"
                                style={{
                                    backgroundColor: ACCENT,
                                    animation:
                                        'relay-pulse-ring 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                                }}
                            />
                            <span
                                className="relative inline-flex size-2 rounded-full"
                                style={{ backgroundColor: ACCENT }}
                            />
                        </span>
                        <span className="text-xs tracking-widest text-white/45 uppercase">
                            All relays operational
                        </span>
                    </div>
                </div>
            </aside>

            <main className="relay-grid relative flex flex-1 flex-col items-center gap-6 p-6 md:p-10 lg:h-full lg:min-h-0 lg:overflow-y-auto">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(30rem 30rem at 50% 42%, transparent 20%, var(--background) 78%)',
                    }}
                />

                <div className="relative z-10 my-auto w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <Link
                            href={home()}
                            className="flex items-center gap-2.5 font-medium"
                        >
                            <span
                                className="flex size-8 items-center justify-center rounded-md"
                                style={{ backgroundColor: ACCENT }}
                            >
                                <AppLogoIcon className="size-4.5 fill-current text-[#070c16]" />
                            </span>
                            <span className="font-display text-base font-semibold tracking-tight">
                                {name}
                            </span>
                        </Link>
                    </div>

                    <div
                        className="relay-rise space-y-2"
                        style={{ animationDelay: '80ms' }}
                    >
                        <h1 className="font-display text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div
                        className="relay-rise mt-8"
                        style={{ animationDelay: '180ms' }}
                    >
                        {children}
                    </div>

                    <p className="mt-10 text-center text-xs text-muted-foreground/70">
                        Protected by throttled sessions and encrypted
                        transport.
                    </p>
                </div>
            </main>
        </div>
    );
}
