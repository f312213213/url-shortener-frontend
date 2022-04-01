import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import FindShorten from './FindShorten'

function AppRouter () {
  return (
      <Routes>
        <Route path={'/:hashId'} element={<FindShorten />} />
        <Route path={'/'} exact element={<Home />} />

      </Routes>
  )
}

export default AppRouter
