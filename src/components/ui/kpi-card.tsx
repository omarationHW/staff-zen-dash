import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
    label?: string;
  };
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "warning" | "destructive";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-gradient-primary text-white",
  secondary: "bg-gradient-secondary text-white",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  className,
  variant = "default" 
}: KPICardProps) {
  const TrendIcon = trend?.direction === "up" ? TrendingUp : 
                   trend?.direction === "down" ? TrendingDown : Minus;

  const trendColor = trend?.direction === "up" ? "text-secondary" :
                    trend?.direction === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-card-lg",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "text-sm font-medium",
            variant === "default" ? "text-muted-foreground" : "text-current opacity-90"
          )}>
            {title}
          </h3>
          {icon && (
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              variant === "default" ? "bg-muted" : "bg-white/10"
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className={cn(
            "text-2xl font-bold font-mono tracking-tight",
            variant === "default" ? "text-foreground" : "text-current"
          )}>
            {value}
          </div>
          
          {subtitle && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-muted-foreground" : "text-current opacity-75"
            )}>
              {subtitle}
            </p>
          )}
          
          {trend && (
            <div className="flex items-center gap-1">
              <TrendIcon className={cn("w-3 h-3", trendColor)} />
              <span className={cn("text-xs font-medium", trendColor)}>
                {trend.value}
              </span>
              {trend.label && (
                <span className={cn(
                  "text-xs",
                  variant === "default" ? "text-muted-foreground" : "text-current opacity-75"
                )}>
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}