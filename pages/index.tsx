import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const initialFormData = Object.freeze({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    cardType: '',
    cardNumber: null
  })

  const [data, setData] = useState([])

  async function getData() {
    const res = await fetch('/api/getCustomers', { cache: 'no-store' })
    const newData = await res.json()
    setData(newData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1>Next.js and Fauna</h1>
      {data.length > 0 ? (
        data.map((d) => (
          <div key={d.ts}>
            <p>
              {/* get first and last name from fauna database */}
              {d.data.firstName} {d.data.lastName}
            </p>
          </div>
        ))
      ) : (
        <>
          <p>Loading data...</p>
        </>
      )}
    </div>
  )
}
