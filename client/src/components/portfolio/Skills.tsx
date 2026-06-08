import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

interface SkillWithProgress {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Skills() {
  const { data: skills, isLoading } = trpc.portfolio.skills.useQuery();
  const [groupedSkills, setGroupedSkills] = useState<Record<string, SkillWithProgress[]>>({});

  useEffect(() => {
    if (skills) {
      const grouped = skills.reduce(
        (acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill);
          return acc;
        },
        {} as Record<string, SkillWithProgress[]>
      );
      setGroupedSkills(grouped);
    }
  }, [skills]);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-12">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-bold">Skills & Expertise</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
          </div>

          {/* Skills Grid */}
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-4 w-24" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary">{category}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                      >
                        <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                        <span className="font-medium text-foreground">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
