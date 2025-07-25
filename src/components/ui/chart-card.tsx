import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  footerContent?: ReactNode;
}

export function ChartCard({ 
  title, 
  description, 
  children, 
  className,
  headerActions,
  footerContent
}: ChartCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-card-lg bg-gradient-card",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="w-full">
          {children}
        </div>
        
        {footerContent && (
          <div className="mt-4 pt-4 border-t border-border">
            {footerContent}
          </div>
        )}
      </CardContent>
    </Card>
  );
}