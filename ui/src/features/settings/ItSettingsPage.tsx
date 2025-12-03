// src/features/it/settings/ItSettingsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, Mail, Cloud, Palette } from "lucide-react";

const sections = [
  {
    icon: Settings2,
    title: "Core configuration",
    description:
      "Base URLs, environment flags, maintenance mode and critical toggles.",
  },
  {
    icon: Mail,
    title: "Email provider",
    description:
      "SMTP / transactional email provider configuration and test tools.",
  },
  {
    icon: Cloud,
    title: "Storage & uploads",
    description:
      "Configure object storage, public asset hostnames and upload rules.",
  },
  {
    icon: Palette,
    title: "Branding",
    description:
      "Logos, primary colors and basic branding options for the public site.",
  },
];

export function ItSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System settings"
        description="IT-only configuration for the AUSTRC system. These changes affect all users."
        actions={
          <Button variant="outline" disabled>
            Export config (coming soon)
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.title}
              className="hover:border-slate-700 hover:bg-slate-900/80 transition-colors"
            >
              <CardHeader className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80">
                  <Icon className="h-4 w-4 text-slate-200" />
                </div>
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {section.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-1 text-[11px] text-slate-500">
                Configuration forms will be wired here when the backend and
                environment management are ready.
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
