import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent, FormEvent } from "react";
import type { RootState, AppDispatch } from "../store";
import {  useNavigate } from "react-router-dom";
import { loginUser } from "../redux/LoginSlice";
import { updatedInputField } from "../redux/RegisterSlice";
import {Input} from "../components/ui/Input";
import {Text} from "../components/ui/Text";
import {Button} from "../components/ui/Button";



export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signupForm = useSelector(
    (state: RootState) => state.user.signupForm
  );

  const { loading, error, success } = useSelector(
    (state: RootState) => state.login
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updatedInputField({
        field: e.target.name as keyof typeof signupForm,
        value: e.target.value,
      })
    );
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const result = await dispatch(loginUser());
  
  if (loginUser.fulfilled.match(result)) {
    console.log("Full Payload:", result.payload);

    
    const userRole = result.payload?.user?.role; 

    if (userRole === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }
};


  return (
    <div  className='h-full mt-20 w-150 ml-50'>
       <Text variant={'h1'} className='text-[#001C44] text-xl ml-20 text-bold '> Sign in or create an account</Text>
        <Text variant={'h1'} className='text-[#001C44] text-sm ml-20 mt-10'>You can sign in using your StayClear account to access</Text>
        <Text variant={'h1'} className='text-[#001C44] text-sm ml-20'> our service.</Text>
      <form onSubmit={handleSubmit} className='mt-10  flex flex-col ml-20 gap-8 items-start'>
        
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder='@example.com'
          value={signupForm.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={signupForm.password}
          onChange={handleChange}
        />

           <div className='flex gap-3 '>
            <Text variant={'p'} className="text-sm" >Lost access to your email? </Text>
             <Text variant={'p'} className='text-[#0C5776] text-sm'>Recover your account</Text>
         </div>

        <Button
          text={loading ? "Logging in..." : "Login"}
          className="text-white -mt-4 w-80 "
        />

        <div className="flex gap-29 -mt-4 ">
          <Text variant="p" className="text-sm">
           By signing in or creating an account, you agree with <br/>our Terms & conditions and Privacy notice
          </Text>

        
        </div>

        {error && (
          <Text
            variant="p"
            className="text-red-500 ml-60"
          >
            {error}
          </Text>
        )}

        {success && (
          <Text
            variant="p"
            className="text-green-500 mt-3"
          >
            {success}
          </Text>
        )}

      </form>
    </div>
  );
};




