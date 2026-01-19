"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Home,
  Upload,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Sparkles,
  CheckCircle,
  Calendar,
  BarChart3,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  role: "ambassador" | "journalist" | "admin"
}

const menuItems = {
  ambassador: [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/ambassador" },
    { icon: Upload, label: "Upload Profile", href: "/dashboard/ambassador/upload" },
    { icon: FileText, label: "My Submissions", href: "/dashboard/ambassador/submissions" },
    { icon: Settings, label: "Settings", href: "/dashboard/ambassador/settings" },
  ],
  journalist: [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/journalist" },
    { icon: FileText, label: "Available Profiles", href: "/dashboard/journalist/profiles" },
    { icon: Users, label: "My Claims", href: "/dashboard/journalist/claims" },
    { icon: Upload, label: "Submit Story", href: "/dashboard/journalist/submit" },
    { icon: Settings, label: "Settings", href: "/dashboard/journalist/settings" },
  ],
  admin: [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: FileText, label: "Review Queue", href: "/dashboard/admin/review" },
    { icon: Sparkles, label: "AI Content", href: "/dashboard/admin/ai-content" },
    { icon: CheckCircle, label: "Approved", href: "/dashboard/admin/approved" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/admin/schedule" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/admin/analytics" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
}

const roleLabels = {
  ambassador: "Ambassador",
  journalist: "Journalist",
  admin: "Global Admin",
}

const roleColors = {
  ambassador: "emerald",
  journalist: "blue",
  admin: "purple",
}

export function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const items = menuItems[role]
  const color = roleColors[role]

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center shadow-lg",
            color === "emerald" && "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
            color === "blue" && "from-blue-500 to-blue-600 shadow-blue-500/30",
            color === "purple" && "from-purple-500 to-purple-600 shadow-purple-500/30"
          )}>
            <span className="text-xl font-bold text-white">H</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-lg font-bold text-white whitespace-nowrap">Habuhtat</span>
                <div className={cn(
                  "text-xs font-medium",
                  color === "emerald" && "text-emerald-400",
                  color === "blue" && "text-blue-400",
                  color === "purple" && "text-purple-400"
                )}>
                  {roleLabels[role]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer",
                  isActive
                    ? cn(
                        "text-white",
                        color === "emerald" && "bg-emerald-500/20 text-emerald-400",
                        color === "blue" && "bg-blue-500/20 text-blue-400",
                        color === "purple" && "bg-purple-500/20 text-purple-400"
                      )
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <ChevronLeft className={cn("w-5 h-5 shrink-0 transition-transform", isCollapsed && "rotate-180")} />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <Link href="/login">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
          x: isMobileOpen ? 0 : -256,
        }}
        className={cn(
          "fixed md:relative md:translate-x-0 z-50 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all",
          "md:animate-none"
        )}
        style={{ width: isCollapsed ? 80 : 256 }}
      >
        {sidebarContent}
      </motion.aside>
    </>
  )
}
