import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 text-slate-600",
        primary:
          "bg-sky-100 text-sky-700 border border-sky-200",
        secondary:
          "bg-emerald-50 text-emerald-700 border border-emerald-200",
        success:
          "bg-green-100 text-green-700 border border-green-200",
        warning:
          "bg-amber-100 text-amber-700 border border-amber-200",
        danger:
          "bg-red-100 text-red-700 border border-red-200",
        purple:
          "bg-indigo-100 text-indigo-700 border border-indigo-200",
        // Status badges
        review:
          "bg-amber-100 text-amber-700 border border-amber-200",
        claimed:
          "bg-sky-100 text-sky-700 border border-sky-200",
        approved:
          "bg-emerald-100 text-emerald-700 border border-emerald-200",
        scheduled:
          "bg-indigo-100 text-indigo-700 border border-indigo-200",
        published:
          "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm",
        draft:
          "bg-slate-100 text-slate-600 border border-slate-200",
        story_submitted:
          "bg-amber-100 text-amber-700 border border-amber-200",
        ai_generated:
          "bg-indigo-100 text-indigo-700 border border-indigo-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
