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
  ],
  journalist: [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/journalist" },
  ],
  admin: [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
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
      <div className="p-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center shadow-md",
            color === "emerald" && "from-emerald-500 to-emerald-600 shadow-emerald-200/60",
            color === "blue" && "from-sky-500 to-sky-600 shadow-sky-200/60",
            color === "purple" && "from-indigo-500 to-indigo-600 shadow-indigo-200/60"
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
                <span className="text-lg font-bold text-slate-900 whitespace-nowrap">Habuhtat</span>
                <div className={cn(
                  "text-xs font-medium",
                  color === "emerald" && "text-emerald-600",
                  color === "blue" && "text-sky-600",
                  color === "purple" && "text-indigo-600"
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
                        "text-slate-900",
                        color === "emerald" && "bg-emerald-100 text-emerald-700",
                        color === "blue" && "bg-sky-100 text-sky-700",
                        color === "purple" && "bg-indigo-100 text-indigo-700"
                      )
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
      <div className="p-4 border-t border-slate-200 space-y-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
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
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer">
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white text-slate-900 shadow-md border border-slate-200"
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
            className="md:hidden fixed inset-0 bg-slate-900/30 z-40"
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
          "fixed md:relative md:translate-x-0 z-50 h-screen bg-white border-r border-slate-200 flex flex-col transition-all",
          "md:animate-none"
        )}
        style={{ width: isCollapsed ? 80 : 256 }}
      >
        {sidebarContent}
      </motion.aside>
    </>
  )
}
