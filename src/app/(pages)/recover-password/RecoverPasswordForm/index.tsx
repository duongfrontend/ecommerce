'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError('Đã xảy ra sự cố khi cố gắng gửi cho bạn email đặt lại mật khẩu. Vui lòng thử lại.')
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <p>Nhập địa chỉ email đăng kí. Chúng tôi sẽ gửi liên kết về email của bạn</p>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Message error={error} className={classes.message} />
            <Input
              name="email"
              label="Email của bạn"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Button
              type="submit"
              appearance="primary"
              label="Tiếp Tục"
              className={classes.submit}
            />
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Đã Gửi Yêu Cầu</h1>
          <p>Vui lòng kiểm tra email của bạn. Chúng tôi vừa gửi liên kết về email của bạn.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
