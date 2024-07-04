import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { SiGnuprivacyguard } from "react-icons/si";
import { baseUrl } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className=" h-screen flex items-center justify-center bg-slate-200">
      <div className="w-[600px] p-4">
        <div className="login_icon">
          <SiGnuprivacyguard className="text-3xl"/>
        </div>
        <h2 className="my-3">SIGN UP</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required";
            }
            
            if (!values.email) {
              errors.email = " Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios.post(`${baseUrl}/sign-up`,values)
            .then((res)=>{
              console.log(res)
              setSubmitting(false)
              navigate("/sign-in")


            })
            .catch((err)=>{
              console.log(err)
            })

          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="form-control border-2 border-sky-600"
                placeholder="Name"
              />
              <p className="text-left text-red-400 text-sm mt-2">

              {errors.name && touched.name && errors.name}
              </p>



              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control border-2 border-sky-600 my-3"
                placeholder="Email"
              />
              <p className="text-left text-red-400 text-sm mt-2">

              {errors.email && touched.email && errors.email}
              </p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="form-control border-2 border-sky-600"
                placeholder="Password"
              />
              <p className="text-left text-red-400 text-sm mt-2">

              {errors.password && touched.password && errors.password}
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-control mt-3 submit_btn1"
              >
                Submit
              </Button>

              <div className="mt-3">
                <Link to="/sign-in" className="no-underline text-left link1">
                  Already a member? Login</Link>

              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
