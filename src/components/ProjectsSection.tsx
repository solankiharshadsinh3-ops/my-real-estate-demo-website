import React, { useState } from 'react';
import { ArrowRight, Building2, Calendar, Check, MapPin, X } from 'lucide-react';
import { ExclusiveProject } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  projects: ExclusiveProject[];
  onEnquireProject: (projectName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onEnquireProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<ExclusiveProject | null>(null);

  const [leadProject, ...otherProjects] = projects;

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Signature Developments
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
              Exclusive Upcoming &amp; Landmark Projects
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#777E88] max-w-md leading-relaxed">
            Private access to premier residential enclaves and international commercial towers across Gujarat’s growth corridors.
          </p>
        </div>

        {/* Marquee Editorial Project Feature */}
        {leadProject && (
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#101B2D] text-white border border-[#C9A66B]/30 mb-10 overflow-hidden items-stretch">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <div
                className="w-full h-[calc(100%+28px)] -mt-3.5 animate-float-image-deep"
                style={{ animationDelay: '0.9s' }}
              >
                <ResilientImage
                  src={leadProject.coverImage}
                  alt={leadProject.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-[#101B2D]/90 border border-[#C9A66B]/40 text-[#C9A66B] text-[11px] font-semibold tracking-[0.14em] uppercase">
                {leadProject.status}
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#C9A66B] mb-2">
                  <span>{leadProject.developer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadProject.completion}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-3">
                  {leadProject.name}
                </h3>
                <p className="inline-flex items-center gap-1.5 text-sm text-white/75 mb-5">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>{leadProject.location}</span>
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {leadProject.summary}
                </p>
                <p className="text-xs text-white/70 pb-5 border-b border-white/10">
                  {leadProject.configuration}
                </p>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/60 block">
                    Starting From
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#C9A66B] tabular-nums">
                    {leadProject.startingPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(leadProject)}
                  className="btn-lux-gold px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 btn-lux-arrow" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Editorial Grid (4 Developments) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#F7F6F2] border border-[#101B2D]/10 hover:border-[#C9A66B]/60 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101B2D]">
                <ResilientImage
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/75 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#101B2D]/90 border border-[#C9A66B]/30 text-[#C9A66B] text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {project.status}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <span className="font-serif text-2xl font-semibold tabular-nums">
                    {project.startingPrice}
                  </span>
                  <span className="text-xs text-white/80 tabular-nums">{project.completion}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#777E88] mb-2">
                    <Building2 className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>{project.developer}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#101B2D] mb-1.5">
                    {project.name}
                  </h3>
                  <p className="inline-flex items-center gap-1.5 text-sm text-[#777E88] mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>{project.location}</span>
                  </p>
                  <p className="text-sm text-[#20252C]/80 leading-relaxed mb-5">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101B2D]/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-[#777E88] truncate">{project.configuration}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-lux-link inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[#101B2D] hover:text-[#C9A66B] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A66B] btn-lux-arrow" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#101B2D]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.name}
        >
          <div className="relative w-full max-w-3xl bg-white border border-[#C9A66B]/40 shadow-2xl overflow-hidden my-auto">
            <div className="relative aspect-[16/9] bg-[#101B2D]">
              <ResilientImage
                src={selectedProject.coverImage}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
                eager
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/90 via-[#101B2D]/20 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="btn-lux-icon absolute top-4 right-4 w-10 h-10 bg-[#101B2D]/85 border border-white/15 hover:border-[#C9A66B] hover:bg-[#C9A66B] text-white hover:text-[#101B2D] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-[0.15em] text-[#C9A66B] block mb-1">
                  {selectedProject.developer} · {selectedProject.status}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold">
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-[#101B2D]/10 text-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                    Location
                  </span>
                  <span className="font-medium text-[#101B2D]">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                    Starting Price
                  </span>
                  <span className="font-semibold text-[#101B2D] tabular-nums">
                    {selectedProject.startingPrice}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                    Delivery Timeline
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#101B2D]">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A66B]" />
                    {selectedProject.completion}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#20252C]/85 leading-relaxed">
                {selectedProject.summary}
              </p>

              <div>
                <h4 className="font-serif text-xl font-semibold text-[#101B2D] mb-3">
                  Development Highlights
                </h4>
                <ul className="space-y-2 text-sm text-[#20252C]/85">
                  {selectedProject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#101B2D]/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#777E88]">{selectedProject.configuration}</span>
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedProject.name;
                    setSelectedProject(null);
                    onEnquireProject(name);
                  }}
                  className="btn-lux-navy px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase cursor-pointer"
                >
                  Request Project Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
