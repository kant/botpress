import { Button, Intent } from '@blueprintjs/core'
import React from 'react'

import { DbFlaggedEvent } from '../../../types'

import style from './style.scss'
import ResolvedEventsList from './ResolvedEventsList'

interface Props {
  events: DbFlaggedEvent[]
  totalEventsCount: number
  applyAllPending: () => Promise<void>
  resetPendingEvent: (id: string) => Promise<void>
}

const PendingList = ({ events, totalEventsCount, applyAllPending, resetPendingEvent }: Props) => (
  <>
    <h3>Pending Misunderstood ({totalEventsCount})</h3>

    {events && events.length > 0 && (
      <div className={style.applyAllButton}>
        <Button onClick={applyAllPending} intent={Intent.WARNING} icon="export" fill>
          Apply all pending
        </Button>
      </div>
    )}

    <ResolvedEventsList events={events} resetEvent={resetPendingEvent} />
  </>
)

export default PendingList
