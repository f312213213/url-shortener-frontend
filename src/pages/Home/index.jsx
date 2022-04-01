import React from 'react'

import constant from '../../constant'

function Home () {
  const [responseText, setResponseText] = React.useState('')
  const URLRef = React.createRef()
  const NameRef = React.createRef()

  const shorten = async (e) => {
    const sendData = () => {
      if (NameRef.current.value.length > 0) {
        return {
          url: URLRef.current.value,
          customName: NameRef.current.value
        }
      }
      return {
        url: URLRef.current.value
      }
    }
    e.preventDefault()
    if (URLRef.current.value === '') return
    try {
      const response = await fetch(`${constant.URL}short`, {
        method: 'POST',
        body: JSON.stringify(sendData()),
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        }
      })
      if (response.status !== 200) {
        throw await response.json()
      }
      URLRef.current.value = ''
      NameRef.current.value = ''
      const res = await response.json()
      setResponseText(res.shorted)
      window.gtag('event', 'short' + URLRef.current.value, {
        event_category: 'short',
        event_label: URLRef.current.value
      })
      navigator.clipboard.writeText(document.URL + res.shorted)
    } catch (err) {
      setResponseText('出了一點問題')
    }
  }
  return (
      <div className={'Page bg-amber-200'}>
        <div className={'PageContainer  justify-center space-y-8'}>
          <h1 className={'text-4xl'}>縮網址！</h1>
          <form className={'flex-center flex-col w-full space-y-3'}>
            <input type="text" className={'p-2 rounded-lg w-2/3'} placeholder={'輸入要縮的網址！'} required ref={URLRef}/>
            <input type="text" className={'p-2 rounded-lg w-2/3'} placeholder={'輸入客製化短網址！（選填）'} ref={NameRef}/>
            <button className={'p-4 bg-amber-600 rounded'} type={'button'} onClick={shorten}>縮！</button>
          </form>
          {
            responseText && <h1 className={'text-2xl'}>{responseText}</h1>
          }
        </div>
      </div>
  )
}

export default Home
