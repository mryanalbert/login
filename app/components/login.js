'use client'

import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"

export default function Login() {
  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors: { username, password } } = formState
  const { data: session, status } = useSession()

  const onSubmit = async (data) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })
    console.log(res)
  }

  if (session) {
    redirect('/dashboard')
  }

  if (status == 'loading') return <h1>Loading...</h1>

  return (
    <div className="container">
      <div className="row justify-content-center vh-100">
        <div className="col-12 my-auto w-100">
          <div className="card border border-0 rounded-0 mx-auto shadow-lg" style={{maxWidth:350}}>
            <div className="card-header bg-success text-white rounded-0 text-center">
              <span className="lead fs-4">Login System</span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-floating">
                  <input 
                    type="text" 
                    id="username" 
                    className={`form-control form-control-lg ${username?.message ? 'border-danger' : ''}`}
                    placeholder="username" 
                    {...register('username', {
                      required: 'Username is required!'
                    })}
                  />
                  <label htmlFor="username" className="form-label text-secondary">Username:</label>
                </div>

                <small className="text-danger">{username?.message}</small>

                <div className="form-floating mt-3">
                  <input 
                    type="password" 
                    id="password" 
                    className={`form-control form-control-lg ${password?.message ? 'border-danger' : ''}`}
                    placeholder="password" 
                    {...register('password', {
                      required: 'Password is required!'
                    })}
                  />
                  <label htmlFor="password" className="form-label text-secondary">Password:</label>
                </div>

                <small className="text-danger ">{password?.message}</small>

                <input type="submit" value="Login" className="btn btn-success w-100 rounded-0 mt-3" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}