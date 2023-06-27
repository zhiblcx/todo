import Champion from '../components/Svg/Champion.jsx'
import SecondPlace from '../components/Svg/SecondPlace.jsx'
import ThirdPlace from '../components/Svg/ThirdPlace.jsx'
import Integral from '../components/Svg/Integral.jsx'

import NoLike from '../components/Svg/NoLike.jsx'
import HaveLike from '../components/Svg/HaveLike'

import { useState } from 'react'

export default function Ranking() {
  const [data, setData] = useState([
    { avatar: '../../public/avatar1.jpg', name: '昵称1', liked: true, num: 52, integral: 77 },
    { avatar: '../../public/avatar2.jpg', name: '昵称2', liked: false, num: 100, integral: 12 },
    { avatar: '../../public/avatar3.jpg', name: '昵称3', liked: false, num: 12, integral: 24 },
    { avatar: '../../public/avatar1.jpg', name: '昵称4', liked: true, num: 15, integral: 42 },
    { avatar: '../../public/avatar2.jpg', name: '昵称5', liked: false, num: 500, integral: 64 },
    { avatar: '../../public/avatar3.jpg', name: '昵称6', liked: true, num: 42, integral: 33 },
    { avatar: '../../public/avatar1.jpg', name: '昵称7', liked: false, num: 75, integral: 72 },
    { avatar: '../../public/avatar2.jpg', name: '昵称8', liked: true, num: 85, integral: 22 },
    { avatar: '../../public/avatar3.jpg', name: '昵称9', liked: false, num: 42, integral: 77 },
    { avatar: '../../public/avatar1.jpg', name: '昵称10', liked: true, num: 91, integral: 88 },
    { avatar: '../../public/avatar2.jpg', name: '昵称11', liked: false, num: 75, integral: 11 }
  ])

  data.sort((a, b) => b.integral - a.integral)

  return (
    <>
      <div style={{ color: 'white', marginTop: '20px', fontSize: '30px' }}>Ranking</div>
      <div
        style={{
          background: '#2aa69a',
          width: '400px',
          margin: '20px auto',
          borderRadius: '10px'
        }}
      >
        {data.map((item, index) =>
          index < 20 ? (
            <div
              key={index}
              style={{
                textAlign: 'left',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '40px',
                borderBottom: index === data.length - 1 || index > 18 ? 'none' : '1px solid white'
              }}
            >
              <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                {index === 0 ? (
                  <Champion />
                ) : index === 1 ? (
                  <SecondPlace />
                ) : index === 2 ? (
                  <ThirdPlace />
                ) : (
                  <div style={{ width: '20px' }}>{index + 1}</div>
                )}
                <img
                  src={item.avatar}
                  alt="暂无头像"
                  style={{ color: '#bebebe', fontSize: '10px', marginLeft: '5px', width: '25px', borderRadius: '50%' }}
                />
                <span style={{ marginLeft: '10px', color: index < 3 ? '#FFD700' : 'black', fontSize: '15px' }}>
                  {item.name}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '20px',
                  marginRight: '80px'
                }}
              >
                <span>
                  <Integral />
                </span>
                <span style={{ fontSize: '10px', marginLeft: '3px' }}>{item.integral}</span>
                <span style={{ marginLeft: '8px', cursor: item.liked ? 'auto' : ' pointer' }}>
                  {item.liked ? <HaveLike /> : <NoLike />}
                </span>
                <span style={{ fontSize: '10px', marginLeft: '3px' }}>{item.num > 99 ? '99+' : item.num}</span>
              </div>
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </>
  )
}
