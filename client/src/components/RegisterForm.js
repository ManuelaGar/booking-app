function RegisterForm({user, handleSubmit, handleChange }) {
    return (
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
          <label className="form-label">Your name</label>
          <input name="name" type="text" className="form-control" placeholder="Enter name" value={user.name} onChange={ handleChange }/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Email address</label>
          <input name="email" type="email" className="form-control" placeholder="Enter email" value={user.email} onChange={ handleChange }/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" placeholder="Enter password" value={user.password} onChange={ handleChange }/>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }

  export default RegisterForm;