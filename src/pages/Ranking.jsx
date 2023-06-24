import Champion from '../components/Svg/Champion.jsx'
import SecondPlace from '../components/Svg/SecondPlace.jsx'
import ThirdPlace from '../components/Svg/ThirdPlace.jsx'

import NoLike from '../components/Svg/NoLike.jsx'
import HaveLike from '../components/Svg/HaveLike'
import { useRef } from 'react'

export default function Ranking() {
  const data = useRef([
    { avatar: '../../public/avatar1.jpg', name: '昵称1', liked: true },
    { avatar: '../../public/avatar2.jpg', name: '昵称2', liked: false },
    { avatar: '../../public/avatar3.jpg', name: '昵称3', liked: false },
    { avatar: '../../public/avatar1.jpg', name: '昵称4', liked: true },
    { avatar: '../../public/avatar2.jpg', name: '昵称5', liked: false },
    { avatar: '../../public/avatar3.jpg', name: '昵称6', liked: true },
    { avatar: '../../public/avatar1.jpg', name: '昵称7', liked: false },
    { avatar: '../../public/avatar2.jpg', name: '昵称8', liked: true },
    { avatar: '../../public/avatar3.jpg', name: '昵称9', liked: false },
    { avatar: '../../public/avatar1.jpg', name: '昵称10', liked: true },
    { avatar: '../../public/avatar2.jpg', name: '昵称11', liked: false }
  ])

  console.log(data)

  return (
    // <>
    //   <div style={{ color: 'white', marginTop: '20px', fontSize: '30px' }}>Ranking</div>
    //   <div
    //     style={{
    //       background: '#2aa69a',
    //       width: '400px',
    //       margin: '20px auto',
    //       borderRadius: '10px'
    //     }}
    //   >
    //     <div
    //       style={{
    //         textAlign: 'left',
    //         height: '40px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         paddingLeft: '40px',
    //         borderBottom: '1px solid white'
    //       }}
    //     >
    //       <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
    //         <Champion />
    //         <img
    //           src={avatart1}
    //           alt="暂无头像"
    //           style={{ color: '#bebebe', fontSize: '10px', marginLeft: '5px', width: '25px', borderRadius: '50%' }}
    //         />
    //         <span style={{ marginLeft: '10px' }}>名称1</span>
    //       </div>
    //       <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px', cursor: 'pointer' }}>
    //         <NoLike />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         textAlign: 'left',
    //         height: '40px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         paddingLeft: '40px',
    //         borderBottom: '1px solid white'
    //       }}
    //     >
    //       <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
    //         <SecondPlace />
    //         <img
    //           src={avatart2}
    //           alt="暂无头像"
    //           style={{ color: '#bebebe', fontSize: '10px', marginLeft: '5px', width: '25px', borderRadius: '50%' }}
    //         />
    //         <span style={{ marginLeft: '10px' }}>名称1</span>
    //       </div>
    //       <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
    //         <HaveLike />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         textAlign: 'left',
    //         height: '40px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         paddingLeft: '40px',
    //         borderBottom: '1px solid white'
    //       }}
    //     >
    //       <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
    //         <ThirdPlace />
    //         <img
    //           src={avatart3}
    //           alt="暂无头像"
    //           style={{ color: '#bebebe', fontSize: '10px', marginLeft: '5px', width: '25px', borderRadius: '50%' }}
    //         />
    //         <span style={{ marginLeft: '10px' }}>名称1</span>
    //       </div>
    //       <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px', cursor: 'pointer' }}>
    //         <NoLike />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         textAlign: 'left',
    //         height: '40px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         paddingLeft: '40px'
    //       }}
    //     >
    //       <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
    //         <div style={{ width: '20px' }}>4</div>
    //         <img
    //           src={avatart3}
    //           alt="暂无头像"
    //           style={{ color: '#bebebe', fontSize: '10px', marginLeft: '5px', width: '25px', borderRadius: '50%' }}
    //         />
    //         <span style={{ marginLeft: '10px' }}>名称1</span>
    //       </div>
    //       <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px', cursor: 'pointer' }}>
    //         <NoLike />
    //       </div>
    //     </div>
    //   </div>
    // </>
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
        {data.current.map((item, index) =>
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
                borderBottom: index === data.current.length - 1 || index > 18 ? 'none' : '1px solid white'
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
                <span style={{ marginLeft: '10px' }}>{item.name}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '30px',
                  cursor: item.liked ? 'auto' : ' pointer'
                }}
              >
                {item.liked ? <HaveLike /> : <NoLike />}
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
