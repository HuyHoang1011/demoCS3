import React, { useState } from "react";
import { useFormik, yupToFormErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { registerApi } from '../../redux/reducer/userReducer';
const Register = () => {
  // let [gender, setGender] = useState(null);
  let [type, setType] = useState("password");
  let [icon, setIcon] = useState("fa-solid fa-eye")
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: yup.object().shape({
      phone: yup.string()
        .required("Số điện thoại không được để trống !")
        .matches(/^[0-9]+$/, 'Chỉ được nhập số')
        .min(10, "Số điện thoại phải đúng 10 số ")
        .max(10, "Số điện thoại phải đúng 10 số "),
      name: yup.string().required("Tên không được để trống "),
      email: yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng(...@gmail.com,@email.com )!"),
      password: yup.string()
        .required("Password không được bỏ trống !")
        .min(3, "Password từ 3 - 32 ký tự!")
        .max(32, "Password từ 3 đến 32 ký tự!"),
      rePassword: yup.string()
        .oneOf([yup.ref("password")], "Nhập lại mật khẩu không đúng")
        .required("Password confirm không được bỏ trống !"),

    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerApi(values));
    }
  });

  return (
    <section className="register">
      <div className="container">
        <form className="register_title" onSubmit={formik.handleSubmit}>
          <h2 className="text-left">Register</h2>
          <div className="row">
            <div className="col-6 form-left">
              <div className="form-group m-4">
                <label htmlFor="email">Email</label>
                <br />
                <input type="text" placeholder="email" name='email' className="form_email form-group" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
              </div>
              <div className="form-group m-4">
                <label htmlFor="password">Password</label>
                <br />
                <input type={type} name='password' placeholder="password" className='form_pass' id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <span style={{ cursor: 'pointer' }} onClick={() => {
                  if (type === "password") { setType("text") } else {
                    setType("password")
                  }
                }}></span>
                {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}

              </div>
              <div className="form-group m-4">
                <label htmlFor="rePassword">Password confirm</label>
                <br />
                <input type={type} name='rePassword' placeholder="password confirm" className='form_repass' id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <span style={{ cursor: 'pointer' }} onClick={() => {
                  if (type === "password") { setType("text") } else {
                    setType("password")
                  }
                }}></span>
                {formik.errors.rePassword && formik.touched.rePassword && <div className="text-danger">{formik.errors.rePassword}</div>}
              </div>
            </div>
            <div className="col-6 form-right">
              <div className="form-group m-4">
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" name='name' placeholder="name" className="form_name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
              </div>
              <div className="form-group m-4">
                <label htmlFor="phone">Phone</label>
                <br />
                <input type="text" name='phone' placeholder="phone" className="form_phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.phone && formik.touched.phone && <div className="text-danger">{formik.errors.phone}</div>}
              </div>
              <div className="form-group reCheck m-4">
                <div className="gender">Gender</div>
                <div className="d-xl-flex box_radio">
                  <div className="radio d-flex">
                    <input id="radio-1" name="gender" className='male' type="radio" value={true} onChange={formik.handleChange} defaultChecked />
                    <label htmlFor="radio-1" className="radio-label m-2" style={{ cursor: 'pointer' }}>Male</label>
                  </div>
                  <div className="radio d-flex">
                    <input id="radio-2" name="gender" className='female' type="radio" value={false} onChange={formik.handleChange} />
                    <label htmlFor="radio-2" className="radio-label m-2" style={{ cursor: 'pointer' }}>Female</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btnTK btn btn-success m-4" id="btnTaoTK">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}

export default Register;
