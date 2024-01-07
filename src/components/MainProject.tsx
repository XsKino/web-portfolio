import React from 'react'
import GitHubFillIcon from '@icons/jsx/GitHubFill'
import ExternalLinkIcon from '@icons/jsx/ExternalLink'
import TechnologyIcon from '@components/TechnologyIcon'
import { useDisclosure } from '@nextui-org/react'
import ProjectModal from '@components/ProjectModal'

import type { Project } from '../types/app'

interface Props {
  class?: string
  project: Project
}

export default function MainProject({ class: className, project }: Props): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      {/* Desktop */}
      <article
        className={`
          hidden md:flex flex-col aspect-square md:aspect-[unset] min-h-fit
          rounded-xl bg-background text-primary selection-primary
          shadow-xl shadow-background/50
          overflow-hidden ${className}
          `}>
        <img src={`/img/projects/${project.image}`} alt={`Image of project  ${project.name}`} />
        <div className='min-h-fit flex-1 flex flex-col justify-between p-4 gap-4 bg-gradient-to-t from-primary/25 via-transparent to-transparent'>
          <div className='flex justify-between items-center'>
            <h5 className='font-semibold uppercase'>{project.name}</h5>
            <div className='flex text-2xl gap-4 text-foreground select-none'>
              {project.github != null && (
                <a
                  title='GitHub repository'
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='opacity-75 hover:opacity-100'>
                  <GitHubFillIcon />
                </a>
              )}
              {project.github != null && (
                <a
                  title='Live project'
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='opacity-75 hover:opacity-100'>
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
          <p className='text-foreground selection-foreground-important font-extralight text-sm'>
            {project.description}
          </p>
          <div className='justify-self-end flex flex-col gap-2 items-center'>
            <h6 className='font-thin text-xs text-center uppercase'>Made With</h6>
            <div className='flex gap-4'>
              {project.technologies.map(tech => (
                <i key={`main-project-${tech}`} className='text-xl text-primary/80' title={tech}>
                  <TechnologyIcon name={tech} />
                </i>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Mobile */}
      <div
        onClick={onOpen}
        className={`${isOpen && '[transform:translateY(100vh)!important] [transition-duration:1s] opacity-0'}
          md:hidden ${className} hover:cursor-pointer
          hover:[transform:perspective(500px)_rotateX(30deg)_translateY(10%)_translateZ(0)] transition-all relative
          flex flex-col aspect-square md:aspect-[unset] min-h-fit
          rounded-xl bg-background text-foreground select-none selection-primary
          shadow-xl shadow-background/50
          overflow-hidden group
          `}>
        <img
          className='h-full object-cover origin-bottom scale-125 transition-all group-hover:scale-100 group-hover:[transform:perspective(500px)_rotateX(-30deg)_translateZ(0)]'
          src={`/img/projects/${project.image}`}
          alt={`Image of project  ${project.name}`}
        />
        <div className='absolute inset-0 bg-gradient-to-t via-20% from-primary/60 via-background/40 to-transparent flex flex-col justify-end p-4'>
          <h5 className='text-sm uppercase text-center [text-shadow:0_0.2rem_1rem_var(--col-background)]'>
            {project.name}
          </h5>
        </div>
      </div>

      <ProjectModal project={project} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}