import React, { useState } from 'react'
import ChevronDownIcon from '@icons/jsx/ChevronDown'
import ArrowFromTopIcon from '@icons/jsx/ArrowFromTop'
import ExternalLinkIcon from '@icons/jsx/ExternalLink'

import { Button } from '@nextui-org/react'

import type { TimelineItem } from '../types/app'

interface Props {
  timeline: TimelineItem[]
  color?: 'primary' | 'secondary' | 'tertiary'
  bgColor?: 'primary' | 'secondary' | 'tertiary'
  alwaysFull?: boolean
  ascend?: boolean
  labels: {
    SHOW_MORE: string
    SHOW_LESS: string
    TOGGLE_ORDER: string
  }
}

export default function TimeLine({
  timeline: timelineProp,
  color,
  alwaysFull,
  ascend: propAscend,
  labels
}: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [ascend, setAscend] = useState<boolean>(propAscend ?? false)
  const timeline = ascend ? timelineProp.toReversed() : timelineProp

  return (
    <div className='flex flex-col relative'>
      <button
        title={labels.TOGGLE_ORDER}
        className={`absolute left-0 top-0 z-10 ${timeline.length < 3 && 'hidden'}`}
        onClick={() => {
          setAscend(!ascend)
        }}>
        <i
          style={{ transform: `rotate(${ascend ? '180deg' : '0deg'})` }}
          className={`transition-all text-2xl h-[2.5rem] w-[1.3rem] grid place-items-center`}>
          <ArrowFromTopIcon />
        </i>
      </button>
      <section
        style={{ color: `var(--col-${color ?? 'background'})` }}
        className={`flex flex-col pl-4 ${
          open || (alwaysFull ?? false) || 'overflow-fade max-h-[40vh]'
        } selection-${color ?? 'foreground'}`}>
        {timeline.map((item, i) => (
          <article key={`timeline-item-${i}-${item.date}`} className='flex flex-col gap-4 p-4 pr-0 relative'>
            <div
              style={{ backgroundColor: `var(--col-${color ?? 'background'})` }}
              className={`
            absolute -left-[0.35rem] -bottom-0 w-[2px]
            ${i !== timeline.length - 1 && 'top-[1.1rem] translate-y-[2.35rem]'}
            `}
            />
            <div className='relative flex flex-col font-bold'>
              <div
                style={{ borderColor: `var(--col-${color ?? 'background'})` }}
                className={`
                ${timeline.length < 2 && 'hidden'}
              absolute size-5 rounded-full border-[2px]
              -translate-x-1/2 -left-[1.3rem] mt-5
              `}
              />
              <h3>{item.date}</h3>
              <h4>{item.title}</h4>
            </div>
            <p>{item.body}</p>
            {item.links?.map((link, i) => (
              <Button
                key={`timeline-link-${i}-${link.text}`}
                as='a'
                href={link.url}
                target='_blank'
                radius='none'
                rel='noopener noreferrer'
                style={{
                  color: `var(--col-${color ?? 'background'})`,
                  borderColor: `var(--col-${color ?? 'background'}`
                }}
                className='p-2 px-0 text-xs w-min flex bg-transparent border-b-2'>
                {link.text}
                <i className='text-medium'>
                  <ExternalLinkIcon />
                </i>
              </Button>
            ))}
          </article>
        ))}
      </section>
      {alwaysFull ?? false ? null : (
        <Button
          radius='lg'
          variant='light'
          name='toggle timeline full height'
          color={color === 'tertiary' ? 'warning' : color}
          className={
            typeof color !== 'undefined'
              ? 'self-center uppercase'
              : 'self-center uppercase hover:[background-color:transparent!important] border-2 border-transparent hover:border-background'
          }
          onPress={() => {
            setOpen(!open)
          }}
          endContent={
            <i
              style={{ transform: `rotate(${open ? '180deg' : '0deg'})` }}
              className={`transition-all grid place-items-center`}>
              <ChevronDownIcon />
            </i>
          }>
          {open ? labels.SHOW_LESS : labels.SHOW_MORE}
        </Button>
      )}
    </div>
  )
}
