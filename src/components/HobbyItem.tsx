import React from 'react'
import { Button } from '@nextui-org/react'

import ExternalLinkIcon from '@icons/jsx/ExternalLink'

interface Props {
  className?: string
  title: string
  href: string
  image?: string
  children: React.ReactNode
}

export default function HobbyItem({ className, title, children, image, href }: Props): JSX.Element {
  return (
    <div
      className={`
        relative group overflow-hidden border border-transparent rounded-lg transition-all hover:border-secondary flex align-bottom p-6 text-xs
        ${className} shadow-xl shadow-black/20 hover:shadow-secondary/50 hover:shadow-lg
      `}>
      <div
        style={{ backgroundImage: `url(/img/hobbies/${image})` }}
        className='absolute inset-0 bg-cover bg-center -z-20'
      />
      <div className='absolute transition-all inset-0 bg-gradient-to-t from-black/90 via-[6rem] group-hover:via-50% via-black/30 to-black/30 group-hover:to-black/70 -z-10' />
      <div className='overflow-hidden z-10 w-full'>
        <div
          style={{ transform: 'translateY(var(--translate-y))' }}
          className='[--translate-y:calc(100%-2em)] group-hover:[--translate-y:0] h-full transition-transform flex flex-col justify-between gap-4'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-medium'>{title}</h3>
            <p className='max-w-[40ch]'>{children}</p>
          </div>
          <Button
            className='self-end border'
            color='secondary'
            variant='ghost'
            size='sm'
            as='a'
            href={href}
            // isIconOnly
            endContent={<ExternalLinkIcon />}
            target='_blank'
            rel='noopener noreferrer'>
            <p className='md:hidden'>See more</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
