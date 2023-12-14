import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('Đăng Nhập Thành Công.')}`,
  })

  return (
    <section className={classes.login}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>Xin Chào Bạn</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Vui lòng đăng nhập bằng tài khoản của bạn</p>

          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Trang đăng nhập tài khoản của bạn.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
