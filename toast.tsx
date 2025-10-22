import * as React from "react"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export interface ToastActionElement {
  altText: string
  action: () => void
}

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ToastProps
>(({ className, title, description, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
        variant === "destructive"
          ? "border-red-500 bg-red-50 text-red-900"
          : "border-gray-200 bg-white"
      } ${className}`}
      {...props}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
    </div>
  )
})
Toast.displayName = "Toast"

export { Toast }

