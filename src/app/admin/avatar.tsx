'use server'
import React from 'react'
import { Avatar } from '@mui/material'

export function StudentAvatar({url}) {

  return (
    <div>
        <Avatar src={url} />
    </div>
  )
}
