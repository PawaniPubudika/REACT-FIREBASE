import React from 'react';

const login = () => {

    return(
        <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
            <label>
                Email
                <input name="email" type="email" placeholder="Email"/>

            </label>

            <label>
                Password
                <input name="password" type="password" placeholder="Password"/>
                
            </label>

                <button type="submit">Sign Up</button>
        </form>
    </div>

    )

}
export default login;