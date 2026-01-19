import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-slate-700 text-slate-300",
        primary:
          "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        secondary:
          "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        success:
          "bg-green-500/20 text-green-400 border border-green-500/30",
        warning:
          "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        danger:
          "bg-red-500/20 text-red-400 border border-red-500/30",
        purple:
          "bg-purple-500/20 text-purple-400 border border-purple-500/30",
        // Status badges
        review:
          "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30",
        claimed:
          "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30",
        approved:
          "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30",
        scheduled:
          "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30",
        published:
          "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10",
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
