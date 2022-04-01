import React from 'react'
import { useParams } from 'react-router-dom'
import constant from '../../constant'

function FindShorten () {
  const { hashId } = useParams()
  const [responseText, setResponseText] = React.useState(`正在搜尋 ${hashId} 的紀錄`)
  const fetchURL = async () => {
    try {
      const res = await fetch(constant.URL + hashId)
      if (res.status !== 200) {
        throw await res.json()
      }
      const response = await res.json()
      if (response.originURL) {
        setResponseText(`正在跳轉至${response.originURL}`)
        window.location = response.originURL
        return
      }
    } catch (e) {
      setResponseText(`${hashId} 的紀錄不存在資料庫內`)
    }
  }
  React.useEffect(() => {
    window.gtag('event', 'entry' + hashId, {
      event_category: 'entry',
      event_label: hashId
    })
    fetchURL()
  }, [])
  return (
      <div className={'Page bg-amber-200'}>
        <div className={'PageContainer  justify-center space-y-8'}>
          <h1 className={'text-4xl'}>縮網址！</h1>
          {
            <h2>{responseText}</h2>
          }
        </div>
      </div>
  )
}

export default FindShorten
