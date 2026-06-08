export default function About() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-bold">About Me</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                I'm a B.Tech Computer Science student and aspiring full-stack developer from Hyderabad, Telangana. 
                I'm passionate about building web applications and continuously improving my skills in web development.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                My journey in tech has been driven by curiosity and a commitment to learning. I enjoy working on projects 
                that help me practice data structures, algorithms, and full-stack concepts.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Currently, I'm preparing for technical assessments and internships while building projects to strengthen 
                my skills in frontend, backend, and database integration.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <p className="text-sm text-muted-foreground">Technologies Learning</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Dedication to Learning</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">B.Tech</div>
                <p className="text-sm text-muted-foreground">CSE Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
