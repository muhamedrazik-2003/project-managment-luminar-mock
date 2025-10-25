import React, { useState } from 'react'

function Dashboard() {
    const [date, SetDate] = useState(null)
  return (
    <div>
        todays date : {date || "not avail"}
        <input onChange={(e) => SetDate(e.target.value)} type="date" />
    </div>

  )
}

export default Dashboard