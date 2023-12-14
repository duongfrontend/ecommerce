'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Ưu đãi của tháng</h3>
        <p>
          Hãy sẵn sàng cho trải nghiệm mua sắm chưa từng có với Ưu đãi trong tháng của chúng tôi!
          Mọi việc mua hàng đi kèm với các đặc quyền và ưu đãi độc quyền, khiến tháng này trở thành
          tháng kỷ niệm của sự hiểu biết sự lựa chọn và giao dịch tuyệt vời. Đừng bỏ lỡ! 🎁🛒
        </p>

        <ul className={classes.stats}>
          <StatBox label="Ngày" value={time.days} />
          <StatBox label="Giờ" value={time.hours} />
          <StatBox label="Phút" value={time.minutes} />
          <StatBox label="Giây" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
