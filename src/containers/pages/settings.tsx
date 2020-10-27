import React from 'react'
import { Settings as SettingsConfig } from '../../config'

export const Settings = () => {

  return (
    <>
        <h2>{SettingsConfig.heading}</h2>
        <p>{SettingsConfig.info}</p>
    </>
  )
}
