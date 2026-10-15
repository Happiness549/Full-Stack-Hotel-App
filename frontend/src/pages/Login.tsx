import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import { loginUser } from "../redux/LoginSlice";
import { updatedInputField } from "../redux/RegisterSlice";
import {Input} from "../components/ui/Input";
import {Card} from "../components/ui/Card";
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

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser());
    if(loginUser.fulfilled.match(result)){
      navigate("/home")
    }
    
  };

  return (
    <Card  className='h-full mt-20 w-200 ml-50'>
       <Text variant={'h1'} className='text-[#001C44] text-5xl text-center font-bold'> Sign in or create an account</Text>
       
        <Text variant={'h1'} className='text-[#001C44] text-2xl text-center mt-9'> Login to your page </Text>
      <form onSubmit={handleSubmit} className='mt-15  flex flex-col text-center gap-8 items-start'>
        
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

           <div className='flex gap-35 ml-46'>
            <Text variant={'p'} >Remember me</Text>
             <Text variant={'p'} className='text-[#0C5776]'>Forgot password?</Text>
         </div>

        <Button
          text={loading ? "Logging in..." : "Login"}
          className="text-white -mt-4 w-100 ml-40"
        />

        <div className="flex gap-29 -mt-4 ml-45 ">
          <Text variant="p">
            Don't have an account?
          </Text>

          <Text
            variant="p"
            className="text-[#0C5776]"
          >
            <Link to="/signup">
              Create one
            </Link>
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
    </Card>
  );
};




