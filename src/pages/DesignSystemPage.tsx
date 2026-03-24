import { useState, useEffect, useRef, useCallback } from "react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import {
    motion,
    AnimatePresence,
    useAnimationControls,
    useMotionValue,
    useMotionTemplate,
    useSpring,
    useInView,
    animate,
} from "framer-motion"
import {
    Display, H2, H5,
    BodyLarge, Body, Caption,
} from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FormCard, RlusdIcon } from "@/components/ui/form-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { InputNumber } from "@/components/ui/input-number"
import { Segmented } from "@/components/ui/segmented"
import { DatePicker } from "@/components/ui/date-picker"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
    Command, CommandEmpty, CommandGroup, CommandInput,
    CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tag } from "@/components/ui/tag"
import { Timeline } from "@/components/ui/timeline"
import type { TimelineItem } from "@/components/ui/timeline"
import { KpiCard } from "@/components/ui/kpi-card"
import { EmptyState } from "@/components/ui/empty-state"
import { DollarSign, ArrowUpRight, Wallet, Inbox, ChevronDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem,
    NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Stepper } from "@/components/ui/stepper"
import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription,
    DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Sheet, SheetClose, SheetContent, SheetDescription,
    SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import {
    ContextMenu, ContextMenuContent, ContextMenuItem,
    ContextMenuSeparator, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/* ─── Color palette ─── */

const grayScale = [
    { name: "Gray 25", hex: "#F8F8F8", light: true },
    { name: "Gray 50", hex: "#F2F2F3", light: true },
    { name: "Gray 100", hex: "#E4E5E7", light: true },
    { name: "Gray 200", hex: "#C9CBCF", light: true },
    { name: "Gray 300", hex: "#ACB1B9", light: true },
    { name: "Gray 400", hex: "#8F96A3", light: false },
    { name: "Gray 500", hex: "#707A8F", light: false },
    { name: "Gray 600", hex: "#5B6074", light: false },
    { name: "Gray 700", hex: "#404759", light: false },
    { name: "Gray 800", hex: "#2A2F3C", light: false },
    { name: "Gray 900", hex: "#14171F", light: false },
]
const blueScale = [
    { name: "Blue 100", hex: "#F2FAFF", light: true },
    { name: "Blue 200", hex: "#B5DFFF", light: true },
    { name: "Blue 300", hex: "#78BEFF", light: true },
    { name: "Blue 400", hex: "#3B96FF", light: false },
    { name: "Blue 500", hex: "#006AFF", light: false },
    { name: "Blue 600", hex: "#004BCC", light: false },
    { name: "Blue 700", hex: "#003D99", light: false },
    { name: "Blue 800", hex: "#001B66", light: false },
    { name: "Blue 900", hex: "#000B33", light: false },
]
const secondaryPalettes = [
    { name: "Green", shades: [{ num: 100, hex: "#BDF5EF", light: true }, { num: 200, hex: "#7AE0D6", light: true }, { num: 300, hex: "#009994", light: false }, { num: 400, hex: "#05696D", light: false }, { num: 500, hex: "#09262B", light: false }] },
    { name: "Purple", shades: [{ num: 100, hex: "#D1D5FF", light: true }, { num: 200, hex: "#A19DFF", light: true }, { num: 300, hex: "#6C47FF", light: false }, { num: 400, hex: "#4417BF", light: false }, { num: 500, hex: "#2B0160", light: false }] },
    { name: "Pink", shades: [{ num: 100, hex: "#E9DEFF", light: true }, { num: 200, hex: "#D191FF", light: true }, { num: 300, hex: "#C247FF", light: false }, { num: 400, hex: "#7B099E", light: false }, { num: 500, hex: "#39003D", light: false }] },
    { name: "Orange", shades: [{ num: 100, hex: "#FFDCD0", light: true }, { num: 200, hex: "#FEB9A7", light: true }, { num: 300, hex: "#FF7F66", light: false }, { num: 400, hex: "#CB4526", light: false }, { num: 500, hex: "#471200", light: false }] },
]

/* ─── Motion data ─── */

const durations = [
    { name: "instant", value: "0ms", desc: "No delay — immediate feedback" },
    { name: "fast", value: "100ms", desc: "Micro-interactions, toggles" },
    { name: "normal", value: "200ms", desc: "Most UI transitions" },
    { name: "moderate", value: "300ms", desc: "Modals, drawers, overlays" },
    { name: "slow", value: "500ms", desc: "Page transitions, hero elements" },
    { name: "deliberate", value: "700ms", desc: "Onboarding, first-run flows" },
]

const easings = [
    { name: "ease-out", css: "cubic-bezier(0, 0, 0.2, 1)", desc: "Elements entering the screen" },
    { name: "ease-in", css: "cubic-bezier(0.4, 0, 1, 1)", desc: "Elements leaving the screen" },
    { name: "ease-in-out", css: "cubic-bezier(0.4, 0, 0.2, 1)", desc: "Elements moving within the screen" },
    { name: "spring", css: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Playful, elastic interactions" },
    { name: "linear", css: "linear", desc: "Looping animations, progress" },
]

type MotionPattern = {
    name: string; desc: string; durationMs: number; ease: string
    initial: Record<string, unknown>; animate: Record<string, unknown>
    spring?: Record<string, unknown>; perspective?: number
}

const motionPatterns: MotionPattern[] = [
    { name: "Fade In", desc: "opacity: 0 → 1", durationMs: 200, ease: "easeOut", initial: { opacity: 0 }, animate: { opacity: 1 } },
    { name: "Slide Up", desc: "translateY(8px) + fade", durationMs: 200, ease: "easeOut", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
    { name: "Slide Down", desc: "translateY(−8px) + fade", durationMs: 200, ease: "easeOut", initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 } },
    { name: "Slide Over", desc: "translateX(40px) + fade", durationMs: 300, ease: "easeOut", initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    { name: "Scale In", desc: "scale(0.95) + fade", durationMs: 150, ease: "easeOut", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
    { name: "Zoom In", desc: "scale(1.1) → 1 + fade", durationMs: 200, ease: "easeOut", initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 } },
    { name: "Bounce", desc: "spring enter from above", durationMs: 500, ease: "spring", initial: { opacity: 0, y: -28 }, animate: { opacity: 1, y: 0 }, spring: { type: "spring", stiffness: 650, damping: 12 } },
    { name: "Flip", desc: "rotateX(90deg) → 0", durationMs: 350, ease: "easeOut", initial: { opacity: 0, rotateX: 90 }, animate: { opacity: 1, rotateX: 0 }, perspective: 600 },
    { name: "Rotate In", desc: "rotate(−12deg) + scale + fade", durationMs: 300, ease: "easeOut", initial: { opacity: 0, rotate: -12, scale: 0.9 }, animate: { opacity: 1, rotate: 0, scale: 1 } },
    { name: "Skew In", desc: "skewX(−16deg) + fade", durationMs: 300, ease: "easeOut", initial: { opacity: 0, skewX: -16, x: -12 }, animate: { opacity: 1, skewX: 0, x: 0 } },
    { name: "Elastic", desc: "overshoot spring from left", durationMs: 600, ease: "spring", initial: { opacity: 0, x: -40, scale: 0.85 }, animate: { opacity: 1, x: 0, scale: 1 }, spring: { type: "spring", stiffness: 400, damping: 10, mass: 0.8 } },
    { name: "Pop", desc: "scale punch then settle", durationMs: 400, ease: "spring", initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, spring: { type: "spring", stiffness: 700, damping: 14 } },
    { name: "Wiggle", desc: "x shake for attention / error", durationMs: 400, ease: "spring", initial: { x: 0 }, animate: { x: [0, -8, 8, -6, 6, -4, 4, 0] }, spring: { type: "tween", duration: 0.45, ease: "easeInOut" } },
]

/* ─── Shared demo card ─── */

function DemoCard({
    children, name, desc, tags, onHover, hintLabel = "hover ▶",
}: {
    children: React.ReactNode; name: string; desc: string; tags: string[]
    onHover?: () => void; hintLabel?: string
}) {
    const cardRef = useRef<HTMLDivElement>(null)
    const inView = useInView(cardRef, { once: true, amount: 0.6 })
    useEffect(() => {
        if (!inView || !onHover) return
        onHover()
        const id = setInterval(onHover, 3000)
        return () => clearInterval(id)
    }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            ref={cardRef}
            className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden group cursor-default"
            onMouseEnter={onHover}
        >
            <div className="px-6 pt-5 pb-4 h-28 flex items-center justify-center bg-gray-50 relative">
                {children}
                <span className="absolute bottom-2 right-3 text-[10px] text-gray-300 group-hover:text-blue-300 transition-colors font-medium select-none pointer-events-none">
                    {hintLabel}
                </span>
            </div>
            <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-mono">{desc}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end max-w-[180px]">
                    {tags.map(t => (
                        <span key={t} className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ─── Color swatch ─── */

function ColorSwatch({ name, hex, light }: { name: string; hex: string; light: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="h-16 w-full rounded-lg border border-black/5 shadow-sm" style={{ backgroundColor: hex }} />
            <p className={`text-xs font-semibold ${light ? "text-gray-800" : "text-gray-900"}`}>{name}</p>
            <p className="text-[11px] font-mono text-gray-500">{hex}</p>
        </div>
    )
}

/* ─── Duration row ─── */

function DurationRow({ d }: { d: typeof durations[0] }) {
    const controls = useAnimationControls()
    const [running, setRunning] = useState(false)
    const rowRef = useRef<HTMLDivElement>(null)
    const inView = useInView(rowRef, { once: true, amount: 0.8 })

    const play = useCallback(async () => {
        if (running) return
        const ms = parseInt(d.value)
        setRunning(true)
        controls.set({ scaleX: 0 })
        await controls.start({ scaleX: 1, transition: { duration: Math.max(ms / 1000, 0.04), ease: "linear" } })
        setRunning(false)
    }, [controls, d.value, running])

    useEffect(() => {
        if (!inView) return
        play()
        const ms = parseInt(d.value)
        const id = setInterval(play, Math.max(ms, 100) + 1200)
        return () => clearInterval(id)
    }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={rowRef} onMouseEnter={play} onClick={play} className="flex items-center gap-4 p-5 border border-gray-100 rounded-xl bg-white shadow-sm cursor-pointer hover:border-blue-100 transition-colors group">
            <div className="w-24 shrink-0">
                <p className="text-sm font-semibold text-gray-800">{d.name}</p>
                <p className="text-xs font-mono text-blue-500 mt-0.5">{d.value}</p>
            </div>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div animate={controls} initial={{ scaleX: 0 }} style={{ originX: 0 }} className="h-full bg-blue-500 rounded-full" />
            </div>
            <p className="text-xs text-gray-400 w-44 shrink-0">{d.desc}</p>
            <span className="text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 font-medium w-16 text-right">
                {running ? "playing…" : "hover ▶"}
            </span>
        </div>
    )
}

/* ─── Easing row ─── */

function EasingRow({ e }: { e: typeof easings[0] }) {
    const controls = useAnimationControls()
    const isCubic = e.css.startsWith("cubic-bezier")
    const params = isCubic ? e.css.match(/[\d.]+/g)?.map(Number) ?? null : null
    const fmEase = params ? (params as [number, number, number, number]) : ("linear" as const)

    const W = 52, H = 52, pad = 5
    const pathD = e.css === "linear"
        ? `M ${pad},${H - pad} L ${W - pad},${pad}`
        : params ? `M ${pad},${H - pad} C ${pad + params[0] * (W - 2 * pad)},${H - pad - params[1] * (H - 2 * pad)} ${pad + params[2] * (W - 2 * pad)},${H - pad - params[3] * (H - 2 * pad)} ${W - pad},${pad}` : ""

    const play = useCallback(() => {
        controls.set({ x: 4 })
        requestAnimationFrame(() => controls.start({ x: 88, transition: { duration: 0.7, ease: fmEase } }))
    }, [controls, fmEase])

    useEffect(() => { play() }, [play])

    return (
        <div className="flex items-center gap-5 p-5 border border-gray-100 rounded-xl bg-white shadow-sm group cursor-default" onMouseEnter={play}>
            <p className="text-sm font-semibold text-gray-800 w-28 shrink-0">{e.name}</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-10 h-10 shrink-0" overflow="visible">
                <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} fill="none" stroke="#E4E5E7" strokeWidth="1" rx="2" />
                <path d={pathD} fill="none" stroke="#006AFF" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx={pad} cy={H - pad} r="2" fill="#006AFF" />
                <circle cx={W - pad} cy={pad} r="2" fill="#006AFF" />
            </svg>
            <div className="w-28 h-7 bg-gray-50 rounded-lg relative shrink-0 overflow-hidden border border-gray-100">
                <motion.div animate={controls} initial={{ x: 4 }} className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500" />
            </div>
            <p className="text-xs font-mono text-gray-400 w-52 shrink-0">{e.css}</p>
            <p className="text-sm text-gray-500 flex-1">{e.desc}</p>
            <span className="text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 font-medium">hover ▶</span>
        </div>
    )
}

/* ─── Motion pattern demo ─── */

function MotionDemo({ pattern }: { pattern: MotionPattern }) {
    const controls = useAnimationControls()

    const play = useCallback(() => {
        controls.stop()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        controls.set(pattern.initial as any)
        requestAnimationFrame(() => requestAnimationFrame(() => {
            const transition = pattern.spring
                ? { ...pattern.spring }
                : { duration: pattern.durationMs / 1000, ease: pattern.ease as import("framer-motion").Easing }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            controls.start({ ...(pattern.animate as any), transition })
        }))
    }, [controls, pattern])

    useEffect(() => {
        play()
        const id = setInterval(play, 3000)
        return () => clearInterval(id)
    }, [play])

    return (
        <DemoCard name={pattern.name} desc={pattern.desc} tags={[`${pattern.durationMs}ms`, pattern.ease]} onHover={play}>
            <div className="flex items-center gap-3" style={pattern.perspective ? { perspective: pattern.perspective } : undefined}>
                <motion.div animate={controls} className="w-20 h-10 rounded-lg bg-blue-500" />
                <button onClick={play} className="text-[11px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Replay</button>
            </div>
        </DemoCard>
    )
}

/* ─── Stagger demo ─── */

function StaggerDemo() {
    const [key, setKey] = useState(0)
    const items = ["Overview", "Transfers", "Liquidity", "Analytics", "Settings"]

    return (
        <DemoCard name="Stagger" desc="staggerChildren: 80ms cascade" tags={["80ms delay", "ease-out"]} onHover={() => setKey(k => k + 1)}>
            <div className="flex items-center gap-3">
                <motion.ul key={key} className="flex flex-col gap-1.5 w-36" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                    {items.map(item => (
                        <motion.li key={item} variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } } }} className="h-4 rounded bg-blue-500 text-[9px] text-white px-2 flex items-center font-medium">{item}</motion.li>
                    ))}
                </motion.ul>
                <button onClick={() => setKey(k => k + 1)} className="text-[11px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Replay</button>
            </div>
        </DemoCard>
    )
}

/* ─── Spring drag demo ─── */

function SpringDemo() {
    return (
        <DemoCard name="Spring" desc="drag with spring snap-back" tags={["stiffness: 400", "damping: 25"]} hintLabel="drag ↔">
            <motion.div drag dragConstraints={{ left: -60, right: 60, top: -25, bottom: 25 }} dragElastic={0.2} whileDrag={{ scale: 1.08, backgroundColor: "#3B96FF" }} whileHover={{ scale: 1.04 }} animate={{ x: 0, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="w-20 h-10 rounded-lg bg-blue-500 cursor-grab active:cursor-grabbing select-none" />
        </DemoCard>
    )
}

/* ─── Layout demo ─── */

function LayoutDemo() {
    const [expanded, setExpanded] = useState(false)
    return (
        <DemoCard name="Layout" desc="automatic layout animation" tags={["layout", "spring"]} hintLabel="click ↔">
            <motion.div layout onClick={() => setExpanded(e => !e)} className="bg-blue-500 rounded-xl cursor-pointer flex items-center justify-center overflow-hidden" style={{ width: expanded ? 160 : 72, height: expanded ? 52 : 40 }} transition={{ type: "spring", stiffness: 500, damping: 35 }}>
                <motion.span layout className="text-white font-semibold select-none" style={{ fontSize: expanded ? 13 : 11 }}>{expanded ? "Collapse ←" : "Expand →"}</motion.span>
            </motion.div>
        </DemoCard>
    )
}

/* ─── Pulse demo ─── */

function PulseDemo() {
    return (
        <DemoCard name="Pulse" desc="continuous looping animation" tags={["repeat: Infinity", "ease-in-out"]} hintLabel="">
            <div className="flex items-center gap-4">
                <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="w-10 h-10 rounded-full bg-blue-500 shrink-0" />
                <div className="flex flex-col gap-2 w-28">
                    {[100, 75].map((w, i) => (
                        <motion.div key={i} animate={{ opacity: [0.35, 0.9, 0.35] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: i * 0.15 }} className="h-2.5 bg-gray-200 rounded-full" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>
        </DemoCard>
    )
}

/* ─── Progress demo ─── */

function ProgressDemo() {
    const controls = useAnimationControls()
    const [pct, setPct] = useState(0)

    const play = useCallback(() => {
        controls.set({ scaleX: 0 })
        setPct(0)
        requestAnimationFrame(() => {
            controls.start({ scaleX: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } })
            const start = Date.now()
            const tick = () => {
                const p = Math.min((Date.now() - start) / 1500, 1)
                setPct(Math.round(p * 78))
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        })
    }, [controls])

    useEffect(() => { play() }, [play])

    return (
        <DemoCard name="Progress" desc="animated fill with counter" tags={["1.5s", "expo-out"]} onHover={play}>
            <div className="w-52 space-y-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Portfolio Allocation</span>
                    <span className="text-xs font-mono text-blue-500 tabular-nums">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div animate={controls} initial={{ scaleX: 0 }} style={{ originX: 0 }} className="h-full bg-blue-500 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Liquidity Ratio</span>
                    <span className="text-xs font-mono text-green-600 tabular-nums">92%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div animate={controls} initial={{ scaleX: 0 }} style={{ originX: 0, backgroundColor: "#009994" }} className="h-full rounded-full" />
                </div>
            </div>
        </DemoCard>
    )
}

/* ─── Ripple demo ─── */

type RippleItem = { id: number; x: number; y: number }

function RippleDemo() {
    const [ripples, setRipples] = useState<RippleItem[]>([])

    const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const id = Date.now()
        setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700)
    }

    return (
        <DemoCard name="Ripple" desc="expanding circle from click point" tags={["scale", "opacity"]} hintLabel="click ✦">
            <div className="relative overflow-hidden w-44 h-14 rounded-xl bg-blue-500 flex items-center justify-center cursor-pointer select-none" onClick={addRipple}>
                <span className="text-white font-semibold text-sm relative z-10">Click Anywhere</span>
                {ripples.map(r => (
                    <motion.div key={r.id} initial={{ scale: 0, opacity: 0.4 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.65, ease: "easeOut" }}
                        className="absolute w-16 h-16 rounded-full bg-white pointer-events-none"
                        style={{ left: r.x - 32, top: r.y - 32 }}
                    />
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Toast demo ─── */

function ToastDemo() {
    const [visible, setVisible] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const show = useCallback(() => {
        clearTimeout(timerRef.current)
        setVisible(false)
        requestAnimationFrame(() => {
            setVisible(true)
            timerRef.current = setTimeout(() => setVisible(false), 2500)
        })
    }, [])

    useEffect(() => () => clearTimeout(timerRef.current), [])

    return (
        <DemoCard name="Toast" desc="slide-in notification with auto-dismiss" tags={["AnimatePresence", "spring"]} onHover={show} hintLabel="hover ✦">
            <div className="relative w-52 h-12 flex items-center justify-end">
                <AnimatePresence>
                    {visible && (
                        <motion.div
                            initial={{ opacity: 0, x: 60, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            className="absolute right-0 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                            Transfer approved
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DemoCard>
    )
}

/* ─── Hover & Tap demo ─── */

function HoverTapDemo() {
    return (
        <DemoCard name="Hover & Tap" desc="whileHover + whileTap spring states" tags={["whileHover", "whileTap"]} hintLabel="hover + click">
            <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.06, backgroundColor: "#004BCC" }} whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl select-none">
                    Approve
                </motion.button>
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl select-none shadow-sm">
                    Decline
                </motion.button>
            </div>
        </DemoCard>
    )
}

/* ─── Accordion demo ─── */

function AccordionDemo() {
    const [open, setOpen] = useState(false)
    return (
        <DemoCard name="Accordion" desc="AnimatePresence height expand/collapse" tags={["AnimatePresence", "height"]} hintLabel="click ↕">
            <div className="w-52 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors select-none">
                    <span>Transfer Details</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-gray-400 text-xs">▾</motion.span>
                </button>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ height: { type: "spring", stiffness: 400, damping: 40 }, opacity: { duration: 0.2 } }}
                            className="overflow-hidden border-t border-gray-100">
                            <div className="px-4 py-3 space-y-2">
                                {[["Amount", "$24,850"], ["From", "USD Account"], ["Fee", "$0.00"]].map(([k, v]) => (
                                    <div key={k} className="flex justify-between text-xs text-gray-500">
                                        <span>{k}</span><span className="font-semibold text-gray-700">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DemoCard>
    )
}

/* ─── Animate-UI effects ─── */

function CounterDemo() {
    const spanRef = useRef<HTMLSpanElement>(null)
    const motionVal = useMotionValue(0)
    const springVal = useSpring(motionVal, { stiffness: 90, damping: 50 })
    const [triggerKey, setTriggerKey] = useState(0)

    useEffect(() => {
        motionVal.set(0)
        const unsub = springVal.on("change", (v) => { if (spanRef.current) spanRef.current.textContent = "$" + Math.round(v).toLocaleString() })
        const t = setTimeout(() => motionVal.set(1_284_750), 50)
        return () => { unsub(); clearTimeout(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerKey])

    return (
        <DemoCard name="Counting Number" desc="spring-animated numeric value" tags={["useSpring", "stiffness: 90"]} onHover={() => setTriggerKey(k => k + 1)}>
            <div className="flex flex-col items-center gap-1.5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Total AUM</p>
                <span ref={spanRef} className="text-3xl font-bold text-gray-900 tabular-nums">$0</span>
                <button onClick={() => setTriggerKey(k => k + 1)} className="text-[11px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Replay</button>
            </div>
        </DemoCard>
    )
}

function TypingDemo() {
    const phrases = ["Treasury Dashboard", "Approve Transfer", "View Analytics"]
    const [displayed, setDisplayed] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [triggerKey, setTriggerKey] = useState(0)

    useEffect(() => {
        const ids: ReturnType<typeof setTimeout>[] = []
        let idx = 0
        const typePhrase = (phrase: string, onDone: () => void) => {
            setIsTyping(true); let i = 0
            const next = () => { setDisplayed(phrase.slice(0, i + 1)); i++; if (i <= phrase.length) ids.push(setTimeout(next, 70)); else { setIsTyping(false); onDone() } }
            next()
        }
        const erasePhrase = (phrase: string, onDone: () => void) => {
            setIsTyping(true); let i = phrase.length
            const next = () => { setDisplayed(phrase.slice(0, i)); i--; if (i >= 0) ids.push(setTimeout(next, 40)); else { setIsTyping(false); onDone() } }
            next()
        }
        const cycle = () => {
            const phrase = phrases[idx % phrases.length]!
            typePhrase(phrase, () => ids.push(setTimeout(() => erasePhrase(phrase, () => { idx++; ids.push(setTimeout(cycle, 200)) }), 1200)))
        }
        cycle()
        return () => ids.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerKey])

    return (
        <DemoCard name="Typing Text" desc="character-by-character with erase loop" tags={["70ms/char", "cursor blink"]} onHover={() => setTriggerKey(k => k + 1)}>
            <div className="text-lg font-semibold text-gray-800 flex items-center h-7">
                <span>{displayed}</span>
                <motion.span animate={{ opacity: isTyping ? 1 : [1, 0, 1] }} transition={isTyping ? { duration: 0 } : { repeat: Infinity, duration: 0.8 }} className="ml-0.5 w-px h-5 bg-blue-500 inline-block translate-y-px" />
            </div>
        </DemoCard>
    )
}

function ShineDemo() {
    const [animState, setAnimState] = useState<"initial" | "shine">("initial")
    const hoveredRef = useRef(false)
    const onComplete = () => { if (animState === "shine") { setAnimState("initial"); if (hoveredRef.current) setTimeout(() => setAnimState("shine"), 50) } }

    return (
        <DemoCard name="Shine" desc="gradient light sweep on hover" tags={["ease-in-out", "0.6s"]} hintLabel="hover ✦">
            <div className="relative overflow-hidden w-44 h-11 rounded-xl bg-blue-500 flex items-center justify-center cursor-pointer select-none"
                onMouseEnter={() => { hoveredRef.current = true; setAnimState("shine") }}
                onMouseLeave={() => { hoveredRef.current = false }}>
                <span className="text-white font-semibold text-sm relative z-10">Approve Transfer</span>
                <motion.div initial="initial" animate={animState} onAnimationComplete={onComplete}
                    variants={{ initial: { x: "-100%", skewX: -15, transition: { duration: 0 } }, shine: { x: "200%", skewX: -15 } }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }}
                />
            </div>
        </DemoCard>
    )
}

function MagneticDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const rawX = useMotionValue(0); const rawY = useMotionValue(0)
    const x = useSpring(rawX, { stiffness: 100, damping: 10, mass: 0.5 })
    const y = useSpring(rawY, { stiffness: 100, damping: 10, mass: 0.5 })

    const compute = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const dx = e.clientX - (left + width / 2); const dy = e.clientY - (top + height / 2)
        const dist = Math.hypot(dx, dy); const range = 120
        if (dist <= range) { const f = (1 - dist / range) * 0.5; rawX.set(dx * f); rawY.set(dy * f) }
        else { rawX.set(0); rawY.set(0) }
    }, [rawX, rawY])

    useEffect(() => { window.addEventListener("mousemove", compute); return () => window.removeEventListener("mousemove", compute) }, [compute])

    return (
        <DemoCard name="Magnetic" desc="element attracted to cursor position" tags={["spring", "mousemove"]} hintLabel="hover nearby ✦">
            <div ref={containerRef} className="w-40 h-16 flex items-center justify-center">
                <motion.div style={{ x, y }} onMouseLeave={() => { animate(rawX, 0, { type: "spring", stiffness: 300, damping: 20 }); animate(rawY, 0, { type: "spring", stiffness: 300, damping: 20 }) }}
                    className="w-24 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer select-none shadow-md">Send</motion.div>
            </div>
        </DemoCard>
    )
}

/* ─── Tilt demo ─── */

function TiltDemo() {
    const cardRef = useRef<HTMLDivElement>(null)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const sRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
    const sRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const { left, top, width, height } = cardRef.current.getBoundingClientRect()
        rotateX.set(-(e.clientY - top - height / 2) / height * 22)
        rotateY.set((e.clientX - left - width / 2) / width * 22)
    }
    const reset = () => { rotateX.set(0); rotateY.set(0) }

    return (
        <DemoCard name="Tilt" desc="3D perspective tilt on mouse move" tags={["rotateX/Y", "spring"]} hintLabel="hover ✦">
            <div style={{ perspective: 600 }}>
                <motion.div ref={cardRef} style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={onMouseMove} onMouseLeave={reset}
                    className="w-40 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg cursor-pointer flex items-center justify-center select-none">
                    <span className="text-white font-bold text-sm" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>Ripple Treasury</span>
                </motion.div>
            </div>
        </DemoCard>
    )
}

/* ─── Blur In demo ─── */

function BlurInDemo() {
    const [key, setKey] = useState(0)
    return (
        <DemoCard name="Blur In" desc="opacity + blur filter stagger" tags={["blur(10px)", "stagger"]} onHover={() => setKey(k => k + 1)}>
            <div className="flex items-center gap-2">
                {["Instant", "Secure", "Treasury"].map((word, i) => (
                    <motion.span key={`${key}-${i}`}
                        initial={{ opacity: 0, filter: "blur(10px)", y: 4 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.12 }}
                        className="text-lg font-bold text-gray-800">{word}</motion.span>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Roll In demo ─── */

function RollInDemo() {
    const [key, setKey] = useState(0)
    return (
        <DemoCard name="Roll In" desc="digits rising from below (slot machine)" tags={["y", "spring"]} onHover={() => setKey(k => k + 1)}>
            <div className="flex items-center gap-0.5">
                <span className="text-2xl font-mono font-bold text-gray-400 mr-0.5">$</span>
                {["2", "4", ",", "8", "5", "0"].map((d, i) => (
                    <div key={`${key}-${i}`} className="overflow-hidden h-8 w-5 flex justify-center">
                        <motion.span initial={{ y: 36 }} animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 22, delay: i * 0.06 }}
                            className="text-2xl font-mono font-bold text-gray-900 leading-8">{d}</motion.span>
                    </div>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Text Reveal demo ─── */

function TextRevealDemo() {
    const [key, setKey] = useState(0)
    return (
        <DemoCard name="Text Reveal" desc="words rising from clip overflow" tags={["y: 110%", "stagger"]} onHover={() => setKey(k => k + 1)}>
            <div className="flex flex-wrap gap-x-2">
                {["Move", "money", "at", "light", "speed."].map((word, i) => (
                    <div key={`${key}-${i}`} className="overflow-hidden">
                        <motion.span initial={{ y: "110%" }} animate={{ y: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: i * 0.07 }}
                            className="block text-xl font-bold text-gray-900 leading-tight">{word}</motion.span>
                    </div>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Gradient demo ─── */

function GradientDemo() {
    return (
        <DemoCard name="Gradient Shift" desc="animated gradient background loop" tags={["backgroundPosition", "Infinity"]} hintLabel="">
            <motion.div className="w-44 h-12 rounded-xl flex items-center justify-center select-none font-semibold text-white text-sm shadow"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                style={{ background: "linear-gradient(270deg, #006AFF, #8B5CF6, #10B981, #F59E0B, #006AFF)", backgroundSize: "400% 400%" }}>
                Ripple Treasury
            </motion.div>
        </DemoCard>
    )
}

/* ─── Orbit demo ─── */

function OrbitDemo() {
    return (
        <DemoCard name="Orbit" desc="elements rotating on circular paths" tags={["rotate", "Infinity"]} hintLabel="">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center z-10 shadow-md">
                    <span className="text-white font-bold text-sm">$</span>
                </div>
                {[{ color: "#8B5CF6", initDeg: 0, dur: 3 }, { color: "#10B981", initDeg: 120, dur: 4 }, { color: "#F59E0B", initDeg: 240, dur: 5 }].map((item, i) => (
                    <motion.div key={i} className="absolute inset-0"
                        animate={{ rotate: 360 }} initial={{ rotate: item.initDeg }}
                        transition={{ repeat: Infinity, duration: item.dur, ease: "linear" }}>
                        <div className="w-5 h-5 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ backgroundColor: item.color }} />
                    </motion.div>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Number Flip demo ─── */

function NumberFlipDemo() {
    const values = [0, 42, 1337, 99, 256]
    const [idx, setIdx] = useState(0)
    const [_prev, setPrev] = useState(values[0])
    const [curr, setCurr] = useState(values[0])
    const [animKey, setAnimKey] = useState(0)

    const next = useCallback(() => {
        const nextIdx = (idx + 1) % values.length
        setPrev(values[idx])
        setCurr(values[nextIdx])
        setIdx(nextIdx)
        setAnimKey(k => k + 1)
    }, [idx, values])

    return (
        <DemoCard name="Number Flip" desc="value transition with flip exit/enter" tags={["AnimatePresence", "rotateX"]} onHover={next} hintLabel="hover ▶">
            <div className="flex items-center gap-3" style={{ perspective: 400 }}>
                <div className="relative h-12 w-24 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.span key={animKey}
                            initial={{ rotateX: -90, opacity: 0, y: 20 }}
                            animate={{ rotateX: 0, opacity: 1, y: 0 }}
                            exit={{ rotateX: 90, opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className="absolute text-3xl font-bold tabular-nums text-gray-900">
                            {curr.toLocaleString()}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <button onClick={next} className="text-[11px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Next</button>
            </div>
        </DemoCard>
    )
}


/* ─── Morphing Text demo ─── */

function MorphingTextDemo() {
    const texts = ["Treasury", "Analytics", "Transfers", "Liquidity"]
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % texts.length), 2000)
        return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const chars = Array.from(texts[idx] ?? "")

    return (
        <DemoCard name="Morphing Text" desc="characters blur-scale between strings" tags={["blur", "scale", "stagger"]} hintLabel="">
            <div className="flex items-center gap-px text-2xl font-bold text-gray-900 h-9 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {chars.map((char, i) => (
                        <motion.span key={`${idx}-${i}-${char}`}
                            initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                            transition={{ duration: 0.25, delay: i * 0.025, ease: "easeOut" }}
                        >{char}</motion.span>
                    ))}
                </AnimatePresence>
            </div>
        </DemoCard>
    )
}

/* ─── Rotating Text demo ─── */

function RotatingTextDemo() {
    const words = ["Instantly", "Securely", "Globally", "Effortlessly"]
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % words.length), 1800)
        return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DemoCard name="Rotating Text" desc="word cycles with slide enter/exit" tags={["AnimatePresence", "y"]} hintLabel="">
            <div className="flex items-center gap-2 font-bold overflow-hidden">
                <span className="text-xl text-gray-500 font-normal shrink-0">Move money</span>
                <div className="overflow-hidden h-8 flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.span key={idx}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xl text-blue-600 block whitespace-nowrap">
                            {words[idx]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </DemoCard>
    )
}

/* ─── Shimmering Text demo ─── */

function ShimmeringTextDemo() {
    return (
        <DemoCard name="Shimmering Text" desc="wave color shimmer across characters" tags={["color", "delay", "Infinity"]} hintLabel="">
            <div className="flex">
                {"Ripple Treasury".split("").map((char, i) => (
                    <motion.span key={i}
                        animate={{ color: ["#9CA3AF", "#006AFF", "#9CA3AF"] }}
                        transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.09, ease: "easeInOut" }}
                        className="text-2xl font-bold"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
                        {char}
                    </motion.span>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Splitting Text demo ─── */

function SplittingTextDemo() {
    const [key, setKey] = useState(0)
    return (
        <DemoCard name="Splitting Text" desc="characters cascade in with stagger" tags={["stagger", "rotate", "y"]} onHover={() => setKey(k => k + 1)}>
            <div className="flex flex-wrap gap-px text-2xl font-bold">
                {"Approve Transfer".split("").map((char, i) => (
                    <motion.span key={`${key}-${i}`}
                        initial={{ opacity: 0, y: 14, rotate: -10 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04, ease: [0.33, 1, 0.68, 1] }}
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                        className="text-gray-900">{char}</motion.span>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Highlight Text demo ─── */

function HighlightTextDemo() {
    const [key, setKey] = useState(0)
    return (
        <DemoCard name="Highlight" desc="background fill expands under text" tags={["scaleX", "originX: 0"]} onHover={() => setKey(k => k + 1)}>
            <div className="text-xl font-bold text-gray-900">
                Move{" "}
                <span className="relative inline-block">
                    <span className="relative z-10">treasury</span>
                    <motion.span key={key} className="absolute inset-x-0 bottom-0 top-1 bg-blue-200 rounded z-0"
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.1 }} />
                </span>
                {" "}faster.
            </div>
        </DemoCard>
    )
}

/* ─── Spotlight demo ─── */

function SpotlightDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(80)
    const mouseY = useMotionValue(28)

    const onMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const { left, top } = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
    }

    const bg = useMotionTemplate`radial-gradient(90px circle at ${mouseX}px ${mouseY}px, rgba(0,106,255,0.4), transparent 80%)`

    return (
        <DemoCard name="Spotlight" desc="radial gradient follows cursor" tags={["useMotionTemplate", "mousemove"]} hintLabel="hover ✦">
            <div ref={containerRef} onMouseMove={onMouseMove}
                className="relative w-52 h-14 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center cursor-pointer select-none">
                <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bg }} />
                <span className="relative text-white font-semibold text-sm">Ripple Dashboard</span>
            </div>
        </DemoCard>
    )
}

/* ─── Flip Button demo ─── */

function FlipButtonDemo() {
    return (
        <DemoCard name="Flip Button" desc="label rolls up to reveal alternate text" tags={["y", "overflow", "spring"]} hintLabel="hover ✦">
            <div className="flex gap-3">
                {[{ front: "Send Wire", back: "→ Confirm" }, { front: "View All", back: "Open →" }].map(btn => (
                    <div key={btn.front} className="overflow-hidden h-10 rounded-xl bg-blue-600 px-4 cursor-pointer select-none" style={{ minWidth: 96 }}>
                        <motion.div className="flex flex-col" whileHover={{ y: "-50%" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                            <div className="h-10 flex items-center justify-center text-sm font-semibold text-white whitespace-nowrap">{btn.front}</div>
                            <div className="h-10 flex items-center justify-center text-sm font-semibold text-white whitespace-nowrap">{btn.back}</div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Liquid Button demo ─── */

function LiquidButtonDemo() {
    return (
        <DemoCard name="Liquid Button" desc="fill grows from bottom via variant propagation" tags={["variants", "scaleY", "originY"]} hintLabel="hover ✦">
            <div className="flex gap-3">
                {["Approve", "Transfer"].map(label => (
                    <motion.div key={label}
                        className="relative overflow-hidden h-10 px-5 rounded-xl border border-blue-500 cursor-pointer select-none flex items-center justify-center text-sm font-semibold"
                        initial="rest" whileHover="hover">
                        <motion.div className="absolute inset-0 bg-blue-500"
                            variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                            style={{ originY: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                        <motion.span className="relative z-10"
                            variants={{ rest: { color: "#006AFF" }, hover: { color: "#ffffff" } }}
                            transition={{ duration: 0.15 }}>
                            {label}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </DemoCard>
    )
}

/* ─── Animated header background ─── */

function MotionHeaderBg() {
    return (
        <motion.div
            key="motion-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            {[
                { color: "59, 130, 246", x: [0, 60, -20, 0], y: [0, -30, 20, 0], size: 400, top: -80, left: "15%" },
                { color: "139, 92, 246", x: [0, -40, 30, 0], y: [0, 30, -40, 0], size: 320, top: -60, right: "8%" },
                { color: "16, 185, 129", x: [0, 30, -50, 0], y: [0, 50, -20, 0], size: 280, top: 20, left: "50%" },
            ].map((blob, i) => (
                <motion.div
                    key={i}
                    animate={{ x: blob.x, y: blob.y }}
                    transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "easeInOut", delay: i * 3 }}
                    className="absolute rounded-full"
                    style={{
                        width: blob.size, height: blob.size,
                        top: blob.top, left: blob.left, right: (blob as { right?: string }).right,
                        background: `radial-gradient(circle, rgba(${blob.color}, 0.22) 0%, transparent 70%)`,
                        filter: "blur(32px)",
                    }}
                />
            ))}
        </motion.div>
    )
}

/* ─── Page ─── */

function FormCardRadioDemo() {
    const [selected, setSelected] = useState<string | null>(null)
    const options = [
        { id: "mint", label: "Mint token", description: "Create new tokens on the network." },
        { id: "burn", label: "Burn token", description: "Permanently destroy tokens." },
        { id: "transfer", label: "Transfer", description: "Move tokens between accounts." },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
            {options.map(o => (
                <FormCard
                    key={o.id}
                    selectionType="radio"
                    label={o.label}
                    description={o.description}
                    icon={<RlusdIcon />}
                    selected={selected === o.id}
                    onClick={() => setSelected(o.id)}
                />
            ))}
        </div>
    )
}

function FormCardCheckboxDemo() {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const toggle = (id: string) => setSelected(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
    })
    const options = [
        { id: "mint", label: "Mint token", description: "Create new tokens on the network." },
        { id: "burn", label: "Burn token", description: "Permanently destroy tokens." },
        { id: "transfer", label: "Transfer", description: "Move tokens between accounts." },
        { id: "freeze", label: "Freeze account", description: "Temporarily suspend account activity." },
    ]
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
            {options.map(o => (
                <FormCard
                    key={o.id}
                    selectionType="checkbox"
                    label={o.label}
                    description={o.description}
                    icon={<RlusdIcon />}
                    selected={selected.has(o.id)}
                    onClick={() => toggle(o.id)}
                />
            ))}
        </div>
    )
}

export function DesignSystemPage() {
    const [activeTab, setActiveTab] = useState<"foundation" | "motion">("foundation")

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            {/* Nav bar — tabs on the right */}
            <div className="bg-white border-b border-gray-100 px-10 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow">
                        <svg viewBox="0 0 96 96" fill="none" className="w-6 h-6">
                            <defs>
                                <mask id="m1"><rect width="96" height="96" fill="white" /><circle cx="43" cy="24" r="22" fill="black" /></mask>
                                <mask id="m2"><rect width="96" height="96" fill="white" /><circle cx="48" cy="70" r="19" fill="black" /></mask>
                            </defs>
                            <circle cx="28" cy="24" r="22" fill="white" />
                            <circle cx="26" cy="69" r="20" fill="white" />
                            <circle cx="65" cy="24" r="22" fill="white" mask="url(#m1)" />
                            <circle cx="67" cy="70" r="19" fill="white" mask="url(#m2)" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-gray-900">Ripple</span>
                            <span className="text-base font-light text-gray-300">/</span>
                            <span className="text-base font-semibold text-gray-500">Design System</span>
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">v1.0</span>
                        </div>
                        <Caption className="text-gray-400 mt-0 block text-[11px]">Foundation Library — Color 2026</Caption>
                    </div>
                </div>

                {/* Tabs — right side */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    {(["foundation", "motion"] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {activeTab === tab && (
                                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white shadow-sm rounded-lg" style={{ zIndex: 0 }} transition={{ type: "spring", stiffness: 500, damping: 40 }} />
                            )}
                            <span className="relative z-10 capitalize">{tab}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Hero — animated when on Motion tab */}
            <div className="bg-gray-900 text-white px-10 py-10 relative overflow-hidden">
                <AnimatePresence>{activeTab === "motion" && <MotionHeaderBg />}</AnimatePresence>
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {activeTab === "foundation" ? (
                            <motion.div key="foundation-hero" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                                <Display className="text-white mb-2">Foundation</Display>
                            </motion.div>
                        ) : (
                            <motion.div key="motion-hero" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                                <Display className="text-white mb-2">Motion</Display>
                                <BodyLarge className="text-gray-400 max-w-xl">Duration tokens, easing curves, and reusable animation patterns powered by Framer Motion.</BodyLarge>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-10 py-12 space-y-16">

                <AnimatePresence mode="wait">
                    {activeTab === "foundation" && (
                        <motion.div key="foundation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-16">

                            <section>
                                <H2 className="mb-1">Primary Colors</H2>
                                <Body className="text-gray-500 mb-8">The main colors that make up the majority of the design system.</Body>
                                <div className="space-y-8">
                                    <div><H5 className="mb-4 text-gray-600">Gray</H5><div className="grid grid-cols-5 md:grid-cols-11 gap-3">{grayScale.map(c => <ColorSwatch key={c.name} {...c} />)}</div></div>
                                    <div><H5 className="mb-4 text-gray-600">Blue</H5><div className="grid grid-cols-5 md:grid-cols-9 gap-3">{blueScale.map(c => <ColorSwatch key={c.name} {...c} />)}</div></div>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Secondary Colors</H2>
                                <Body className="text-gray-500 mb-8">Secondary colors for special occasions — used sparingly for status, accents and emphasis.</Body>
                                <div className="space-y-8">
                                    {secondaryPalettes.map(palette => (
                                        <div key={palette.name}><H5 className="mb-4 text-gray-600">{palette.name}</H5>
                                            <div className="grid grid-cols-5 gap-3 max-w-lg">{palette.shades.map(s => <ColorSwatch key={s.num} name={`${palette.name} ${s.num}`} hex={s.hex} light={s.light} />)}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Typography</H2>
                                <Body className="text-gray-500 mb-8">Type scale following the Ripple brand guidelines.</Body>
                                <div className="space-y-6 border border-gray-100 rounded-xl p-8 bg-white shadow-sm">
                                    {[
                                        { label: "Display — 72px Bold", el: <Display>Ripple</Display> },
                                        { label: "H2 — 36px Bold", el: <H2>Ripple</H2> },
                                        { label: "H5 — 20px Semibold", el: <H5>Ripple</H5> },
                                        { label: "Body Large — 20px", el: <BodyLarge>Ripple</BodyLarge> },
                                        { label: "Body — 16px", el: <Body>Ripple</Body> },
                                        { label: "Caption — 12px", el: <Caption>Ripple</Caption> },
                                    ].map((row, i) => (
                                        <div key={i} className={`flex items-baseline gap-6 ${i > 0 ? "pt-6 border-t border-gray-100" : ""}`}>
                                            <span className="w-48 shrink-0 text-[11px] font-mono text-gray-400">{row.label}</span>
                                            {row.el}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Buttons</H2>
                                <Body className="text-gray-500 mb-8">All button variants using Blue 500 as the primary action color.</Body>
                                <div className="flex flex-wrap gap-4 p-8 border border-gray-100 rounded-xl bg-white shadow-sm items-center">
                                    <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button>
                                    <Button variant="link">Link</Button><Button disabled>Disabled</Button>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Badges</H2>
                                <Body className="text-gray-500 mb-8">Status indicators mapped to the secondary color palette.</Body>
                                <div className="flex flex-wrap gap-3 p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <Badge>Blue 500</Badge><Badge variant="secondary">Blue 100</Badge><Badge variant="success">Green 300</Badge>
                                    <Badge variant="warning">Orange 300</Badge><Badge variant="info">Purple 300</Badge>
                                    <Badge variant="pink">Pink 300</Badge><Badge variant="destructive">Orange 400</Badge><Badge variant="outline">Outline</Badge>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Alerts</H2>
                                <Body className="text-gray-500 mb-8">Feedback banners using the secondary palette for semantic meaning.</Body>
                                <div className="space-y-3">
                                    <Alert variant="info"><AlertTitle>Information</AlertTitle><AlertDescription>Using Blue 500 and Blue 100 for informational context.</AlertDescription></Alert>
                                    <Alert variant="success"><AlertTitle>Success</AlertTitle><AlertDescription>Using Green 300 to indicate a successful operation.</AlertDescription></Alert>
                                    <Alert variant="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>Using Orange 300 to indicate caution.</AlertDescription></Alert>
                                    <Alert variant="destructive"><AlertTitle>Destructive</AlertTitle><AlertDescription>Signals a dangerous or irreversible action.</AlertDescription></Alert>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Cards & Form Elements</H2>
                                <Body className="text-gray-500 mb-8">Compound components used for data entry and display.</Body>
                                <Card className="max-w-md shadow-md">
                                    <CardHeader><CardTitle>Account Settings</CardTitle><CardDescription>Update your workspace configuration.</CardDescription></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-1.5"><Label htmlFor="ds-email">Email address</Label><Input id="ds-email" type="email" placeholder="team@ripple.com" /></div>
                                        <div className="space-y-1.5"><Label htmlFor="ds-name">Display name</Label><Input id="ds-name" type="text" placeholder="Ripple Treasury" /></div>
                                        <div className="flex items-center gap-3 pt-1"><Switch id="ds-toggle" /><Label htmlFor="ds-toggle">Enable advanced mode</Label></div>
                                    </CardContent>
                                    <CardFooter className="gap-3"><Button className="flex-1">Save Changes</Button><Button variant="outline" className="flex-1">Cancel</Button></CardFooter>
                                </Card>
                            </section>

                            {/* ── Select ── */}
                            <section>
                                <H2 className="mb-1">Select</H2>
                                <Body className="text-gray-500 mb-8">Dropdown selection for single-choice inputs like currency, account, or date range.</Body>
                                <div className="flex flex-wrap gap-6 p-8 border border-gray-100 rounded-xl bg-white shadow-sm items-start">
                                    <div className="space-y-1.5">
                                        <Label>Currency</Label>
                                        <Select defaultValue="usd">
                                            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="usd">USD — US Dollar</SelectItem>
                                                <SelectItem value="eur">EUR — Euro</SelectItem>
                                                <SelectItem value="gbp">GBP — British Pound</SelectItem>
                                                <SelectItem value="jpy">JPY — Japanese Yen</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Account</Label>
                                        <Select defaultValue="ops">
                                            <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ops">Operations Account</SelectItem>
                                                <SelectItem value="payroll">Payroll Reserve</SelectItem>
                                                <SelectItem value="fx">FX Hedging Account</SelectItem>
                                                <SelectItem value="escrow">Escrow — Q2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Date Range</Label>
                                        <Select>
                                            <SelectTrigger className="w-40"><SelectValue placeholder="Select range" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="7d">Last 7 days</SelectItem>
                                                <SelectItem value="30d">Last 30 days</SelectItem>
                                                <SelectItem value="90d">Last 90 days</SelectItem>
                                                <SelectItem value="ytd">Year to date</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </section>

                            {/* ── Checkbox ── */}
                            <section>
                                <H2 className="mb-1">Checkbox</H2>
                                <Body className="text-gray-500 mb-8">Multi-select controls for permissions, filters, and batch actions.</Body>
                                <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
                                        {[
                                            { id: "cb-wire", label: "Wire transfers", desc: "SWIFT & domestic" },
                                            { id: "cb-fx", label: "FX conversions", desc: "Spot & forward" },
                                            { id: "cb-payroll", label: "Payroll runs", desc: "Scheduled only" },
                                            { id: "cb-statements", label: "Statement exports", desc: "CSV / PDF" },
                                        ].map(item => (
                                            <div key={item.id} className="flex items-start gap-3">
                                                <Checkbox id={item.id} defaultChecked={item.id !== "cb-payroll"} className="mt-0.5" />
                                                <div>
                                                    <label htmlFor={item.id} className="text-sm font-medium text-gray-800 cursor-pointer">{item.label}</label>
                                                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* ── Textarea ── */}
                            <section>
                                <H2 className="mb-1">Textarea</H2>
                                <Body className="text-gray-500 mb-8">Multi-line text input for notes, comments, and descriptions.</Body>
                                <div className="flex flex-wrap gap-6 p-8 border border-gray-100 rounded-xl bg-white shadow-sm max-w-2xl">
                                    <div className="flex-1 min-w-64 space-y-1.5">
                                        <Label htmlFor="ta-note">Transfer Note</Label>
                                        <Textarea id="ta-note" placeholder="Add a note for the recipient or your team…" className="resize-none" rows={3} defaultValue="Q2 vendor payment per invoice #INV-2024-0892. Approved by finance on 2026-03-14." />
                                    </div>
                                    <div className="flex-1 min-w-64 space-y-1.5">
                                        <Label htmlFor="ta-desc">Account Description</Label>
                                        <Textarea id="ta-desc" placeholder="Describe the purpose of this account…" className="resize-none" rows={3} />
                                    </div>
                                </div>
                            </section>

                            {/* ── Tabs ── */}
                            <section>
                                <H2 className="mb-1">Tabs</H2>
                                <Body className="text-gray-500 mb-8">Sectioned navigation for switching between related views.</Body>
                                <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm max-w-xl">
                                    <Tabs defaultValue="overview">
                                        <TabsList className="w-full">
                                            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                                            <TabsTrigger value="transfers" className="flex-1">Transfers</TabsTrigger>
                                            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="overview" className="mt-4 space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                {[["Total Balance", "$4,284,750"], ["Available", "$3,910,200"]].map(([k, v]) => (
                                                    <div key={k} className="p-4 bg-gray-50 rounded-xl">
                                                        <p className="text-xs text-gray-400 font-medium">{k}</p>
                                                        <p className="text-xl font-bold text-gray-900 mt-1">{v}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="transfers" className="mt-4">
                                            <p className="text-sm text-gray-500 text-center py-6">No pending transfers</p>
                                        </TabsContent>
                                        <TabsContent value="analytics" className="mt-4">
                                            <p className="text-sm text-gray-500 text-center py-6">Analytics coming soon</p>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </section>

                            {/* ── Separator ── */}
                            <section>
                                <H2 className="mb-1">Separator</H2>
                                <Body className="text-gray-500 mb-8">Visual dividers for grouping content — horizontal and vertical.</Body>
                                <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm space-y-6">
                                    <div className="space-y-4">
                                        <p className="text-xs font-mono text-gray-400">Horizontal</p>
                                        <div className="space-y-3 max-w-sm">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-semibold">$24,500.00</span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Wire fee</span>
                                                <span className="font-semibold">$25.00</span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between text-sm font-bold">
                                                <span>Total</span>
                                                <span>$24,525.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs font-mono text-gray-400">Vertical</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>Overview</span>
                                            <Separator orientation="vertical" className="h-4" />
                                            <span>Transfers</span>
                                            <Separator orientation="vertical" className="h-4" />
                                            <span>Analytics</span>
                                            <Separator orientation="vertical" className="h-4" />
                                            <span>Settings</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ── Tooltip ── */}
                            <section>
                                <H2 className="mb-1">Tooltip</H2>
                                <Body className="text-gray-500 mb-8">Contextual hints that appear on hover — used for icon buttons and truncated labels.</Body>
                                <TooltipProvider>
                                    <div className="space-y-8">
                                        {/* Placements */}
                                        <div>
                                            <H5 className="mb-4 text-gray-600">Placement</H5>
                                            <div className="flex flex-wrap items-center gap-3 p-8 border border-gray-100 rounded-xl bg-gray-50">
                                                {([
                                                    { side: "top", label: "Top" },
                                                    { side: "right", label: "Right" },
                                                    { side: "bottom", label: "Bottom" },
                                                    { side: "left", label: "Left" },
                                                ] as const).map(({ side, label }) => (
                                                    <Tooltip key={side}>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">{label}</Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side={side}><p>Tooltip on {side}</p></TooltipContent>
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>

                                        {/* With icon buttons */}
                                        <div>
                                            <H5 className="mb-4 text-gray-600">Icon Buttons</H5>
                                            <div className="flex flex-wrap items-center gap-3 p-8 border border-gray-100 rounded-xl bg-gray-50">
                                                {[
                                                    { label: "Download", tip: "Export as CSV" },
                                                    { label: "Share", tip: "Copy link to report" },
                                                    { label: "Filter", tip: "Apply date range filter" },
                                                    { label: "Approve", tip: "Approve transfer — requires 2FA" },
                                                ].map(item => (
                                                    <Tooltip key={item.label}>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">{item.label}</Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent><p>{item.tip}</p></TooltipContent>
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>

                                        {/* On disabled elements */}
                                        <div>
                                            <H5 className="mb-4 text-gray-600">Disabled Elements</H5>
                                            <div className="flex flex-wrap items-center gap-3 p-8 border border-gray-100 rounded-xl bg-gray-50">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span tabIndex={0}>
                                                            <Button disabled>Send Transfer</Button>
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>Complete KYC verification to unlock transfers</p></TooltipContent>
                                                </Tooltip>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span tabIndex={0}>
                                                            <Button variant="outline" disabled>Export</Button>
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>Select at least one transaction to export</p></TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        {/* On truncated text */}
                                        <div>
                                            <H5 className="mb-4 text-gray-600">Truncated Text</H5>
                                            <div className="flex flex-col gap-2 p-8 border border-gray-100 rounded-xl bg-gray-50 max-w-xs">
                                                {[
                                                    "International Wire Transfer to Vendor A — Invoice #2024-0891",
                                                    "Crypto Wallet 0x1a2b3c4d5e6f7890abcdef1234567890",
                                                    "Quarterly Treasury Reconciliation Report Q4 2024",
                                                ].map(text => (
                                                    <Tooltip key={text}>
                                                        <TooltipTrigger asChild>
                                                            <p className="text-sm text-gray-700 truncate cursor-default">{text}</p>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs"><p>{text}</p></TooltipContent>
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TooltipProvider>
                            </section>

                            {/* ── Skeleton ── */}
                            <section>
                                <H2 className="mb-1">Skeleton</H2>
                                <Body className="text-gray-500 mb-8">Loading placeholders that match the shape of real content to reduce perceived latency.</Body>
                                <div className="flex flex-wrap gap-8 p-8 border border-gray-100 rounded-xl bg-white shadow-sm items-start">
                                    <div className="space-y-3 w-64">
                                        <p className="text-xs font-mono text-gray-400 mb-4">Account card</p>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-3.5 w-32" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-full rounded-xl" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 w-72">
                                        <p className="text-xs font-mono text-gray-400 mb-4">Transaction list</p>
                                        {[80, 64, 72, 56].map((w, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                                                <div className="flex-1 space-y-1.5">
                                                    <Skeleton className="h-3" style={{ width: `${w}%` }} />
                                                    <Skeleton className="h-2.5 w-16" />
                                                </div>
                                                <Skeleton className="h-3 w-14 shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* ── Table ── */}
                            <section>
                                <H2 className="mb-1">Table</H2>
                                <Body className="text-gray-500 mb-8">Structured data display for transactions, accounts, and reports.</Body>
                                <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <Table>
                                        <TableCaption className="mb-3">Recent transactions — March 2026</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Reference</TableHead>
                                                <TableHead>Recipient</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead className="text-right">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { ref: "TXN-8821", recipient: "Vertex Capital LLC", type: "Wire", date: "Mar 18", amount: "$124,500.00", status: "Settled", color: "text-green-600" },
                                                { ref: "TXN-8820", recipient: "Payroll — March", type: "ACH Batch", date: "Mar 15", amount: "$892,400.00", status: "Settled", color: "text-green-600" },
                                                { ref: "TXN-8819", recipient: "FX EUR/USD", type: "Conversion", date: "Mar 14", amount: "€240,000", status: "Settled", color: "text-green-600" },
                                                { ref: "TXN-8818", recipient: "Escrow — Q2 2026", type: "Internal", date: "Mar 12", amount: "$500,000.00", status: "Pending", color: "text-orange-500" },
                                                { ref: "TXN-8817", recipient: "AWS Cloud Services", type: "ACH", date: "Mar 10", amount: "$48,210.00", status: "Settled", color: "text-green-600" },
                                            ].map(row => (
                                                <TableRow key={row.ref}>
                                                    <TableCell className="font-mono text-xs text-gray-500">{row.ref}</TableCell>
                                                    <TableCell className="font-medium">{row.recipient}</TableCell>
                                                    <TableCell><Badge variant="outline" className="text-xs font-normal">{row.type}</Badge></TableCell>
                                                    <TableCell className="text-gray-500 text-sm">{row.date}</TableCell>
                                                    <TableCell className="text-right font-mono font-semibold">{row.amount}</TableCell>
                                                    <TableCell className={`text-right text-sm font-semibold ${row.color}`}>{row.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </section>

                            {/* ── Avatar ── */}
                            <section>
                                <H2 className="mb-1">Avatar</H2>
                                <Body className="text-gray-500 mb-8">User and team identity — with image fallback to initials.</Body>
                                <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm space-y-6">
                                    <div className="flex flex-wrap gap-4 items-end">
                                        {[
                                            { initials: "SR", name: "Sarah R.", role: "Treasury Lead", size: "h-14 w-14 text-base" },
                                            { initials: "MK", name: "Marcus K.", role: "Analyst", size: "h-10 w-10 text-sm" },
                                            { initials: "JP", name: "Julia P.", role: "Controller", size: "h-8 w-8 text-xs" },
                                            { initials: "AL", name: "Alex L.", role: "CFO", size: "h-6 w-6 text-[10px]" },
                                        ].map(u => (
                                            <div key={u.initials} className="flex flex-col items-center gap-2">
                                                <Avatar className={u.size}>
                                                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">{u.initials}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-center">
                                                    <p className="text-xs font-semibold text-gray-700">{u.name}</p>
                                                    <p className="text-[10px] text-gray-400">{u.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-xs font-mono text-gray-400 mb-3">Approval group — stacked</p>
                                        <div className="flex items-center">
                                            {["SR", "MK", "JP", "AL", "+3"].map((i, idx) => (
                                                <Avatar key={i} className="h-8 w-8 border-2 border-white text-xs" style={{ marginLeft: idx > 0 ? -10 : 0 }}>
                                                    <AvatarFallback className={idx === 4 ? "bg-gray-100 text-gray-500 text-[10px]" : "bg-blue-100 text-blue-700 font-semibold"}>{i}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                            <span className="ml-3 text-sm text-gray-500">Approvers assigned</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ── Dialog ── */}
                            <section>
                                <H2 className="mb-1">Dialog</H2>
                                <Body className="text-gray-500 mb-8">Modal dialogs for confirmations, forms, and detail views requiring focused attention.</Body>
                                <div className="flex flex-wrap gap-4 p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Confirm Transfer</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Confirm Wire Transfer</DialogTitle>
                                                <DialogDescription>Review the details below before approving this transfer.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-3 py-2">
                                                {[["Recipient", "Vertex Capital LLC"], ["Account", "USD Operations"], ["Amount", "$124,500.00"], ["Fee", "$25.00"], ["Total", "$124,525.00"]].map(([k, v]) => (
                                                    <div key={k} className="flex justify-between text-sm">
                                                        <span className="text-gray-500">{k}</span>
                                                        <span className="font-semibold text-gray-900">{v}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <DialogFooter className="gap-2 sm:gap-0">
                                                <Button variant="outline">Cancel</Button>
                                                <Button>Approve & Send</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">Delete Account</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Delete Account</DialogTitle>
                                                <DialogDescription>This will permanently delete the FX Hedging Account and all associated data. This action cannot be undone.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button variant="destructive">Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </section>

                            {/* ── Dropdown Menu ── */}
                            <section>
                                <H2 className="mb-1">Dropdown Menu</H2>
                                <Body className="text-gray-500 mb-8">Contextual action menus triggered from buttons, icons, or table rows.</Body>
                                <div className="flex flex-wrap gap-6 p-8 border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Account Actions ▾</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-52">
                                            <DropdownMenuLabel>Operations Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View statement</DropdownMenuItem>
                                            <DropdownMenuItem>Initiate transfer</DropdownMenuItem>
                                            <DropdownMenuItem>Download CSV</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Close account</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">⋯</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-44">
                                            <DropdownMenuItem>Edit details</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem>Archive</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </section>

                            {/* ── Form Cards ── */}
                            <section>
                                <H2 className="mb-1">Form Cards</H2>
                                <Body className="text-gray-500 mb-8">Selectable cards for single or multi-selection flows — pixel-perfect from the Figma <em>single-selection-form-card-v2</em> component.</Body>

                                <div className="space-y-10">
                                    {/* Single selection — radio */}
                                    <div>
                                        <H5 className="mb-4 text-gray-600">Single Selection (Radio)</H5>
                                        <FormCardRadioDemo />
                                    </div>

                                    {/* Multi selection — checkbox */}
                                    <div>
                                        <H5 className="mb-4 text-gray-600">Multi Selection (Checkbox)</H5>
                                        <FormCardCheckboxDemo />
                                    </div>

                                    {/* Layouts */}
                                    <div>
                                        <H5 className="mb-4 text-gray-600">Layouts</H5>
                                        <div className="flex flex-col gap-4 p-8 border border-gray-100 rounded-xl bg-gray-50">
                                            <div className="flex flex-wrap gap-4 items-start">
                                                <div className="flex flex-col gap-1.5 w-[281px]">
                                                    <Caption className="text-gray-400 uppercase tracking-wide font-medium">Tall (default)</Caption>
                                                    <FormCard layout="tall" label="Mint token" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." icon={<RlusdIcon />} />
                                                </div>
                                                <div className="flex flex-col gap-1.5 flex-1 min-w-[320px]">
                                                    <Caption className="text-gray-400 uppercase tracking-wide font-medium">Long</Caption>
                                                    <FormCard layout="long" label="Mint token" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." icon={<RlusdIcon />} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* States */}
                                    <div>
                                        <H5 className="mb-4 text-gray-600">States</H5>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border border-gray-100 rounded-xl bg-gray-50">
                                            {[
                                                { label: "Default", props: {} },
                                                { label: "Selected (radio)", props: { selected: true } },
                                                { label: "Selected (checkbox)", props: { selected: true, selectionType: "checkbox" as const } },
                                                { label: "Disabled", props: { disabled: true, selected: true } },
                                            ].map(({ label, props }) => (
                                                <div key={label} className="flex flex-col gap-1.5">
                                                    <Caption className="text-gray-400 uppercase tracking-wide font-medium">{label}</Caption>
                                                    <FormCard label="Mint token" description="Lorem ipsum dolor sit amet." icon={<RlusdIcon />} {...props} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ═══════════════════════════════════
                                FEEDBACK
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Toast</H2>
                                <Body className="text-gray-500 mb-8">Transient notification messages using Sonner.</Body>
                                <div className="flex flex-wrap gap-3">
                                    <Button onClick={() => toast("Transaction submitted")}>Default</Button>
                                    <Button variant="outline" onClick={() => toast.success("Payment confirmed")}>Success</Button>
                                    <Button variant="outline" onClick={() => toast.error("Transaction failed")}>Error</Button>
                                    <Button variant="outline" onClick={() => toast.warning("Low balance warning")}>Warning</Button>
                                    <Button variant="outline" onClick={() => toast.loading("Processing…")}>Loading</Button>
                                    <Button variant="outline" onClick={() => toast("Event created", { description: "Monday, January 3rd at 6:00pm", action: { label: "Undo", onClick: () => {} } })}>With Action</Button>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Progress Bar</H2>
                                <Body className="text-gray-500 mb-8">Communicates completion status of a task or process.</Body>
                                <div className="space-y-4 max-w-md">
                                    {[10, 33, 66, 100].map(v => (
                                        <div key={v} className="space-y-1">
                                            <div className="flex justify-between">
                                                <Caption className="text-gray-500">Progress</Caption>
                                                <Caption className="text-gray-500">{v}%</Caption>
                                            </div>
                                            <Progress value={v} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Spinner</H2>
                                <Body className="text-gray-500 mb-8">Animated loading indicator — inherits color from context.</Body>
                                <div className="flex items-center gap-8">
                                    {(["sm", "md", "lg"] as const).map(s => (
                                        <div key={s} className="flex flex-col items-center gap-2">
                                            <Spinner size={s} />
                                            <Caption className="text-gray-400">{s}</Caption>
                                        </div>
                                    ))}
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-blue-500"><Spinner size="md" /></span>
                                        <Caption className="text-gray-400">colored</Caption>
                                    </div>
                                </div>
                            </section>

                            {/* ═══════════════════════════════════
                                DATA INPUT
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Radio Group</H2>
                                <Body className="text-gray-500 mb-8">Single-choice selection from a list of options.</Body>
                                <RadioGroup defaultValue="card" className="space-y-2">
                                    {[
                                        { value: "card", label: "Credit / Debit Card" },
                                        { value: "wire", label: "Bank Wire Transfer" },
                                        { value: "crypto", label: "Crypto Wallet" },
                                    ].map(({ value, label }) => (
                                        <div key={value} className="flex items-center gap-2">
                                            <RadioGroupItem value={value} id={`radio-${value}`} />
                                            <Label htmlFor={`radio-${value}`}>{label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </section>

                            <section>
                                <H2 className="mb-1">Slider</H2>
                                <Body className="text-gray-500 mb-8">Range input for selecting a value within a defined range.</Body>
                                <div className="space-y-6 max-w-md">
                                    <Slider defaultValue={[40]} max={100} step={1} />
                                    <Slider defaultValue={[20, 70]} max={100} step={1} />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Input Number</H2>
                                <Body className="text-gray-500 mb-8">Numeric input with increment/decrement controls, min/max clamping.</Body>
                                <div className="flex flex-wrap gap-6">
                                    <div className="space-y-1">
                                        <Label>Amount (USDC)</Label>
                                        <InputNumber defaultValue={100} step={10} min={0} max={10000} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Percentage</Label>
                                        <InputNumber defaultValue={25} step={1} min={0} max={100} precision={1} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Disabled</Label>
                                        <InputNumber defaultValue={50} disabled />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Segmented Control</H2>
                                <Body className="text-gray-500 mb-8">Mutually exclusive option group — exactly one active at a time.</Body>
                                <div className="space-y-4">
                                    <Segmented defaultValue="7d" options={[
                                        { label: "24h", value: "24h" },
                                        { label: "7d", value: "7d" },
                                        { label: "30d", value: "30d" },
                                        { label: "1y", value: "1y" },
                                    ]} />
                                    <Segmented defaultValue="list" options={[
                                        { label: "List", value: "list" },
                                        { label: "Grid", value: "grid" },
                                        { label: "Chart", value: "chart", disabled: true },
                                    ]} />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Date Picker</H2>
                                <Body className="text-gray-500 mb-8">Calendar popover for selecting a single date.</Body>
                                <div className="flex flex-wrap gap-4">
                                    <DatePicker placeholder="Select transaction date" />
                                    <DatePicker defaultValue={new Date()} />
                                    <DatePicker disabled placeholder="Disabled" />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">OTP Input</H2>
                                <Body className="text-gray-500 mb-8">One-time password input for authentication flows.</Body>
                                <InputOTP maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </section>

                            <section>
                                <H2 className="mb-1">Command Palette</H2>
                                <Body className="text-gray-500 mb-8">Searchable command menu — also composable as a combobox.</Body>
                                <div className="border border-gray-100 rounded-xl overflow-hidden max-w-sm shadow-sm">
                                    <Command>
                                        <CommandInput placeholder="Search transactions, accounts…" />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="Accounts">
                                                <CommandItem>Treasury Main</CommandItem>
                                                <CommandItem>Operating Account</CommandItem>
                                                <CommandItem>Reserve Fund</CommandItem>
                                            </CommandGroup>
                                            <CommandSeparator />
                                            <CommandGroup heading="Actions">
                                                <CommandItem>New Transfer</CommandItem>
                                                <CommandItem>Export Report</CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </div>
                            </section>

                            {/* ═══════════════════════════════════
                                DATA DISPLAY
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Accordion</H2>
                                <Body className="text-gray-500 mb-8">Collapsible content panels for progressive disclosure.</Body>
                                <Accordion type="single" collapsible className="max-w-lg border border-gray-100 rounded-xl bg-white shadow-sm px-4">
                                    {[
                                        { value: "fees", trigger: "Transaction Fees", content: "Fees are calculated as 0.1% of the transaction amount, with a minimum of $1 and a maximum of $50." },
                                        { value: "limits", trigger: "Transfer Limits", content: "Standard accounts can transfer up to $50,000 per day. Verified accounts have no daily limit." },
                                        { value: "settlement", trigger: "Settlement Times", content: "Domestic transfers settle within 1 business day. International transfers take 2–5 business days." },
                                    ].map(({ value, trigger, content }) => (
                                        <AccordionItem key={value} value={value}>
                                            <AccordionTrigger>{trigger}</AccordionTrigger>
                                            <AccordionContent>{content}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </section>

                            <section>
                                <H2 className="mb-1">Popover</H2>
                                <Body className="text-gray-500 mb-8">Floating contextual content anchored to a trigger element.</Body>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">What is APY?</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72">
                                        <H5 className="mb-1">Annual Percentage Yield</H5>
                                        <Body className="text-gray-500 text-sm">APY reflects the total interest earned in a year, including compound interest. Higher APY = more earnings on your deposits.</Body>
                                    </PopoverContent>
                                </Popover>
                            </section>

                            <section>
                                <H2 className="mb-1">Hover Card</H2>
                                <Body className="text-gray-500 mb-8">Rich preview shown on hover — useful for user or asset previews.</Body>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button variant="link">@treasury.main</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-64">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-semibold shrink-0">T</div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Treasury Main</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Primary operating account · $2.8M balance</p>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </section>

                            <section>
                                <H2 className="mb-1">Tag / Chip</H2>
                                <Body className="text-gray-500 mb-8">Compact inline labels for categorization and filtering.</Body>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {(["default", "blue", "green", "error", "orange", "purple"] as const).map(v => (
                                            <Tag key={v} variant={v}>{v}</Tag>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["USDC", "ETH", "BTC", "Treasury"].map(t => (
                                            <Tag key={t} variant="blue" onRemove={() => {}}>{t}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Timeline</H2>
                                <Body className="text-gray-500 mb-8">Vertical event history with status indicators.</Body>
                                <Timeline items={[
                                    { id: "1", title: "Payment initiated", description: "Transfer of $50,000 to Vendor A", timestamp: "9:00 AM", status: "complete" },
                                    { id: "2", title: "Compliance review", description: "AML check passed", timestamp: "9:15 AM", status: "complete" },
                                    { id: "3", title: "Bank processing", description: "Awaiting bank confirmation", timestamp: "9:30 AM", status: "active" },
                                    { id: "4", title: "Settlement", description: "Funds released to recipient", timestamp: "Pending", status: "default" },
                                    { id: "5", title: "Failed attempt", description: "Insufficient funds error", timestamp: "8:45 AM", status: "error" },
                                ] satisfies TimelineItem[]} />
                            </section>

                            <section>
                                <H2 className="mb-1">KPI Card</H2>
                                <Body className="text-gray-500 mb-8">Statistic display for financial metrics with optional trend indicator.</Body>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <KpiCard label="Total Balance" value="$2,847,391" trend={{ direction: "up", label: "+12.4% this month" }} icon={<DollarSign className="w-5 h-5" />} />
                                    <KpiCard label="Outflows" value="$341,200" trend={{ direction: "down", label: "-3.1% this month" }} icon={<ArrowUpRight className="w-5 h-5" />} />
                                    <KpiCard label="Reserves" value="$1,200,000" trend={{ direction: "neutral", label: "No change" }} icon={<Wallet className="w-5 h-5" />} />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Empty State</H2>
                                <Body className="text-gray-500 mb-8">Zero-state screen for when there is no data to display.</Body>
                                <div className="border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <EmptyState
                                        icon={<Inbox className="w-full h-full" />}
                                        title="No transactions yet"
                                        description="Once you make your first transfer, it will appear here."
                                        action={{ label: "Make a Transfer", onClick: () => {} }}
                                    />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Carousel</H2>
                                <Body className="text-gray-500 mb-8">Scrollable slide container for featured content.</Body>
                                <div className="max-w-sm">
                                    <Carousel>
                                        <CarouselContent>
                                            {["Bitcoin", "Ethereum", "USDC", "Ripple"].map((asset, i) => (
                                                <CarouselItem key={i}>
                                                    <div className="border border-gray-100 rounded-xl bg-white shadow-sm p-8 text-center">
                                                        <p className="text-sm text-gray-500 mb-1">Asset</p>
                                                        <p className="text-2xl font-bold text-gray-900">{asset}</p>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Calendar</H2>
                                <Body className="text-gray-500 mb-8">Date navigation component — used standalone or inside a Date Picker.</Body>
                                <div className="border border-gray-100 rounded-xl bg-white shadow-sm w-fit">
                                    <Calendar mode="single" />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Scroll Area</H2>
                                <Body className="text-gray-500 mb-8">Custom-styled scrollable container.</Body>
                                <ScrollArea className="h-48 w-72 border border-gray-100 rounded-xl bg-white shadow-sm p-4">
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                                            <span className="text-sm text-gray-700">Transaction #{i + 1}</span>
                                            <span className="text-sm text-gray-500">${((i + 1) * 1337).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </section>

                            {/* ═══════════════════════════════════
                                NAVIGATION
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Breadcrumb</H2>
                                <Body className="text-gray-500 mb-8">Shows the user's location within a navigation hierarchy.</Body>
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem><BreadcrumbLink href="#">Accounts</BreadcrumbLink></BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem><BreadcrumbPage>Treasury Main</BreadcrumbPage></BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </section>

                            <section>
                                <H2 className="mb-1">Pagination</H2>
                                <Body className="text-gray-500 mb-8">Page navigation for large data sets.</Body>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </section>

                            <section>
                                <H2 className="mb-1">Navigation Menu</H2>
                                <Body className="text-gray-500 mb-8">Accessible top-level navigation with dropdown panels.</Body>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>Accounts</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-48 gap-1 p-2">
                                                    {["Treasury Main", "Operating", "Reserve Fund"].map(item => (
                                                        <li key={item}><NavigationMenuLink className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">{item}</NavigationMenuLink></li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-48 gap-1 p-2">
                                                    {["P&L", "Cash Flow", "Audit Log"].map(item => (
                                                        <li key={item}><NavigationMenuLink className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">{item}</NavigationMenuLink></li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </section>

                            <section>
                                <H2 className="mb-1">Stepper</H2>
                                <Body className="text-gray-500 mb-8">Multi-step progress indicator for sequential flows.</Body>
                                <div className="space-y-8">
                                    <Stepper steps={[
                                        { label: "Account", description: "Details", status: "complete" },
                                        { label: "KYC", description: "Identity", status: "complete" },
                                        { label: "Funding", description: "Deposit", status: "active" },
                                        { label: "Review", description: "Confirm", status: "pending" },
                                    ]} />
                                    <Stepper steps={[
                                        { label: "Submit", status: "complete" },
                                        { label: "Validate", status: "error" },
                                        { label: "Approve", status: "pending" },
                                    ]} />
                                </div>
                            </section>

                            {/* ═══════════════════════════════════
                                OVERLAYS
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Drawer</H2>
                                <Body className="text-gray-500 mb-8">Bottom sheet panel — ideal for mobile detail views.</Body>
                                <Drawer>
                                    <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Transaction Details</DrawerTitle>
                                            <DrawerDescription>Review the details of this transaction before confirming.</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="px-4 py-2 space-y-2">
                                            {[["Amount", "$50,000.00"], ["Recipient", "Vendor A"], ["Reference", "INV-2024-001"], ["Status", "Pending"]].map(([k, v]) => (
                                                <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                                                    <span className="text-sm text-gray-500">{k}</span>
                                                    <span className="text-sm font-medium text-gray-900">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <DrawerFooter>
                                            <Button>Confirm Transfer</Button>
                                            <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </section>

                            <section>
                                <H2 className="mb-1">Sheet</H2>
                                <Body className="text-gray-500 mb-8">Side panel that slides in from the edge — for settings and filters.</Body>
                                <div className="flex gap-3">
                                    <Sheet>
                                        <SheetTrigger asChild><Button variant="outline">Open Right</Button></SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Filter Transactions</SheetTitle>
                                                <SheetDescription>Narrow down transactions by date, type, and amount.</SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Date Range</Label>
                                                    <DatePicker placeholder="Start date" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Type</Label>
                                                    <Select>
                                                        <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="transfer">Transfer</SelectItem>
                                                            <SelectItem value="deposit">Deposit</SelectItem>
                                                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <SheetFooter><SheetClose asChild><Button>Apply Filters</Button></SheetClose></SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                    <Sheet>
                                        <SheetTrigger asChild><Button variant="outline">Open Left</Button></SheetTrigger>
                                        <SheetContent side="left">
                                            <SheetHeader><SheetTitle>Navigation</SheetTitle></SheetHeader>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Context Menu</H2>
                                <Body className="text-gray-500 mb-8">Right-click menu with contextual actions.</Body>
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400 cursor-default select-none">
                                            Right-click here
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem>View Details</ContextMenuItem>
                                        <ContextMenuItem>Copy Reference</ContextMenuItem>
                                        <ContextMenuItem>Download Receipt</ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem className="text-orange-500">Cancel Transaction</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </section>

                            {/* ═══════════════════════════════════
                                LAYOUT
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Collapsible</H2>
                                <Body className="text-gray-500 mb-8">Toggle content visibility without the full styling of Accordion.</Body>
                                <Collapsible className="max-w-sm border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                                        Advanced Settings
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="px-4 pb-4 space-y-2 text-sm text-gray-500">
                                        <p>Slippage tolerance: 0.5%</p>
                                        <p>Gas price: Standard</p>
                                        <p>Transaction deadline: 20 minutes</p>
                                    </CollapsibleContent>
                                </Collapsible>
                            </section>

                            <section>
                                <H2 className="mb-1">Resizable Panels</H2>
                                <Body className="text-gray-500 mb-8">Draggable split-pane layout for adjustable views.</Body>
                                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm h-40">
                                    <ResizablePanelGroup direction="horizontal">
                                        <ResizablePanel defaultSize={40}>
                                            <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-500">Sidebar</div>
                                        </ResizablePanel>
                                        <ResizableHandle withHandle />
                                        <ResizablePanel defaultSize={60}>
                                            <div className="flex h-full items-center justify-center bg-white text-sm text-gray-500">Main Content</div>
                                        </ResizablePanel>
                                    </ResizablePanelGroup>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Aspect Ratio</H2>
                                <Body className="text-gray-500 mb-8">Constrains child content to a consistent width/height ratio.</Body>
                                <div className="flex gap-6 flex-wrap">
                                    {([[16, 9], [4, 3], [1, 1]] as [number, number][]).map(([w, h]) => (
                                        <div key={`${w}:${h}`} className="w-48">
                                            <AspectRatio ratio={w / h} className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                                                <div className="flex items-center justify-center h-full text-sm text-gray-400">{w}:{h}</div>
                                            </AspectRatio>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ═══════════════════════════════════
                                TOGGLE
                                ═══════════════════════════════════ */}

                            <section>
                                <H2 className="mb-1">Toggle</H2>
                                <Body className="text-gray-500 mb-8">A pressable button that toggles between on and off states.</Body>
                                <div className="flex gap-3 flex-wrap">
                                    <Toggle aria-label="Bold"><Bold className="w-4 h-4" /></Toggle>
                                    <Toggle aria-label="Italic"><Italic className="w-4 h-4" /></Toggle>
                                    <Toggle aria-label="Underline"><Underline className="w-4 h-4" /></Toggle>
                                    <Toggle variant="outline" aria-label="Outline Bold"><Bold className="w-4 h-4" /></Toggle>
                                    <Toggle disabled aria-label="Disabled"><Bold className="w-4 h-4" /></Toggle>
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Toggle Group</H2>
                                <Body className="text-gray-500 mb-8">A set of toggles — supports single or multiple selection.</Body>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Caption className="text-gray-400">Single (text alignment)</Caption>
                                        <ToggleGroup type="single" defaultValue="left">
                                            <ToggleGroupItem value="left" aria-label="Left"><AlignLeft className="w-4 h-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="center" aria-label="Center"><AlignCenter className="w-4 h-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="right" aria-label="Right"><AlignRight className="w-4 h-4" /></ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                    <div className="space-y-1">
                                        <Caption className="text-gray-400">Multiple (text formatting)</Caption>
                                        <ToggleGroup type="multiple">
                                            <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="w-4 h-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="w-4 h-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="w-4 h-4" /></ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                </div>
                            </section>

                        </motion.div>
                    )}

                    {activeTab === "motion" && (
                        <motion.div key="motion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-16">

                            <section>
                                <H2 className="mb-1">Duration</H2>
                                <Body className="text-gray-500 mb-8">Timing tokens for consistent animation pacing. Hover a row to feel each speed.</Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{durations.map(d => <DurationRow key={d.name} d={d} />)}</div>
                            </section>

                            <section>
                                <H2 className="mb-1">Easing</H2>
                                <Body className="text-gray-500 mb-8">Easing curves define the character of each motion. Hover a row to preview.</Body>
                                <div className="space-y-3">{easings.map(e => <EasingRow key={e.name} e={e} />)}</div>
                            </section>

                            <section>
                                <H2 className="mb-1">Core Patterns</H2>
                                <Body className="text-gray-500 mb-8">Fundamental motion patterns used throughout the system. Hover any card to replay.</Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {motionPatterns.map(p => <MotionDemo key={p.name} pattern={p} />)}
                                    <StaggerDemo />
                                    <SpringDemo />
                                    <LayoutDemo />
                                    <PulseDemo />
                                    <ProgressDemo />
                                    <RippleDemo />
                                    <ToastDemo />
                                    <HoverTapDemo />
                                    <AccordionDemo />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Effects</H2>
                                <Body className="text-gray-500 mb-8">
                                    Expressive effects for delight and emphasis — adapted from <span className="font-medium text-gray-700">animate-ui</span>.
                                </Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <CounterDemo />
                                    <TypingDemo />
                                    <ShineDemo />
                                    <MagneticDemo />
                                    <TiltDemo />
                                    <BlurInDemo />
                                    <RollInDemo />
                                    <TextRevealDemo />
                                    <GradientDemo />
                                    <OrbitDemo />
                                    <NumberFlipDemo />
                                    <SpotlightDemo />
                                    <HighlightTextDemo />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Text Animations</H2>
                                <Body className="text-gray-500 mb-8">
                                    Text-specific motion patterns — inspired by <span className="font-medium text-gray-700">animate-ui</span> primitives.
                                </Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MorphingTextDemo />
                                    <RotatingTextDemo />
                                    <ShimmeringTextDemo />
                                    <SplittingTextDemo />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Button Animations</H2>
                                <Body className="text-gray-500 mb-8">Interactive button patterns with expressive motion feedback.</Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FlipButtonDemo />
                                    <LiquidButtonDemo />
                                </div>
                            </section>

                            <section>
                                <H2 className="mb-1">Principles</H2>
                                <Body className="text-gray-500 mb-8">Guidelines that govern how motion is used in Ripple.</Body>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { title: "Purposeful", body: "Every animation should communicate meaning — state changes, hierarchy, or spatial relationships. Never animate for decoration alone." },
                                        { title: "Responsive", body: "Motion should never block interaction. Keep durations short and ensure animations don't delay user input." },
                                        { title: "Consistent", body: "Use the same timing tokens and easing curves throughout. Predictable motion builds trust and feels polished." },
                                    ].map((p, i) => (
                                        <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.08 }} className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                                            <H5 className="mb-2">{p.title}</H5>
                                            <Body className="text-gray-500">{p.body}</Body>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}
