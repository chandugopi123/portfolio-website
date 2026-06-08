import { ExternalLink, Github } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveLink: string | null;
  githubLink: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Projects() {
  const { data: projects, isLoading } = trpc.portfolio.projects.useQuery();

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-bold">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project: ProjectData) => (
                <div
                  key={project.id}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-2">📱</div>
                        <p className="text-sm">Project Preview</p>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      {project.liveLink && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Github size={16} />
                            <span>Code</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (!projects || projects.length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Projects will be displayed here. Add your first project to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
